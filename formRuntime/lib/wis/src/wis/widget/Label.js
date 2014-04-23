/**
 * 标签统一API
 *
 *
 */
wis.widget.Label = function () {
    this._version = '1.0';

};

wis.widget.Label.prototype = {
    _name: null,         //label的名称
    _title: null,        //显示名称
    _label: null,

    getName: function () {
        return this._name;
    },

    setName: function (name) {
        this._name = name;
    },

    getTitle: function () {
        return this._title;
    },

    setTitle: function (title) {
        this._title = title;
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
        this._label = jQuery('<label></label>');
        this._label.attr("id",this.getCid());
        this._label.append(this.getLabelTitle());
        this._label.attr("name",this.getLabelName());
        this.getDomInstance().append(this._label);
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
            name: this.getName(),
            title: this.getTitle()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setTitle(data.title);
    }
};