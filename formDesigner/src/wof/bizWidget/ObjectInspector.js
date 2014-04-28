/**
 * @widgetClass Structure class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-9-21 下午08:46
 */
wof.bizWidget.ObjectInspector = function (root) {
    this._version = '1.0';
};
wof.bizWidget.ObjectInspector.prototype = {

    _tree: null,

    _initRender: function(){
        var tree = wof$.create('Tree');
        tree.setIsInside(true);
        tree.setTop(0);
        tree.setLeft(0);
        tree.setChkStyle('radio');
        tree.setRadioType('all');
        tree.setWidth(this.getWidth()-8);
        tree.setHeight(this.getHeight()-30);

        var nodes = [
            {nodeId:'1',name: "父节点1", children: [
                {nodeId:'2',name: "子节点1"},
                {nodeId:'3',name: "子节点2"}
            ]},
            {nodeId:'4',name: "父节点2",leaf : true},
            {nodeId:'5',name: "父节点3",open : true}
        ];
        tree.setNodes(nodes);

        tree.appendTo(this);
        this._tree = tree;
    },

    //选择实现
    _beforeRender: function () {

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

        };
    },
    //----------必须实现----------
    setData: function (data) {

    }

};
