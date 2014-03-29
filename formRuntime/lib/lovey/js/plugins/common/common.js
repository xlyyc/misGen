/**
 * Ecms 系统js.
 *
 * Author: zhaozw
 * Version:v1.0 12-7-19 下午1:51
 */
var $ECMS = {}, $HL = {};
(function ($) {

    //验证字符串是否为空
    $ECMS.isEmpty = function (str) {
        return str == null || str.length == 0;
    }

    //验证是否是数字
    $ECMS.isIntNumber = function (str) {
        if ($ECMS.isEmpty(str)) {
            return false;
        }
        var reg = /^(-|\+)?\d+$/
        return reg.test(str);
    }

    //验证是否是浮点型数字
    $ECMS.isFloatNumber = function (str) {
        if ($ECMS.isIntNumber(str)) {
            return true;
        }
        var reg = /^(-|\+)?\d+\.\d*$/
        return reg.test(str);
    }

    $HL.loadHighLightMode = function (mode) {
        var js = document.createElement('script');
        js.setAttribute("type", "text/javascript");
        js.setAttribute("src", easyloader.URI + "/js/plugins/codemirror/mode/" + mode + "/" + mode + ".js");
        document.getElementsByTagName("head")[0].appendChild(js);
    }

    //线程睡眠
    $ECMS.sleep = function (n) {
        var start = new Date().getTime();
        while (true)  if (new Date().getTime() - start > n)   break;
    }

})(jQuery);