/**
 * @bizWidgetClass VoucherItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherItem = function () {
    this._version = '1.0';

    this.setIsInside(true);
    this.getDomInstance().css('overflow','hidden');


};
wof.bizWidget.VoucherItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _colNum: null,   //列号

    _rowNum: null,  //行号

    _isFixItem: null,   //是否是固定项，如为固定项目，则在界面显示时，显示位置固定，不进行流式布局

    _rowspan: null,   //纵跨行数

    _itemName: null,  //表单项名称,设置格式：#EntityName.PropertyName

    _visiable: null, //表单项是否显示

    _itemLabel: null, //显示名称，设置格式：#EntityName.PropertyVisibleName,可以固定值，也可以是设置绑定实体字段

    _dataField: null, //绑定的数据实体属性，设置格式

    _dateTimeBoxFormat: null, //日期 、时间格式，平台会预设几个格式

    _readOnly: null, //是否只读

    _required: null, //是否必填

    _length: null, //字符长度

    _min: null, //数值最小值

    _max: null, //数值最大值

    _regExp: null, //校验正则表达式

    _checkErrorInfo: null, //数据校验失败提示信息

    _selectPattern: null, //下拉框显示模式，VisbleType为select时有意义，包括三种：normal、tree、grid（分别是普通下拉列表、下拉树、下拉表格）

    _useMultiSelect:null, //数据字典用于选择项下拉时，指定多选还是单选

    _visbleType: null, //显示类型，包括Id,Text、Textarea、RichTextArea、Select、CheckBox、Date、Radio、File、Number

    _labelWidth: null, //Label宽度

    _inputWidth: null, //输入框宽度

    _inputHeight: null, //输入框高度

    _colspan: null, //横跨的列数

    _tipValue: null, //提示性的值或默认值

    _linkageItem: null,



    /**
     * get/set 属性方法定义
     */
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

    getItemName: function(){
        if(this._itemName==null){
            this._itemName = '';
        }
        return this._itemName;
    },

    setItemName: function(itemName){
        this._itemName = itemName;
    },

    getVisiable: function(){
        if(this._visiable==null){
            this._visiable = true;
        }
        return this._visiable;
    },

    setVisiable: function(visiable){
        this._visiable = visiable;
    },

    getItemLabel: function(){
        if(this._itemLabel==null){
            this._itemLabel = '';
        }
        return this._itemLabel;
    },

    setItemLabel: function(itemLabel){
        this._itemLabel = itemLabel;
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

    getReadOnly: function(){
        if(this._readOnly==null){
            this._readOnly = false;
        }
        return this._readOnly;
    },

    setReadOnly: function(readOnly){
        this._readOnly = readOnly;
    },

    getRequired: function(){
        if(this._required==null){
            this._required = false;
        }
        return this._required;
    },

    setRequired: function(required){
        this._required = required;
    },

    getLength: function(){
        if(this._length==null){
            this._length = '';
        }
        return this._length;
    },

    setLength: function(length){
        this._length = length;
    },

    getMin: function(){
        if(this._min==null){
            this._min = '';
        }
        return this._min;
    },

    setMin: function(min){
        this._min = min;
    },

    getMax: function(){
        if(this._max==null){
            this._max = '';
        }
        return this._max;
    },

    setMax: function(max){
        this._max = max;
    },

    getRegExp: function(){
        if(this._regExp==null){
            this._regExp = '';
        }
        return this._regExp;
    },

    setRegExp: function(regExp){
        this._regExp = regExp;
    },

    getCheckErrorInfo: function(){
        if(this._checkErrorInfo==null){
            this._checkErrorInfo = '';
        }
        return this._checkErrorInfo;
    },

    setCheckErrorInfo: function(checkErrorInfo){
        this._checkErrorInfo = checkErrorInfo;
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

    getLabelWidth: function(){
        if(this._labelWidth==null){
            this._labelWidth = 160;
        }
        return this._labelWidth;
    },

    setLabelWidth: function(labelWidth){
        this._labelWidth = labelWidth;
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
                    if(draggableObj.getClassName()=='wof.bizWidget.VoucherItem'){
                        if(_this.parentNode()==null){
                            b=false;
                        }else{
                            var layout = draggableObj.getOriginNode();
                            var thisLayout = _this.getOriginNode();
                            if(thisLayout!=null&&thisLayout.getId()==layout.getId()){
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
                    if(obj.getClassName()=='wof.bizWidget.VoucherItem'){
                        _this.sendMessage('wof.bizWidget.VoucherItem_voucherItemDrop', {'voucherItemId':ui.draggable.attr('oid')});
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
        if(this.getItemLabel()!=''&&this.getVisbleType()!=''){
            var label = jQuery('<label style="width:'+this.getLabelWidth()+'px;">'+(this.getItemLabel()==''?'&nbsp;':this.getItemLabel())+(this.getDataField()==''?'':'('+this.getDataField()+')')+'</label>');
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
            colNum: this.getColNum(),
            rowNum: this.getRowNum(),
            isFixItem: this.getIsFixItem(),
            rowspan: this.getRowspan(),
            itemName: this.getItemName(),
            visiable: this.getVisiable(),
            itemLabel: this.getItemLabel(),
            dataField: this.getDataField(),
            dateTimeBoxFormat: this.getDateTimeBoxFormat(),
            readOnly: this.getReadOnly(),
            required: this.getRequired(),
            length: this.getLength(),
            min: this.getMin(),
            max: this.getMax(),
            regExp: this.getRegExp(),
            checkErrorInfo: this.getCheckErrorInfo(),
            selectPattern: this.getSelectPattern(),
            useMultiSelect:this.getUseMultiSelect(),
            visbleType: this.getVisbleType(),
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
        this.setColNum(data.colNum);
        this.setRowNum(data.rowNum);
        this.setIsFixItem(data.isFixItem);
        this.setRowspan(data.rowspan);
        this.setItemName(data.itemName);
        this.setVisiable(data.visiable);
        this.setItemLabel(data.itemLabel);
        this.setDataField(data.dataField);
        this.setDateTimeBoxFormat(data.dateTimeBoxFormat);
        this.setReadOnly(data.readOnly);
        this.setRequired(data.required);
        this.setLength(data.length);
        this.setMin(data.min);
        this.setMax(data.max);
        this.setRegExp(data.regExp);
        this.setCheckErrorInfo(data.checkErrorInfo);
        this.setSelectPattern(data.selectPattern);
        this.setUseMultiSelect(data.useMultiSelect);
        this.setVisbleType(data.visbleType);
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
        }else if(this.getItemLabel()!=''){
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