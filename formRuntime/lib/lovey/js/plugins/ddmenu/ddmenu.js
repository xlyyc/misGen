/**
 * 多级下拉菜单
 *
 * Author xiangxu＠wisedu.com
 * history:
 * @update: sjsong01@widedu.com 2013-11-04 添加一种新的样式，变改变li hover时的状态
 *
 */
(function ($) {
    $.fn.ddmenu = function (options) {
        //参数装配
        var opts = $.extend({}, $.fn.ddmenu.defaults, options || {});
        var ddmenu = $(this);
        var menu_id = $(this).attr('id');
        if(opts.dataurl){
            var menu_ul = $('#'+menu_id+' > ul');
            $.getJSON(opts.dataurl,function(data){
                var datarow = data.Rows;
                mparse(datarow, menu_ul);
                hover_fun();
            });
            function mparse( menu_object, ele){
                $.each(menu_object, function(key, value) {
                    var o_url = value['url'];
                    var o_pkId = value['pkId'];
                    var o_child = value['children'];
                    var o_nodename = value['treeNodeName'];
                    var o_title = value['title'];
                    if(typeof o_url == "undefined"){
                        ele.append('<li  title= "'+o_title+'" id="id'+ o_pkId +'"><a href="javascript:void(0)"><i class="icon_home icon_white"></i>'+ o_nodename +'</a></li>');
                    }else {
                        ele.append('<li title= "'+o_title+'" id="id'+ o_pkId +'"><a href="javascript:void(0)" class="open_iframe" rel="'+ o_url +'"><i class="icon_home icon_white"></i>'+ o_nodename +'</a></li>');
                    }

                    if( typeof  o_child != "undefined" ) {
                        $("#id"+o_pkId).append('<ul class="ul'+ o_pkId +'"></ul>');
                        var second_ele = $(".ul" + o_pkId);
                        mparse(o_child, second_ele);
                    }
                });

            };
        }else {
            hover_fun();
        }
        function hover_fun(){
            if( opts.className == "ddmenu_style02") {
                var liElement = $("#"+menu_id+"> ul > li");
                ddmenu.addClass(opts.className);
                liElement.hover(function () {
                    $(this).addClass("hover");
                    $(this).find("ul").css("visibility", "visible");
                    $(this).parent().prev('a').addClass("text_color");
                }, function () {
                    $(this).removeClass("hover");
                    $("ul", this).css("visibility", "hidden");
                    $(this).parent().prev('a').removeClass("text_color");
                });
            }else{
                var liElement = ddmenu.find("li");
                ddmenu.addClass(opts.className);
                $("li ul li:has(ul)").find("a:first").append("<span class=\"menu_arrow_down\">箭头</span>");
                liElement.hover(function () {
//            alert("show");
                    $(this).addClass("hover");
                    $("a:first > span", this).addClass("menu_arrow_white");
                    $("ul:first", this).css("visibility", "visible");
                    $(this).parent().prev('a').addClass("text_color");
                }, function () {
//            alert("hidden");
                    $(this).removeClass("hover");
                    $("a:first > span", this).removeClass("menu_arrow_white");
//            setTimeout( function(){
                    $("ul:first", this).css("visibility", "hidden");
//            },1000);
                    $(this).parent().prev('a').removeClass("text_color");
                });
            }

            /*liElement.click(function(){
                var txt = $("a",this).text();
                return false;
            });*/   /*看起来这段代码没用，和下面的点击动作冲突  by sjsong01@wisedu.com*/
        }

    };
    $.fn.ddmenu.defaults = {
        className: "ddmenu_style01", //默认样式
        dataurl: null //根据json文件读取菜单数据
    };
})(jQuery);
