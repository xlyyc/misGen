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
    //按钮启用属性
    _disabled:null,
    //按钮图标
    _icons:null,
    //按钮文本
    _text:null,
    //是否显示按钮文本
    _textShowed: null,
    //按钮类型：button 普通，submit 提交
    _type: null ,

    _value: null,

    _bindComponents: null,

    _btn: null,

    _initFlag: null,

    /**
     * get/set 属性方法定义
     */
    getBindComponents : function (){
        return this._bindComponents || [];
    },

    setBindComponents : function (bindComponents){
        this._bindComponents = bindComponents;
    },

    getValue : function (){
        return this._value || '';
    },

    setValue : function (value){
        this._value = value;
    },

    getDisabled: function(){
        if(this._disabled == null)
            this._disabled = '';
        return this._disabled;
    },

    setDisabled: function(disabled){
        this._disabled = disabled;
    },

    getIcons: function(){
        if(this._icons ==null)
            this._icons = false;
        return this._icons ;
    },

    setIcons: function(icons){
        this._icons = icons ;
    },

    getText: function(){
        if(this._text == null)
            this._text = '';
        return this._text;
    },

    setText: function(text){
        this._text = text;
    },

    getTextShowed: function(){
        if(this._textShowed == null)
            this._textShowed = true;
        return this._textShowed;
    },

    setTextShowed: function(textShowed){
        this._textShowed = textShowed;
    },

    getType: function(){
        if(this._type == null)
            this._type = '';
        return this._type ;
    },

    setType: function(type){
        this._btnType = type;
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
                    _this.sendMessage('wof.functionWidget.CommitComponent_mousedown');
                    _this.sendMessage('wof.functionWidget.CommitComponent_active');
                },250);
            });

            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.functionWidget.CommitComponent_dblclick');
                _this.sendMessage('wof.functionWidget.CommitComponent_active');
            });

            this._btn = jQuery('<button type="'+this.getType()+'" '+this.getDisabled()+' />');
            this.getDomInstance().append(this._btn);

            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {
        this._btn.attr('value',this.getValue());
        this._btn.button(
            {
                label: this.getText() ,
                icons : {
                    primary: "ui-icon-gear" ,
                    secondary: "ui-icon-triangle-1-s"
                },
                text : this.getTextShowed()
            }
        );
        if(this.getHeight()!=null){
            this._btn.css('height',this.getHeight())
        }
        if(this.getWidth()!=null){
            this._btn.css('width',this.getWidth())
        }
    },

    //选择实现
    afterRender: function () {
        this._btn.button('refresh');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            value : this.getValue(),
            disabled: this.getDisabled() ,
            icons: this.getIcons(),
            text: this.getText(),
            textShowed: this.getTextShowed() ,
            type: this.getType(),
            bindComponents: this.getBindComponents()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setValue(data.value);
        this.setDisabled(data.disabled);
        this.setIcons(data.icons);
        this.setText(data.text);
        this.setTextShowed(data.textShowed);
        this.setType(data.type);
        this.setBindComponents(data.bindComponents)
    },

    //创建初始化的button
    createSelf: function(width, height){
        var node = new wof.functionWidget.CommitComponent();
        node.setType('submit');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(90);
        node.setHeight(30);
        node.setText('提交');
        return node;
    }

};