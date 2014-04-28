/**
 * @widgetClass UpdateRecordComponentSpanner class
 * @package wof.functionWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.functionWidget.spanner.UpdateRecordComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.functionWidget.UpdateRecordComponent';
    this._meta.title = '修改';
    this._meta.sendMessages = {'wof.functionWidget.UpdateRecordComponent_mousedown':'单击'};
    this._meta.propertys = {
        'UpdateRecordComponent':{
            'componentName':{prop:'componentName','name':'构件名称','type':'text','readOnly':false,'isHide':false,required:false},
            'functionID':{prop:'functionID','name':'功能ID','type':'text','readOnly':false,'isHide':false},
            'formFunctionId':{prop:'formFunctionId','name':'绑定页面','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.PageFormSelector', customParam:''},
            'bindComponents':{prop:'bindComponents','name':'绑定构件','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ComponentTreeSelector', customParam:'voucherComponent,gridComponent,voucherGridComponent'},
            'commandItemID':{prop:'commandItemID','name':'功能构件ID','type':'text','readOnly':false,'isHide':false},
            'iSPermissionControl':{prop:'iSPermissionControl','name':'是否权限控制','type':'yesOrNo','readOnly':false,'isHide':false},
            'callItemCaption':{prop:'callItemCaption','name':'显示名称','type':'text','readOnly':false,'isHide':false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.functionWidget.UpdateRecordComponent_active',method:'this._receivePropertysAndRenderSelf(message.sender);'});

    var method = 'this._receiveAndProcessParameters(message.sender.parameters);';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    this._selectObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/selectObject.png">');
    this._deleteObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteObject.png">');
    this._cutObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');

};
wof.functionWidget.spanner.UpdateRecordComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _parameters: null,

    _selectObjectIco : null,

    _deleteObjectIco : null,

    _cutObjectIco : null,

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

    getParameters:function(){
        return this._parameters;
    },

    setParameters:function(parameters){
        this._parameters = parameters;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    _beforeRender: function () {
        this._selectObjectIco.remove();
        this._deleteObjectIco.remove();
        this._cutObjectIco.remove();

        var _this = this;
        this._selectObjectIco.mousedown(function(event){
            event.stopPropagation();
            var obj = wof.util.ObjectManager.get(_this.getPropertys().id);
            obj.render();
            obj.sendMessage('wof.functionWidget.UpdateRecordComponent_active');
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
    _afterRender: function () {
        var parameters = {};
        var updateRecordComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(updateRecordComponent!=null){
            parameters.id = this.getPropertys().id;
            parameters.componentId = this.getPropertys().componentId;
            parameters.componentName = this.getPropertys().componentName;
            parameters.className = this.getPropertys().className;
            parameters.onReceiveMessage = this.getPropertys().onReceiveMessage;
            parameters.onSendMessage = this.getPropertys().onSendMessage;

            parameters.bindComponents = this.getPropertys().bindComponents;
            parameters.formFunctionId = this.getPropertys().formFunctionId;
            parameters.commandItemID = this.getPropertys().commandItemID;
            parameters.iSPermissionControl = this.getPropertys().iSPermissionControl;
            parameters.functionID = this.getPropertys().functionID;
            parameters.callItemName = this.getPropertys().callItemName;
            parameters.callItemCaption = this.getPropertys().callItemCaption;

            parameters.activeClass = 'UpdateRecordComponent';

            //加入拖放 删除 剪切操作句柄
            this._selectObjectIco.css('top',0).css('left',0);
            updateRecordComponent.getDomInstance().append(this._selectObjectIco);
            this._deleteObjectIco.css('top',0).css('left',this._selectObjectIco.width()+2);
            updateRecordComponent.getDomInstance().append(this._deleteObjectIco);
            this._cutObjectIco.css('top',0).css('left',this._deleteObjectIco.width()*2+4);
            updateRecordComponent.getDomInstance().append(this._cutObjectIco);
        }
        this.setParameters(parameters);
        this.sendMessage('wof.functionWidget.spanner.UpdateRecordComponentSpanner_render');
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            parameters: this.getParameters(),
            meta: this.getMeta()
        };
    },
    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setParameters(data.parameters);

    },

    //静态方法 导出数据(只有需要给运行时解析的叶子节点才需要定义此方法)
    exportData: function(node){
        /**
         <CommandItem CallType="JS" FunctionID="emap.form" CallItemCaption="updateRecord" CallStr="updatecmd:0_0_1" CallItemName="修改">
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

        /*if(node.getClassName()=='wof.functionWidget.UpdateRecordComponent'){
            var tool = wof.util.Tool;
            var root = tool.stringToXml("<CommandItem></CommandItem>");
            var rootElement = root.documentElement;
            tool.setAttribute(rootElement,"CallType",node.getCallType());
            tool.setAttribute(rootElement,"FunctionID",node.getFunctionID());
            tool.setAttribute(rootElement,"CallItemCaption",node.getCallItemCaption());
            tool.setAttribute(rootElement,"CallItemName",node.getCallItemName());
            tool.setAttribute(rootElement,"CallStr",node.getCallStr());
            tool.setAttribute(rootElement,"CommandItemID",node.getComponentId());
            tool.setAttribute(rootElement,"ISPermissionControl",node.getISPermissionControl());

            var paramMapsElement = tool.createElement(root,'ParamMaps');
            var paramMapElement = tool.createElement(root,'ParamMap');
            tool.setAttribute(paramMapElement,"MapType",'value');
            tool.setAttribute(paramMapElement,"CompParamName",'bindComponents');
            tool.setAttribute(paramMapElement,"CompParamValue",node.getBindComponents());
            tool.setAttribute(paramMapElement,"PageParamName",'');
            tool.setAttribute(paramMapElement,"ChangeExpt",'');
            tool.appendChild(paramMapsElement,paramMapElement);

            var paramMapElement1 = tool.createElement(root,'ParamMap');
            tool.setAttribute(paramMapElement1,"MapType",'value');
            tool.setAttribute(paramMapElement1,"CompParamName",'formFunctionId');
            tool.setAttribute(paramMapElement1,"CompParamValue",node.getFormFunctionId()==null?'':node.getFormFunctionId());
            tool.setAttribute(paramMapElement1,"PageParamName",'');
            tool.setAttribute(paramMapElement1,"ChangeExpt",'');
            tool.appendChild(paramMapsElement,paramMapElement1);

            tool.appendChild(rootElement,paramMapsElement);

            var Before = tool.createElement(root,'Before');
            tool.setAttribute(Before,"CanStop",true);
            var Call = tool.createElement(root,'Call');
            tool.setAttribute(Call,'Type','JS');
            tool.appendChild(Before,Call);
            var After = tool.createElement(root,'After');
            var Call = tool.createElement(root,'Call');
            tool.setAttribute(Call,'Type','JS');
            tool.appendChild(After,Call);
            var Return = tool.createElement(root,'Return');
            tool.appendChild(rootElement,Before);
            tool.appendChild(rootElement,After);
            tool.appendChild(rootElement,Return);

            console.log(tool.xmlToString(root));
            return tool.xmlToString(root);
        }*/

        var json = {};
        if(node.getClassName()=='wof.functionWidget.UpdateRecordComponent'){
            json.componentName = node.getComponentName();
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
            paramMap2.compParamValue = node.getFormFunctionId()==null?'':node.getFormFunctionId();
            paramMap2.pageParamName = '';
            paramMap2.changeExpt = '';
            paramMaps.push(paramMap2);

            json.paramMaps = paramMaps;
        }
        console.log(JSON.stringify(json));
        return json;
    },


    //加工并发送数据
    _receivePropertysAndRenderSelf:function(propertys){
        this.setPropertys(propertys);
        this.render();
    },

    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        if(parameters.id==this.getPropertys().id){
            var node=wof.util.ObjectManager.get(parameters.id);
            node.updateUpdateRecordComponent(parameters);
            node.render();
        }
    }

};