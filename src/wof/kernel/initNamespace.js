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
wof_register('wof.kernel');
wof_register('wof.widget');
wof_register('wof.widget.spanner');
wof_register('wof.bizWidget');
wof_register('wof.bizWidget.spanner');
wof_register('wof.util');
wof_register('wof.customWindow');
wof_register('wof.functionWidget');
wof_register('wof.functionWidget.spanner');
