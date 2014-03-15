/**
 * @bizWidgetClass FlowLayout class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.FlowLayout = function () {
    this._version = '1.0';

};
wof.bizWidget.FlowLayout.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //列数
    _cols: null,

    //item高度
    _itemHeight: null,

    //聚焦section序号(从1开始)
    _activeSectionIndex: null,

    //聚焦item行、列号
    _activeItemRank: null,

    /**
     * get/set 属性方法定义
     */

    getItemHeight: function(){
        if(this._itemHeight==null){
            this._itemHeight = 70;
        }
        return this._itemHeight;
    },

    setItemHeight: function(itemHeight){
        this._itemHeight = itemHeight;
    },

    getCols: function(){
        if(this._cols==null){
            this._cols = 1;
        }
        return this._cols;
    },

    setCols: function(cols){
        this._cols = cols;
    },

    //获得当前激活的section index
    getActiveSectionIndex: function(){
        return this._activeSectionIndex;
    },

    //设置当前激活的sectionIndex
    setActiveSectionIndex: function(activeSectionIndex){
        this._activeSectionIndex = activeSectionIndex;
    },

    //获得当前激活的item行列号
    getActiveItemRank: function(){
        return this._activeItemRank;
    },

    //设置当前激活的item行列号
    setActiveItemRank: function(activeItemRank){
        this._activeItemRank = activeItemRank;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        this._layout();
        this.sendMessage('wof.bizWidget.FlowLayout_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            cols: this.getCols(),
            itemHeight: this.getItemHeight(),
            activeSectionIndex: this.getActiveSectionIndex(),
            activeItemRank: this.getActiveItemRank()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setCols(data.cols);
        this.setItemHeight(data.itemHeight);
        this.setActiveSectionIndex(data.activeSectionIndex);
        this.setActiveItemRank(data.activeItemRank);

    },

    _insideOnReceiveMessage:{
        'wof.bizWidget.FlowLayoutSection_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            var section = wof.util.ObjectManager.get(message.sender.id);
            var sectionIndex = section.getIndex();
            this.setActiveSectionIndex(sectionIndex);
            this.setActiveItemRank(null);
            this.render();

            this.sendMessage('wof.bizWidget.FlowLayout_active');
            return false;
        },
        'wof.bizWidget.FlowLayoutSection_dblclick':function(message){
            console.log(message.id+'   '+this.getClassName());
            var section = wof.util.ObjectManager.get(message.sender.id);
            if(section.getIsExpand()==true){
                section.setIsExpand(false);
            }else{
                section.setIsExpand(true);
            }
            section.calcLayout();
            this.calcLayout();
            var sectionIndex = section.getIndex();
            this.setActiveSectionIndex(sectionIndex);
            this.setActiveItemRank(null);

            this.sendMessage('wof_object_resize');
            this.sendMessage('wof.bizWidget.FlowLayout_active');
            return false;
        },
        'wof.bizWidget.FlowLayoutItem_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            var item = wof.util.ObjectManager.get(message.sender.id);
            var sectionIndex = item.parentNode().getIndex();
            this.setActiveSectionIndex(sectionIndex);
            this.setActiveItemRank({row:item.getRow(),col:item.getCol()});
            this.render();

            this.sendMessage('wof.bizWidget.FlowLayout_active');
            return false;
        },
        'wof.bizWidget.FlowLayoutItem_dblclick':function(message){
            console.log(message.id+'   '+this.getClassName());
            var item = wof.util.ObjectManager.get(message.sender.id);
            var sectionIndex = item.parentNode().getIndex();
            this.setActiveSectionIndex(sectionIndex);
            this.setActiveItemRank({row:item.getRow(),col:item.getCol()});
            this.render();

            this.sendMessage('wof.bizWidget.FlowLayout_active');
            return false;
        }

    },

    /**
     * 插入新的section
     * sectionData section数据
     * sectionIndex 在指定section序号前插入(序号从1开始)
     * 如果sectionIndex为null 缺省在最后插入
     */
    insertSection: function(sectionData, sectionIndex){
        if(sectionIndex==null){
            sectionIndex = 1;
        }
        var title = sectionData.title;
        var width = sectionData.width!=null?sectionData.width:this.getWidth();
        var titleHeight = sectionData.titleHeight!=null?sectionData.titleHeight:null;
        var cols = sectionData.cols!=null?sectionData.cols:this.getCols();
        var itemHeight = sectionData.itemHeight!=null?sectionData.itemHeight:this.getItemHeight();
        var isExpand = (sectionData.isExpand==null||sectionData.isExpand=='true'||sectionData.isExpand==true)?true:false;
        var mustInOrder = (sectionData.mustInOrder=='true'||sectionData.mustInOrder==true)?true:false;
        var isAutoExt = (sectionData.isAutoExt=='true'||sectionData.isAutoExt==true)?true:false;

        var newSection = wof$.create('FlowLayoutSection');
        newSection.setWidth(width);
        newSection.setTitleHeight(titleHeight);
        newSection.setTitle(title);
        newSection.setCols(cols);
        newSection.setItemHeight(itemHeight);
        newSection.setIsExpand(isExpand);
        newSection.setMustInOrder(mustInOrder);
        newSection.setIsAutoExt(isAutoExt);
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            newSection.beforeTo(section);
        }else{
            newSection.appendTo(this);
        }
        var newItem = wof$.create('FlowLayoutItem');
        newItem.appendTo(newSection);
        newSection.calcLayout();
        this.calcLayout();
        if(sectionIndex==this.getActiveSectionIndex()){
            this.setActiveItemRank(null);
        }
    },

    /**
     * 在指定item插入节点
     * 如果itemRank和sectionIndex为null 则在当前焦点的item中插入
     * node 节点对象
     * itemRank 在指定item内插入
     * sectionIndex section 序号
     */
    insertNode: function(node, itemRank, sectionIndex){
        if(node!=null){
            if(sectionIndex==null){
                sectionIndex = this.getActiveSectionIndex();
            }
            if(jQuery.isEmptyObject(itemRank)){
                itemRank = this.getActiveItemRank();
            }
            if(!jQuery.isEmptyObject(itemRank) && sectionIndex!=null){
                var section = this.findSectionByIndex(sectionIndex);
                if(section!=null){
                    var item = section.findItemByRank(itemRank);
                    if(item!=null){
                        if(item.childNodes().length==0){
                            node.appendTo(item);
                        }else{
                            var newItem = wof$.create('FlowLayoutItem');
                            newItem.afterTo(item);
                            node.appendTo(newItem);
                        }
                        //如果该分组内容自适应高度 则需要重新计算
                        if(section.getIsAutoExt()==true){
                            section.calcLayout();
                            this.calcLayout();
                        }
                    }else{
                        console.log('不存在的item');
                    }
                }else{
                    console.log('不存在section 请先插入新的section');
                }
            }
        }else{
            console.log('node对象为null 不能插入');
        }
    },

    /**
     * 获得section的个数
     */
    getSections:function(){
        return this._findSections().length;
    },

    /**
     * 获得指定sectionIndex的section包含有item的个数
     */
    getItems:function(sectionIndex){
        var len = 0;
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            len = section.findItems().length;
        }
        return len;
    },

    /**
     * 上移指定序号的section
     * sectionIndex 指定的section序号(序号从1开始)
     */
    upSection: function(sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        var prevSection = this.findSectionByIndex(sectionIndex-1);
        if(section!=null&&prevSection!=null){
            section.remove();
            section.beforeTo(prevSection);
            if(sectionIndex==this.getActiveSectionIndex()){
                this.setActiveSectionIndex(sectionIndex-1);
                this.setActiveItemRank(null);
            }
            this.calcLayout();
        }
    },

    /**
     * 下移指定序号的section
     * sectionIndex 指定的section序号(序号从1开始)
     */
    downSection: function(sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        var nextSection = this.findSectionByIndex(sectionIndex+1);
        if(section!=null&&nextSection!=null){
            section.remove();
            section.afterTo(nextSection);
            if(sectionIndex==this.getActiveSectionIndex()){
                this.setActiveSectionIndex(sectionIndex+1);
                this.setActiveItemRank(null);
            }
            this.calcLayout();
        }
    },

    /**
     * 删除指定序号的section
     * sectionIndex 指定的section序号(序号从1开始)
     */
     deleteSection: function(sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            section.removeChildren(true);
            section.remove(true);
            this.setActiveSectionIndex(null);
            this.setActiveItemRank(null);
            this.calcLayout();
        }
    },

    /**
     * 修改flowlayout
     * flowLayoutData flowLayout数据
     */
    updateFlowLayout: function(flowLayoutData){
        if(!jQuery.isEmptyObject(flowLayoutData)){
            if(flowLayoutData.cols!=null){
                this.setCols(Number(flowLayoutData.cols));
            }
            if(flowLayoutData.itemHeight!=null){
                this.setItemHeight(Number(flowLayoutData.itemHeight));
            }
            if(flowLayoutData.width!=null){
                this.setWidth(Number(flowLayoutData.width));
            }
            if(flowLayoutData.height!=null){
                this.setHeight(Number(flowLayoutData.height));
            }
            if(flowLayoutData.left!=null){
                this.setLeft(Number(flowLayoutData.left));
            }
            if(flowLayoutData.top!=null){
                this.setTop(Number(flowLayoutData.top));
            }
            if(flowLayoutData.zIndex!=null){
                this.setZIndex(flowLayoutData.zIndex);
            }
            if(flowLayoutData.hiden!=null){
                this.setHiden((flowLayoutData.hiden=='true'||flowLayoutData.hiden==true)?true:false);
            }
            if(flowLayoutData.position!=null){
                this.setPosition(flowLayoutData.position);
            }
            if(flowLayoutData.scale!=null){
                this.setScale(Number(flowLayoutData.scale));
            }
            if(flowLayoutData.onSendMessage!=null){
                this.setOnSendMessage(flowLayoutData.onSendMessage);
            }
            if(flowLayoutData.onReceiveMessage!=null){
                this.setOnReceiveMessage(flowLayoutData.onReceiveMessage);
            }

            var childNodes = this.childNodes();
            for(var i=0;i<childNodes.length;i++){
                var node = childNodes[i];
                node.calcLayout();
            }
            this.calcLayout();
        }
    },

    /**
     * 修改指定序号的section
     * sectionData section数据
     */
    updateSection: function(sectionData){
        if(!jQuery.isEmptyObject(sectionData)){
            var section = this.findSectionByIndex(sectionData.index);
            if(section!=null){
                if(sectionData.title!=null){
                    section.setTitle(sectionData.title);
                }
                if(sectionData.cols!=null){
                    var items = section.findItems();
                    var maxColspan = 1;
                    for(var i=0;i<items.length;i++){
                        if(maxColspan<items[i].getColspan()){
                            maxColspan = items[i].getColspan();
                        }
                    }
                    if(Number(sectionData.cols)>=maxColspan){
                        section.setCols(Number(sectionData.cols));
                    }else{
                        console.log('设置cols值错误:小于该分组最大colspan值');
                    }
                }
                if(sectionData.width!=null){
                    section.setWidth(Number(sectionData.width));
                }
                if(sectionData.titleHeight!=null){
                    section.setTitleHeight(Number(sectionData.titleHeight));
                }
                if(sectionData.itemHeight!=null){
                    section.setItemHeight(Number(sectionData.itemHeight));
                }
                if(sectionData.isExpand!=null){
                    section.setIsExpand((sectionData.isExpand=='true'||sectionData.isExpand==true)?true:false);
                }
                if(sectionData.mustInOrder!=null){
                    section.setMustInOrder((sectionData.mustInOrder=='true'||sectionData.mustInOrder==true)?true:false);
                }
                if(sectionData.isAutoExt!=null){
                    section.setIsAutoExt((sectionData.isAutoExt=='true'||sectionData.isAutoExt==true)?true:false);
                }
                section.calcLayout();
                this.calcLayout();
            }
        }
    },

    /**
     * 修改指定序号的item
     * itemData item数据
     */
    updateItem: function(itemData){
        if(!jQuery.isEmptyObject(itemData)){
            var section = this.findSectionByIndex(Number(itemData.sectionIndex));
            if(section!=null){
                var item = section.findItemByRank({row:Number(itemData.row),col:Number(itemData.col)});
                if(item!=null){
                    if(itemData.colspan!=null){
                        if(section.getCols()>=Number(itemData.colspan)){
                            item.setColspan(Number(itemData.colspan));
                        }else{
                            console.log('设置colspan值错误:大于该分组cols值');
                        }
                    }
                    if(itemData.isFixItem!=null){
                        item.setIsFixItem((itemData.isFixItem=='true'||itemData.isFixItem==true)?true:false);
                    }
                    if(itemData.rowspan!=null){
                        item.setRowspan(Number(itemData.rowspan));
                    }
                    section.calcLayout();
                    this.calcLayout();
                }
            }
        }
    },

    /**
     * 删除指定序号的item
     * itemRank 指定的item行列号
     * sectionIndex 指定的section序号(序号从1开始)
     */
    deleteItem: function(itemRank, sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                section.deleteItem(item);
                section.calcLayout();
                this.calcLayout();
            }
        }
    },

    //找到第一个section
    _findFirstSection: function(){
        var section = this.findSectionByIndex(0);
        return section;
    },

    //找到最后一个section
    _findLastSection: function(){
        var section = null;
        var childNodes = this.childNodes();
        for(var i=childNodes.length-1;i>=0;i--){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.FlowLayoutSection'){
                section = node;
                break;
            }
        }
        return section;
    },

    //找到指定序号的sectoin
    findSectionByIndex: function(sectionIndex){
        var section = null;
        var sections = this._findSections();
        for(var i=0;i<sections.length;i++){
            if(sections[i].getIndex()==Number(sectionIndex)){
                section = sections[i];
                break;
            }
        }
        return section;
    },

    //找到所有section
    _findSections: function(){
        var sections = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.FlowLayoutSection'){
                sections.push(node);
            }
        }
        return sections;
    },

    //根据itemRank和sectionIndex定位到item并减少列数
    reduceItemColspan:function(itemRank, sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                section.reduceItemColspan(item);
                section.calcLayout();
                this.calcLayout();
            }
        }
    },

    //根据itemRank和sectionIndex定位到item并解锁
    unfixItem:function(itemRank, sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                section.unfixItem(item);
            }
        }
    },

    //根据itemRank和sectionIndex定位到item并锁定
    fixItem:function(itemRank, sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                section.fixItem(item);
            }
        }
    },

    //根据itemRank和sectionIndex定位到item并增加列数
    addItemColspan:function(itemRank, sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                section.addItemColspan(item);
                section.calcLayout();
                this.calcLayout();
            }
        }
    },

    //根据itemRank和sectionIndex定位到item并减少行数
    reduceItemRowspan:function(itemRank, sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                section.reduceItemRowspan(item);
                section.calcLayout();
                this.calcLayout();
            }
        }
    },

    //根据itemRank和sectionIndex定位到item并增加行数
    addItemRowspan:function(itemRank, sectionIndex){
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                section.addItemRowspan(item);
                section.calcLayout();
                this.calcLayout();
            }
        }
    },

    //根据itemRank和sectionIndex找到对应item中的对象
    getNode: function(itemRank, sectionIndex){
        var node = null;
        var section = this.findSectionByIndex(sectionIndex);
        if(section!=null){
            var item = section.findItemByRank(itemRank);
            if(item!=null){
                node = item.childNodes()[0];
            }
        }
        return node;
    },

    //计算布局
    calcLayout: function(){
        var height = 0;
        var sections = this._findSections();
        for(var i=0;i<sections.length;i++){
            var section = sections[i];
            if(i==0){
                section.setTop(0);
                section.setLeft(0);
                height += section.getHeight();
            }else{
                var prevSection = section.prevNode();
                section.setTop(prevSection.getTop()+prevSection.getHeight());
                height += section.getHeight();
            }
            section.setIndex(i+1);
        }
        this.setHeight(height);
    },

    //进行布局
    _layout: function(){
        var sections = this._findSections();
        for(var i=0;i<sections.length;i++){
            var section = sections[i];
            section.getDomInstance().css('top', section.getTop()*this.getScale()+'px');
            section.setSectionStyle(false);
        }
        this.getDomInstance().css('height',(this.getHeight()*this.getScale())+'px');
        this.getDomInstance().css('width', (this.getWidth()*this.getScale())+'px');

        //根据activeSectionIndex设置当前激活的section
        var activeSection = this.findSectionByIndex(this.getActiveSectionIndex());
        if(activeSection!=null){
            var activeItem = activeSection.findItemByRank(this.getActiveItemRank());
            if(activeItem!=null){
                activeSection.activeItemStyle(activeItem);
            }else{
                activeSection.setSectionStyle(true);
            }
        }

    },

    resize: function(){
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            node.calcLayout();
            var items = node.childNodes();
            for(var t=0;t<items.length;t++){
                var item = items[t];
                var obj = item.childNodes()[0];
                if(obj!=null&&obj.getClassName()=='wof.bizWidget.FlowLayout'){
                    obj.setWidth(item.getWidth());
                    obj.setHeight(item.getHeight());
                    obj.resize();
                }
            }
        }
        this.calcLayout();
    }

};