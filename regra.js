function calculo(val1, val2) {
  valor_compra = parseInt(val1);
  valor_entrada = val2;

  var taxas = [6.50, 7.59, 8.28, 8.97, 9.64, 10.31, 11.17, 11.83, 12.48, 13.13, 13.76, 14.40, 15.82, 16.44, 17.06, 17.67, 18.27, 18.87];
  let taxa_debito = 4.50;
  var valor_parcelas = [];
  var valor_total = [];

  var valor = (valor_compra) - valor_entrada;

  //parte da taxa de débito
  let percentual_debito = (taxa_debito * valor) / 100;
  let debito_total = valor + percentual_debito;
  
  var i = 0;
  while (taxas[i]) {
    
    let percentual = taxas[i] / 100;
    
    let total = valor + (valor * ((valor * percentual) / (valor - (valor * percentual))));
    
    valor_total.push(total); // Populando os valores totais
    valor_parcelas.push(total / (i + 1)); // Populando os valores das parcelas

    i++;
  }

  var table = "";
  for(var i in valor_parcelas){
    table += "<tr>" + "<td>" + (parseInt(i) + 1) + " x" + "</td>" + "<td>" + valor_parcelas[i].toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) + "</td>" + "<td>" + 
    valor_total[i].toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) + "</td></tr>";
  }

  debito_linha = "<tr>" + "<td>" + "Débito " + "</td>" + "<td>" + debito_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) + "</td>" + "<td>" + 
  debito_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) + "</td></tr>";

  document.getElementById("exibir").innerHTML = debito_linha + table;

}

var text = document.getElementById("val_compra");
var entrada = document.getElementById("val_entrada");

text.addEventListener("keyup", function () {
  var val_compra = this.value;
  var val_entrada = document.getElementById("val_entrada").innerHTML
  calculo(val_compra, val_entrada);
})

entrada.addEventListener("keyup", function () {
  var val_compra = text.value
  val_entrada = this.value;
  calculo(val_compra, val_entrada);
})

function keyPressed(evt){
  evt = evt || window.event;
  var key = evt.keyCode || evt.which;
  return String.fromCharCode(key); 
}

document.onkeypress = function(evt) {
  var str = keyPressed(evt);
  
  if(str == ',' | str == '.')
      alert("Por favor apague e digite apenas números");
};
