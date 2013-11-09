/**
 * @widgetClass AddRecordComponentSpanner class
 * @package wof.functionWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.functionWidget.spanner.AddRecordComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.functionWidget.AddRecordComponent';
    this._meta.title = '增加';
    this._meta.sendMessages = {'wof.functionWidget.AddRecordComponent_mousedown':'单击'};
    this._meta.propertys = {
        'AddRecordComponent':{
            'functionID':{prop:'functionID','name':'功能ID','type':'text','readOnly':false,'isHide':false},
            'isAutoCommit':{prop:'isAutoCommit','name':'是否自动提交','type':'yesOrNo','readOnly':false,'isHide':false},
            'bindComponents':{prop:'bindComponents','name':'绑定组件','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ComponentTreeSelector'},
            'commandItemID':{prop:'commandItemID','name':'功能构件ID','type':'text','readOnly':false,'isHide':false},
            'iSPermissionControl':{prop:'iSPermissionControl','name':'是否权限控制','type':'yesOrNo','readOnly':false,'isHide':false},
            'callItemCaption':{prop:'callItemCaption','name':'显示名称','type':'text','readOnly':false,'isHide':false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.functionWidget.AddRecordComponent"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +'if(data.id==this.getPropertys().id){ '
        +' var node=wof.util.ObjectManager.get(data.id); '
        +' node.updateAddRecordComponent(data); '
        +' node.render();'
        +'}';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    this._selectObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/selectObject.png">');
    this._deleteObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteObject.png">');
    this._cutObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');

};
wof.functionWidget.spanner.AddRecordComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

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
            obj.sendMessage('wof.functionWidget.AddRecordComponent_active');
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
        var addRecordComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(addRecordComponent!=null){
            activeData.id = this.getPropertys().id;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;

            activeData.isAutoCommit = this.getPropertys().isAutoCommit;
            activeData.bindComponents = this.getPropertys().bindComponents;
            activeData.commandItemID = this.getPropertys().commandItemID;
            activeData.iSPermissionControl = this.getPropertys().iSPermissionControl;
            activeData.functionID = this.getPropertys().functionID;
            activeData.callItemName = this.getPropertys().callItemName;
            activeData.callItemCaption = this.getPropertys().callItemCaption;

            activeData.activeClass = 'AddRecordComponent';

            //加入拖放 删除 剪切操作句柄
            this._selectObjectIco.css('top',0).css('left',0);
            addRecordComponent.getDomInstance().append(this._selectObjectIco);
            this._deleteObjectIco.css('top',0).css('left',this._selectObjectIco.width()+2);
            addRecordComponent.getDomInstance().append(this._deleteObjectIco);
            this._cutObjectIco.css('top',0).css('left',this._deleteObjectIco.width()*2+4);
            addRecordComponent.getDomInstance().append(this._cutObjectIco);
        }
        this.setActiveData(activeData);
        this.sendMessage('wof.functionWidget.spanner.AddRecordComponentSpanner_render');
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            activeData: this.getActiveData(),
            meta: this.getMeta()
        };
    },

    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setActiveData(data.activeData);
    },

    //静态方法 导出数据(只有需要给运行时解析的叶子节点才需要定义此方法)
    exportData: function(node){
        /**
         <CommandItem CallType="JS" FunctionID="201304" CallItemCaption="addRecord" CallItemName="新增" CallStr="addcmd:0_0_1">
         <Before CanStop="true">
            <Call Type="JS" />
         </Before>
         <After>
            <Call Type="JS" />
         </After>
         <Return />
         <ParamMaps>
             <ParamMap MapType="value" CompParamName="LinkComponentID" CompParamValue="emGrid" PageParamName="" ChangeExpt=""></ParamMap>
             <ParamMap MapType="value" CompParamName="formId" CompParamValue="emplyform" PageParamName="" ChangeExpt=""></ParamMap>
         </ParamMaps>
         </CommandItem>
         */
        var json = {};
        if(node.getClassName()=='wof.functionWidget.AddRecordComponent'){
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
            paramMap2.compParamName = 'isAutoCommit';
            paramMap2.compParamValue = String(node.getIsAutoCommit());
            paramMap2.pageParamName = '';
            paramMap2.changeExpt = '';
            paramMaps.push(paramMap2);

            json.paramMaps = paramMaps;
        }
        console.log(JSON.stringify(json));
        return json;
    }

};