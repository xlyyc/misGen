/**
 * jQuery 通用的确认对话框
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
(function ($) {
    //命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.Confirm = {
        container:'confirm_container', //必选 string, id name for collect container. Default is "collect_container"
        confirmclass:'btn_collect', //必选 string class name for collect,当为删除的时候afterclass可以不给出
        afterclass:'btn_collect_selected', // 非必须 当为收藏操作等相似动作必选给出,操作以后要显示的class
        msg:'', //必选 提示信息
        deleteFlag:true, //是否删除操作
        successFunction:null//成功之后执行的回调函数
    };

    //组件提示从参数集合
    $.loveyDefaults.ConfirmString = {
        relnotexits:'A标签的处理地址未给出！',
        delerrorinfo:'删除提醒信息MSG未指定！',
        errorinfo:'错误！可能原因：参数配置错误、响应出现异常。',
        holdchar:'/%s/', //replace，替换的占位符标准，用于数字
        collectMsg:'取消收藏<b>(/%s/)</b>', //收藏的提示信息
        cancelCollectMsg:'收藏<b>(/%s/)</b>', //取消收藏的提示信息
        deleteMsg:'确认删除/%s/吗？'//删除提示信息
    };

    //函数命名空间
    $.loveyConfirm = $.loveyConfirm || {};

    /**
     * 主函数入口，提供收藏的方法
     * @param options
     */
    $.loveyConfirm.confirm = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.Confirm, $.loveyDefaults.ConfirmString, options || {});
        //搜索的元素
        var search_elem = $("#" + op.container);

        var g = {
            deleteFun:function () {
                g.delMsg = op.deleteMsg;
                if (op.msg == '') {
                    $.ligerDialog.alert(op.delerrorinfo, '提示', 'error');
                    return;
                } else {
                    g.delMsg = g.delMsg.replace(op.holdchar, op.msg);
                }
                //删除确认对话框
                $.ligerDialog.confirm(g.delMsg, function (r) {
                    if (r) {
                        $.ajax({
                            type:"post",
                            url:g.url,
                            dataType:'json',
                            success:function (data) {
                                if (data.status) {
                                    //删除元素的父级元素
                                    g.href_parent_elem = g.href_elem.parent();
                                    if (g.href_parent_elem[0].nodeName.toLowerCase()=='td') {
                                        g.href_parent_elem = g.href_parent_elem.parent();
                                    }
                                    //淡出方式操作当前元素
                                    g.href_parent_elem.fadeOut("slow", function () {
                                        g.href_parent_elem.remove();
                                    });

                                    //成功的回调函数
                                    if (op.successFunction) op.successFunction(g);
                                } else {
                                    $.ligerDialog.alert(data.msg, '提示', 'error');
                                }
                            },
                            error:function (data) {
                                $.ligerDialog.error(op.errorinfo);
                            }
                        });
                    }
                });
            }, confirm:function () {
                $.ajax({
                    type:"post",
                    url:g.url,
                    dataType:'json',
                    success:function (data) {
                        if (data.status) {
                            var msg = op.msg;
                            if (msg != '') {
                                msg = msg.replace(op.holdchar, data.count);
                            }
                            //样式操作
                            if (op.afterclass != '') {
                                g.href_elem.removeClass(op.confirmclass).addClass(op.afterclass);
                                var confirmurl = g.href_elem.attr("rel");
                                var afterurl = g.href_elem.attr("togglerel");
                                g.href_elem.attr("rel", afterurl);
                                g.href_elem.attr("togglerel", confirmurl);
                            }
                            //内容操作
                            g.href_elem.html(msg);
                        } else {
                            $.ligerDialog.alert(data.msg, '提示', 'error');
                        }
                    },
                    error:function (data) {
                        $.ligerDialog.error(op.errorinfo);
                    }
                });
            }
        }

        //委托所有的收藏 指定搜索访问
        $("." + op.confirmclass, search_elem).live("click", function () {
            g.href_elem = $(this);
            g.url = g.href_elem.attr("rel");

            if (g.url == undefined || g.url == '') {
                $.ligerDialog.waitting(op.relnotexits, 3000);
            } else {
                //分为两种情况，需要用户确定，不需要用户确认，异步和服务器进行交互
                op.deleteFlag ? g.deleteFun() : g.confirm();
            }
        });
    }

})
        (jQuery);