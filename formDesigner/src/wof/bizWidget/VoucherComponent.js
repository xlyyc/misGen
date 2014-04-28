/**
 * @bizWidgetClass VoucherComponent class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherComponent = function () {
    this._version = '1.0';

    this._voucherItemGroups = [];

};
wof.bizWidget.VoucherComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

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

    _fkField: null, //外键对应字段

    _tabWidth: null,

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

    getFkField: function(){
        return this._fkField;
    },

    setFkField: function(fkField){
        this._fkField = fkField;
    },

    getBindEntity : function (){
        var bindEntityId = this.getBindEntityID();
        if(bindEntityId){
           var bizEntity = JSON.parse(getBizEntities());
           /**var bizEntity = {"childEntity":[],"linkEntity":[],"mainEntity":{
               "alias":"ZGLBCZB","calculateFiled":[],"defaultCondition":"","mainEntityName":"职工类别参照表","metaDataID":"ZGLBCZB","properties":[
                   {"columnName":"lbbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039596123701248","isSystemAttribute":false,"label":"类别编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"lbmc","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039636888141824","isSystemAttribute":false,"label":"类别名称","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbmc","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"lbbz","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039666051137536","isSystemAttribute":false,"label":"类别备注","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbz","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""}
                   ,{"columnName":"lbbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039596123701248","isSystemAttribute":false,"label":"类别编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"lbmc","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039636888141824","isSystemAttribute":false,"label":"类别名称","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbmc","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"lbbz","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039666051137536","isSystemAttribute":false,"label":"类别备注","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbz","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""}

               ]}};**/
           var entity = bizEntity.mainEntity;
           return entity;
        }
        return null;
    },

    /**
     * Render 方法定义
     */

    _initRender:function(){

    },

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {
        this._layout();
        this.sendMessage('wof.bizWidget.VoucherComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
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

            fkField: this.getFkField()
        };
    },
    //----------必须实现----------
    setData: function (data) {
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

        this._setInternalVariables();
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
        this._setInternalVariables();
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
        if(!jQuery.isEmptyObject(voucherItemData)){
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
                        newVoucherItem.setHeight(voucherItemGroup.getItemHeight());
                        voucherItem.setScale(voucherItemGroup.getScale());
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
                        voucherItemGroup.calcLayout();
                        this.calcLayout();
                    }else{
                        console.log('不存在的voucherItem');
                    }
                }else{
                    console.log('不存在voucherItemGroup 请先插入新的voucherItemGroup');
                }
            }
        }else{
            console.log('没有数据 不能插入');
        }
    },

    /**
     * 在指定分组中插入voucherItem
     * 如果voucherItemRank和voucherItemGroupIndex为null 则在当前焦点的voucherItem中插入
     * nodeData 节点数据
     * voucherItemRank 插入到的行列
     * voucherItemGroupIndex voucherItemGroup 序号
     */
    /*insertVoucherItem: function(voucherItemData, voucherItemRank, voucherItemGroupIndex){
     if(jQuery.isEmptyObject(voucherItemData)){
     console.log('voucherItemData为null 不能插入');
     }
     if(!voucherItemData.itemLabel){
     console.log('voucherItemData属性itemLabel不能为空');
     return;
     }
     if(!voucherItemData.dataField){
     console.log('voucherItemData属性dataField不能为空');
     return ;
     }
     if(voucherItemRank == null && voucherItemGroupIndex == null){
     voucherItemGroupIndex = this.getActiveVoucherItemGroupIndex();
     voucherItemRank = this.getActiveVoucherItemRank();
     }
     var voucherItemGroup = this.findVoucherItemGroupByIndex(voucherItemGroupIndex);
     if(!voucherItemGroup){
     console.log('不存在VoucherItemGroup 请先插入新的VoucherItemGroup');
     return ;
     }
     var voucherItem = voucherItemGroup.findVoucherItemByRank(voucherItemRank);
     if(!voucherItem){
     console.log('voucherItemRank 不存在');
     return;
     }
     if(voucherItem.isModified()){
     voucherItem.setItemLabel(voucherItemData.itemLabel);
     voucherItem.setDataField(voucherItemData.dataField);
     }else{
     var newVoucherItem = new wof.bizWidget.VoucherItem();
     newVoucherItem.setItemLabel(voucherItemData.itemLabel);
     newVoucherItem.setDataField(voucherItemData.dataField);
     newVoucherItem.afterTo(voucherItem);
     }
     },*/

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
                voucherItemGroup.calcLayout();
                this.calcLayout();
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
                voucherItemGroup.calcLayout();
                this.calcLayout();
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
                voucherItemGroup.calcLayout();
                this.calcLayout();
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
                voucherItemGroup.calcLayout();
                this.calcLayout();
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
                voucherItemGroup.calcLayout();
                this.calcLayout();
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
            if(this.getWidth()!=null && this._tabWidth==null){
                this._tabWidth = this.getWidth();
                this.setWidth(this._tabWidth-12);
                for(var i=0;i<voucherItemGroups.length;i++){
                    var voucherItemGroup = voucherItemGroups[i];
                    voucherItemGroup.calcLayout();
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
                var maxGroupHeight = 100;
                for(var i=0;i<tabGroups.length;i++){
                    var voucherItemGroup = tabGroups[i];
                    if(maxGroupHeight < voucherItemGroup.getHeight()){
                        maxGroupHeight = voucherItemGroup.getHeight();
                    }
                }
                this._tab.setHiden(false);
                this._tab.setTop(height);
                this._tab.setWidth(this.getWidth());
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
            if(this._tabWidth!=null){
                this.setWidth(this._tabWidth);
                this._tabWidth = null;
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
    },

    _getBindEntityPropertyVoucherItems : function() {
        var bindEntityPropertyVoucherItems = [];
        var activeIndex = this.getActiveVoucherItemGroupIndex() || 1;
        var voucherItemGroup = this.findVoucherItemGroupByIndex(activeIndex);
        var voucherItems = voucherItemGroup.findVoucherItems();
        for(var i = 0; i < voucherItems.length;i++){
            var voucherItem = voucherItems[i];
            if(voucherItem.getDataField()){
                bindEntityPropertyVoucherItems.push(voucherItem);
            }
        }
        return bindEntityPropertyVoucherItems;
    },

    //创建初始化的VoucherComponent
    createSelf: function(width, height){
        var node = wof$.create('VoucherComponent');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(width);
        node.setItemHeight(60);
        var voucherItemGroupData = {groupCaption:'表头分组1',width:width,titleHeight:25,colsNum:4,itemHeight:45};
        node.insertVoucherItemGroup(voucherItemGroupData);
        return node;
    }
};