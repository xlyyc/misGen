/**
 * 主题控件统一API
 *
 *
 */
wis.widget.Themes = function () {
    this._version = '1.0';
};

wis.widget.Themes.prototype = {
    _cid: null,  //id
    _themesName: null,  //主题名称

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getThemesName: function () {
        return this._themesName || "default" ;
    },

    setThemesName: function (themesName) {
        this._themesName = themesName;
    },

    getTop: function () {
        return  null ;
    },

    getLeft: function () {
        return  null ;
    },

    getWidth: function () {
        return  null ;
    },

    getHeight: function () {
        return  null;
    },
    /**
     * 初始化方法
     */
    _init: function (data) {
        this.setData(data)
    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    initRender: function () {
        this._themes = jQuery('<link id="wisThemes" href="../lovey/themes/default/css/wis-widget-all.css" rel="stylesheet" type="text/css"/>');
        jQuery("head").append(this._themes);
        jQuery("title").after(this._themes);
    },

    //渲染前处理方法
    beforeRender: function () {

    },

    //渲染方法
    render: function () {
        changeThemes(this.getThemesName());
    },

    //渲染后处理方法
    afterRender: function () {


    },

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid(),
            themesName:this.getThemesName()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setThemesName(data.themesName);
    }
};