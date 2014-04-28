/**
 * jQuery 通用的字符串处理函数
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
(function ($) {
    //参数命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.String = {
        execString: "",                         //待处理字符串
        cutLength: 0,                           //截取长度，0默认不截取
        suffix: "...",                          //后缀
        hasSuffix: true,                        //是否包含后缀，默认是
        chineseRegex: /[^\x00-\xff]/g,         //判断是否是汉字的正则
        htmlRegex: /<\/?[^>]*>/g,              //清楚html字符串里面的html标记
        regexStr: "",                          //正则表达式
        fileSize:0                             //文件的大小
    };

    //函数命名空间
    $.loveyString = $.loveyString || {};

    //字符串截取函数,带html过滤
    $.loveyString.cutString = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.String, options || {});

        if (op.execString == '' || op.cutLength == 0) {
            return op.execString;
        }

        var strTemp = op.execString.replace(op.htmlRegex, "");

        var newLength = 0, singleChar = "", cutStr = "";
        var strLength = strTemp.replace(op.chineseRegex, "**").length;
        for (var i = 0; i < strLength; i++) {
            singleChar = strTemp.charAt(i).toString();
            if (singleChar.match(op.chineseRegex) != null) {
                newLength += 2;
            } else {
                newLength++;
            }
            if (newLength > op.cutLength) {
                break;
            }
            cutStr += singleChar;
        }

        if (op.hasSuffix && strLength > op.cutLength) {
            cutStr += op.suffix;
        }

        return cutStr;
    };

    //文件的大小转化
    $.loveyString.formate = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.String, options || {});
        function forDight(number, digits) {
            with (Math) {
                return round(number * pow(10, digits)) / pow(10, digits);
            }
        }

        var _size = 0, q = 1000, u, k = "K", m = "M", g = "G", ks = 1024, ms = ks * ks, gs = ms * ks;
        _size = parseFloat(op.fileSize);
        if (_size / ks < q) {
            _size = _size / ks;
            u = k;
        } else if (_size / ms < q) {
            _size = _size / ms;
            u = m;
        } else {
            _size = _size / gs;
            u = g;
        }
        _size = forDight(_size, 2);
        return _size + u;

    };

    //判断是否输入是否合法，可以传入自定义正则
    $.loveyString.exceReg = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.String, options || {});

        if (op.execString == '' || op.regexStr == '') {
            return false;
        }

        //必须用eval将正则转换
        return eval(op.regexStr).test(op.execString);
    }
})
        (jQuery);