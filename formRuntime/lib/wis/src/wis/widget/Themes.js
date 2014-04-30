/**
 * 主题控件统一API
 *
 *
 */
wis.widget.Themes = function () {
    this._version = '1.0';
};

wis.widget.Themes.prototype = {
    _themesName: null,  //主题名称

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
    _initRender: function () {
        this._themes = jQuery('<link id="wisThemes" href="../lovey/themes/default/css/wis-widget-all.css" rel="stylesheet" type="text/css"/>');
        jQuery("head").append(this._themes);
        jQuery("title").after(this._themes);
    },

    //渲染前处理方法
    _beforeRender: function () {

    },

    //渲染方法
    render: function () {
        changeThemes(this.getThemesName());
    },

    //渲染后处理方法
    _afterRender: function () {
	
	var keys = wis.util.ObjectManager.keys();
	for(var i=0;i<keys.length;i++){
	var key = keys[i];
	var obj = wis.util.ObjectManager.get(key);
	var cls = wis.util.Tool.replaceAll(obj.getClassName(),'[.]','_');
	alert(this.getThemesName()+'/'+obj.getLibName()+'/'+cls+'.css');
	}
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