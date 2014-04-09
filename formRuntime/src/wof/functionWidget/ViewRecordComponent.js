/**
 * @functionWidgetClass ViewRecordComponent class
 * @package wof.functionWidget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.functionWidget.ViewRecordComponent = function () {
    this._version = '1.0';
    
};

wof.functionWidget.ViewRecordComponent.prototype = {
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

    _btn: null,
    
    _dialog:null, // 对话框对象

    _paramMaps:null,

    _formFunctionId: null,
    
    _openUrl:null,

    _bindComponents: null,
    
    _bindComp: null,

    /**
     * get/set 属性方法定义
     */

    getBindComponents : function (){
        return this._bindComponents || '';
    },

    setBindComponents : function (bindComponents){
        this._bindComponents = bindComponents;
    },

    getFormFunctionId : function (){
        return this._formFunctionId;
    },

    setFormFunctionId : function (formFunctionId){
        this._formFunctionId = formFunctionId;
    },
   
    getOpenUrl : function (){
        return this._openUrl;
    },

    setOpenUrl : function (openUrl){
        this._openUrl = openUrl;
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
        return this._callStr || 'viewRecordCmd:0_0_1';
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
        return this._callItemName || 'viewRecord';
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
    getBindComp : function (){
        return this._bindComp;
    },

    setBindComp : function (bindComp){
        this._bindComp = bindComp;
    },
    _init: function(data){
    	if(!data){
    		return false;
    	}
    	if(data.callItemCaption){
    		this.setCallItemCaption(data.callItemCaption);
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
	   var button = wof$.create('Button');
       button.setLabel(this.getCallItemCaption());
       button.setIsInside(true);
       button.appendTo(this);
       this._btn = button;
    },

    //选择实现
    beforeRender: function () {

        this._btn.setLabel(this.getCallItemCaption());
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {

    },
    
    // 初始化监听消息 
    _insideOnReceiveMessage:{
    	'wof.widget.Dialog_close':function(message){
    		if (this._dialog!=null&&message.sender!=null&&
    				this._dialog.getId() == message.sender.id) {
    			this._dialog.remove(true);
    			this._dialog = null; // 还原为null，下次弹出时重新赋值
    		}
        },
    	'wof.widget.Button_onclick':function(message){
        	if (this._btn!=null&&message.sender!=null&&
    				this._btn.getId() == message.sender.id) {
        		if(this.getBindComponents()!=null&&this.getBindComponents()!=""&&this.getBindComponents()!="null"){
               		var bindComp = this._getObjByComponentId(this.getBindComponents());
               		if(bindComp!=null){
               			var selectMainId = bindComp.getCurrentRowId();// value,status 
               			if(selectMainId!=null&&selectMainId!=""){
               				if(this.getFormFunctionId()!=null&&this.getFormFunctionId()!=""
               	        		&&this.getFormFunctionId()!="null"&&this.getOpenUrl()!=null){
               					if(this._dialog==null){ // 目前每次都重新渲染
               						var dialog = wof$.create('Dialog');
                   	        		dialog.setIsInside(true);
                   	        		dialog.appendTo(this);
                   	        		//按钮[ { text: '确定', onclick: function (item, dialog) { alert(item.text); } ]
                    				var buttons = [];
                    				var btn_clocse = { text: '关闭', onclick: function (item, dialog) {
                							dialog.close();
                						} 
                    				};
                    				buttons.push(btn_clocse);
                    				dialog.setButtons(buttons);
                    				dialog.setCanDrag(true);
                   	        		this._dialog = dialog;
               					}
               	        		if(this.getOpenUrl().indexOf("?")>-1){
               	        			this._dialog.setUrl(this.getOpenUrl()+"&pagestate=View&dataId="+selectMainId);
               	           		}else{
               	           			this._dialog.setUrl(this.getOpenUrl()+"?pagestate=View&dataId="+selectMainId);
               	           		}
               	        		this._dialog.render();
               	        		
                       		}else{
                       			var dialog = wof$.create('Dialog');
    	        				dialog.setType("warn");
    	        				dialog.setTextContent("未关联页面!");
    	        				dialog.render();
                       		}	
               			}else{
               				var dialog = wof$.create('Dialog');
	        				dialog.setType("warn");
	        				dialog.setTextContent("未选择数据!");
	        				dialog.render();
               			}
               		}else{
               			var dialog = wof$.create('Dialog');
        				dialog.setType("warn");
        				dialog.setTextContent("未绑定列表!");
        				dialog.render();
               		}
               	}else{
               		var dialog = wof$.create('Dialog');
    				dialog.setType("warn");
    				dialog.setTextContent("未配置操作!");
    				dialog.render();
               	}
        	}
        }
    },
    _getObjByComponentId: function (compId) {
    	var objs = wof$.find('*');
	    for(var i=0;i<objs.size();i++){
	        var obj = objs.get(i);
	        if(obj!=null&&obj.getComponentId()!=null&&obj.getComponentId()==compId){
	        	return obj;
	        }
	    }
	    return null;
    }, 
    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            bindComponents: this.getBindComponents(),
            formFunctionId: this.getFormFunctionId(),
            paramMaps: this.getParamMaps(),
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
        this.setBindComponents(data.bindComponents);
        this.setFormFunctionId(data.formFunctionId);
        this.setParamMaps(data.paramMaps);
        this.setCallStr(data.callStr);
        this.setCommandItemID(data.commandItemID);
        this.setISPermissionControl(data.iSPermissionControl);
        this.setFunctionID(data.functionID);
        this.setCallItemName(data.callItemName);
        this.setCallItemCaption(data.callItemCaption);
        this.setCallType(data.callType);
    },

    updateViewRecordComponent: function(data){
        if(!jQuery.isEmptyObject(data)){
            if(data.componentName!=null){
                this.setComponentName(data.componentName);
            }
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
        var node = new wof.functionWidget.ViewRecordComponent();
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(110);
        node.setHeight(30);
        node.setCallItemCaption('查看');
        return node;
    }

};