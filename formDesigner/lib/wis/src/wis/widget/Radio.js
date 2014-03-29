/**
 *
 *
 *
 */
wis.widget.Radio = function () {
    this._version = '1.0';

};
wis.widget.Radio.prototype = {

    _cid: null,  //单选按钮的id
    _name: null,  //单选按钮的名称
    _value: null, //单选按钮的值
    _themes:null,
    _label: null, //单选按钮的文字
    _customValidate: null,//自定义验证器
    _disabled: null, //禁用
    _checked: null, //选中
    
    _radio:null, // 底层组件对象
    _root:null, // 组件节点
    
    _onClick: null, //点击事件
    _onChange: null, //修改事件
    _onSelect: null,// 选中事件

    getCid: function () {
        return this._cid;
    },
    setCid: function (cid) {
        this._cid = cid|| this.getId();
    },
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
    	this._radio = $('<input type="radio"/>');
		this._root = $('<label></label>').append(this._radio);
        this.getDomInstance().append(this._root);
        if(this.getCid()){
    		this._radio.attr('id', getCid()); //也可不配置
        }
		this._bindEvents();
    },

    //渲染前处理方法
    beforeRender: function () {},

    //渲染方法
    render: function () {
    	if(this.getCid()){
    		this._radio.attr('id', getCid());
        }
        if(this.getName()){
        	this._radio.attr('name', this.getName());
        }
        if(this.getValue()){
        	this._radio.val(this.getValue());
        }
        if(this.getLabel()){
        	this._root.empty();
			this._root.append(this._radio).append(this.getLabel());
        }
        if(this.getDisabled()){
        	this._radio.attr('disabled', this.getDisabled());
        }
        if(this.getChecked()){
    		options.checked = this.getChecked();
        }
        /*TODO 校验暂时不加
         * if(this.getCustomValidate()){
    		options.cid = this.getCustomValidate();
        },*/
       	
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
            themes:this.getThemes(),
            label: this.getLabel(),
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
        this.setThemes(data.themes);
        this.setCustomValidate(data.customValidate);
        this.setValue(data.value);
        this.setDisabled(data.disabled);
        this.setChecked(data.checked);
    },
    // 解除事件绑定
    _unbindEvents: function(){
		this._radio.off('click');
		this._radio.off('change');
	},
    // 绑定事件
    _bindEvents: function(){
		var that = this;
		this._radio.on('click',function(e) {
			var checked = that._radio.attr('checked');//是否选中
			if (checked && that.getChecked()&&that._onSelect) {
				that._onSelect(this);//选中事件
			}
			if (that._onClick) {
				that._onClick(this);//点击事件
			}
			that.setChecked(checked);
		});
		this._radio.on('change',function(e) {
			var value = that._radio.val();
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