wis.widget.Tree = function () {
    this._version = '1.0';


};
wis.widget.Tree.prototype = {

    _ztree: null,

    _radioType: null,  //radio 的分组范围  level 在每一级节点范围内当做一个分组  all 在整棵树范围内当做一个分组

    _chkStyle: null,    // 勾选框类型 checkbox 复选框   radio 单选框

    _onClick: null,

    _onCheck: null,

    _onUnCheck: null,

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

    onClick: function(callback){
        this._onClick = callback;
    },

    onCheck: function(callback){
        this._onCheck = callback;
    },

    onUnCheck: function(callback){
        this._onUnCheck = callback;
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

    //选择实现
    _initRender: function () {

    },

    _beforeRender: function(){
        var _this = this;
        this._ztree = jQuery.fn.zTree.init(this.getDomInstance().addClass('ztree'),
            {
                callback: {
                    onClick: function(event, treeId, treeNode){
                        event.stopPropagation();
                        if(_this._onClick!=null){
                            _this._onClick(_this);
                        }
                       /* 当选中节点的时候同时勾选选择框
                        var nodes = _this._ztree.getSelectedNodes();
                        for(var i=0, l=nodes.length; i<l; i++){
                            _this._ztree.checkNode(nodes[i], true, false);
                            break;
                        }*/

                    },
                    onCheck: function(event, treeId, treeNode){
                        event.stopPropagation();
                        if(treeNode.checked){
                            if(_this._onCheck!=null){
                                _this._onCheck(_this);
                            }
                        }else{
                            if(_this._onUnCheck!=null){
                                _this._onUnCheck(_this);
                            }
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

        var nodes = this._ztree.getNodes();
        if(nodes.length>0){
            this._ztree.expandNode(nodes[0], true, true, true);
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            nodes: this.getNodes(),
            radioType: this.getRadioType(),
            chkStyle: this.getChkStyle()
        };
    },

    //----------必须实现----------
    setData: function (data) {
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

    //zTree 当前被选中的节点数据集合
    getSelectedNodes: function(){
        var nodes = this._ztree.getSelectedNodes();
        return nodes;
    },

    /**
     * 获取输入框被勾选 或 未勾选的节点集合
     * checked = true 表示获取 被勾选 的节点集合
     * checked = false 表示获取 未勾选 的节点集合
     */
    getCheckedNodes: function(checked){
        if(checked==null){
            checked = true;
        }
        var nodes = this._ztree.getCheckedNodes(checked);
        return nodes;
    },

    /**
     * 勾选 或 取消勾选 全部节点
     * checked = true 表示勾选全部节点
     * checked = false 表示全部节点取消勾选
     */
    checkAllNodes: function(checked){
        if(checked==null){
            checked = true;
        }
        this._ztree.checkAllNodes(checked);
    },

    /**
     * 根据节点数据的属性搜索，获取条件完全匹配的节点数据 JSON 对象集合
     * key 需要精确匹配的属性名称
     * value 需要精确匹配的属性值，可以是任何类型，只要保证与 key 指定的属性值保持一致即可
     * parentNode 可以指定在某个父节点下的子节点中搜索 忽略此参数，表示在全部节点中搜索
     * 返回 匹配精确搜索的节点数据集合
     * 如无结果，返回 []
     */
    getNodesByParam: function(key,name,parentNode){
        var nodes = this._ztree.getNodesByParam(key,name,parentNode);
        return nodes;
    },

    /**
     * 禁用 或 解禁 某个节点的 checkbox / radio [setting.check.enable = true 时有效]
     * node 需要禁用 或 解禁 checkbox / radio 的节点数据
     * disabled = true 表示禁用 checkbox / radio disabled = false 表示解禁 checkbox / radio
     * inheritParent = true 表示全部父节点进行同样的操作 inheritParent = false 表示不影响父节点
     * inheritChildren = true 表示全部子节点进行同样的操作 inheritChildren = false 表示不影响子节点
     */
    setChkDisabled: function(node,disable,inheritParent,inheritChildren){
        this._ztree.setChkDisabled(node,disable,inheritParent,inheritChildren);
    },

    /**
     * 根据自定义规则搜索节点数据 JSON 对象集合 或 单个节点数据
     * 自定义过滤器函数 function filter(node) {...} filter 参数：node (节点数据 JSON) filter 返回值：boolean (true 表示符合搜索条件；false 表示不符合搜索条件)
     * isSingle = true 表示只查找单个节点 isSingle = false 表示查找节点集合
     */
    getNodesByFilter: function(filter,isSingle){
        var nodes = this._ztree.getNodesByFilter(filter,isSingle);
        return nodes;
    }



};