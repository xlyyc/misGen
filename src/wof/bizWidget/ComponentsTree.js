wof.bizWidget.ComponentsTree = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','auto');
    this.setZIndex('200');

};

wof.bizWidget.ComponentsTree.prototype = {

    _initFlag: null,

    _tree : null,

    _value : null,

    _nodes: null,

    /**
     * get/set 属性方法定义
     */
    setNodes: function (nodes) {
        this._nodes = nodes;
    },

    getNodes: function () {
        return this._nodes;
    },

    getValue: function(){
        if(this._value==null){
            this._value = '';
        }
        return this._value;
    },

    setValue: function(value){
        this._value = value;
    },

    //选择实现
    beforeRender: function () {
        var _this = this;
        if(this._initFlag==null){
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();

            });
            this._tree = new wof.widget.Tree();
            this._tree.setTop(0);
            this._tree.setChkStyle('checkbox');
            this._tree.setLeft(0);
            this._tree.setWidth(this.getWidth());
            this._tree.setHeight(this.getHeight()-30);
            this._tree.appendTo(this);

            this._initFlag = true;
        }
        this._tree.setNodes(this.getNodes());
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
            value: this.getValue(),
            nodes: this.getNodes()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setValue(data.value);
        this.setNodes(data.nodes);
    },

    checkNodeByParam: function(key, value){
        this._tree.checkNodeByParam(key,value);
    },

    getSelectedNodes: function(){
        var nodes = this._tree.getSelectedNodes();
        return nodes;
    },

    getCheckedNodes: function(){
        var nodes = this._tree.getCheckedNodes();
        return nodes;
    },

    checkAllNodes: function(checked){
        this._tree.checkAllNodes(checked);
    }



};