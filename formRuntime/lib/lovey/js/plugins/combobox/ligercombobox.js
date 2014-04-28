/**
 * jQuery ligerUI 1.1.0
 *
 * Author leoxie [ gd_star@163.com ]
 *
 */
if (typeof (LigerUIManagers) == "undefined") LigerUIManagers = {};
(function ($) {
    $.fn.ligerGetComboBoxManager = function () {
        return LigerUIManagers[this[0].id + "_ComboBox"];
    };
    $.ligerDefaults = $.ligerDefaults || {};
    $.ligerDefaults.ComboBox = {
        width:200, //初始化选择框的宽度
        height:false,  //初始化选择框的高度
        className:"", //添加自定义风格
        resize:true, //是否调整大小
        isMultiSelect:false, //是否多选
        isShowCheckBox:false, //是否选择复选框
        columns:false, //表格状态
        selectBoxWidth:false, //宽度
        selectBoxHeight:false, //高度
        scrollerHeight:false,//滚动条的高度
        onBeforeSelect:false, //选择前事件
        onSelected:null, //选择值事件
        initValue:null, //初始化Value
        initText:null, //初始化Text
        valueField:'pkId', //value对应的字段名
        textField:'treeNodeName', //text对应的字段名
        valueFieldID:null, //隐藏域的控件ID，如果页面不存在，自动创建一个
        slide:false,  //是否以动画的形式显示
        split:";", //分割符号,多选时有效
        data:null, //数据源.JSON格式
        tree:null, //下拉框以树的形式显示，tree的参数跟LigerTree的参数一致
        treeLeafOnly:true, //是否只选择叶子
        grid:null, //表格
        onStartResize:null, //下拉框开始调整大小事件
        onEndResize:null, //下拉框停止调整大小事件
        hideOnLoseFocus:true, //失去焦点时是否隐藏
        url:null, //数据源URL(需返回JSON)
        onSuccess:null,  //Ajax读取成功事件
        onError:null,  //Ajax读取失败事件
        onBeforeOpen:null, //打开下拉框前事件，可以通过return false来阻止继续操作，利用这个参数可以用来调用其他函数，比如打开一个新窗口来选择值
        render:null, //文本框显示html函数
        isNotShowClear:false, //不显示清空按钮
        autoOffSet:false,//自动浮动，当处于屏幕底部向上浮动
        treeOnCheckBefore:null,//点击chekbox之前操作，可以通过返回false进行终止动作
        treeOnCheckAfter:null  //点击chekbox之后操作
    };

    ///    <param name="$" type="jQuery"></param>
    $.fn.ligerComboBox = function (options) {
        this.each(function () {
            if (this.usedComboBox) return;
            var p = $.extend({}, options || {});
            if ($(this).attr("ligerui")) {
                try {
                    var attroptions = $(this).attr("ligerui");
                    if (attroptions.indexOf('{') < 0) attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) p = $.extend({}, attroptions, p || {});
                }
                catch (e) {
                }
            }

            //业务限制，如果grid存在分页组件，功能会有影响
            if(p.grid) p.hideOnLoseFocus = false;

            p = $.extend({}, $.ligerDefaults.ComboBox, p);
            if (p.columns) {
                p.isShowCheckBox = true;
            }
            if (p.isMultiSelect) {
                p.isShowCheckBox = true;
            }
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            var g = {
                //查找Text,适用多选和单选
                findTextByValue:function (value) {
                    if (value == undefined) return "";
                    var texts = "";
                    var contain = function (checkvalue) {
                        var targetdata = value.toString().split(p.split);
                        for (var i = 0; i < targetdata.length; i++) {
                            if (targetdata[i] == checkvalue) return true;
                        }
                        return false;
                    };
                    $(g.data).each(function (i, item) {
                        var val = item[p.valueField];
                        var txt = item[p.textField];
                        if (contain(val)) {
                            texts += txt + p.split;
                        }
                    });
                    if (texts.length > 0) texts = texts.substr(0, texts.length - 1);
                    return texts;
                },
                //查找Value,适用多选和单选
                findValueByText:function (text) {
                    if (!text && text == "") return "";
                    var contain = function (checkvalue) {
                        var targetdata = text.toString().split(p.split);
                        for (var i = 0; i < targetdata.length; i++) {
                            if (targetdata[i] == checkvalue) return true;
                        }
                        return false;
                    };
                    var values = "";
                    $(g.data).each(function (i, item) {
                        var val = item[p.valueField];
                        var txt = item[p.textField];
                        if (contain(txt)) {
                            values += val + p.split;
                        }
                    });
                    if (values.length > 0) values = values.substr(0, values.length - 1);
                    return values;
                },
                removeItem:function () {
                },
                insertItem:function () {
                },
                addItem:function () {

                },
                changeValue:function (value, text) {
                    po.changeValue(value, text);
                },
                selectValue:function (value) {
                    var text = g.findTextByValue(value);
                    if (p.tree) {
                        g.selectValueByTree(value);
                    }
                    else if (!p.isMultiSelect) {
                        po.changeValue(value, text);
                        $("tr[value=" + value + "] td", g.selectBox).addClass("l-selected");
                        $("tr[value!=" + value + "] td", g.selectBox).removeClass("l-selected");
                    }
                    else {
                        po.changeValue(value, text);
                        var targetdata = value.toString().split(p.split);
                        $("table.l-table-checkbox :checkbox", g.selectBox).each(function () {
                            this.checked = false;
                        });
                        for (var i = 0; i < targetdata.length; i++) {
                            $("table.l-table-checkbox tr[value=" + targetdata[i] + "] :checkbox", g.selectBox).each(function () {
                                this.checked = true;
                            });
                        }
                    }
                },
                bulidContent:function () {
                    this.clearContent();
                    if (g.select) {
                        g.setSelect();
                    }
                    else if (g.data) {
                        g.setData(g.data);
                    }
                    else if (p.tree) {
                        g.setTree(p.tree);
                    }
                    else if (p.grid) {
                        g.setGrid(p.grid);
                    }
                    else if (p.url) {
                        $.ajax({
                            type:'post',
                            url:p.url,
                            cache:false,
                            dataType:'json',
                            success:function (data) {
                                g.data = data;
                                g.setData(g.data.Rows);
                                if (p.onSuccess) p.onSuccess(g.data.Rows);
                            },
                            error:function (XMLHttpRequest, textStatus) {
                                if (p.onError) p.onError(XMLHttpRequest, textStatus);
                            }
                        });
                    }
                },
                clearContent:function () {
                    //$("table", g.selectBox).remove();
                    //修复下拉框清除的BUG
                    $("table", g.selectBox).html("");
                    //g.inputText.val("");
                    //g.valueField.val("");
                },
                setSelect:function () {
                    this.clearContent();
                    $('option', g.select).each(function (i) {
                        var val = $(this).val();
                        var txt = $(this).html();
                        var tr = $("<tr><td index='" + i + "' value='" + val + "'>" + txt + "</td>");
                        $("table.l-table-nocheckbox", g.selectBox).append(tr);
                        $("td", tr).hover(function () {
                            $(this).addClass("l-over");
                        }, function () {
                            $(this).removeClass("l-over");
                        });
                    });
                    $('td:eq(' + g.select[0].selectedIndex + ')', g.selectBox).each(function () {
                        if ($(this).hasClass("l-selected")) {
                            g.selectBox.hide();
                            return;
                        }
                        $(".l-selected", g.selectBox).removeClass("l-selected");
                        $(this).addClass("l-selected");
                        if (g.select[0].selectedIndex != $(this).attr('index') && g.select[0].onchange) {
                            g.select[0].selectedIndex = $(this).attr('index');
                            g.select[0].onchange();
                        }
                        var newIndex = parseInt($(this).attr('index'));
                        g.select[0].selectedIndex = newIndex;
                        g.select.trigger("change");
                        g.selectBox.hide();
                        g.inputText.val($(this).html());
                    });
                    po.addClickEven();
                },
                setDataUrl:function (jsonUrl) {
                    //by yzhao 2013-3-11 10:36 增加对url的支持，重刷新数据可以指定一个Ajax
                    $.ajax({
                        url:jsonUrl,
                        dataType:"json",
                        success:function (data) {
                            g.setData(data)
                        },
                        error:function (XMLHttpRequest, textStatus) {
                            if (p.onError) p.onError(XMLHttpRequest, textStatus);
                        }
                    });
                },
                setData:function (data) {
                    this.clearContent();
                    if (!data || !data.length) return;
                    if (g.data != data) g.data = data;
                    if (p.columns) {
                        g.selectBox.table.headrow = $("<tr class='l-table-headerow'><td width='18px'></td></tr>");
                        g.selectBox.table.append(g.selectBox.table.headrow);
                        g.selectBox.table.addClass("l-box-select-grid");
                        for (var j = 0; j < p.columns.length; j++) {
                            var headrow = $("<td columnindex='" + j + "' columnname='" + p.columns[j].name + "'>" + p.columns[j].header + "</td>");
                            if (p.columns[j].width) {
                                headrow.width(p.columns[j].width);
                            }
                            g.selectBox.table.headrow.append(headrow);

                        }
                    }
                    for (var i = 0; i < data.length; i++) {
                        var val = data[i][p.valueField];
                        var txt = data[i][p.textField];
                        if (!p.columns) {
                            $("table.l-table-checkbox", g.selectBox).append("<tr value='" + val + "'><td style='width:18px;'  index='" + i + "' value='" + val + "' text='" + txt + "' ><input type='checkbox' /></td><td index='" + i + "' value='" + val + "' align='left'>" + txt + "</td>");
                            $("table.l-table-nocheckbox", g.selectBox).append("<tr value='" + val + "'><td index='" + i + "' value='" + val + "' align='left'>" + txt + "</td>");
                        } else {
                            var tr = $("<tr value='" + val + "'><td style='width:18px;'  index='" + i + "' value='" + val + "' text='" + txt + "' ><input type='checkbox' /></td></tr>");
                            $("td", g.selectBox.table.headrow).each(function () {
                                var columnname = $(this).attr("columnname");
                                if (columnname) {
                                    var td = $("<td>" + data[i][columnname] + "</td>");
                                    tr.append(td);
                                }
                            });
                            g.selectBox.table.append(tr);
                        }
                    }
                    //自定义复选框支持
                    if (p.isShowCheckBox && $.fn.ligerCheckBox) {
                        $("table input:checkbox", g.selectBox).ligerCheckBox();
                    }
                    $(".l-table-checkbox input:checkbox", g.selectBox).change(function () {
                        if (this.checked && p.onBeforeSelect) {
                            var parentTD = null;
                            if ($(this).parent().get(0).tagName.toLowerCase() == "div") {
                                parentTD = $(this).parent().parent();
                            } else {
                                parentTD = $(this).parent();
                            }
                            if (parentTD != null && !p.onBeforeSelect(parentTD.attr("value"), parentTD.attr("text"))) {
                                g.selectBox.slideToggle("fast");
                                return false;
                            }
                        }
                        if (!p.isMultiSelect) {
                            if (this.checked) {
                                $("input:checked", g.selectBox).not(this).each(function () {
                                    this.checked = false;
                                    $(".l-checkbox-checked", $(this).parent()).removeClass("l-checkbox-checked");
                                });
                                g.selectBox.slideToggle("fast");
                            }
                        }
                        po.checkboxUpdateValue();
                    });
                    $("table.l-table-nocheckbox td", g.selectBox).hover(function () {
                        $(this).addClass("l-over");
                    }, function () {
                        $(this).removeClass("l-over");
                    });
                    po.addClickEven();
                    //选择项初始化
                    po.dataInit();
                },
                //树
                setTree:function (tree) {
                    this.clearContent();
                    g.selectBox.table.remove();
                    if (tree.checkbox != false) {
                        tree.onCheck = function (options,status) {
                            options = $.extend(options,{checked:status});
                            if(p.treeOnCheckBefore && ( p.treeOnCheckBefore(options) == false ) ) return ;
                            var nodes = g.treeManager.getChecked();
                            var value = [];
                            var text = [];
                            $(nodes).each(function (i, node) {
                                //只能选择叶子节点
                                if (p.treeLeafOnly && (node.data.children || !node.data.leaf)) return;
                                value.push(node.data[p.valueField]);
                                text.push(node.data[p.textField]);
                            });
                            po.changeValue(value.join(p.split), text.join(p.split));
                            options = $.extend(options,{values:value,texts:text});
                            p.treeOnCheckAfter && p.treeOnCheckAfter(options);
                        };
                    }
                    else {
                        tree.onSelect = function (node) {
                            if (p.treeLeafOnly && (node.data.children || !node.data.leaf)) return;
                            var value = node.data[p.valueField];
                            var text = node.data[p.textField];
                            po.changeValue(value, text);
                        };
                        tree.onCancelSelect = function (node) {
                            po.changeValue("", "", true);
                        };
                    }
                    tree.onAfterAppend = function (domnode, nodedata) {
                        if (!g.treeManager) return;
                        var value = null;
                        if (p.initValue) value = p.initValue;
                        else if (g.valueField.val() != "") value = g.valueField.val();
                        g.selectValueByTree(value);
                    };

                    tree.onBeforeExpand = tree.onBeforeExpand || function (node) {
                        //展开前事件,如果孩子为空且非叶子节点，则进行异步加载
                        if ($(".l-children>li", node.target).length == 0 && !(node.data.leaf)) {
                            //异步将数据加载到tree2.json节点下
                            g.treeManager.loadData(node.target, tree.url,{nodeDate:JSON.stringify(node.data)});
                        }
                    };
                    g.tree = $("<ul></ul>");
                    $("div:first", g.selectBox).append(g.tree);
                    g.tree.ligerTree(tree);
                    g.treeManager = g.tree.ligerGetTreeManager();
                },
                selectValueByTree:function (value) {
                    if (value != null) {
                        var text = "";
                        var valuelist = value.toString().split(p.split);
                        $(valuelist).each(function (i, item) {
                            g.treeManager.selectNode_Mul(item.toString());
                            text += g.treeManager.getTextByID(item);
                            if (i < valuelist.length - 1) text += p.split;
                        });
                        po.changeValue(value, text, true);
                    }
                },
                //表格
                setGrid:function (grid) {
                    this.clearContent();
                    g.selectBox.addClass("l-box-select-lookup");
                    g.selectBox.table.remove();
                    g.grid = $("div:first", g.selectBox);
                    if (grid.checkbox != false) {
                        grid.onCheckAllRow = grid.onCheckRow = function () {
                            var rowsdata = g.gridManager.getCheckedRows();
                            var value = [];
                            var text = [];
                            $(rowsdata).each(function (i, rowdata) {
                                value.push(rowdata[p.valueField]);
                                text.push(rowdata[p.textField]);
                            });
                            po.changeValue(value.join(p.split), text.join(p.split));
                        };
                    }
                    else {
                        grid.onSelectRow = function (rowdata, rowobj, index) {
                            var value = rowdata[p.valueField];
                            var text = rowdata[p.textField];
                            po.changeValue(value, text);
                        };
                        grid.onUnSelectRow = function (rowdata, rowobj, index) {
                            po.changeValue("", "");
                        };
                    }
                    grid.width = "100%";
                    grid.height = "100%";
                    grid.heightDiff = -2;
                    grid.InWindow = false;
                    grid.pageSizeOptions = [10];
                    g.grid.ligerGrid(grid);
                    g.gridManager = g.grid.ligerGetGridManager();
                    //todo 不清楚失去焦点强制为false的原因
                    //p.hideOnLoseFocus = false;
                    po.onEndResize = function () {
                        g.gridManager && g.gridManager.setHeight(g.selectBox.height() - 2);
                    };
                },
                data:p.data,
                inputText:null,
                select:null,
                textFieldID:"",
                valueFieldID:"",
                valueField:null //隐藏域(保存值)
            };
            //private object
            var po = {
                dataInit:function () {
                    var value = null;
                    if (p.initValue != undefined && p.initValue != null
                        && p.initText != undefined && p.initText != null
                        ) {
                        po.changeValue(p.initValue, p.initText);
                    }
                    //根据值来初始化
                    if (p.initValue != undefined && p.initValue != null) {
                        value = p.initValue;
                        var text = g.findTextByValue(value);
                        po.changeValue(value, text);
                    }
                    //根据文本来初始化 
                    else if (p.initText != undefined && p.initText != null) {
                        value = g.findValueByText(p.initText);
                        po.changeValue(value, p.initText);
                    }
                    else if (g.valueField.val() != "") {
                        value = g.valueField.val();
                        var text = g.findTextByValue(value);
                        po.changeValue(value, text);
                    }
                    if (!p.isShowCheckBox && value != null) {
                        $("table tr", g.selectBox).find("td:first").each(function () {
                            if (value == $(this).attr("value")) {
                                $(this).addClass("l-selected");
                            }
                        });
                    }
                    if (p.isShowCheckBox && value != null) {
                        $(":checkbox", g.selectBox).each(function () {
                            var parentTD = null;
                            var checkbox = $(this);
                            if (checkbox.parent().get(0).tagName.toLowerCase() == "div") {
                                parentTD = checkbox.parent().parent();
                            } else {
                                parentTD = checkbox.parent();
                            }
                            if (parentTD == null) return;
                            var valuearr = value.toString().split(p.split);
                            $(valuearr).each(function (i, item) {
                                if (item == parentTD.attr("value")) {
                                    $(".l-checkbox", parentTD).addClass("l-checkbox-checked");
                                    checkbox[0].checked = true;
                                }
                            });
                        });
                    }
                },
                changeValue:function (newValue, newText, notDoOnSelected) {
                    g.valueField.val(newValue);
                    g.inputText.val(newText);
                    g.selectedValue = newValue;
                    g.selectedText = newText;
                    g.inputText.trigger("change").focus();
                    if (p.onSelected && notDoOnSelected == undefined)
                        p.onSelected(newValue, newText,{
                            value:newValue,
                            text:newText,
                            inputText:g.inputText,
                            tree:g.treeManager
                        });
                },
                //更新选中的值(复选框)
                checkboxUpdateValue:function () {
                    var valueStr = "";
                    var textStr = "";
                    $("input:checked", g.selectBox).each(function () {
                        var parentTD = null;
                        if ($(this).parent().get(0).tagName.toLowerCase() == "div") {
                            parentTD = $(this).parent().parent();
                        } else {
                            parentTD = $(this).parent();
                        }
                        if (!parentTD) return;
                        valueStr += parentTD.attr("value") + p.split;
                        textStr += parentTD.attr("text") + p.split;
                    });
                    if (valueStr.length > 0) valueStr = valueStr.substr(0, valueStr.length - 1);
                    if (textStr.length > 0) textStr = textStr.substr(0, textStr.length - 1);
                    po.changeValue(valueStr, textStr);
                },
                addClickEven:function () {
                    //选项点击
                    $(".l-table-nocheckbox td", g.selectBox).click(function () {
                        if (p.onBeforeSelect && !p.onBeforeSelect($(this).attr("value"), $(this).html())) {
                            if (p.slide) g.selectBox.slideToggle("fast");
                            else g.selectBox.hide();
                            return false;
                        }
                        if ($(this).hasClass("l-selected")) {
                            if (p.slide)
                            {
                                //与经理沟通过：该处与选择新内容的动画保持一致
                                g.selectBox.hide("fast",function(){
                                    g.inputText.focus();
                                });
                            }
                            else
                            {
                                g.selectBox.hide();
                            }
                            return;
                        }
                        $(".l-selected", g.selectBox).removeClass("l-selected");
                        $(this).addClass("l-selected");
                        if (g.select) {
                            if (g.select[0].selectedIndex != $(this).attr('index')) {
                                var newIndex = parseInt($(this).attr('index'));
                                g.select[0].selectedIndex = newIndex;
                                g.select.trigger("change");
                            }
                        }
                        if (p.slide) {
                            g.boxToggling = true;
                            g.selectBox.hide("fast", function () {
                                g.boxToggling = false;
                            })
                        } else g.selectBox.hide();
                        po.changeValue($(this).attr("value"), $(this).html());
                    });
                },
                toggleSelectBox:function (isHide) {
                    var textHeight = g.wrapper.height();
                    g.boxToggling = true;
                    if (isHide) {
                        if (p.slide) {
                            g.selectBox.slideToggle('fast', function () {
                                g.boxToggling = false;
                            });
                        }
                        else {
                            g.selectBox.hide();
                            g.boxToggling = false;
                        }
                    }
                    else {
                        var topheight = g.wrapper.offset().top - $(window).scrollTop();
                        var selfheight = g.selectBox.height() + textHeight + 4;
                        if (topheight + selfheight > $(window).height() && topheight > selfheight) {
                            p.autoOffSet && g.selectBox.css("marginTop", -1 * (g.selectBox.height() + textHeight + 5));
                        }

                        //move by su  移动该段代码  解决第一次进入，出现闪框。
                        if(p.scrollerHeight && isNaN(parseInt(p.scrollerHeight)) == false) {
                            $(g.selectBox).find(".l-box-select-inner").css("height", p.scrollerHeight);
                            /*↑ 添加自定义select-inner滚动条高度功能，同时调整大小功能失效 sjsong01@wisedu.com 2013-10-15*/
                        }
                        else
                        {
                            //扩展代码 by su → 当内容高度大于最小高度的时候，动画载入会产生滚动轴承闪烁
                            var innerHeight = g.selectBox.attr("style");
                            if( innerHeight.indexOf("height") < 0 )
                            {
                                $(g.selectBox).find(".l-box-select-inner").css("height",parseInt(g.selectBox.css("min-height"),10));
                            }
                            else
                            {
                                $(g.selectBox).find(".l-box-select-inner").css("height",parseInt(g.selectBox.css("height"),10));
                            }
                        }

                        if (p.slide) {
                            g.selectBox.slideToggle('fast', function () {
                                g.boxToggling = false;
                                if (!p.isShowCheckBox && $('td.l-selected', g.selectBox).length > 0) {
                                    var offSet = ($('td.l-selected', g.selectBox).offset().top - g.selectBox.offset().top);
                                    $(".l-box-select-inner", g.selectBox).animate({ scrollTop:offSet });
                                }
                            });
                        }
                        else {
                            g.selectBox.show();
                            g.boxToggling = false;
                            if (!g.tree && !g.grid && !p.isShowCheckBox && $('td.l-selected', g.selectBox).length > 0) {
                                var offSet = ($('td.l-selected', g.selectBox).offset().top - g.selectBox.offset().top);
                                $(".l-box-select-inner", g.selectBox).animate({ scrollTop:offSet });
                            }
                        }

                    }
                    g.isShowed = g.selectBox.is(":visible");
                }
            };
            //文本框初始化
            if (this.tagName.toLowerCase() == "input") {
                this.readOnly = true;
                g.inputText = $(this);
                g.textFieldID = this.id;
            }
            else if (this.tagName.toLowerCase() == "select") {
                $(this).addClass('l-hidden');
                g.select = $(this);
                p.isMultiSelect = false;
                p.isShowCheckBox = false;
                g.textFieldID = this.id + "_txt";
                g.inputText = $('<input type="text" readonly="true"/>');
                g.inputText.attr("id", g.textFieldID).insertAfter($(this));
            } else {
                //不支持其他类型
                return;
            }
            if (g.inputText[0].name == undefined) g.inputText[0].name = g.textFieldID;
            //隐藏域初始化
            g.valueField = null;
            if (p.valueFieldID) {
                g.valueField = $("#" + p.valueFieldID + ":input");
                if (g.valueField.length == 0) g.valueField = $('<input type="hidden"/>');
                g.valueField[0].id = g.valueField[0].name = p.valueFieldID;
            }
            else {
                g.valueField = $('<input type="hidden"/>');
                g.valueField[0].id = g.valueField[0].name = g.textFieldID + "_val";
            }
            if (g.valueField[0].name == undefined) g.valueField[0].name = g.valueField[0].id;
            //开关
            g.link = $('<div class="l-trigger"><div class="l-trigger-icon"></div></div>');
            //下拉框
            g.selectBox = $('<div class="l-box-select"><div class="l-box-select-inner"><table cellpadding="0" cellspacing="0" border="0" class="l-box-select-table"></table></div></div>');
            g.selectBox.table = $("table:first", g.selectBox);
            //外层
            g.wrapper = g.inputText.wrap('<div class="l-text l-text-combobox"></div>').parent();
            /*---------------------------
            *     @update:添加一个div层，用来存放自定义类名
            *     @update:宋士杰
            *     @date:2013-07-03
            *     @update:2013-12-20 bugfix逻辑错误导致产品出错
            * --------------------------*/
            g.selection = g.wrapper;
            g.outside_selection = g.selection.wrap("<div class='" + p.className + "'></div>").parent();
            //清空按钮初始化 add by junfang 20120308
            if (!p.isNotShowClear) {
                g.clear = g.wrapper.append('<div class="l-text-clear"><a>根目录</a></div>').find(".l-text-clear");
            }

            g.wrapper.append('<div class="l-text-l"></div><div class="l-text-r"></div>');
            g.wrapper.append(g.link).after(g.selectBox).after(g.valueField);

            g.inputText.wrap('<div class="l-input-margin"></div>');
            g.inputText.addClass("l-text-field");
            /*---------------------------
             *     @update:input宽度根据添加内容或小部件来自动计算 by 宋士杰 2013-07-03
             *     @update:修复IE6下显示错位，给最外层的div加一个宽度 by宋士杰 2013-07-05
             * --------------------------*/
            if (p.width) {
                g.outside_selection.css({ width:p.width });
                g.wrapper.css({ width:p.width });
                var extraWidth = $('.l-trigger').width();
                if(!p.isNotShowClear) {
                    var extraWidth = extraWidth + $('.l-text-clear').width();
                }
                var inpw = p.width - extraWidth - 6;
                //alert(inpw);
                g.inputText.css({ width:inpw + "px" });

            }
            if (p.height) {
                g.wrapper.height(p.height);
                g.inputText.height(p.height - 2);
                g.link.height(p.height - 4);
            }
            if (p.isShowCheckBox && !g.select) {
                $("table", g.selectBox).addClass("l-table-checkbox");
            } else {
                p.isShowCheckBox = false;
                $("table", g.selectBox).addClass("l-table-nocheckbox");
            }
            //调整大小支持  //如果定义scrollerHeight则调整大小功能关闭 sjsong01@wisedu.com
            if (p.resize && $.fn.ligerResizable && !p.scrollerHeight) {
                g.selectBox.ligerResizable({ handles:'se,s', onStartResize:function () {
                    g.resizing = true;
                    p.onStartResize && p.onStartResize();
                }, onEndResize:function () {
                    g.resizing = false;
                    //add by su  解决改变内容框的高度的时候，同步内部滚动条的展示
                    $(g.selectBox).find(".l-box-select-inner").css("height",parseInt(g.selectBox.css("height"),10));
                    //po.onEndResize && po.onEndResize();
                    p.onEndResize && p.onEndResize();
                }
                });
                g.selectBox.append("<div class='l-btn-nw-drop'></div>");
            }
            //开关 事件
            g.link.hover(
                function () {
                    this.className = "l-trigger-hover";
                },
                function () {
                    this.className = "l-trigger";
                }).mousedown(
                function () {
                    this.className = "l-trigger-pressed";
                }).mouseup(
                function () {
                    this.className = "l-trigger-hover";
                }).click(function () {
                    if (p.onBeforeOpen && p.onBeforeOpen() == false) return false;
                    po.toggleSelectBox(g.selectBox.is(":visible"));
                });
            // stop lable click event  add by su
            g.link.parents("label:first").click(function(event){
                return false;                                         
            })
            g.inputText.click(
                function () {
                    if (p.onBeforeOpen && p.onBeforeOpen() == false) return false;
                    po.toggleSelectBox(g.selectBox.is(":visible"));
                }).blur(
                function () {
                    g.wrapper.removeClass("l-text-focus");
                }).focus(function () {
                    g.wrapper.addClass("l-text-focus");
                });
            g.wrapper.hover(function () {
                g.wrapper.addClass("l-text-over");
            }, function () {
                g.wrapper.removeClass("l-text-over");
            });
            
            if (!p.isNotShowClear) {
                g.clear.click(function () {
                    po.changeValue("", "");
                });
            }
            g.resizing = false;
            g.selectBox.hover(null, function (e) {
                if (p.hideOnLoseFocus && g.selectBox.is(":visible") && !g.boxToggling && !g.resizing) {
                    po.toggleSelectBox(true);
                }
            });
            //下拉框宽度、高度初始化
            if (p.selectBoxWidth) {
                g.selectBox.width(p.selectBoxWidth);
            }else {
                g.selectBox.css('width', g.wrapper.css('width'));
            }
            var itemsleng = $("tr", g.selectBox.table).length;
            if (!p.selectBoxHeight && itemsleng < 8) p.selectBoxHeight = itemsleng * 30;
            if (p.selectBoxHeight) {
                //解决纵向两层滚动条的问题
                g.selectBox.height(p.selectBoxHeight);
            }

            //下拉框内容初始化
            g.bulidContent();

            //修复IE6、7滚动条宽度计算的BUG
            /*var ie6 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 6.0") != -1);
            var ie7 = (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) == 4 && navigator.appVersion.indexOf("MSIE 7.0") != -1);
            if ($.browser.msie && (ie6 || ie7)) {
                $(".l-box-select-inner",g.selectBox).width(p.selectBoxWidth+20);
                g.selectBox.width(p.selectBoxWidth+20);
            }*/

            if (p.render)
                g.inputText.val(p.render());
            if (this.id == undefined) this.id = "LigerUI_" + new Date().getTime();
            LigerUIManagers[this.id + "_ComboBox"] = g;
            this.usedComboBox = true;
        });
        if (this.length == 0) return null;
        if (this.length == 1) return LigerUIManagers[this[0].id + "_ComboBox"];
        var managers = [];
        this.each(function () {
            managers.push(LigerUIManagers[this.id + "_ComboBox"]);
        });
        return managers;
    };

})(jQuery);