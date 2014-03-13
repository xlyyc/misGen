

wof.bizWidget.SearchComponent = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','hidden');

    this._backgroundImg = jQuery('<img src="src/img/backgroud.gif" style="position:absolute;cursor:pointer;opacity:0;filter:alpha(opacity=0);width:100%;height:100%;">');


};
wof.bizWidget.SearchComponent.prototype = {

    /**
     * 属性声明 （private ，用"_"标识）
     */
    _initActionName: null,

    _name:null,

    _callStr:null,

    _index:null,

    _caption:null,

    _linkComponentID:null,

    _state:null,

    _colsNum:null,

    _mustInOrder: null,   //各项是否严格遵循次序排列

    _itemHeight: null,  //单元格高度

    _label: null,

    _rows: null, //行数

    _titleHeight:null,  //标题高度

    _isExpand: null,

    _backgroundImg: null,

    _paramMaps:null,


    _componentId:null,

    /**
     * get/set 属性方法定义
     */

    getComponentId: function(){
        if(this._componentId==null){
            this._componentId=this.getId();
        }
        return this._componentId;
    },

    setComponentId: function(componentId){
        this._componentId = componentId;
    },

    getParamMaps: function(){
        if(this._paramMaps==null){
            this._paramMaps = {};
        }
        return this._paramMaps;
    },

    setParamMaps: function(paramMaps){
        this._paramMaps = paramMaps;
    },

    getInitActionName: function(){
        return this._initActionName;
    },

    setInitActionName: function(initActionName){
        this._initActionName = initActionName;
    },

    getName: function(){
        if(this._name==null){
            this._name = '';
        }
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },

    getCallStr: function(){
        if(this._callStr==null){
            this._callStr = 'searchComponent:0_0_1';
        }
        return this._callStr;
    },

    setCallStr: function(callStr){
        this._callStr = callStr;
    },

    getLinkComponentID: function(){
        if(this._linkComponentID==null){
            this._linkComponentID = '';
        }
        return this._linkComponentID;
    },

    setLinkComponentID: function(linkComponentID){
        this._linkComponentID = linkComponentID;
    },


    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },


    getColsNum: function(){
        if(this._colsNum==null){
            this._colsNum = 4;
        }
        return this._colsNum;
    },

    setColsNum: function(colsNum){
        this._colsNum = colsNum;
    },

    getCaption: function(){
        if(this._caption==null){
            this._caption = '未命名搜索';
        }
        return this._caption;
    },

    setCaption: function(caption){
        this._caption = caption;
    },


    getState: function(){
        return this._state;
    },

    setState: function(state){
        this._state = state;
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
            this._itemHeight = 70;
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

    //获得当前激活的searchItem行列号
    getActiveSearchItemRank: function(){
        return this._activeSearchItemRank;
    },

    //设置当前激活的searchItem行列号
    setActiveSearchItemRank: function(activeSearchItemRank){
        this._activeSearchItemRank = activeSearchItemRank;
    },

    /**
     * Render 方法定义
     */

    initRender: function(){
        //如果是clone过来的 会直接创建一个label对象 需要先移除
        var nodes = this.childNodes();
        for(var i=0;i<nodes.length;i++){
            if(nodes[i].getClassName()=='wof.widget.Label'){
                nodes[i].remove(true);
                break;
            }
        }
        var label = new wof.widget.Label();
        label.setIsInside(true);
        label.setTop(0);
        label.setLeft(0);
        label.setIsUnderline(true);
        label.setScale(this.getScale());

        this._label = label;
    },

    //选择实现
    beforeRender: function () {
           /* var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.SearchComponent_mousedown');
                    _this.setActiveSearchItemRank(null);
                    _this.render();
                    _this.sendMessage('wof.bizWidget.SearchComponent_active');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                if(_this.getIsExpand()==true){
                    _this.setIsExpand(false);
                }else{
                    _this.setIsExpand(true);
                }
                _this.setActiveSearchItemRank(null);
                _this.render();
                _this.sendMessage('wof_object_resize');
                _this.sendMessage('wof.bizWidget.SearchComponent_active');
            });*/
        this._appendLabel();
        this._flowLayout();
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    afterRender: function () {
        this._resetStyle();
        this.sendMessage('wof.bizWidget.SearchComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            componentId: this.getComponentId(),
            paramMaps: this.getParamMaps(),
            initActionName:this.getInitActionName(),
            itemHeight:this.getItemHeight(),
            name:this.getName(),
            callStr:this.getCallStr(),
            index:this.getIndex(),
            caption:this.getCaption(),
            linkComponentID: this.getLinkComponentID(),
            state:this.getState(),
            mustInOrder:this.getMustInOrder(),
            colsNum:this.getColsNum(),
            titleHeight: this.getTitleHeight(),
            rows: this.getRows(),
            isExpand: this.getIsExpand(),
            activeSearchItemRank: this.getActiveSearchItemRank()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setComponentId(data.componentId);
        this.setParamMaps(data.paramMaps);
        this.setInitActionName(data.initActionName);
        this.setName(data.name);
        this.setCallStr(data.callStr);
        this.setIndex(data.index);
        this.setCaption(data.caption);
        this.setLinkComponentID(data.linkComponentID);
        this.setState(data.state);
        this.setMustInOrder(data.mustInOrder);
        this.setColsNum(data.colsNum);
        this.setItemHeight(data.itemHeight);
        this.setTitleHeight(data.titleHeight);
        this.setRows(data.rows);
        this.setIsExpand(data.isExpand);
        this.setActiveSearchItemRank(data.activeSearchItemRank);
    },

    _insideOnReceiveMessage:{
        'wof.bizWidget.SearchItem_searchItemDrop':function(message){
            console.log(message.id+'   '+this.getClassName());
            var insertSearchItem = wof.util.ObjectManager.get(message.data.searchItemId);
            var searchItem = wof.util.ObjectManager.get(message.sender.id);
            insertSearchItem.remove();
            insertSearchItem.beforeTo(searchItem);
            this.render();

            this.sendMessage('wof_object_resize');
            this.sendMessage('wof.bizWidget.SearchComponent_active');
            return false;
        },
        'wof.bizWidget.SearchItem_mousedown':function(message){
            console.log(message.id+'   '+this.getClassName());
            var searchItem = wof.util.ObjectManager.get(message.sender.id);
            this.setActiveSearchItemRank({rowNum:searchItem.getRowNum(),colNum:searchItem.getColNum()});
            this.render();
            this.sendMessage('wof.bizWidget.SearchComponent_active');
            return false;
        }
    },

    /**
     * 修改SearchComponent
     * searchComponentData searchComponent数据
     */
    updateSearchComponent: function(searchComponentDataData){
        if(!jQuery.isEmptyObject(searchComponentDataData)){
            if(searchComponentDataData.itemHeight!=null){
                this.setItemHeight(Number(searchComponentDataData.itemHeight));
            }
            if(searchComponentDataData.name!=null){
                this.setName(searchComponentDataData.name);
            }
            if(searchComponentDataData.caption!=null){
                this.setCaption(searchComponentDataData.caption);
            }
            if(searchComponentDataData.linkComponentID!=null){
                this.setLinkComponentID(searchComponentDataData.linkComponentID);
            }
            if(searchComponentDataData.colsNum!=null){
                this.setColsNum(Number(searchComponentDataData.colsNum));
            }
            if(searchComponentDataData.isExpand!=null){
                this.setIsExpand((searchComponentDataData.isExpand=='true'||searchComponentDataData.isExpand==true)?true:false);
            }
            if(searchComponentDataData.paramMaps!=null){
                this.setParamMaps(searchComponentDataData.paramMaps);
            }
            if(searchComponentDataData.onSendMessage!=null){
                this.setOnSendMessage(searchComponentDataData.onSendMessage);
            }
        }
    },


    /**
     * 修改指定的searchItem
     * searchItemData searchItem数据
     */
    updateSearchItem: function(searchItemData){
        if(!jQuery.isEmptyObject(searchItemData)){
            var searchItem = this.findSearchItemByRank({rowNum:Number(searchItemData.rowNum),colNum:Number(searchItemData.colNum)});
            if(searchItem!=null){
                if(searchItemData.colspan!=null){
                    searchItem.setColspan(Number(searchItemData.colspan));
                }
                if(searchItemData.name!=null){
                    searchItem.setName(searchItemData.name);
                }
                if(searchItemData.isFixItem!=null){
                    searchItem.setIsFixItem((searchItemData.isFixItem=='true'||searchItemData.isFixItem==true)?true:false);
                }
                if(searchItemData.rowspan!=null){
                    searchItem.setRowspan(Number(searchItemData.rowspan));
                }
                if(searchItemData.caption!=null){
                    searchItem.setCaption(searchItemData.caption);
                }
                if(searchItemData.dataField!=null){
                    searchItem.setDataField(searchItemData.dataField);
                }
                if(searchItemData.dateTimeBoxFormat!=null){
                    searchItem.setDateTimeBoxFormat(searchItemData.dateTimeBoxFormat);
                }
                if(searchItemData.selectPattern!=null){
                    searchItem.setSelectPattern(searchItemData.selectPattern);
                }
                if(searchItemData.useMultiSelect!=null){
                    searchItem.setUseMultiSelect((searchItemData.useMultiSelect=='true'||searchItemData.useMultiSelect==true)?true:false);
                }
                if(searchItemData.visbleType!=null){
                    searchItem.setVisbleType(searchItemData.visbleType);
                }
                if(searchItemData.fromTo!=null){
                    searchItem.setFromTo((searchItemData.fromTo=='true'||searchItemData.fromTo==true)?true:false);
                }
                if(searchItemData.labelWidth!=null){
                    searchItem.setLabelWidth(searchItemData.labelWidth==''?'':Number(searchItemData.labelWidth));
                }
                if(searchItemData.inputWidth!=null){
                    searchItem.setInputWidth(searchItemData.inputWidth==''?'':Number(searchItemData.inputWidth));
                }
                if(searchItemData.inputHeight!=null){
                    searchItem.setInputHeight(searchItemData.inputHeight==''?'':Number(searchItemData.inputHeight));
                }
                if(searchItemData.tipValue!=null){
                    searchItem.setTipValue(searchItemData.tipValue);
                }
                if(searchItemData.linkageItem!=null){
                    searchItem.setLinkageItem(searchItemData.linkageItem);
                }
            }

        }
    },

    findSearchItemByRank: function(searchItemRank){
        var searchItem = null;
        if(!jQuery.isEmptyObject(searchItemRank)){
            var searchItems = this.findSearchItems();
            for(var i=0;i<searchItems.length;i++){
                if(searchItems[i].getRowNum()==searchItemRank.rowNum && searchItems[i].getColNum()==searchItemRank.colNum){
                    searchItem = searchItems[i];
                    break;
                }
            }
        }
        return searchItem;
    },

    //重置样式
    _resetStyle: function(){
        this._label.setIsBold(false);
        this._label.setIsHighlight(false);
        this._label.render();
        var searchItems = this._getSearchItems();
        for(var i=0;i<searchItems.length;i++){
            searchItems[i].getDomInstance().css('border','1px solid #bcbcbc').css('backgroundColor','#fff');
        }

        //根据activeSearchItemGroupIndex设置当前激活的SearchItemGroup
        var activeSearchItem = this.findSearchItemByRank(this.getActiveSearchItemRank());
        if(activeSearchItem!=null){
            this.activeSearchItemStyle(activeSearchItem);
        }else{
            this.activeSearchComponentStyle();
        }
    },

    //判断是否可以删除searchItem
    canDeleteSearchItem: function(searchItem){
        var b = true;
        if(searchItem.getIsFixItem()==true){  //锁定不能被删除
            b = false;
        }
        return b;
    },

    //删除searchItem
    //return true 真正移除 false 没有从移除
    deleteSearchItem: function(searchItemRank){
        var flag = true;
        var searchItem = this.findSearchItemByRank(searchItemRank);
        if(searchItem!=null){
            if(this.findSearchItems().length==1){ //如果searchItem只剩一个
                searchItem.setColspan(1);
                searchItem.setRowspan(1);
                flag = false;
            }else{
                searchItem.removeChildren(true);
                searchItem.remove(true);
            }
        }else{
            flag = false;
        }
        return flag;
    },

    //减少列数
    reduceSearchItemColspan: function(searchItemRank){
        var searchItem = this.findSearchItemByRank(searchItemRank);
        if(searchItem!=null){
            searchItem.setColspan(searchItem.getColspan()-1);
        }
    },

    //判断是否可以减少列数
    canReduceSearchItemColspan: function(searchItem){
        var b = true;
        if(searchItem.getIsFixItem()==false){
            if(searchItem.getColspan()==1){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //判断是否可以增加列数
    canAddSearchItemColspan: function(searchItem){
        var b = true;
        if(searchItem.getIsFixItem()==false){
            if(searchItem.getColspan()+1 > this.getColsNum()){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //增加列数
    addSearchItemColspan: function(searchItemRank){
        var searchItem = this.findSearchItemByRank(searchItemRank);
        if(searchItem!=null){
            searchItem.setColspan(searchItem.getColspan()+1);
        }
    },

    //判断是否可以增加行数
    canAddSearchItemRowspan: function(searchItem){
        var b = true;
        if(searchItem.getIsFixItem()==true){
            b = false;
        }
        return b;
    },

    //增加行数
    addSearchItemRowspan: function(searchItemRank){
        var searchItem = this.findSearchItemByRank(searchItemRank);
        if(searchItem!=null){
            searchItem.setRowspan(searchItem.getRowspan()+1);
        }
    },

    //判断是否可以减少行数
    canReduceSearchItemRowspan: function(searchItem){
        var b = true;
        if(searchItem.getIsFixItem()==false){
            if(searchItem.getRowspan()==1){
                b = false;
            }
        }else{
            b = false;
        }
        return b;
    },

    //判断是否可以解锁
    canUnfixSearchItem: function(searchItem){
        var b = true;
        if(searchItem.getIsFixItem()==false){
            b = false;
        }
        return b;
    },

    //解锁searchItem
    unfixSearchItem: function(searchItemRank){
        var searchItem = this.findSearchItemByRank(searchItemRank);
        if(searchItem!=null){
            searchItem.setIsFixItem(false);
        }
    },

    //判断是否可以锁定
    canFixSearchItem: function(searchItem){
        var b = true;
        if(searchItem.getIsFixItem()==true){
            b = false;
        }
        return b;
    },

    //锁定searchItem
    fixSearchItem: function(searchItemRank){
        var searchItem = this.findSearchItemByRank(searchItemRank);
        if(searchItem!=null){
            searchItem.setIsFixItem(true);
        }
    },

    //减少列数
    reduceSearchItemRowspan: function(searchItemRank){
        var searchItem = this.findSearchItemByRank(searchItemRank);
        if(searchItem!=null){
            searchItem.setRowspan(searchItem.getRowspan()-1);
        }
    },

    //设置当前激活的SearchComponent样式
    activeSearchComponentStyle: function(){
        this._label.setIsBold(true);
        this._label.setIsHighlight(true);
        this._label.render();
    },

    //设置当前激活的searchItem背景色
    activeSearchItemStyle: function(activeSearchItem){
        //设置当前选中searchItem背景
        activeSearchItem.getDomInstance().css('backgroundColor','#efefef');
    },

    //设置并插入label标题到第一个位置
    _appendLabel: function(){
        var label = this._label;
        label.setIsInside(true);
        label.remove();
        label.setWidth(this.getWidth());
        label.setHeight(this.getTitleHeight());
        label.setText(this.getCaption());
        if(this.childNodes().length>0){
            label.beforeTo(this.childNodes()[0]);
        }else{
            label.appendTo(this);
        }
    },

    //找到所有searchItem
    findSearchItems: function(){
        var searchItems = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            var node = childNodes[i];
            if(node.getClassName()=='wof.bizWidget.SearchItem'){
                searchItems.push(node);
            }
        }
        return searchItems;
    },

    //获得所有searchItem 并且重设searchItem行列号
    _getSearchItems: function(){
        var searchItems = this.findSearchItems();
        if(searchItems.length>0){
            var searchItemHeight = this.getItemHeight();
            var searchItemWidth = searchItems[0].getWidth()/searchItems[0].getColspan();
            var labelHeight = this._label.getHeight();
            for(var i=0;i<searchItems.length;i++){
                var searchItem = searchItems[i];
                var top = searchItem.getTop()-labelHeight;
                var left = searchItem.getLeft();
                var rowNum = Math.ceil(top/searchItemHeight)+1;
                var colNum = Math.ceil(left/searchItemWidth)+1;
                searchItem.setRowNum(rowNum);
                searchItem.setColNum(colNum);
            }
        }
        return searchItems;
    },

    //进行流式布局
    _flowLayout: function(){
        var placeSearchItemTable = new wof.util.Hashtable(); //位置对应searchItem table
        var notFixedSearchItems = []; //尚未布局的非fix类型的searchItem列表
        var layoutSearchItems = []; //所有需要布局的searchItem
        var fixSearchItems = []; //fix类型的searchItem列表
        var currSpace = null; //当前布局space
        var itemHeight = null;
        var searchItemWidth = null;
        var searchComponentWidth = null;
        var rows = null;
        var searchItems = [];
        var label = this._label;
        var _this = this;
        //为指定的searchItem查找到可以进行布局的位置
        function findCanLayoutSpace(searchItem){
            var space = null;
            var colspan = searchItem.getColspan();
            var rowspan = searchItem.getRowspan();
            var startR = 1;
            var startC = 1;
            if(_this.getMustInOrder()==true){
                if(currSpace!=null){
                    startR = (currSpace.top - label.getHeight())/itemHeight+1;
                    startC = currSpace.left/searchItemWidth+1;
                }
            }
            for(var r=1;space==null;r++){
                var top = (r-1) * itemHeight + label.getHeight();
                for(var c=1;c<=_this.getColsNum();c++){
                    if((startR==r&&startC<=c)||startR<r){
                        var flag = true;
                        var left = (c-1) * searchItemWidth;
                        for(var rs=0;rs<rowspan;rs++){
                            for(var cs=0;cs<colspan;cs++){
                                var placeTop = top+(itemHeight*rs);
                                var placeLeft = left+(searchItemWidth*cs);
                                if((placeLeft+searchItemWidth)<=searchComponentWidth){ //位置的left不能超过当前searchComponent的width
                                    var obj = placeSearchItemTable.items(placeTop+','+placeLeft);
                                    if(obj!=null){ //如果该位置已经存在searchItem
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
                var top = (r-1) * itemHeight + label.getHeight();
                for(var c=_this.getColsNum(); c>=1; c--){
                    var left = (c-1) * searchItemWidth;
                    var obj = placeSearchItemTable.items(top+','+left);
                    if(obj.getTop()==top){
                        if(obj.canDelete()==true){
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
            var rows = 0;
            if(searchItems.length>0){
                var maxH = searchItems[0].getTop()+searchItems[0].getHeight();
                for(var i=1;i<searchItems.length;i++){
                    var searchItem = searchItems[i];
                    var tempH = searchItem.getTop()+searchItem.getHeight();
                    if(maxH<tempH){
                        maxH = tempH;
                    }
                }
                rows = Math.ceil((maxH-label.getHeight())/_this.getItemHeight());
            }
            return rows;
        }
        searchItems = this.findSearchItems();
        if(searchItems.length>0){
            itemHeight = this.getItemHeight();
            searchItemWidth = Math.floor(this.getWidth()/this.getColsNum());
            searchComponentWidth = searchItemWidth * this.getColsNum();
            for(var i=0;i<searchItems.length;i++){
                var searchItem = searchItems[i];
                searchItem.setWidth(searchItemWidth*searchItem.getColspan());
                searchItem.setHeight(itemHeight*searchItem.getRowspan());
                searchItem.remove();
                if(searchItem.getIsFixItem()==true && searchItem.getRowNum()!=null && searchItem.getColNum()!=null){ //fix类型的searchItem
                    fixSearchItems.push(searchItem);
                }else{
                    notFixedSearchItems.push(searchItem);
                }
            }
        }
        //fix类型searchItem先行安排
        for(var i=fixSearchItems.length-1;i>=0;i--){
            var fixSearchItem = fixSearchItems[i];
            var rowNum = fixSearchItem.getRowNum();
            var colNum = fixSearchItem.getColNum();
            var colspan = fixSearchItem.getColspan();
            var rowspan = fixSearchItem.getRowspan();
            var top = (rowNum-1) * itemHeight + label.getHeight();
            var left = (colNum-1) * searchItemWidth;
            fixSearchItem.setTop(top);
            fixSearchItem.setLeft(left);
            for(var rs=0;rs<rowspan;rs++){
                for(var cs=0;cs<colspan;cs++){
                    var placeTop = top+(itemHeight*rs);
                    var placeLeft = left+(searchItemWidth*cs);
                    placeSearchItemTable.add(placeTop+','+placeLeft, fixSearchItem);
                }
            }
        }
        //处理尚未布局的非fix类型的searchItem
        for(var i=0;i<notFixedSearchItems.length;i++){
            var searchItem = notFixedSearchItems[i];
            var space = findCanLayoutSpace(searchItem);
            searchItem.setTop(space.top);
            searchItem.setLeft(space.left);
            var colspan = searchItem.getColspan();
            var rowspan = searchItem.getRowspan();
            for(var rs=0;rs<rowspan;rs++){
                for(var cs=0;cs<colspan;cs++){
                    var placeTop = searchItem.getTop()+(itemHeight*rs);
                    var placeLeft = searchItem.getLeft()+(searchItemWidth*cs);
                    placeSearchItemTable.add(placeTop+','+placeLeft, searchItem);
                }
            }
        }
        //补全每行空缺的searchItem
        rows = calcRows();
        for(var r=1; r<=rows; r++){
            var top = (r-1) * itemHeight + label.getHeight();
            for(var c=1; c<=this.getColsNum(); c++){
                var left = (c-1) * searchItemWidth;
                var obj = placeSearchItemTable.items(top+','+left);
                if(obj==null){
                    var newSearchItem = new wof.bizWidget.SearchItem();
                    newSearchItem.setWidth(searchItemWidth);
                    newSearchItem.setHeight(itemHeight);
                    newSearchItem.setTop(top);
                    newSearchItem.setLeft(left);
                    newSearchItem.setScale(this.getScale());
                    placeSearchItemTable.add(top+','+left, newSearchItem);
                }
            }
        }
        //反向查找过滤掉空行 如果一行中所有searchItem都没有内容 并且colspan和rowspan为1 则将此行移除
        var canRemoveRow = true;
        var removeRowCount = 0;
        for(var r=rows; r>=1; r--){
            var top = (r-1) * itemHeight + label.getHeight();
            if(canRemoveRow==true){
                if(isEmptyRow(r)==false){
                    for(var c=this.getColsNum(); c>=1; c--){
                        var left = (c-1) * searchItemWidth;
                        var obj = placeSearchItemTable.items(top+','+left);
                        if(obj.getTop()==top && obj.getLeft()==left){
                            layoutSearchItems.push(obj);
                        }
                    }
                    canRemoveRow = false;
                }else{
                    for(var c=this.getColsNum(); c>=1; c--){
                        var left = (c-1) * searchItemWidth;
                        var obj = placeSearchItemTable.items(top+','+left);
                        if(obj.getTop()==top && obj.getLeft()==left){
                            obj.remove(true);
                        }
                    }
                    removeRowCount++;
                }
            }else{
                for(var c=this.getColsNum(); c>=1; c--){
                    var left = (c-1) * searchItemWidth;
                    var obj = placeSearchItemTable.items(top+','+left);
                    if(obj.getTop()==top && obj.getLeft()==left){
                        layoutSearchItems.push(obj);
                    }
                }
            }
        }
        //添加到dom节点
        for(var i=0; i<layoutSearchItems.length; i++){
            var searchItem = layoutSearchItems[i];
            searchItem.afterTo(label);
        }
        this.setRows(rows-removeRowCount);
        //设置searchComponent div容器高度和宽度
        if(this.getIsExpand()==true){
            this.setHeight(itemHeight*this.getRows()+this.getTitleHeight());
            this.getDomInstance().css('height', (this.getHeight()*this.getScale())+'px');
        }else{
            this.setHeight(this.getTitleHeight());
            this.getDomInstance().css('height', (this.getHeight()*this.getScale())+'px');
        }
        this.getDomInstance().css('width', (this.getWidth()*this.getScale())+'px');
        this._label.getDomInstance().css('width',(this.getWidth()*this.getScale()-4)+'px');
        this._label.getDomInstance().css('height',(this.getTitleHeight()*this.getScale())+'px');

        //屏蔽label对象的事件
        label.getDomInstance().after(this._backgroundImg);
    },

    //创建初始化的SearchComponent
    createSelf: function(width, height){
        var searchComponentData = {caption:'未命名搜索',width:width,titleHeight:25,colsNum:4,itemHeight:45};

        var width = searchComponentData.width!=null?searchComponentData.width:this.getWidth();
        var titleHeight = searchComponentData.titleHeight!=null?searchComponentData.titleHeight:null;
        var colsNum = searchComponentData.colsNum!=null?searchComponentData.colsNum:null;
        var itemHeight = searchComponentData.itemHeight!=null?searchComponentData.itemHeight:this.getItemHeight();

        var newSearchComponent = new wof.bizWidget.SearchComponent();
        newSearchComponent.setWidth(width);
        newSearchComponent.setTitleHeight(titleHeight);
        newSearchComponent.setCaption(searchComponentData.caption);
        newSearchComponent.setColsNum(colsNum);
        newSearchComponent.setItemHeight(itemHeight);
        var newSearchItem = new wof.bizWidget.SearchItem();
        newSearchItem.appendTo(newSearchComponent);

        return newSearchComponent;
    }



};