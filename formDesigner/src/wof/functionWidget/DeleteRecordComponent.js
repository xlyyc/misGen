/**
 * @functionWidgetClass DeleteRecordComponent class
 * @package wof.functionWidget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.functionWidget.DeleteRecordComponent = function () {
    this._version = '1.0';

};

wof.functionWidget.DeleteRecordComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _callStr: null,    //调用字符串，格式为 构件类型唯一识别串:构件版本，例如【GridComponent:1.0.0】

    _commandItemID: null,

    _iSPermissionControl: null,    //此功能点是否权限控制

    _functionID: null,    //功能ID，默认生成，设计时功能号与运行时功能号不一致，但有内在逻辑关系

    _callItemName: null,    //调用行为名称，新增|编辑|删除|查看|保存|批量修改|修改属性为特定值(通过、不通过）|导入|导出

    _callItemCaption: null,    //调用行为显示名称

    _callType: null,    //调用类型。类型包括系统内置菜单命令项、自定义菜单命令项。自定义命令项需提前在Action节点中提前定义.

    _bindComponents: null, //绑定构件ID

    _btn: null,

    _paramMaps:null,

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

    getCallStr : function (){
        return this._callStr || 'deleteRecordCmd:0_0_1';
    },

    setCallStr : function (callStr){
        this._callStr = callStr;
    },

    getCommandItemID : function (){
        return this._commandItemID || '';
    },

    setCommandItemID : function (commandItemID){
        this._commandItemID = commandItemID;
    },

    getISPermissionControl : function (){
        return this._iSPermissionControl || false;
    },

    setISPermissionControl : function (iSPermissionControl){
        this._iSPermissionControl = iSPermissionControl;
    },

    getFunctionID : function (){
        return this._functionID || wof.util.Tool.uuid();
    },

    setFunctionID : function (functionID){
        this._functionID = functionID;
    },

    getCallItemName : function (){
        return this._callItemName || 'deleteRecord';
    },

    setCallItemName : function (callItemName){
        this._callItemName = callItemName || '';
    },

    getCallItemCaption : function (){
        return this._callItemCaption || '';
    },

    setCallItemCaption : function (callItemCaption){
        this._callItemCaption = callItemCaption;
    },

    getCallType : function (){
        return this._callType || 'JS';
    },

    setCallType : function (callType){
        this._callType = callType;
    },

    getBindComponents : function (){
        return this._bindComponents || '';
    },

    setBindComponents : function (bindComponents){
        this._bindComponents = bindComponents;
    },

    /**
     * Render 方法定义
     */

    _initRender: function(){
        var button = wof$.create('Button');
        button.setIsInside(true);
        button.setLeft(0);
        button.setTop(0);
        button.setWidth(this.getWidth());
        button.setHeight(this.getHeight());
        button.appendTo(this);
        this._btn = button;
    },

    //选择实现
    _beforeRender: function () {

        this._btn.setLabel(this.getCallItemCaption());
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            paramMaps: this.getParamMaps(),
            bindComponents: this.getBindComponents(),
            callStr: this.getCallStr(),
            commandItemID: this.getCommandItemID(),
            iSPermissionControl: this.getISPermissionControl(),
            functionID: this.getFunctionID(),
            callItemName: this.getCallItemName(),
            callItemCaption: this.getCallItemCaption(),
            callType: this.getCallType()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setParamMaps(data.paramMaps);
        this.setBindComponents(data.bindComponents);
        this.setCallStr(data.callStr);
        this.setCommandItemID(data.commandItemID);
        this.setISPermissionControl(data.iSPermissionControl);
        this.setFunctionID(data.functionID);
        this.setCallItemName(data.callItemName);
        this.setCallItemCaption(data.callItemCaption);
        this.setCallType(data.callType);
    },

    _insideOnReceiveMessage:{
        'wof.widget.Button_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            this.sendMessage('wof.functionWidget.DeleteRecordComponent_active');
            return false;
        },
        'wof.widget.Button_dblclick':function(message){
            console.log(message.id+'   '+this.getClassName());
            this.sendMessage('wof.functionWidget.DeleteRecordComponent_active');
            return false;
        }

    },

    updateDeleteRecordComponent: function(data){
        if(!jQuery.isEmptyObject(data)){
            if(data.componentName!=null){
                this.setComponentName(data.componentName);
            }
            if(data.bindComponents!=null){
                this.setBindComponents(data.bindComponents);
            }
            if(data.commandItemID!=null){
                this.setCommandItemID(data.commandItemID);
            }
            if(data.iSPermissionControl!=null){
                this.setISPermissionControl((data.iSPermissionControl=='true'||data.iSPermissionControl==true)?true:false);
            }
            if(data.functionID!=null){
                this.setFunctionID(data.functionID);
            }
            if(data.callItemCaption!=null){
                this.setCallItemCaption(data.callItemCaption);
            }
            if(data.paramMaps!=null){
                this.setParamMaps(data.paramMaps);
            }

        }
    },

    //创建初始化的button
    createSelf: function(width, height){
        var node = wof$.create('DeleteRecordComponent');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(110);
        node.setHeight(30);
        node.setCallItemCaption('删除');
        return node;
    }

};