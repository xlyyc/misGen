/**
 * @widgetClass PageComponentSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.PageComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.bizWidget.PageComponent';
    this._meta.title = '页面';
    this._meta.sendMessages = {'wof.bizWidget.PageComponentSpanner_active':'单击','wof.bizWidget.PageComponentSpanner_render':'重绘'};
    this._meta.propertys = {
        'PageComponent':{
            'id':{prop:'id','name':'ID','type':'text','readOnly':true,'isHide':false},
            'className':{prop:'className','name':'类名','type':'text','readOnly':true,'isHide':false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'this._processAndSendParameters(message.sender.propertys);'});
    var method = 'this._receiveAndProcessParameters(message.sender.propertys);';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);


    this._selectObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/selectObject.png">');
    this._deleteObjectIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/deleteObject.png">');
    this._cutIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');

};
wof.bizWidget.spanner.PageComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _meta: null,

    _parameters: null,

    _propertys: null,

    _activeData: null,

    _selectObjectIco : null,

    _deleteObjectIco : null,

    _cutIco:null,

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
        this._cutIco.remove();

        var _this = this;
        this._selectObjectIco.mousedown(function(event){
            event.stopPropagation();
            var pageComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            pageComponent.render();
            pageComponent.sendMessage('wof.bizWidget.PageComponent_active');
        });
        this._deleteObjectIco.mousedown(function(event){
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该页面吗?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '确定':function(){
                        var pageComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
                        pageComponent.removeChildren(true);
                        pageComponent.remove(true);
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
        this._cutIco.mousedown(function(event){
            event.stopPropagation();
            wof.util.GlobalObject.add('cutObjectId',_this.getPropertys().id);
        });

    },

    //----------必须实现----------
    render: function () {
        var activeData = {};
        var pageComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(pageComponent!=null){
            activeData.id = this.getPropertys().id;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;


            this._selectObjectIco.css('top','0px').css('left','0px');
            pageComponent.getDomInstance().append(this._selectObjectIco);

            this._deleteObjectIco.css('top','0px').css('left',(this._deleteObjectIco.width()+2)+'px');
            pageComponent.getDomInstance().append(this._deleteObjectIco);

            this._cutIco.css('top',0).css('left',this._deleteObjectIco.width()*2+4);
            pageComponent.getDomInstance().append(this._cutIco);

            activeData.activeClass = 'PageComponent';
        }
        this.setActiveData(activeData);
        this.sendMessage('wof.bizWidget.spanner.PageComponentSpanner_render');
    },

    //选择实现
    afterRender: function () {

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
        if(propertys.className=="wof.bizWidget.PageComponent"){
            var parameters = propertys;
            this.setParameters(parameters);
        }else{
            this.setParameters(null);
        }
        this.render();
    },

    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        var propertys = parameters;
        if(propertys.id==this.getPropertys().id){
            var pageComponent=wof.util.ObjectManager.get(data.id);
            pageComponent.setData(propertys);
            pageComponent.render();
        }
    }


};