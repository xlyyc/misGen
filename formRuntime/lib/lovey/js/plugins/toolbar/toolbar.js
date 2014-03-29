/**
 * jQuery ligerUI 1.1.0.1
 *
 * Author leoxie [ gd_star@163.com ]
 *
 */
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($) {
    ///	<param name="$" type="jQuery"></param>

    $.fn.ligerGetToolBarManager = function () {
        return LigerUIManagers[this[0].id + "_ToolBar"];
    };
    $.fn.ligerToolBar = function (p) {
        this.each(function () {
            if (this.usedToolBar) return;

            var g = {
                addItem:function (item) {
                    var ditem = $('<div class="l-toolbar-item l-panel-btn"><div class="l-panel-btn-l"><span></span></div><div class="l-panel-btn-r"></div></div>');
                    g.toolBar.append(ditem);
                    item.id && ditem.attr("toolbarid", item.id);
                    if (item.icon) {
                        var iconObj = $(".l-panel-btn-l span", ditem);
                        iconObj.before("<div class='l-icon l-icon-" + item.icon + "'></div>");
                        ditem.addClass("l-toolbar-item-hasicon");
                    }
                    if (item.line) {
                        ditem.before("<div class='l-toolbar-split'></div>");
                    }
                    item.text && $("span:first", ditem).html(item.text+(item.tips?'<b id="l-toolbar-tips" class="l-toolbar-tips">'+item.tips+'</b>':''));
                    item.disable && ditem.addClass("l-toolbar-item-disable") && ditem.addClass("l-panel-btn-disable");
                    if (!ditem.hasClass("l-toolbar-item-disable")) {
                        item.click && ditem.click(function () {
                            item.click(item);
                        });
                        ditem.hover(function () {
                            $(this).addClass("l-panel-btn-over");
                        }, function () {
                            $(this).removeClass("l-panel-btn-over");
                        });
                    }
                },
                //菜单工具栏的setDisable事件，add by sunhao @2012-03-20 16：41
                setDisable:function (itemId) {
                    //从页面获取这个按钮
                    var item = $("[toolbarid=" + itemId + "]");
                    //加上样式
                    item.addClass("l-toolbar-item-disable");
                    item.addClass("l-panel-btn-disable");
                    //解除绑定的click事件
                    item.unbind("click");
                    //解除绑定的hover事件
                    item.unbind("hover");
                },
                //菜单工具栏的setEnable事件，add by sunhao @2012-03-20 17:11
                setEnable:function (itemId, p) {
                    //从页面获取这个按钮
                    var item = $("[toolbarid=" + itemId + "]");
                    //移除样式
                    item.removeClass("l-toolbar-item-disable");
                    //重新注册click的监听
                    p.click && item.click(function () {
                        p.click(p);
                    });

                    //重新注册鼠标hover的事件监听
                    item.hover(function () {
                        $(this).addClass("l-panel-btn-over");
                    }, function () {
                        $(this).removeClass("l-panel-btn-over");
                    });
                }
            };
            g.toolBar = $(this);
            if (!g.toolBar.hasClass("l-toolbar")) g.toolBar.addClass("l-toolbar");
            if (p.items) {
                $(p.items).each(function (i, item) {
                    g.addItem(item);
                });
            }
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_ToolBar"] = g;
            this.usedToolBar = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_ToolBar"];
        var managers = [];
        this.each(function () {
            managers.push(LigerUIManagers[this.id + "_ToolBar"]);
        });
        return managers;
    };

})(jQuery);