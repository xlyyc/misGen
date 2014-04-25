/**
 * @widgetClass Label class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:54
 */

wof.widget.Label = function () {
    this._version = '1.0';

};

wof.widget.Label.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _text:null,

    _isUnderline:null, //是否包括下划线

    _isBold:null, //是否需要加粗

    _isHighlight:null, //是否需要高亮

    _value: null,

    _type: null,

    _tip: null,

    _ico: null,

    _label:null,

    /**
     * get/set 属性方法定义
     */
    getTip : function (){
        return this._tip || '';
    },

    setTip : function (tip){
        this._tip = tip;
    },

    getIco : function (){
        return this._ico || '';
    },

    setIco : function (ico){
        this._ico = ico;
    },


    getValue : function (){
        return this._value || '';
    },

    setValue : function (value){
        this._value = value;
    },

    getType : function (){
        return this._type || '';
    },

    setType : function (type){
        this._type = type;
    },

	 getText: function(){
        return this._text || '';
	 },
	 
	 setText: function(text){
        this._text = text;
	 },

    getIsUnderline: function(){
        return this._isUnderline || false;
    },

    setIsUnderline: function(isUnderline){
        this._isUnderline = isUnderline;
    },

    getIsBold: function(){
        return this._isBold || false;
    },

    setIsBold: function(isBold){
        this._isBold = isBold;
    },

    getIsHighlight: function(){
        return this._isHighlight || false;
    },

    setIsHighlight: function(isHighlight){
        this._isHighlight = isHighlight;
    },


    /**
     * Render 方法定义
     */
    initRender: function(){
        var label = wis$.create('Label');
        label.appendTo(this.getDomInstance());

        this._label = label;
    },

    //选择实现
    beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        if(this.getWidth()!=null){
            this._label.setWidth(this.getWidth());
        }
        this._label.setIsUnderline(this.getIsUnderline());
        this._label.setText(this.getText());
        this._label.setIsBold(this.getIsBold());
        this._label.setIsHighlight(this.getIsHighlight());
        this._label.setIco(this.getIco());
        this._label.render();
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            ico: this.getIco(),
            value : this.getValue(),
			text: this.getText(),
            isUnderline: this.getIsUnderline(),
            isBold: this.getIsBold(),
            isHighlight: this.getIsHighlight(),
            type: this.getType(),
            tip: this.getTip()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setIco(data.ico);
        this.setValue(data.value);
		this.setText(data.text);
        this.setIsUnderline(data.isUnderline);
        this.setIsBold(data.isBold);
        this.setIsHighlight(data.isHighlight);
        this.setType(data.type);
        this.setTip(data.tip);
    }

};