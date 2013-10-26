/**
 * @bizWidgetClass VoucherGridComponent class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherGridComponent = function () {
    this._version = '1.0';


};
wof.bizWidget.VoucherGridComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _initFlag:null,

    _callStr: null,    //调用字符串，格式为 构件类型唯一识别串:构件版本，例如【VoucherGridComponent:1.0.0】

    _initActionName: null,

    _state: null,  //状态

    _caption: null,

    _bindEntityID: null,    //实体ID,Grid部件中可用到此实体及与该实体存在参照及对等关系的实体中的属性

    _index: null, //渲染位置

    _viewType: null, //展现方式,NOMAL  正常（默认），垂直展示，没有特殊样式      GROUP  分组展示  垂直展示，支持收缩 TAB  完全tab展示 HEAD_TAB 不完全tab 支持一个head单独展示，其他在一个tab组中展示

    /**
     * get/set 属性方法定义
     */
    getCallStr: function(){
        return this._callStr;
    },

    setCallStr: function(callStr){
        this._callStr = callStr;
    },

    getInitActionName: function(){
        return this._initActionName;
    },

    setInitActionName: function(initActionName){
        this._initActionName = initActionName;
    },

    getState: function(){
        return this._state;
    },

    setState: function(state){
        this._state = state;
    },

    getCaption: function(){
        return this._caption;
    },

    setCaption: function(caption){
        this._caption = caption;
    },

    getBindEntityID: function(){
        return this._bindEntityID;
    },

    setBindEntityID: function(bindEntityID){
        this._bindEntityID = bindEntityID;
    },

    getViewType: function(){
        return this._viewType;
    },

    setViewType: function(viewType){
        this._viewType = viewType;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },



    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag==null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.VoucherGridComponent_mousedown');
                    _this.sendMessage('wof.bizWidget.VoucherGridComponent_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.bizWidget.VoucherGridComponent_dblclick');
                _this.sendMessage('wof.bizWidget.VoucherGridComponent_active');
            });
            this._initFlag = true;

            //todo 需要删除
            this.getDomInstance().append(jQuery('<span style="position:absolute;top:20px;left:20px;">表体列表 待实现</span>'));
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {

        this.sendMessage('wof.bizWidget.VoucherGridComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            callStr:this.getCallStr(),
            initActionName:this.getInitActionName(),
            state:this.getState(),
            caption:this.getCaption(),
            bindEntityID:this.getBindEntityID(),
            index:this.getIndex(),
            viewType:this.getViewType()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.getCallStr(data.callStr);
        this.getInitActionName(data.initActionName);
        this.getState(data.state);
        this.getCaption(data.caption);
        this.getBindEntityID(data.bindEntityID);
        this.getIndex(data.index);
        this.getViewType(data.viewType);
    },

    //创建初始化的VoucherGridComponent
    createSelf: function(width, height){
        var node = new wof.bizWidget.VoucherGridComponent();
        node.setWidth(width);
        node.setHeight(height-25);
        node.setTop(0);
        node.setLeft(0);
        return node;
    }



};