wof.bizWidget.PageFormTree = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','auto');

};

wof.bizWidget.PageFormTree.prototype = {


    _tree : null,

    _value : null,

    _nodes: null,

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

    _initRender: function(){
        this._tree = wof$.create('Tree');
        this._tree.setIsInside(true);

        this._tree.setTop(0);
        this._tree.setChkStyle('radio');
        this._tree.setRadioType('all');
        this._tree.setLeft(0);
        this._tree.setWidth(this.getWidth());
        this._tree.setHeight(this.getHeight()-30);
        this._tree.appendTo(this);
    },

    //选择实现
    _beforeRender: function () {
        this._tree.setNodes(this.getNodes());
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

    getNodesByParam: function(key,name,parentNode){
        var nodes = this._tree.getNodesByParam(key,name,parentNode);
        return nodes;
    },

    setChkDisabled: function(node,disable,inheritParent,inheritChildren){
        this._tree.setChkDisabled(node,disable,inheritParent,inheritChildren);
    },

    getNodesByFilter: function(filter,isSingle){
        var nodes = this._tree.getNodesByFilter(filter,isSingle);
        return nodes;
    }



};