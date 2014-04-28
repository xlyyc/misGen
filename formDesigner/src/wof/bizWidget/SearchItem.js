/**
 * @bizWidgetClass SearchItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.SearchItem = function () {
    this._version = '1.0';

    this.setIsInside(true);

    this.getDomInstance().css('overflow','hidden');
};
wof.bizWidget.SearchItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _name:null,   //名称，设置格式：#EntityName.PropertyName

    _index:null,

    _dataField:null,

    _caption:null,    //显示名称，设置格式：#EntityName.PropertyVisibleName,可以固定值，也可以是设置绑定实体字段

    _useMultiSelect:null,          //数据字典用于选择项下拉时，指定多选还是单选

    _selectPattern:null,        //下拉框显示模式，VisbleType为select时有意义，包括三种：normal、tree、grid（分别是普通下拉列表、下拉树、下拉表格）

    _dateTimeBoxFormat:null,

    _visbleType:null,            //显示类型，包括Id,Text、Textarea、RichTextArea、Select、CheckBox、Date、Radio、File、Number

    _labelWidth:null, //Label宽度

    _fromTo:null,        //是否是范围搜索

    _lableWidth:null,  //Label宽度

    _inputWidth:null,               //输入框宽度

    _inputHeight:null,           //输入框高度

    _linkageItem:null,          //关联联动的项，设置为其他item的Name属性

    _colspan:null,           //横跨的列数

    _tipValue:null,                       //提示性的值或默认值

    _colNum: null,   //列号

    _rowNum: null,  //行号

    _isFixItem: null,   //是否是固定项，如为固定项目，则在界面显示时，显示位置固定，不进行流式布局

    _rowspan: null,   //纵跨行数

    /**
     * get/set 属性方法定义
     */
    getName: function(){
        if(this._name==null){
            this._name = '';
        }
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },

    getColNum: function(){
        return this._colNum;
    },

    setColNum: function(colNum){
        this._colNum = colNum;
    },

    getRowNum: function(){
        return this._rowNum;
    },

    setRowNum: function(rowNum){
        this._rowNum = rowNum;
    },

    getCaption: function(){
        if(this._caption==null){
            this._caption = '';
        }
        return this._caption;
    },

    setCaption: function(caption){
        this._caption = caption;
    },

    getDataField: function(){
        if(this._dataField==null){
            this._dataField = '';
        }
        return this._dataField;
    },

    setDataField: function(dataField){
        this._dataField = dataField;
    },

    getDateTimeBoxFormat: function(){
        if(this._dateTimeBoxFormat==null){
            this._dateTimeBoxFormat = 'yyyy-MM-dd';
        }
        return this._dateTimeBoxFormat;
    },

    setDateTimeBoxFormat: function(dateTimeBoxFormat){
        this._dateTimeBoxFormat = dateTimeBoxFormat;
    },

    getSelectPattern: function(){
        if(this._selectPattern==null){
            this._selectPattern = 'normal';
        }
        return this._selectPattern;
    },

    setSelectPattern: function(selectPattern){
        this._selectPattern = selectPattern;
    },

    getUseMultiSelect: function(){
        if(this._useMultiSelect==null){
            this._useMultiSelect = false;
        }
        return this._useMultiSelect;
    },

    setUseMultiSelect: function(useMultiSelect){
        this._useMultiSelect = useMultiSelect;
    },

    getVisbleType: function(){
        if(this._visbleType==null){
            this._visbleType = 'text';
        }
        return this._visbleType;
    },

    setVisbleType: function(visbleType){
        this._visbleType = visbleType;
    },


    getFromTo: function(){
        if(this._fromTo==null){
            this._fromTo = false;
        }
        return this._fromTo;
    },

    getLabelWidth: function(){
        if(this._labelWidth==null){
            this._labelWidth = 160;
        }
        return this._labelWidth;
    },

    setLabelWidth: function(labelWidth){
        this._labelWidth = labelWidth;
    },

    setFromTo: function(fromTo){
        this._fromTo = fromTo;
    },

    getInputWidth: function(){
        if(this._inputWidth==null){
            this._inputWidth = 100;
        }
        return this._inputWidth;
    },

    setInputWidth: function(inputWidth){
        this._inputWidth = inputWidth;
    },

    getInputHeight: function(){
        if(this._inputHeight==null){
            this._inputHeight = 20;
        }
        return this._inputHeight;
    },

    setInputHeight: function(inputHeight){
        this._inputHeight = inputHeight;
    },

    getTipValue: function(){
        if(this._tipValue==null){
            this._tipValue = '';
        }
        return this._tipValue;
    },

    setTipValue: function(tipValue){
        this._tipValue = tipValue;
    },

    getLinkageItem: function(){
        if(this._linkageItem==null){
            this._linkageItem = '';
        }
        return this._linkageItem;
    },

    setLinkageItem: function(linkageItem){
        this._linkageItem = linkageItem;
    },

    getRowspan: function(){
        if(this._rowspan==null){
            this._rowspan = 1;
        }
        return this._rowspan;
    },

    setRowspan: function(rowspan){
        this._rowspan = rowspan;
    },

    getIsFixItem: function(){
        if(this._isFixItem==null){
            this._isFixItem = false;
        }
        return this._isFixItem;
    },

    setIsFixItem: function(isFixItem){
        this._isFixItem = isFixItem;
    },

    getColspan: function(){
        if(this._colspan==null)
            this._colspan = 1;
        return this._colspan;
    },

    setColspan: function(colspan){
        this._colspan = colspan;
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
                    if(draggableObj.getClassName()=='wof.bizWidget.SearchItem'){
                        if(_this.parentNode()==null){
                            b=false;
                        }else{
                            var searchComponent = draggableObj.parentNode();
                            var thisSearchComponent = _this.parentNode();
                            if(thisSearchComponent.getId()==searchComponent.getId()){
                                b=true;
                            }
                        }
                    }
                }
                return b;
            },
            hoverClass: 'ui-state-hover',
            drop:function(event,ui){
                event.stopPropagation();
                var obj = wof.util.ObjectManager.get(ui.draggable.attr('oid'));
                if(obj!=null){
                    if(obj.getClassName()=='wof.bizWidget.SearchItem'){
                        _this.sendMessage('wof.bizWidget.SearchItem_searchItemDrop', {'searchItemId':ui.draggable.attr('oid')});
                    }
                }
            }
        });
        this.getDomInstance().draggable({
            cursor:"move",
            opacity: 0.7,
            cursorAt:{
                top:0,
                left:0
            },
            containment: 'div[oid="'+this.parentNode().getId()+'"]',  //限定拖放只能在当前分组内
            scroll: false,
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

        this.getDomInstance().children().remove();
        if(this.getCaption()!=''&&this.getVisbleType()!=''){
            var label = jQuery('<label style="width:'+this.getLabelWidth()+'px;">'+(this.getCaption()==''?'&nbsp;':this.getCaption())+(this.getDataField()==''?'':'('+this.getDataField()+')')+'</label>');
            this.getDomInstance().append(label);
            var hr = jQuery('<hr style="width:96%;border-top:1px solid black;">');
            this.getDomInstance().append(hr);
            var component = this.createComponent();
            this.getDomInstance().append(component);
            var bgImg = jQuery('<img src="src/img/backgroud.gif" style="position:absolute;cursor:pointer;top:0px;left:0px;opacity:0;filter:alpha(opacity=0);width:100%;height:100%;">');
            this.getDomInstance().append(bgImg);
        }
    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {
        if(this.getIsFixItem()==true){
            this.getDomInstance().draggable('disable');
        }else{
            this.getDomInstance().draggable('enable');
        }
        if(this.getLeft()!=null){
            this.getDomInstance().css('left', ((this.getLeft()*this.getScale())+2)+'px');
        }
        if(this.getTop()!=null){
            this.getDomInstance().css('top', ((this.getTop()*this.getScale())+2)+'px');
        }
        if(this.getWidth()!=null){
            this.getDomInstance().css('width', ((this.getWidth()*this.getScale())-4)+'px');
        }
        if(this.getHeight()!=null){
            this.getDomInstance().css('height', ((this.getHeight()*this.getScale())-4)+'px');
        }

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name:this.getName(),
            index:this.getIndex(),
            colNum: this.getColNum(),
            rowNum: this.getRowNum(),
            isFixItem: this.getIsFixItem(),
            rowspan: this.getRowspan(),
            caption: this.getCaption(),
            dataField: this.getDataField(),
            dateTimeBoxFormat: this.getDateTimeBoxFormat(),
            selectPattern: this.getSelectPattern(),
            useMultiSelect:this.getUseMultiSelect(),
            visbleType: this.getVisbleType(),
            fromTo: this.getFromTo(),
            labelWidth: this.getLabelWidth(),
            inputWidth: this.getInputWidth(),
            inputHeight: this.getInputHeight(),
            colspan: this.getColspan(),
            tipValue: this.getTipValue(),
            linkageItem: this.getLinkageItem()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setIndex(data.index);
        this.setColNum(data.colNum);
        this.setRowNum(data.rowNum);
        this.setIsFixItem(data.isFixItem);
        this.setRowspan(data.rowspan);
        this.setCaption(data.caption);
        this.setDataField(data.dataField);
        this.setDateTimeBoxFormat(data.dateTimeBoxFormat);
        this.setSelectPattern(data.selectPattern);
        this.setUseMultiSelect(data.useMultiSelect);
        this.setVisbleType(data.visbleType);
        this.setFromTo(data.fromTo);
        this.setLabelWidth(data.labelWidth);
        this.setInputWidth(data.inputWidth);
        this.setInputHeight(data.inputHeight);
        this.setColspan(data.colspan);
        this.setTipValue(data.tipValue);
        this.setLinkageItem(data.linkageItem);
    },

    //创建元件
    createComponent: function(){
        var component = null;
        if(this.getVisbleType()=='id'){
            component = jQuery('<input type="text" style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;">');
        }else if(this.getVisbleType()=='text'){
            component = jQuery('<input type="text" style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;">');
        }else if(this.getVisbleType()=='textArea'){
            component = jQuery('<textarea style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;"></textarea>');
        }else if(this.getVisbleType()=='richTextArea'){
            component = jQuery('<textarea style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;"></textarea>');
        }else if(this.getVisbleType()=='select'){
            component = jQuery('<select style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;"><option></option></option></select>');
        }else if(this.getVisbleType()=='checkBox'){
            component = jQuery('<input type="checkBox" style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;">');
        }else if(this.getVisbleType()=='date'){
            component = jQuery('<input type="text" style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;"><img src="src/img/calendar.gif">');
        }else if(this.getVisbleType()=='radio'){
            component = jQuery('<input type="radio" style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;">');
        }else if(this.getVisbleType()=='file'){
            component = jQuery('<input type="file" style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;">');
        }else if(this.getVisbleType()=='number'){
            component = jQuery('<input type="text" style="width:'+this.getInputWidth()+'px;height:'+this.getInputHeight()+'px;">');
        }
        return component;
    },

    //是否已经被修改过数据
    isChange:function(){
        var f = false;
        if(this.getDataField()!=''){
            f = true;
        }else if(this.getCaption()!=''){
            f = true;
        }else if(this.getIsFixItem()==true){
            f = true;
        }else if(this.getRowspan()>1){
            f = true;
        }else if(this.getColspan()>1){
            f = true;
        }
        return f;
    }


};