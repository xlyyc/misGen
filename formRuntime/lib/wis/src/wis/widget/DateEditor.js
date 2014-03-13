/**
 * 时间选择控件统一API
 *
 *
 */
wis.widget.DateEditor = function () {
    this._version = '1.0';

};

wis.widget.DateEditor.prototype = {
    _cid: null,                 //页面唯一编号
    _dateName: null,            //名称
    _format: null,              //日期格式化类型"yyyy-MM-dd hh:mm:ss"
    _customValidate: null,      //显示名称
    _defaultValue: null,        //默认值
    _dateeditor: null,

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getDateName: function () {
        return this._dateName;
    },

    setDateName: function (dateName) {
        this._dateName = dateName;
    },

    getCustomValidate: function () {
        return this._customValidate;
    },

    setCustomValidate: function (customValidate) {
        this._customValidate = customValidate;
    },

    getDefaultValue: function () {
        return this._defaultValue;
    },

    setDefaultValue: function (defaultValue) {
        this._defaultValue = defaultValue;
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
        this._dateEditor = jQuery('<input type="text">');
        $("body").append(this._dateEditor);
        var dateEditor = this._dateEditor.ligerDateEditor();
        //this.getDomInstance().append(dateEditor);
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

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
    }
};