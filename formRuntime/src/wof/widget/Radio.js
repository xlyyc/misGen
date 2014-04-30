/**
 * @widgetClass Radio class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:36
 */

wof.widget.Radio = function () {
    this._version = '1.0';

};

wof.widget.Radio.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
	_name: null,  //单选按钮的名称
    _value: null, //单选按钮的值
    _themes:null,
    _label: null, //单选按钮的文字
    //_customValidate: null,//自定义验证器
    _disabled: null, //禁用
    _checked: null, //选中

    _radio:null,
    /**
     * get/set 属性方法定义
     */

    getThemes: function () {
        return this._themes;
    },
    setThemes: function (themes) {
        this._themes = themes;
    },
    getName: function () {
        return this._name;
    },
    setName: function (name) {
        this._name = name;
    },
    getValue: function () {
        return this._value || '';
    },
    setValue: function (value) {
        this._value = value;
    },
    getValidateRule: function () {
        return this._validateRule;
    },
    
    setValidateRule: function (validate) {
        this._validateRule = validate;
    },
    getErrorMsg: function () {
        return this._errorMsg || '';
    },
    
    setErrorMsg: function (errorMsg) {
        this._errorMsg = errorMsg;
    },
    getLabel: function () {
        return this._label || '';
    },
    setLabel: function (label) {
        this._label = label;
    },
    getDisabled: function () {
        return this._disabled;
    },
    setDisabled: function (disabled) {
        this._disabled = disabled;
    },
    getRadio: function () {
        return this._radio;
    },
    setRadio: function (radio) {
        this._radio = radio;
    },  
    getChecked: function () {
        return this._checked;
    },
    setChecked: function (checked) {
        this._checked = checked;
    },
    /**
     * Render 方法定义
     */

    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },
    /**
     * Render 方法定义
     */

    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },
    _initRender: function () {
        var _this = this;
        this._radio = wis$.create('Radio');
        this._radio.onClick(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Radio_click');// 点击事件
            }
        );
        this._radio.onSelect(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Radio_select'); // 选中事件
            }
        );
        this._radio.onChange(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Radio_change'); // 改变事件
            }
        );
        this.getDomInstance().append(this._radio.getDomInstance());
    },
    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
    	 this._checkbox.setName(this.getName());
         this._checkbox.setValue(this.getValue());
         this._checkbox.setLabel(this.getLabel());
         this._checkbox.setDisabled(this.getDisabled());
         this._checkbox.setChecked(this.getChecked());
    },

    //选择实现
    _afterRender: function () {
        this._radio.render();
        this.sendMessage('wof.widget.Radio_render');
    },
    /**
     * getData/setData 方法定义
     */
    //----------必须实现----------
    getData: function () {
        return {
            name: this.getName(),
            themes:this.getThemes(),
            label: this.getLabel(),
            value: this.getValue(),
            disabled: this.getDisabled(),
            checked: this.getChecked()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setLabel(data.label);
        this.setThemes(data.themes);
        this.setValue(data.value);
        this.setDisabled(data.disabled);
        this.setChecked(data.checked);
    },
    //----------自定义实现----------
	getOptions: function () {
		return {
            name: this.getName(),
            themes:this.getThemes(),
            label: this.getLabel(),
            value: this.getValue(),
            disabled: this.getDisabled(),
            checked: this.getChecked()
        }
    },

    //----------自定义实现(进行必要的校验和默认值设置)----------
    setOptions: function (data) {
    	if (!data) {
    		return;
    	}
	    if(data.name){
			this.setName(data.name);
		}
	    if(data.themes){
	    	this.setThemes(data.themes);
	    }
        if(data.value){
    		this.setValue(data.value);
    	}
        if(data.label){
    		this.setLabel(data.label);
    	}
        if(data.disabled){
    		this.setDisabled(data.disabled);
    	}
        if(data.checked){
    		this.setChecked(data.checked);
    	}
    }
};