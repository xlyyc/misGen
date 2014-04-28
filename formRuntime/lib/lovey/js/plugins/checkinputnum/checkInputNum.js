/**
 * author:qcwang
 * 
 * 本方法用于实时统计输入框已输入的字数
 * 
 * 调用方法示例：
 * $("#xxx").checkInputNum({
 *     "maxNum":1000,                   输入字符上限
 *  "nowNumTip":$("span .nownum"),      指定显示已输入多少字符的dom元素
 *  "restNumTip":$("span .restnum"),    指定显示可输入多少字符的dom元素
 *  "restTipClass":"red",               字数已经达到上线时改变restNumTip的样式
 *     "checkType":"En"                 指定统计的单位，CN:中文字符 EN：英文字符
 * });
 * 
 */

if (!!window.jQuery) {
    (function($) {
        $.fn.extend({checkInputNum:function(options) {
            var option = {
                maxNum : 1000,          //用户可输入最大字符数
                triggerNum:1000,        //当输入数量达到某个值时触发一个事件
                triggerFunc:null,       //触发执行的事件
                nowNumTip:null,         //用于提示当前已输入字数的dom对象
                restNumTip:null,        //用于提示还可以输入字数的dom对象
                restTipClass : null,    //已输入字数等于最大输入字数时改变对象的class
                checkType:"CN"          //字数统计类型 CN：中文，EN：英文
            };
            if (typeof options === "object") {
                $.extend(option, options);
            }
            if(isNaN(option.maxNum)){
                return false;
            }
            var _this = this;
            var _result = true;
            var _nowNum = 0;
            var _restNum = 0;
            var _nowStrLen = 0;
            var _maxLength = option.checkType == "CN"? option.maxNum*2:option.maxNum;
            var _nowStr = "";
            
            $(_this).bind("keyup change",function(){
                _nowStr = checkLen(_this.val(),_maxLength);
                _nowNum = getNum(_nowStrLen, option.checkType);
                _restNum = getNum(_maxLength-_nowStrLen, option.checkType);
                if(_restNum<=option.triggerNum && typeof(option.triggerFunc)=="function"){
                    option.triggerFunc();
                }
                //判断已输入字符数是否超出最大值
                _result =  _nowNum >= option.maxNum;
                if(!_result){//未超出界限
                    if(option.nowNumTip){
                        $(option.nowNumTip).html(_nowNum);
                    }
                    if(option.restNumTip){
                        $(option.restNumTip).html(_restNum);
                        if(option.restTipClass&&typeof option.restTipClass =="string"){
                            $(option.restNumTip).removeClass(option.restTipClass);
                        }
                    }
                    
                }else{//超出界限
                    $(_this).val(_nowStr);
                    if(option.nowNumTip){
                        $(option.nowNumTip).html(_nowNum);
                    }
                    if(option.restNumTip){
                        $(option.restNumTip).html(_restNum);
                        if(option.restTipClass&&typeof option.restTipClass =="string"){
                            $(option.restNumTip).addClass(option.restTipClass);
                        }else{
                        	 $(option.restNumTip).html('<font color="#EE0101">'+_restNum+'</font>');
                        }
                    }
                }
            });
            
            if($(_this).val()!==""){
                $(_this).trigger("change");
            }
            
            //校验字符串长度是否合法，若不合法则截取字符串
            function checkLen(str,len){
                var num = getBytes(str);
                if(parseInt(num)>=len){
                    _nowStrLen = len;
                    return subStr_func(str,len);
                }else{
                    _nowStrLen = num;
                    return str;
                }
            }

            //根据统计类型判断获取字符数
            function getNum(num,chType){
                if(isNaN(num)){
                    return 0;
                }else{
                    if(chType=="CN"){
                        return Math.ceil(num/2);
                    }else{
                        return num;
                    }
                }
            }
            
            //获取字符串字节数
            function getBytes(str) {
                var byteLen = 0, len = str.length;
                if (str) {
                    for ( var i = 0; i < len; i++) {
                        if (str.charCodeAt(i) > 255) {
                            byteLen += 2;
                        } else {
                            byteLen++;
                        }
                    }
                    return byteLen;
                } else {
                    return 0;
                }
            }
            
            //截取字符串使其长度不大于指定长度
            function subStr_func(str, len) {
                if (!str || !len) {
                    return "";
                }
                var a = 0;
                var i = 0;
                var temp = '';
                for (i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 255) {
                        a += 2;
                    } else {
                        a++;
                    }
                    if (a >= len) {
                        return temp;
                    }
                    temp += str.charAt(i);
                }
            }
        }});
        
    })(jQuery);
}