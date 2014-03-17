/**
 *
 * 标签页
 *
 */
wis.widget.Tab = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','hidden');
};
wis.widget.Tab.prototype = {

    _cid:null,         //构件id
    _name:null,   //构件名称
    _items:null,  //标签项数据 [{name:'name1',width:100,label:'label1',closeable:true,icon:'add',iconPosition:'left'}]
    _activeItemIndex:null, //当前激活的标签项index

    _tab:null,

    getCid: function () {
        if(this._cid==null){
            this._cid = this.getId();
        }
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

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
        return this._activeItemIndex || 1;
    },

    setActiveItemIndex: function (activeItemIndex) {
        this._activeItemIndex = activeItemIndex;
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
    initRender: function(){
        this._tab = jQuery('<ul>');
        this.getDomInstance().append(this._tab);
        this.getDomInstance().tabs();
    },

    //渲染前处理方法
    beforeRender: function () {
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
    afterRender: function () {
        var _this = this;
        this.getDomInstance().tabs({
            heightStyle:'fill',
            activate: function(event,ui){
                event.stopPropagation();
                var name = ui.newPanel.attr('id');
                var index = _this.getIndexByName(name);
                _this.setActiveItemIndex(index);
            }
        });
        this.getDomInstance().tabs('refresh');
        this.getDomInstance().tabs({active:(this.getActiveItemIndex()-1)});
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid(),
            name:this.getName(),
            items:this.getItems(),
            activeItemIndex:this.getActiveItemIndex()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
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
     * itemIndex 在指定item序号内插入(序号从1开始)
     */
    insertNode: function(node, itemIndex){
        if(itemIndex==null){
            itemIndex = this.getActiveItemIndex();
        }
        if(node!=null){
            var item = this.getItems()[itemIndex-1];
            var div = this.getDomInstance().children('#'+item['name']);
            div.append(node);
        }else{
            console.log('node对象为null 不能插入');
        }
    }

};