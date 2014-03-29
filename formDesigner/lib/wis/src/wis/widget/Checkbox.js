/**
 *
 *
 *
 */
wis.widget.Checkbox = function () {
    this._version = '1.0';

};
wis.widget.Checkbox.prototype = {

    _cid: null,  //复选框的id
    _name: null,  //复选框的名称
    _value: null, //复选框的值
    _themes:null,
    _label: null, //复选框的文字
    _customValidate: null,//自定义验证器
    _disabled: null, //禁用
    _checked: null, //选中

    _rootObj: null,
    _labelObj: null,
    _inputObj: null,
    _linkObj: null,
    _spanObj: null,

    _onClick: null,
    _onChange: null,
    _onSelect: null,

    getCid: function () {
        return this._cid|| this.getId();
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
    getThemes: function () {
        return this._themes;
    },
    setThemes: function (themes) {
        this._themes = themes;
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

    onClick: function (callBack) {
        this._onClick = callBack;
    },
    onChange: function (callBack) {
        this._onChange = callBack;
    },
    onSelect: function (callBack) {
        this._onSelect = callBack;
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
        this._rootObj = $('<div></div>'); //1. 根节点
        this._labelObj = $('<label class="ui_checkbox"></label>');// 2. Label节点
        this._inputObj = $('<input type="checkbox"/>');// 3. 复选框节点
        this._linkObj = $('<a class="checkbox_text"/>'); // 4. 显示内容节点
        this._spanObj = $('<span></span>'); // Span节点
        this._labelObj.append(this._inputObj).append(this._linkObj);
        this._rootObj.append(this._labelObj).append(this._spanObj);
        this.getDomInstance().append(this._rootObj.children());
        
        this._bindEvents();
        if (this.getCid()) this._labelObj.attr('id', this.getCid());//也可不配置
    }, 
    //渲染前处理方法
    beforeRender: function (){},

    //渲染方法
    render: function () {
        if (this.getName()) this._inputObj.attr('name', this.getName());
        if (this.getValue()) this._inputObj.val(this.getValue());
        if (this.getLabel()) this._spanObj.html(this.getLabel());
        //disabled状态
        if (this.getDisabled()) {
            this._inputObj.attr("disabled", "disabled");
            this._labelObj.addClass("ui_checkbox_disabled");
        } else {
            this._inputObj.removeAttr("disabled");
            this._labelObj.removeClass("ui_checkbox_disabled");
        }
        //checked状态
        if (this.getChecked()) {
            this._inputObj.attr("checked", "checked");
            this._labelObj.addClass("ui_checkbox_checked");
        } else {
            this._inputObj.removeAttr("checked");
            this._labelObj.removeClass("ui_checkbox_checked");
        }
    },

    //渲染后处理方法
    afterRender: function () {},

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid(),
            name: this.getName(),
            customValidate: this.getCustomValidate(),
            value: this.getValue(),
            disabled: this.getDisabled(),
            checked: this.getChecked()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setName(data.name);
        this.setLabel(data.label);
        this.setCustomValidate(data.customValidate);
        this.setValue(data.value);
        this.setDisabled(data.disabled);
        this.setChecked(data.checked);
    },
    // 解除事件绑定
    _unbindEvents: function(){
		this._linkObj.off('click');
		this._linkObj.off('change');
	},
	//绑定事件
    _bindEvents: function () {
        //单击事件
        var that = this;
        this._linkObj.on("click", function (e) {
        	var checked = that._inputObj.attr('checked');//是否选中
        	//disabled状态不处理
            if (that._labelObj.hasClass("ui_checkbox_disabled")) {
                return;
            }
            if (that._labelObj.hasClass("ui_checkbox_checked")) {
                that._labelObj.removeClass("ui_checkbox_checked");
                that._inputObj.removeAttr("checked");
            } else {
                that._labelObj.addClass("ui_checkbox_checked");
                that._inputObj.attr("checked", "checked");
            }
            //自定义onClick事件
            if ((typeof that._onClick == "function") && that._onClick!=null) {
                that._onClick(this);
            }
            //自定义onSelect事件
            if ((typeof that._onSelect == "function") && that._labelObj.hasClass("ui_checkbox_checked") && that._onSelect() == false) {
            	if(checked&&that.getChecked()){//选中时才执行
            		that._onSelect(this);
            	}
            }
            that.setChecked(checked);
        });
        this._linkObj.on('change',function(e) {
			var value = that._inputObj.val();
			that.setValue(value);
			if (that._onChange) {
				that._onChange(this);
			}
		});
    },
    //----------自定义实现----------
	getOptions: function () {
		return {
            cid: this.getCid(),
            name: this.getName(),
            customValidate: this.getCustomValidate(),
            themes:this.getThemes(),
            label: this.getLabel(),
            value: this.getValue(),
            disabled: this.getDisabled(),
            checked: this.getChecked(),
            onclick:this._onClick,
            onchange:this._onChange,
            onselect:this._onSelect
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
        if(data.label){
    		this.setLabel(data.label);
    	}
        if(data.customValidate){
    		this.setCustomValidate(data.customValidate);
    	}
        if(data.disabled){
    		this.setDisabled(data.disabled);
    	}
        if(data.checked){
    		this.setChecked(data.checked);
    	}
        if(data.onclick){
    		this.onClick(data.onclick);
    	}
        if(data.onchange){
    		this.onChange(data.onchange);
    	}
        if(data.onselect){
    		this.onSelect(data.onselect);
    	}
    }

};