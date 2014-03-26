/**
 * @functionWidgetClass AddRecordComponent class
 * @package wof.functionWidget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.functionWidget.AddRecordComponent = function () {
    this._version = '1.0';

};

wof.functionWidget.AddRecordComponent.prototype = {
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

    //按钮文本
    _text:null,

    _bindComponents: null, //绑定构件ID

    _isAutoCommit: null,      //是否自动提交

    _btn: null,

    _paramMaps:null,

    _formFunctionId:null,

    _componentId:null,

    /**
     * get/set 属性方法定义
     */

    getComponentId: function(){
        if(this._componentId==null){
            this._componentId=this.getId();
        }
        return this._componentId;
    },

    setComponentId: function(componentId){
        this._componentId = componentId;
    },

    getFormFunctionId : function (){
        return this._formFunctionId;
    },

    setFormFunctionId : function (formFunctionId){
        this._formFunctionId = formFunctionId;
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

    getCallStr : function (){
        return this._callStr || 'addRecordCmd:0_0_1';
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
        return this._callItemName || 'addRecord';
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

    getIsAutoCommit : function (){
        return this._isAutoCommit || false;
    },

    setIsAutoCommit : function (isAutoCommit){
        this._isAutoCommit = isAutoCommit;
    },

    getBindComponents : function (){
        return this._bindComponents || '';
    },

    setBindComponents : function (bindComponents){
        this._bindComponents = bindComponents;
    },
    _init: function(data){
    	if(!data){
    		return false;
    	}
    	if(data.CallItemCaption){
    		this.setCallItemCaption(data.CallItemCaption);
    	}
    	if(data.formFunctionId){
    		this.setFormFunctionId(data.formFunctionId);
    	}
    	if(data.bindComponents){
    		this.setBindComponents(data.bindComponents);
    	}
    },
    /**
     * Render 方法定义
     */

    initRender: function(){
    	var that = this;
        var button = wis$.create('Button',{value : '新增',click:function (){
        	 //that.sendMessage('wof.functionWidget.DeleteRecordComponent_active');
        	if(that.getBindComponents()!=null&&that.getBindComponents()!=""&&that.getBindComponents()!="null"){
        		that.sendMessage('wof.functionWidget.AddRecordComponent_active');
        	}else if(that.getFormFunctionId()!=null&&that.getFormFunctionId()!=""&&that.getFormFunctionId()!="null"){
        		var dialog = wof$.create('Dialog');
        		dialog.setUrl('http://172.16.40.79:8889/emap.form?functionId='+that.getFormFunctionId());
        		var refreshDo = function(){
        			that.sendMessage('wof.bizWidget.DataObject_query');// TODO 参数？
        		}
        		dialog.onClose(refreshDo);
        		dialog.render();
        	}else{
        		alert("未配置操作！");
        	}
        }});
        button.render();
        button.appendTo(this.getDomInstance());
    },

    //选择实现
    beforeRender: function () {

        //this._btn.setText(this.getCallItemCaption());
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            componentId: this.getComponentId(),
            formFunctionId: this.getFormFunctionId(),
            paramMaps: this.getParamMaps(),
            bindComponents: this.getBindComponents(),
            isAutoCommit: this.getIsAutoCommit(),
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
        this.setComponentId(data.componentId);
        this.setFormFunctionId(data.formFunctionId);
        this.setParamMaps(data.paramMaps);
        this.setBindComponents(data.bindComponents);
        this.setIsAutoCommit(data.isAutoCommit);
        this.setCallStr(data.callStr);
        this.setCommandItemID(data.commandItemID);
        this.setISPermissionControl(data.iSPermissionControl);
        this.setFunctionID(data.functionID);
        this.setCallItemName(data.callItemName);
        this.setCallItemCaption(data.callItemCaption);
        this.setCallType(data.callType);
    },

   /* _insideOnReceiveMessage:{
        'wof.widget.Button_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            this.sendMessage('wof.functionWidget.AddRecordComponent_active');
            return false;
        },
        'wof.widget.Button_dblclick':function(message){
            console.log(message.id+'   '+this.getClassName());
            this.sendMessage('wof.functionWidget.AddRecordComponent_active');
            return false;
        }

    },*/

    updateAddRecordComponent: function(data){
        if(!jQuery.isEmptyObject(data)){
            if(data.bindComponents!=null){
                this.setBindComponents(data.bindComponents);
            }
            if(data.formFunctionId!=null){
                this.setFormFunctionId(data.formFunctionId);
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
        var node = new wof.functionWidget.AddRecordComponent();
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(110);
        node.setHeight(30);
        node.setCallItemCaption('增加');
        return node;
    }

};