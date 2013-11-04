wof.bizWidget.BizEntityTree = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','auto');
    this.setZIndex('200');

};

wof.bizWidget.BizEntityTree.prototype = {

    _initFlag: null,

    _tree : null,

    _value : null,

    /**
     * get/set 属性方法定义
     */
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
            this._tree.setChkStyle('radio');
            this._tree.setRadioType('all');
            this._tree.setLeft(0);
            this._tree.setWidth(this.getWidth());
            this._tree.setHeight(this.getHeight()-30);
            this._tree.setNodes(getBizEntitys());
            this._tree.appendTo(this);

            this._initFlag = true;
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        //this._tree.setNodeId('8');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            value: this.getValue()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setValue(data.value);
    },

    getSelectedNodes: function(){
        var nodes = this._tree.getSelectedNodes();
        return nodes;
    },

    getCheckedNodes: function(){
        var nodes = this._tree.getCheckedNodes();
        return nodes;
    }



};