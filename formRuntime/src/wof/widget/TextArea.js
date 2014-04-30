/**
 * @widgetClass TextArea class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:36
 */

wof.widget.TextArea = function () {
    this._version = '1.0';

};

wof.widget.TextArea.prototype = {
	/**
     * 属性声明 （private ，用"_"标识）
     */
    _name: null,                    //名称
    _themes:null,					//文本域的样式，对应主题里面的样式名
    _value: null,                    //本框的值
    _maxLength: null,               //文本框的可输入长度，不区分中英文
    _placeholder: null,             //支持Internet Explorer9 和更早的版本。输入内容提醒
    _rows: null,                      //规定文本区内可见的行数
    _cols: null,                     //规定文本区内可见的列数
    _wrap: null,                     //自动换行

    _validateRule:null,				//语义层面的验证，如数据类型，生日，长度，中英文，邮件…
    _customValidate: null,          //自定义验证器 
    _errorMsg: null,                //验证失败信息
    
    _disabled: null,                 //规定该文本框只做展示用，提交时无法获取值
    _readonly: null,                //	规定该文本区只读。文本框不允许修改，提交时可以获取值
    
    _textarea:null, // 内部使用，底层对象
    /**
     * get/set 属性方法定义
     */
    getName: function () {
        return this._name;
    },
    setName: function (name) {
        this._name = name;
    },

    getCustomValidate: function () {
        return this._customValidate;
    },
    setCustomValidate: function (customValidate) {
        this._customValidate = customValidate;
    },
    getValidateRule: function () {
        return this._validateRule;
    },
    setValidateRule: function (customValidate) {
        this._validateRule = customValidate;
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
    getErrorMsg: function () {
        return this._errorMsg;
    },
    setErrorMsg: function (errorMsg) {
        this._errorMsg = errorMsg;
    },
  
    getRows: function () {
        return this._rows||2;
    },
    setRows: function (rows) {
        this._rows = rows;
    },

    getCols: function () {
        return this._cols||20;
    },
    setCols: function (cols) {
        this._cols = cols;
    },

    getWrap: function () {
        return this._wrap||'off';
    },
    setWrap: function (wrap) {
        this._wrap = wrap;
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
    /**
     * Render 方法定义
     */
    _initRender: function () {
        var _this = this;
        this._textarea = wis$.create('Textarea');
        this._textarea.onClick(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Textarea_click');
            }
        );
        this._textarea.onFocus(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Textarea_focus');
            }
        );
        this._textarea.onBlur(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Textarea_blur');
            }
        );
        this._textarea.onChange(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Textarea_change');
            }
        );
        this.getDomInstance().append(this._textarea.getDomInstance());
    },
    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
        this._textarea.setName(this.getName());
        //this._textarea.setValidateRule(this.getValidateRule());
        //this._textarea.setCustomValidate(this.getCustomValidate());
        //this._textarea.setErrorMsg(this.getErrorMsg());
        this._textarea.setWrap(this.getWrap());
        this._textarea.setValue(this.getValue());
        this._textarea.setMaxLength(this.getMaxLength());
        this._textarea.setPlaceholder(this.getPlaceholder());
        this._textarea.setDisabled(this.getDisabled());
        this._textarea.setReadonly(this.getReadonly());
        this._textarea.setRows(this.getRows());
        this._textarea.setCols(this.getCols());
    },

    //选择实现
    _afterRender: function () {
        this._textarea.render();
        this.sendMessage('wof.widget.Textarea_render');// TODO 消息名称？？
    },
    //----------自定义实现----------
	getOptions: function () {
		return {
            name: this.getName(),
            row:this.getRow(),
            wrap: this.getWrap(),
            themes:this.getThemes(),
            validateRule:this.getValidateRule(),
            customValidate: this.getCustomValidate(),
            errorMsg: this.getErrorMsg(),
            value: this.getValue(),
            cols: this.getCols(),
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
        if(data.placeholder){
        	this.setPlaceholder(data.placeholder);
    	}
        if(data.row){
        	this.setRow(data.row);
    	}else{
    		this.setRow(2);
    	}
        if(data.wrap){
        	 this.setWrap(data.wrap);
    	}else{
    		 this.setWrap('off');
    	}
        if(data.cols){
        	this.setCols(data.cols);
    	}else{
    		this.setCols(20);
    	}
        if(data.customValidate){
        	this.setCustomValidate(data.customValidate);
    	}
        if(data.validateRule){
        	this.setValidateRule(data.validateRule);
    	}
        if(data.errorMsg){
        	this.setErrorMsg(data.errorMsg);
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
            row:this.getRow(),
            wrap: this.getWrap(),
            themes:this.getThemes(),
            validateRule:this.getValidateRule(),
            customValidate: this.getCustomValidate(),
            errorMsg: this.getErrorMsg(),
            value: this.getValue(),
            cols: this.getCols(),
			maxLength: this.getMaxLength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly()
        }
    },
    //----------必须实现----------
    setData: function (data) {
    	if (!data) {
    		return;
    	}
    	this.setName(data.name);
		this.setThemes(data.themes);
		this.setValue(data.value);
    	this.setPlaceholder(data.placeholder);
    	this.setRow(data.row);
    	this.setRow(2);
    	this.setWrap(data.wrap);
    	this.setCols(data.cols);
    	this.setCustomValidate(data.customValidate);
    	this.setValidateRule(data.validateRule);
    	this.setErrorMsg(data.errorMsg);
    	this.setMaxLength(data.maxlength);
    	this.setDisabled(data.disabled);
        this.setReadonly(data.readonly);
    }

};