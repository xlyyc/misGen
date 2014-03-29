/**
 * jQuery Iframe择组件
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
//定义一个内部管理器
if (typeof (LoveyUIManagers) == "undefined") LoveyUIManagers = {};
(function ($) {
    //JQ扩展函数
    $.fn.loveyGetDropMenuManager = function () {
        return LoveyUIManagers[this[0].id + "_DropMenu"];
    };

    //组件命名空间定义
    $.loveyDropMenu = $.loveyDropMenu || {};

    //组件参数集合定义
    $.loveyDropMenu.Default = {
        dropMenuId: "downmenu", //弹出菜单的监听容器
        confirmclass: "menu-list" //监听点击的元素
    };

    $.loveyDropMenu.init = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyIframe.Default, options || {});

        var dropMenuObj = $("#downmenu li:has(div)>a");
        var dropMenuLiObj = $("#downmenu li");
        dropMenuObj.append("<span class='downarrowclass'></span>");
        dropMenuObj.css("padding-right", "20px");

        dropMenuLiObj.hover(function () {
            $(this).addClass("menu3-activ");
        });
        dropMenuLiObj.mouseleave(function () {
            $(this).removeClass("menu3-activ");
        });
        dropMenuLiObj.click(function () {
            dropMenuLiObj.removeClass("active");
            $(this).addClass("active");
        });

        $("#downmenu a").click(function () {
            $("#downmenu .menu3-son").removeClass("menu3-son");
        });
        $(".menu-list a").click(function () {
            $(this).addClass("menu3-son");
        });
    }

})(jQuery);