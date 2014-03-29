/**
 * @program: 多条件过滤查询
 * @author: sjsong01@wisedu.com
 * @return: json object
 * history:
 *
 */
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($) {
    $.fn.ligerGetFilteredManager =  function () {
        return LigerUIManagers[this[0].id + "_Filtered"];
    }
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.Filtered = {
        attribute:"id", //根据ID还是NAME获取传入后台的参数名，默认为ID
        url:""
    }
    $.fn.ligerFiltered =    function (options) {
        options = $.extend({}, $.fn.ligerFiltered, options || {});
        var id = "#" + $(this).attr("id");
        $(id + " > dt+dd").addClass("selected");
        $(id + " dd[class!='no_select']").click(function () {
            $(this).siblings().each(function () {
                $(this).removeClass("selected");
            })
            $(this).toggleClass("selected");
            if($(this).hasClass("selected")){
                $(id + " dl:last-child >dd[class='no_select']").hide();
            }else {
                $(this).prevAll(".select_all").addClass("selected");
            }

            rs();
        });

        $(id + " dl:last-child >dd[class!='no_select']").live('click', function () {
            if( $(this).siblings().length <= 2 ) {
                $(id + " dl:last-child >dd[class='no_select']").show();
            }
            //$(this).remove();
            var old = $(id + " > dl").children();
            for (var i = 0; i < old.length; i += 1) {
                if ($(old[i]).html() == $(this).html()) {
                    $(old[i]).removeClass("selected").prevAll(".select_all").addClass("selected");
                }
            }
            rs();
        });

        function rs() {
            var result ={}, ele = "";
            $(id + " dl:last-child >dd[class!='no_select']").remove();
            $(id + " dd[class='selected']").each(function () {
                $(this).clone().appendTo($(id + "  dl:last-child"));
                if(options.attribute == "id") {
                    ele = $(this).parent().attr("id");
                }else if(options.attribute == "pkname") {
                    ele = $(this).parent().attr("pkname");
                }else {
                    alert("您传的参数有误，请注意可取值");
                    return;
                }
                result[ele] =  $(this).attr("pkvalue");
            })
            if(window.console){console.log('post值：',result);}
            if( options.url == "" ){
                alert("请配置URL参数！");
                return;
            }else {
                $.post(options.url,result,function(data){
                    if(window.console){console.log("返回值："+data);}
                    return data;
                })
            }

        };


    };
})(jQuery);