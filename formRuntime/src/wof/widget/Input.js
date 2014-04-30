/**
 * @widgetClass Input class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午2:07
 */

wof.widget.Input = function () {
    this._version = '1.0';

};

wof.widget.Input.prototype = {

    _name: null,                    //名称
    _validateRule:null,					//语义层面的验证，如数据类型，生日，长度，中英文，邮件…
    _customValidate: null,          //自定义验证器
    _errorMsg: null,                //验证失败信息

    _displayType: null,            //文本的显示类型，列如：金额，美元，百分比
    _format:null,					//格式化
    _value: null,                   //本框的值
    _type: null,					//类型，如“text”，和html类型一致

    _disabled: null,                 //规定该文本框只做展示用，提交时无法获取值
    _readonly: null,                //	规定该文本区只读。文本框不允许修改，提交时可以获取值
    _maxLength: null,               //文本框的可输入长度，不区分中英文
    _placeholder: null,             //支持Internet Explorer9 和更早的版本。输入内容提醒

    _input: null,


    getName: function () {
        return this._name;
    },
    setName: function (name) {
        this._name = name;
    },
    getValidateRule: function () {
        return this._validateRule;
    },
    setValidateRule: function (validate) {
        this._validateRule = validate;
    },
    getCustomValidate: function () {
        return this._customValidate;
    },
    setCustomValidate: function (customValidate) {
        this._customValidate = customValidate;
    },
    getErrorMsg: function () {
        return this._errorMsg || '';
    },
    setErrorMsg: function (errorMsg) {
        this._errorMsg = errorMsg;
    },
    getDisplayType: function () {
        return this._displayType;
    },
    setDisplayType: function (displayType) {
        this._displayType = displayType;
    },
    getFormat: function () {
        return this._format;
    },
    setFormat: function (format) {
        this._format = format;
    },
    getType: function () {
        return this._type;
    },
    setType: function (type) {
        this._type = type;
    },
    getValue: function () {
        return this._value || '';
    },
    setValue: function (value) {
        this._value = value;
    },
    getMaxLength: function () {
        return this._maxLength;
    },
    setMaxLength: function (maxLength) {
        this._maxLength = maxLength;
    },
    getPlaceholder: function () {
        return this._placeholder;
    },
    setPlaceholder: function (placeholder) {
        this._placeholder = placeholder;
    },
    getDisabled: function () {
        return this._disabled;
    },
    setDisabled: function (disabled) {
        this._disabled = disabled;
    },
    getReadonly: function () {
        return this._readonly;
    },
    setReadonly: function (readonly) {
        this._readonly = readonly;
    },
    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },
    _initRender: function () {
        var _this = this;
        this._input = wis$.create('Input');
        this._input.onClick(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Input_click');
            }
        );
        this._input.onFocus(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Input_focus');
            }
        );
        this._input.onBlur(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Input_blur');
            }
        );
        this._input.onChange(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Input_change');
            }
        );
        this.getDomInstance().append(this._input.getDomInstance());
    },
    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
        this._input.setName(this.getName());
        //this._input.setValidateRule(this.getValidateRule());
        //this._input.setCustomValidate(this.getCustomValidate());
        //this._input.setErrorMsg(this.getErrorMsg());
        this._input.setDisplayType(this.getDisplayType());
        this._input.setFormat(this.getFormat());
        this._input.setType(this.getType());
        this._input.setValue(this.getValue());
        this._input.setMaxLength(this.getMaxLength());
        this._input.setPlaceholder(this.getPlaceholder());
        this._input.setDisabled(this.getDisabled());
        this._input.setReadonly(this.getReadonly());
        this._input.setWidth(this.getWidth());
        this._input.setHeight(this.getHeight());

    },
    
    //选择实现
    _afterRender: function () {
        this._input.render();
        this.sendMessage('wof.widget.Input_render');
    },
    //----------自定义实现----------
	getOptions: function () {
		return {
            cid: this.getCid(),
            name: this.getName(),
            validateRule:this.getValidateRule(),
            themes:this.getThemes(),
            customValidate: this.getCustomValidate(),
            value: this.getValue(),
            errorMsg: this.getErrorMsg(),
            displayType: this.getDisplayType(),
            format:this.getFormat(),
			type:this.getType(),
			maxLength: this.getMaxLength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly()
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
        if(data.validateRule){
        	this.setValidateRule(data.validateRule);
    	}
        if(data.format){
        	this.setFormat(data.format);
    	}
        if(data.type){
        	this.setType(data.type);
    	}else{
    		this.setType("text");
    	}
        if(data.placeholder){
        	this.setPlaceholder(data.placeholder);
    	}
        if(data.customValidate){
        	this.setCustomValidate(data.customValidate);
    	}
        if(data.errorMsg){
        	this.setErrorMsg(data.errorMsg);
    	}
        if(data.displayType){
        	this.setDisplayType(data.displayType);
    	} 
        if(data.maxlength){
        	this.setMaxLength(data.maxlength);
    	}
        if(data.disabled){
        	this.setDisabled(data.disabled);
    	}
        if(data.readonly){
        	this.setReadonly(data.readonly);
    	}
    },
    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name: this.getName(),
            validateRule:this.getValidateRule(),
            customValidate: this.getCustomValidate(),
            value: this.getValue(),
            errorMsg: this.getErrorMsg(),
            displayType: this.getDisplayType(),
            format:this.getFormat(),
            type:this.getType(),
            maxLength: this.getMaxLength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setValue(data.value);
        this.setValidateRule(data.validate);
        this.setFormat(data.format);
        this.setType(data.type);
        this.setPlaceholder(data.placeholder);
        this.setCustomValidate(data.customValidate);
        this.setErrorMsg(data.errorMsg);
        this.setDisplayType(data.displayType);
        this.setMaxLength(data.maxlength);
        this.setDisabled(data.disabled);
        this.setReadonly(data.readonly);
    }

};