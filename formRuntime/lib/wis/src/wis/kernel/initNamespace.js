wof_register = function(fullNS){
    var nsArray = fullNS.split('.');
    var sEval = '';
    var sNS = '';
    for (var i = 0; i < nsArray.length; i++){
        if (i != 0) sNS += '.';
        sNS += nsArray[i];
        sEval += 'if (typeof(' + sNS + ') == "undefined") ' + sNS + ' = {};';
    }
    if (sEval != '') eval(sEval);
}
wof_register('wis.kernel');
wof_register('wis.widget');
wof_register('wis.util');
