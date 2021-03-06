/**
 * @widgetClass GridLayout class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:50
 */

wof.bizWidget.GridLayout = function () {
    this._version = '1.0';


};

wof.bizWidget.GridLayout.prototype = {
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

    _initRender: function(){
        var _this = this;
        this.getDomInstance().droppable({
            snap:true,
            accept:function(draggable){
                var b=false;
                var draggableObj = wof.util.ObjectManager.get(draggable.attr('oid'));
                if(draggableObj!=null){
                    //不能接受FlowLayoutSection和FlowLayoutItem
                    if(draggableObj.getClassName()!='wof.bizWidget.FlowLayoutSection'&&draggableObj.getClassName()!='wof.bizWidget.FlowLayoutItem'){
                        //必须没有子节点
                        if(_this.childNodes().length==0){
                            b=true;
                        }
                    }
                }
                return b;
            },
            hoverClass: 'ui-state-hover',
            drop:function(event,ui){
                event.stopPropagation();
                var obj = wof.util.ObjectManager.get(ui.draggable.attr('oid'));
                if(obj!=null){
                    if(obj.getIsInside()==true){
                        var obj = wof.util.ObjectManager.get(ui.draggable.attr('oid'));
                        var node = eval('(new '+obj.getValue()+'()).createSelf('+_this.getWidth()+','+_this.getHeight()+');');
                        node.appendTo(_this);
                        _this.render();
                    }else{
                        console.log('todo .....');
                        /* var sectionIndex = _this.parentNode().getIndex();
                         _this.parentNode().parentNode().setActiveSectionIndex(sectionIndex);
                         _this.parentNode().parentNode().setActiveItemRank({row:_this.getRow(),col:_this.getCol()});
                         _this.sendMessage('wof.bizWidget.FlowLayoutItem_widgetDrop', {'widgetId':ui.draggable.attr('oid')});*/
                    }

                }
            }
        });
    },

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
        this.sendMessage('wof.bizWidget.GridLayout_render');
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
        var node = new wof.bizWidget.GridLayout();
        node.setOverflow('auto');
        node.setWidth(width);
        node.setHeight(height);
        node.setTop(0);
        node.setLeft(0);
        return node;
    }

};