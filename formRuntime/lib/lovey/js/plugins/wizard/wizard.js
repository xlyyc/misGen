/**
 * 步骤组建
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
if (typeof (LoveyUIManagers) == "undefined") LoveyUIManagers = {};
(function ($) {
    $.fn.loveyGetWizardManager = function () {
        return LoveyUIManagers[this[0].id + "_Wizard"];
    };

    //参数命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.wizard = {
        wizardId: "wizard", //委托页面初始化的元素id
        btnContainer: "btn_container", //按钮的容器区域
        formContainer: "form_step", //step的form的容器区域
        initJson: [], //初始化json
        items: [], //步骤参数集合
        wizardType: "id", //步骤的初始类型，默认id
        successFunction: "",//成功执行的函数
        lastFunction: "",//最后一步可以执行自己的函数，而不是默认的提交
        liEvent: false//li是否允许被点击
    };

    //函数命名空间
    $.loveyWizard = $.loveyWizard || {};

    /**
     * 构造一个Jquery的对象级别插件,委托页面的id元素初始化
     * @param options 参数集合
     * @return {*}
     */
    $.fn.loveyInitWizard = function (options) {
        var op = $.extend({}, $.loveyDefaults.wizard, options || {});

        this.each(function () {
            $.loveyWizard.loveyAddWizard(this, op);
        });

        //返回管理器
        if (this.length == 0) return null;
        if (this.length == 1) return $(this[0]).loveyGetWizardManager();

        //如果初始化的是个数组，返回管理器的集合
        var managers = [];
        this.each(function () {
            managers.push($(this).loveyGetWizardManager());
        });
        return managers;
    };

    /**
     * 构造一个类级别插件
     * @param wizard 初始化的元素对象
     * @param options 参数集合
     */
    $.loveyWizard.loveyAddWizard = function (wizard, options) {
        //如果已经初始化或者步骤为空则返回
        if (wizard.userWizard) return;

        /**
         * 构造li元素集合
         * @type {Array}
         */
        var wizardHtml = [];

        var g = {
            addItem: function (i, item, total) {
                //li的初始化
                if (item.active) {
                    wizardHtml.push("<li class=\"active\" url=" + (item.url == undefined ? '""' : item.url) + " stepid=" + (item.stepId == undefined ? '""' : item.stepId) + ">");
                } else if (i == (total - 1)) {
                    wizardHtml.push("<li class=\"last\" url=" + (item.url == undefined ? '""' : item.url) + " stepid=" + (item.stepId == undefined ? '""' : item.stepId) + ">");
                } else {
                    wizardHtml.push("<li url=" + (item.url == undefined ? '""' : item.url) + " stepid=" + (item.stepId == undefined ? '""' : item.stepId) + ">");
                }
                wizardHtml.push("<a href=\"javascript:void(0)\">");
                wizardHtml.push("<h4>" + (item.title == undefined ? '未知' : item.title) + "</h4>");
                wizardHtml.push("<span>" + (i + 1) + "</span>");
                wizardHtml.push("</a>");
                wizardHtml.push("</li>");
            },
            activeLi: function (activeLi, currentLi, isPrev) {
                //移动到下一个
                var stepId = activeLi.attr("stepid");
                var currentStepId = currentLi.attr("stepId");
                //需要在回调函数执行成功之后才可以继续
                $(options.items).each(function (i, item) {
                        if (currentStepId == item.stepId) {
                            (typeof item.prevFunction == "function" && isPrev) && item.prevFunction();
                            (typeof item.nextFunction == "function" && !isPrev) && item.nextFunction();
                        }
                    }
                );
                //清除激活样式,区域内容隐藏
                g.wizardLiElement.each(function (i, item) {
                    $(item).removeClass("active");
                    $("#" + $(item).attr("stepid")).addClass("hidden");
                });

                //点击的元素加上激活样式，打开激活的区域内容
                activeLi.addClass("active");
                $("#" + stepId).removeClass("hidden");

                g.btnInit(activeLi);
            }, liInit: function () {
                //激活的区域需要打开区域信息
                g.wizardLiElement.each(function (i, item) {
                    if ($(item).hasClass("active")) {
                        //打开对应的step的信息区域
                        $("#" + $(item).attr("stepid")).removeClass("hidden");
                        //确定按钮初始化
                        g.btnInit($(item));
                    } else {
                        $("#" + $(item).attr("stepid")).addClass("hidden");
                    }
                });
            },
            liClickEvent: function () {
                if (!options.liEvent){
                    $("#wizard>li").addClass("noactive");//取消导航hover效果
                    return;
                }
                g.wizardLiElement.unbind("click").click(function () {
                    var thisElement = $(this);
                    var stepId = thisElement.attr("stepid");
                    //清除激活样式,区域内容隐藏
                    g.wizardLiElement.each(function (i, item) {
                        $(item).removeClass("active");
                        $("#" + $(item).attr("stepid")).addClass("hidden");
                    });
                    //点击的元素加上激活样式，打开激活的区域内容
                    thisElement.addClass("active");
                    $("#" + stepId).removeClass("hidden");
                    g.btnInit(thisElement);
                })
            },
            btnInit: function (currentObj) {
                //li的点击按钮的增加
                var prevElement = currentObj.prev();
                var nextElement = currentObj.next();
                g.btnHtml = [];
                //如果没有下一个，表明已到最后一步了
                if (options.items.length == 1) {
                    g.btnHtml.push("<a href=\"javascript:void(0)\" class=\"ui_btn ui_btn_success btn_last\">完成</a>");
                } else if (options.items.length > 1 && nextElement.length == 0) {
                    g.btnHtml.push("<a href=\"javascript:void(0)\" class=\"ui_btn btn_prev\">上一步</a>");
                    g.btnHtml.push("<a href=\"javascript:void(0)\" class=\"ui_btn ui_btn_success btn_last\">完成</a>");
                } else if (prevElement.length == 0) {
                    //如果没有上一步，表明是第一步
                    g.btnHtml.push("<a href=\"javascript:void(0)\" class=\"ui_btn ui_btn_info btn_next\">下一步</a>");
                } else {
                    g.btnHtml.push("<a href=\"javascript:void(0)\" class=\"ui_btn btn_prev\">上一步</a>");
                    g.btnHtml.push("<a href=\"javascript:void(0)\" class=\"ui_btn ui_btn_info btn_next\">下一步</a>");
                }
                $("#" + options.btnContainer).html(g.btnHtml.join(""));

                //按钮点击事件绑定
                g.btnClickEvent();
            },
            btnClickEvent: function () {
                //li的点击事件的监听
                var btnElement = $("#" + options.btnContainer + "> a");

                btnElement.unbind("click").click(function () {
                    var activeElement = $("li.active", g.wizardElement);
                    var prevElement = activeElement.prev();
                    var nextElement = activeElement.next();
                    var clickBtn = $(this);
                    var formElement = $("#" + options.formContainer);
                    var liElement = $("#" + options.wizardId + ">li.active");
                    var currentStepId = liElement.attr("stepId");

                    if (nextElement.length == 0 && clickBtn.hasClass("btn_last")) {
                        //绑定表单验证
                        formElement.validationEngine();

                        if ($.validationEngine.doValidate("#form_step", {validateElement: liElement.attr("stepid")})) {
                            //验证通过关闭对话框，并弹出提示框
                            if (typeof options.lastFunction == "function") {
                                options.lastFunction();

                                return;
                            }

                            var openOptions = {
                                content: easyloader.sysloading,
                                allowClose: false,
                                showButton: false,
                                isDrag: false,
                                showTitle: false,
                                completeFunction: function () {
                                    //这里是异步提交，需要注意,准备好Options对象
                                    var formOptions = {
                                        dataType: "json",
                                        success: function (data) {
                                            if (data.status == 1) {
                                                if (typeof options.successFunction == "function") options.successFunction();

                                                //关闭对话框
                                                $.ligerDialog.close();
                                            } else {
                                                $.ligerDialog.waitting("处理失败", 5000, true, function () {
                                                    $.ligerDialog.close();
                                                });
                                            }
                                        }
                                    };

                                    // 提交表单,将options传给ajaxSubmit
                                    formElement.ajaxSubmit(formOptions);
                                    // 为了防止普通浏览器进行表单提交和产生页面导航（防止页面刷新？）返回false
                                    return false;
                                }
                            };

                            //异步提交必须等待对话框打开才开始
                            $.ligerDialog.open(openOptions);
                        }
                    }

                    if (prevElement.length != 0 && clickBtn.hasClass("btn_prev")) {
                        //需要在回调函数执行成功之后才可以继续
                        $(options.items).each(function (i, item) {
                            //执行当前步骤的校验函数，成功后执行下一步
                            if (currentStepId == item.stepId) {
                                //点击上一步
                                if (item.prevValidateFunction != undefined) {
                                    if ((typeof item.prevValidateFunction == "function") && item.prevValidateFunction()) {
                                        prevElement.click();
                                        g.activeLi(prevElement, liElement, true);
                                    }
                                } else {
                                    prevElement.click();
                                    g.activeLi(prevElement, liElement, true);
                                }
                            }
                        });
                    }

                    if (nextElement.length != 0 && clickBtn.hasClass("btn_next")) {
                        //需要在回调函数执行成功之后才可以继续
                        $(options.items).each(function (i, item) {
                            //执行当前步骤的校验函数，成功后执行下一步
                            if (currentStepId == item.stepId) {
                                //点击下一步
                                if (item.nextValidateFunction != undefined) {
                                    if ((typeof item.nextValidateFunction == "function") && item.nextValidateFunction()) {
                                        nextElement.click();
                                        g.activeLi(nextElement, liElement, false);
                                    }
                                } else {
                                    nextElement.click();
                                    g.activeLi(nextElement, liElement, false);
                                }
                            }
                        });
                    }
                })
            }
        };

        //取得绑定的元素对象
        g.wizardElement = $(wizard);
        //在初始化元素的前面和后面加上一些内容
        g.wizardElement.before("<span class=\"left\"></span>");
        g.wizardElement.after("<span class=\"right\"></span>");

        $(options.items).each(function (i, item) {
            g.addItem(i, item, options.items.length);
        });

        //将li的元素块插入到节点末尾
        g.wizardElement.append(wizardHtml.join(""));
        //li初始化
        g.wizardLiElement = $("#" + options.wizardId + "> li");
        //li状态控制
        g.liInit();
        //绑定点击事件
        g.liClickEvent();


        g.wizardLiElement.each(function(index,m){

            $("a:first",$(m)).width($("a:first",$(m)).width());
        });

        if (wizard.id == undefined) wizard.id = "LoveyUI_" + new Date().getTime();
        LoveyUIManagers[wizard.id + "_Wizard"] = g;

        wizard.userWizard = true;
    }
})
    (jQuery);