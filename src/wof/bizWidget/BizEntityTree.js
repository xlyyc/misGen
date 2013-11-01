wof.bizWidget.BizEntityTree = function () {
    this._version = '1.0';


};

wof.bizWidget.BizEntityTree.prototype = {

    _initFlag: null,



    //选择实现
    beforeRender: function () {
        var _this = this;
        if(this._initFlag==null){

            var tree = new wof.widget.Tree();
            tree.setTop(100);
            tree.setChkStyle('radio');
            tree.setRadioType('all');
            tree.setLeft(0);
            tree.setWidth(400);
            tree.setHeight(400);
            tree.setNodeId('8');
            tree.setNodes(getBizEntitys());
            tree.appendTo(gridLayout);

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

        };
    },

    //----------必须实现----------
    setData: function (data) {

    }


};