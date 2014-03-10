/**
 * jQuery flash上传组件
 *
 * Author zwzhao [ zwzhao@wisedu.com ]
 * history:zwzhao@wisedu.com 扩展
 *
 */
(function ($) {
    $.ecmsDefaults = $.ecmsDefaults || {};

    $.ecmsDefaults.Attach = {
        title:'文件上传', //上传组件弹框标题
        width:665, //宽
        height:520, //高
        fileTypeDescription:'附件上传', //文件类型描述
        fileTypes:'*.*', //文件类型限制，多个用半角分号隔开，如*.doc;*.jpg
        fileSizeLimit:100 * 1024 * 1024, //单个文件大小上限，默认100M
        totalUploadSize:top.remainDiskSize != undefined ? top.remainDiskSize : window.opener.top.remainDiskSize, //总共文件上传大小上限,默认1G
        uploadPage:easyloader.URI + '/attachment/uploadFiles.do', //上传提交处理的方法
        params:{}, //额外参数
        completeFunction:'completeUpload', //上传完毕后执行的函数,只有开启上传组件才有实际意思
        preview:false, //是否预览，默认否，非必须参数
        checkbox:false, //单选多选
        showFlashUpload:false, //是否显示flash上传tab，默认显示
        showTemplate:false, //是否显示站群资源库
        templatePath:'', //模板库显示路径
        showPersonalLib:false, //是否显示个人资源库tab，默认显示
        personalLibPath:'', //个人资源库显示节点
        showSitePublicLib:false, //是否显示站点公共资源库，默认显示
        sitePublicLibPath:'', //站点资源库显示节点
        showGroupLib:false, //是否显示站群公共资源库，默认显示
        groupLibPath:'', //站群资源库显示节点
        savePath:'', //指定文件的保存路径,模板库文件上传使用
        saveType:0, //上传资源库（0个人1公共）
        saveMode:0,
        preFileName:'',
        resetButton:true
    }

    $.ecmsAttach = {};

    $.ligerDialogShow = {};

    $.showSelect = {};

    //element没有只能实现最基本上传，和用户自己指定的回调函数
    $.ecmsAttach.uploadFiles = function (p, element, fileType) {

        p.fileTypeDescription = p.fileTypes;
        p = $.extend({}, $.ecmsDefaults.Attach, p || {});

        if (element != undefined && !p.templatePath && p.showTemplate && element[0]) {
            p.templatePath = element[0].value;
        }

        if (p.showFlashUpload == false && p.showTemplate == false && p.showPersonalLib == false && p.showSitePublicLib == false && p.showGroupLib == false) {
            $.ligerDialog.alert("上传组件参数配置有误，请至少配置一个Tab项！", "提示", "warn");
            return false;
        }

        if (p.resourceType == '' || p.resourceId == '') {
            $.ligerDialog.alert("资源的所有者和类型必须指定!", "提示", "warn");
            return false;
        }

        //文件合法判断
        function doFilter(str, filter) {
            return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(str)
        }

        top.$.ligerDialog.open({
            title:p.title,
            content:'<div id="uploadPlugin" class="l-dialog-hack"><script type="text/javascript">using(["imagepreview","dialog","grid", "toolbar", "tab", "attachment"], function () {$("#uploadPlugin").showSelect(' + JSON.stringify(p) + ');});</script>',
            width:p.width,
            height:p.height,
            allowClose:true,
            isDrag:true,
            buttons:[
                { text:'确定', onclick:function (item, dialog) {
                    if (p.okFunc && typeof(p.okFunc) == 'function') {
                        //临时处理方法，不知道为什么firefox 12.0版本不支持下面写法 by zwzhao
                        try {
                            var res = top.$.swfResource;
                            var resourceType = res.resourceType,
                                resourceId = res.resourceId,
                                uploadTime = res.uploadTime;
                            $.ajax({
                                type:"get",
                                url:top.easyloader.URI + "/files/getTempFiles.do",
                                data:'&resourceType=' + resourceType + '&resourceId=' + resourceId + '&uploadTime=' + uploadTime,
                                dataType:'json',
                                success:function (data) {
                                    try {
                                        if (data.status == 1) {
                                            var files = data.files;
                                            if (files.length > 1) {
                                                p.okFunc(files);
                                                return;
                                            }
                                        } else {
                                            top.$.ligerDialog.alert('操作失败！', '提示', 'error');
                                        }
                                    } catch (e) {
                                    }
                                }
                            });
                        } catch (e) {
                            dialog.close();
                        }
                        dialog.close();
                    }
                    //取得指定的li的class的样式,同时必须指定搜索范围，因为可能存在弹出或者父之类
                    var liFlash = $("li[tabid=select-flashUpload]", dialog).attr("class");
                    var liTemplate = $("li[tabid=select-template]", dialog).attr("class");
                    var liPersonal = $("li[tabid=select-personal]", dialog).attr("class");
                    var liSite = $("li[tabid=select-site]", dialog).attr("class");
                    var liGroup = $("li[tabid=select-group]", dialog).attr("class");

                    var manager;
                    var myFiles;

                    function loadUploadFiles(p) {
                        var path = p.savePath;
                        var preFileName = p.preFileName;
                        if (!path) {
                            return;
                        }
                        else {
                            $.ajax({
                                type:"get",
                                url:easyloader.URI + "/attachment/loadUploadFiles.do?path=" + path + "&preFileName=" + preFileName,
                                data:'',
                                dataType:'json',
                                async:false,
                                success:function (data) {
                                    try {
                                        if (data.status == 1) {
                                            //元素、资源编号、资源类型
                                            myFiles = data.fileNames;
                                        }
                                    } catch (e) {//非json模式
                                    }
                                },
                                error:function (XMLHttpRequest, textStatus, errorThrown) {
                                    try {
                                        g.loading.hide();
                                        if (p.onError)
                                            p.onError(XMLHttpRequest, textStatus, errorThrown);
                                    }
                                    catch (e) {

                                    }
                                }
                            });
                        }
                    }

                    if (liFlash != undefined && liFlash == 'l-selected') {
                        if (p.savePath == '') {
                            validation(dialog)
                        }
                        else {
                            //如果是上传模板文件
                            dialog.close();
                        }
                    } else if (liTemplate != undefined && liTemplate == 'l-selected') {
                        manager = $("#select-template", dialog).ligerGetGridManager();
                    } else if (liPersonal != undefined && liPersonal == 'l-selected') {
                        manager = $("#select-personal", dialog).ligerGetGridManager();
                    } else if (liSite != undefined && liSite == 'l-selected') {
                        manager = $("#select-site", dialog).ligerGetGridManager();
                    } else if (liGroup != undefined && liGroup == 'l-selected') {
                        manager = $("#select-group", dialog).ligerGetGridManager();
                    }

                    var checkedData;
                    //先判断复选框是否有选中,不是Flash上传模式才有选择判断
                    if (liFlash == undefined || liFlash != 'l-selected') {
                        if (p.checkbox == true) {
                            checkedData = manager.getCheckedRows();

                            if (checkedData == null || checkedData.length == 0) {
                                $.ligerDialog.alert("请选择要操作的行！", "提示", "warn");
                                return false;
                            }

                            //判断指定ID的元素类型，确定回写方式
                            var tagName = element[0].tagName.toLowerCase();

                            var _html = '';
                            var _htmlDiv = "<div id=\"attachmentPanel\" class=\"attachments_list\"style='overflow-y:auto;height: 48px;width: 900px;float: left;margin-right:30px'><ul class='attachmentPanel'>";
                            var _preUrl = easyloader.URI + "/files/deleteAttachment.do?attachMentId=";

                            //已选的文件初始化
                            $("li", element).each(function (i) {
                                var value = $(this).attr("id").substr("attachment_".length);
                                var name = $("span", $(this)).text();
                                _htmlDiv += "<li id=attachment_" + value + "><span>" + name + "</span><a href=# onclick=removeSelect('" + value + "')></a>";
                                _htmlDiv += "<input type='hidden' name='attachMentId' value='" + value + "'/>";
                                _htmlDiv += "</li>";
                            });

                            var count = 0;
                            for (var i = 0; i < checkedData.length; i++) {
                                //选中的文件回写到指定的区域

                                if (tagName == 'input' || tagName == 'textarea') {
                                    _html += checkedData[i].filePath;
                                    if (count < (checkedData.length - 1)) {
                                        _html += "|";
                                    }
                                } else {
                                    //选中的文件回写到指定的区域
                                    _htmlDiv += "<li id=attachment_" + checkedData[i].attachMentId + "><span>" + checkedData[i].fileName + "(" + checkedData[i].fileSize + ")</span><a href=# onclick=removeSelect('" + checkedData[i].attachMentId + "')></a>";
                                    _htmlDiv += "<input type='hidden' name='attachMentId' value='" + checkedData[i].attachMentId + "'/>";
                                    _htmlDiv += "</li>";
                                }
                                count++;
                            }

                            if (tagName == 'input' || tagName == 'textarea') {
                                element.val(_html);
                            } else {
                                _htmlDiv += "</ul></div>";
                                element.html(_htmlDiv);
                            }
                        } else {
                            checkedData = manager.getSelectedRow();

                            if (checkedData == null) {
                                top.$.ligerDialog.alert("请选择要操作的行！", "提示", "warn");
                                return false;
                            }

                            var tagName='';

                            if ((element)[0] == undefined) {
                                if($(element) == undefined){
                                    alert('vv');
                                    top.$.ligerDialog.alert("指定的元素未找到，请检查。", "提示", "warn");
                                    return false;
                                }else{
                                    tagName = element.tagName.toLowerCase();
                                }
                            }else{
                                tagName = element[0].tagName.toLocaleLowerCase();
                            }

                            //判断指定ID的元素类型，确定回写方式
                            //tagName = element[0].tagName.toLowerCase();

                            if (tagName == 'input' || tagName == 'textarea') {
                                /*var _canPreView = doFilter(checkedData.fileName, "jpg,gif,png,bmp");

                                 if (p.preview && _canPreView) {
                                 var _preViewId = element[0].id;

                                 $("#" + _preViewId).after("<a class='preview' href='" + easyloader.URI + checkedData.filePath + "'>预览</a>");
                                 }*/
                                //如果是文档编辑中上传的，特殊处理
                                var contextPath = "";
                                if ($(element).hasClass("ue_media_url")) {
                                    contextPath = easyloader.URI;
                                }
                                //var _preFilePath = (fileType === 'flash') ? "file=" : "";
                                //选中的文件回写到指定的区域
                                $(element).val(contextPath + checkedData.filePath);
                                //强制聚焦，为了在选择图片时触发focus事件，创建预览图等图片相关信息
                                element.focus();
                            } else {
                                /*var _canPreView = doFilter(checkedData.fileName, "jpg,gif,png,bmp");*/
                                var _htmlDiv = "<div id=\"attachmentPanel\" class=\"attachments_list\"><ul class='attachmentPanel'>";
                                var _preUrl = easyloader.URI + "/files/deleteAttachment.do?attachMentId=";

                                /*if (p.preview && _canPreView) {
                                 var _showHtml = "<img src=" + easyloader.URI + checkedData.filePath + ">";
                                 _showHtml += "<input type='hidden' name='" + element[0].id + "' value='" + checkedData.filePath + "'>";

                                 element.html(_showHtml);
                                 } else {*/
                                _htmlDiv += "<li id=attachment_" + checkedData.attachMentId + "><span>" + checkedData.fileName + "." + checkedData.fileSuffix + "(" + checkedData.fileSize + ")</span><a href=# onclick=removeSelect('" + checkedData.attachMentId + "')></a>";
                                _htmlDiv += "<input type='hidden' name='attachMentId' value='" + checkedData.attachMentId + "'/></li>";
                                _htmlDiv += "</ul></div>";

                                //选中的文件回写到指定的区域
                                element.html(_htmlDiv);
                                /*}*/
                            }
                        }
                        //如果指定了回写后的函数，则执行
                        if (p.afterChoose && typeof(p.afterChoose) == 'function') {
                            loadUploadFiles(p);
                            p.afterChoose(myFiles);
                            //  p.afterChoose();
                        }
                        dialog.close();
                    } else {
                        if (p.afterChoose && typeof(p.afterChoose) == 'function') {
                            loadUploadFiles(p);
                            p.afterChoose(myFiles);
                        }
                    }
                } },
                { text:'取消', onclick:function (item, dialog) {
                    dialog.close();
                }}
            ]
        });
    }

    $.fn.ligerDialogShow = function (p) {
        this.each(function () {
            p.fileTypeDescription = p.fileTypes;
            var params = p.params;
            p = $.extend({}, $.ecmsDefaults.Attach, p || {});
            var gg = {
                initElement:function() {
                    var ul = document.createElement("ul");
                    gg.input.append($(ul).addClass("attachmentPanel"));
                    var resourceId = params.resourceId, resourceType = params.resourceType;
                    if (resourceId && resourceType) {
                        $.ajax({
                            type:"get",
                            url:easyloader.URI + "/files/getTempFiles.do",
                            data:'resourceType=' + resourceType + '&resourceId=' + resourceId + '&all=1&saveMode=1',
                            dataType:'json',
                            success:function (data) {
                                try {
                                    if (data.status == 1) {
                                        var files = data.files;
                                        if (files.length > 0) {
                                            var _preUrl = easyloader.URI + "/files/deleteAttachment.do?attachMentId=";
                                            var _html = new Array();
                                            for (var i = 0; i < files.length; i++) {
                                                _html.push("<li url=" + _preUrl + files[i].attachMentId + " id=attachment_" + files[i].attachMentId + ">");
                                                _html.push("<span>" + files[i].fileName + files[i].fileSuffix + "(" + files[i].fileSize + ")</span>");
                                                _html.push("<a href=# onclick=$.ligerDialog.confirmDelete({elObj:$('#attachment_" + files[i].attachMentId + "')});></a>");
                                                _html.push("<input type='hidden' name='attachMentId' value='" + files[i].attachMentId + "'/></li>");
                                            }
                                            ul.innerHTML = _html.join("");
                                        }
                                    }
                                } catch (e) {//非json模式
                                }
                            },
                            error:function (XMLHttpRequest, textStatus, errorThrown) {
                                try {
                                    g.loading.hide();
                                    if (p.onError)
                                        p.onError(XMLHttpRequest, textStatus, errorThrown);
                                }
                                catch (e) {

                                }
                            }
                        });
                    }
                },
                initEvent:function () {
                    //绑定图片的点击事件

                    gg.img.click(function () {

                        $.ajax({
                            type:"get",
                            url:easyloader.URI + "/files/getServerTime.do",
                            data:'',
                            dataType:'json',
                            success:function (data) {
                                try {
                                    if (data.status == 1) {
                                        //元素、资源编号、资源类型
                                        var _pp = p.params;

                                        top.$.flashResource = {element:gg.input, resourceId:_pp.resourceId, resourceType:_pp.resourceType, siteId:_pp.siteId, uploadTime:data.serverTime, checkbox:p.checkbox};

                                        $.ecmsAttach.uploadFiles(p, gg.input);
                                    }
                                } catch (e) {//非json模式
                                }
                            },
                            error:function (XMLHttpRequest, textStatus, errorThrown) {
                                try {
                                    g.loading.hide();
                                    if (p.onError)
                                        p.onError(XMLHttpRequest, textStatus, errorThrown);
                                }
                                catch (e) {

                                }
                            }
                        });

                    });
                    //是否开启重置
                    if (p.resetButton) {
                        gg.reset.click(function () {
                            gg.input.attr("value", "");
                        });
                    }
                }
            };
            //申明变量赋值取得该元素,找到绑定元素
            gg.input = $(this);
            if (this.tagName.toLowerCase() == "input" || this.tagName.toLowerCase() == "textarea") {
                this.readOnly = true;
                //变量申明，warp外成添加元素，.parent()代表外层
                gg.selectDiv = gg.input.wrap('<div class="btn_folder"></div>').parent();
                if (this.tagName.toLowerCase() == "textarea") {
                    //设置文本域的
                    gg.input.attr("rows", "3");
                }
                //是否开启重置
                if (p.resetButton) {
                    gg.reset = gg.selectDiv.append('<div class="btn_query"><a class="reset"></a></div>').find(".reset");
                }
                //在里面执行搜索命令
                gg.img = gg.selectDiv.append('<div class="upload_img" style="float: left;"><a href="#"></a></div>').find(".upload_img");

                gg.initEvent();
            } else if (this.tagName.toLowerCase() == "div") {
                gg.initElement();
                gg.selectDiv = gg.input.wrap('<div class="btn_folder"></div>').parent();
                gg.reset = gg.selectDiv.append('<div class=""><a class=""></a></div>').find(".reset");
                gg.img = gg.selectDiv.append('<div class="upload_img" style="float: left;"><a href="#"></a></div>').find(".upload_img");
                gg.initEvent();
            } else {
                return;
            }
        });
    };

    $.fn.showSelect = function (p) {
        this.each(function () {
            p.fileTypeDescription = p.fileTypes;

            p = $.extend({}, $.ligerDefaults.Select, p || {});

            var g = {
                bodyHtml:function () {
                    var _bodyHtml = "<div class=\"dialog_body\"><div class=\"tab_normal\"><div id=\"content\" style=\"float: none\">";

                    _bodyHtml += "</div></div></div>";

                    return _bodyHtml;
                }, flashHtml:function () {
                    var _flashHtml = new Array();
                    _flashHtml.push("<div style=\"height:400px;\">");
                    _flashHtml.push("<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\"");
                    _flashHtml.push("codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0\"");
                    _flashHtml.push("	width=\"100%\" height=\"100%\" id=\"file\" align=\"middle\">");
                    _flashHtml.push("	<param name=\"allowScriptAccess\" value=\"sameDomain\" />");
                    _flashHtml.push("	<param name=\"movie\" value=\"" + easyloader.URI + "/js/flashupload/FlashFileUpload.swf?ver=123484\" />");
                    _flashHtml.push("   <param name=\"quality\" value=\"high\" />");
                    _flashHtml.push("	<param name=\"wmode\" value=\"transparent\">");
                    var flashVars = "&fileTypeDescription=" + encodeURIComponent(p.fileTypeDescription) +
                            "&fileTypes=" + encodeURIComponent(p.fileTypes) +
                            "&fileSizeLimit=" + encodeURIComponent(p.fileSizeLimit) +
                            "&totalUploadSize=" + encodeURIComponent(p.totalUploadSize <= 0 ? 0.00000095367431640625 * 1024 * 1024 : p.totalUploadSize) + //默认flash上传组件如果总大小为0为无限制，这里如果可用空间小于等于0默认加上1b的空间
                            "&completeFunction=" + encodeURIComponent(p.completeFunction);
                    flashVars = g.getSubmitUrl() + flashVars;
                    _flashHtml.push("    <param name=\"FlashVars\" value='" + flashVars + "'>");
                    _flashHtml.push("    <embed src=\"" + easyloader.URI + "/js/flashupload/FlashFileUpload.swf?ver=123484\" " +
                            "FlashVars='" + flashVars + "'");
                    _flashHtml.push(" quality=\"high\" wmode=\"transparent\" width=\"100%\" height=\"100%\" name=\"file\"");
                    _flashHtml.push(" align=\"middle\" allowscriptaccess=\"sameDomain\" type=\"application/x-shockwave-flash\"");
                    _flashHtml.push(" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />");
                    _flashHtml.push("</object>");
                    _flashHtml.push("</div>");
                    return _flashHtml.join("");
                }, getSubmitUrl:function () {
                    var page = "uploadPage=" + p.uploadPage;
                    var _p = p.params;
                    page += "%3FnodePath=" + (_p.nodePath ? _p.nodePath : '') +
                            "%26resourceType=" + (_p.resourceType ? _p.resourceType : '') +
                            "%26resourceId=" + (_p.resourceId ? _p.resourceId : '') +
                            "%26loginName=" + (_p.loginName ? _p.loginName : '') +
                            "%26siteId=" + (_p.siteId ? _p.siteId : '') +
                            "%26savePath=" + (p.savePath ? p.savePath : '') +
                            "%26saveType=" + (p.saveType ? p.saveType : $.ecmsDefaults.Attach.saveType) +
                            "%26saveMode=" + (_p.saveMode ? _p.saveMode : $.ecmsDefaults.Attach.saveMode) +
                            "%26preFileName=" + (p.preFileName ? p.preFileName : '');
                    return page;
                }, addItem:function (id, title) {
                    var toolbarHtml = "";
                    if (id != 'flashUpload') {
                        toolbarHtml = "<div style=\"display:block; width:100%; position:relative\">" +
                                "<div id=\"toptoolbar-select-" + id + "\"></div>" +
                                "</div>";
                    }
                    var tbItem = $(toolbarHtml);

                    var ditem = $('<div tabid="select-' + id + '"></div>');
                    ditem.html(toolbarHtml + '<div style="height:400px;overflow-y: scroll;" id="select-' + id + '"></div>');
                    if (id == "flashUpload") {
                        var maxUploadSizeString = "<div class=\"uploadTips\">提示信息:单个文件大小限制：" + (p.fileSizeLimit / (1024 * 1024)) + "M，剩余总空间大小为：" + (p.totalUploadSize / (1024 * 1024)) + "M</div>";
                        ditem.html(g.flashHtml() + maxUploadSizeString);
                    }

                    $("#content", g.tabs).append(ditem);

                    title && ditem.attr("title", title);
                }, showGrid:function (id) {
                    if (id != 'select-flashUpload') {
                        //变量一定要使用''引入，常量除外
                        $("#toptoolbar-" + id).ligerToolBar({ items:[
                            { text:'根目录', icon:'copy_site', click:function () {
                                var manager = $("#" + id).ligerGetGridManager();
                                manager.setOptions({url:g.getUrl(id)});
                                manager.loadData(true);
                            }} ,
                            { text:'后退', icon:'back', click:function () {
                                var tbItem = $("#toptoolbar-" + id)
                                var backPath = tbItem.attr("backPath");

                                var manager = $("#" + id).ligerGetGridManager();
                                manager.setOptions({url:g.getUrl(id, backPath)});
                                manager.loadData(true);

                                tbItem.attr("backPath", g.getBackPath(id, backPath));
                            }}
                        ]
                        });

                        $("#" + id).ligerGrid({
                            columns:[
                                { display:'', name:'fileAttribute', width:'50', initDataFunc:function (o) {
                                    var fileIcon = "";
                                    if (/.png$|.gif$|.jpg$|.bmp$/.test(o[2])) {
                                        fileIcon = "<a class='grid_preview' href='#' des='" + o[1] + "' rel=" + easyloader.URI + o[2] + "><img src=" + easyloader.URI + "/skins/icons/icon_" + o[0] + ".gif></a>";
                                    } else {
                                        fileIcon = "<img src=" + easyloader.URI + "/skins/icons/icon_" + o[0] + ".gif>";
                                    }
                                    return fileIcon;
                                }},
                                { display:'文件名称', name:'fileName', width:'250', align:'left'},
                                { display:'大小', name:'fileSize', width:'150', align:'left'},
                                { display:'修改时间', name:'updateTime', width:'165', dataCategory:'date', format:'hh:mm yyyy-MM-dd'}
                            ], width:'100%', pkName:'filePath', height:'73%',
                            dataAction:'server',
                            url:g.getUrl(id),
                            enabledEdit:false,
                            usePager:false,
                            checkbox:p.checkbox,
                            enabledSort:false,
                            allowAdjustColWidth:false,
                            //双击行空白事件
                            dblClickRow:function (param, e) {
                                //如果是文件夹则可以点进去继续加载
                                if (param.data.directory) {
                                    var manager = $("#" + id).ligerGetGridManager();
                                    manager.setOptions({url:g.getUrl(id, param.data.filePath)});
                                    manager.loadData(true);

                                    var tbItem = $("#toptoolbar-" + id)
                                    var backPath = tbItem.attr("backPath", g.getBackPath(id, param.data.filePath));
                                }
                            },
                            onBeforeCheckRow:function (param, e) {
                                if (e.directory) {
                                    return false;
                                }
                            },
                            //显示完数据事件
                            onAfterShowData:function (param, e) {
                                $("a.grid_preview").preview();
                            }
                        });
                    }
                }, getUrl:function (id, viewPath) {
                    var _pp = p.params;
                    var siteId = _pp.siteId;

                    var url = '';
                    //path查看的路径
                    if (id != 'select-flashUpload') {
                        url += easyloader.URI;
                        if (id == 'select-template' && p.showTemplate) {
                            url += '/files/ajaxLoadFilesJson.do?templatePath=' + g.getAbsPath(viewPath, p.templatePath);
                        } else if (id == 'select-personal' && p.showPersonalLib) {
                            url += '/files/ajaxLoadLibFilesJson.do?ownerType=0&nodePath=' + g.getAbsPath(viewPath, p.personalLibPath);
                        } else if (id == 'select-site' && p.showSitePublicLib) {
                            url += '/files/ajaxLoadLibFilesJson.do?ownerType=1&siteId=' + siteId + '&nodePath=' + g.getAbsPath(viewPath, p.sitePublicLibPath);
                        } else if (id == 'select-group' && p.showGroupLib) {
                            url += '/files/ajaxLoadLibFilesJson.do?ownerType=1&siteId=-1&nodePath=' + g.getAbsPath(viewPath, p.groupLibPath);
                        }
                    }

                    return url;
                }, getBackPath:function (id, path) {
                    var backPath = '';
                    if (path != undefined && path != '') {
                        if (id == 'select-template' && p.showTemplate) {
                            var arr1 = path.split("/");
                            for (var i = 1; i < arr1.length - 1; i++) {
                                if (i < arr1.length - 1) {
                                    backPath += "/";
                                }
                                backPath += arr1[i];
                            }
                        } else {
                            var arr2 = path.split("-");
                            backPath += "-";
                            for (var i = 1; i < arr2.length - 2; i++) {
                                backPath += arr2[i] + "-";
                            }
                        }
                    }

                    return backPath;
                }, getAbsPath:function (viewPath, defaultPath) {
                    if (viewPath == undefined || viewPath == '') {
                        viewPath = defaultPath;
                    }
                    return viewPath;
                }
            };

            g.tabs = $(this);

            //组件整体框架
            var frame = $(g.bodyHtml());
            g.tabs.append(frame);

            if (p.showFlashUpload) {
                g.addItem("flashUpload", "上传");
            }

            if (p.showTemplate) {
                g.addItem("template", "模板文件目录", p.templatePath, "");
            }

            if (p.showPersonalLib) {
                g.addItem("personal", "个人资源库", p.personalLibPath, "");
            }

            if (p.showSitePublicLib) {
                g.addItem("site", "站点公共资源库", p.sitePublicLibPath, "");
            }

            if (p.showGroupLib) {
                g.addItem("group", "站群公共资源库", p.groupLibPath, "");
            }

            $("#content", g.tabs).ligerTab({
                onAfterSelectTabItem:function (tabId) {
                    var div = $("div[tabid=" + tabId + "]");

                    g.showGrid(tabId);
                }
            });

        });
    }
})(jQuery);


//资源库上传业务完成回调函数
function completeUpload() {

    var res = top.$.flashResource;
    var element = res.element, resourceType = res.resourceType, resourceId = res.resourceId, uploadTime = res.uploadTime, checkbox = res.checkbox;

    $.ajax({
        type:"get",
        url:easyloader.URI + "/files/getTempFiles.do",
        data:'&resourceType=' + resourceType + '&resourceId=' + resourceId + '&uploadTime=' + uploadTime,
        dataType:'json',
        success:function (data) {
            try {
                if (data.status == 1) {
                    $.ligerDialog.alert('操作成功！', '提示', 'success');
                    var files = data.files;
                    if (files && files.length > 0) {
                        var _id = element[0].id;
                        var _tagName = element[0].tagName;
                        var _html = new Array();
//                        var _html = "<div id=\"attachmentPanel\" class=\"attachments_list\"><ul class='attachmentPanel'>";
                        var _preUrl = easyloader.URI + "/files/deleteAttachment.do?attachMentId=";
                        var _inputUrl = "";
                        var count = 0;
//                        //已选的文件初始化
//                        $("li", element).each(function (i) {
//                            var value = $(this).attr("id").substr("attachment_".length);
//                            var name = $("span", $(this)).text();
//                            _html += "<li id=attachment_" + value + "><span>" + name + "</span><a href=# onclick=removeSelect('" + value + "')></a>";
//                            _html += "<input type='hidden' name='attachMentId' value='" + value + "'/>";
//                            _html += "</li>";
//                        });
                        if (_tagName.toLocaleLowerCase() == 'div') {
                            var panelBox = element.find("ul.attachmentPanel");
                            if (panelBox.length == 0) {
                                var ul = document.createElement("ul");
                                panelBox = $(ul).addClass("attachmentPanel");
                                element.append(panelBox);
                            }
                            for (var i = 0, len = files.length; i < len; i++) {
                                var attachMentId = files[i].attachMentId;
                                var tempId = "attachment_" + attachMentId;
                                if (panelBox.find("#" + tempId).length == 0) {
                                    _html.push("<li url=" + _preUrl + attachMentId + " id=" + tempId + ">");
                                    _html.push("<span>" + files[i].fileName + files[i].fileSuffix + "(" + files[i].fileSize + ")</span>");
                                    _html.push("<a href=# onclick=$.ligerDialog.confirmDelete({elObj:$('#" + tempId + "')});></a>");
                                    _html.push("<input type='hidden' name='attachMentId' value='" + attachMentId + "'/></li>");
                                }
                            }
                            panelBox.append(_html.join(""));


//                            _html += "</ul></div>";
                            //使用html将原来的替换
//                            element.html(_html);

//                            $("ul.attachmentPanel >li").each(function (index) {
//                                $(this).unbind("click").click(function () {
//                                    /*var id = this.id;
//                                     var li = $("#" + id);
//                                     li.remove();*/
//                                    //另外一个ajax请求
//                                    //deleteAttachment(atId);
//                                })
//                            });
                        } else if (_tagName.toLowerCase() == "input" || _tagName.toLowerCase() == "textarea") {
                            _inputUrl = "";
                            if (checkbox) {
                                for (var i = 0; i < files.length; i++) {
                                    _inputUrl += files[i].filePath;
                                    if (count < (files.length - 1)) {
                                        _inputUrl += "|";
                                    }

                                    count++;
                                }
                            } else {
                                _inputUrl += files[files.length - 1].filePath;
                            }

                            //选中的文件回写到指定的区域
                            element.val(_inputUrl);
                        }
                    }

                } else {
                    top.$.ligerDialog.alert('操作失败！', '提示', 'error');
                }
            } catch (e) {//非json模式
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            try {
                g.loading.hide();
                if (p.onError)
                    p.onError(XMLHttpRequest, textStatus, errorThrown);
            }
            catch (e) {

            }
        }
    });
}

function validation(dialog) {
    var res = top.$.flashResource;
    if (res == undefined) {
        res = top.$.swfResource
    }
    var element = res.element, resourceType = res.resourceType, resourceId = res.resourceId, uploadTime = res.uploadTime;

    $.ajax({
        type:"get",
        url:easyloader.URI + "/files/getTempFiles.do",
        data:'&resourceType=' + resourceType + '&resourceId=' + resourceId + '&uploadTime=' + uploadTime,
        dataType:'json',
        success:function (data) {
            try {
                if (data.status == 1) {
                    var files = data.files;
                    if (files.length == 0) {
                        top.$.ligerDialog.alert('你没有上传任何文件！', '提示', 'error');
                    } else {
                        dialog.close();
                    }
                } else {
                    top.$.ligerDialog.alert(data.msg, '提示', 'error');
                }
            } catch (e) {//非json模式
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            try {
                g.loading.hide();
                if (p.onError)
                    p.onError(XMLHttpRequest, textStatus, errorThrown);
            }
            catch (e) {

            }
        }
    });

}

function removeSelect(id) {
    top.$.ligerDialog.confirm("确认删除吗？", function (r) {
        if (r) {
            var li = $("#attachment_" + id);
            li.remove();
        }
    });
}

var afterUploads = function() {
    var res = top.$.swfResource;

    var resourceType = res.resourceType,
        resourceId = res.resourceId,
        uploadTime = res.uploadTime;

    $.ajax({
        type:"get",
        url:top.easyloader.URI + "/files/getTempFiles.do",
        data:'&resourceType=' + resourceType + '&resourceId=' + resourceId + '&uploadTime=' + uploadTime,
        dataType:'json',
        success:function (data) {
            try {
                if (data.status == 1) {
                    $.ligerDialog.alert('操作成功！', '提示', 'success');
                    var files = data.files;

                    var input = top.imageUrl;

                    var _inputUrl = easyloader.URI + files[files.length - 1].filePath;

                    input.val(_inputUrl);
                    input.get(0).focus();
                } else {
                    top.$.ligerDialog.alert('操作失败！', '提示', 'error');
                }
            } catch (e) {//非json模式
            }
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            try {
                g.loading.hide();
                if (p.onError)
                    p.onError(XMLHttpRequest, textStatus, errorThrown);
            }
            catch (e) {

            }
        }
    });
};