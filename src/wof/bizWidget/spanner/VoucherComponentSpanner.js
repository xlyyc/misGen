/**
 * @bizWidgetClass VoucherComponentSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.VoucherComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.bizWidget.VoucherComponent';
    this._meta.title = '表头';
    this._meta.sendMessages = {'wof.bizWidget.VoucherComponent_mousedown':'单击','wof.bizWidget.VoucherComponent_render':'重绘'};
    this._meta.propertys = {
        'VoucherComponent':{
            'caption':{prop:'caption','name':'标题','type':'text','readOnly':false,'isHide':false,required:false},
            'itemHeight':{prop:'itemHeight','name':'默认行高','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'width':{prop:'width','name':'宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'left':{prop:'left','name':'左边距','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'top':{prop:'top','name':'上边距','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'hiden':{prop:'hiden','name':'是否隐藏','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'scale':{prop:'scale','name':'缩放比例','type':'positiveIntegerOrPositiveDecimal','readOnly':false,'isHide':false,required:true},
            'viewType':{prop:'viewType','name':'展现方式','type':'enum','readOnly':false,'isHide':false, 'enumData':{'group':'分组','tab':'标签页'},required:false},
            'bindEntityID':{prop:'bindEntityID','name':'绑定实体','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.MetaTreeSelector', customParam:'mainEntity'},
            'paramMaps':{prop:'paramMaps','name':'参数','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ParamMapsWindow', customParam:'dataId'}
        },
        'VoucherItemGroup':{
            'groupCaption':{prop:'groupCaption','name':'标题','type':'text','readOnly':false,'isHide':false,required:false},
            'colsNum':{prop:'colsNum','name':'列数','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'itemHeight':{prop:'itemHeight','name':'行高','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'isExpand':{prop:'isExpand','name':'是否展开','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'isHead':{prop:'isHead','name':'是否为Head','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'mustInOrder':{prop:'mustInOrder','name':'保持顺序','type':'yesOrNo','readOnly':false,'isHide':false,required:false}
        },
        'VoucherItem':{
            'rowNum':{prop:'rowNum','name':'行号','type':'naturalNumber','readOnly':true,'isHide':false,required:false},
            'colNum':{prop:'colNum','name':'列号','type':'naturalNumber','readOnly':true,'isHide':false,required:false},
            'colspan':{prop:'colspan','name':'横向通栏','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'rowspan':{prop:'rowspan','name':'纵向通栏','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'isFixItem':{prop:'isFixItem','name':'是否锁定','type':'yesOrNo','readOnly':false,'isHide':false,required:true},
            'itemName':{prop:'itemName','name':'表单项名称','type':'text','readOnly':false,'isHide':false,required:false},
            'visiable':{prop:'visiable','name':'表单项是否显示','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'itemLabel':{prop:'itemLabel','name':'显示名称','type':'text','readOnly':false,'isHide':false,required:false},
            'dataField':{prop:'dataField','name':'绑定实体属性','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.MetaTreeSelector', customParam:'field'},
            'dateTimeBoxFormat':{prop:'dateTimeBoxFormat','name':'时间格式','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    'yyyy-MM-dd HH:mm:ss':'yyyy-MM-dd HH:mm:ss',
                    'yyyy-MM':'yyyy-MM',
                    'MM-dd':'MM-dd',
                    'yyyy-MM-dd':'yyyy-MM-dd',
                    'HH:mm:ss':'HH:mm:ss',
                    'HH:mm':'HH:mm'
                },
                required:false},
            'readOnly':{prop:'readOnly','name':'是否只读','type':'yesOrNo','readOnly':false,'isHide':false,required:false,
                disabledComponents:{
                    enums:'true',
                    components:'length,min,max,regExp,checkErrorInfo,visbleType,selectPattern,useMultiSelect,inputWidth,inputHeight,linkageItem'
                }
            },
            'required':{prop:'required','name':'是否必填','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'length':{prop:'length','name':'字符长度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'min':{prop:'min','name':'数值最小值','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'max':{prop:'max','name':'数值最大值','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'regExp':{prop:'regExp','name':'校验正则表达式','type':'text','readOnly':false,'isHide':false,required:false},
            'checkErrorInfo':{prop:'checkErrorInfo','name':'校验失败提示','type':'text','readOnly':false,'isHide':false,required:false},
            'selectPattern':{prop:'selectPattern','name':'下拉框显示模式','type':'enum','readOnly':false,'isHide':false,
                'enumData':{
                    'normal':'普通',
                    'tree':'树形',
                    'grid':'列表'
                },
                required:false},
            'useMultiSelect':{prop:'useMultiSelect','name':'下拉框是否多选','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'visbleType':{prop:'visbleType','name':'显示类型','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    text:'文本框',
                    textArea:'文本域',
                    richTextArea:'文本编辑器',
                    select:'下拉框',
                    checkBox:'多选框',
                    date:'日期',
                    radio:'单选框',
                    file:'文件选择框',
                    number:'数字'
                },
                required:false,
                disabledComponents:{
                    enums:'text,textArea,richTextArea,checkBox,date,radio,file,number',
                    components:'selectPattern,useMultiSelect'
                }
            },
            'labelWidth':{prop:'labelWidth','name':'Label宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputWidth':{prop:'inputWidth','name':'输入框宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputHeight':{prop:'inputHeight','name':'输入框高度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'linkageItem':{prop:'linkageItem','name':'关联联动项','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.MetaTreeSelector', customParam:'field'},
            'tipValue':{prop:'tipValue','name':'提示信息','type':'text','readOnly':false,'isHide':false,required:false},
            'voucherItemGroupIndex':{prop:'voucherItemGroupIndex','name':'当前分组序号','type':'text','readOnly':true,'isHide':true,required:true}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.VoucherComponent_active',method:'this._receivePropertysAndRenderSelf(message.sender);'});


    var method = 'this._receiveAndProcessParameters(message.sender.parameters);';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    this._selectVoucherComponentIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/selectVoucherComponent.png">');
    this._deleteVoucherComponentIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteVoucherComponent.png">');
    this._cutVoucherComponentIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');

    this._deleteVoucherItemGroupIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteVoucherItemGroup.png">');
    this._insertVoucherItemGroupIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/insertVoucherItemGroup.png">');
    this._upVoucherItemGroupIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/upVoucherItemGroup.png">');
    this._downVoucherItemGroupIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/downVoucherItemGroup.png">');

    this._mergeVoucherItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/mergeVoucherItemArrow.png">');
    this._splitVoucherItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/splitVoucherItemArrow.png">');
    this._addVoucherItemRowspanArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/addVoucherItemRowspanArrow.png">');
    this._reduceVoucherItemRowspanArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/reduceVoucherItemRowspanArrow.png">');
    this._deleteVoucherItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteVoucherItem.png">');
    this._lockVoucherItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/lock.png">');
    this._unlockVoucherItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/unlock.png">');

    this._highlightBorder = jQuery('<div style="position: absolute;top:0px;left:0px;border:1px solid #FF0033">');
};
wof.bizWidget.spanner.VoucherComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性

    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _parameters: null,

    _highlightBorder: null,

    _mergeVoucherItemArrow:null,

    _splitVoucherItemArrow:null,

    _addVoucherItemRowspanArrow:null,

    _reduceVoucherItemRowspanArrow:null,

    _deleteVoucherItemIco:null,

    _lockVoucherItemIco:null,

    _unlockVoucherItemIco:null,

    _deleteVoucherItemGroupIco:null,

    _insertVoucherItemGroupIco:null,

    _upVoucherItemGroupIco:null,

    _downVoucherItemGroupIco:null,

    _selectVoucherComponentIco:null,

    _deleteVoucherComponentIco:null,

    _cutVoucherComponentIco:null,


    /**
     * get/set 属性方法定义
     */

    getMeta: function(){
        return this._meta;
    },

    setPropertys:function(propertys){
        this._propertys = propertys;
    },

    getPropertys: function(){
        if(this._propertys==null){
            this._propertys = {};
        }
        return this._propertys;
    },

    getParameters:function(){
        return this._parameters;
    },

    setParameters:function(parameters){
        this._parameters = parameters;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this._selectVoucherComponentIco.remove();
        this._deleteVoucherComponentIco.remove();
        this._cutVoucherComponentIco.remove();
        this._deleteVoucherItemGroupIco.remove();
        this._insertVoucherItemGroupIco.remove();
        this._upVoucherItemGroupIco.remove();
        this._downVoucherItemGroupIco.remove();
        this._splitVoucherItemArrow.remove();
        this._mergeVoucherItemArrow.remove();
        this._reduceVoucherItemRowspanArrow.remove();
        this._addVoucherItemRowspanArrow.remove();
        this._deleteVoucherItemIco.remove();
        this._lockVoucherItemIco.remove();
        this._unlockVoucherItemIco.remove();

        this._highlightBorder.remove();

        var _this = this;
        this._selectVoucherComponentIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            voucherComponent.setActiveVoucherItemGroupIndex(null);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._deleteVoucherComponentIco.mousedown(function(event){
            event.stopPropagation();
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该表头吗?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '确定':function(){
                        var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
                        voucherComponent.removeChildren(true);
                        voucherComponent.remove(true);
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    }
                }
            });
        });

        this._cutVoucherComponentIco.mousedown(function(event){
            event.stopPropagation();
            wof.util.GlobalObject.add('cutObjectId',_this.getPropertys().id);
        });

        this._deleteVoucherItemGroupIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            if(voucherComponent.getVoucherItemGroups()==1){
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>至少需要保留一个分组</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '关闭':function(){
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        }
                    }
                });
            }else{
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该分组吗?</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '确定':function(){
                            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
                            voucherComponent.deleteVoucherItemGroup(activeVoucherItemGroupIndex);
                            voucherComponent.render();

                            voucherComponent.sendMessage('wof_object_resize');
                            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        },
                        '关闭':function(){
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        }
                    }
                });
            }
        });
        this._insertVoucherItemGroupIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var sectionData = {groupCaption:'未命名分组'};
            voucherComponent.insertVoucherItemGroup(sectionData,activeVoucherItemGroupIndex);
            voucherComponent.render();

            voucherComponent.sendMessage('wof_object_resize');
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._upVoucherItemGroupIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            voucherComponent.upVoucherItemGroup(activeVoucherItemGroupIndex);
            voucherComponent.render();
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._downVoucherItemGroupIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            voucherComponent.downVoucherItemGroup(activeVoucherItemGroupIndex);
            voucherComponent.render();
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });

        this._mergeVoucherItemArrow.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            voucherComponent.addVoucherItemColspan(activeVoucherItemRank, activeVoucherItemGroupIndex);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();

            voucherComponent.sendMessage('wof_object_resize');
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._splitVoucherItemArrow.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            voucherComponent.reduceVoucherItemColspan(activeVoucherItemRank, activeVoucherItemGroupIndex);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();

            voucherComponent.sendMessage('wof_object_resize');
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._reduceVoucherItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            voucherComponent.reduceVoucherItemRowspan(activeVoucherItemRank, activeVoucherItemGroupIndex);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();
            voucherComponent.sendMessage('wof_object_resize');
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._addVoucherItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            voucherComponent.addVoucherItemRowspan(activeVoucherItemRank, activeVoucherItemGroupIndex);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();
            voucherComponent.sendMessage('wof_object_resize');
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });

        this._unlockVoucherItemIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            voucherComponent.unfixVoucherItem(activeVoucherItemRank, activeVoucherItemGroupIndex);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._lockVoucherItemIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            voucherComponent.fixVoucherItem(activeVoucherItemRank, activeVoucherItemGroupIndex);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
        this._deleteVoucherItemIco.mousedown(function(event){
            event.stopPropagation();
            var voucherComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeVoucherItemGroupIndex = _this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            voucherComponent.deleteVoucherItem(activeVoucherItemRank, activeVoucherItemGroupIndex);
            voucherComponent.setActiveVoucherItemGroupIndex(null);
            voucherComponent.setActiveVoucherItemRank(null);
            voucherComponent.render();

            voucherComponent.sendMessage('wof_object_resize');
            voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
        });
    },

    //----------必须实现----------
    render: function () {
        var parameters = {};
        var voucherComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(voucherComponent!=null){
            parameters.id = this.getPropertys().id;
            parameters.componentId = this.getPropertys().componentId;
            parameters.className = this.getPropertys().className;
            parameters.onReceiveMessage = this.getPropertys().onReceiveMessage;
            parameters.onSendMessage = this.getPropertys().onSendMessage;
            var activeVoucherItemGroupIndex = this.getPropertys().activeVoucherItemGroupIndex;
            var activeVoucherItemGroup = voucherComponent.findVoucherItemGroupByIndex(activeVoucherItemGroupIndex);
            if(activeVoucherItemGroup!=null){
                var activeVoucherItemRank = this.getPropertys().activeVoucherItemRank;
                var activeVoucherItem = activeVoucherItemGroup.findVoucherItemByRank(activeVoucherItemRank);
                if(activeVoucherItem!=null){
                    //当前激活voucherItem加入减少列数句柄
                    if(activeVoucherItemGroup.canReduceVoucherItemColspan(activeVoucherItem)){
                        this._splitVoucherItemArrow.css('top',2).css('left',0);
                        activeVoucherItem.getDomInstance().append(this._splitVoucherItemArrow);
                    }
                    //当前激活voucherItem加入增加列数句柄
                    if(activeVoucherItemGroup.canAddVoucherItemColspan(activeVoucherItem)){
                        this._mergeVoucherItemArrow.css('top',2).css('left',activeVoucherItem.getWidth()*activeVoucherItem.getScale()-this._mergeVoucherItemArrow.width()-2);
                        activeVoucherItem.getDomInstance().append(this._mergeVoucherItemArrow);
                    }
                    if(activeVoucherItemGroup.canDeleteVoucherItem(activeVoucherItem)){
                        this._deleteVoucherItemIco.css('top',activeVoucherItem.getHeight()*activeVoucherItem.getScale()-this._deleteVoucherItemIco.height()-2).css('left',activeVoucherItem.getWidth()*activeVoucherItem.getScale()-this._deleteVoucherItemIco.width()*2-6);
                        activeVoucherItem.getDomInstance().append(this._deleteVoucherItemIco);
                    }
                    if(activeVoucherItemGroup.canFixVoucherItem(activeVoucherItem)){
                        this._lockVoucherItemIco.css('top',activeVoucherItem.getHeight()*activeVoucherItem.getScale()-this._lockVoucherItemIco.height()-2).css('left',activeVoucherItem.getWidth()*activeVoucherItem.getScale()-this._lockVoucherItemIco.width()-2);
                        activeVoucherItem.getDomInstance().append(this._lockVoucherItemIco);
                    }
                    if(activeVoucherItemGroup.canUnfixVoucherItem(activeVoucherItem)){
                        this._unlockVoucherItemIco.css('top',activeVoucherItem.getHeight()*activeVoucherItem.getScale()-this._unlockVoucherItemIco.height()-2).css('left',activeVoucherItem.getWidth()*activeVoucherItem.getScale()-this._unlockVoucherItemIco.width()-2);
                        activeVoucherItem.getDomInstance().append(this._unlockVoucherItemIco);
                    }
                    if(activeVoucherItemGroup.canReduceVoucherItemRowspan(activeVoucherItem)){
                        this._reduceVoucherItemRowspanArrow.css('top',0).css('left',activeVoucherItem.getWidth()*activeVoucherItem.getScale()/2-this._reduceVoucherItemRowspanArrow.width()/2);
                        activeVoucherItem.getDomInstance().append(this._reduceVoucherItemRowspanArrow);
                    }
                    if(activeVoucherItemGroup.canAddVoucherItemRowspan(activeVoucherItem)){
                        this._addVoucherItemRowspanArrow.css('top',activeVoucherItem.getHeight()*activeVoucherItem.getScale()-this._addVoucherItemRowspanArrow.height()-2).css('left',activeVoucherItem.getWidth()*activeVoucherItem.getScale()/2-this._addVoucherItemRowspanArrow.width()/2);
                        activeVoucherItem.getDomInstance().append(this._addVoucherItemRowspanArrow);
                    }

                /*    this._highlightBorder.css('height',(activeVoucherItem.getHeight()-6)+'px').css('width',(activeVoucherItem.getWidth()-6)+'px');
                    activeVoucherItem.getDomInstance().append(this._highlightBorder);*/

                    parameters.activeClass = 'VoucherItem';
                    parameters.rowNum = activeVoucherItem.getRowNum();
                    parameters.colNum = activeVoucherItem.getColNum();
                    parameters.colspan = activeVoucherItem.getColspan();
                    parameters.rowspan = activeVoucherItem.getRowspan();
                    parameters.isFixItem = activeVoucherItem.getIsFixItem();
                    parameters.itemName = activeVoucherItem.getItemName();
                    parameters.visiable = activeVoucherItem.getVisiable();
                    parameters.itemLabel = activeVoucherItem.getItemLabel();
                    parameters.dataField = activeVoucherItem.getDataField();
                    parameters.dateTimeBoxFormat = activeVoucherItem.getDateTimeBoxFormat();
                    parameters.readOnly = activeVoucherItem.getReadOnly();
                    parameters.required = activeVoucherItem.getRequired();
                    parameters.length = activeVoucherItem.getLength();
                    parameters.min = activeVoucherItem.getMin();
                    parameters.max = activeVoucherItem.getMax();
                    parameters.regExp = activeVoucherItem.getRegExp();
                    parameters.checkErrorInfo = activeVoucherItem.getCheckErrorInfo();
                    parameters.visbleType = activeVoucherItem.getVisbleType();
                    parameters.selectPattern = activeVoucherItem.getSelectPattern();
                    parameters.useMultiSelect = activeVoucherItem.getUseMultiSelect();
                    parameters.labelWidth = activeVoucherItem.getLabelWidth();
                    parameters.inputWidth = activeVoucherItem.getInputWidth();
                    parameters.inputHeight = activeVoucherItem.getInputHeight();
                    parameters.linkageItem = activeVoucherItem.getLinkageItem();
                    parameters.tipValue = activeVoucherItem.getTipValue();
                    parameters.voucherItemGroupIndex = activeVoucherItemGroup.getIndex();
                }else{
                    parameters.activeClass = 'VoucherItemGroup';
                    parameters.groupCaption = activeVoucherItemGroup.getGroupCaption();
                    parameters.colsNum = activeVoucherItemGroup.getColsNum();
                    parameters.itemHeight = activeVoucherItemGroup.getItemHeight();
                    parameters.isExpand = activeVoucherItemGroup.getIsExpand();
                    parameters.mustInOrder = activeVoucherItemGroup.getMustInOrder();
                    if(voucherComponent.getViewType()=='tab'){ //如果不是标签页 不用设置isHead属性
                        parameters.isHead = activeVoucherItemGroup.getIsHead();
                    }
                    parameters.index = activeVoucherItemGroup.getIndex();

/*                    this._highlightBorder.css('height',(activeVoucherItemGroup.getHeight()-2)+'px').css('width',(activeVoucherItemGroup.getWidth()-2)+'px');
                    activeVoucherItemGroup.getDomInstance().append(this._highlightBorder);*/
                }
                //当前激活VoucherItemGroup加入上移 下移 插入 删除操作句柄
                if(activeVoucherItemGroupIndex>1){
                    this._upVoucherItemGroupIco.css('top',5).css('left',activeVoucherItemGroup.getWidth()*activeVoucherItemGroup.getScale()-this._upVoucherItemGroupIco.width()*4-10);
                    activeVoucherItemGroup.getDomInstance().append(this._upVoucherItemGroupIco);
                }
                this._insertVoucherItemGroupIco.css('top',5).css('left',activeVoucherItemGroup.getWidth()*activeVoucherItemGroup.getScale()-this._insertVoucherItemGroupIco.width()*3-8);
                activeVoucherItemGroup.getDomInstance().append(this._insertVoucherItemGroupIco);
                this._deleteVoucherItemGroupIco.css('top',5).css('left',activeVoucherItemGroup.getWidth()*activeVoucherItemGroup.getScale()-this._deleteVoucherItemGroupIco.width()*2-6);
                activeVoucherItemGroup.getDomInstance().append(this._deleteVoucherItemGroupIco);
                if(activeVoucherItemGroupIndex<voucherComponent.getVoucherItemGroups()){
                    this._downVoucherItemGroupIco.css('top',5).css('left',activeVoucherItemGroup.getWidth()*activeVoucherItemGroup.getScale()-this._downVoucherItemGroupIco.width()-4);
                    activeVoucherItemGroup.getDomInstance().append(this._downVoucherItemGroupIco);
                }

            }else{
                parameters.activeClass = 'VoucherComponent';
                parameters.bindEntityID = voucherComponent.getBindEntityID();
                parameters.caption = voucherComponent.getCaption();
                parameters.callStr = voucherComponent.getCallStr();
                parameters.initActionName = voucherComponent.getInitActionName();
                parameters.state = voucherComponent.getState();
                parameters.viewType = voucherComponent.getViewType();
                parameters.itemHeight = voucherComponent.getItemHeight();
                parameters.width = voucherComponent.getWidth();
                parameters.height = voucherComponent.getHeight();
                parameters.left = voucherComponent.getLeft();
                parameters.top = voucherComponent.getTop();
                parameters.zIndex = voucherComponent.getZIndex();
                parameters.hiden = voucherComponent.getHiden();
                parameters.position = voucherComponent.getPosition();
                parameters.scale = voucherComponent.getScale();
                parameters.paramMaps = voucherComponent.getParamMaps();
                parameters.activeVoucherItemGroupIndex = voucherComponent.getActiveVoucherItemGroupIndex();
                parameters.activeVoucherItemRank = voucherComponent.getActiveVoucherItemRank();
            }
            //当前选中的VoucherComponent加入拖放 删除操作句柄
            this._selectVoucherComponentIco.css('top',0).css('left',0);
            voucherComponent.getDomInstance().append(this._selectVoucherComponentIco);
            this._deleteVoucherComponentIco.css('top',0).css('left',this._deleteVoucherComponentIco.width()+2);
            voucherComponent.getDomInstance().append(this._deleteVoucherComponentIco);
            this._cutVoucherComponentIco.css('top',0).css('left',this._deleteVoucherComponentIco.width()*2+4);
            voucherComponent.getDomInstance().append(this._cutVoucherComponentIco);
        }
        this.setParameters(parameters);
        this.sendMessage('wof.bizWidget.spanner.VoucherComponentSpanner_render');
    },

    //选择实现
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            parameters: this.getParameters(),
            meta: this.getMeta()
        };
    },
    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setParameters(data.parameters);

    },

    //加工并发送数据
    _receivePropertysAndRenderSelf:function(propertys){
        this.setPropertys(propertys);
        this.render();
    },

    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        if(parameters.id==this.getPropertys().id){
            var voucherComponent=wof.util.ObjectManager.get(parameters.id);
            if(parameters.activeClass=="VoucherItemGroup"){
                voucherComponent.updateVoucherItemGroup(parameters);
                voucherComponent.render();
                voucherComponent.sendMessage("wof.bizWidget.VoucherComponent_active");
            }else if(parameters.activeClass=="VoucherItem"){
                voucherComponent.updateVoucherItem(parameters);
                voucherComponent.render();
                voucherComponent.sendMessage("wof.bizWidget.VoucherComponent_active");
            }else if(parameters.activeClass=="VoucherComponent"){
                voucherComponent.updateVoucherComponent(parameters);
                var bindEntityID = parameters.bindEntityID;
                var entity = voucherComponent.getBindEntity();
                if(bindEntityID){
                     if(voucherComponent._getBindEntityPropertyVoucherItems() <= 0 && entity){
                            var properties = entity.properties;
                            if(properties){
                                for(var i = 0; i < properties.length;i++){
                                    var property = properties[i];
                                    voucherComponent.insertVoucherItem({itemLabel : property.label,
                                         dataField : entity.alias + '.' + property.name},
                                        {colNum : 1,rowNum : 1},
                                        voucherComponent.getActiveVoucherItemGroupIndex() || 1);
                                }
                            }
                    }
                }
                voucherComponent.render();
                voucherComponent.sendMessage("wof.bizWidget.VoucherComponent_active");
            }
        }
    },

    //静态方法 导出数据(只有需要给运行时解析的叶子节点才需要定义此方法)
    exportData: function(node){

        /*
         <VoucherComponent width="559" ViewType="tab" index="null" ID="DF6FAEFD49E24FA38147C29E2CADFD5E" BindEntityID="" Caption="未命名表头" State="null" InitActionName="null" CallStr="voucherComponent:0_0_1" ItemHeight="60">
             <VoucherItemGroup IsHead="false" index="1" ColsNum="4" GroupCaption="表头分组1" ItemHeight="45" MustInOrder="false">
                 <VoucherItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="100" LabelWidth="160" VisbleType="text" UseMultiSelect="false" selectPattern="normal" CheckErrorInfo="" RegExp="" Max="0" Min="0" Length="0" Required="false" ReadOnly="false" DateTimeBoxFormat="yyyy-MM-dd" DataField="" ItemLabel="" ItemName="" Rowspan="1" IsFixItem="false" RowNum="1" ColNum="1"/>
                 <VoucherItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="100" LabelWidth="160" VisbleType="text" UseMultiSelect="false" selectPattern="normal" CheckErrorInfo="" RegExp="" Max="0" Min="0" Length="0" Required="false" ReadOnly="false" DateTimeBoxFormat="yyyy-MM-dd" DataField="" ItemLabel="" ItemName="" Rowspan="1" IsFixItem="false" RowNum="1" ColNum="2"/>
                 <VoucherItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="100" LabelWidth="160" VisbleType="text" UseMultiSelect="false" selectPattern="normal" CheckErrorInfo="" RegExp="" Max="0" Min="0" Length="0" Required="false" ReadOnly="false" DateTimeBoxFormat="yyyy-MM-dd" DataField="" ItemLabel="" ItemName="" Rowspan="1" IsFixItem="false" RowNum="1" ColNum="3"/>
                 <VoucherItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="100" LabelWidth="160" VisbleType="text" UseMultiSelect="false" selectPattern="normal" CheckErrorInfo="" RegExp="" Max="0" Min="0" Length="0" Required="false" ReadOnly="false" DateTimeBoxFormat="yyyy-MM-dd" DataField="" ItemLabel="" ItemName="" Rowspan="1" IsFixItem="false" RowNum="1" ColNum="4"/>
             </VoucherItemGroup>
             <ParamMaps/>
         </VoucherComponent>
         */

//        if(node.getClassName()=='wof.bizWidget.VoucherComponent'){
//            var tool = wof.util.Tool;
//            var root = tool.stringToXml("<VoucherComponent></VoucherComponent>");
//            var rootElement = root.documentElement;
//            tool.setAttribute(rootElement,'CallStr',node.getCallStr());
//            tool.setAttribute(rootElement,'BindEntityID',node.getBindEntityID());
//            tool.setAttribute(rootElement,'ID',node.getComponentId());
//            tool.setAttribute(rootElement,'index',node.getIndex());
//            tool.setAttribute(rootElement,'ViewType',node.getViewType());
//            tool.setAttribute(rootElement,'Caption',node.getCaption());
//            tool.setAttribute(rootElement,'width',node.getWidth());
//            tool.setAttribute(rootElement,'State',node.getState());
//            tool.setAttribute(rootElement,'InitActionName',node.getInitActionName());
//            tool.setAttribute(rootElement,'ItemHeight',node.getItemHeight());
//
//            var childNodes = node._voucherItemGroups;
//            for(var i=0;i<childNodes.length;i++){
//                if(childNodes[i].getClassName()=='wof.bizWidget.VoucherItemGroup'){
//                    var group = childNodes[i];
//                    var voucherItemGroup = tool.createElement(root,"VoucherItemGroup");
//                    tool.setAttribute(voucherItemGroup,"MustInOrder",group.getMustInOrder());
//                    tool.setAttribute(voucherItemGroup,"ColsNum",group.getColsNum());
//                    tool.setAttribute(voucherItemGroup,"GroupCaption",group.getGroupCaption());
//                    tool.setAttribute(voucherItemGroup,"IsHead",group.getIsHead());
//                    tool.setAttribute(voucherItemGroup,"ItemHeight",group.getItemHeight());
//                    tool.setAttribute(voucherItemGroup,"index",group.getIndex());
//                    var cns = group.childNodes();
//                    for(var t=0;t<cns.length;t++){
//                        if(cns[t].getClassName()=='wof.bizWidget.VoucherItem'){
//                            var item = cns[t];
//                            var voucherItem = tool.createElement(root,"VoucherItem");
//
//                            tool.setAttribute(voucherItem,"ItemName",item.getItemName());
//                            tool.setAttribute(voucherItem,"TipValue",item.getTipValue());
//                            tool.setAttribute(voucherItem,"ReadOnly",item.getReadOnly());
//                            tool.setAttribute(voucherItem,"InputWidth",item.getInputWidth());
//                            tool.setAttribute(voucherItem,"InputHeight",item.getInputHeight());
//                            tool.setAttribute(voucherItem,"Visiable",item.getVisiable());
//                            tool.setAttribute(voucherItem,"ItemLabel",item.getItemLabel());
//                            tool.setAttribute(voucherItem,"LabelWidth",item.getLabelWidth());
//                            tool.setAttribute(voucherItem,"DataField",item.getDataField());
//                            tool.setAttribute(voucherItem,"Colspan",item.getColspan());
//                            tool.setAttribute(voucherItem,"VisbleType",item.getVisbleType());
//                            tool.setAttribute(voucherItem,"LinkageItem",item.getLinkageItem());
//                            tool.setAttribute(voucherItem,"UseMultiSelect",item.getUseMultiSelect());
//                            tool.setAttribute(voucherItem,"selectPattern",item.getSelectPattern());
//                            tool.setAttribute(voucherItem,"CheckErrorInfo",item.getCheckErrorInfo());
//                            tool.setAttribute(voucherItem,"RegExp",item.getRegExp());
//                            tool.setAttribute(voucherItem,"Max",item.getMax());
//                            tool.setAttribute(voucherItem,"Min",item.getMin());
//                            tool.setAttribute(voucherItem,"Length",item.getLength());
//                            tool.setAttribute(voucherItem,"Required",item.getRequired());
//                            tool.setAttribute(voucherItem,"ReadOnly",item.getReadOnly());
//                            tool.setAttribute(voucherItem,"DateTimeBoxFormat",item.getDateTimeBoxFormat());
//                            tool.setAttribute(voucherItem,"ReadOnly",item.getReadOnly());
//                            tool.setAttribute(voucherItem,"Rowspan",item.getRowspan());
//                            tool.setAttribute(voucherItem,"IsFixItem",item.getIsFixItem());
//                            tool.setAttribute(voucherItem,"RowNum",item.getRowNum());
//                            tool.setAttribute(voucherItem,"ColNum",item.getColNum());
//                            //tool.setAttribute(voucherItem,"Index",item.getIndex());
//                            tool.appendChild(voucherItemGroup,voucherItem);
//                        }
//                    }
//
//                    tool.appendChild(rootElement,voucherItemGroup);
//                }
//            }
//
//            var paramMaps = tool.createElement(root,"ParamMaps");
//
//            var paramMap = tool.createElement(root,"ParamMap");
//
//            for(var k in node.getParamMaps()){
//                var param = node.getParamMaps()[k];
//                tool.setAttribute(paramMap,k,param);
//            }
//
//            tool.appendChild(paramMaps,paramMap);
//
//            tool.appendChild(rootElement,paramMaps);
//
//            //console.log(tool.xmlToString(root));
//           // return tool.xmlToString(root);
//        }

        var json = {};
        if(node.getClassName()=='wof.bizWidget.VoucherComponent'){
            json.className = node.getClassName();
            json.itemHeight = node.getItemHeight();
            json.callStr = node.getCallStr();
            json.initActionName = node.getInitActionName();
            json.state = node.getState();
            json.caption = node.getCaption();
            json.bindEntityID = node.getBindEntityID();
            json.id = node.getComponentId();
            json.index = node.getIndex();
            json.viewType = node.getViewType();
            json.width = node.getWidth();

            var paramMaps = [];
            for(var k in node.getParamMaps()){
                var param = node.getParamMaps()[k];
                paramMaps.push(param);
            }
            json.paramMaps = paramMaps;

            var voucherItemGroups = [];
            var childNodes = node._voucherItemGroups;
            for(var i=0;i<childNodes.length;i++){
                if(childNodes[i].getClassName()=='wof.bizWidget.VoucherItemGroup'){
                    var group = childNodes[i];
                    var voucherItemGroup = {};
                    voucherItemGroup.mustInOrder = group.getMustInOrder();
                    voucherItemGroup.itemHeight = group.getItemHeight();
                    voucherItemGroup.groupCaption = group.getGroupCaption();
                    voucherItemGroup.colsNum = group.getColsNum();
                    voucherItemGroup.index = group.getIndex();
                    voucherItemGroup.isHead = group.getIsHead();
                    var voucherItems = [];
                    var cns = group.childNodes();
                    for(var t=0;t<cns.length;t++){
                        if(cns[t].getClassName()=='wof.bizWidget.VoucherItem'){
                            var item = cns[t];
                            var voucherItem = {};
                            voucherItem.colNum = item.getColNum();
                            voucherItem.rowNum = item.getRowNum();
                            voucherItem.isFixItem = item.getIsFixItem();
                            voucherItem.rowspan = item.getRowspan();
                            voucherItem.itemName = item.getItemName();
                            voucherItem.visiable = item.getVisiable();
                            voucherItem.itemLabel = item.getItemLabel();
                            voucherItem.dataField = item.getDataField();
                            voucherItem.dateTimeBoxFormat = item.getDateTimeBoxFormat();
                            voucherItem.readOnly = item.getReadOnly();
                            voucherItem.required = item.getRequired();
                            voucherItem.length = item.getLength();
                            voucherItem.min = item.getMin();
                            voucherItem.max = item.getMax();
                            voucherItem.regExp = item.getRegExp();
                            voucherItem.checkErrorInfo = item.getCheckErrorInfo();
                            voucherItem.selectPattern = item.getSelectPattern();
                            voucherItem.useMultiSelect = item.getUseMultiSelect();
                            voucherItem.visbleType = item.getVisbleType();
                            voucherItem.labelWidth = item.getLabelWidth();
                            voucherItem.inputWidth = item.getInputWidth();
                            voucherItem.inputHeight = item.getInputHeight();
                            voucherItem.linkageItem = item.getLinkageItem();
                            voucherItem.colspan = item.getColspan();
                            voucherItem.tipValue = item.getTipValue();
                            voucherItems.push(voucherItem);
                        }
                    }
                    voucherItemGroup.columns = voucherItems;
                    voucherItemGroups.push(voucherItemGroup);
                }
            }
            json.voucherItemGroups = voucherItemGroups;
        }
        console.log(JSON.stringify(json));
        return json;
    }

};