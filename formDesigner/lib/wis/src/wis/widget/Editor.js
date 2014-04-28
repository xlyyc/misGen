/**
 *
 *
 *
 */
wis.widget.Editor = function () {
    this._version = '1.0';

};
wis.widget.Editor.prototype = {

    cid: null,                         //页面唯一
    name: null,                         //富文本框的名称
    mode: null,                         //富文本框的模式，简单，全功能
    canUpload: null,                    //是否允许上传文件
    content: null,                      //回调沿用原有的

    _rootObj: null,

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

    getMode: function () {
        return this._mode;
    },
    setMode: function (mode) {
        this._mode = mode;
    },

    getCanUpload: function () {
        return this._canUpload;
    },
    setCanUpload: function (canUpload) {
        this._canUpload = canUpload;
    },

    getContent: function () {
        return this._content;
    },
    setContent: function (content) {
        this._content = content;
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
    _initRender: function () {
        var input = $.loveyInput.create({
            cid: this.getCid(),
            name: this.getName(),
            mode: this.getMode(),
            canUpload: this.getCanUpload(),
            content: this.getContent()
        });

        this.getDomInstance().append(input.root);

    },

    _bindEvents: function () {
    },

//渲染前处理方法
    _beforeRender: function () {

    },

//渲染方法
    render: function () {
        /* if (this.getCid()) this._rootObj.attr('id', this.getCid());
         if (this.getName()) this._rootObj.attr('name', this.getName());
         if (this.getValue()) this._rootObj.attr('value', this.getValue());
         //if (this.getDisplayType()) this.rootObj.attr('value', this.getDisplayType());
         if (this.getMaxlength()) this._rootObj.attr('maxlength', this.getMaxlength());
         if (this.getPlaceholder) this._rootObj.attr('placeholder', this.getPlaceholder());
         if (this.getDisabled) this._rootObj.attr('disabled', this.getDisabled());
         if (this.getReadonly) this._rootObj.attr('readonly', this.getReadonly());*/
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
            name: this.getName(),
            mode: this.getMode(),
            canUpload: this.getCanUpload(),
            content: this.getContent()
        }
    },

//----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setName(data.name);
        this.setMode(data.mode);
        this.setCanUpload(data.canUpload);
        this.setContent(data.content);
    }

};