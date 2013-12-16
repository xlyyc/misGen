/**
 * @widgetClass GridLayoutSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.GridLayoutSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.bizWidget.GridLayout';
    this._meta.title = '网格布局';
    this._meta.sendMessages = {'wof.bizWidget.GridLayout_active':'单击','wof.bizWidget.GridLayout_render':'重绘'};
    this._meta.propertys = {
        'GridLayout':{
            'id':{prop:'id','name':'ID','type':'text','readOnly':true,'isHide':false},
            'className':{prop:'className','name':'类名','type':'text','readOnly':true,'isHide':false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'this._processAndSendParameters(message.sender.propertys);'});
    var method = 'this._receiveAndProcessParameters(message.sender.parameters);';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);
};
wof.bizWidget.spanner.GridLayoutSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _meta: null,

    _parameters: null,

    _propertys: null,

    _activeData: null,

    /**
     * get/set 属性方法定义
     */
    getMeta: function(){
        return this._meta;
    },

    setPropertys:function(propertys){
        this._propertys = propertys;
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
        if(!jQuery.isEmptyObject(this.getPropertys())){
            this.getPropertys().activeClass = 'GridLayout';
        }
        this.setActiveData(this.getPropertys());
        this.sendMessage('wof.bizWidget.spanner.GridLayoutSpanner_render');
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

    //加工并发送数据
    _processAndSendParameters:function(propertys){
        if(propertys.className=="wof.bizWidget.GridLayout"){
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
        var propertys = parameters;
        if(propertys.id==this.getPropertys().id){
            var gridLayout=wof.util.ObjectManager.get(propertys.id);
            gridLayout.setData(propertys);
            gridLayout.render();
        }
    }


};