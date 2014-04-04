wof.widget.Tree = function () {
    this._version = '1.0';

};

wof.widget.Tree.prototype = {

    _initFlag: null,

    _url: null,

    _ztree: null,

    _radioType: null,  //radio 的分组范围  level 在每一级节点范围内当做一个分组  all 在整棵树范围内当做一个分组

    _chkStyle: null,    // 勾选框类型 checkbox    radio


    setChkStyle: function(chkStyle){
        this._chkStyle = chkStyle;
    },

    getChkStyle: function(){
        if(this._chkStyle==null){
            this._chkStyle = 'checkbox';
        }
        return this._chkStyle;
    },

    setRadioType: function (radioType ) {
        this._radioType  = radioType;
    },

    getRadioType: function () {
        if(this._radioType==null){
            this._radioType = 'all';
        }
        return this._radioType;
    },

    setUrl: function (url) {
        this._url = url;
    },

    getUrl: function () {
        return this._url;
    },

    /**
     * type string or object
     */
    param: null,

    setParam: function (param) {
        this.url = url;
    },
    getParam: function () {
        return this.param;
    },

    /**
     *   数据格式
     *   var nodes = [
     {name: "父节点1", children: [
         {name: "子节点1"},
         {name: "子节点2"}
     ]},
     {name: "父节点2",leaf : true,icon : 'home'},
     {name: "父节点3",open : true}
     ];
     */
    _nodes: null,

    setNodes: function (nodes) {
        this._nodes = nodes;
    },

    getNodes: function () {
        return this._nodes;
    },

    onExpand: jQuery.noop,

    //选择实现
    initRender: function () {
        var _this = this;
        this._ztree = jQuery.fn.zTree.init(this.getDomInstance().addClass('ztree'),
            {
                treeId: this.getId(),
                callback: {
                    onClick: function(event, treeId, treeNode){
                        event.stopPropagation();
                        var nodes = _this._ztree.getSelectedNodes();
                        for(var i=0, l=nodes.length; i<l; i++){
                            _this._ztree.checkNode(nodes[i], true, false);
                            break;
                        }
                    }
                },
                check: {
                    enable: true,
                    chkStyle: this.getChkStyle(),
                    radioType: this.getRadioType()
                }
            }
        );

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        this._ztree.addNodes(null, this.getNodes());

        var nodes = this._ztree.getNodes();
        if(nodes.length>0){
            this._ztree.expandNode(nodes[0], true, true, true);
        }
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            url: this.getUrl(),
            param: this.getParam(),
            nodes: this.getNodes(),
            radioType: this.getRadioType(),
            chkStyle: this.getChkStyle()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setUrl(data.url);
        this.setParam(data.param);
        this.setNodes(data.nodes);
        this.setRadioType(data.radioType);
        this.setChkStyle(data.chkStyle);
    },

    checkNodeByParam: function(key, value){
        var node = this._ztree.getNodeByParam(key, value);
        if(node!=null){
            this._ztree.checkNode(node, true, false);
            this._ztree.selectNode(node, false);
        }
    },

    getSelectedNodes: function(){
        var nodes = this._ztree.getSelectedNodes();
        return nodes;
    },

    getCheckedNodes: function(){
        var nodes = this._ztree.getCheckedNodes(true);
        return nodes;
    },

    checkAllNodes: function(checked){
        if(checked==null){
            checked = true;
        }
        this._ztree.checkAllNodes(checked);
    },

    getNodesByParam: function(key,name,parentNode){
        var nodes = this._ztree.getNodesByParam(key,name,parentNode);
        return nodes;
    },

    setChkDisabled: function(node,disable,inheritParent,inheritChildren){
        this._ztree.setChkDisabled(node,disable,inheritParent,inheritChildren);
    },

    getNodesByFilter: function(filter,isSingle){
        var nodes = this._ztree.getNodesByFilter(filter,isSingle);
        return nodes;
    }



};