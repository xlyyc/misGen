/**
 *
 *
 *
 */
wis.widget.Text = function () {
    this._version = '1.0';

};
wis.widget.Text.prototype = {

    _cid: null,  //文本框id
    _name:null,  //文本框的名称
    _validate:null,  //预定义验证，如数据类型，生日，长度，中英文，邮件…
    _customValidate:null,  //自定义验证器,实现一个通用的验证规则
    _displayType:null, //文本的显示类型，列如：金额，美元，百分比
    _format: null, //格式化显示定义字符
    _value:null, //文本框的值
    _type:null, //文本框的类型，和html类型一致
    _disabled:null, //规定该文本框只做展示用，提交时无法获取值
    _readonly:null, //规定该文本区只读。文本框不允许修改，提交时可以获取值
    _maxlength:null, //文本框的可输入长度，不区分中英文
    _placeholder:null, //输入内容提醒

    _input:null,

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

    getValidate: function () {
        return this._validate;
    },

    setValidate: function (validate) {
        this._validate = validate;
    },

    getCustomValidate: function () {
        return this._customValidate;
    },

    setCustomValidate: function (customValidate) {
        this._customValidate = customValidate;
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

    getValue: function () {
        return this._value || '';
    },

    setValue: function (value) {
        this._value = value;
    },

    getType: function () {
        return this._type;
    },

    setType: function (type) {
        this._type = type;
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

    getMaxlength: function () {
        return this._maxlength;
    },

    setMaxlength: function (maxlength) {
        this._maxlength = maxlength;
    },

    getPlaceholder: function () {
        return this._placeholder;
    },

    setPlaceholder: function (placeholder) {
        this._placeholder = placeholder;
    },

    /**
     * 初始化方法
     */
    _init:function(data){

    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    _initRender: function(){
        this._input = jQuery('<input type="text">');
        this.getDomInstance().append(this._input);
    },

    //渲染前处理方法
    _beforeRender: function () {

    },

    //渲染方法
    render: function () {

        this._input.attr('name',this.getName());
        this._input.attr('value',this.getValue());

    },

    //渲染后处理方法
    _afterRender: function () {


    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid(),
            name:this.getName(),
            validate:this.getValidate(),
            customValidate:this.getCustomValidate(),
            displayType:this.getDisplayType(),
            format:this.getFormat(),
            value:this.getValue(),
            type:this.getType(),
            disabled:this.getDisabled(),
            readonly:this.getReadonly(),
            maxlength:this.getMaxlength(),
            placeholder:this.getPlaceholder()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setName(data.name);
        this.setValidate(data.validate);
        this.setCustomValidate(data.customValidate);
        this.setDisplayType(data.displayType);
        this.setFormat(data.format);
        this.setValue(data.value);
        this.setType(data.type);
        this.setDisabled(data.disabled);
        this.setReadonly(data.readonly);
        this.setMaxlength(data.maxlength);
        this.setPlaceholder(data.placeholder);
    }

};