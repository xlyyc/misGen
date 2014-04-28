/**
 * @bizWidgetClass VoucherItemGroup class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherItemGroup = function () {
    this._version = '1.0';

    this.setIsInside(true);

    this.getDomInstance().css('overflow','hidden');

    this._backgroundImg = jQuery('<img src="src/img/backgroud.gif" style="position:absolute;cursor:pointer;opacity:0;filter:alpha(opacity=0);width:100%;height:100%;">');


};
wof.bizWidget.VoucherItemGroup.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _mustInOrder: null,   //组内各项是否严格遵循次序排列

    _itemHeight: null,  //表头单元格高度

    _groupCaption: null,   //分组名称

    _colsNum: null,   //分组列数

    _index: null,  //渲染位置

    _isHead: null,   //是否为head，即不在tab中展示，并且viewtype选择HEAD_TAB时的配置，其他类型忽略该属性

    _label: null,

    _rows: null, //行数

    _titleHeight:null,  //标题高度

    _isExpand: null,

    _backgroundImg: null,

    _voucherComponent: null,


    /**
     * get/set 属性方法定义
     */

    getIsHead: function(){
        if(this._isHead==null){
            this._isHead = false;
        }
        return this._isHead;
    },

    setIsHead: function(isHead){
        this._isHead = isHead;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },

    getColsNum: function(){
        if(this._colsNum==null){
            if(this.getOriginNode()!=null){
                this._colsNum = 4;
            }
        }
        return this._colsNum;
    },

    setColsNum: function(colsNum){
        this._colsNum = colsNum;
    },

    getGroupCaption: function(){
        if(this._groupCaption==null){
            this._groupCaption = '';
        }
        return this._groupCaption;
    },

    setGroupCaption: function(groupCaption){
        this._groupCaption = groupCaption;
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
            if(this.getOriginNode()!=null){
                this._itemHeight = this.getOriginNode().getItemHeight();
            }else{
                this._itemHeight = 70;
            }
        }
        return this._itemHeight;
    },

    setItemHeight: function(itemHeight){
        this._itemHeight = itemHeight;
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
        if(this.getOriginNode()!=null){
            this._width = this.getOriginNode().getWidth();
        }
        return this._width;
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
                    if(draggableObj.getClassName()=='wof.bizWidget.VoucherItemGroup'){
                        var layout = draggableObj.getOriginNode();
                        var thisLayout = _this.getOriginNode();
                        if(thisLayout!=null&&thisLayout.getId()==layout.getId()){
                            b=true;
                        }
                    }
                }
                return b;
            },
            hoverClass: 'ui-state-hover',
            drop:function(event,ui){
                event.stopPropagation();
                _this.sendMessage('wof.bizWidget.VoucherItemGroup_drop', {'voucherItemGroupId':ui.draggable.attr('oid')});
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
            containment: 'div[oid="'+this.getOriginNode().getId()+'"]',  //限定拖放只能在当前VoucherComponent内
            start:function(event,ui){
                event.stopPropagation();
                clearTimeout(this._timeFn);
                _this.getDomInstance().css('zIndex',60000);
            },
            stop:function(event,ui){
                event.stopPropagation();
                _this.getDomInstance().css('zIndex','auto');
            }
        });
    },

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
        this._flowLayout();
    },

    //选择实现
    _afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            mustInOrder:this.getMustInOrder(),
            isHead:this.getIsHead(),
            index:this.getIndex(),
            colsNum:this.getColsNum(),
            groupCaption:this.getGroupCaption(),
            itemHeight:this.getItemHeight(),
            titleHeight: this.getTitleHeight(),
            rows: this.getRows(),
            isExpand: this.getIsExpand()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setMustInOrder(data.mustInOrder);
        this.setIsHead(data.isHead);
        this.setIndex(data.index);
        this.setColsNum(data.colsNum);
        this.setGroupCaption(data.groupCaption);
        this.setItemHeight(data.itemHeight);
        this.setTitleHeight(data.titleHeight);
        this.setRows(data.rows);
        this.setIsExpand(data.isExpand);

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
        'wof.bizWidget.VoucherItem_voucherItemDrop':function(message){
            console.log(message.id+'   '+this.getClassName());
            var insertVoucherItem = wof.util.ObjectManager.get(message.data.voucherItemId);
            var voucherItem = wof.util.ObjectManager.get(message.sender.id);
            insertVoucherItem.remove();
            insertVoucherItem.beforeTo(voucherItem);

            this.calcLayout();
            var voucherCOmponent = this.getOriginNode();
            voucherCOmponent.calcLayout();
            voucherCOmponent.render();

            voucherCOmponent.sendMessage('wof.bizWidget.VoucherComponent_active');
            return false;
        }
    },

    findVoucherItemByRank: function(voucherItemRank){
        var voucherItem = null;
        if(!jQuery.isEmptyObject(voucherItemRank)){
            var voucherItems = this.findVoucherItems();
            for(var i=0;i<voucherItems.length;i++){
                if(voucherItems[i].getRowNum()==voucherItemRank.rowNum && voucherItems[i].getColNum()==voucherItemRank.colNum){
                    voucherItem = voucherItems[i];
                    break;
                }
            }
        }
        return voucherItem;
    },

    //判断是否可以删除voucherItem
    canDeleteVoucherItem: function(voucherItem){
        var b = true;
        if(voucherItem.getIsFixItem()==true){  //锁定不能被删除
            b = false;
        }
        return b;
    },

    //删除voucherItem
    //return true 真正移除 false 没有真正移除
    deleteVoucherItem: function(voucherItem){
        var flag = true;
        if(this.findVoucherItems().length==1){ //如果voucherItem只剩一个
            voucherItem.setColspan(1);
            voucherItem.setRowspan(1);
            flag = false;
        }else{
            voucherItem.removeChildren(true);
            voucherItem.remove(true);
        }
        return flag;
    },

    //减少列数
    reduceVoucherItemColspan: function(voucherItem){
        voucherItem.setColspan(voucherItem.getColspan()-1);
    },

    //判断是否可以减少列数
    canReduceVoucherItemColspan: function(voucherItem){
        var b = true;
        if(voucherItem.getIsFixItem()==false){
            if(voucherItem.getColspan()==1){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //判断是否可以增加列数
    canAddVoucherItemColspan: function(voucherItem){
        var b = true;
        if(voucherItem.getIsFixItem()==false){
            if(voucherItem.getColspan()+1 > this.getColsNum()){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //增加列数
    addVoucherItemColspan: function(voucherItem){
        voucherItem.setColspan(voucherItem.getColspan()+1);
    },

    //判断是否可以增加行数
    canAddVoucherItemRowspan: function(voucherItem){
        var b = true;
        if(voucherItem.getIsFixItem()==true){
            b = false;
        }
        return b;
    },

    //增加行数
    addVoucherItemRowspan: function(voucherItem){
        voucherItem.setRowspan(voucherItem.getRowspan()+1);
    },

    //判断是否可以减少行数
    canReduceVoucherItemRowspan: function(voucherItem){
        var b = true;
        if(voucherItem.getIsFixItem()==false){
            if(voucherItem.getRowspan()==1){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //判断是否可以解锁
    canUnfixVoucherItem: function(voucherItem){
        var b = true;
        if(voucherItem.getIsFixItem()==false){
            b = false;
        }
        return b;
    },

    //解锁voucherItem
    unfixVoucherItem: function(voucherItem){
        voucherItem.setIsFixItem(false);
    },

    //判断是否可以锁定
    canFixVoucherItem: function(voucherItem){
        var b = true;
        if(voucherItem.getIsFixItem()==true){
            b = false;
        }
        return b;
    },

    //锁定voucherItem
    fixVoucherItem: function(voucherItem){
        voucherItem.setIsFixItem(true);
    },

    //减少列数
    reduceVoucherItemRowspan: function(voucherItem){
        voucherItem.setRowspan(voucherItem.getRowspan()-1);
    },

    /**
     * 设置当前VoucherItemGroup 标题样式
     * flag true 高亮 false 不高亮
     */
    setVoucherItemGroupStyle: function(flag){
        this._label.setIsBold(flag);
        this._label.setIsHighlight(flag);
        this._label.render();
    },

    //设置当前激活的voucherItem背景色
    activeVoucherItemStyle: function(activeVoucherItem){
        //设置当前选中voucherItem背景
        activeVoucherItem.getDomInstance().css('backgroundColor','#efefef');
    },

    //找到所有voucherItem
    findVoucherItems: function(){
        var voucherItems = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.VoucherItem'){
                voucherItems.push(node);
            }
        }
        return voucherItems;
    },

    //获得所有voucherItem 并且重设voucherItem行列号
    _getVoucherItems: function(){
        var voucherItems = this.findVoucherItems();
        if(voucherItems.length>0){
            var voucherItemHeight = this.getItemHeight();
            var voucherItemWidth = voucherItems[0].getWidth()/voucherItems[0].getColspan();
            var labelHeight = this._label.getHeight();
            for(var i=0;i<voucherItems.length;i++){
                var voucherItem = voucherItems[i];
                var top = voucherItem.getTop()-labelHeight;
                var left = voucherItem.getLeft();
                var rowNum = Math.ceil(top/voucherItemHeight)+1;
                var colNum = Math.ceil(left/voucherItemWidth)+1;
                voucherItem.setRowNum(rowNum);
                voucherItem.setColNum(colNum);
            }
        }
        return voucherItems;
    },

    //计算布局
    calcLayout: function(){
        var placeVoucherItemTable = new wof.util.Hashtable(); //位置对应item table
        var notFixedVoucherItems = []; //尚未布局的非fix类型的item列表
        var layoutVoucherItems = []; //所有需要布局的item
        var fixVoucherItems = []; //fix类型的item列表
        var currSpace = null; //当前布局space
        var itemHeight = null;
        var voucherItemWidth = null;
        var voucherItemGroupWidth = null;
        var rows = null;
        var voucherItems = [];
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
                    startC = currSpace.left/voucherItemWidth+1;
                }
            }
            for(var r=1;space==null;r++){
                var top = (r-1) * itemHeight + labelHeight;
                for(var c=1;c<=_this.getColsNum();c++){
                    if((startR==r&&startC<=c)||startR<r){
                        var flag = true;
                        var left = (c-1) * voucherItemWidth;
                        for(var rs=0;rs<rowspan;rs++){
                            for(var cs=0;cs<colspan;cs++){
                                var placeTop = top+(itemHeight*rs);
                                var placeLeft = left+(voucherItemWidth*cs);
                                if((placeLeft+voucherItemWidth)<=voucherItemGroupWidth){ //位置的left不能超过当前section的width
                                    var obj = placeVoucherItemTable.items(placeTop+','+placeLeft);
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
                for(var c=_this.getColsNum(); c>=1; c--){
                    var left = (c-1) * voucherItemWidth;
                    var obj = placeVoucherItemTable.items(top+','+left);
                    if(obj.getTop()==top){
                        if(obj.getColspan()==1 && obj.getRowspan()==1 && obj.childNodes().length==0 && obj.getIsFixItem()!=true){
                            count++;
                        }else{
                            break;
                        }
                    }else{
                        break;
                    }
                }
            }
            if(count==_this.getColsNum()){
                b = true;
            }
            return b;
        }
        //计算行数
        function calcRows(){
            var rs = 0;
            if(voucherItems.length>0){
                var maxH = voucherItems[0].getTop()+voucherItems[0].getHeight();
                for(var i=1;i<voucherItems.length;i++){
                    var item = voucherItems[i];
                    var tempH = item.getTop()+item.getHeight();
                    if(maxH<tempH){
                        maxH = tempH;
                    }
                }
                rs = Math.ceil((maxH-labelHeight)/_this.getItemHeight());
            }
            return rs;
        }

        voucherItems = this.findVoucherItems();
        if(voucherItems.length>0){
            itemHeight = this.getItemHeight();
            voucherItemWidth = Math.floor(this.getWidth()/this.getColsNum());
            voucherItemGroupWidth = voucherItemWidth * this.getColsNum();
            for(var i=0;i<voucherItems.length;i++){
                var voucherItem = voucherItems[i];
                voucherItem.setWidth(voucherItemWidth*voucherItem.getColspan());
                voucherItem.setHeight(itemHeight*voucherItem.getRowspan());
                voucherItem.remove();
                if(voucherItem.getIsFixItem()==true && voucherItem.getRowNum()!=null && voucherItem.getColNum()!=null){ //fix类型的voucherItem
                    fixVoucherItems.push(voucherItem);
                }else{
                    notFixedVoucherItems.push(voucherItem);
                }
            }
        }

        //fix类型item先行安排
        for(var i=fixVoucherItems.length-1;i>=0;i--){
            var fixItem = fixVoucherItems[i];
            var row = fixItem.getRowNum();
            var col = fixItem.getColNum();
            var colspan = fixItem.getColspan();
            var rowspan = fixItem.getRowspan();
            var top = (row-1) * itemHeight + labelHeight;
            var left = (col-1) * voucherItemWidth;
            fixItem.setTop(top);
            fixItem.setLeft(left);
            for(var rs=0;rs<rowspan;rs++){
                for(var cs=0;cs<colspan;cs++){
                    var placeTop = top+(itemHeight*rs);
                    var placeLeft = left+(voucherItemWidth*cs);
                    placeVoucherItemTable.add(placeTop+','+placeLeft, fixItem);
                }
            }
        }

        //处理尚未布局的非fix类型的item
        for(var i=0;i<notFixedVoucherItems.length;i++){
            var item = notFixedVoucherItems[i];
            var space = findCanLayoutSpace(item);
            item.setTop(space.top);
            item.setLeft(space.left);
            var colspan = item.getColspan();
            var rowspan = item.getRowspan();
            for(var rs=0;rs<rowspan;rs++){
                for(var cs=0;cs<colspan;cs++){
                    var placeTop = item.getTop()+(itemHeight*rs);
                    var placeLeft = item.getLeft()+(voucherItemWidth*cs);
                    placeVoucherItemTable.add(placeTop+','+placeLeft, item);
                }
            }
        }
        //补全每行空缺的item
        rows = calcRows();
        for(var r=1; r<=rows; r++){
            var top = (r-1) * itemHeight + labelHeight;
            for(var c=1; c<=this.getColsNum(); c++){
                var left = (c-1) * voucherItemWidth;
                var obj = placeVoucherItemTable.items(top+','+left);
                if(obj==null){
                    var newItem = wof$.create('VoucherItem');
                    newItem.setWidth(voucherItemWidth);
                    newItem.setHeight(itemHeight);
                    newItem.setTop(top);
                    newItem.setLeft(left);
                    newItem.setScale(this.getScale());
                    placeVoucherItemTable.add(top+','+left, newItem);
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
                    for(var c=this.getColsNum(); c>=1; c--){
                        var left = (c-1) * voucherItemWidth;
                        var obj = placeVoucherItemTable.items(top+','+left);
                        if(obj.getTop()==top && obj.getLeft()==left){
                            layoutVoucherItems.push(obj);
                        }
                    }
                    canRemoveRow = false;
                }else{
                    for(var c=this.getColsNum(); c>=1; c--){
                        var left = (c-1) * voucherItemWidth;
                        var obj = placeVoucherItemTable.items(top+','+left);
                        if(obj.getTop()==top && obj.getLeft()==left){
                            obj.remove(true);
                        }
                    }
                    removeRowCount++;
                }
            }else{
                for(var c=this.getColsNum(); c>=1; c--){
                    var left = (c-1) * voucherItemWidth;
                    var obj = placeVoucherItemTable.items(top+','+left);
                    if(obj.getTop()==top && obj.getLeft()==left){
                        layoutVoucherItems.push(obj);
                    }
                }
            }
        }
        this.setRows(rows-removeRowCount);
        //添加到dom节点
        for(var i=layoutVoucherItems.length-1; i>=0; i--){
            var item = layoutVoucherItems[i];
            item.appendTo(this);
        }
        if(this.getIsExpand()==true){
            this.setHeight(itemHeight*this.getRows()+labelHeight+80);
        }else{
            this.setHeight(labelHeight);
        }
        //重设行列号
        voucherItems = this.findVoucherItems();
        if(voucherItems.length>0){
            var itemHeight = this.getItemHeight();
            var voucherItemWidth = voucherItems[0].getWidth()/voucherItems[0].getColspan();
            for(var i=0;i<voucherItems.length;i++){
                var item = voucherItems[i];
                var top = item.getTop()-labelHeight;
                var left = item.getLeft();
                var row = Math.ceil(top/itemHeight)+1;
                var col = Math.ceil(left/voucherItemWidth)+1;
                item.setRowNum(row);
                item.setColNum(col);
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
        this._label.setText(this.getGroupCaption());
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

        var voucherItems = this.findVoucherItems();
        for(var i=0;i<voucherItems.length;i++){
            voucherItems[i].getDomInstance().css('border','1px solid #bcbcbc').css('backgroundColor','#fff');
        }
    },

};