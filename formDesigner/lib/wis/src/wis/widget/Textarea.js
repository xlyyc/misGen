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
    _errorMsg: null,                //验证失败信息
    _displayType: null,            //文本的显示类型，列如：金额，美元，百分比
    _value: null,                    //本框的值
    _maxLength: null,               //文本框的可输入长度，不区分中英文
    _placeholder: null,             //支持Internet Explorer9 和更早的版本。输入内容提醒
    _rows: null,                      //规定文本区内可见的行数
    _cols: null,                     //规定文本区内可见的列数
    _wrap: null,                     //自动换行

    _customValidate: null,          //自定义验证器
    _disabled: null,                 //规定该文本框只做展示用，提交时无法获取值
    _readonly: null,                //	规定该文本区只读。文本框不允许修改，提交时可以获取值

    _onClick: null,                 //当鼠标被单击时执行脚本
    _onBlur: null,                  //当元素失去焦点时执行脚本
    _onFocus: null,                 //当元素获得焦点时执行脚本
    _onChange: null,                //当元素改变时执行脚本

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

    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    initRender: function () {
        var that = this;
        var textarea = $.loveyInput.create({
            cid: this.getCid(),
            name: this.getName(),
            customValidate: this.getCustomValidate(),
            value: this.getValue(),
            errorMsg: this.getErrorMsg(),
            displayType: this.getDisplayType(),
            //  maxLength: this.getMaxlength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly(),
            rows: this.getRows(),
            cols: this.getCols(),
            warp: this.getWrap(),

            onchange: function (e) {
                typeof that._onChange == "function" ? that._onChange() : null
            },
            onclick: function (e) {
                typeof that._onClick == "function" ? that._onClick() : null
            },
            onblur: function (e) {
                typeof that._onBlur == "function" ? that._onBlur() : null
            },
            onfocus: function (e) {
                typeof that._onFocus == "function" ? that._onFocus() : null
            }
        });
        $('#container').append(textarea.root);
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
            errorMsg: this.getErrorMsg(),
            displayType: this.getDisplayType(),
            maxLength: this.getMaxlength(),
            placeholder: this.getPlaceholder(),
            disabled: this.getDisabled(),
            readonly: this.getReadonly()
        }
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setName(data.name);
        this.setCustomValidate(data.customValidate);
        this.setValue(data.value);
        this.setErrorMsg(data.errorMsg);
        this.setDisplayType(data.displayType);
        this.setMaxlength(data.maxLength);
        this.setPlaceholder(data.placeholder);
        this.setDisabled(data.disabled);
        this.setReadonly(data.readonly);
    }

};