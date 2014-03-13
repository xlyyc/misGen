/**
 * 标签统一API
 *
 *
 */
wis.widget.Label = function () {
    this._version = '1.0';

};

wis.widget.Label.prototype = {
    _cid: null,         //页面唯一编号
    _labelName: null,         //label的名称
    _labelTitle: null,        //显示名称
    _label: null,

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getLabelName: function () {
        return this._labelName;
    },

    setLabelName: function (labelName) {
        this._labelName = labelName;
    },

    getLabelTitle: function () {
        return this._labelTitle;
    },

    setLabelTitle: function (labelTitle) {
        this._labelTitle = labelTitle;
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
            cid: this.getCid(),
            labelName: this.getLabelName(),
            labelTitle: this.getLabelTitle()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setLabelName(data.labelName);
        this.setLabelTitle(data.labelTitle);
    }
};