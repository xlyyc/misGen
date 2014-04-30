/**
 * @widgetClass CheckBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:34
 */

wof.widget.CheckBox = function () {
    this._version = '1.0';

};

wof.widget.CheckBox.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _name: null,  //复选框的名称
    _value: null, //复选框的值
    _themes:null,
    _label: null, //复选框的文字
    //_customValidate: null,//自定义验证器
    _disabled: null, //禁用
    _checked: null, //选中
       
    _checkbox:null,
    /**
     * get/set 属性方法定义
     */
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
    getValue: function () {
        return this._value || '';
    },

    setValue: function (value) {
        this._value = value;
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
    _initRender: function () {
        var _this = this;
        this._checkbox = wis$.create('Checkbox');
        this._checkbox.onClick(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Checkbox_click');// 点击事件
            }
        );
        this._checkbox.onSelect(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Checkbox_select'); // 选中事件
            }
        );
        this._checkbox.onChange(
            function(obj){
                _this.setValue(obj.getValue());
                _this.sendMessage('wof.widget.Checkbox_change'); // 改变事件
            }
        );
        this.getDomInstance().append(this._checkbox.getDomInstance());
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
        this._checkbox.render();
        this.sendMessage('wof.widget.Checkbox_render');
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
        }
    },
    //----------必须实现----------
    setData: function (data) {
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