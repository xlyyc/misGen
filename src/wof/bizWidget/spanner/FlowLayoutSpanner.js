/**
 * @bizWidgetClass FlowLayoutSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.FlowLayoutSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.bizWidget.FlowLayout';
    this._meta.title = '流式布局';
    this._meta.sendMessages = {'wof.bizWidget.FlowLayout_mousedown':'单击','wof.bizWidget.FlowLayout_render':'重绘'};
    this._meta.propertys = {
        'FlowLayout':{
            'id':{prop:'id','name':'ID','type':'text','readOnly':true,'isHide':false,required:false},
            'cols':{prop:'cols','name':'默认列数','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'itemHeight':{prop:'itemHeight','name':'默认行高','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'width':{prop:'width','name':'宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'left':{prop:'left','name':'左边距','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'top':{prop:'top','name':'上边距','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'hiden':{prop:'hiden','name':'是否隐藏','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'scale':{prop:'scale','name':'缩放比例','type':'positiveIntegerOrPositiveDecimal','readOnly':false,'isHide':false,required:true}
        },
        'FlowLayoutSection':{
            'title':{prop:'title','name':'标题','type':'text','readOnly':false,'isHide':false,required:false},
            'cols':{prop:'cols','name':'列数','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'itemHeight':{prop:'itemHeight','name':'行高','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'isExpand':{prop:'isExpand','name':'是否展开','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'mustInOrder':{prop:'mustInOrder','name':'保持顺序','type':'yesOrNo','readOnly':false,'isHide':false,required:false}
        },
        'FlowLayoutItem':{
            'row':{prop:'row','name':'行号','type':'naturalNumber','readOnly':true,'isHide':false,required:false},
            'col':{prop:'col','name':'列号','type':'naturalNumber','readOnly':true,'isHide':false,required:false},
            'colspan':{prop:'colspan','name':'横向通栏','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'rowspan':{prop:'rowspan','name':'纵向通栏','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'isFixItem':{prop:'isFixItem','name':'是否锁定','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'sectionIndex':{prop:'sectionIndex','name':'当前分组序号','type':'naturalNumber','readOnly':true,'isHide':true,required:true}
        }
    };


    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.bizWidget.FlowLayout"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +' if(data.id==this.getPropertys().id){ '
        +' var flowLayout=wof.util.ObjectManager.get(data.id); '
        +' if(data.activeClass=="FlowLayoutSection"){ '
        +'   flowLayout.updateSection(data); '
        +'   flowLayout.render(); '
        +'   flowLayout.sendMessage("wof.bizWidget.FlowLayout_active");'
        +' }else if(data.activeClass=="FlowLayoutItem"){ '
        +'     flowLayout.updateItem(data); '
        +'     flowLayout.render(); '
        +'     flowLayout.sendMessage("wof.bizWidget.FlowLayout_active");'
        +'   }else if(data.activeClass=="FlowLayout"){ '
        +'       flowLayout.updateFlowLayout(data); '
        +'       flowLayout.render();'
        +'       flowLayout.sendMessage("wof.bizWidget.FlowLayout_active");'
        +'    } '
        +'}';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    this._selectFlowLayoutIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/selectFlowLayout.png">');
    this._deleteFlowLayoutIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteFlowLayout.png">');
    this._cutFlowLayoutIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');

    this._deleteSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteSection.png">');
    this._insertSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/insertSection.png">');
    this._upSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/upSection.png">');
    this._downSectionIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/downSection.png">');

    this._mergeItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/mergeItemArrow.png">');
    this._splitItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/splitItemArrow.png">');
    this._addItemRowspanArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/addItemRowspanArrow.png">');
    this._reduceItemRowspanArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/reduceItemRowspanArrow.png">');
    this._deleteItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteItem.png">');
    this._lockItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/lock.png">');
    this._unlockItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/unlock.png">');
    this._pasteObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/paste.gif">');
};
wof.bizWidget.spanner.FlowLayoutSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性

    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _activeData: null,

    _mergeItemArrow:null,

    _splitItemArrow:null,

    _addItemRowspanArrow:null,

    _reduceItemRowspanArrow:null,

    _deleteItemIco:null,

    _lockItemIco:null,

    _unlockItemIco:null,

    _deleteSectionIco:null,

    _insertSectionIco:null,

    _upSectionIco:null,

    _downSectionIco:null,

    _selectFlowLayoutIco:null,

    _deleteFlowLayoutIco:null,

    _cutFlowLayoutIco:null,

    _pasteObjectIco:null,


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
        this._selectFlowLayoutIco.remove();
        this._deleteFlowLayoutIco.remove();
        this._cutFlowLayoutIco.remove();
        this._pasteObjectIco.remove();
        this._deleteSectionIco.remove();
        this._insertSectionIco.remove();
        this._upSectionIco.remove();
        this._downSectionIco.remove();
        this._splitItemArrow.remove();
        this._mergeItemArrow.remove();
        this._reduceItemRowspanArrow.remove();
        this._addItemRowspanArrow.remove();
        this._deleteItemIco.remove();
        this._lockItemIco.remove();
        this._unlockItemIco.remove();

        var _this = this;
        this._selectFlowLayoutIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            flowLayout.setActiveSectionIndex(null);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._deleteFlowLayoutIco.mousedown(function(event){
            event.stopPropagation();
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该流式布局吗?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '确定':function(){
                        var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
                        flowLayout.removeChildren(true);
                        flowLayout.remove(true);
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

        this._cutFlowLayoutIco.mousedown(function(event){
            event.stopPropagation();
            wof.util.GlobalObject.add('cutObjectId',_this.getPropertys().id);
        });

        this._deleteSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            if(flowLayout.getSections()==1){
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
                            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
                            flowLayout.deleteSection(activeSectionIndex);
                            flowLayout.render();
                            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
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
        this._insertSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var sectionData = {title:'未命名分组'};
            flowLayout.insertSection(sectionData,activeSectionIndex);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._upSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            flowLayout.upSection(activeSectionIndex);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._downSectionIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            flowLayout.downSection(activeSectionIndex);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });

        this._mergeItemArrow.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            flowLayout.addItemColspan(activeItemRank, activeSectionIndex);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._splitItemArrow.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            flowLayout.reduceItemColspan(activeItemRank, activeSectionIndex);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._reduceItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            flowLayout.reduceItemRowspan(activeItemRank, activeSectionIndex);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._addItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            flowLayout.addItemRowspan(activeItemRank, activeSectionIndex);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });

        this._unlockItemIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            flowLayout.unfixItem(activeItemRank, activeSectionIndex);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._lockItemIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var activeItemRank = _this.getPropertys().activeItemRank;
            flowLayout.fixItem(activeItemRank, activeSectionIndex);
            flowLayout.setActiveItemRank(null);
            flowLayout.render();
            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
        });
        this._pasteObjectIco.mousedown(function(event){
            event.stopPropagation();
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>是否复制被粘贴对象?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '复制':function(){
                        var obj = wof.util.ObjectManager.get(wof.util.GlobalObject.get('cutObjectId'));
                        if(obj!=null){
                            wof.util.GlobalObject.remove('cutObjectId');
                            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
                            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
                            var activeItemRank = _this.getPropertys().activeItemRank;
                            var newObj = eval('new '+obj.getClassName()+'();');
                            newObj.setData(obj.getData());
                            flowLayout.insertNode(newObj, activeItemRank, activeSectionIndex);
                            flowLayout.setActiveItemRank(null);
                            flowLayout.render();
                            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
                        }
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    },
                    '移动':function(){
                        var obj = wof.util.ObjectManager.get(wof.util.GlobalObject.get('cutObjectId'));
                        if(obj!=null){
                            wof.util.GlobalObject.remove('cutObjectId');
                            obj.remove();
                            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
                            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
                            var activeItemRank = _this.getPropertys().activeItemRank;
                            flowLayout.insertNode(obj, activeItemRank, activeSectionIndex);
                            flowLayout.setActiveItemRank(null);
                            flowLayout.render();
                            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
                        }
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

        this._deleteItemIco.mousedown(function(event){
            event.stopPropagation();
            var flowLayout = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSectionIndex = _this.getPropertys().activeSectionIndex;
            var section = flowLayout.findSectionByIndex(activeSectionIndex);
            var activeItemRank = _this.getPropertys().activeItemRank;
            var activeItem = section.findItemByRank(activeItemRank);
            if(activeItem!=null&&activeItem.childNodes().length>0){
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>该单元格包含对象,确定要删除该单元格吗?</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '确定':function(){
                            flowLayout.deleteItem(activeItemRank, activeSectionIndex);
                            flowLayout.setActiveSectionIndex(null);
                            flowLayout.setActiveItemRank(null);
                            flowLayout.render();
                            flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
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
                flowLayout.deleteItem(activeItemRank, activeSectionIndex);
                flowLayout.setActiveSectionIndex(null);
                flowLayout.setActiveItemRank(null);
                flowLayout.render();
                flowLayout.sendMessage('wof.bizWidget.FlowLayout_active');
            }
        });
    },

    //----------必须实现----------
    render: function () {
        var activeData = {};
        var flowLayout = wof.util.ObjectManager.get(this.getPropertys().id);
        if(flowLayout!=null){
            activeData.id = this.getPropertys().id;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;
            var activeSectionIndex = this.getPropertys().activeSectionIndex;
            var activeSection = flowLayout.findSectionByIndex(activeSectionIndex);
            if(activeSection!=null){
                var activeItemRank = this.getPropertys().activeItemRank;
                var activeItem = activeSection.findItemByRank(activeItemRank);
                if(activeItem!=null){
                    if(activeSection.canReduceItemColspan(activeItem)){
                        this._splitItemArrow.css('top',2).css('left',0);
                        activeItem.getDomInstance().append(this._splitItemArrow);
                    }
                    if(activeSection.canAddItemColspan(activeItem)){
                        this._mergeItemArrow.css('top',2).css('left',activeItem.getWidth()*activeItem.getScale()-this._mergeItemArrow.width()-2);
                        activeItem.getDomInstance().append(this._mergeItemArrow);
                    }
                    if(activeItem.canPasteObject(wof.util.ObjectManager.get(wof.util.GlobalObject.get('cutObjectId')))){
                        this._pasteObjectIco.css('top',activeItem.getHeight()*activeItem.getScale()-this._pasteObjectIco.height()-2).css('left',activeItem.getWidth()*activeItem.getScale()-this._pasteObjectIco.width()*3-10);
                        activeItem.getDomInstance().append(this._pasteObjectIco);
                    }
                    if(activeSection.canDeleteItem(activeItem)){
                        this._deleteItemIco.css('top',activeItem.getHeight()*activeItem.getScale()-this._deleteItemIco.height()-2).css('left',activeItem.getWidth()*activeItem.getScale()-this._deleteItemIco.width()*2-6);
                        activeItem.getDomInstance().append(this._deleteItemIco);
                    }
                    if(activeSection.canFixItem(activeItem)){
                        this._lockItemIco.css('top',activeItem.getHeight()*activeItem.getScale()-this._lockItemIco.height()-2).css('left',activeItem.getWidth()*activeItem.getScale()-this._lockItemIco.width()-2);
                        activeItem.getDomInstance().append(this._lockItemIco);
                    }
                    if(activeSection.canUnfixItem(activeItem)){
                        this._unlockItemIco.css('top',activeItem.getHeight()*activeItem.getScale()-this._unlockItemIco.height()-2).css('left',activeItem.getWidth()*activeItem.getScale()-this._unlockItemIco.width()-2);
                        activeItem.getDomInstance().append(this._unlockItemIco);
                    }
                    if(activeSection.canReduceItemRowspan(activeItem)){
                        this._reduceItemRowspanArrow.css('top',0).css('left',activeItem.getWidth()*activeItem.getScale()/2-this._reduceItemRowspanArrow.width()/2);
                        activeItem.getDomInstance().append(this._reduceItemRowspanArrow);
                    }
                    if(activeSection.canAddItemRowspan(activeItem)){
                        this._addItemRowspanArrow.css('top',activeItem.getHeight()*activeItem.getScale()-this._addItemRowspanArrow.height()-2).css('left',activeItem.getWidth()*activeItem.getScale()/2-this._addItemRowspanArrow.width()/2);
                        activeItem.getDomInstance().append(this._addItemRowspanArrow);
                    }
                    activeData.activeClass = 'FlowLayoutItem';
                    activeData.row = activeItem.getRow();
                    activeData.col = activeItem.getCol();
                    activeData.colspan = activeItem.getColspan();
                    activeData.isFixItem = activeItem.getIsFixItem();
                    activeData.rowspan = activeItem.getRowspan();
                    activeData.sectionIndex = activeSection.getIndex();
                }else{
                    activeData.activeClass = 'FlowLayoutSection';
                    activeData.title = activeSection.getTitle();
                    activeData.cols = activeSection.getCols();
                    activeData.itemHeight = activeSection.getItemHeight();
                    activeData.isExpand = activeSection.getIsExpand();
                    activeData.mustInOrder = activeSection.getMustInOrder();
                    activeData.index = activeSection.getIndex();
                }
                //当前激活section加入上移 下移 插入 删除操作句柄
                if(activeSectionIndex>1){
                    this._upSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._upSectionIco.width()*4-10);
                    activeSection.getDomInstance().append(this._upSectionIco);
                }
                this._insertSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._insertSectionIco.width()*3-8);
                activeSection.getDomInstance().append(this._insertSectionIco);
                this._deleteSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._deleteSectionIco.width()*2-6);
                activeSection.getDomInstance().append(this._deleteSectionIco);
                if(activeSectionIndex<flowLayout.getSections()){
                    this._downSectionIco.css('top',5).css('left',activeSection.getWidth()*activeSection.getScale()-this._downSectionIco.width()-4);
                    activeSection.getDomInstance().append(this._downSectionIco);
                }
            }else{
                activeData.activeClass = 'FlowLayout';
                activeData.cols = flowLayout.getCols();
                activeData.itemHeight = flowLayout.getItemHeight();
                activeData.width = flowLayout.getWidth();
                activeData.height = flowLayout.getHeight();
                activeData.left = flowLayout.getLeft();
                activeData.top = flowLayout.getTop();
                activeData.zIndex = flowLayout.getZIndex();
                activeData.hiden = flowLayout.getHiden();
                activeData.position = flowLayout.getPosition();
                activeData.scale = flowLayout.getScale();
                activeData.activeSectionIndex = flowLayout.getActiveSectionIndex();
                activeData.activeItemRank = flowLayout.getActiveItemRank();
            }
            //当前选中的flowLayout加入拖放 删除 剪切操作句柄
            this._selectFlowLayoutIco.css('top',0).css('left',0);
            flowLayout.getDomInstance().append(this._selectFlowLayoutIco);
            this._deleteFlowLayoutIco.css('top',0).css('left',this._selectFlowLayoutIco.width()+2);
            flowLayout.getDomInstance().append(this._deleteFlowLayoutIco);
            this._cutFlowLayoutIco.css('top',0).css('left',this._deleteFlowLayoutIco.width()*2+4);
            flowLayout.getDomInstance().append(this._cutFlowLayoutIco);
        }
        this.setActiveData(activeData);
        this.sendMessage('wof.bizWidget.spanner.FlowLayoutSpanner_render');
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

    }

};