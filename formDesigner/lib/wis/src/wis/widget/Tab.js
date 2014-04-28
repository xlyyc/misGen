/**
 *
 * 标签页
 *
 */
wis.widget.Tab = function () {
    this._version = '1.0';

    //this.getDomInstance().css('overflow','hidden');
    //this.setPosition('static');
};
wis.widget.Tab.prototype = {

    _name:null,   //构件名称
    _items:null,  //标签项数据 [{name:'name1',width:100,label:'label1',closeable:true,icon:'add',iconPosition:'left'}]
    _activeItemIndex:null, //当前激活的标签项index
    _onClick:null,

    _tab:null,

    _renderFlag:null,

    getName: function () {
        return this._name || '';
    },

    setName: function (name) {
        this._name = name;
    },

    getItems: function () {
        return this._items || [];
    },

    setItems: function (items) {
        this._items = items;
    },

    getActiveItemIndex: function () {
        return this._activeItemIndex;
    },

    setActiveItemIndex: function (activeItemIndex) {
        this._activeItemIndex = activeItemIndex;
    },

    onClick: function (callBack) {
        this._onClick = callBack;
    },

    /**
     * 初始化方法
     */
    _init:function(data){

    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    _initRender: function(){
        var _this = this;
        this._tab = jQuery('<ul>');
        this.getDomInstance().append(this._tab);
        this.getDomInstance().tabs({
            heightStyle:'fill',
            activate: function(event,ui){
                event.stopPropagation();
                if(_this._renderFlag==false){ //如果不是在render过程中触发
                    var name = ui.newPanel.attr('id');
                    var index = _this.getIndexByName(name);
                    _this.setActiveItemIndex(index);
                    if (_this._onClick) {
                        _this._onClick(_this);
                    }
                }
            }
        });
    },

    //渲染前处理方法
    _beforeRender: function () {
        this._renderFlag = true;
        this._tab.children().remove();
    },

    //渲染方法
    render: function () {
        var items = this.getItems();
        for(var i=items.length-1;i>=0;i--){
            var item = items[i];
            var li = '<li><a href="#'+item['name']+'">'+item['label']+'</a></li>';
            this._tab.prepend(jQuery(li));
        }
        for(var i=0;i<items.length;i++){
            var item = items[i];
            var name = item['name'];
            var div = this.getDomInstance().children('#'+name);
            div.detach();
            this.getDomInstance().append(div);
        }
    },

    //渲染后处理方法
    _afterRender: function () {
        this.getDomInstance().tabs('refresh');
        this.getDomInstance().tabs({'active':(this.getActiveItemIndex()-1)});
        this._renderFlag = false;
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name:this.getName(),
            items:this.getItems(),
            activeItemIndex:this.getActiveItemIndex()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setItems(data.items);
        this.setActiveItemIndex(data.activeItemIndex);

        var items = this.getItems();
        this.setItems([]);
        for(var i=0;i<items.length;i++){
            var item = items[i];
            this.insertItem(item);
        }
    },

    /**
     *
     * 增加item
     * index 在指定index后插入 index从1开始
     */
    insertItem: function(item, index){
        var items = this.getItems();
        if(index==null){
            items.push(item);
        }else{
            items.splice(index-1,0,item);
        }
        var div = '<div id="'+item['name']+'"></div>';
        this.getDomInstance().append(div);
        this.setItems(items);
    },

    /**
     *
     * 根据name删除item
     */
    removeItemByName: function(name){
        var items = this.getItems();
        for(var i=0;i<items.length;i++){
            var item = items[i];
            if(item['name']==name){
                this.getDomInstance().children('#'+item['name']).remove();
                items.splice(i,1);
                break;
            }
        }
        this.setItems(items);
    },

    /**
     *
     * 根据index删除item index从1开始
     */
    removeItemByIndex: function(index){
        var items = this.getItems();
        var item = items[index-1];
        this.getDomInstance().children('#'+item['name']).remove();
        items.splice(index-1,1);
        this.setItems(items);
    },

    /**
     *
     * 根据name查找index  index从1开始
     */
    getIndexByName: function(name){
        var index = 0;
        var items = this.getItems();
        for(var i=0;i<items.length;i++){
            var item = items[i];
            if(item['name']==name){
                index = i+1;
                break;
            }
        }
        return index;
    },

    /**
     * 在指定item插入node节点
     * 如果itemIndex为null 则在当前激活的item中插入
     * node dom节点
     * index 在指定item序号内插入(序号从1开始)
     */
    insertNode: function(node, index){
        if(index==null){
            index = this.getActiveItemIndex();
        }
        if(node!=null){
            var item = this.getItems()[index-1];
            var div = this.getDomInstance().children('#'+item['name']);
            div.append(node);
        }else{
            console.log('node对象为null 不能插入');
        }
    },

    /**
     * 清空并删除指定index的item
     * index (序号从1开始)
     * index为null 全部移除
     */
    removeItem: function(index){
        var items = this.getItems();
        if(index!=null){
            this.removeItemByIndex(index);
        }else{
            var len = items.length;
            for(var i=len-1;i>=0;i--){
                this.removeItemByIndex(i+1);
            }
        }

    }

};