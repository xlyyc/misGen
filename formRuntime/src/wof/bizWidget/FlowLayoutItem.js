/**
 * @bizWidgetClass FlowLayoutItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.FlowLayoutItem = function () {
    this._version = '1.0';

    this.setIsInside(true);

    this.getDomInstance().css('overflow','hidden');

};
wof.bizWidget.FlowLayoutItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _colspan:null,

    _row:null,

    _col:null,

    _isFixItem: null,    //是否锁定

    _rowspan: null,

    _initFlag:null,

    /**
     * get/set 属性方法定义
     */
    getRowspan: function(){
        if(this._rowspan==null){
            this._rowspan = 1;
        }
        return this._rowspan;
    },

    setRowspan: function(rowspan){
        this._rowspan = rowspan;
    },

    getIsFixItem: function(){
        if(this._isFixItem==null){
            this._isFixItem = false;
        }
        return this._isFixItem;
    },

    setIsFixItem: function(isFixItem){
        this._isFixItem = isFixItem;
    },

    getColspan: function(){
        if(this._colspan==null)
            this._colspan = 1;
        return this._colspan;
    },

    setColspan: function(colspan){
        this._colspan = colspan;
    },

    getRow: function(){
        return this._row;
    },

    setRow: function(row){
        this._row = row;
    },

    getCol: function(){
        return this._col;
    },

    setCol: function(col){
        this._col = col;
    },
    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        if(this.getLeft()!=null){
            this.getDomInstance().css('left', (this.getLeft()*this.getScale())+'px');
        }
        if(this.getTop()!=null){
            this.getDomInstance().css('top', (this.getTop()*this.getScale())+'px');
        }
        if(this.getWidth()!=null){
            this.getDomInstance().css('width', (this.getWidth()*this.getScale())+'px');
        }
        if(this.getHeight()!=null){
            this.getDomInstance().css('height', (this.getHeight()*this.getScale())+'px');
        }
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            rowspan: this.getRowspan(),
            isFixItem: this.getIsFixItem(),
            row: this.getRow(),
            col: this.getCol(),
            colspan: this.getColspan()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setRowspan(data.rowspan);
        this.setIsFixItem(data.isFixItem);
        this.setRow(data.row);
        this.setCol(data.col);
        this.setColspan(data.colspan);
    }

};