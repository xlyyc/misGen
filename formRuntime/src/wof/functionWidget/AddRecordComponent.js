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
    
    _do:null,

    _bindComponents: null, //绑定构件ID 
    
    _bindComp:null, // 绑定构件对象

    _isAutoCommit: null,      //是否自动提交

    _btn: null,
    
    _dialog:null, // 对话框对象

    _paramMaps:null,

    _formFunctionId:null,
    
    _openUrl:null,

    /**
     * get/set 属性方法定义
     */

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
    getBindComp : function (){
        return this._bindComp;
    },

    setBindComp : function (bindComp){
        this._bindComp = bindComp;
    },
    getBindComponents : function (){
        return this._bindComponents;
    },

    setBindComponents : function (bindComponents){
        this._bindComponents = bindComponents;
    },
    /**
     * 运行时参数
     */
    _dataSourceType: null,
    _dataSource: null,// 没用到
    _dataObject: null,
    setDataSourceType: function (dataSourceType) {
        this._dataSourceType = dataSourceType;
    },
    setDataSource: function (dataSource) {
        this._dataSource = dataSource;
    },
    setDo: function (dataObject) {
        this._dataObject = dataObject;
    },
    getDataSourceType: function () {
        return this._dataSourceType;
    },
    getDataSource: function () {
        if (this.getDataSourceType() == 'do') {
            return this.getDo();
        }
        return null;
    },
    getDo: function () {
    	return this._dataObject;
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
    	if (data.dataSourceType) {
            this.setDataSourceType(data.dataSourceType);
        }
        if (data.dataObject) {
            this.setDo(data.dataObject);
        }
    },
    /**
     * Render 方法定义
     */

    initRender: function(){
    	var that = this;
        var button = wof$.create('Button');
        button.setLabel(this.getCallItemCaption());
        button.setIsInside(true);
        button.appendTo(this);
        that._btn = button;
    },

    //选择实现
    beforeRender: function () {},

    //----------必须实现----------
    render: function () {
    	if(this.getCallItemCaption()){
    		this._btn.setLabel(this.getCallItemCaption());
    	}
    },

    //选择实现
    afterRender: function () {},

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
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
    // 初始化监听消息 
    _insideOnReceiveMessage:{
        'wof.widget.Dialog_close':function(message){
        	if (this._dialog!=null&&message.sender!=null&&
				this._dialog.getId() == message.sender.id) {
				if(this.getBindComponents()){
					if(!this.getBindComp()){
						var bindComp = this._getObjByComponentId(this.getBindComponents());
						if(bindComp){
							this.setBindComp(bindComp);
						}
					}
					if(this.getBindComp()!=null){
						this.getBindComp().reload('firstPage');  // 更新DO,参数指定主实体/子实体，以及子实体mainRowId
					}
				}
				this._dialog.remove(true);
				this._dialog = null; // 还原为null，下次弹出时重新赋值,
									 //TODO 因Dialog组件执行remove之后，再次render无法渲染,否则可重用，无须执行这句话
        	}
        },
        'wof.widget.Button_onclick':function(message){
        	if (this._btn!=null&&message.sender!=null&&
    				this._btn.getId() == message.sender.id) {
        		if(this.getBindComponents()!=null&&this.getBindComponents()!=""&&this.getBindComponents()!="null"){
            		if(this.getFormFunctionId()!=null&&this.getFormFunctionId()!=""
            			&&this.getFormFunctionId()!="null"&&this.getOpenUrl()!=null){
            			if(this._dialog==null){ // 目前每次都重新渲染
            				var dialog = wof$.create('Dialog');
            				dialog.setIsInside(true);
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
            				this._dialog.appendTo(this);
            			}
            			if(!this.getBindComp()){
							var bindComp = this._getObjByComponentId(this.getBindComponents());
							if(bindComp){
								this.setBindComp(bindComp);
							}
						}
						var linkMainParamStr = '';
            			if(this.getBindComp()!=null){
							if(this.getBindComp()!=null&&this.getBindComp().getClassName()!=null 
									&& this.getBindComp().getClassName()=="wof.bizWidget.VoucherGridComponent"){
		    					var linkMainValue = this.getBindComp().getCurrentMainRowId();
		    					if(linkMainValue!=null){
		    						linkMainParamStr = '&'+this.getParamMaps()['linkMainFiledKey']+'='+linkMainValue;
		    					}
							}
							if(this.getOpenUrl().indexOf("?")>-1){
	    	        			this._dialog.setUrl(this.getOpenUrl()+"&pagestate=Add"+linkMainParamStr);
	    	           		}else{
	    	           			this._dialog.setUrl(this.getOpenUrl()+"?pagestate=Add"+linkMainParamStr);
	    	           		}
	    	        		this._dialog.render();
						}else{
							var dialog = wof$.create('Dialog');
	        				dialog.setType("warn");
	        				dialog.setTextContent("绑定列表不存在!");
	        				dialog.render();
						}
            			
            		}else{
            			//行编辑
            			this.sendMessage('wof.functionWidget.AddRecordComponent_click');
            		}
            	}else{
            		var dialog = wof$.create('Dialog');
    				dialog.setType("warn");
    				dialog.setTextContent("未绑定列表!");
    				dialog.render();
            	}	
        	}
        }
    },

    updateAddRecordComponent: function(data){
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
	/**
	 *　根据构件ＩＤ查找构件对象
	 */
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