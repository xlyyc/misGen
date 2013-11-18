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

    _initFlag:null,

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
    beforeRender: function () {
        if(this._initFlag==null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.PageComponent_mousedown');
                    _this.sendMessage('wof.bizWidget.PageComponent_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.bizWidget.PageComponent_dblclick');
                _this.sendMessage('wof.bizWidget.PageComponent_active');
            });
            this.getDomInstance().droppable({
                snap:true,
                accept:function(draggable){
                    var b=false;
                    var draggableObj = wof.util.ObjectManager.get(draggable.attr('oid'));
                    if(draggableObj!=null){
                        if(_this.childNodes().length==0){
                            if(draggableObj.getIsInside()==true&&draggableObj.getClassName()=='wof.widget.Label'){
                                if(draggableObj.getValue()!='wof.bizWidget.PageComponent'){
                                    var parentNode = draggableObj;
                                    while((parentNode=parentNode.parentNode())!=null){
                                        if(parentNode.getIsInside()!=true){
                                            break;
                                        }
                                    }
                                    if(parentNode.getClassName()=='wof.bizWidget.ObjectBar'){
                                        b=true;
                                    }
                                }
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
                        }

                    }
                }
            });

            this._initFlag = true;
        }
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
    afterRender: function () {
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
        var node = new wof.bizWidget.PageComponent();
        node.setOverflow('auto');
        node.setWidth(width);
        node.setHeight(height);
        node.setTop(0);
        node.setLeft(0);
        return node;
    }

};