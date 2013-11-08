/**
 * @widgetClass DeleteRecordComponentSpanner class
 * @package wof.functionWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.functionWidget.spanner.DeleteRecordComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.functionWidget.DeleteRecordComponent';
    this._meta.title = '删除';
    this._meta.sendMessages = {'wof.functionWidget.DeleteRecordComponent_mousedown':'单击'};
    this._meta.propertys = {
        'DeleteRecordComponent':{
            'functionID':{prop:'functionID','name':'功能ID','type':'text','readOnly':false,'isHide':false},
            'bindComponents':{prop:'bindComponents','name':'绑定组件','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ComponentTreeSelector'},
            'commandItemID':{prop:'commandItemID','name':'功能构件ID','type':'text','readOnly':false,'isHide':false},
            'iSPermissionControl':{prop:'iSPermissionControl','name':'是否权限控制','type':'yesOrNo','readOnly':false,'isHide':false},
            'callItemCaption':{prop:'callItemCaption','name':'显示名称','type':'text','readOnly':false,'isHide':false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.functionWidget.DeleteRecordComponent"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +'if(data.id==this.getPropertys().id){ '
        +' var node=wof.util.ObjectManager.get(data.id); '
        +' node.updateDeleteRecordComponent(data); '
        +' node.render();'
        +'}';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

};
wof.functionWidget.spanner.DeleteRecordComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _setActiveData: null,

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

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        var activeData = {};
        var commitComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(commitComponent!=null){
            activeData.id = this.getPropertys().id;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;

            activeData.bindComponents = this.getPropertys().bindComponents;
            activeData.functionID = this.getPropertys().functionID;
            activeData.callItemName = this.getPropertys().callItemName;
            activeData.callItemCaption = this.getPropertys().callItemCaption;

            activeData.activeClass = 'DeleteRecordComponent';
        }
        this.setActiveData(activeData);
        this.sendMessage('wof.functionWidget.spanner.DeleteRecordComponentSpanner_render');
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
         <CommandItem CallType="JS" FunctionID="emap.form" CallItemCaption="delRecord" CallItemName="删除" CallStr="delcmd:0_0_1">
             <Before CanStop="true">
                <Call Type="JS" />
             </Before>
             <After>
                <Call Type="JS" />
             </After>
             <Return />
             <ParamMaps>
                <ParamMap MapType="value" CompParamName="gridName" CompParamValue="emGrid" PageParamName="" ChangeExpt=""></ParamMap>
             </ParamMaps>
         </CommandItem>
         */
        var json = {};
        if(node.getClassName()=='wof.functionWidget.DeleteRecordComponent'){
            json.className = node.getClassName();
            json.callStr = node.getCallStr();
            json.functionID = node.getFunctionID();
            json.callItemName = node.getCallItemName();
            json.callItemCaption = node.getCallItemCaption();
            json.callType = node.getCallType();

            var paramMaps = [];
            var paramMap = {};
            paramMap.mapType = 'value';
            paramMap.compParamName = 'bindComponents';
            paramMap.compParamValue = node.getBindComponents();
            paramMap.pageParamName = '';
            paramMap.changeExpt = '';
            paramMaps.push(paramMap);

            json.paramMaps = paramMaps;
        }
        console.log(JSON.stringify(json));
        return json;
    }

};