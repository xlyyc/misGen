/**
 * @bizWidgetClass FlowLayoutSection class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.FlowLayoutSection = function () {
    this._version = '1.0';

    this.setIsInside(true);

   // this.getDomInstance().css('overflow','hidden');

    this._backgroundImg = jQuery('<img src="src/img/backgroud.gif" style="position:absolute;cursor:pointer;opacity:0;filter:alpha(opacity=0);width:100%;height:100%;">');


};
wof.bizWidget.FlowLayoutSection.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _label: null,

    _cols: null, //列数

    _rows: null, //行数

    _title:null, //标题

    _titleHeight:null,  //标题高度

    _itemHeight: null,  //item高度

    _isExpand: null,

    _index: null,

    _backgroundImg: null,

    _mustInOrder: null,   //item是否严格遵循次序排列

    _isAutoExt: null,

    /**
     * get/set 属性方法定义
     */
    getIsAutoExt: function(){
        if(this._isAutoExt==null){
            this._isAutoExt = false;
        }
        return this._isAutoExt;
    },

    setIsAutoExt: function(isAutoExt){
        this._isAutoExt = isAutoExt;
    },

    getMustInOrder: function(){
        if(this._mustInOrder==null){
            this._mustInOrder = false;
        }
        return this._mustInOrder;
    },

    setMustInOrder: function(mustInOrder){
        this._mustInOrder = mustInOrder;
    },

    getIsExpand: function(){
        if(this._isExpand==null){
            this._isExpand = true;
        }
        return this._isExpand;
    },

    setIsExpand: function(isExpand){
        this._isExpand = isExpand;
    },

    getItemHeight: function(){
        if(this._itemHeight==null){
            if(this.parentNode()!=null){
                this._itemHeight = this.parentNode().getItemHeight();
            }else{
                this._itemHeight = 70;
            }
        }
        return this._itemHeight;
    },

    setItemHeight: function(itemHeight){
        this._itemHeight = itemHeight;
    },

    getTitle: function(){
        if(this._title==null){
            this._title = '';
        }
        return this._title;
    },

    setTitle: function(title){
        this._title = title;
    },

    getCols: function(){
		if(this._cols==null){
			if(this.parentNode()!=null){
				this._cols = this.parentNode().getCols();
			}else{
				this._cols = 1;
			}
		}
        return this._cols;
	 },
	 
	 setCols: function(cols){
        this._cols = cols;
	 },

    getRows: function(){
        return this._rows;
    },

    setRows: function (rows) {
        this._rows = rows;
    },
	 
	 getTitleHeight: function(){
		if(this._titleHeight==null){
			this._titleHeight = 30;
		}
        return this._titleHeight;
	 },
	 
	 setTitleHeight: function(titleHeight){
        this._titleHeight = titleHeight;
	 },

    getWidth: function(){
        if(this.parentNode().getWidth()!=null){
            this._width = this.parentNode().getWidth();
        }
        return this._width;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },
	 
    /**
     * Render 方法定义
     */

    initRender: function(){
        var _this = this;

        this.getDomInstance().droppable({
            snap:true,
            accept:function(draggable){
                var b=false;
                var draggableObj = wof.util.ObjectManager.get(draggable.attr('oid'));
                if(draggableObj!=null){
                    if(draggableObj.getClassName()=='wof.bizWidget.FlowLayoutSection'){
                        var layout = draggableObj.parentNode();
                        var thisLayout = _this.parentNode();
                        if(thisLayout.getId()==layout.getId()){
                            b=true;
                        }
                    }
                }
                return b;
            },
            hoverClass: 'ui-state-hover',
            drop:function(event,ui){
                event.stopPropagation();
                _this.sendMessage('wof.bizWidget.FlowLayoutSection_drop', {'sectionId':ui.draggable.attr('oid')});
            }
        });
        this.getDomInstance().draggable({
            cursor:"move",
            opacity: 0.7,
            cursorAt:{
                top:0,
                left:0
            },
            scroll: false,
            containment: 'div[oid="'+this.parentNode().getId()+'"]',  //限定拖放只能在当前FlowLayout内
            start:function(event,ui){
                event.stopPropagation();
                clearTimeout(_this._timeFn);
                _this.getDomInstance().css('zIndex',60000);
            },
            stop:function(event,ui){
                event.stopPropagation();
                _this.getDomInstance().css('zIndex','auto');
            }
        });
    },

    //选择实现
    beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
        this._flowLayout();
    },

    //选择实现
    afterRender: function () {


    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            isAutoExt: this.getIsAutoExt(),
            mustInOrder: this.getMustInOrder(),
			title: this.getTitle(),
			titleHeight: this.getTitleHeight(),
			cols: this.getCols(),
            rows: this.getRows(),
			itemHeight: this.getItemHeight(),
            isExpand: this.getIsExpand(),
            index: this.getIndex()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setIsAutoExt(data.isAutoExt);
        this.setMustInOrder(data.mustInOrder);
		this.setTitle(data.title);
		this.setTitleHeight(data.titleHeight);
		this.setCols(data.cols);
        this.setRows(data.rows);
		this.setItemHeight(data.itemHeight);
        this.setIsExpand(data.isExpand);
        this.setIndex(data.index);

        //如果是clone过来的 会直接创建一个label对象 需要先移除
        var nodes = this.childNodes();
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].getClassName()=='wof.widget.Label'){
                nodes[i].remove(true);
                break;
            }
        }
        this.calcLayout();
    },

    _insideOnReceiveMessage:{
        'wof.bizWidget.FlowLayoutItem_itemDrop':function(message){
            console.log(message.id+'   '+this.getClassName());
            var insertItem = wof.util.ObjectManager.get(message.data.itemId);
            var item = wof.util.ObjectManager.get(message.sender.id);
            insertItem.remove();
            insertItem.beforeTo(item);

            this.calcLayout();
            this.parentNode().calcLayout();

            this.parentNode().sendMessage('wof_object_resize');
            this.parentNode().sendMessage('wof.bizWidget.FlowLayout_active');
            return false;
        }
    },

    //找到指定行列号的item
    findItemByRank: function(itemRank){
        var item = null;
        if(!jQuery.isEmptyObject(itemRank)){
            var items = this.findItems();
            for(var i=0;i<items.length;i++){
                if(items[i].getRow()==itemRank.row && items[i].getCol()==itemRank.col){
                    item = items[i];
                    break;
                }
            }
        }
        return item;
    },

    //判断是否可以删除item
    canDeleteItem: function(item){
        var b = true;
        if(item.getIsFixItem()==true){  //锁定不能被删除
            b = false;
        }
        return b;
    },

    //删除item
    deleteItem: function(item){
        if(this.findItems().length==1){ //如果item只剩一个
            item.setColspan(1);
            item.setRowspan(1);
            item.removeChildren(true);
        }else{
            item.removeChildren(true);
            item.remove(true);
        }
    },

	//减少列数
    reduceItemColspan: function(item){
        item.setColspan(item.getColspan()-1);
	},

    //判断是否可以减少列数
    canReduceItemColspan: function(item){
        var b = true;
        if(item.getIsFixItem()==false){
            if(item.getColspan()==1){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //判断是否可以增加列数
    canAddItemColspan: function(item){
        var b = true;
        if(item.getIsFixItem()==false){
            if(item.getColspan()+1 > this.getCols()){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

	//增加列数
    addItemColspan: function(item){
        item.setColspan(item.getColspan()+1);
	},

    //判断是否可以增加行数
    canAddItemRowspan: function(item){
        var b = true;
        if(item.getIsFixItem()==true){
            b = false;
        }
        return b;
    },

    //增加行数
    addItemRowspan: function(item){
        item.setRowspan(item.getRowspan()+1);
    },

    //判断是否可以减少行数
    canReduceItemRowspan: function(item){
        var b = true;
        if(item.getIsFixItem()==false){
            if(item.getRowspan()==1){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //判断是否可以解锁
    canUnfixItem: function(item){
        var b = true;
        if(item.getIsFixItem()==false){
            b = false;
        }
        return b;
    },

    //解锁item
    unfixItem: function(item){
        item.setIsFixItem(false);
    },

    //判断是否可以锁定
    canFixItem: function(item){
        var b = true;
        if(item.getIsFixItem()==true){
            b = false;
        }
        return b;
    },

    //锁定item
    fixItem: function(item){
        item.setIsFixItem(true);
    },

    //减少列数
    reduceItemRowspan: function(item){
        item.setRowspan(item.getRowspan()-1);
    },

    /**
     * 设置当前section 标题样式
     * flag true 高亮 false 不高亮
     */
    setSectionStyle: function(flag){
        this._label.setIsBold(flag);
        this._label.setIsHighlight(flag);
        this._label.render();
    },

    //设置当前激活的item背景色
    activeItemStyle: function(activeItem){
        //设置当前选中item背景
        activeItem.getDomInstance().css('backgroundColor','#efefef');
    },

    //找到所有item
    findItems: function(){
        var items = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.FlowLayoutItem'){
                items.push(node);
            }
        }

        return items;
    },

    //计算布局
    calcLayout: function(){
        var placeItemTable = new wof.util.Hashtable(); //位置对应item table
        var notFixedItems = []; //尚未布局的非fix类型的item列表
        var layoutItems = []; //所有需要布局的item
        var fixItems = []; //fix类型的item列表
        var currSpace = null; //当前布局space
        var itemHeight = null;
        var itemWidth = null;
        var sectionWidth = null;
        var rows = null;
        var items = [];
        var _this = this;
        var labelHeight = this.getTitleHeight();
        //为指定的item查找到可以进行布局的位置
        function findCanLayoutSpace(item){
            var space = null;
            var colspan = item.getColspan();
            var rowspan = item.getRowspan();
            var startR = 1;
            var startC = 1;
            if(_this.getMustInOrder()==true){
                if(currSpace!=null){
                    startR = (currSpace.top - labelHeight)/itemHeight+1;
                    startC = currSpace.left/itemWidth+1;
                }
            }
            for(var r=1;space==null;r++){
                var top = (r-1) * itemHeight + labelHeight;
                for(var c=1;c<=_this.getCols();c++){
                    if((startR==r&&startC<=c)||startR<r){
                        var flag = true;
                        var left = (c-1) * itemWidth;
                        for(var rs=0;rs<rowspan;rs++){
                            for(var cs=0;cs<colspan;cs++){
                                var placeTop = top+(itemHeight*rs);
                                var placeLeft = left+(itemWidth*cs);
                                if((placeLeft+itemWidth)<=sectionWidth){ //位置的left不能超过当前section的width
                                    var obj = placeItemTable.items(placeTop+','+placeLeft);
                                    if(obj!=null){ //如果该位置已经存在item
                                        flag = false;
                                        break;
                                    }
                                }else{
                                    flag = false;
                                    break;
                                }
                            }
                        }
                        if(flag==true){
                            space = {top:top,left:left};
                            break;
                        }
                    }
                }
            }
            currSpace = space;
            return space;
        }
        //检查指定的行是否是空行
        function isEmptyRow(r){
            var b = false;
            var count = 0;
            if(r>1){
                var top = (r-1) * itemHeight + labelHeight;
                for(var c=_this.getCols(); c>=1; c--){
                    var left = (c-1) * itemWidth;
                    var obj = placeItemTable.items(top+','+left);
                    if(obj.getTop()==top){
                        if(obj.getColspan()==1 && obj.getRowspan()==1 && obj.childNodes().length==0 && obj.getIsFixItem()==false){
                            count++;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
            }
            if(count==_this.getCols()){
                b = true;
            }
            return b;
        }
        //计算行数
        function calcRows(){
            var rs = 0;
            if(items.length>0){
                var maxH = items[0].getTop()+items[0].getHeight();
                for(var i=1;i<items.length;i++){
                    var item = items[i];
                    var tempH = item.getTop()+item.getHeight();
                    if(maxH<tempH){
                        maxH = tempH;
                    }
                }
                rs = Math.ceil((maxH-labelHeight)/_this.getItemHeight());
            }
            return rs;
        }

        items = this.findItems();

        //是否随内容高度自适应高度
        if(this.getIsAutoExt()==true){
            var maxItemScrollHeight = 0;
            for(var i=0;i<items.length;i++){
                var ns = items[i].childNodes();
                if(ns.length>0){
                    var itemHeight = ns[0].getHeight();
                    var rowspan = items[i].getRowspan();
                    if(maxItemScrollHeight<Math.ceil(itemHeight/rowspan)){
                        maxItemScrollHeight = Math.ceil(itemHeight/rowspan);
                    }
                }
            }
            if(maxItemScrollHeight>0){
                this.setItemHeight(maxItemScrollHeight+6);
            }
        }

        if(items.length>0){
            itemHeight = this.getItemHeight();
            itemWidth = Math.floor(this.getWidth()/this.getCols());
            sectionWidth = itemWidth * this.getCols();
            for(var i=0;i<items.length;i++){
                var item = items[i];
                item.setWidth(itemWidth*item.getColspan());
                item.setHeight(itemHeight*item.getRowspan());
                item.remove();
                if(item.getIsFixItem()==true && item.getRow()!=null && item.getCol()!=null){ //fix类型的item
                    fixItems.push(item);
                }else{
                    notFixedItems.push(item);
                }
            }
        }
        //fix类型item先行安排
        for(var i=fixItems.length-1;i>=0;i--){
            var fixItem = fixItems[i];
            var row = fixItem.getRow();
            var col = fixItem.getCol();
            var colspan = fixItem.getColspan();
            var rowspan = fixItem.getRowspan();
            var top = (row-1) * itemHeight + labelHeight;
            var left = (col-1) * itemWidth;
            fixItem.setTop(top);
            fixItem.setLeft(left);
            for(var rs=0;rs<rowspan;rs++){
                for(var cs=0;cs<colspan;cs++){
                    var placeTop = top+(itemHeight*rs);
                    var placeLeft = left+(itemWidth*cs);
                    placeItemTable.add(placeTop+','+placeLeft, fixItem);
                }
            }
        }
        //处理尚未布局的非fix类型的item
        for(var i=0;i<notFixedItems.length;i++){
            var item = notFixedItems[i];
            var space = findCanLayoutSpace(item);
            item.setTop(space.top);
            item.setLeft(space.left);
            var colspan = item.getColspan();
            var rowspan = item.getRowspan();
            for(var rs=0;rs<rowspan;rs++){
                for(var cs=0;cs<colspan;cs++){
                    var placeTop = item.getTop()+(itemHeight*rs);
                    var placeLeft = item.getLeft()+(itemWidth*cs);
                    placeItemTable.add(placeTop+','+placeLeft, item);
                }
            }
        }
        //补全每行空缺的item
        rows = calcRows();
        for(var r=1; r<=rows; r++){
            var top = (r-1) * itemHeight + labelHeight;
            for(var c=1; c<=this.getCols(); c++){
                var left = (c-1) * itemWidth;
                var obj = placeItemTable.items(top+','+left);
                if(obj==null){
                    var newItem = wof$.create('FlowLayoutItem');
                    newItem.setWidth(itemWidth);
                    newItem.setHeight(itemHeight);
                    newItem.setTop(top);
                    newItem.setLeft(left);
                    newItem.setScale(this.getScale());
                    placeItemTable.add(top+','+left, newItem);
                }
            }
        }
        //反向查找过滤掉空行 如果一行中所有item都没有内容 并且colspan和rowspan为1 则将此行移除
        var canRemoveRow = true;
        var removeRowCount = 0;
        for(var r=rows; r>=1; r--){
            var top = (r-1) * itemHeight + labelHeight;
            if(canRemoveRow==true){
                if(isEmptyRow(r)==false){
                    for(var c=this.getCols(); c>=1; c--){
                        var left = (c-1) * itemWidth;
                        var obj = placeItemTable.items(top+','+left);
                        if(obj.getTop()==top && obj.getLeft()==left){
                            layoutItems.push(obj);
                        }
                    }
                    canRemoveRow = false;
                }else{
                    for(var c=this.getCols(); c>=1; c--){
                        var left = (c-1) * itemWidth;
                        var obj = placeItemTable.items(top+','+left);
                        if(obj.getTop()==top && obj.getLeft()==left){
                            obj.remove(true);
                        }
                    }
                    removeRowCount++;
                }
            }else{
                for(var c=this.getCols(); c>=1; c--){
                    var left = (c-1) * itemWidth;
                    var obj = placeItemTable.items(top+','+left);
                    if(obj.getTop()==top && obj.getLeft()==left){
                        layoutItems.push(obj);
                    }
                }
            }
        }
        this.setRows(rows-removeRowCount);
        //添加到dom节点
        for(var i=layoutItems.length-1; i>=0; i--){
            var item = layoutItems[i];
            item.appendTo(this);
        }
        if(this.getIsExpand()==true){
            this.setHeight(itemHeight*this.getRows()+labelHeight);
        }else{
            this.setHeight(labelHeight);
        }
        //重设行列号
        items = this.findItems();
        if(items.length>0){
            var itemHeight = this.getItemHeight();
            var itemWidth = items[0].getWidth()/items[0].getColspan();
            for(var i=0;i<items.length;i++){
                var item = items[i];
                var top = item.getTop()-labelHeight;
                var left = item.getLeft();
                var row = Math.ceil(top/itemHeight)+1;
                var col = Math.ceil(left/itemWidth)+1;
                item.setRow(row);
                item.setCol(col);
            }
        }
        //添加label
        if(this._label==null){
            var label = wof$.create('Label');
            label.setIsInside(true);
            label.setTop(0);
            label.setLeft(0);
            this._label = label;
        }
        this._label.setIsUnderline(true);
        this._label.setScale(this.getScale());
        this._label.setHeight(this.getTitleHeight());
        this._label.setText(this.getTitle());
        this._label.setIsBold(false);
        this._label.setIsHighlight(false);
        this._label.setWidth(this.getWidth());
        this._label.remove();
        if(this.childNodes().length>0){
            this._label.beforeTo(this.childNodes()[0]);
        }else{
            this._label.appendTo(this);
        }

    },

    //进行流式布局
    _flowLayout: function(){
        //设置label
        this._label.getDomInstance().css('width',(this.getWidth()*this.getScale()-4)+'px');
        this._label.getDomInstance().css('height',(this.getTitleHeight()*this.getScale())+'px');

        //屏蔽label对象的事件
        this._label.getDomInstance().after(this._backgroundImg);

        //设置section div容器高度和宽度
        this.getDomInstance().css('height', (this.getHeight()*this.getScale())+'px');
        this.getDomInstance().css('width', (this.getWidth()*this.getScale())+'px');

        var items = this.findItems();
        for(var i=0;i<items.length;i++){
            items[i].getDomInstance().css('border','1px solid #bcbcbc').css('backgroundColor','#fff');
        }
    }

};