/**
 * jQuery 文件选择组件
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
//定义一个内部管理器
if (typeof (LoveyUIManagers) == "undefined") LoveyUIManagers = {};
(function ($) {
    //JQ扩展函数
    $.fn.loveyGetSelectFileManager = function () {
        return LoveyUIManagers[this[0].id + "_FileSelect"];
    };

    //命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.FileSelect = {
        title: '请选择', //对话框的标题
        width: 665, //对话框的宽度
        height: 520, //对话框的高度
        checkbox: false, //是否可以上传多个文件
        preview: false, //是否预览，默认否，非必须参数
        initJson: [], //初始化json
        initFunction: null,//初始化的执行函数
        maxItemCount: 0, //最大可选数0不限制
        resType: '', //附件所属的资源类型
        resId: '', //附件所属的资源编号
        inputName: 'nodeId', //回写的文件域的隐藏表单的name
        save: true, //新增还是保存，新增的时候是html，编辑的时候是append
        items: [], //tab参数,[{title,url,params,isUpload}]
        jsessionid: "", // jsessionid，用于在非IE浏览器上传文件时保持session
        local: "", //国际化处理，默认中文
        fileTypeDescription: '附件上传', //文件类型描述
        fileTypes: '*.*', //文件类型限制，多个用半角分号隔开，如*.doc;*.jpg
        fileSizeLimit: 100 * 1024 * 1024, //单个文件大小上限，默认100M
        totalUploadSize: 1000 * 1024 * 1024, //总共文件上传大小上限,默认1G
        params: {}, //传递给Flash URL的参数，形如：{name1 : value1, name2 : value2}，则会生成URL形如：URL?name1=value1&name2=value2
        completeFunction: 'completeUpload', //上传完毕后执行的函数,只有开启上传组件才有实际意思,外层可以复写，且必须放置到最高层页面
        dealFiles: null, //上传完毕后执行的函数
        serverTimeUrl: easyloader.URI + "/selectFile/getServerTime.do",//获取服务器时间
        getTempFilesUrl: easyloader.URI + "/selectFile/getTempFiles.do",//上传成功后获取文件的接口
        iframeId: "",//指定模板搜索的区域，默认去父页面
        readOnly: false,//只读模式
        displayModel: false,//隐藏模式
        showSuccessUpload: false,//上传成功之后把信息回显客户端
        useTemplates: false,//使用模板
        ckEditor: null,//ck对象
        ckEditorName: "",//和ckEditor集成使用
        removeFun: null//删除文件的时候执行的函数
    };

    //组件提示从参数集合
    $.loveyDefaults.FileSelectString = {
        titleMessage: '提示', //提示文本标题
        waittingMessage: '正在等待中,请稍候...',
        warnMessage: '元素类型非法，请检查绑定的元素是否合法。'
    };

    $.loveySelectFile = $.loveySelectFile || {};

    //删除点击的附件
    $.loveySelectFile.remove = function (elId, deleteUrl, iframeId, bindId) {
        $.ligerDialog.confirm("确认删除吗？", function (r) {
            if (r && deleteUrl != undefined && deleteUrl != "") {
                //todo by yzhao 如果和tab选择组件一起使用需要改进
                $.ajax({
                    type: "get",
                    url: deleteUrl,
                    dataType: "json",
                    success: function (data) {
                        if (data.status == 1) {
                            if (bindId && $("#" + bindId).loveyGetSelectFileManager().options.removeFun && $("#" + bindId).loveyGetSelectFileManager().options.removeFun(elId) == false) return false;
                            if (iframeId != "" && easyloader.isIframe && parent.navtab != undefined) {
                                //取得tab的manager管理器,取得选中的tab项,并去查找看是否是flash上传,返回字符串
                                var selectTabId = parent.navtab.selectedTabId;
                                var selectTab = parent.$("div[tabid=" + selectTabId + "]");
                                //JQ选择器的ID里面不能含有|否则选择器失效，不明白原因
                                $("#file_" + elId, $("iframe", selectTab)[0].contentWindow.document).remove();
                            } else {
                                $("#file_" + elId).remove();
                            }
                        } else {
                            $.ligerDialog.alert(data.msg, '提示', 'error');
                        }
                    }
                });
                /*if (init) {
                 //取得tab的manager管理器
                 var manager = $("#content").ligerGetTabManager();
                 //取得选中的tab项,并去查找看是否是flash上传,返回字符串
                 var selectTabId = manager.selectedTabId;
                 var selectTab = $("div[tabid=" + selectTabId + "]");
                 //JQ选择器的ID里面不能含有|否则选择器失效，不明白原因
                 $("#file_" + elId, selectTab).remove();
                 } else {
                 $("#file_" + elId).remove();
                 }*/
            }
        });
    };

    /**
     *  主函数方法入口,对象基本插件，给JQ对象添加方法
     * @param options
     */
    $.fn.loveySelectFile = function (options) {
        //参数装配,重新定义防止客户端未定义的情况下出错
        var op = $.extend({}, $.loveyDefaults.FileSelect, $.loveyDefaults.FileSelectString, options || {});
        this.each(function () {
            if (this.usedSelect) return;

            //变量定义
            var gg = {
                //初始化选择器
                initSelect: function () {
                    gg.img.click(function () {
                        $.ajax({
                            type: "get",
                            url: op.serverTimeUrl,
                            dataType: "json",
                            success: function (data) {
                                if (data.status == 1) {
                                    //定义个全局变量作为上传成功的回调函数使用
                                    if (easyloader.dialogToTop) {
                                        $.ligerDialog.getWindow().$.flashResource = {element: gg.bindingDiv, resType: op.resType, resId: op.resId, inputName: op.inputName, uploadTime: data.serverTime, checkbox: op.checkbox, save: op.save, getTempFilesUrl: op.getTempFilesUrl, attachmentPanelUl: gg.attachmentPanelUl, showSuccessUpload: op.showSuccessUpload, useTemplates: op.useTemplates, iframeId: op.iframeId, ckEditorName: op.ckEditorName, dealFiles: op.dealFiles, bindId: gg.bindingDiv.attr("id"), currentWindow: window, ckEditor: op.ckEditor};
                                    } else if (easyloader.isIframe) {
                                        parent.$.flashResource = {element: gg.bindingDiv, resType: op.resType, resId: op.resId, inputName: op.inputName, uploadTime: data.serverTime, checkbox: op.checkbox, save: op.save, getTempFilesUrl: op.getTempFilesUrl, attachmentPanelUl: gg.attachmentPanelUl, showSuccessUpload: op.showSuccessUpload, useTemplates: op.useTemplates, iframeId: op.iframeId, ckEditorName: op.ckEditorName, dealFiles: op.dealFiles, bindId: gg.bindingDiv.attr("id"), currentWindow: window, ckEditor: op.ckEditor};
                                    } else {
                                        $.flashResource = {element: gg.bindingDiv, resType: op.resType, resId: op.resId, inputName: op.inputName, uploadTime: data.serverTime, checkbox: op.checkbox, save: op.save, getTempFilesUrl: op.getTempFilesUrl, attachmentPanelUl: gg.attachmentPanelUl, showSuccessUpload: op.showSuccessUpload, useTemplates: op.useTemplates, iframeId: op.iframeId, ckEditorName: op.ckEditorName, dealFiles: op.dealFiles, bindId: gg.bindingDiv.attr("id"), currentWindow: window, ckEditor: op.ckEditor};
                                    }
                                    var ckEditor =  op.ckEditor;
                                    gg.openSelect(op);
                                    op.ckEditor=ckEditor;
                                } else {
                                    $.ligerDialog.error('响应出现异常。');
                                }
                            }
                        });

                    });
                }, openSelect: function (options) {
                    options.ckEditor=null;
                    $.ligerDialog.open({
                        title: options.title,
                        content: '<div id="selectFiles" class="l-dialog-hack"><script type="text/javascript"> $(document).ready(function () {using(["selectfiles","tab","grid", "toolbar","imagepreview"], function() {$("#selectFiles").loveySelect(' + JSON.stringify(options) + ');});});</script></div>',
                        width: options.width,
                        height: options.height,
                        buttons: [
                            { text: '确定', onclick: function (item, dialog) {
                                //取得tab的manager管理器
                                var manager = $("#content", dialog).ligerGetTabManager();
                                //取得选中的tab项,并去查找看是否是flash上传,返回字符串
                                var selectTabId = manager.selectedTabId;
                                var isFlashUpload = $("div[tabid=" + selectTabId + "]", dialog).attr("flashUpload");

                                if (isFlashUpload == 'true') {
                                    gg.processFlash(selectTabId, dialog);
                                } else {
                                    gg.processGrid(selectTabId, dialog);
                                }
                            }, className: "l-button-sure"},
                            { text: '取消', onclick: function (item, dialog) {
                                dialog.close();
                            }}
                        ]
                    });
                }, processFlash: function (tabId, dialog) {
                    //取得选中的tab项的grid管理器
                    validation(dialog, options);
                }, processGrid: function (tabId, dialog) {
                    //取得选中的tab项的grid管理器
                    var gridManager = $("#" + tabId, dialog).ligerGetGridManager();
                    //判断是单选还是复选并取得grid的manager管理器
                    var checkedData = [];
                    //输入框模式的回写
                    gg.inputHtml = [];
                    //div模式的时回写
                    gg.divHtml = [];
                    if (op.checkbox) {
                        checkedData = gridManager.getCheckedRows();

                        //获取当前已存在的li元素数组
                        var liArray = [];
                        $("li", gg.attachmentPanelUl).each(function (i, item) {
                            liArray.push(parseInt($(item).attr("initId")));
                        });

                        var canAddFiles = false;
                        //过滤已经操作过的数组
                        if (liArray.length > 0) {
                            var len = checkedData.length;
                            for (var ii = 0; ii < len; ii++) {
                                //判断集合的数据是否已存在
                                var isInArray = $.inArray(checkedData[ii].resId, liArray);
                                if (isInArray >= 0) {
                                    canAddFiles = true;
                                    checkedData.splice(ii, 1);
                                    //会改变数组的长度
                                    len = checkedData.length;
                                    --ii;
                                }
                            }
                        }

                        if (canAddFiles) {
                            $.ligerDialog.alert("请不要重复添加文件！", "提示", "warn");
                            return false;
                        }

                        //是否选择行判断
                        if (checkedData == null || checkedData.length == 0) {
                            $.ligerDialog.alert("请选择要添加的附件", "提示", "warn");
                            return false;
                        }

                        if (op.maxItemCount != 0 && checkedData.length > op.maxItemCount) {
                            $.ligerDialog.alert("已达到最大可添加的附件数！", "提示", "warn");
                            return false;
                        }

                        //已选的文件初始化
                        /*$("li", gg.bindingDiv).each(function () {
                         var value = $(this).attr("initId");
                         var name = $("span", $(this)).text();
                         gg.divHtml.push("<li id=file_" + value + "><span>" + name + "</span><a href='javascript:void(0);' onclick=\"$.loveySelectFile.remove({fileId:'" + value + "'})\"></a>");
                         gg.divHtml.push("<input type='hidden' name='" + op.inputName + "' value='" + value + "'/>");
                         gg.divHtml.push("</li>");
                         });*/

                        //往多功能编辑器里面回写信息
                        if (op.ckEditorName != "" && typeof CKEDITOR != "undefined") {
                            var tmplStr = $.createTemplate("{#foreach $T as file}<img src=\"{$T.file.fileUrl}\" alt=\"{$T.file.name}\"/>{#/for}");
                            var imageStr = $.processTemplateToText(tmplStr, checkedData);
                            CKEDITOR.instances[op.ckEditorName].insertHtml(imageStr);
                        }

                        var count = 0;
                        for (var i = 0; i < checkedData.length; i++) {
                            //选中的文件回写到指定的区域
                            if (gg.tagName == 'input' || gg.tagName == 'textarea') {
                                gg.inputHtml.push(checkedData[i].filePath);
                                if (count < (checkedData.length - 1)) {
                                    gg.inputHtml.push("|");
                                }
                            } else if (!op.useTemplates) {
                                //选中的文件回写到指定的区域
                                gg.divHtml.push("<li initId='" + checkedData[i].resId + "' id='file_" + checkedData[i].resId + "'><span>" + checkedData[i].fileName + "(" + formatSize(checkedData[i].fileSize) + ")</span><a href='javascript:void(0);' onclick=\"$.loveySelectFile.remove('" + checkedData[i].resId + "','" + checkedData[i].deleteUrl + "','','" + gg.bindingDiv.attr("id") + "')\"></a>");
                                gg.divHtml.push("<input type='hidden' name='" + op.inputName + "' value='" + checkedData[i].resId + "'/>");
                                gg.divHtml.push("</li>");
                            }
                            count++;
                        }

                        if (gg.tagName == 'input' || gg.tagName == 'textarea') {
                            gg.bindingDiv.val(gg.inputHtml.join(""));
                        } else {
                            if (op.useTemplates) {
                                var fileListObj = "";
                                if (easyloader.dialogToTop) {
                                    fileListObj = $("#fileGridList", dialog.initDocument);
                                } else if (easyloader.isIframe) {
                                    if (op.iframeId == "") {
                                        fileListObj = parent.$("#fileGridList");
                                    } else {
                                        fileListObj = $("#fileGridList", parent.$("#" + op.iframeId)[0].contentWindow.document);
                                    }
                                } else {
                                    fileListObj = $("#fileGridList");
                                }

                                if (op.save) {
                                    gg.attachmentPanelUl.setTemplate(fileListObj.text()).processTemplate(checkedData, '', '', '');
                                } else {
                                    gg.attachmentPanelUl.setTemplate(fileListObj.text()).processTemplate(checkedData, '', '', 'append');
                                }
                            } else {
                                gg.attachmentPanelUl.append(gg.divHtml.join(""));
                            }
                        }
                    } else {
                        var checkedDataObj = gridManager.getSelectedRow();

                        //获取当前已存在的li元素数组
                        var liArray = [];
                        $("li", gg.attachmentPanelUl).each(function (i, item) {
                            liArray.push(parseInt($(item).attr("initId")));
                        });

                        //过滤已经操作过的数组
                        if (liArray.length > 0 && checkedDataObj) {
                            //判断集合的数据是否已存在
                            var isInArray = $.inArray(checkedDataObj.resId, liArray);
                            if (isInArray >= 0) {
                                $.ligerDialog.alert("请不要重复添加文件！", "提示", "warn");
                                return false;
                            }
                        }

                        //是否选择行判断
                        if (checkedDataObj == null) {
                            $.ligerDialog.alert("请选择要添加的附件", "提示", "warn");
                            return false;
                        }
                        //构造数组
                        checkedData.push(checkedDataObj);

                        //往多功能编辑器里面回写信息
                        if (op.ckEditorName != "" && typeof CKEDITOR != "undefined") {
                            var tmplStr = $.createTemplate("{#foreach $T as file}<img src=\"{$T.file.fileUrl}\" alt=\"{$T.file.name}\"/>{#/for}");
                            var imageStr = $.processTemplateToText(tmplStr, checkedData);
                            CKEDITOR.instances[op.ckEditorName].insertHtml(imageStr);
                        }

                        if (gg.tagName == 'input' || gg.tagName == 'textarea') {
                            //选中的文件回写到指定的区域
                            gg.bindingDiv.val(checkedData.filePath);
                        } else {
                            if (op.useTemplates) {
                                var fileListObj = "";
                                if (op.iframeId == "") {
                                    fileListObj = parent.$("#fileGridList");
                                } else {
                                    fileListObj = $("#fileGridList", parent.$("#" + op.iframeId)[0].contentWindow.document);
                                }

                                if (op.save) {
                                    gg.attachmentPanelUl.setTemplate(fileListObj.text()).processTemplate(checkedData, '', '', '');
                                } else {
                                    gg.attachmentPanelUl.setTemplate(fileListObj.text()).processTemplate(checkedData, '', '', 'append');
                                }
                            } else {
                                gg.divHtml.push("<li initId='" + checkedDataObj.resId + "' id=file_" + checkedDataObj.resId + "><span>" + checkedDataObj.fileName + "(" + formatSize(checkedDataObj.fileSize) + ")</span><a href='javascript:void(0);' onclick=\"$.loveySelectFile.remove('" + checkedDataObj.resId + "','" + checkedDataObj.deleteUrl + "','','" + gg.bindingDiv.attr("id") + "')\"></a>");
                                gg.divHtml.push("<input type='hidden' name='" + op.inputName + "' value='" + checkedDataObj.resId + "'/></li>");

                                gg.attachmentPanelUl.append(gg.divHtml.join(""));
                            }
                        }
                    }
                    dialog.close();
                }
            };

            //通过this指针获取绑定的元素,取得绑定的元素类型，$(this)直接转换成对象取必须[0]
            gg.bindingDiv = $(this);
            //附件的展示区域，附件到绑定元素的后面
            gg.bindingDiv.after("<div id=\"attachmentPanel_" + this.id + "\" class=\"attachments_list\"><ul class=\"attachmentPanel\"></ul></div>");
            gg.initHtml = [];
            gg.attachmentPanelUl = $("#attachmentPanel_" + this.id + ">ul");
            if (typeof (op.initFunction) == "function") {
                op.initFunction();
            } else {
                if (op.initJson.length > 0) {
                    if (op.useTemplates) {
                        gg.attachmentPanelUl.setTemplate($("#fileList").text()).processTemplate(op.initJson, '', '', 'append');
                    }
                    else {
                        $(op.initJson).each(function (i, item) {
                            gg.initHtml.push("<li initId='" + item.id + "' id='file_" + item.id + "'><span><a href='" + item.downLoadUrl + "' class='attach_name'>" + item.name + "</a>(" + formatSize(item.size) + ")(上传者：" + item.creator + " 上传时间：" + moment(item.created).format("YYYY-MM-DD") + ")</span><a class='deleteFile' href='javascript:void(0);' onclick=\"$.loveySelectFile.remove('" + item.id + "','" + item.deleteUrl + "','','" + gg.bindingDiv.attr("id") + "')\"></a>");
                            gg.initHtml.push("<input type='hidden' name='" + op.inputName + "' value='" + item.id + "'/>");
                            gg.initHtml.push("</li>");
                        });
                        gg.attachmentPanelUl.html(gg.initHtml.join(""));
                    }
                }
            }

            gg.tagName = this.tagName.toLowerCase();
            gg.options = op;

            if (gg.tagName == "div") {
            } else if (gg.tagName == "input" || gg.tagName == "textarea") {
                gg.attachmentPanelUl.hide();
                gg.bindingDiv.readOnly = true;
            } else {
                $.ligerDialog.waitting(options.warnMessage, 2000);
                return;
            }

            //在绑定的元素外部包一层div，并取得父及包装后的div
            gg.selectDiv = gg.bindingDiv.wrap('<div class="btn_folder"></div>').parent();
            gg.selectDiv.append('<div class="upload_img"><a class="btn_upload" href="javascript:void(0);"><i></i>上传</a></div>');
            //icon的div
            gg.img = gg.selectDiv.find(".upload_img");
            if (op.readOnly) {
                gg.selectDiv.hide();
                $("a.deleteFile", gg.attachmentPanelUl).hide();
            }
            //调用选择框
            gg.initSelect();

            if (op.displayModel) {
                gg.selectDiv.hide();
                gg.selectDiv.next().hide();
            }

            //构造一个管理器用于存放私有方法
            if (this.id == undefined) this.id = "LoveyUI_" + new Date().getTime();
            LoveyUIManagers[this.id + "_FileSelect"] = gg;
            this.usedSelect = true;
        });

        if (this.length == 0) return null;
        if (this.length == 1) return LoveyUIManagers[this[0].id + "_FileSelect"];
        var managers = [];
        this.each(function () {
            managers.push(LoveyUIManagers[this.id + "_FileSelect"]);
        });
        return managers;
    };

    /**
     * 实现tab和grid的核心功能函数
     * @param options
     */
    $.fn.loveySelect = function (options) {
        this.each(function () {

            if (options.items.length == 0) {
                $.ligerDialog.waitting("初始化失败", 2000);
                return;
            }

            //变量定义
            var g = {
                addItem: function (i, item) {
                    //非flash上传的时候可以绘制按钮组件
                    var toolbarHtml = "";
                    if (item.flashUpload == undefined) {
                        toolbarHtml = "<div style=\"display:block; width:100%; position:relative\">" +
                            "<div id=\"toptoolbar-select-" + i + "\"></div></div>";
                    }

                    //tab的结构构造
                    var ditem = $('<div tabid="select-' + i + '"></div>');
                    ditem.html(toolbarHtml + '<div style="height:380px;/*overflow-y: scroll;*/" id="select-' + i + '"></div>');
                    $("#content", g.tabs).append(ditem);
                    item.title && ditem.attr("title", item.title);
                    item.ctxUrl && ditem.attr("ctxUrl", item.ctxUrl);
                    item.rootId && ditem.attr("rootId", item.rootId);
                    item.path && ditem.attr("path", item.path);
                    ditem.attr("currentId", item.rootId); //初始化的时候访问的是根
                    item.flashUpload && ditem.attr("flashUpload", item.flashUpload);
                }, loadDate: function (tabId, flashUpload) {
                    var tabElement = $("#" + tabId);
                    //元素的相关属性读取
                    var tbContent = tabElement.parent();
                    var ctxUrl = tbContent.attr("ctxUrl");
                    //如果是Flash上传组件
                    if (flashUpload == 'true') {
                        //上传的大小提示
                        var maxUploadSizeString = "<div class=\"uploadTips\">提示信息:单个文件大小限制：" + (options.fileSizeLimit / (1024 * 1024)) + "M</div>";
                        tabElement.html(g.showFlash(ctxUrl) + maxUploadSizeString);
                    } else {
                        var rootId = tbContent.attr("rootId");

                        //设置toptoolbar,变量一定要使用''引入，常量除外
                        $("#toptoolbar-" + tabId).ligerToolBar({ items: [
                            { text: '根目录', icon: 'copy_site', click: function () {
                                var manager = tabElement.ligerGetGridManager();
                                manager.setOptions({url: ctxUrl + '?resId' + rootId});
                                manager.loadData(true);
                            }} ,
                            { text: '后退', icon: 'back', click: function () {
                                var path = tbContent.attr("path");
                                //取得父节点
                                var parentId = g.getParentId(rootId, path);

                                //取得grid的管理器
                                var manager = tabElement.ligerGetGridManager();
                                manager.setOptions({url: ctxUrl + '?resId=' + parentId});
                                manager.loadData(true);

                                //设置重置父节点之后路径,取得为改变的现在节点
                                var currentId = tbContent.attr("currentId");
                                var backPath = g.getPath(path, rootId, currentId);
                                tbContent.attr("currentId", parentId);
                                tbContent.attr("path", backPath);
                            }}
                        ]
                        });

                        //grid数据展示
                        tabElement.ligerGrid({
                            columns: [
                                { display: '', name: 'fileAttribute', width: "10%", initDataFunc: function (o) {
                                    var fileIcon = "";
                                    if (/.png$|.gif$|.jpg$|.bmp$/.test(o[2])) {
                                        fileIcon = "<a class='grid_preview' href='javascript:void(0);' des='" + o[1] + "' rel=" + easyloader.URI + o[2] + "><img src=" + easyloader.base + "/plugins/selectfiles/images/" + o[0] + "></a>";
                                    } else {
                                        fileIcon = "<img src=" + easyloader.base + "/plugins/selectfiles/images/" + o[0] + ">";
                                    }
                                    return fileIcon;
                                }},
                                { display: '文件名称', name: 'fileName', width: "29%", align: 'left'},
                                { display: '大小', name: 'fileSize', width: "20%", align: 'left', initDataFunc: function (o) {
                                    return formatSize(o);
                                }},
                                { display: '修改时间', name: 'updateTime', width: "40%", dataCategory: 'date', format: 'hh:mm yyyy-MM-dd'}
                            ],
                            checkbox: options.checkbox,
                            pkName: 'resId', //主键
                            url: ctxUrl + '?resId=' + rootId, //初始化节点数据获取,从根节点开始
                            usePager: false,
                            headCheckbox: false,
                            allowAdjustColWidth: false,
                            enabledSort: false,
//                            height: "200",
                            //双击行空白事件
                            dblClickRow: function (param, e) {
                                //如果是文件夹则可以点进去继续加载
                                if (param.data.directory) {
                                    var manager = $("#" + tabId).ligerGetGridManager();
                                    //双击节点后的数据获取
                                    manager.setOptions({url: ctxUrl + '?resId=' + param.data.resId});
                                    manager.loadData(true);

                                    //设置当前节点的路径,和访问节点
                                    tbContent.attr("path", param.data.path);
                                    tbContent.attr("currentId", param.data.resId);
                                }
                            }, //选择行事件
                            onBeforeCheckRow: function (param, e) {
                                //节点不允许选择
                                if (e.directory) {
                                    return false;
                                }
                            },
                            onAfterShowData: function (param, e) {
                                //添加预览图片
                                if (options.preview) {
                                    $("a.grid_preview").preview();
                                }
                            }
                        });
                    }
                }, showFlash: function (url) {
                    var flashFile = [];
                    if (!options.local || options.loc == 'zh_CN' || options.local == 'zh' || options.local == 'CN') {
                        flashFile = "FlashFileUpload.swf?v=1.0";
                    } else {
                        flashFile = "FlashFileUpload_" + options.local + ".swf?v=1.0";
                    }

                    var _flashHtml = new Array();
                    _flashHtml.push("<div style=\"height:365px;padding-top: 5px;\">");
                    _flashHtml.push("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\"");
                    _flashHtml.push("codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0\"");
                    _flashHtml.push("	width=\"100%\" height=\"100%\" id=\"file\" align=\"middle\">");
                    _flashHtml.push("	<param name=\"allowScriptAccess\" value=\"sameDomain\" />");
                    _flashHtml.push("	<param name=\"movie\" value=\"" + easyloader.base + "/plugins/" + flashFile + "\" />");
                    _flashHtml.push("   <param name=\"quality\" value=\"high\" />");
                    _flashHtml.push("	<param name=\"wmode\" value=\"transparent\">");
                    var flashVars = g.submitUrl(url) + g.flashVars();
                    //console.log(flashVars);
                    _flashHtml.push("    <param name=\"FlashVars\" value='" + flashVars + "'>");
                    _flashHtml.push("    <embed src=\"" + easyloader.base + "/plugins/" + flashFile + "\" " +
                        "FlashVars='" + flashVars + "'");
                    _flashHtml.push(" quality=\"high\" wmode=\"transparent\" width=\"100%\" height=\"100%\" name=\"file\"");
                    _flashHtml.push(" align=\"middle\" allowscriptaccess=\"sameDomain\" type=\"application/x-shockwave-flash\"");
                    _flashHtml.push(" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />");
                    _flashHtml.push("</object>");
                    _flashHtml.push("</div>");
                    /*_flashHtml.push("<div>说明：无法显示上传界面，点击<a href='" + easyloader.base + "/plugins/swfobject/index.html' target='_blank'>这里更新FlashPlayer</a><br/></div>");*/
                    return _flashHtml.join("");
                }, submitUrl: function (uploadUrl) {
                    //业务参数的拼接
                    var url = "uploadPage=" + uploadUrl;
                    //var iPlanetDirectoryPro = '';
                    /*if (options.params) {
                     var count = 0;
                     //iPlanetDirectoryPro做什么使用不明白,参照wiscom.js,和;jsessionid有什么区别，Cookie里面两个多方了传一个就可以了？
                     for (var name in options.params) {
                     */
                    /*if (name == 'iPlanetDirectoryPro') {
                     iPlanetDirectoryPro = options.params[name];
                     continue;
                     }*/
                    /*
                     count++;
                     if (count == 1) {
                     url += "%3F"; // ? character.
                     } else {
                     url += "%26"; // & character.
                     }
                     url += name + "=" + encodeURIComponent(encodeURIComponent(options.params[name]));
                     }
                     }*/
                    //alert(g.joinUrl(url,options.params));
                    return g.joinUrl(url, options.params);
                }, flashVars: function () {
                    //flash的上传的订制参数拼接,这里不要进行转义
                    var flashVars = "&fileTypeDescription=" + encodeURIComponent(options.fileTypeDescription) +
                        "&fileTypes=" + encodeURIComponent(options.fileTypes) +
                        "&fileSizeLimit=" + encodeURIComponent(options.fileSizeLimit) +
                        "&totalUploadSize=" + encodeURIComponent(options.totalUploadSize) +
                        "&completeFunction=" + encodeURIComponent(options.completeFunction);

                    if (options.jsessionid && options.jsessionid != "") {
                        flashVars += "&jsessionid=" + encodeURIComponent(options.jsessionid);
                    }

                    return flashVars;
                }, joinUrl: function (url, params) {
                    //这里必须转义否则获取会有问题
                    if (params) {
                        var count = 0;
                        for (var name in params) {
                            count++;
                            if (count == 1) {
                                url += "%3F"; // ? character.
                            } else {
                                url += "%26"; // & character.
                            }
                            url += name + "=" + encodeURIComponent(encodeURIComponent(params[name]));
                        }
                    }

                    return url;
                }, getParentId: function (rootId, path) {
                    var parentId = '';
                    var array = path.split("|" + rootId + "|");

                    if (array[1] == '') {
                        parentId = rootId;
                    } else {
                        var str = array[1];
                        var len = str.length;
                        var tp = str.substring(0, (len - 1));
                        var tpArray = tp.split("|");

                        //如果不可分割去当前，否则取-1
                        if (tpArray.length > 1) {
                            parentId = tpArray[tpArray.length - 2];
                        } else {
                            parentId = rootId;
                        }
                    }

                    return parentId;
                }, getPath: function (path, rootId, currentId) {
                    if (rootId == currentId) {
                        return path;
                    }

                    var str = currentId + '|';
                    var plen = path.length;
                    var strlen = str.length;

                    return path.substring(0, (plen - strlen));
                }
            };

            //绘制Tab的区域
            g.tabs = $(this);

            //组件整体框架
            var frame = $('<div class="tab_style06"><div id="content"></div></div>');
            g.tabs.append(frame);

            if (options.items) {
                $(options.items).each(function (i, item) {
                    g.addItem(i, item);
                });
            }
            //加载等待动画
            g.loading = $("<div class='l-tree-loading'></div>");
            //绘制tab的区域，添加tab被选中之后的事件
            $("#content", g.tabs).ligerTab({
                onAfterSelectTabItem: function (tabId) {
                    //搜索指定的tab下的div元素对象
                    var div = $("div[tabid=" + tabId + "]");
                    var flashUpload = div.attr("flashUpload");

                    //展示数据
                    g.loadDate(tabId, flashUpload);
                }
            });
        })
    }
})(jQuery);

//资源库上传业务完成回调函数
function completeUpload(args) {
    var resource = "";
    if (easyloader.dialogToTop) {
        resource = $.ligerDialog.getWindow().$.flashResource;
    } else if (easyloader.isIframe) {
        resource = parent.$.flashResource;
    } else {
        resource = $.flashResource;
    }
    var uploadHtml = [];
    var element = resource.element,
        resType = resource.resType,
        resId = resource.resId,
        inputName = resource.inputName,
        uploadTime = resource.uploadTime,
        checkbox = resource.checkbox,
        save = resource.save,
        getTempFilesUrl = resource.getTempFilesUrl,
        attachmentPanelUl = resource.attachmentPanelUl,
        showSuccessUpload = resource.showSuccessUpload,
        iframeId = resource.iframeId,
        useTemplates = resource.useTemplates,
        dealFiles = resource.dealFiles,
        bindId = resource.bindId,
        ckEditor = resource.ckEditor,
        ckEditorName = resource.ckEditorName,
        currentWindow = resource.currentWindow;

    //异步获取数据
    $.ajax({
        type: "get",
        url: getTempFilesUrl,
        data: {resType: resType, resId: resId, uploadTime: uploadTime},
        dataType: 'json',
        success: function (data) {
            try {
                if (data.status == 1) {
                    var files = data.files;

                    if (files && files.length > 0) {
                        var tagName = element[0].tagName.toLocaleLowerCase();
                        var count = 0;
                        //最后一个文件
                        var file = files[files.length - 1];

                        //获取当前已存在的li元素数组
                        var liArray = [];
                        $("li", attachmentPanelUl).each(function (i, item) {
                            liArray.push(parseInt($(item).attr("initId")));
                        });

                        //过滤已经操作过的数组
                        if (liArray.length > 0) {
                            var len = files.length;
                            for (var ii = 0; ii < len; ii++) {
                                //判断集合的数据是否已存在
                                var isInArray = $.inArray(files[ii].id, liArray);
                                if (isInArray >= 0) {
                                    //delete files[i];
                                    files.splice(ii, 1);
                                    //会改变数组的长度
                                    len = files.length;
                                    ii--;
                                }
                            }
                        }

                        //防止内存溢出，置空进行内存释放
                        liArray = null;

                        //往多功能编辑器里面回写信息
                        if (ckEditorName != "" && (ckEditor != null && typeof ckEditor != "undefined")) {
                            var tmplStr = $.createTemplate("{#foreach $T as file}<img src=\"{$T.file.fileUrl}\" alt=\"{$T.file.name}\"/>{#/for}");
                            var imageStr = $.processTemplateToText(tmplStr, files);
                            ckEditor.instances[ckEditorName].insertHtml(imageStr);

                            tmplStr = null;
                            imageStr = null;
                        }

                        if (useTemplates) {
                            var fileListObj = "";
                            if (easyloader.dialogToTop) {
                                fileListObj = $("#fileList", currentWindow.document);
                            } else if (iframeId == "") {
                                fileListObj = parent.$("#fileList");
                            } else {
                                fileListObj = parent.$("#fileList", $("#" + iframeId)[0].contentWindow.document);
                            }
                            if (checkbox) {
                                if (save) {
                                    attachmentPanelUl.setTemplate(fileListObj.text()).processTemplate(files, '', '', '');
                                } else {
                                    attachmentPanelUl.setTemplate(fileListObj.text()).processTemplate(files, '', '', 'append');
                                }
                            } else {
                                attachmentPanelUl.setTemplate(fileListObj.text()).processTemplate(file, '', '', '');
                            }
                            //防止内存溢出，置空进行内存释放
                            fileListObj = null;
                            files = null;
                        } else if (tagName == 'div') {
                            if (checkbox) {
                                for (var i = 0; i < files.length; i++) {
                                    //todo className启什么作用，未知
                                    uploadHtml.push("<li initId='" + files[i].id + "' id='file_" + files[i].id + "'><span><a href='" + files[i].downLoadUrl + "' class='attach_name'>" + files[i].name + "</a>(" + formatSize(files[i].size) + ")(上传者：" + files[i].creator + " 上传时间：" + moment(files[i].created).format("YYYY-MM-DD") + ")</span><a href='javascript:void(0);' onclick=\"$.loveySelectFile.remove('" + files[i].id + "','" + files[i].deleteUrl + "','','" + bindId + "')\"></a>");
                                    uploadHtml.push("<input type='hidden' name='" + inputName + "' value='" + files[i].id + "'/>");
                                    uploadHtml.push("</li>");
                                }

                                //使用html将原来的替换
                                if (save) {
                                    attachmentPanelUl.html(uploadHtml.join(""));
                                } else {
                                    attachmentPanelUl.append(uploadHtml.join(""));
                                }
                            } else {
                                uploadHtml.push("<li initId='" + file.id + "' id='file_" + file.id + "'><span><a href='" + file.downLoadUrl + "' class='attach_name'>" + file.name + "</a>(" + formatSize(file.size) + ")(上传者：" + file.creator + " 上传时间：" + moment(file.created).format("YYYY-MM-DD") + ")</span><a href='javascript:void(0);' onclick=\"$.loveySelectFile.remove('" + file.id + "','" + file.deleteUrl + "','','" + bindId + "')\"></a>");
                                uploadHtml.push("<input type='hidden' name='" + inputName + "' value='" + file.id + "'/>");
                                uploadHtml.push("</li>");

                                attachmentPanelUl.html(uploadHtml.join(""));
                            }
                        } else if (tagName == "input" || tagName == "textarea") {
                            if (checkbox) {
                                var _inputUrl = "";
                                for (var j = 0; j < files.length; j++) {
                                    _inputUrl += files[j].filePath;
                                    if (count < (files.length - 1)) {
                                        _inputUrl += "|";
                                    }

                                    count++;
                                }

                                //选中的文件回写到指定的区域
                                element.val(_inputUrl);
                            } else {
                                element.val(file.filePath);
                            }
                        }

                        if (typeof(dealFiles) == "function") dealFiles(files);
                    }

                } else {
                    $.ligerDialog.alert('操作失败！', '提示', 'error');
                }
            } catch (e) {//非json模式
                $.ligerDialog.alert(e.message, '提示', 'error');
            }
        },
        error: function (data) {
            $.ligerDialog.error('错误！可能原因：参数配置错误、响应出现异常。');
        }
    });

    if (args) {
        args = eval("(" + args + ")");
    } else {
        args = {};
    }

    var totalFiles = args.totalFiles, totalSize = args.totalSize;

    if (showSuccessUpload) {
        $.ligerDialog.waitting("已经上传100%，成功上传" + totalFiles + "个文件，共" + totalSize + "", 5000, true);
    }
}

//验证
function validation(dialog, options) {
    var resource = '';
    if (easyloader.dialogToTop) {
        resource = $.ligerDialog.getWindow().$.flashResource;
    } else if (easyloader.isIframe) {
        resource = parent.$.flashResource;
    } else {
        resource = $.flashResource;
    }

    var element = resource.element,
        resType = resource.resType,
        resId = resource.resId,
        inputName = resource.inputName,
        uploadTime = resource.uploadTime,
        checkbox = resource.checkbox,
        save = resource.save,
        getTempFilesUrl = resource.getTempFilesUrl,
        attachmentPanelUl = resource.attachmentPanelUl;

    $.ajax({
        type: "get",
        url: options.getTempFilesUrl,
        data: {resType: resType, resId: resId, uploadTime: uploadTime},
        dataType: "json",
        success: function (data) {
            if (data.status == 1) {
                var files = data.files;
                if (files.length == 0) {
                    $.ligerDialog.alert('你没有上传任何文件！', '提示', 'error');
                } else {
                    dialog.close();
                }
            } else {
                $.ligerDialog.alert(data.msg, '提示', 'error');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.ligerDialog.error('错误！可能原因：参数配置错误、响应出现异常。');
        }
    });

}

/**
 *
 * @param s     单位为b
 */
function formatSize(s) {

    function forDight(number, digits) {
        with (Math) {
            return round(number * pow(10, digits)) / pow(10, digits);
        }
    }

    var _size = 0, q = 1000, u, k = "K", m = "M", g = "G", ks = 1024, ms = ks * ks, gs = ms * ks;
    _size = parseFloat(s);
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
}



