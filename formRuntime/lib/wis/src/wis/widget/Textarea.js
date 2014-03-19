/**
 *
 *
 *
 */
wis.widget.Textarea = function () {
    this._version = '1.0';

};
wis.widget.Textarea.prototype = {

    _cid: null,                     //id
    _name: null,                    //名称
    _themes:null,					//文本域的样式，对应主题里面的样式名
    _value: null,                    //本框的值
    _maxLength: null,               //文本框的可输入长度，不区分中英文
    _placeholder: null,             //支持Internet Explorer9 和更早的版本。输入内容提醒
    _rows: 2,                      //规定文本区内可见的行数
    _cols: 20,                     //规定文本区内可见的列数
    _wrap: 'off',                     //自动换行

    _customValidate: null,          //自定义验证器
    _disabled: null,                 //规定该文本框只做展示用，提交时无法获取值
    _readonly: null,                //	规定该文本区只读。文本框不允许修改，提交时可以获取值

    _onClick: null,                 //当鼠标被单击时执行脚本
    _onBlur: null,                  //当元素失去焦点时执行脚本
    _onFocus: null,                 //当元素获得焦点时执行脚本
    _onChange: null,                //当元素改变时执行脚本

    _root:null,//底层组件对象
    
    getCid: function () {
        return this._cid;
    },
    setCid: function (cid) {
        this._cid = cid;
    },
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

    getRows: function () {
        return this._rows;
    },
    setRows: function (rows) {
        this._rows = rows;
    },

    getCols: function () {
        return this._cols;
    },
    setCols: function (cols) {
        this._cols = cols;
    },

    getWrap: function () {
        return this._wrap;
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

    onClick: function (callBack) {
        this._onClick = callBack;
    },
    onBlur: function (callBack) {
        this._onBlur = callBack;
    },
    onChange: function (callBack) {
        this._change = callBack;
    },
    onFocus: function (callBack) {
        this._focus = callBack;
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
    initRender: function () {
    	this._root = $('<textarea />');
		this._root.val(this.getPlaceholder());
		this.getDomInstance().append(this._root);
    },
    //渲染前处理方法
    beforeRender: function (){},

    //渲染方法
    render: function () {
    	if (this.getCid()) this._root.attr('id', this.getCid());
		if (this.getName()) this._root.attr('name',this.getName());
		if (this.getDisabled()) this._root.attr('disabled',this.getDisabled());
		if (this.getValue()) this._root.attr('value',this.getValue());
		if (this.getReadonly()) this._root.attr('readonly',this.getReadonly());
		if (this.getRows()) this._root.attr('rows',this.getRows());
		if (this.getCols()) this._root.attr('cols',this.getCols());
		if (this.getWrap()) this._root.attr('wrap',this.getWrap());
		
		//themes
		//wrap
		//maxlength
		this._unbindEvents();
		this._bindEvents();
    },

    //渲染后处理方法
    afterRender: function (){},

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
    	return {
            cid: this.getCid(),
            name: this.getName(),
            row:this.getRow(),
            cols: this.getCols(),
            wrap: this.getWrap(),
            themes:this.getThemes(),
            customValidate: this.getCustomValidate(),
            value: this.getValue(),
			maxLength: this.getMaxLength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly(),
            //方法
            onclick:this._onClick,
            onblur:this._onBlur,
            onfocus:this._onFocus,
            onchange:this._onChange
        }
    },

    //----------必须实现----------
    setData: function (data) {
    	if (!data) {
    		return;
    	}
        this.setCid(data.cid);
        this.setName(data.name);
		this.setThemes(data.themes);
		this.setValue(data.value);
    	this.setPlaceholder(data.placeholder);
    	this.setRow(data.row);
    	this.setCols(data.cols);
    	this.setCustomValidate(data.customValidate);
    	this.setMaxLength(data.maxlength);
    	this.setWrap(data.wrap);
    	this.setDisabled(data.disabled);
    	this.setReadonly(data.readonly);
        // 方法
    	this.onClick(this.onClick);
    	this.onBlur(his.onBlur);
    	this.onFocus(this.onFocus);
    	this.onChange(this.onChange);
    },
    //解除事件绑定
    _unbindEvents: function() {
		this._root.off('focus');
		this._root.off('blur');
		this._root.off('change');
		this._root.off('click');
	},
	//绑定事件
    _bindEvents: function() {
		var that = this;
		this._root.on('focus', function(e) {
			if (that._onFocus) {
				that._onFocus(e);
			}
			var value = that._root.val();
			//提示信息清空
			if (value == that.getPlaceholder()) {
				that._root.val('');
			}
		});

		this._root.on('blur', function(e) {
			if (that._onBlur) {
				that._onBlur(e);
			}

			var value = that._root.val();
			if (!value) that._root.val(that._option.placeholder);
		});

		this._root.on('change',function(e) {
			var value = that._root.val();

			var handler = that._onChange;
			if (handler) {
				handler(value);
			}
			that.text = value;
		});

		this._root.on('click', function(e) {
			if (that._onClick) {
				that._onClick(e);
			}
		});
	},
	//----------自定义实现----------
	getOptions: function () {
		return {
            cid: this.getCid(),
            name: this.getName(),
            row:this.getRow(),
            wrap: this.getWrap(),
            themes:this.getThemes(),
            customValidate: this.getCustomValidate(),
            value: this.getValue(),
            cols: this.getCols(),
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
        if(data.cid){
    		this.setCid(data.cid);
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