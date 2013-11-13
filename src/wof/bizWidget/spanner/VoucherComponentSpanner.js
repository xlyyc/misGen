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
            'bindEntityID':{prop:'bindEntityID','name':'绑定实体','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.MetaTreeSelector', customParam:'mainEntity'}

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
            'dateTimeBoxFormat':{prop:'dateTimeBoxFormat','name':'时间格式','type':'enum','readOnly':false,'isHide':false,enumData:{'YYYY-MM-DD hh:mm:ss':'YYYY-MM-DD hh:mm:ss','YYYY-MM':'YYYY-MM','MM-DD':'MM-DD','YYYY-MM-DD':'YYYY-MM-DD','hh:mm:ss':'hh:mm:ss','hh:mm':'hh:mm'},required:false},
            'readOnly':{prop:'readOnly','name':'是否只读','type':'yesOrNo','yesOrNo':false,'isHide':false,required:false},
            'required':{prop:'required','name':'是否必填','type':'yesOrNo','yesOrNo':false,'isHide':false,required:false},
            'length':{prop:'length','name':'字符长度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'min':{prop:'min','name':'数值最小值','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'max':{prop:'max','name':'数值最大值','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'regExp':{prop:'regExp','name':'校验正则表达式','type':'text','readOnly':false,'isHide':false,required:false},
            'checkErrorInfo':{prop:'checkErrorInfo','name':'校验失败提示','type':'text','readOnly':false,'isHide':false,required:false},
            'selectPattern':{prop:'selectPattern','name':'下拉框显示模式','type':'enum','readOnly':false,'isHide':false, 'enumData':{'normal':'普通','tree':'树形','grid':'列表'},required:false},
            'useMultiSelect':{prop:'useMultiSelect','name':'下拉框是否多选','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'visbleType':{prop:'visbleType','name':'显示类型','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    id:'Id',
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
                required:false},
            'labelWidth':{prop:'labelWidth','name':'Label宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputWidth':{prop:'inputWidth','name':'输入框宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputHeight':{prop:'inputHeight','name':'输入框高度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'linkageItem':{prop:'linkageItem','name':'关联联动项','type':'text','readOnly':false,'isHide':false,required:false},
            'tipValue':{prop:'tipValue','name':'提示信息','type':'text','readOnly':false,'isHide':false,required:false},
            'voucherItemGroupIndex':{prop:'voucherItemGroupIndex','name':'当前分组序号','type':'text','readOnly':true,'isHide':true,required:true}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.bizWidget.VoucherComponent"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +' if(data.id==this.getPropertys().id){ '
        +' var voucherComponent=wof.util.ObjectManager.get(data.id); '
        +' if(data.activeClass=="VoucherItemGroup"){ '
        +'   voucherComponent.updateVoucherItemGroup(data); '
        +'   voucherComponent.render(); '
        +'   voucherComponent.sendMessage("wof.bizWidget.VoucherComponent_active");'
        +' }else if(data.activeClass=="VoucherItem"){ '
        +'     voucherComponent.updateVoucherItem(data); '
        +'     voucherComponent.render(); '
        +'     voucherComponent.sendMessage("wof.bizWidget.VoucherComponent_active");'
        +'   }else if(data.activeClass=="VoucherComponent"){ '
        +'       voucherComponent.updateVoucherComponent(data); '
        +'       voucherComponent.render();'
        +'       voucherComponent.sendMessage("wof.bizWidget.VoucherComponent_active");'
        +'    } '
        +'}';
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
};
wof.bizWidget.spanner.VoucherComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性

    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _activeData: null,

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

    getActiveData:function(){
        return this._activeData;
    },

    setActiveData:function(activeData){
        this._activeData = activeData;
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
            var section = voucherComponent.findVoucherItemGroupByIndex(activeVoucherItemGroupIndex);
            var activeVoucherItemRank = _this.getPropertys().activeVoucherItemRank;
            var activeVoucherItem = section.findVoucherItemByRank(activeVoucherItemRank);
            if(activeVoucherItem!=null&&activeVoucherItem.childNodes().length>0){
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>该单元格包含对象,确定要删除该单元格吗?</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '确定':function(){
                            voucherComponent.deleteVoucherItem(activeVoucherItemRank, activeVoucherItemGroupIndex);
                            voucherComponent.setActiveVoucherItemGroupIndex(null);
                            voucherComponent.setActiveVoucherItemRank(null);
                            voucherComponent.render();
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
            }else{
                voucherComponent.deleteVoucherItem(activeVoucherItemRank, activeVoucherItemGroupIndex);
                voucherComponent.setActiveVoucherItemGroupIndex(null);
                voucherComponent.setActiveVoucherItemRank(null);
                voucherComponent.render();
                voucherComponent.sendMessage('wof.bizWidget.VoucherComponent_active');
            }
        });
    },

    //----------必须实现----------
    render: function () {
        var activeData = {};
        var voucherComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(voucherComponent!=null){
            activeData.id = this.getPropertys().id;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;
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
                    activeData.activeClass = 'VoucherItem';
                    activeData.rowNum = activeVoucherItem.getRowNum();
                    activeData.colNum = activeVoucherItem.getColNum();
                    activeData.colspan = activeVoucherItem.getColspan();
                    activeData.rowspan = activeVoucherItem.getRowspan();
                    activeData.isFixItem = activeVoucherItem.getIsFixItem();
                    activeData.itemName = activeVoucherItem.getItemName();
                    activeData.visiable = activeVoucherItem.getVisiable();
                    activeData.itemLabel = activeVoucherItem.getItemLabel();
                    activeData.dataField = activeVoucherItem.getDataField();
                    activeData.dateTimeBoxFormat = activeVoucherItem.getDateTimeBoxFormat();
                    activeData.readOnly = activeVoucherItem.getReadOnly();
                    activeData.required = activeVoucherItem.getRequired();
                    activeData.length = activeVoucherItem.getLength();
                    activeData.min = activeVoucherItem.getMin();
                    activeData.max = activeVoucherItem.getMax();
                    activeData.regExp = activeVoucherItem.getRegExp();
                    activeData.checkErrorInfo = activeVoucherItem.getCheckErrorInfo();
                    activeData.selectPattern = activeVoucherItem.getSelectPattern();
                    activeData.useMultiSelect = activeVoucherItem.getUseMultiSelect();
                    activeData.visbleType = activeVoucherItem.getVisbleType();
                    activeData.labelWidth = activeVoucherItem.getLabelWidth();
                    activeData.inputWidth = activeVoucherItem.getInputWidth();
                    activeData.inputHeight = activeVoucherItem.getInputHeight();
                    activeData.linkageItem = activeVoucherItem.getLinkageItem();
                    activeData.tipValue = activeVoucherItem.getTipValue();
                    activeData.voucherItemGroupIndex = activeVoucherItemGroup.getIndex();
                }else{
                    activeData.activeClass = 'VoucherItemGroup';
                    activeData.groupCaption = activeVoucherItemGroup.getGroupCaption();
                    activeData.colsNum = activeVoucherItemGroup.getColsNum();
                    activeData.itemHeight = activeVoucherItemGroup.getItemHeight();
                    activeData.isExpand = activeVoucherItemGroup.getIsExpand();
                    activeData.mustInOrder = activeVoucherItemGroup.getMustInOrder();
                    activeData.isHead = activeVoucherItemGroup.getIsHead();
                    activeData.index = activeVoucherItemGroup.getIndex();
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
                activeData.activeClass = 'VoucherComponent';
                activeData.bindEntityID = voucherComponent.getBindEntityID();
                activeData.caption = voucherComponent.getCaption();
                activeData.callStr = voucherComponent.getCallStr();
                activeData.initActionName = voucherComponent.getInitActionName();
                activeData.state = voucherComponent.getState();
                activeData.viewType = voucherComponent.getViewType();
                activeData.itemHeight = voucherComponent.getItemHeight();
                activeData.width = voucherComponent.getWidth();
                activeData.height = voucherComponent.getHeight();
                activeData.left = voucherComponent.getLeft();
                activeData.top = voucherComponent.getTop();
                activeData.zIndex = voucherComponent.getZIndex();
                activeData.hiden = voucherComponent.getHiden();
                activeData.position = voucherComponent.getPosition();
                activeData.scale = voucherComponent.getScale();
                activeData.activeVoucherItemGroupIndex = voucherComponent.getActiveVoucherItemGroupIndex();
                activeData.activeVoucherItemRank = voucherComponent.getActiveVoucherItemRank();
            }
            //当前选中的VoucherComponent加入拖放 删除操作句柄
            this._selectVoucherComponentIco.css('top',0).css('left',0);
            voucherComponent.getDomInstance().append(this._selectVoucherComponentIco);
            this._deleteVoucherComponentIco.css('top',0).css('left',this._deleteVoucherComponentIco.width()+2);
            voucherComponent.getDomInstance().append(this._deleteVoucherComponentIco);
            this._cutVoucherComponentIco.css('top',0).css('left',this._deleteVoucherComponentIco.width()*2+4);
            voucherComponent.getDomInstance().append(this._cutVoucherComponentIco);
        }
        this.setActiveData(activeData);
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
            activeData: this.getActiveData(),
            meta: this.getMeta()
        };
    },
    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setActiveData(data.activeData);
    },

    //静态方法 导出数据(只有需要给运行时解析的叶子节点才需要定义此方法)
    exportData: function(node){
        /*
         <VoucherComponent CallStr="VoucherComponent:1.0.0" BindEntityID="Employee" ID="emplyform" index="1" ViewType="nomal" width="1000">
         <VoucherItemGroup MustInOrder="true" ColsNum="5" GroupCaption="员工基本信息" IsHead="false" index="0" ItemHeight="50">
         <VoucherItem ItemName="emId" TipValue="EM201302001" ReadOnly="false" InputWidth="150" InputHeight="20" Visiable="false" ItemLabel="工号" LableWidth="100" DataField="emId" VisbleType="Text" />
         <VoucherItem ItemName="name" InputWidth="150" Visible="true" Required="true" ItemLabel="姓名" LableWidth="100" DataField="name" VisbleType="Text" RowNum="0" />
         <VoucherItem ItemName="sex" InputWidth="150" Visible="true" ItemLabel="性别" LableWidth="100" DataField="sex" VisbleType="Radio" RowNum="0" />
         <VoucherItem ItemName="entryDate" InputWidth="150" Visible="true" ItemLabel="入职时间" LableWidth="100" TipValue="点击选择时间" DataField="entryDate" DateTimeBoxFormat="yyyy-MM-dd hh:mm" VisbleType="Date" RowNum="1" />
         <VoucherItem ItemName="birthdate" InputWidth="150" Visible="true" ItemLabel="出生年月" LableWidth="100" TipValue="点击选择时间" DataField="birthdate" DateTimeBoxFormat="yyyy-MM" VisbleType="Date" RowNum="0" />
         <VoucherItem ItemName="empty" Visible="true" ItemLabel="" LableWidth="" DataField="" VisbleType="" IsFixItem="false" RowNum="5" ColNum="2" Colspan="2" Rowspan="2" />
         <VoucherItem ItemName="age" InputWidth="150" Visible="true" ItemLabel="年龄" LableWidth="100" DataField="age" VisbleType="Number" />
         <VoucherItem ItemName="pic" InputWidth="150" Visible="true" Colspan="2" Rowspan="2" ItemLabel="照片" LableWidth="100" DataField="pic" VisbleType="File" IsFixItem="true" RowNum="1" ColNum="2" />
         <VoucherItem ItemName="country" InputWidth="150" Visiable="true" ItemLabel="国籍" LableWidth="100" DataField="country" VisbleType="Select" RowNum="2" />
         <VoucherItem ItemName="comments" InputWidth="300" Index="10" IsFixItem="false" RowNum="5" ColNum="1" InputHeight="80" Visible="true" ItemLabel="自我介绍" LableWidth="100" DataField="comments" VisbleType="TextArea" Min="10" Max="100" Colspan="3" Rowspan="2" />
         <VoucherItem ItemName="eMail" InputWidth="100" Visible="true" ItemLabel="电子邮箱" LableWidth="150" DataField="eMail" Required="true" RegExp="/^((13[0-9]{1})|159|153)+\d{8}$/" CheckErrorInfo="请输入正确的邮箱格式" VisbleType="Text" RowNum="3" />
         </VoucherItemGroup>
         <ParamMaps>
         <ParamMap MapType="value" CompParamName="" PageParamName="" ChangeExpt="" />
         </ParamMaps>
         </VoucherComponent>
         */
        var json = {};
        if(node.getClassName()=='wof.bizWidget.VoucherComponent'){
            json.className = node.getClassName();
            json.itemHeight = node.getItemHeight();
            json.callStr = node.getCallStr();
            json.initActionName = node.getInitActionName();
            json.state = node.getState();
            json.caption = node.getCaption();
            json.bindEntityID = node.getBindEntityID();
            json.id = node.getId();
            json.index = node.getIndex();
            json.viewType = node.getViewType();
            json.width = node.getWidth();

            var voucherItemGroups = [];
            //var childNodes = node.childNodes();
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
        return json;
    }

};