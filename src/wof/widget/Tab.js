/**
 * @widgetClass Tab class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */

wof.widget.Tab = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','hidden');

};

wof.widget.Tab.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _activeIndex:null,

    _initDOMFlag:null,

    _initFlag:null,

    _updateFlag:null,

    /**
     * get/set 属性方法定义
     */
    setActiveIndex: function(activeIndex){
        if(this._initDOMFlag==true){
            this.getDomInstance().tabs({'active':(activeIndex-1)});
            this._updateFlag = false;
        }
        this._activeIndex = activeIndex;
    },

    getActiveIndex:function(){
        return this._activeIndex;
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
                    _this.sendMessage('wof.widget.Tab_mousedown');
                    _this.sendMessage('wof.widget.Tab_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.widget.Tab_dblclick');
                _this.sendMessage('wof.widget.Tab_active');
            });
            this._initFlag = true;
        }
        this.getDomInstance().children('ul').remove();
    },

    //----------必须实现----------
    render: function () {
		var ul = jQuery('<ul>');
		this.getDomInstance().prepend(ul);
		for(var i=0; i<this.childNodes().length; i++){
			var li = jQuery('<li>');
			var a = jQuery('<a href="#'+this.childNodes()[i].getId()+'">'+this.childNodes()[i].getTitle()+'</a>');
			li.append(a);
			ul.append(li);
		}
    },

    //选择实现
    afterRender: function(){
        var _this = this;
        this._updateFlag = true;
        this.getDomInstance().tabs({
            heightStyle:'fill',
            activate: function(event,ui){
                event.stopPropagation();
                if(_this._updateFlag == false){
                    var activeIndex = 0;
                    var oid = ui.newPanel.attr('oid');
                    var items = _this.childNodes();
                    for(var i=0;i<items.length;i++){
                        if(items[i].getId()==oid){
                            activeIndex = i;
                            break;
                        }
                    }
                    _this.setActiveIndex(activeIndex+1);
                    _this.sendMessage('wof.widget.Tab_active');
                }else{
                    _this._updateFlag = false;
                }
            }
        });
        this.getDomInstance().tabs("refresh");
        if(this.getActiveIndex()!=null){
            this.getDomInstance().tabs({active:(this.getActiveIndex()-1)});
            this.sendMessage('wof.widget.Tab_active');
        }
        this._initDOMFlag = true;
        this.sendMessage('wof.widget.Tab_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function() {
        return {
            activeIndex: this.getActiveIndex()
        };
    },
    //----------必须实现----------
    setData: function(data) {
        this.setActiveIndex(data.activeIndex);
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
                    item = items[i-1];
                    item.removeChildren(true);
                    item.remove(true);
                    break;
                }
            }
        }else{
            for(var i=items.length-1;i>=0;i--){
                item = items[i];
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
        var newItem = new wof.widget.TabItem();
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
        var gridLayout = new wof.bizWidget.GridLayout();
        gridLayout.setIsInside(true);
        gridLayout.setOverflow('auto');
        gridLayout.setWidth(this.getWidth()-4);
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
        var node = new wof.widget.Tab();
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(width-12);
        node.setHeight(height-25);
        node.insertItem({title:'未命名'});
        node.setActiveIndex(1);

        return node;
    }


};