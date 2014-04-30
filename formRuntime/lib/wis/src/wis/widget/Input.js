/**
 * 输入框统一API
 */
wis.widget.Input = function () {
    this._version = '1.0';
};
wis.widget.Input.prototype = {

    _name: null,                    //名称
    _themes:null,					//文本框的样式，对应主题里面的样式名
    _validateRule:null,					//语义层面的验证，如数据类型，生日，长度，中英文，邮件…
    _customValidate: null,          //自定义验证器 
    _errorMsg: null,                //验证失败信息
   
    _displayType: null,            //文本的显示类型，列如：金额，美元，百分比
    _format:null,					//格式化
    _value: null,                   //本框的值
    _type: null,					//类型，如“text”，和html类型一致
    
    _disabled: null,                //规定该文本框只做展示用，提交时无法获取值
    _readonly: null,                //	规定该文本区只读。文本框不允许修改，提交时可以获取值
    _maxLength: null,               //文本框的可输入长度，不区分中英文
    _placeholder: null,             //支持Internet Explorer9 和更早的版本。输入内容提醒		
    
    _onClick: null,                 //当鼠标被单击时执行脚本
    _onBlur: null,                  //当元素失去焦点时执行脚本
    _onFocus: null,                 //当元素获得焦点时执行脚本
    _onChange: null,                //当元素改变时执行脚本

    _rootObj: null,					//底层组件节点（内部使用,不参与序列化）					
    
    getName: function () {
        return this._name;
    },
    
    setName: function (name) {
        this._name = name;
    },
    
    getThemes: function () {
        return this._themes;
    },
    
    setThemes: function (themes) {
        this._themes = themes;
    },
    
    
    getFormat: function () {
        return this._format;
    },
    
    setFormat: function (format) {
        this._format = format;
    },
    
    getType: function () {
        return this._type?this._type:'text';
    },
    
    setType: function (type) {
        this._type = type;
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
    getValue: function () {
        if(this.getDisabled()){// TODO 规定该文本框只做展示用，提交时无法获取值??
        	return null; 
        }
    	return this._value || '';
    },
    
    setValue: function (value) {
        this._value = value;
    },

    getDisplayType: function () {
        return this._displayType;
    },
    
    setDisplayType: function (displayType) {
        this._displayType = displayType;
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
        return this._disabled||false;
    },
    
    setDisabled: function (disabled) {
        this._disabled = disabled;
    },

    getReadonly: function () {
        return this._readonly||false;
    },
    
    setReadonly: function (readonly) {
        this._readonly = readonly;
    },

    onClick: function (callBack) {
        this._onClick = callBack;
    },
    
    onBlur: function (callBack) {
        this._onBlur = callBack;
    },
    onChange: function (callBack) {
        this._onChange = callBack;
    },
    
    onFocus: function (callBack) {
        this._onFocus = callBack;
    },

    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    _initRender: function () {
    	this._rootObj = jQuery('<input class="wis_input_style_default" type="'+this.getType()+'"/>');
		this._rootObj.val(this.getPlaceholder());
		this.getDomInstance().append(this._rootObj);
		this._bindEvents();
    },

    //渲染前处理方法
    _beforeRender: function () {},

    //渲染方法
    render: function () {
        //type属性不允许更改
    	//validate  customValidate 校验信息不处理，运行时调用校验器处理
        if (this.getName()) this._rootObj.attr('name', this.getName());
        this._rootObj.attr('value', this.getValue());
        if (this.getMaxLength()) this._rootObj.attr('maxlength', this.getMaxLength());
        if (this.getPlaceholder()) this._rootObj.attr('placeholder', this.getPlaceholder());
        if (this.getReadonly()!=null) this._rootObj.attr('readonly', this.getReadonly());
        if(this.getWidth()!=null) this._rootObj.css('width',this.getWidth()+'px');
        if(this.getHeight()!=null) this._rootObj.css('height',this.getHeight()+'px');
        
        //themes 
        //validate  ??
        //customValidate  ??
        //displayType  ??
        //format  ??
    },

    //渲染后处理方法
    _afterRender: function () {},

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
    	return {
            name: this.getName(),
            validateRule:this.getValidateRule(),
            customValidate: this.getCustomValidate(),
            errorMsg: this.getErrorMsg(),
            themes:this.getThemes(),
            value: this.getValue(),
            displayType: this.getDisplayType(),
            format:this.getFormat(),
			type:this.getType(),
			maxLength: this.getMaxLength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly()
        }
    },

    //----------必须实现----------
    setData: function (data) {
    	this.setName(data.name);
		this.setThemes(data.themes);
		this.setValue(data.value);
    	this.setValidateRule(data.validate);
    	this.setCustomValidate(data.customValidate);
    	this.setErrorMsg(data.errorMsg);
    	this.setFormat(data.format);
    	this.setType(data.type);
    	this.setPlaceholder(data.placeholder);
    	this.setDisplayType(data.displayType);
    	this.setMaxLength(data.maxlength);
    	this.setDisabled(data.disabled);
    	this.setReadonly(data.readonly);
    },
    //解除事件绑定,暂不需要
    _unbindEvents: function() {
		this._rootObj.off('focus');
		this._rootObj.off('blur');
		this._rootObj.off('change');
		this._rootObj.off('click');
	},
	//绑定事件
    _bindEvents: function() {	
    	var that = this;
		this._rootObj.on('focus', function(e) {
			if (that._onFocus) {
				that._onFocus(that);//参数为此事件
			}
			var value = that._rootObj.val();
			//当获取焦点且内容与提示信息相同时，清除内容
			if (value == that.getPlaceholder()) {
				that._rootObj.val('');
			}
		});

		this._rootObj.on('blur', function(e) {
			var value = that._rootObj.val();
			if (!value) that._rootObj.val(that.getPlaceholder());
			if (that._onBlur) {
				that._onBlur(that);//参数为此事件
			}
		});

		this._rootObj.on('change', function(e) {
			//参数1为文本框的当前值，参数2为未修改前的值
			var value1 = that._rootObj.val();
			that.setValue(value1);//修改值
			if (that._onChange) {
				that._onChange(that);
			}
		});

		this._rootObj.on('click',function (e) {
			if (that._onClick) {
				that._onClick(that);//参数为此事件
			}
		});
	},
	//----------自定义实现----------
	getOptions: function () {
		return {
            name: this.getName(),
            validate:this.getValidateRule(),
            themes:this.getThemes(),
            validateRule:this.getValidateRule(),
            customValidate: this.getCustomValidate(),
            errorMsg: this.getErrorMsg(),
            value: this.getValue(),
            displayType: this.getDisplayType(),
            format:this.getFormat(),
			type:this.getType(),
			maxLength: this.getMaxLength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly(),
            onclick:this._onClick,
            onblur:this._onBlur,
            onfocus:this._onFocus,
            onchange:this._onChange
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
        if(data.customValidate){
        	this.setCustomValidate(data.customValidate);
    	}
        if(data.errorMsg){
        	this.setErrorMsg(data.errorMsg);
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
        if(data.onClick&&(typeof this.onClick == "function")){
    		this.onClick(this.onClick);
    	}
        if(data.onBlur&&(typeof this.onBlur == "function")){
    		this.onBlur(his.onBlur);
    	}
        if(data.onFocus&&(typeof this.onFocus == "function")){
    		this.onFocus(this.onFocus);
    	}
        if(data.onChange&&(typeof this.onChange == "function")){
    		this.onChange(this.onChange);
    	}
    }
};