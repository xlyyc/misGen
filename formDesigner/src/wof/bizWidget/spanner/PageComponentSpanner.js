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
    onReceiveMessage.push({id:'wof.bizWidget.PageComponent_active',method:'this._receivePropertysAndRenderSelf(message.sender);'});

    var method = 'this._receiveAndProcessParameters(message.sender.parameters);';
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

    _propertys: null,

    _parameters: null,

    _selectObjectIco : null,

    _deleteObjectIco : null,

    _cutIco:null,

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
        var parameters = {};
        var pageComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(pageComponent!=null){
            parameters.id = this.getPropertys().id;
            parameters.className = this.getPropertys().className;
            parameters.onReceiveMessage = this.getPropertys().onReceiveMessage;
            parameters.onSendMessage = this.getPropertys().onSendMessage;


            this._selectObjectIco.css('top','0px').css('left','0px');
            pageComponent.getDomInstance().append(this._selectObjectIco);

            this._deleteObjectIco.css('top','0px').css('left',(this._deleteObjectIco.width()+2)+'px');
            pageComponent.getDomInstance().append(this._deleteObjectIco);

            this._cutIco.css('top',0).css('left',this._deleteObjectIco.width()*2+4);
            pageComponent.getDomInstance().append(this._cutIco);

            parameters.activeClass = 'PageComponent';
        }
        this.setParameters(parameters);
        this.sendMessage('wof.bizWidget.spanner.PageComponentSpanner_render');
    },

    //选择实现
    _afterRender: function () {

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

    //加工并发送数据
    _receivePropertysAndRenderSelf:function(propertys){
        this.setPropertys(propertys);
        this.render();
    },

    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        if(parameters.id==this.getPropertys().id){
            var pageComponent=wof.util.ObjectManager.get(data.id);
            pageComponent.setData(parameters);
            pageComponent.render();
        }
    }


};