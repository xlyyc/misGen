/**
 * 文件选择控件统一API
 *
 *
 */
wis.widget.SelectFiles = function () {
    this._version = '1.0';

};

wis.widget.SelectFiles.prototype = {
    _cid: null,
    _selectFileName: null,
    _isMultUpload: true,
    _fileTypes: "*.*",
    _fileSizeLimit: 100 * 1024 * 1024,
    _uploadUrl: null,
    _fileSaveName: null,

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getSelectFileName: function () {
        return this._selectFileName;
    },

    setSelectFileName: function (selectFileName) {
        this._selectFileName = selectFileName;
    },

    getIsMultUpload: function () {
        return this._isMultUpload;
    },

    setIsMultUpload: function (isMultUpload) {
        this._isMultUpload = isMultUpload;
    },

    getFileTypes: function () {
        return this._fileTypes;
    },

    setFileTypes: function (fileTypes) {
        this._fileTypes = fileTypes;
    },

    getUploadUrl: function () {
        return this._uploadUrl;
    },

    setUploadUrl: function (uploadUrl) {
        this._uploadUrl = uploadUrl;
    },

    getFileSaveName: function () {
        return this._fileSaveName;
    },

    setFileSaveName: function (fileSaveName) {
        this._fileSaveName = fileSaveName;
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