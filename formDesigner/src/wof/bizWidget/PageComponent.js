/**
 * @widgetClass PageComponent class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:50
 */

wof.bizWidget.PageComponent = function () {
    this._version = '1.0';


};

wof.bizWidget.PageComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _overflow:null,

    /**
     * get/set 属性方法定义
     */
    getOverflow: function(){
        return this._overflow;
    },

    setOverflow: function(overflow){
        this._overflow = overflow ;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    _beforeRender: function () {

        this.getDomInstance().css('overflow', '');
        this.getDomInstance().css('overflow-x', '');
        this.getDomInstance().css('overflow-y', '');
    },

    //----------必须实现----------
    render: function () {
        if(this.getOverflow()=='x'){
            this.getDomInstance().css('overflow-x', 'scroll');
        }else if(this.getOverflow()=='y'){
            this.getDomInstance().css('overflow-y', 'scroll');
        } else if(this.getOverflow()=='scroll'){
            this.getDomInstance().css('overflow', 'scroll');
        }else if(this.getOverflow()=='auto'){
            this.getDomInstance().css('overflow', 'auto');
        }
    },

    //选择实现
    _afterRender: function () {

        this.sendMessage('wof.bizWidget.PageComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            overflow: this.getOverflow()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.getOverflow(data.overflow);
    },

    //创建初始化的button
    createSelf: function(width, height){
        var node = wof$.create('PageComponent');
        node.setOverflow('auto');
        node.setWidth(width);
        node.setHeight(height);
        node.setTop(0);
        node.setLeft(0);
        return node;
    }

};