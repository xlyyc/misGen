/**
 * 时间选择控件统一API
 *
 *
 */
wis.widget.Dialog = function () {
    this._version = '1.0';

};

wis.widget.Dialog.prototype = {
    _cid: null,
    _dialogName: null,
    _dialogType: null,
    _dialogTitle: null,
    _canMax: true,
    _canDrag: false,
    _defaultFullScreen: true,
    _dialog: null,

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getDialogName: function () {
        return this._dialogName;
    },

    setDialogName: function (dialogName) {
        this._dialogName = dialogName;
    },

    getDialogType: function () {
        return this._dialogType;
    },

    setDialogType: function (dialogType) {
        this._dialogType = dialogType;
    },

    getDialogTitle: function () {
        return this._dialogTitle;
    },

    setDialogTitle: function (dialogTitle) {
        this._dialogTitle = dialogTitle;
    },

    getCanMax: function () {
        return this._canMax;
    },

    setCanMax: function (canMax) {
        this._canMax = canMax;
    },

    getCanDrag: function () {
        return this._canDrag;
    },

    setCanDrag: function (canDrag) {
        this._canDrag = canDrag;
    },

    getDefaultFullScreen: function () {
        return this._defaultFullScreen;
    },

    setDefaultFullScreen: function (defaultFullScreen) {
        this._defaultFullScreen = defaultFullScreen;
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
        this._input = jQuery('<input type="text">');
        this.getDomInstance().append(this._input);
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