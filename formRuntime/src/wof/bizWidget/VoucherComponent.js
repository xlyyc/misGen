/**
 * @bizWidgetClass VoucherComponent class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherComponent = function () {
    this._version = '1.0';

    this._voucherItemGroups = [];

    //初始化监听消息
    this.setOnReceiveMessage([
        {id: 'wof.bizWidget.DataObject_query', priority: 50, method: 'this._onQueryDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_add', proprity: 50, method: 'this._onAddDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_update', proprity: 50, method: 'this._onUpdateDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_delete', proprity: 50, method: 'this._onDeleteDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_undelete', proprity: 50, method: 'this._onUndeleteDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_save', proprity: 50, method: 'this._onSaveDataCompleted(message);'}
    ]);

};
wof.bizWidget.VoucherComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _initFlag:null,

    _callStr: null,    //调用字符串，格式为 构件类型唯一识别串:构件版本，例如【VoucherComponent:1.0.0】

    _initActionName: null,

    _state: null,  //状态

    _caption: null,

    _bindEntityID: null,    //实体ID,Grid部件中可用到此实体及与该实体存在参照及对等关系的实体中的属性

    _index: null, //渲染位置

    _viewType: null, //展现方式  GROUP  分组展示  垂直展示，支持收缩 TAB  完全tab展示 HEAD_TAB 不完全tab 支持一个head单独展示，其他在一个tab组中展示

    _itemHeight: null,         //voucherItem高度

    _activeVoucherItemGroupIndex: null,   //聚焦VoucherItemGroup序号(从1开始)

    _activeVoucherItemRank: null,     //聚焦voucherItem行、列号

    _tab: null,

    _voucherItemGroups: null,

    _paramMaps:null,

    _componentId:null,

    _dataObject:null,

    _queryFlag: null, //是否需要发起查询标识 true需要 false不需要  搜索条件发生变化或者数据发生变化的情况下会修改此标识状态

    /**
     * get/set 属性方法定义
     */

    setDataObject: function(dataObject){
        this._dataObject = dataObject;
    },

    getComponentId: function(){
        if(this._componentId==null){
            this._componentId=this.getId();
        }
        return this._componentId;
    },

    setComponentId: function(componentId){
        this._componentId = componentId;
    },

    getParamMaps: function(){
        if(this._paramMaps==null){
            this._paramMaps = {};
        }
        return this._paramMaps;
    },

    setParamMaps: function(paramMaps){
        this._paramMaps = paramMaps;
    },
    getCallStr: function(){
        if(this._callStr==null){
            this._callStr = 'voucherComponent:0_0_1';
        }
        return this._callStr;
    },

    getInitActionName: function(){
        return this._initActionName;
    },

    setInitActionName: function(initActionName){
        this._initActionName = initActionName;
    },

    getState: function(){
        return this._state;
    },

    setState: function(state){
        this._state = state;
    },

    getCaption: function(){
        if(this._caption==null){
            this._caption = '未命名表头';
        }
        return this._caption;
    },

    setCaption: function(caption){
        this._caption = caption;
    },

    getBindEntityID: function(){
        if(this._bindEntityID==null){
            this._bindEntityID = '';
        }
        return this._bindEntityID;
    },

    setBindEntityID: function(bindEntityID){
        this._bindEntityID = bindEntityID;
    },

    getViewType: function(){
        if(this._viewType==null){
            this._viewType = 'tab';
        }
        return this._viewType;
    },

    setViewType: function(viewType){
        this._viewType = viewType;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },

    getItemHeight: function(){
        if(this._itemHeight==null){
            this._itemHeight = 70;
        }
        return this._itemHeight;
    },

    setItemHeight: function(itemHeight){
        this._itemHeight = itemHeight;
    },

    //获得当前激活的VoucherItemGroup index
    getActiveVoucherItemGroupIndex: function(){
        return this._activeVoucherItemGroupIndex;
    },

    //设置当前激活的VoucherItemGroupIndex
    setActiveVoucherItemGroupIndex: function(activeVoucherItemGroupIndex){
        this._activeVoucherItemGroupIndex = activeVoucherItemGroupIndex;
    },

    //获得当前激活的voucherItem行列号
    getActiveVoucherItemRank: function(){
        return this._activeVoucherItemRank;
    },

    //设置当前激活的voucherItem行列号
    setActiveVoucherItemRank: function(activeVoucherItemRank){
        this._activeVoucherItemRank = activeVoucherItemRank;
    },

    _init: function(data){

    },

    _onQueryDataCompleted: function(message){
        if(this._isDataChange(message)){
            var data = this._dataObject.getLocalData(this.getBindEntityID());
            //todo 处理数据变化

        }
    },

    _isDataChange: function(message) {
        var flag = false;
        for(var i=0; i<message.data.length; i++){
            if(this.getBindEntityID() == message.data[i]){
                flag = true;
                break;
            }
        }
        return flag;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag==null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.VoucherComponent_mousedown');
                    _this.sendMessage('wof.bizWidget.VoucherComponent_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.bizWidget.VoucherComponent_dblclick');
                _this.sendMessage('wof.bizWidget.VoucherComponent_active');
            });

            this._initTab();
            this._initVoucherItemGroups();

            this._initFlag = true;
        }

        for(var i=0;i<this._voucherItemGroups.length;i++){
            var group = this._voucherItemGroups[i];
            group.remove();
            group.appendTo(this);
        }
        //删除tab下所有的item
        this._tab.deleteItem();
    },

    //----------必须实现----------
    render: function () {
        //如果缓存数据为空 则执行查询
        if(this._queryFlag==true){
            //todo 查询条件需要实现
            this._dataObject.queryData('main',null,null,0,1);
            this._queryFlag = false;
        }

    },

    //选择实现
    afterRender: function () {
        this._layout();
        this.sendMessage('wof.bizWidget.VoucherComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            componentId: this.getComponentId(),
            paramMaps: this.getParamMaps(),
            callStr:this.getCallStr(),
            initActionName:this.getInitActionName(),
            state:this.getState(),
            caption:this.getCaption(),
            bindEntityID:this.getBindEntityID(),
            index:this.getIndex(),
            viewType:this.getViewType(),

            itemHeight: this.getItemHeight(),
            activeVoucherItemGroupIndex: this.getActiveVoucherItemGroupIndex(),
            activeVoucherItemRank: this.getActiveVoucherItemRank()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setComponentId(data.componentId);
        this.setParamMaps(data.paramMaps);
        this.setInitActionName(data.initActionName);
        this.setState(data.state);
        this.setCaption(data.caption);
        this.setBindEntityID(data.bindEntityID);
        this.setIndex(data.index);
        this.setViewType(data.viewType);

        this.setItemHeight(data.itemHeight);
        this.setActiveVoucherItemGroupIndex(data.activeVoucherItemGroupIndex);
        this.setActiveVoucherItemRank(data.activeVoucherItemRank);

        this._initTab();
        this._initVoucherItemGroups();
    },

    _insideOnReceiveMessage:{
        'wof.bizWidget.VoucherItemGroup_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            var voucherItemGroup = wof.util.ObjectManager.get(message.sender.id);
            var voucherItemGroupIndex = voucherItemGroup.getIndex();
            this.setActiveVoucherItemGroupIndex(voucherItemGroupIndex);
            this.setActiveVoucherItemRank(null);
            this.render();
            this.sendMessage('wof.bizWidget.VoucherComponent_active');
            return false;
        },
        'wof.bizWidget.VoucherItemGroup_dblclick':function(message){
            console.log(message.id+'   '+this.getClassName());
            var voucherItemGroup = wof.util.ObjectManager.get(message.sender.id);
            var voucherItemGroupIndex = voucherItemGroup.getIndex();
            this.setActiveVoucherItemGroupIndex(voucherItemGroupIndex);
            this.setActiveVoucherItemRank(null);
            this.render();

            this.sendMessage('wof_object_resize');
            this.sendMessage('wof.bizWidget.VoucherComponent_active');
            return false;
        },
        'wof.bizWidget.VoucherItem_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            var voucherItem = wof.util.ObjectManager.get(message.sender.id);
            var voucherItemGroupIndex = voucherItem.parentNode().getIndex();
            this.setActiveVoucherItemGroupIndex(voucherItemGroupIndex);
            this.setActiveVoucherItemRank({rowNum:voucherItem.getRowNum(),colNum:voucherItem.getColNum()});
            this.render();
            this.sendMessage('wof.bizWidget.VoucherComponent_active');
            return false;
        },
        'wof.bizWidget.VoucherItem_dblclick':function(message){
            console.log(message.id+'   '+this.getClassName());
            var voucherItem = wof.util.ObjectManager.get(message.sender.id);
            var voucherItemGroupIndex = voucherItem.parentNode().getIndex();
            this.setActiveVoucherItemGroupIndex(voucherItemGroupIndex);
            this.setActiveVoucherItemRank({rowNum:voucherItem.getRowNum(),colNum:voucherItem.getColNum()});
            this.render();

            this.sendMessage('wof.bizWidget.VoucherComponent_active');
            return false;
        },
        'wof.bizWidget.VoucherItemGroup_drop':function(message){
            console.log(message.id+'   '+this.getClassName());
            var insertVoucherItemGroup = wof.util.ObjectManager.get(message.data.voucherItemGroupId);
            var voucherItemGroup = wof.util.ObjectManager.get(message.sender.id);
            insertVoucherItemGroup.remove();
            insertVoucherItemGroup.beforeTo(voucherItemGroup);
            var insertVoucherItemGroupIndex = voucherItemGroup.getIndex();
            this.setActiveVoucherItemGroupIndex(insertVoucherItemGroupIndex);
            this.setActiveVoucherItemRank(null);

            this._voucherItemGroups.splice(insertVoucherItemGroup.getIndex()-1,1);
            this._voucherItemGroups.splice(insertVoucherItemGroupIndex-1,0,insertVoucherItemGroup);
            //重设index
            for(var i=0;i<this._voucherItemGroups.length;i++){
                var group = this._voucherItemGroups[i];
                group.setIndex(i+1);
            }

            this.render();

            this.sendMessage('wof.bizWidget.VoucherComponent_active');
            return false;
        }

    },

    //_tab初始化
    _initTab: function(){
        if(this._tab==null){
            var tab = this._findTab();
            if(tab!=null){
                this._tab = tab;
            }else{
                this._tab = new wof.widget.Tab();
                this._tab.setIsInside(true);
                this._tab.setLeft(0);
                this._tab.appendTo(this);
            }
        }
    },

    //_voucherItemGroups初始化
    _initVoucherItemGroups: function(){
        if(this._voucherItemGroups.length==0){
            if(this.getViewType()=='tab'){
                var ic = this._tab.getItemsCount();
                for(var i=0;i<ic;i++){
                    var tempGroups = this._tab.getNodesByItemIndex(i+1);
                    if(tempGroups.length>0){
                        this._voucherItemGroups.push(tempGroups[0]);
                    }
                }
                var groups = this._findGroups();
                for(var i=groups.length-1;i>=0;i--){
                    var headGroup = groups[i];
                    this._voucherItemGroups.push(headGroup);
                }
                this._voucherItemGroups.sort(function(a, b) {
                    return a.getIndex() - b.getIndex();
                });
            }else{
                var groups  = this._findGroups();
                for(var i=0;i<groups.length;i++){
                    this._voucherItemGroups.push(groups[i]);
                }
            }
        }
    },

    //查找到group
    _findGroups: function(){
        var groups = [];
        for(var i=0;i<this.childNodes().length;i++){
            var node = this.childNodes()[i];
            if(node.getClassName()=='wof.bizWidget.VoucherItemGroup'){
                groups.push(node);
            }
        }
        return groups;
    },

    //查找到tab
    _findTab: function(){
        var tab = null;
        for(var i=0;i<this.childNodes().length;i++){
            var node = this.childNodes()[i];
            if(node.getClassName()=='wof.widget.Tab'){
                tab = node;
                break;
            }
        }
        return tab;
    },

    /**
     * 插入新的VoucherItemGroup
     * voucherItemGroupData VoucherItemGroup数据
     * voucherItemGroupIndex 在指定VoucherItemGroup序号前插入(序号从1开始)
     * 如果voucherItemGroupIndex为null 缺省在开头插入
     */
    insertVoucherItemGroup: function(voucherItemGroupData, voucherItemGroupIndex){
        if(voucherItemGroupIndex==null){
            voucherItemGroupIndex = 1;
        }
        var width = voucherItemGroupData.width!=null?voucherItemGroupData.width:this.getWidth();
        var titleHeight = voucherItemGroupData.titleHeight!=null?voucherItemGroupData.titleHeight:null;
        var colsNum = voucherItemGroupData.colsNum!=null?voucherItemGroupData.colsNum:null;
        var itemHeight = voucherItemGroupData.itemHeight!=null?voucherItemGroupData.itemHeight:this.getItemHeight();

        var newVoucherItemGroup = new wof.bizWidget.VoucherItemGroup();
        newVoucherItemGroup.setWidth(width);
        newVoucherItemGroup.setTitleHeight(titleHeight);
        newVoucherItemGroup.setGroupCaption(voucherItemGroupData.groupCaption);
        newVoucherItemGroup.setColsNum(colsNum);
        newVoucherItemGroup.setItemHeight(itemHeight);

        if(voucherItemGroupIndex==this.getActiveVoucherItemGroupIndex()){
            this.setActiveVoucherItemRank(null);
        }
        //重设index并且依次插入当前表头
        this._voucherItemGroups.splice(voucherItemGroupIndex-1,0,newVoucherItemGroup);
        for(var i=0;i<this._voucherItemGroups.length;i++){
            var group = this._voucherItemGroups[i];
            group.setIndex(i+1);
            group.remove();
            group.appendTo(this);
        }
    },

    /**
     * 获得VoucherItemGroup的个数
     */
    getVoucherItemGroups:function(){
        return this._voucherItemGroups.length;
    },

    /**
     * 获得指定voucherItemGroupIndex的VoucherItemGroup包含有voucherItem的个数
     */
    getVoucherItems:function(voucherItemGroupIndex){
        var len = 0;
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            len = voucherItemGroup.findVoucherItems().length;
        }
        return len;
    },

    /**
     * 上移指定序号的VoucherItemGroup
     * voucherItemGroupIndex 指定的VoucherItemGroup序号(序号从1开始)
     */
    upVoucherItemGroup: function(voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        var prevVoucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex-1);
        if(voucherItemGroup!=null&&prevVoucherItemGroup!=null){
            voucherItemGroup.remove();
            voucherItemGroup.beforeTo(prevVoucherItemGroup);
            if(voucherItemGroupIndex==this.getActiveVoucherItemGroupIndex()){
                this.setActiveVoucherItemGroupIndex(voucherItemGroupIndex-1);
                this.setActiveVoucherItemRank(null);
            }

            this._voucherItemGroups.splice(voucherItemGroupIndex-1,1);
            this._voucherItemGroups.splice(voucherItemGroupIndex-2,0,voucherItemGroup);
            //重设index
            for(var i=0;i<this._voucherItemGroups.length;i++){
                var group = this._voucherItemGroups[i];
                group.setIndex(i+1);
            }
        }
    },

    /**
     * 下移指定序号的VoucherItemGroup
     * voucherItemGroupIndex 指定的voucherItemGroup序号(序号从1开始)
     */
    downVoucherItemGroup: function(voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        var nextVoucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex+1);
        if(voucherItemGroup!=null&&nextVoucherItemGroup!=null){
            voucherItemGroup.remove();
            voucherItemGroup.afterTo(nextVoucherItemGroup);
            if(voucherItemGroupIndex==this.getActiveVoucherItemGroupIndex()){
                this.setActiveVoucherItemGroupIndex(voucherItemGroupIndex+1);
                this.setActiveVoucherItemRank(null);
            }

            this._voucherItemGroups.splice(voucherItemGroupIndex-1,1);
            this._voucherItemGroups.splice(voucherItemGroupIndex,0,voucherItemGroup);
            //重设index
            for(var i=0;i<this._voucherItemGroups.length;i++){
                var group = this._voucherItemGroups[i];
                group.setIndex(i+1);
            }
        }
    },

    /**
     * 删除指定序号的VoucherItemGroup
     * voucherItemGroupIndex 指定的VoucherItemGroup序号(序号从1开始)
     */
    deleteVoucherItemGroup: function(voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            voucherItemGroup.removeChildren(true);
            voucherItemGroup.remove(true);
            this.setActiveVoucherItemGroupIndex(null);
            this.setActiveVoucherItemRank(null);

            this._voucherItemGroups.splice(voucherItemGroupIndex-1,1);
            //重设index
            for(var i=0;i<this._voucherItemGroups.length;i++){
                var group = this._voucherItemGroups[i];
                group.setIndex(i+1);
            }
        }
    },

    /**
     * 修改voucherComponent
     * voucherComponentData voucherComponent数据
     */
    updateVoucherComponent: function(voucherComponentData){
        if(!jQuery.isEmptyObject(voucherComponentData)){
            if(voucherComponentData.itemHeight!=null){
                this.setItemHeight(Number(voucherComponentData.itemHeight));
            }
            if(voucherComponentData.width!=null){
                this.setWidth(Number(voucherComponentData.width));
            }
            if(voucherComponentData.height!=null){
                this.setHeight(Number(voucherComponentData.height));
            }
            if(voucherComponentData.left!=null){
                this.setLeft(Number(voucherComponentData.left));
            }
            if(voucherComponentData.top!=null){
                this.setTop(Number(voucherComponentData.top));
            }
            if(voucherComponentData.zIndex!=null){
                this.setZIndex(voucherComponentData.zIndex);
            }
            if(voucherComponentData.hiden!=null){
                this.setHiden((voucherComponentData.hiden=='true'||voucherComponentData.hiden==true)?true:false);
            }
            if(voucherComponentData.position!=null){
                this.setPosition(voucherComponentData.position);
            }
            if(voucherComponentData.scale!=null){
                this.setScale(Number(voucherComponentData.scale));
            }
            if(voucherComponentData.onSendMessage!=null){
                this.setOnSendMessage(voucherComponentData.onSendMessage);
            }
            if(voucherComponentData.onReceiveMessage!=null){
                this.setOnReceiveMessage(voucherComponentData.onReceiveMessage);
            }
            if(voucherComponentData.bindEntityID!=null){
                this.setBindEntityID(voucherComponentData.bindEntityID);
            }
            if(voucherComponentData.viewType!=null){
                this.setViewType(voucherComponentData.viewType);
            }
            if(voucherComponentData.caption!=null){
                this.setCaption(voucherComponentData.caption);
            }
            if(voucherComponentData.paramMaps!=null){
                this.setParamMaps(voucherComponentData.paramMaps);
            }
        }
    },

    /**
     * 修改指定序号的VoucherItemGroup
     * voucherItemGroupData VoucherItemGroup数据
     */
    updateVoucherItemGroup: function(voucherItemGroupData){
        if(!jQuery.isEmptyObject(voucherItemGroupData)){
            var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupData.index);
            if(voucherItemGroup!=null){
                if(voucherItemGroupData.groupCaption!=null){
                    voucherItemGroup.setGroupCaption(voucherItemGroupData.groupCaption);
                }
                if(voucherItemGroupData.colsNum!=null){
                    var voucherItems = voucherItemGroup.findVoucherItems();
                    var maxColspan = 1;
                    for(var i=0;i<voucherItems.length;i++){
                        if(maxColspan<voucherItems[i].getColspan()){
                            maxColspan = voucherItems[i].getColspan();
                        }
                    }
                    if(Number(voucherItemGroupData.colsNum)>=maxColspan){
                        voucherItemGroup.setColsNum(Number(voucherItemGroupData.colsNum));
                    }else{
                        console.log('设置colsNum值错误:小于该分组最大colspan值');
                    }
                }
                if(voucherItemGroupData.width!=null){
                    voucherItemGroup.setWidth(Number(voucherItemGroupData.width));
                }
                if(voucherItemGroupData.titleHeight!=null){
                    voucherItemGroup.setTitleHeight(Number(voucherItemGroupData.titleHeight));
                }
                if(voucherItemGroupData.itemHeight!=null){
                    voucherItemGroup.setItemHeight(Number(voucherItemGroupData.itemHeight));
                }
                if(voucherItemGroupData.isExpand!=null){
                    voucherItemGroup.setIsExpand((voucherItemGroupData.isExpand=='true'||voucherItemGroupData.isExpand==true)?true:false);
                }
                if(voucherItemGroupData.mustInOrder!=null){
                    voucherItemGroup.setMustInOrder((voucherItemGroupData.mustInOrder=='true'||voucherItemGroupData.mustInOrder==true)?true:false);
                }
                if(voucherItemGroupData.isHead!=null){
                    voucherItemGroup.setIsHead((voucherItemGroupData.isHead=='true'||voucherItemGroupData.isHead==true)?true:false);
                }
            }
        }
    },

    /**
     * 修改指定的voucherItem
     * voucherItemData voucherItem数据
     * voucherItemGroupIndex 指定的voucherItemGroup序号(序号从1开始)
     */
    updateVoucherItem: function(voucherItemData, voucherItemGroupIndex){
        if(!jQuery.isEmptyObject(voucherItemData)){
            var voucherItemGroup = this.findVoucherItemGroupByIndex(Number(voucherItemGroupIndex));
            if(voucherItemGroup!=null){
                var voucherItem = voucherItemGroup.findVoucherItemByRank({rowNum:Number(voucherItemData.rowNum),colNum:Number(voucherItemData.colNum)});
                if(voucherItem!=null){
                    if(voucherItemData.colspan!=null){
                        if(voucherItemGroup.getColsNum()>=Number(voucherItemData.colspan)){
                            voucherItem.setColspan(Number(voucherItemData.colspan));
                        }else{
                            console.log('设置colspan值错误:大于该分组colsNum值');
                        }
                    }
                    if(voucherItemData.isFixItem!=null){
                        voucherItem.setIsFixItem((voucherItemData.isFixItem=='true'||voucherItemData.isFixItem==true)?true:false);
                    }
                    if(voucherItemData.rowspan!=null){
                        voucherItem.setRowspan(Number(voucherItemData.rowspan));
                    }
                    if(voucherItemData.itemName!=null){
                        voucherItem.setItemName(voucherItemData.itemName);
                    }
                    if(voucherItemData.visiable!=null){
                        voucherItem.setVisiable((voucherItemData.visiable=='true'||voucherItemData.visiable==true)?true:false);
                    }
                    if(voucherItemData.itemLabel!=null){
                        voucherItem.setItemLabel(voucherItemData.itemLabel);
                    }
                    if(voucherItemData.dataField!=null){
                        voucherItem.setDataField(voucherItemData.dataField);
                    }
                    if(voucherItemData.dateTimeBoxFormat!=null){
                        voucherItem.setDateTimeBoxFormat(voucherItemData.dateTimeBoxFormat);
                    }
                    if(voucherItemData.readOnly!=null){
                        voucherItem.setReadOnly((voucherItemData.readOnly=='true'||voucherItemData.readOnly==true)?true:false);
                    }
                    if(voucherItemData.required!=null){
                        voucherItem.setRequired((voucherItemData.required=='true'||voucherItemData.required==true)?true:false);
                    }
                    if(voucherItemData.length!=null){
                        voucherItem.setLength(voucherItemData.length==''?'':Number(voucherItemData.length));
                    }
                    if(voucherItemData.min!=null){
                        voucherItem.setMin(voucherItemData.min==''?'':Number(voucherItemData.min));
                    }
                    if(voucherItemData.max!=null){
                        voucherItem.setMax(voucherItemData.max==''?'':Number(voucherItemData.max));
                    }
                    if(voucherItemData.regExp!=null){
                        voucherItem.setRegExp(voucherItemData.regExp);
                    }
                    if(voucherItemData.checkErrorInfo!=null){
                        voucherItem.setCheckErrorInfo(voucherItemData.checkErrorInfo);
                    }
                    if(voucherItemData.selectPattern!=null){
                        voucherItem.setSelectPattern(voucherItemData.selectPattern);
                    }
                    if(voucherItemData.useMultiSelect!=null){
                        voucherItem.setUseMultiSelect((voucherItemData.useMultiSelect=='true'||voucherItemData.useMultiSelect==true)?true:false);
                    }
                    if(voucherItemData.visbleType!=null){
                        voucherItem.setVisbleType(voucherItemData.visbleType);
                    }
                    if(voucherItemData.labelWidth!=null){
                        voucherItem.setLabelWidth(voucherItemData.labelWidth==''?'':Number(voucherItemData.labelWidth));
                    }
                    if(voucherItemData.inputWidth!=null){
                        voucherItem.setInputWidth(voucherItemData.inputWidth==''?'':Number(voucherItemData.inputWidth));
                    }
                    if(voucherItemData.inputHeight!=null){
                        voucherItem.setInputHeight(voucherItemData.inputHeight==''?'':Number(voucherItemData.inputHeight));
                    }
                    if(voucherItemData.linkageItem!=null){
                        voucherItem.setLinkageItem(voucherItemData.linkageItem);
                    }
                    if(voucherItemData.tipValue!=null){
                        voucherItem.setTipValue(voucherItemData.tipValue);
                    }
                }
            }
        }
    },

    /**
     * 在指定的分组下插入新的voucherItem
     * voucherItemData voucherItem数据
     * voucherItemGroupIndex 指定的voucherItemGroup序号(序号从1开始)
     */
    insertVoucherItem: function(voucherItemData, voucherItemGroupIndex){
        if(!jQuery.isEmptyObject(voucherItemData)){
            var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
            if(voucherItemGroup!=null){
                var newVoucherItem = new wof.bizWidget.VoucherItem();
                //newVoucherItem.setWidth(voucherItemWidth);
                newVoucherItem.setHeight(voucherItemGroup.getItemHeight());
                //newVoucherItem.setTop(top);
                //newVoucherItem.setLeft(left);
                newVoucherItem.setScale(voucherItemGroup.getScale());
                if(voucherItemData.colspan!=null){
                    if(voucherItemGroup.getColsNum()>=Number(voucherItemData.colspan)){
                        newVoucherItem.setColspan(Number(voucherItemData.colspan));
                    }else{
                        console.log('设置colspan值错误:大于该分组colsNum值');
                    }
                }
                if(voucherItemData.isFixItem!=null){
                    newVoucherItem.setIsFixItem((voucherItemData.isFixItem=='true'||voucherItemData.isFixItem==true)?true:false);
                }
                if(voucherItemData.rowspan!=null){
                    newVoucherItem.setRowspan(Number(voucherItemData.rowspan));
                }
                if(voucherItemData.itemName!=null){
                    newVoucherItem.setItemName(voucherItemData.itemName);
                }
                if(voucherItemData.visiable!=null){
                    newVoucherItem.setVisiable((voucherItemData.visiable=='true'||voucherItemData.visiable==true)?true:false);
                }
                if(voucherItemData.itemLabel!=null){
                    newVoucherItem.setItemLabel(voucherItemData.itemLabel);
                }
                if(voucherItemData.dataField!=null){
                    newVoucherItem.setDataField(voucherItemData.dataField);
                }
                if(voucherItemData.dateTimeBoxFormat!=null){
                    newVoucherItem.setDateTimeBoxFormat(voucherItemData.dateTimeBoxFormat);
                }
                if(voucherItemData.readOnly!=null){
                    newVoucherItem.setReadOnly((voucherItemData.readOnly=='true'||voucherItemData.readOnly==true)?true:false);
                }
                if(voucherItemData.required!=null){
                    newVoucherItem.setRequired((voucherItemData.required=='true'||voucherItemData.required==true)?true:false);
                }
                if(voucherItemData.length!=null){
                    newVoucherItem.setLength(voucherItemData.length==''?'':Number(voucherItemData.length));
                }
                if(voucherItemData.min!=null){
                    newVoucherItem.setMin(voucherItemData.min==''?'':Number(voucherItemData.min));
                }
                if(voucherItemData.max!=null){
                    newVoucherItem.setMax(voucherItemData.max==''?'':Number(voucherItemData.max));
                }
                if(voucherItemData.regExp!=null){
                    newVoucherItem.setRegExp(voucherItemData.regExp);
                }
                if(voucherItemData.checkErrorInfo!=null){
                    newVoucherItem.setCheckErrorInfo(voucherItemData.checkErrorInfo);
                }
                if(voucherItemData.selectPattern!=null){
                    newVoucherItem.setSelectPattern(voucherItemData.selectPattern);
                }
                if(voucherItemData.useMultiSelect!=null){
                    newVoucherItem.setUseMultiSelect((voucherItemData.useMultiSelect=='true'||voucherItemData.useMultiSelect==true)?true:false);
                }
                if(voucherItemData.visbleType!=null){
                    newVoucherItem.setVisbleType(voucherItemData.visbleType);
                }
                if(voucherItemData.labelWidth!=null){
                    newVoucherItem.setLabelWidth(voucherItemData.labelWidth==''?'':Number(voucherItemData.labelWidth));
                }
                if(voucherItemData.inputWidth!=null){
                    newVoucherItem.setInputWidth(voucherItemData.inputWidth==''?'':Number(voucherItemData.inputWidth));
                }
                if(voucherItemData.inputHeight!=null){
                    newVoucherItem.setInputHeight(voucherItemData.inputHeight==''?'':Number(voucherItemData.inputHeight));
                }
                if(voucherItemData.linkageItem!=null){
                    newVoucherItem.setLinkageItem(voucherItemData.linkageItem);
                }
                if(voucherItemData.tipValue!=null){
                    newVoucherItem.setTipValue(voucherItemData.tipValue);
                }
                newVoucherItem.appendTo(voucherItemGroup);
            }
        }
    },

    /**
     * 删除指定序号的voucherItem
     * voucherItemRank 指定的voucherItem行列号
     * voucherItemGroupIndex 指定的VoucherItemGroup序号(序号从1开始)
     */
    deleteVoucherItem: function(voucherItemRank, voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
            if(voucherItem!=null){
                voucherItemGroup.deleteVoucherItem(voucherItem);
            }
        }
    },

    //找到第一个VoucherItemGroup
    _findFirstVoucherItemGroup: function(){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(0);
        return voucherItemGroup;
    },

    //找到最后一个VoucherItemGroup
    _findLastVoucherItemGroup: function(){
        var voucherItemGroup = null;
        var childNodes = this.childNodes();
        for(var i=childNodes.length-1;i>=0;i--){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.VoucherItemGroup'){
                voucherItemGroup = node;
                break;
            }
        }
        return voucherItemGroup;
    },

    //找到指定序号的Group
    findVoucherItemGroupByIndex: function(voucherItemGroupIndex){
        var voucherItemGroup = null;
        var voucherItemGroups = this._voucherItemGroups;
        for(var i=0;i<voucherItemGroups.length;i++){
            if(voucherItemGroups[i].getIndex()==Number(voucherItemGroupIndex)){
                voucherItemGroup = voucherItemGroups[i];
                break;
            }
        }
        return voucherItemGroup;
    },

    //找到所有VoucherItemGroup
    _findVoucherItemGroups: function(){
        return this._voucherItemGroups;
    },

    //根据voucherItemRank和voucherItemGroupIndex定位到voucherItem并减少列数
    reduceVoucherItemColspan:function(voucherItemRank, voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
            if(voucherItem!=null){
                voucherItemGroup.reduceVoucherItemColspan(voucherItem);
            }
        }
    },

    //根据voucherItemRank和voucherItemGroupIndex定位到voucherItem并解锁
    unfixVoucherItem:function(voucherItemRank, voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
            if(voucherItem!=null){
                voucherItemGroup.unfixVoucherItem(voucherItem);
            }
        }
    },

    //根据voucherItemRank和voucherItemGroupIndex定位到voucherItem并锁定
    fixVoucherItem:function(voucherItemRank, voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
            if(voucherItem!=null){
                voucherItemGroup.fixVoucherItem(voucherItem);
            }
        }
    },

    //根据voucherItemRank和voucherItemGroupIndex定位到voucherItem并增加列数
    addVoucherItemColspan:function(voucherItemRank, voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
            if(voucherItem!=null){
                voucherItemGroup.addVoucherItemColspan(voucherItem);
            }
        }
    },

    //根据voucherItemRank和voucherItemGroupIndex定位到voucherItem并减少行数
    reduceVoucherItemRowspan:function(voucherItemRank, voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
            if(voucherItem!=null){
                voucherItemGroup.reduceVoucherItemRowspan(voucherItem);
            }
        }
    },

    //根据voucherItemRank和voucherItemGroupIndex定位到voucherItem并增加行数
    addVoucherItemRowspan:function(voucherItemRank, voucherItemGroupIndex){
        var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
        if(voucherItemGroup!=null){
            var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
            if(voucherItem!=null){
                voucherItemGroup.addVoucherItemRowspan(voucherItem);
            }
        }
    },

    //进行布局
    _layout: function(){
        var height = 0;
        var voucherItemGroups = this._voucherItemGroups;
        if(this.getViewType()=='tab'){
            var headerGroups = [];
            var tabGroups = [];
            for(var i=0;i<voucherItemGroups.length;i++){
                var voucherItemGroup = voucherItemGroups[i];
                if(voucherItemGroup.getIsHead()==true){
                    headerGroups.push(voucherItemGroup);
                }else{
                    tabGroups.push(voucherItemGroup);
                }
            }

            for(var i=0;i<headerGroups.length;i++){
                var headerGroup = headerGroups[i];
                if(i==0){
                    headerGroup.setTop(0);
                    headerGroup.setLeft(0);
                    height += headerGroup.getHeight();
                }else{
                    var prevHeaderGroup = headerGroups[i-1];
                    headerGroup.setTop(prevHeaderGroup.getTop()+prevHeaderGroup.getHeight());
                    headerGroup.setLeft(0);
                    height += headerGroup.getHeight();
                }
                headerGroup.getDomInstance().css('top', headerGroup.getTop()*this.getScale()+'px');
                headerGroup.getDomInstance().css('left','0px');
            }

            if(tabGroups.length>0){
                //获得最大分组高度
                var maxGroupHeight = 200;
                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    if(maxGroupHeight < voucherItemGroup.getHeight()){
                        maxGroupHeight = voucherItemGroup.getHeight();
                    }
                }
                this._tab.setHiden(false);
                this._tab.setTop(height);
                this._tab.setWidth(this.getWidth()-12);
                this._tab.setHeight(maxGroupHeight);

                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    this._tab.insertItem({title:voucherItemGroup.getGroupCaption()});
                }
                this._tab.render();

                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    voucherItemGroup.setTop(0);
                    voucherItemGroup.getDomInstance().css('top','0px');
                    voucherItemGroup.setLeft(0);
                    voucherItemGroup.getDomInstance().css('left','0px');
                    voucherItemGroup.remove();
                    this._tab.insertNode(voucherItemGroup,(i+1));
                }

                //计算激活的tab item
                var tabItemIndex = 1;
                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    if(voucherItemGroup.getIndex()==this.getActiveVoucherItemGroupIndex()){
                        tabItemIndex = i+1;
                        break;
                    }
                }
                this._tab.setActiveIndex(tabItemIndex);
            }else{
                this._tab.setHiden(true);
            }

            height += maxGroupHeight;
        }else{
            this._tab.setHiden(true);
            for(var i=0;i<voucherItemGroups.length;i++){
                var voucherItemGroup = voucherItemGroups[i];
                if(i==0){
                    voucherItemGroup.setTop(0);
                    voucherItemGroup.setLeft(0);
                    height += voucherItemGroup.getHeight();
                }else{
                    var prevVoucherItemGroup = voucherItemGroups[i-1];
                    voucherItemGroup.setTop(prevVoucherItemGroup.getTop()+prevVoucherItemGroup.getHeight());
                    voucherItemGroup.setLeft(0);
                    height += voucherItemGroup.getHeight();
                }
                voucherItemGroup.getDomInstance().css('top', voucherItemGroup.getTop()*this.getScale()+'px');
                voucherItemGroup.getDomInstance().css('left','0px');
            }
        }

        this.setHeight(height);
        this.getDomInstance().css('height',(this.getHeight()*this.getScale())+'px');
        this.getDomInstance().css('width', (this.getWidth()*this.getScale())+'px');

        //根据activeVoucherItemGroupIndex设置当前激活的VoucherItemGroup
        var activeVoucherItemGroup = this.findVoucherItemGroupByIndex(this.getActiveVoucherItemGroupIndex());
        if(activeVoucherItemGroup!=null){
            var activeVoucherItem = activeVoucherItemGroup.findVoucherItemByRank(this.getActiveVoucherItemRank());
            if(activeVoucherItem!=null){
                activeVoucherItemGroup.activeVoucherItemStyle(activeVoucherItem);
            }else{
                activeVoucherItemGroup.activeVoucherItemGroupStyle();
            }
        }
    }

};