wof.widget.Tree = function () {
    this._version = '1.0';


};

wof.widget.Tree.prototype = {

    _initFlag: null,

    _url: null,

    _ztree: null,

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

    onClick: jQuery.noop,

    onExpand: jQuery.noop,

    //选择实现
    beforeRender: function () {
        if (this._initFlag==null) {
            this._ztree = jQuery.fn.zTree.init(this.getDomInstance().addClass('ztree'),
                {
                    treeId: this.getId(),
                    callback: {
                        onClick: this.onClick
                    },
                    check: {
                        enable: true,
                        chkStyle: "radio",
                        radioType: "level"
                    }
                }
            );

            /*var nodes = [
                {"name":"网站导航", open:true, children: [
                    { "name":"google", "url":"http://g.cn", "target":"_blank"},
                    { "name":"baidu", "url":"http://baidu.com", "target":"_blank"},
                    { "name":"sina", "url":"http://www.sina.com.cn", "target":"_blank"}
                ]
                }
            ];*/

            this._ztree.addNodes(null, this.getNodes());

            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            url: this.getUrl(),
            param: this.getParam(),
            nodes: this.getNodes()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setUrl(data.url);
        this.setParam(data.param);
        this.setNodes(data.nodes);
    }

};