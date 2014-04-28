/**
 * @widgetClass Button class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.widget.Button = function () {
    this._version = '1.0';

};

wof.widget.Button.prototype = {

    _btn: null, 

    /**
     * 属性声明 （private ，用"_"标识）
     */
    _name: null,            //名称
    _label: null,           //文字
    _icon: null,            //语义层面的ICON标识，对应图标的类型(add/edit)、颜色(white/black)、位置属性(position:left/right/top/bottom)
    _themes: null,          //对应主题里面的样式名
    _disabled: null,        //禁用
    _onClick: null,         //单击回调

    /**
     * get/set 属性方法定义
     */

    getName: function () {
        return this._name;
    },

    setName: function (name) {
        this._name = name;
    },

    getLabel: function () {
        return this._label || '';
    },

    setLabel: function (label) {
        this._label = label;
    },

    getIcon: function () {
        return this._icon;
    },

    setIcon: function (icon) {
        this._icon = icon;
    },

    getDisabled: function () {
        return this._disabled == null ? false : this._disabled ;
    },

    setDisabled: function (disabled) {
        this._disabled = ( typeof disabled ) === "boolean" ? disabled  : false ;
    },

    onClick: function (callBack) {
        this._onClick = callBack;
    },
    

    /**
     * Render 方法定义
     */

    _initRender: function(){
        this._btn = wis$.create('Button');
        
        //setDate
        this._btn.setData({
            name:  this.getName(),
            label: this.getLabel(),
            icon: this.getIcon(),
            disabled: this.getDisabled()
        });

        var that = this;
        this._btn.onClick(function(buttonObj){
            that._onClick && that._onClick(that);
            that.sendMessage('wof.widget.Button_onclick');
        });

        //initrender
        this._btn.render();
        //append  to page
        this.getDomInstance().append(this._btn.getDomInstance());
    },

    //选择实现
    _beforeRender: function () {
        
    },

    //----------必须实现----------
    render: function () {

        this._btn.setData({
            name:  this.getName(),
            label: this.getLabel(),
            icon: this.getIcon(),
            disabled: this.getDisabled()
        });

        this._btn.render();
    },

    //选择实现
    _afterRender: function () {

        this.sendMessage('wof.widget.Button_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name: this.getName(),
            label: this.getLabel(),
            icon: this.getIcon(),
            disabled: this.getDisabled()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setLabel(data.label);
        this.setIcon(data.icon);
        this.setDisabled(data.disabled);
    },

    //创建初始化的button
    createSelf: function(width, height){
        var node = wof$.create('Button');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(width/2);
        node.setHeight(height/2);
        node.setLabel('未命名');
        return node;
    }

};