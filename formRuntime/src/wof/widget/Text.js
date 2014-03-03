/**
 * @widgetClass Text class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午2:07
 */

wof.widget.Text = function () {
    this._version = '1.0';

};

wof.widget.Text.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    //Text对象名称
    _name: null,

    _displayType : null , //展示形式（预制）：普通 base 、只读 readOnly 、带下划线的只读 readUnderLine

    _value: null,

    _initFlag: null,

    _tip: null,

    _text: null,

    /**
     * get/set 属性方法定义
     */
    getName: function(){
        if(this._name==null)
            this._name = '';
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },

    getDisplayType:function(){
        if(this._displayType==null)
            this._displayType = 'base';
        return this._displayType;
    },

    setDisplayType: function(displayType){
        this._displayType = displayType;
    },

    getWidth: function(){
        if(this._width==null){
            this._width = 120;
        }
        return this._width;
    },

    getHeight: function(){
        if(this._height==null){
            this._height = 25;
        }
        return this._height;
    },

    getValue : function (){
        return this._value || '';
    },

    setValue : function (value){
        this._value = value;
    },

    getTip : function (){
        return this._tip || '';
    },

    setTip : function (tip){
        this._tip = tip;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag == null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.widget.Text_mousedown');
                    _this.sendMessage('wof.widget.Text_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.widget.Text_dblclick');
                _this.sendMessage('wof.widget.Text_active');
            });

            this._text = jQuery('<input type="text">');
            this.getDomInstance().append(this._text);

            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {
        if(this.getDisplayType()=='base'){
            this._text.removeAttr('readonly');
        }else{
            this._text.attr('readonly', 'readonly');
        }
        this._text.attr('title',this.getTip());
        this._text.css('width',this.getWidth()+'px').css('height',this.getHeight()+'px');
        this._text.val(this.getValue());

    },

    //选择实现
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name : this.getName(),
            displayType : this.getDisplayType(),
            value: this.getValue(),
            tip: this.getTip()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setDisplayType(data.displayType);
        this.setValue(data.value);
        this.setTip(data.tip);
    }

};