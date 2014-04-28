/**
 * @bizWidgetClass VoucherGridComponent class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherGridComponent = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','hidden');

    this._borderStyle = '1px solid #bcbcbc';
    this._pinColumns = [];
    this._unPinColumns = [];
    this._realWidth = 0;
    this._realHeight = 0;
    this._themeColumnsWidth = 0;
    this._numberColumnWidth = 45;

};
wof.bizWidget.VoucherGridComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */


    _borderStyle: null,

    _unPinColumns: null,

    _pinColumns: null,

    _realWidth: null, //grid实际宽度

    _realHeight: null, //grid实际高度

    _themeColumnsWidth: null,  //主题列的总宽度

    _headerDiv: null,

    _themeColumnsDiv: null,

    _themeColumnsHeaderDiv: null,

    _gridDiv: null,

    _createPageToolDiv: null,

    _numberColumnWidth: null, //序号列的宽度

    _activeColumnIndex: null,    //当前激活的列序号

    _callStr: null,    //调用字符串，格式为 构件类型唯一识别串:构件版本，例如【VoucherGridComponent:1.0.0】

    _initActionName: null,

    _name: null,

    _numberDisplay: null,

    _state: null,

    _caption: null,

    _bindEntityID: null,    //实体ID,Grid部件中可用到此实体及与该实体存在参照及对等关系的实体中的属性

    _index: null, //渲染位置

    _headerHeight:null,

    _rowHeight: null, //行高

    _useMutiplePage: null, //是否使用分页

    _rowsCount: null,    //每页行数

    _voucherHeadComponent:null, //关联表头部件

    _paramMaps:null,
    /**
     * get/set 属性方法定义
     */

    getParamMaps: function(){
        if(this._paramMaps==null){
            this._paramMaps = {};
        }
        return this._paramMaps;
    },

    setParamMaps: function(paramMaps){
        this._paramMaps = paramMaps;
    },

    getCaption: function(){
        if(this._caption==null){
            this._caption = '未命名表体列表';
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

    getVoucherHeadComponent: function(){
        if(this._voucherHeadComponent==null){
            this._voucherHeadComponent = '';
        }
        return this._voucherHeadComponent;
    },

    setVoucherHeadComponent: function(voucherHeadComponent){
        this._voucherHeadComponent = voucherHeadComponent;
    },

    getActiveColumnIndex: function(){
        return this._activeColumnIndex;
    },

    setActiveColumnIndex: function(activeColumnIndex){
        this._activeColumnIndex = activeColumnIndex;
    },

    getRowsCount: function(){
        if(this._rowsCount==null){
            this._rowsCount = 30;
        }
        return this._rowsCount;
    },

    setRowsCount: function(rowsCount){
        this._rowsCount = rowsCount;
    },

    getUseMutiplePage: function(){
        if(this._useMutiplePage==null){
            this._useMutiplePage = false;
        }
        return this._useMutiplePage;
    },

    setUseMutiplePage: function(useMutiplePage){
        this._useMutiplePage = useMutiplePage;
    },

    getRowHeight: function(){
        if(this._rowHeight==null){
            this._rowHeight = 30;
        }
        return this._rowHeight;
    },

    setRowHeight: function(rowHeight){
        this._rowHeight = rowHeight;
    },

    getCallStr: function(){
        if(this._callStr==null){
            this._callStr = 'voucherGridComponent:0_0_1';
        }
        return this._callStr;
    },

    setCallStr: function(callStr){
        this._callStr = callStr;
    },

    getInitActionName: function(){
        return this._initActionName || '';
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

    getNumberDisplay: function(){
        if(this._numberDisplay==null){
            this._numberDisplay = true;
        }
        return this._numberDisplay;
    },

    setNumberDisplay: function(numberDisplay){
        this._numberDisplay = numberDisplay;
    },

    getBindEntityID: function(){
        if(this._bindEntityID==null){
            this._bindEntityID = '';
        }
        return this._bindEntityID;
    },

    setBindEntityID: function(bindEntityID){
        this._bindEntityID = bindEntityID;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },


    getHeaderHeight: function(){
        if(this._headerHeight==null){
            this._headerHeight = 25;
        }
        return this._headerHeight;
    },

    setHeaderHeight: function(headerHeight){
        this._headerHeight = headerHeight;
    },


    getBindEntity : function (){
        var bindEntityId = this.getBindEntityID();
        if(bindEntityId){
            var bindEntity = JSON.parse(getBizEntities());
            //var bindEntity = {"childEntity":[],"linkEntity":[],"mainEntity":{"alias":"ZGLBCZB","calculateFiled":[],"defaultCondition":"","mainEntityName":"职工类别参照表","metaDataID":"ZGLBCZB","properties":[{"columnName":"lbbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039596123701248","isSystemAttribute":false,"label":"类别编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"lbmc","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039636888141824","isSystemAttribute":false,"label":"类别名称","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbmc","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"lbbz","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350039666051137536","isSystemAttribute":false,"label":"类别备注","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbz","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""}]}};
            var entity = bindEntity.mainEntity;
            if(bindEntity.mainEntity.metaDataID != bindEntityId){
                var linkEntity = bindEntity.linkEntity;
                for(var i = 0; i < linkEntity.length;i++){
                    if(linkEntity[i].metaDataID == bindEntityId){
                        entity = linkEntity[i];
                        break;
                    }
                }
                var childEntity = bindEntity.childEntity;
                for(var i = 0; i < childEntity.length;i++){
                    if(childEntity[i].metaDataID == bindEntityId){
                        entity = childEntity[i];
                        break;
                    }
                }
            }
            return entity;
        }
        return null;
    },
    /**
     * Render 方法定义
     */

    //选择实现
    _beforeRender: function () {
        this.getDomInstance().children('div:not([oid])').remove();
    },

    //----------必须实现----------
    render: function () {
        this._calcColumns();
        var table = this._createGrid();

        var _this = this;
        this._gridDiv = this._createGridDiv();
        this._gridDiv.scroll(function(event){
            event.stopPropagation();
            var stop = _this._gridDiv.scrollTop();
            _this._themeColumnsDiv.scrollTop(stop);
            var sleft = _this._gridDiv.scrollLeft();
            _this._headerDiv.scrollLeft(sleft);
            _this.sendMessage('wof.bizWidget.VoucherGridComponent_scroll');
            _this.sendMessage('wof.bizWidget.VoucherGridComponent_active');
        });
        this._gridDiv.append(table);
        this.getDomInstance().append(this._gridDiv);

        var clientWidth = this._gridDiv.get(0).clientWidth;
        var clientHeight = this._gridDiv.get(0).clientHeight;

        this._headerDiv = this._createHeader(clientWidth);
        this._headerDiv.append(table.clone(true));
        this.getDomInstance().append(this._headerDiv);

        this._themeColumnsDiv = this._createThemeColumns(clientHeight);
        this._themeColumnsDiv.append(table.clone(true));
        this.getDomInstance().append(this._themeColumnsDiv);

        this._themeColumnsHeaderDiv = this._createThemeColumnsHeader();
        this._themeColumnsHeaderDiv.append(table.clone(true));
        this.getDomInstance().append(this._themeColumnsHeaderDiv);

        if(this.getUseMutiplePage()==true){
            this._createPageToolDiv = this._createPageTool();
            this.getDomInstance().append(this._createPageToolDiv);
        }

    },

    //选择实现
    _afterRender: function () {
        this.sendMessage('wof.bizWidget.VoucherGridComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            paramMaps: this.getParamMaps(),
            state:this.getState(),
            callStr:this.getCallStr(),
            initActionName:this.getInitActionName(),
            name:this.getName(),
            numberDisplay:this.getNumberDisplay(),
            caption:this.getCaption(),
            bindEntityID:this.getBindEntityID(),
            index:this.getIndex(),
            headerHeight:this.getHeaderHeight(),
            rowHeight:this.getRowHeight(),
            activeColumnIndex:this.getActiveColumnIndex(),
            voucherHeadComponent:this.getVoucherHeadComponent()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setParamMaps(data.paramMaps);
        this.setState(data.state);
        this.setCallStr(data.callStr);
        this.setInitActionName(data.initActionName);
        this.setName(data.name);
        this.setNumberDisplay(data.numberDisplay);
        this.setCaption(data.caption);
        this.setBindEntityID(data.bindEntityID);
        this.setIndex(data.index);
        this.setHeaderHeight(data.headerHeight);
        this.setRowHeight(data.rowHeight);
        this.setActiveColumnIndex(data.activeColumnIndex);
        this.setVoucherHeadComponent(data.voucherHeadComponent);
    },

    /**
     * 锁定指定列
     */
    pinColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        column.setIsPin(true);
    },

    /**
     * 解锁指定列
     */
    unPinColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        column.setIsPin(false);
    },

    /**
     * 删除指定列
     */
    deleteColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        column.remove(true);
    },

    /**
     * 在指定列后插入新列
     */
    insertColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        var newColumn = new wof.bizWidget.VoucherGridComponentColumn();
        newColumn.setCaption('未命名');
        newColumn.setIsPin(column.getIsPin());
        newColumn.afterTo(column);
    },

    /**
     * 是否能够将指定列移动上一个位置
     */
    canMoveToPrevColumnByIndex: function(index){
        var f = false;
        if(index>1){
            f = true;
        }
        return f;
    },

    /**
     * 将指定列移动上一个位置
     */
    moveToPrevColumnByIndex: function(index){
        if(index>1){
            var column = this.findColumnByIndex(index);
            var prevColumn = this.findColumnByIndex(index-1);
            column.remove();
            column.beforeTo(prevColumn);
        }
    },

    /**
     * 是否能够将指定列移动下一个位置
     */
    canMoveToNextColumnByIndex: function(index){
        var f = false;
        var nextColumn = this.findColumnByIndex(index+1);
        if(nextColumn!=null){
            f = true;
        }
        return f;
    },

    /**
     * 将指定列移动下一个位置
     */
    moveToNextColumnByIndex: function(index){
        var nextColumn = this.findColumnByIndex(index+1);
        if(nextColumn!=null){
            var column = this.findColumnByIndex(index);
            column.remove();
            column.afterTo(nextColumn);
        }
    },

    /**
     * 修改VoucherGridComponent
     * VoucherGridComponentData VoucherGridComponentData数据
     */
    updateVoucherGridComponent: function(voucherGridComponentData){
        if(!jQuery.isEmptyObject(voucherGridComponentData)){
            if(voucherGridComponentData.componentName!=null){
                this.setComponentName(voucherGridComponentData.componentName);
            }
            if(voucherGridComponentData.name!=null){
                this.setName(voucherGridComponentData.name);
            }
            if(voucherGridComponentData.bindEntityID!=null){
                this.setBindEntityID(voucherGridComponentData.bindEntityID);
            }
            if(voucherGridComponentData.voucherHeadComponent!=null){
                this.setVoucherHeadComponent(voucherGridComponentData.voucherHeadComponent);
            }
            if(voucherGridComponentData.headerHeight!=null){
                this.setHeaderHeight(Number(voucherGridComponentData.headerHeight));
            }
            if(voucherGridComponentData.rowHeight!=null){
                this.setRowHeight(Number(voucherGridComponentData.rowHeight));
            }
            if(voucherGridComponentData.numberDisplay!=null){
                this.setNumberDisplay((voucherGridComponentData.numberDisplay=='true'||voucherGridComponentData.numberDisplay==true)?true:false);
            }
            if(voucherGridComponentData.useMutiplePage!=null){
                this.setUseMutiplePage((voucherGridComponentData.useMutiplePage=='true'||voucherGridComponentData.useMutiplePage==true)?true:false);
            }
            if(voucherGridComponentData.rowsCount!=null){
                this.setRowsCount(Number(voucherGridComponentData.rowsCount));
            }
            if(voucherGridComponentData.onSendMessage!=null){
                this.setOnSendMessage(voucherGridComponentData.onSendMessage);
            }
            if(voucherGridComponentData.onReceiveMessage!=null){
                this.setOnReceiveMessage(voucherGridComponentData.onReceiveMessage);
            }
            if(voucherGridComponentData.paramMaps!=null){
                this.setParamMaps(voucherGridComponentData.paramMaps);
            }
        }
    },

    /**
     * 修改指定序号的VoucherGridComponentColumn
     * VoucherGridComponentColumnData VoucherGridComponentColumn数据
     */
    updateVoucherGridComponentColumn: function(voucherGridComponentColumnData){
        if(!jQuery.isEmptyObject(voucherGridComponentColumnData)){
            var voucherGridComponentColumn = this.findColumnByIndex(voucherGridComponentColumnData.index);
            if(voucherGridComponentColumn!=null){
                if(voucherGridComponentColumnData.name!=null){
                    voucherGridComponentColumn.setName(voucherGridComponentColumnData.name);
                }
                if(voucherGridComponentColumnData.useMultiSelect!=null){
                    voucherGridComponentColumn.setUseMultiSelect((voucherGridComponentColumnData.useMultiSelect=='true'||voucherGridComponentColumnData.useMultiSelect==true)?true:false);
                }
                if(voucherGridComponentColumnData.columnType!=null){
                    voucherGridComponentColumn.setColumnType(voucherGridComponentColumnData.columnType);
                }
                if(voucherGridComponentColumnData.caption!=null){
                    voucherGridComponentColumn.setCaption(voucherGridComponentColumnData.caption);
                }
                if(voucherGridComponentColumnData.columnWidth!=null){
                    voucherGridComponentColumn.setColumnWidth(Number(voucherGridComponentColumnData.columnWidth));
                }
                if(voucherGridComponentColumnData.bindDataField!=null){
                    voucherGridComponentColumn.setBindDataField(voucherGridComponentColumnData.bindDataField);
                }
                if(voucherGridComponentColumnData.gridId!=null){
                    voucherGridComponentColumn.setGridId(voucherGridComponentColumnData.gridId);
                }
                if(voucherGridComponentColumnData.display!=null){
                    voucherGridComponentColumn.setDisplay((voucherGridComponentColumnData.display=='true'||voucherGridComponentColumnData.display==true)?true:false);
                }
                if(voucherGridComponentColumnData.isPin!=null){
                    voucherGridComponentColumn.setIsPin((voucherGridComponentColumnData.isPin=='true'||voucherGridComponentColumnData.isPin==true)?true:false);
                }
                if(voucherGridComponentColumnData.dateTimeFormat!=null){
                    voucherGridComponentColumn.setDateTimeFormat(voucherGridComponentColumnData.dateTimeFormat);
                }
                if(voucherGridComponentColumnData.editor!=null){
                    voucherGridComponentColumn.setEditor((voucherGridComponentColumnData.editor=='true'||voucherGridComponentColumnData.editor==true)?true:false);
                }
                if(voucherGridComponentColumnData.picUrl!=null){
                    voucherGridComponentColumn.setPicUrl(voucherGridComponentColumnData.picUrl);
                }
                if(voucherGridComponentColumnData.selectPattern!=null){
                    voucherGridComponentColumn.setSelectPattern(voucherGridComponentColumnData.selectPattern);
                }
                if(voucherGridComponentColumnData.visbleType!=null){
                    voucherGridComponentColumn.setVisbleType(voucherGridComponentColumnData.visbleType);
                }
                if(voucherGridComponentColumnData.readOnly!=null){
                    voucherGridComponentColumn.setReadOnly((voucherGridComponentColumnData.readOnly=='true'||voucherGridComponentColumnData.readOnly==true)?true:false);
                }
                if(voucherGridComponentColumnData.required!=null){
                    voucherGridComponentColumn.setRequired((voucherGridComponentColumnData.required=='true'||voucherGridComponentColumnData.required==true)?true:false);
                }
                if(voucherGridComponentColumnData.orderByType!=null){
                    voucherGridComponentColumn.setOrderByType(voucherGridComponentColumnData.orderByType);
                }
                if(voucherGridComponentColumnData.canSearch!=null){
                    voucherGridComponentColumn.setCanSearch((voucherGridComponentColumnData.canSearch=='true'||voucherGridComponentColumnData.canSearch==true)?true:false);
                }
                if(voucherGridComponentColumnData.length!=null){
                    voucherGridComponentColumn.setLength(voucherGridComponentColumnData.length==''?'':Number(voucherGridComponentColumnData.length));
                }
                if(voucherGridComponentColumnData.min!=null){
                    voucherGridComponentColumn.setMin(voucherGridComponentColumnData.min==''?'':Number(voucherGridComponentColumnData.min));
                }
                if(voucherGridComponentColumnData.max!=null){
                    voucherGridComponentColumn.setMax(voucherGridComponentColumnData.max==''?'':Number(voucherGridComponentColumnData.max));
                }
                if(voucherGridComponentColumnData.intLength!=null){
                    voucherGridComponentColumn.setIntLength(voucherGridComponentColumnData.intLength==''?'':Number(voucherGridComponentColumnData.intLength));
                }
                if(voucherGridComponentColumnData.scaleLength!=null){
                    voucherGridComponentColumn.setScaleLength(voucherGridComponentColumnData.scaleLength==''?'':Number(voucherGridComponentColumnData.scaleLength));
                }
                if(voucherGridComponentColumnData.regExp!=null){
                    voucherGridComponentColumn.setRegExp(voucherGridComponentColumnData.regExp);
                }
                if(voucherGridComponentColumnData.refSearchCondition!=null){
                    voucherGridComponentColumn.setRefSearchCondition(voucherGridComponentColumnData.refSearchCondition);
                }
                if(voucherGridComponentColumnData.checkErrorInfo!=null){
                    voucherGridComponentColumn.setCheckErrorInfo(voucherGridComponentColumnData.checkErrorInfo);
                }
                if(voucherGridComponentColumnData.linkForm!=null){
                    voucherGridComponentColumn.setLinkForm(voucherGridComponentColumnData.linkForm);
                }
            }
        }

    },

    //获得所有列
    _getAllColumns: function(){
        var cols = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            if(childNodes[i].getClassName()=='wof.bizWidget.VoucherGridComponentColumn'){
                cols.push(childNodes[i]);
            }
        }
        return cols;
    },

    //根据index序号获得指定列
    findColumnByIndex: function(index){
        var column = null;
        var childNodes = this.childNodes();
        for(var i=1;i<=childNodes.length;i++){
            if(childNodes[i-1].getClassName()=='wof.bizWidget.VoucherGridComponentColumn'){
                if(i==index){
                    column = childNodes[i-1];
                    break;
                }
            }
        }
        return column;
    },

    //计算锁定列和非锁定列以及表格实际宽度并设置column序号(index从1开始)
    _calcColumns: function(){
        var columns = this._getAllColumns();
        this._pinColumns = [];
        this._unPinColumns = [];
        this._realWidth = 0;
        this._realHeight = 0;
        if(this.getNumberDisplay()==true){
            this._themeColumnsWidth = this._numberColumnWidth;
        }else{
            this._themeColumnsWidth = 0;
        }
        for(var i=0;i<columns.length;i++){
            var column = columns[i];
            column.setIndex(i+1);
            if(column.getDisplay()==true){
                if(column.getIsPin()==true){
                    this._pinColumns.push(column);
                    this._themeColumnsWidth += column.getColumnWidth();
                }else{
                    this._unPinColumns.push(column);
                }
                this._realWidth += column.getColumnWidth();
            }
        }
    },

    //创建表头
    _createHeader: function(clientWidth){
        var headerDiv = jQuery('<div style="position:absolute;overflow:hidden;top:'+(18*this.getScale())+'px;left:0px;width:'+clientWidth+'px;height:'+((this.getHeaderHeight()*this.getScale())+1)+'px;"></div>');
        return headerDiv;
    },

    //创建主题列(即锁定列)
    _createThemeColumns:function(clientHeight){
        var themeColumnsDiv = jQuery('<div style="position:absolute;overflow:hidden;top:'+(18*this.getScale())+'px;left:0px;width:'+((this._themeColumnsWidth*this.getScale())+1)+'px;height:'+clientHeight+'px;"></div>');
        return themeColumnsDiv;
    },

    //创建主题列表头
    _createThemeColumnsHeader:function(){
        var themeColumnsHeaderDiv = jQuery('<div style="position:absolute;overflow:hidden;top:'+(18*this.getScale())+'px;left:0px;width:'+((this._themeColumnsWidth*this.getScale())+1)+'px;height:'+((this.getHeaderHeight()*this.getScale())+1)+'px;"></div>');
        return themeColumnsHeaderDiv;
    },

    //创建grid div
    _createGridDiv:function(){
        var gridHeight = this.getHeight()-18;
        if(this.getUseMutiplePage()==true){
            gridHeight -= 18;
        }
        var gridDiv = jQuery('<div style="position:absolute;overflow:auto;top:'+(18*this.getScale())+'px;left:0px;width:'+(this.getWidth()*this.getScale())+'px;height:'+(gridHeight*this.getScale())+'px;"></div>');
        return gridDiv;
    },

    //创建分页 div
    _createPageTool: function(){
        var pageToolDivStr = '<div style="position:absolute;overflow:hidden;width:'+(this.getWidth()*this.getScale())+'px;height:'+(18*this.getScale())+'px;top:'+(this.getHeight()*this.getScale()-18)+'px;left:0px;">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:2px;"  src="src/img/icon-first.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:18px;" src="src/img/icon-prev.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:36px;" src="src/img/icon-next.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:54px;" src="src/img/icon-last.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:90px;" src="src/img/icon-load.gif">'
            +'<span style="position:absolute;top:0px;left:130px;">每页 '+this.getRowsCount()+' 条记录</span>'
            +'</div>';
        var pageToolDiv = jQuery(pageToolDivStr);
        return pageToolDiv;
    },

    //创建grid
    _createGrid:function(){
        var table = jQuery('<table style="position:absolute;top:0px;left:0px;background-color:#ffffff;width:'+(this._realWidth*this.getScale())+'px;border-collapse:collapse;border:none;"></table>');
        var rows = 0;
        if(this.getUseMutiplePage()==true){
            rows = this.getRowsCount();
        }else{
            rows = 30; //todo 需要根据实际数据结果
        }
        this._realHeight = 0;
        for(var r=0; r<=rows; r++){
            var tr = jQuery('<tr style="width:'+(this._realWidth*this.getScale())+'px;">');
            if(r==0){
                tr.css('height',(this.getHeaderHeight()*this.getScale())+'px');
                this._realHeight += this.getHeaderHeight();
            }else{
                tr.css('height',(this.getRowHeight()*this.getScale())+'px');
                this._realHeight += this.getRowHeight();
            }
            if(this.getNumberDisplay()==true){
                if(r==0){
                    var th = jQuery('<th class="ui-state-default" style="cursor:pointer;width:'+(this._numberColumnWidth*this.getScale())+'px;border:'+this._borderStyle+'"></th>');
                    var div = jQuery('<div style="position:relative;overflow:hidden;width:'+((this._numberColumnWidth*this.getScale())-2)+'px;height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;vertical-align:middle;">序号</div>');
                    th.append(div);
                    tr.append(th);
                }else{
                    var td = jQuery('<td style="width:'+(this._numberColumnWidth*this.getScale())+'px;border:'+this._borderStyle+'"></td>');
                    var div = jQuery('<div style="position:relative;overflow:hidden;width:'+((this._numberColumnWidth*this.getScale())-2)+'px;height:'+((this.getRowHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+((this.getRowHeight()*this.getScale())-1)+'px;vertical-align:middle;">'+r+'</div>');
                    td.append(div);
                    tr.append(td);
                }
            }
            for(var c=1; c<=this._pinColumns.length;c++){
                var column = this._pinColumns[c-1];
                if(r==0){
                    var th = jQuery('<th class="ui-state-default" style="cursor:pointer;width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'"></th>');
                    var div = jQuery('<div colId="'+column.getId()+'" style="position:relative;overflow:hidden;width:'+((column.getColumnWidth()*this.getScale())-2)+'px;height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+(this.getHeaderHeight()-1)+'px;vertical-align:middle;">'+column.getCaption()+'</div>');
                    th.append(div);
                    tr.append(th);
                    var _this = this;
                    var timeFn = null;
                    div.mousedown(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        timeFn = setTimeout(function(){
                            var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                            _this.setActiveColumnIndex(column.getIndex());
                            _this.sendMessage('wof.bizWidget.VoucherGridComponent_active');
                        },250);
                    });
                    div.dblclick(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                        _this.setActiveColumnIndex(column.getIndex());
                        _this.sendMessage('wof.bizWidget.VoucherGridComponent_active');
                    });
                }else{
                    var td = jQuery('<td style="width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'">');
                    tr.append(td);
                }
            }
            for(var c=1; c<=this._unPinColumns.length;c++){
                var column = this._unPinColumns[c-1];
                if(r==0){
                    var th = jQuery('<th class="ui-state-default" style="cursor:pointer;width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'"></th>');
                    var div = jQuery('<div colId="'+column.getId()+'" style="position:relative;overflow:hidden;width:'+((column.getColumnWidth()*this.getScale())-2)+'px;height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;vertical-align:middle;">'+column.getCaption()+'</div>');
                    th.append(div);
                    tr.append(th);
                    var _this = this;
                    var timeFn = null;
                    div.mousedown(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        timeFn = setTimeout(function(){
                            var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                            _this.setActiveColumnIndex(column.getIndex());
                            _this.sendMessage('wof.bizWidget.VoucherGridComponent_active');
                        },250);
                    });
                    div.dblclick(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                        _this.setActiveColumnIndex(column.getIndex());
                        _this.sendMessage('wof.bizWidget.VoucherGridComponent_active');
                    });
                }else{
                    var td = jQuery('<td style="width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'">');
                    tr.append(td);
                }
            }
            table.append(tr);
        }
        table.css('height',(this._realHeight*this.getScale())+'px');
        return table;
    },
    _getBindEntityPropertyColumns : function (){
        var bindPropertyColumns = [];
        var gridComponentColumns = this._getAllColumns();
        if(gridComponentColumns){
            for(var i = 0; i < gridComponentColumns.length;i++){
                var gridComponentColumn = gridComponentColumns[i]
                var bindDataField = gridComponentColumn.getBindDataField();
                if(bindDataField){
                    bindPropertyColumns.push(gridComponentColumn);
                }
            }
        }
        return bindPropertyColumns;
    },
    //创建初始化的VoucherGridComponent
    createSelf: function(width, height){
        var node = new wof.bizWidget.VoucherGridComponent();
        node.setWidth(width-8);
        node.setHeight(height-25);
        node.setHeaderHeight(45);
        node.setName('未命名表体列表');
        node.setTop(2);
        node.setLeft(2);
        node.setUseMutiplePage(true);
        for(var i=0;i<1;i++){
            var column = new wof.bizWidget.VoucherGridComponentColumn();
            column.setCaption('列'+(i+1));
            column.setColumnWidth(120);
            column.appendTo(node);
        }
        return node;
    }



};


