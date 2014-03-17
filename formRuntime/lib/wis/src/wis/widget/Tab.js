/**
 *
 * 标签页  l
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
            this._tab.prepend(li);
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
        this.getDomInstance().tabs('refresh');
        if(this.getActiveItemIndex()!=null){
            this.getDomInstance().tabs({active:(this.getActiveItemIndex()-1)});
        }
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
    },

    /**
     *
     * 增加item
     */
    addItem: function(item){
        var items = this.getItems();
        items.push(item);
        var div = '<div id="'+item['name']+'">'+item['label']+'</div>';
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
    }

};