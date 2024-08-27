document.addEventListener('DOMContentLoaded', function() {
  // Event listeners
  document.getElementById("val_compra").addEventListener("input", function() {
      this.value = formatCurrencyInput(this.value);
      updateValues();
  });

  document.getElementById("val_entrada").addEventListener("input", function() {
      this.value = formatCurrencyInput(this.value);
      updateValues();
  });

  document.getElementById("cartao_bandeira").addEventListener("change", function() {
      updateValues();
  });

  function updateValues() {
      var val_compra_input = document.getElementById("val_compra").value;
      var val_entrada_input = document.getElementById("val_entrada").value;

      // Verificar se val_compra está vazio
      if (val_compra_input.trim() === "") {
          document.getElementById("exibir").innerHTML = "";
          return;
      }

      var val_compra = parseCurrencyInput(val_compra_input);
      var val_entrada = parseCurrencyInput(val_entrada_input);

      // Corrigir para definir val_entrada como 0 se for NaN
      if (isNaN(val_entrada)) {
          val_entrada = 0;
      }

      var bandeira = document.getElementById("cartao_bandeira").value;

      var taxas;
      var taxa_debito;

      switch (bandeira) {
        case "mastervisa":
            taxas = [2.98, 3.70, 4.25, 4.79, 5.34, 5.87, 6.27, 6.80, 7.32, 7.84, 8.36, 8.88, 9.38, 9.89, 10.39, 10.88, 11.38, 11.87];
            taxa_debito = 1.39;
          break;
      case "outros":
            taxas = [3.29, 3.90, 4.45, 4.99, 5.54, 6.07, 6.47, 7.00, 7.52, 8.04, 8.56, 9.08, 9.58, 10.09, 10.59, 11.08, 11.58, 12.07];
            taxa_debito = 1.79;
          break;
      default:
            taxas = [3.29, 3.90, 4.45, 4.99, 5.54, 6.07, 6.47, 7.00, 7.52, 8.04, 8.56, 9.08, 9.58, 10.09, 10.59, 11.08, 11.58, 12.07];
            taxa_debito = 1.79;
          break;
      }

      var valor_parcelas = [];
      var valor_total = [];
      var valor = val_compra - val_entrada;

        let percentual_debito = (valor * 100) / (100 - taxa_debito);
        let debito_total = percentual_debito;

        for (var i = 0; i < taxas.length; i++) {
            let percentual = (valor * 100) / (100 - taxas[i]);
            let total = percentual;
            valor_total.push(total);
            valor_parcelas.push(total / (i + 1));
        }

      var table = "";
      for (var i = 0; i < valor_parcelas.length; i++) {
          table += "<tr><td>" + (i + 1) + " x</td><td>" + formatCurrency(valor_parcelas[i]) + "</td><td>" + formatCurrency(valor_total[i]) + "</td></tr>";
      }

      var debito_linha = "<tr><td>Débito</td><td>" + formatCurrency(debito_total) + "</td><td>" + formatCurrency(debito_total) + "</td></tr>";

      document.getElementById("exibir").innerHTML = debito_linha + table;
  }

  function formatCurrencyInput(value) {
      // Remove caracteres não numéricos e formata para padrão de dinheiro
      var val = value.replace(/\D/g, '');
      if (val.length > 2) {
          val = val.replace(/(\d{2})$/, ',$1');
      } else if (val.length === 2) {
          val = ',' + val;
      }
      // Adiciona separadores de milhar
      val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      return 'R$ ' + val;
  }

  function parseCurrencyInput(value) {
      // Parse o valor numérico a partir da entrada formatada
      return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  function formatCurrency(value) {
      return 'R$ ' + value.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      });
  }

  // Inicializa os cálculos na carga da página
  updateValues();
});
