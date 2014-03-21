/**
 * @functionWidgetClass CommitComponent class
 * @package wof.functionWidget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */
wof.functionWidget.CommitComponent = function () {
    this._version = '1.0';
};

wof.functionWidget.CommitComponent.prototype = {
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
        return this._callStr || 'commitRecordCmd:0_0_1';
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
        return this._callItemName || 'commitRecord';
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
    /**
     * 初始化_init 方法定义
     */
    _init: function (data) {
        this.setWidth(110);
        this.setHeight(30);
        this.setSchema(data);// 生成器中设置的参数，如绑定组件等
    },
    setSchema: function (data) {
        if (data.width) {
            this.setWidth(data.width);
        }
        if (data.width) {
            this.setWidth(data.width);
        }
        if (data.height) {
            this.setHeight(data.height);
        }
        if (data.callItemCaption) {
            this.setCallItemCaption(data.callItemCaption);
        }
        if (data.bindComponents) {
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
    	var button = wis$.create("Button",{value:"提交",
        	click:function(){
//        			var dataType = "all";
//                	var entityParameter = [];
//                	if(that.getBindComponents()!=null){
//            		    var hasMain = false;
//            		    var comps = that.getBindComponents().split(",");// 拆分为数组
//        				for(var compi=0;compi<comps.length;compi++){
//        					var comp = comps[compi]; // 组件ID
//        					//获取绑定的组件对象
//        					var bindComp = that._getObjByComponentId(comp);
//        					// 类型为表头或列表，则为主实体
//        					if(bindComp!=null&&bindComp.getClassName()!=null&&(bindComp.getClassName()=="wof.bizWidget.GridComponent"
//        							||bindComp.getClassName()=="wof.bizWidget.VoucherComponent")){
//        						hasMain = true;// 判断是否包含主实体，TODO 当前类型中默认都包含主实体？
//        					// 类型为表体，则为子实体
//        					}else if(bindComp!=null&&bindComp.getClassName()!=null&&bindComp.getClassName()=="wof.bizWidget.VoucherGridComponent"){
//        						var entityParam = {};
//        						var bindMainCompID = bindComp.getBindComponents(); //TODO getBindComponents()方法名待定
//        						if(bindMainCompID!=null){
//        							var mainComp = that._getObjByComponentId(bindMainCompID);
//        							if(mainComp!=null){
//        								// 读取与表体相关联的列表或者表头的当前行ID,TODO getSelected()方法名待确定
//        								var mainRowId = mainComp.getSelected()!=null?mainComp.getSelected():null;
//        								var bindEntityAlias = bindComp.getBindEntityId();//读取表体对象绑定的实体，
//        																		 	//TODO getBindEntityId()方法名待确定
//        								if(mainRowId!=null&&bindEntityAlias!=null){
//        									entityParam.childEntityAlias = bindEntityAlias;
//        									entityParam.mainRowId = mainRowId;
//        									entityParameter.push(entityParam);
//        								}
//        							}
//        						}
//        					}
//        				}	
//                		if(hasMain){
//                			if(jQuery.isEmptyObject(entityParameter)){
//                				dataType = "main";
//                			}else{  
//                				dataType = "mainAndChild";
//                			}
//                		}else if(jQuery.isEmptyObject(entityParameter)){
//                			// dataType = "child";// 目前不存在只有子实体的情形，因【当前类型中默认都包含主实体？】用以下代替
//                			dataType = "mainAndChild";
//                		}else{
//                			dataType = null;//绑定的组件在本页中不存在或未绑定实体
//                		}
//                	}
//                	if(dataType!=null){
//                		that._saveDataToDO(dataType,entityParameter);
//                	}
//                    return false;
        		}
        		});
       //button.setIsInside(true);
       //button.getName('submit');
       // button.setLeft(0);
       // button.setTop(0);
       // button.setWidth(this.getWidth());
       // button.setHeight(this.getHeight());
        button.render();
        button.appendTo(this.getDomInstance());
        this._btn = button;
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
    // ----------内部方法----------
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
    _saveDataToDO: function (dataType,entityParameter) {
    	this.getDataSource().saveData(dataType,entityParameter);
    }, 
    
    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            componentId: this.getComponentId(),
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
    updateCommitComponent: function(data){
        if(!jQuery.isEmptyObject(data)){
            if(data.bindComponents!=null){
                this.setBindComponents(data.bindComponents);
            }
            if(data.isAutoCommit!=null){
                this.setIsAutoCommit((data.isAutoCommit=='true'||data.isAutoCommit==true)?true:false);
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
        var node = new wof.functionWidget.CommitComponent();
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(110);
        node.setHeight(30);
        node.setCallItemCaption('提交');
        return node;
    }

};