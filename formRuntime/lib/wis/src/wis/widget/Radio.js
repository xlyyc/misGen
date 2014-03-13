/**
 *
 *
 *
 */
wis.widget.Radio = function () {
    this._version = '1.0';

};
wis.widget.Checkbox.prototype = {

    _cid: null,  //radio的id
    _name: null,  //radio的名称
    _value: null, //radio的值
    _label: null, //radio的文字
    _customValidate: null,    //自定义验证器
    _disabled: null, //禁用
    _checked: null, //选中


    _onClick: null,
    _onSelect: null,

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

    onSelect: function (callBack) {
        this._onSelect = callBack;
    },

    /**
     * 初始化方法
     */
    _init: function (data) {

    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    initRender: function () {

    },

    _bindEvents: function () {

    },

    //渲染前处理方法
    beforeRender: function () {

    },

    //渲染方法
    render: function () {


    },

    //渲染后处理方法
    afterRender: function () {


    },

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
    }

};