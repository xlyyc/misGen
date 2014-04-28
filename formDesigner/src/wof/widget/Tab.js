/**
 * @widgetClass Tab class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */

wof.widget.Tab = function () {
    this._version = '1.0';

    // this.getDomInstance().css('overflow','hidden');

};

wof.widget.Tab.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _activeItemIndex:null,



    _tab: null,

    /**
     * get/set 属性方法定义
     */
    getActiveItemIndex: function () {
        return this._activeItemIndex || 1;
    },

    setActiveItemIndex: function (activeItemIndex) {
        this._activeItemIndex = activeItemIndex;
    },

    /**
     * Render 方法定义
     */

    _initRender: function(){
        var _this = this;
        var tab = wis$.create('Tab');
        tab.onClick(function(_tab){
            var itemIndex=_tab.getActiveItemIndex();
            _this.setActiveItemIndex(itemIndex);
            _this.sendMessage('wof.widget.Tab_active');
        });
        var div = jQuery('<div>');
        this.getDomInstance().append(div);
        tab.appendTo(div);
        this._tab = tab;
    },

    //选择实现
    _beforeRender: function (){
        var childs = [];
        //首先移除item 并且将内部对象暂存到childs
        for(var i=0; i<this.childNodes().length; i++){
            var child = this.childNodes()[i];
            child.getDomInstance().detach();
            childs.push(child);
        }
        this._tab.removeItem();
        //重新插入item
        for(var i=0; i<childs.length; i++){
            var child = childs[i];
            this._tab.insertItem({name:child.getId(),width:100,label:child.getTitle(),closeable:true,icon:'add',iconPosition:'left'});
            child.childNodes()[0].setWidth(this.getWidth());
            child.childNodes()[0].setHeight(this.getHeight()-52);
            child.childNodes()[0].getDomInstance().css('width',(this.getWidth())+'px');
            child.childNodes()[0].getDomInstance().css('height',(this.getWidth())+'px');
            this._tab.insertNode(child.getDomInstance(),i+1);
        }
        this._tab.setWidth(this.getWidth());
        this._tab.setHeight(this.getHeight());
        this._tab.setActiveItemIndex(this.getActiveItemIndex());
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function(){
        this._tab.render();
        this.sendMessage('wof.widget.Tab_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function() {
        return {
            activeItemIndex: this.getActiveItemIndex()
        };
    },
    //----------必须实现----------
    setData: function(data) {
        this.setActiveItemIndex(data.activeItemIndex);
    },

    _insideOnReceiveMessage:{
        'wof.bizWidget.GridLayout_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            var gridLayout = wof.util.ObjectManager.get(message.sender.id);

            this.sendMessage('wof.widget.Tab_active');
            return false;
        },
        'wof.bizWidget.GridLayout_dblclick':function(message){
            console.log(message.id+'   '+this.getClassName());
            var gridLayout = wof.util.ObjectManager.get(message.sender.id);

            this.sendMessage('wof.widget.Tab_active');
            return false;
        }
    },

    //找到所有items
    _findItems: function(){
        var items = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            if(node.getClassName()=='wof.widget.TabItem'){
                items.push(node);
            }
        }
        return items;
    },

    //返回item的数量
    getItemsCount:function(){
        return this._findItems().length;
    },

    //找到最后一个item
    _findLastItem: function(){
        var item = null;
        var childNodes = this.childNodes();
        for(var i=childNodes.length-1;i>=0;i--){
            var node = childNodes[i];
            if(node.getClassName()=='wof.widget.TabItem'){
                item = node;
                break;
            }
        }
        return item;
    },

    //找到第一个item
    _findFirstItem: function(){
        var item = null;
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            if(node.getClassName()=='wof.widget.TabItem'){
                item = node;
                break;
            }
        }
        return item;
    },

    /**
     * 查找指定序号的item
     * itemIndex 在指定item序号前插入(序号从1开始)
     */
    findItemByIndex: function(itemIndex){
        var item = null;
        var items = this._findItems();
        for(var i=1;i<=items.length;i++){
            if(i==itemIndex){
                item = items[i-1];
                break;
            }
        }
        return item;
    },

    /**
     * 清空并删除指定itemIndex的item
     * itemIndex (序号从1开始)
     * itemIndex为null 全部移除
     */
    deleteItem: function(itemIndex){
        var items = this._findItems();
        if(itemIndex!=null){
            for(var i=1;i<=items.length;i++){
                if(i==itemIndex){
                    var item = items[i-1];
                    item.removeChildren(true);
                    item.remove(true);
                    break;
                }
            }
        }else{
            for(var i=items.length-1;i>=0;i--){
                var item = items[i];
                item.removeChildren(true);
                item.remove(true);
            }
        }

    },

    /**
     * 插入新的Item
     * itemIndex 在指定序号item后插入(序号从1开始)
     * 如果itemIndex为null 缺省在最后插入
     */
    insertItem: function(itemData, itemIndex){
        var newItem = wof$.create('TabItem');
        newItem.setTitle(itemData.title!=null?itemData.title:'');
        if(item!=null){
            var item = this.findItemByIndex(itemIndex);
            if(item!=null){
                newItem.afterTo(item);
            }else{
                newItem.appendTo(this);
            }
        }else{
            newItem.appendTo(this);
        }
        var gridLayout = wof$.create('GridLayout');
        gridLayout.setIsInside(true);
       // gridLayout.setOverflow('auto');
        gridLayout.setWidth(this.getWidth());
        gridLayout.setHeight(this.getHeight()-52);
        gridLayout.setTop(50);
        gridLayout.setLeft(4);
        gridLayout.appendTo(newItem);
    },


    /**
     * 在指定item插入节点
     * 如果itemIndex为null 则在当前激活的item中插入
     * node 节点对象
     * itemIndex 在指定item序号内插入(序号从1开始)
     */
    insertNode: function(node, itemIndex){
        if(node!=null){
            if(itemIndex!=null){
                var item = this.findItemByIndex(itemIndex);
                if(item!=null){
                    node.appendTo(item.childNodes()[0]);
                }else{
                    console.log('不存在item 请先插入新的item');
                }
            }else{
                var item = this._findLastItem();
                if(item!=null){
                    node.appendTo(item.childNodes()[0]);
                }else{
                    console.log('不存在item 请先插入新的item');
                }
            }
        }else{
            console.log('node对象为null 不能插入');
        }
    },

    /**
     * 返回指定itemIndex的node对象集合
     * node 对象数组
     * itemIndex (序号从1开始)
     */
    getNodesByItemIndex: function(itemIndex){
        var nodes = [];
        if(itemIndex!=null){
            var item = this.findItemByIndex(itemIndex);
            if(item!=null){
                nodes = item.childNodes()[0].childNodes();
            }else{
                console.log('指定itemIndex的item不存在');
            }
        }
        return nodes;
    },

    //创建初始化的Tab
    createSelf: function(width, height){
        var node = wof$.create('Tab');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(width-12);
        node.setHeight(height-25);
        node.insertItem({title:'未命名'});
        node.setActiveItemIndex(1);

        return node;
    }


};