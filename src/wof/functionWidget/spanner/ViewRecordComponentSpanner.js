/**
 * @widgetClass ViewRecordComponent class
 * @package wof.functionWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.functionWidget.spanner.ViewRecordComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.functionWidget.ViewRecordComponent';
    this._meta.title = '查看';
    this._meta.sendMessages = {'wof.functionWidget.ViewRecordComponent_mousedown':'单击'};
    this._meta.propertys = {
        'ViewRecordComponent':{
            'functionID':{prop:'functionID','name':'功能ID','type':'text','readOnly':false,'isHide':false},
            'commandItemID':{prop:'commandItemID','name':'功能构件ID','type':'text','readOnly':false,'isHide':false},
            'iSPermissionControl':{prop:'iSPermissionControl','name':'是否权限控制','type':'yesOrNo','readOnly':false,'isHide':false},
            'callItemCaption':{prop:'callItemCaption','name':'显示名称','type':'text','readOnly':false,'isHide':false},
            'bindComponents':{prop:'bindComponents','name':'绑定组件','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ComponentTreeSelector', customParam:'gridComponent,voucherGridComponent'},
            'formFunctionId':{prop:'formFunctionId','name':'绑定页面','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.PageFormSelector', customParam:''}
        }
    };


    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'this._processAndSendParameters(message.sender.propertys);'});
    var method = 'this._receiveAndProcessParameters(message.sender.propertys);';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);


    this._selectObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/selectObject.png">');
    this._deleteObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteObject.png">');
    this._cutObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');

};
wof.functionWidget.spanner.ViewRecordComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _parameters:null,

    _propertys: null,

    _setActiveData: null,

    _selectObjectIco : null,

    _deleteObjectIco : null,

    _cutObjectIco : null,

    /**
     * get/set 属性方法定义
     */
    getMeta: function(){
        return this._meta;
    },

    setParameters:function(parameters){
        this._parameters = parameters;
    },

    getParameters: function(){
        if(this._parameters==null){
            this._parameters = {};
        }
        return this._parameters;
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
        this._selectObjectIco.remove();
        this._deleteObjectIco.remove();
        this._cutObjectIco.remove();

        var _this = this;
        this._selectObjectIco.mousedown(function(event){
            event.stopPropagation();
            var obj = wof.util.ObjectManager.get(_this.getPropertys().id);
            obj.render();
            obj.sendMessage('wof.functionWidget.ViewRecordComponent_active');
        });
        this._deleteObjectIco.mousedown(function(event){
            event.stopPropagation();
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该构件吗?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '确定':function(){
                        var obj = wof.util.ObjectManager.get(_this.getPropertys().id);
                        obj.removeChildren(true);
                        obj.remove(true);
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

        this._cutObjectIco.mousedown(function(event){
            event.stopPropagation();
            wof.util.GlobalObject.add('cutObjectId',_this.getPropertys().id);
        });

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        var activeData = {};
        var viewRecordComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(viewRecordComponent!=null){
            activeData.id = this.getPropertys().id;
            activeData.componentId = this.getPropertys().componentId;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;

            activeData.bindComponents = this.getPropertys().bindComponents;
            activeData.formFunctionId = this.getPropertys().formFunctionId;
            activeData.commandItemID = this.getPropertys().commandItemID;
            activeData.iSPermissionControl = this.getPropertys().iSPermissionControl;
            activeData.functionID = this.getPropertys().functionID;
            activeData.callItemName = this.getPropertys().callItemName;
            activeData.callItemCaption = this.getPropertys().callItemCaption;

            activeData.activeClass = 'ViewRecordComponent';

            //加入拖放 删除 剪切操作句柄
            this._selectObjectIco.css('top',0).css('left',0);
            viewRecordComponent.getDomInstance().append(this._selectObjectIco);
            this._deleteObjectIco.css('top',0).css('left',this._selectObjectIco.width()+2);
            viewRecordComponent.getDomInstance().append(this._deleteObjectIco);
            this._cutObjectIco.css('top',0).css('left',this._deleteObjectIco.width()*2+4);
            viewRecordComponent.getDomInstance().append(this._cutObjectIco);
        }
        this.setActiveData(activeData);
        this.sendMessage('wof.functionWidget.spanner.ViewRecordComponentSpanner_render');
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            parameters: this.getParameters(),
            propertys: this.getPropertys(),
            activeData: this.getActiveData(),
            meta: this.getMeta()
        };
    },
    //必须实现
    setData:function(data){
        this.setParameters(data.parameters);
        this.setPropertys(data.propertys);
        this.setActiveData(data.activeData);

    },

    //静态方法 导出数据(只有需要给运行时解析的叶子节点才需要定义此方法)
    exportData: function(node){
        /**
         <CommandItem CallType="JS" FunctionID="emap.form" CallItemCaption="viewRecord" CallItemName="查看" CallStr="viewcmd:0_0_1">
         <Before CanStop="true">
            <Call Type="JS" />
         </Before>
         <After>
            <Call Type="JS" />
         </After>
         <Return />
         <ParamMaps>
             <ParamMap MapType="value" CompParamName="bindComponents" CompParamValue="emGrid" PageParamName="" ChangeExpt=""></ParamMap>
             <ParamMap MapType="value" CompParamName="formFunctionId" CompParamValue="emplyform" PageParamName="" ChangeExpt=""></ParamMap>
         </ParamMaps>
         </CommandItem>
         */
        var json = {};
        if(node.getClassName()=='wof.functionWidget.ViewRecordComponent'){
            json.commandItemID = node.getComponentId();
            json.className = node.getClassName();
            json.callStr = node.getCallStr();
            json.iSPermissionControl = String(node.getISPermissionControl());
            json.functionID = node.getFunctionID();
            json.callItemName = node.getCallItemName();
            json.callItemCaption = node.getCallItemCaption();
            json.callType = node.getCallType();

            var paramMaps = [];
            var paramMap1 = {};
            paramMap1.mapType = 'value';
            paramMap1.compParamName = 'bindComponents';
            paramMap1.compParamValue = node.getBindComponents();
            paramMap1.pageParamName = '';
            paramMap1.changeExpt = '';
            paramMaps.push(paramMap1);

            var paramMap2 = {};
            paramMap2.mapType = 'value';
            paramMap2.compParamName = 'formFunctionId';
            paramMap2.compParamValue = node.getFormFunctionId().formFunctionId==null?'':node.getFormFunctionId().formFunctionId;
            paramMap2.pageParamName = '';
            paramMap2.changeExpt = '';
            paramMaps.push(paramMap2);

            json.paramMaps = paramMaps;
        }
        console.log(JSON.stringify(json));
        return json;
    },



    //加工并发送数据
    _processAndSendParameters:function(propertys){
        if(propertys.className=="wof.functionWidget.ViewRecordComponent"){
            console.log('_processAndSendParameters:'+JSON.stringify(propertys));
            var parameters = propertys;
            this.setParameters(parameters);
            //todo 需要移除
            this.setPropertys(parameters);
        }else{
            this.setParameters(null);
        }
        this.render();
    },

    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        //todo 处理数据
        var propertys = parameters;
        console.log('_receiveAndProcessParameters:'+JSON.stringify(propertys));
        if(propertys.id==this.getPropertys().id){
            var node=wof.util.ObjectManager.get(propertys.id);
            node.updateViewRecordComponent(propertys);
            node.render();
        }
    }


};