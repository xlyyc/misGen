/**
 * 主题控件统一API
 *
 *
 */
wis.widget.Themes = function () {
    this._version = '1.0';

};

wis.widget.Themes.prototype = {
    _cid: null,  //表格id
    _themesName: null,  //表格id

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getThemesName: function () {
        return this._themesName;
    },

    setThemesName: function (themesName) {
        this._themesName = themesName;
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