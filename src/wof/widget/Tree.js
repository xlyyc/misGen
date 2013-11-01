wof.widget.Tree = function () {
    this._version = '1.0';


};

wof.widget.Tree.prototype = {

    _initFlag: null,

    _url: null,

    _ztree: null,

    _radioType: null,  //radio 的分组范围  level 在每一级节点范围内当做一个分组  all 在整棵树范围内当做一个分组

    _chkStyle: null,    // 勾选框类型 checkbox    radio

    _nodeId: null,

    setNodeId: function(nodeId){
        this._nodeId = nodeId;
    },

    getNodeId: function(){
        return this._nodeId;
    },

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
    beforeRender: function () {
        var _this = this;
        if(this._initFlag==null){
            this._ztree = jQuery.fn.zTree.init(this.getDomInstance().addClass('ztree'),
                {
                    treeId: this.getId(),
                    callback: {
                        onClick: function(event, treeId, treeNode){
                            event.stopPropagation();
                            var nodes = _this._ztree.getSelectedNodes();
                            for(var i=0, l=nodes.length; i<l; i++){
                                nodes[i].treeNodeId = true;
                                _this._ztree.checkNode(nodes[i], true, true);
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
            this._ztree.addNodes(null, this.getNodes());

            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        var node = this._ztree.getNodeByParam('nodeId', this.getNodeId());
        if(node!=null){
            this._ztree.checkNode(node, true, true);
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
            chkStyle: this.getChkStyle(),
            nodeId: this.getNodeId()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setUrl(data.url);
        this.setParam(data.param);
        this.setNodes(data.nodes);
        this.setRadioType(data.radioType);
        this.setChkStyle(data.chkStyle);
        this.setNodeId(data.nodeId);
    }


};