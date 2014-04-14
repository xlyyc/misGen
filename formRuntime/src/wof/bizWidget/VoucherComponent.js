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


    _callStr: null,    //调用字符串，格式为 构件类型唯一识别串:构件版本，例如【VoucherComponent:1.0.0】

    _initActionName: null,

    _state: null,  //状态  View Edit Add

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

    _dataSource: null,

    _pageId:null,

    _refData:null,  //参照数据

    _rowData:null, //主记录数据

    _currentRowId: null,


    _fkField: null, //外键对应字段

    _fkFieldValue: null, //外键值

    _queryFlag: null, //是否需要发起查询标识 true需要 false不需要  搜索条件发生变化或者数据发生变化的情况下会修改此标识状态


    /**
     * get/set 属性方法定义
     */

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
    getDataSource: function () {
        return this._dataSource;
    },
    setDataSource: function (dataSource) {
        this._dataSource = dataSource;
    },
    getPageId: function () {
        return this._pageId;
    },
    setPageId: function (pageId) {
        this._pageId = pageId;
    },
    setRefData: function (refData) {
        this._refData = refData;
    },
    getRefData: function () {
        return this._refData;
    },
    setRowData: function (rowData) {
        this._rowData = rowData;
    },
    getRowData: function () {
        return this._rowData || {};
    },

    //获得当前行号
    getCurrentRowId: function(){
        //return this.getRowData()['rowId'];
        return this._currentRowId;
    },

    setCurrentRowId: function(rowId){
        this._currentRowId = rowId;
    },

    getFkField: function(){
        return this._fkField || '';
    },

    setFkField: function(fkField){
        this._fkField = fkField;
    },

    getFkFieldValue: function(){
        return this._fkFieldValue;
    },

    setFkFieldValue: function(fkFieldValue){
        this._fkFieldValue = fkFieldValue;
    },

    _init: function(data){
        if(data.state!=null){
            this.setState(data.state);
        }
        if(data.itemHeight!=null){
            this.setItemHeight(Number(data.itemHeight));
        }
        if(data.width!=null){
            this.setWidth(Number(data.width));
        }
        if(data.height!=null){
            this.setHeight(Number(data.height));
        }
        if(data.left!=null){
            this.setLeft(Number(data.left));
        }
        if(data.top!=null){
            this.setTop(Number(data.top));
        }
        if(data.zIndex!=null){
            this.setZIndex(data.zIndex);
        }
        if(data.hiden!=null){
            this.setHiden((data.hiden=='true'||data.hiden==true)?true:false);
        }
        if(data.position!=null){
            this.setPosition(data.position);
        }
        if(data.scale!=null){
            this.setScale(Number(data.scale));
        }
        if(data.onSendMessage!=null){
            this.setOnSendMessage(data.onSendMessage);
        }
        if(data.onReceiveMessage!=null){
            this.setOnReceiveMessage(data.onReceiveMessage);
        }
        if(data.bindEntityID!=null){
            this.setBindEntityID(data.bindEntityID);
        }
        if(data.viewType!=null){
            this.setViewType(data.viewType);
        }
        if(data.caption!=null){
            this.setCaption(data.caption);
        }
        if(data.paramMaps!=null){
            this.setParamMaps(data.paramMaps);
        }
    },

    /**
     *
     * 当查询返回结果后触发
     *
     */
    _onQueryDataCompleted: function(message){
        if(this._isDataChange(message)){
            var data = this.getDataSource().getLocalData(this.getBindEntityID());
            if(data!=null&&data['rows']!=null){
                this.setRowData(data['rows'][0]);
                var voucherItemGroups = this._voucherItemGroups;
                for(var i=0;i<voucherItemGroups.length;i++){
                    var voucherItemGroup = voucherItemGroups[i];
                    var voucherItems = voucherItemGroup.findVoucherItems();
                    for(var t=0;t<voucherItems.length;t++){
                        var voucherItem = voucherItems[t];
                        var alias = voucherItem.getDataField();
                        if(alias.length>0){
                            if(this.getRowData()['data']!=null&&this.getRowData()['data'][alias]!=null){
                                var value = this.getRowData()['data'][alias]['value'];
                                voucherItem.setValue(value);
                            }else{
                                voucherItem.setValue('');
                            }
                            voucherItem.render();
                        }
                    }
                }
            }
        }
    },

    _onUpdateDataCompleted: function (message) {
        if(this._isDataChange(message)){
            var data = this.getDataSource().getLocalData(this.getBindEntityID());
            if(data!=null&&data['rows']!=null){
                this.setRowData(data['rows'][0]);
                var voucherItemGroups = this._voucherItemGroups;
                for(var i=0;i<voucherItemGroups.length;i++){
                    var voucherItemGroup = voucherItemGroups[i];
                    var voucherItems = voucherItemGroup.findVoucherItems();
                    for(var t=0;t<voucherItems.length;t++){
                        var voucherItem = voucherItems[t];
                        var alias = voucherItem.getDataField();
                        if(alias.length>0){
                            if(this.getRowData()['data']!=null&&this.getRowData()['data'][alias]!=null){
                                var value = this.getRowData()['data'][alias]['value'];
                                voucherItem.setValue(value);
                            }else{
                                voucherItem.setValue('');
                            }
                            voucherItem.render();
                        }
                    }
                }
            }
        }
    },

    _onAddDataCompleted: function(message){
        if(this._isDataChange(message)){
            var data = this.getDataSource().getLocalData(this.getBindEntityID());
            if(data!=null&&data['rows']!=null){
                this.setRowData(data['rows'][0]);
                var voucherItemGroups = this._voucherItemGroups;
                for(var i=0;i<voucherItemGroups.length;i++){
                    var voucherItemGroup = voucherItemGroups[i];
                    var voucherItems = voucherItemGroup.findVoucherItems();
                    for(var t=0;t<voucherItems.length;t++){
                        var voucherItem = voucherItems[t];
                        var alias = voucherItem.getDataField();
                        if(alias.length>0){
                            if(this.getRowData()['data']!=null&&this.getRowData()['data'][alias]!=null){
                                var value = this.getRowData()['data'][alias]['value'];
                                voucherItem.setValue(value);
                            }else{
                                voucherItem.setValue('');
                            }
                            voucherItem.render();
                        }
                    }
                }
            }
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

    initRender: function(){
        this._queryFlag = true;
    },

    //选择实现
    beforeRender: function () {
        this.setRefData(this.getDataSource().getRefData());
    },

    //----------必须实现----------
    render: function () {


    },

    //选择实现
    afterRender: function () {
        this._layout();

        //如果缓存数据为空 则执行查询
        if(this._queryFlag==true){
            this._queryFlag = false;

            if(this.getState()=='Add'){ //如果是Add状态 需要插入一条空白数据
                var data = this.getDataSource().getLocalData();
                if(data['rows'].length==0){ //如果当前do中没有缓存数据 则增加一条数据
                    var newData = {};
                    if(this.getFkField().length>0){ //如果绑定外键不为空 则增加记录时需要加入外键值
                        newData[this.getFkField()] = this.getFkFieldValue();
                        alert(JSON.stringify(newData));
                    }
                    this.getDataSource().addData([newData]);
                    var idPro = this.getDataSource().getLocalData()['idPro'];
                    this.setCurrentRowId(this.getRowData()['data'][idPro]['value']);
                }else{
                    //如果已经有了一条数据 则直接设置currentRowId 在克隆时会执行此分支
                    var localData = this.getDataSource().getLocalData();
                    var idPro = localData['idPro'];
                    this.setRowData(localData['rows'][0]);
                    this.setCurrentRowId(this.getRowData()['data'][idPro]['value']);
                }
            }else{ //如果是View\Edit 则先发起查询
                var idPro = this.getDataSource().getLocalData()['idPro'];
                var queryParam = {'type':'fieldQuery','field':idPro,'operation':'equals','value1':this.getCurrentRowId()};
                this.getDataSource().queryData('main',null,queryParam,0,1);
                this.setCurrentRowId(this.getRowData()['data'][idPro]['value']);
            }
        }

        this.sendMessage('wof.bizWidget.VoucherComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            componentName: this.getComponentName(),
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
            activeVoucherItemRank: this.getActiveVoucherItemRank(),

            fkField: this.getFkField(),
            fkFieldValue: this.getFkFieldValue()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setComponentName(data.componentName);
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

        this.setFkField(data.fkField);
        this.setFkFieldValue(data.fkFieldValue);

        this._setInternalVariables();
    },

    _insideOnReceiveMessage:{
        'wof.bizWidget.VoucherItem_change':function(message){
            console.log(message.id+'   '+this.getClassName());
            var voucherItem = wof.util.ObjectManager.get(message.sender.id);
            var row = this.getDataSource().getLocalData(this.getBindEntityID())['rows'][0]['data'];
            var rowData = {};
            for(var n in row){
                rowData[n] = row[n]['value'];
            }
            var voucherItemGroups = this._voucherItemGroups;
            for(var i=0;i<voucherItemGroups.length;i++){
                var voucherItemGroup = voucherItemGroups[i];
                var voucherItems = voucherItemGroup.findVoucherItems();
                for(var t=0;t<voucherItems.length;t++){
                    var voucherItem = voucherItems[t];
                    var alias = voucherItem.getDataField();
                    if(alias.length>0){
                        //alert(alias+' == '+voucherItem.getValue());
                        //todo  当有有多个item绑定同个字段时候    存在bug
                        rowData[alias] = voucherItem.getValue();
                    }
                }
            }
            this.getDataSource().updateData([rowData]);
            return false;
        },
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
            if(voucherItemGroup.getIsExpand()==true){
                voucherItemGroup.setIsExpand(false);
            }else{
                voucherItemGroup.setIsExpand(true);
            }
            var voucherItemGroupIndex = voucherItemGroup.getIndex();
            this.setActiveVoucherItemGroupIndex(voucherItemGroupIndex);
            this.setActiveVoucherItemRank(null);

            voucherItemGroup.calcLayout();
            this.calcLayout();

            this.render();
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

    //根据节点结构设置内部变量_tab _voucherItemGroups
    _setInternalVariables: function(){
        var tab = this._findTab();
        if(tab==null){
            this._tab = wof$.create('Tab');
            this._tab.setIsInside(true);
            this._tab.setLeft(0);
            this._tab.appendTo(this);
        }else{
            this._tab = tab;
        }
        this._voucherItemGroups = [];
        this._voucherItemGroups.sort(function(a, b) {
            return a.getIndex() - b.getIndex();
        });
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
        }else{
            var groups = this._findGroups();
            for(var i=0;i<groups.length;i++){
                this._voucherItemGroups.push(groups[i]);
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
     * voucherItemGroupIndex 在指定VoucherItemGroup序号后插入(序号从1开始)
     * 如果voucherItemGroupIndex为null 在开头插入
     */
    insertVoucherItemGroup: function(voucherItemGroupData, voucherItemGroupIndex){
        if(voucherItemGroupIndex==null){
            voucherItemGroupIndex = 1;
        }
        var width = voucherItemGroupData.width!=null?voucherItemGroupData.width:this.getWidth();
        var titleHeight = voucherItemGroupData.titleHeight!=null?voucherItemGroupData.titleHeight:null;
        var colsNum = voucherItemGroupData.colsNum!=null?voucherItemGroupData.colsNum:null;
        var itemHeight = voucherItemGroupData.itemHeight!=null?voucherItemGroupData.itemHeight:this.getItemHeight();
        var isHead = (voucherItemGroupData.isHead=='true'||voucherItemGroupData.isHead==true)?true:false;

        var newVoucherItemGroup = wof$.create('VoucherItemGroup');
        newVoucherItemGroup.setWidth(width);
        newVoucherItemGroup.setTitleHeight(titleHeight);
        newVoucherItemGroup.setGroupCaption(voucherItemGroupData.groupCaption);
        newVoucherItemGroup.setColsNum(colsNum);
        newVoucherItemGroup.setItemHeight(itemHeight);
        newVoucherItemGroup.setIsHead(isHead);

        if(voucherItemGroupIndex==this.getActiveVoucherItemGroupIndex()){
            this.setActiveVoucherItemRank(null);
        }

        this._setInternalVariables();

        //插入新建分组并重设所有分组的index
        this._voucherItemGroups.splice(voucherItemGroupIndex,0,newVoucherItemGroup);
        for(var i=0;i<this._voucherItemGroups.length;i++){
            var group = this._voucherItemGroups[i];
            group.setIndex(i+1);
            group.remove();
            group.appendTo(this);
        }
        var newItem = wof$.create('VoucherItem');
        newItem.appendTo(newVoucherItemGroup);

        newVoucherItemGroup.calcLayout();
        this.calcLayout();
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
            voucherItemGroup.remove();
            voucherItemGroup.beforeTo(prevVoucherItemGroup);
            this.calcLayout();
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
                group.calcLayout();
            }
            voucherItemGroup.remove();
            voucherItemGroup.afterTo(nextVoucherItemGroup);
            this.calcLayout();
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
            this.calcLayout();
        }
    },

    /**
     * 修改voucherComponent
     * voucherComponentData voucherComponent数据
     */
    updateVoucherComponent: function(voucherComponentData){
        if(!jQuery.isEmptyObject(voucherComponentData)){
            if(voucherComponentData.componentName!=null){
                this.setComponentName(voucherComponentData.componentName);
            }
            if(voucherComponentData.state!=null){
                this.setState(voucherComponentData.state);
            }
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
            if(voucherComponentData.fkField!=null){
                this.setFkField(voucherComponentData.fkField);
            }
            if(voucherComponentData.fkFieldValue!=null){
                this.setFkFieldValue(voucherComponentData.fkFieldValue);
            }
            for(var i=0;i<this._voucherItemGroups.length;i++){
                var group = this._voucherItemGroups[i];
                group.calcLayout();
            }
            this.calcLayout();
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

                voucherItemGroup.calcLayout();
                this.calcLayout();
            }
        }
    },

    /**
     * 修改指定的voucherItem
     * voucherItemData voucherItem数据
     *  * voucherItemRank 指定行列
     * voucherItemGroupIndex 指定的voucherItemGroup序号(序号从1开始)
     */
    updateVoucherItem: function(voucherItemData, voucherItemRank, voucherItemGroupIndex){
        if(!jQuery.isEmptyObject(voucherItemData)){
            if(voucherItemGroupIndex==null){
                voucherItemGroupIndex = this.getActiveVoucherItemGroupIndex();
            }
            if(jQuery.isEmptyObject(voucherItemRank)){
                voucherItemRank = this.getActiveVoucherItemRank();
            }
            if(!jQuery.isEmptyObject(voucherItemRank) && voucherItemGroupIndex!=null){
                var voucherItemGroup = this.findVoucherItemGroupByIndex(Number(voucherItemGroupIndex));
                if(voucherItemGroup!=null){
                    var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
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

                        voucherItemGroup.calcLayout();
                        this.calcLayout();
                    }else{
                        console.log('不存在的voucherItem');
                    }
                }else{
                    console.log('不存在voucherItemGroup 请先插入新的voucherItemGroup');
                }
            }
        }
    },

    /**
     * 在指定的分组下的指定行列插入voucherItem
     * 如果指定的行列位置下已经有数据 则在其后插入新的item
     * voucherItemData voucherItem数据
     * voucherItemRank 指定行列
     * voucherItemGroupIndex 指定的voucherItemGroup序号(序号从1开始)
     */
    insertVoucherItem: function(voucherItemData, voucherItemRank, voucherItemGroupIndex){
        if(voucherItemGroupIndex==null){
            voucherItemGroupIndex = this.getActiveVoucherItemGroupIndex();
        }
        if(jQuery.isEmptyObject(voucherItemRank)){
            voucherItemRank = this.getActiveVoucherItemRank();
        }
        if(!jQuery.isEmptyObject(voucherItemRank) && voucherItemGroupIndex!=null){
            var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
            if(voucherItemGroup!=null){
                var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
                if(voucherItem!=null){
                    var newVoucherItem = null;
                    if(voucherItem.isChange()==false){
                        newVoucherItem = voucherItem;
                    }else{  //指定位置的item已经被修改过属性
                        newVoucherItem = wof$.create('VoucherItem');
                        newVoucherItem.afterTo(voucherItem);
                    }
                    this._insertVoucherItem(voucherItemData, newVoucherItem, voucherItemGroup);
                    voucherItemGroup.calcLayout();
                    this.calcLayout();
                }
            }else{
                console.log('不存在voucherItemGroup 请先插入新的voucherItemGroup');
            }
        }
    },

    /**
     * 在指定的分组下的指定行列插入voucherItem
     * 如果指定的行列位置下已经有数据 则在其后插入新的item
     * voucherItemData voucherItem数据
     * voucherItemRank 指定行列
     * voucherItemGroupIndex 指定的voucherItemGroup序号(序号从1开始)
     */
    _insertVoucherItem: function(voucherItemData, voucherItem, voucherItemGroup){
        voucherItem.setHeight(voucherItemGroup.getItemHeight());
        voucherItem.setScale(voucherItemGroup.getScale());
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
    },

    /**
     * 在指定的分组下的指定行列批量插入voucherItem
     * 如果指定的行列位置下已经有数据 则在其后插入新的item
     * voucherItemsData voucherItem数据
     * voucherItemRank 指定行列
     * voucherItemGroupIndex 指定的voucherItemGroup序号(序号从1开始)
     */
    insertVoucherItems: function(voucherItemsData, voucherItemRank, voucherItemGroupIndex){
        if(voucherItemGroupIndex==null){
            voucherItemGroupIndex = this.getActiveVoucherItemGroupIndex();
        }
        if(jQuery.isEmptyObject(voucherItemRank)){
            voucherItemRank = this.getActiveVoucherItemRank();
        }
        if(!jQuery.isEmptyObject(voucherItemRank) && voucherItemGroupIndex!=null){
            var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
            if(voucherItemGroup!=null){
                var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
                if(voucherItem!=null){
                    var newVoucherItem = null;
                    if(voucherItem.isChange()==false){
                        newVoucherItem = voucherItem;
                    }else{  //指定位置的item已经被修改过属性
                        newVoucherItem = wof$.create('VoucherItem');
                        newVoucherItem.afterTo(voucherItem);
                    }
                    this._insertVoucherItem(voucherItemsData[0], newVoucherItem, voucherItemGroup);
                    var preItem = newVoucherItem;
                    for(var i=1;i<voucherItemsData.length;i++){
                        var voucherItemData = voucherItemsData[i];
                        var item = wof$.create('VoucherItem');
                        item.afterTo(preItem);
                        preItem = item;
                        this._insertVoucherItem(voucherItemData, item, voucherItemGroup)
                    }
                    voucherItemGroup.calcLayout();
                    this.calcLayout();
                }
            }else{
                console.log('不存在voucherItemGroup 请先插入新的voucherItemGroup');
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

    //计算布局
    calcLayout: function(){
        //复位所有分组的节点位置
        for(var i=0;i<this._voucherItemGroups.length;i++){
            var group = this._voucherItemGroups[i];
            group.remove();
            group.appendTo(this);
        }
        //删除tab下所有的item
        this._tab.deleteItem();


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
            //计算头分组位置
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
            }
            //计算页签分组位置
            if(tabGroups.length>0){
                //计算最大分组高度
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
                //创建页签item 并将页签分组加入依次加入到页签item下
                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    this._tab.insertItem({title:voucherItemGroup.getGroupCaption()});
                }
                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    voucherItemGroup.setTop(0);
                    voucherItemGroup.setLeft(0);
                    voucherItemGroup.remove();
                    this._tab.insertNode(voucherItemGroup,(i+1));
                }
                //计算并激活的页签item
                var tabItemIndex = 1;
                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    if(voucherItemGroup.getIndex()==this.getActiveVoucherItemGroupIndex()){
                        tabItemIndex = i+1;
                        break;
                    }
                }
                this._tab.setActiveItemIndex(tabItemIndex);
            }else{
                //如果不存在页签分组 则直接隐藏页签
                this._tab.setHiden(true);
            }

            height += maxGroupHeight;
        }else{
            this._tab.setHiden(true);
            //计算分组位置
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
            }
        }

        this.setHeight(height);
    },

    //布局
    _layout: function(){
        var height = 0;
        var voucherItemGroups = this._voucherItemGroups;

        for(var i=0;i<voucherItemGroups.length;i++){
            var voucherItemGroup = voucherItemGroups[i];
            voucherItemGroup.getDomInstance().css('top', voucherItemGroup.getTop()*this.getScale()+'px');
            voucherItemGroup.getDomInstance().css('left','0px');
            voucherItemGroup.setVoucherItemGroupStyle(false);
        }

        this.getDomInstance().css('height',(this.getHeight()*this.getScale())+'px');
        this.getDomInstance().css('width', (this.getWidth()*this.getScale())+'px');

        //根据activeVoucherItemGroupIndex设置当前激活的VoucherItemGroup
        var activeVoucherItemGroup = this.findVoucherItemGroupByIndex(this.getActiveVoucherItemGroupIndex());
        if(activeVoucherItemGroup!=null){
            var activeVoucherItem = activeVoucherItemGroup.findVoucherItemByRank(this.getActiveVoucherItemRank());
            if(activeVoucherItem!=null){
                activeVoucherItemGroup.activeVoucherItemStyle(activeVoucherItem);
            }else{
                activeVoucherItemGroup.setVoucherItemGroupStyle(true);
            }
        }
    }

};