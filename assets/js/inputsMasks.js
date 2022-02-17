$(function() {
    $('#aporte_inicial').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: true});
    $('#aporte_mensal').maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: true});
});

$(function() {
    $('#prazos').mask('000', {reverse: true});
    $('#rentabilidade').mask('000%', {reverse: true});
});