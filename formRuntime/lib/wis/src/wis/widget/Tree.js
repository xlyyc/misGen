/**
 * ****解决方案

 * Copyright (c) 2009 Wisedu. All Rights Reserved.
 *
 * Copying of this document or code and giving it to others and the
 * use or communication of the contents thereof, are forbidden without
 * expressed authority. Offenders are liable to the payment of damages.
 * All rights reserved in the event of the grant of a invention patent or the
 * registration of a utility model, design or code.
 *
 * Issued by Wisedu Ltd.
 *
 * User: yzhao (178518@gmail.com)
 * Date: 14-3-10 下午4:03
 * Version V1.0
 * History:
 *
 */
wis.widget.Tree = function () {
    this._version = '1.0';
};

wis.widget.Tree.prototype = {
    _cid: null,
    _treeName: null,
    _isMultSelect: false,
    _mode: null,
    _isSelLeafOnly: true,
    _canDrag: false,
    _items: null,
    _tree: null,

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getTreeName: function () {
        return this._treeName;
    },

    setTreeName: function (treeName) {
        this._treeName = treeName;
    },

    getIsMultSelect: function () {
        return this._isMultSelect;
    },

    setIsMultSelect: function (isMultSelect) {
        this._isMultSelect = isMultSelect;
    },

    getMode: function () {
        return this._mode;
    },

    setMode: function (mode) {
        this._mode = mode;
    },

    getMode: function () {
        return this._mode;
    },

    setMode: function (mode) {
        this._mode = mode;
    },

    getIsSelLeafOnly: function () {
        return this._isSelLeafOnly;
    },

    setIsSelLeafOnly: function (isSelLeafOnly) {
        this._isSelLeafOnly = isSelLeafOnly;
    },

    getCanDrag: function () {
        return this._canDrag;
    },

    setCanDrag: function (canDrag) {
        this._canDrag = canDrag;
    },

    getItems: function () {
        return this._items;
    },

    setItems: function (items) {
        this._items = items;
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
        this._tree = $('<div></div>');
        this._tree.ligerTree({
            treeLine: false,
            checkbox: false,
            url: "tree.json",
            onExpand:this._onExpand
        });
        this.getDomInstance().append(this._tree);
    },

    //渲染前处理方法
    beforeRender: function () {

    },
    onExpand:function(callBack){
        this._onExpand=callBack;
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