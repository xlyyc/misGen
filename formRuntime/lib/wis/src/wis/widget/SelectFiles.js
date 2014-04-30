/**
 * 文件选择控件统一API
 *
 *
 */
wis.widget.SelectFiles = function () {
    this._version = '1.0';

};

wis.widget.SelectFiles.prototype = {
    _name: null,                    //上传控件的名称
    _isMultUpload: null,            //是否批量上传  todo
    _fileTypes: null,               //文件类型限制，多个用半角分号隔开，如*.doc;*.jpg       todo
    _fileSizeLimit: null,           //单个文件大小上限，默认100M         todo
    _uploadUrl: null,               //上传接收地址
    _fileSaveName: null,            //文件保存名 todo


    getName: function () {
        return this._name || '';
    },

    setName: function (name) {
        this._name = name;
    },

    getIsMultUpload: function () {
        return this._isMultUpload || true;
    },

    setIsMultUpload: function (isMultUpload) {
        this._isMultUpload = isMultUpload;
    },

    getFileTypes: function () {
        return this._fileTypes || "*.*";
    },

    setFileTypes: function (fileTypes) {
        this._fileTypes = fileTypes;
    },

    getFileSizeLimit: function () {
        return this._fileSizeLimit || ( 100 * 1024 * 1024 );
    },


    getUploadUrl: function () {
        return this._uploadUrl || '';
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
    _initRender: function () {
        this._file = jQuery('<input type="file" name="'+this.getName()+'">');
        this.getDomInstance().append(this._file);
    },

    //渲染前处理方法
    _beforeRender: function () {

    },

    //渲染方法
    render: function () {

    },

    //渲染后处理方法
    _afterRender: function () {


    },

    //----------必须实现----------
    getData: function () {
        return {

        };
    },

    //----------必须实现----------
    setData: function (data) {

    }
};