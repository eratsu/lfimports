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
        var taxa_pix;
  
        switch (bandeira) {
          case "mastervisa":
            taxas = [5.05, 5.45, 6.20, 6.95, 7.70, 8.45, 8.90, 9.60, 10.35, 11.05, 11.75, 12.50, 13.60, 14.30, 14.95, 15.65, 16.30, 16.95];
            taxa_pix = 1.99;
            taxa_debito = 2.90;
            break;
        case "outros":
            taxas = [5.05, 5.45, 6.20, 6.95, 7.70, 8.45, 8.90, 9.60, 10.35, 11.05, 11.75, 12.50, 13.60, 14.30, 14.95, 15.65, 16.30, 16.95];
            taxa_pix = 1.99;
            taxa_debito = 2.90;
            break;
        default:
            taxas = [5.05, 5.45, 6.20, 6.95, 7.70, 8.45, 8.90, 9.60, 10.35, 11.05, 11.75, 12.50, 13.60, 14.30, 14.95, 15.65, 16.30, 16.95];
            taxa_pix = 1.99;
            taxa_debito = 2.90;
            break;
        }
  
        var valor_parcelas = [];
        var valor_total = [];
        var valor = val_compra - val_entrada;
  
        let percentual_debito = (valor * 100) / (100 - taxa_debito);
        let debito_total = percentual_debito;

        let percentual_pix = (valor * 100) / (100 - taxa_pix);
        let pix_total = percentual_pix;
  
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
        var pix_linha = "<tr><td>PIX</td><td>" + formatCurrency(pix_total) + "</td><td>" + formatCurrency(pix_total) + "</td></tr>";
  
        document.getElementById("exibir").innerHTML = pix_linha + debito_linha + table;
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
  