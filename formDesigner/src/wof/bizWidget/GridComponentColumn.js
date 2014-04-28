/**
 * @bizWidgetClass GridComponentColumn class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.GridComponentColumn = function () {
    this._version = '1.0';
    this.setIsInside(true);
    this.setHiden(true);
};
wof.bizWidget.GridComponentColumn.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _name :null, //列名,标识方式：#EntityName.PropertyName

    _useMultiSelect :null,   //数据字典用于选择项下拉时，指定多选还是单选

    _columnType :null,    //列类型

    _caption :null,  //列显示名称,格式#EntityName.PropertyVisibleName

    _columnWidth:null,

    _bindDataField  :null,  //绑定元数据,格式：#EntityName.PropertyName

    _gridId :null,  //下拉框表格时，表格的Id

    _display :null,   //是否显示

    _isPin :null,   //是否钉住

    _dateTimeFormat :null,  //日期 、时间格式，平台会预设几个格式

    _editor :null, //是否行编辑

    _picUrl :null,   //图片地址,暂不实现

    _selectPattern :null, //下拉框显示模式

    _visbleType :null, //界面显示类型

    _readOnly :null, //是否只读

    _required :null,  //是否必填

    _orderByType :null,   //排序类型

    _canSearch :null,  //是否允许快捷查询

    _length :null,  //字符长度

    _min :null,  //数值最小值

    _max :null,    //数值最小值

    _intLength :null,   //整数部分位数

    _scaleLength :null, //小数部分位数

    _regExp :null,   //校验正则表达式

    _refSearchCondition :null,   //参照查询条件

    _checkErrorInfo :null,   //数据校验失败提示信息

    _linkForm: null,     //窗体链接列

    _index: null,


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

    getUseMultiSelect: function(){
        if(this._useMultiSelect==null){
            this._useMultiSelect = false;
        }
        return this._useMultiSelect;
    },

    setUseMultiSelect: function(useMultiSelect){
        this._useMultiSelect = useMultiSelect;
    },

    getColumnType: function(){
        return this._columnType;
    },

    setColumnType: function(columnType){
        this._columnType = columnType;
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

    getColumnWidth: function(){
        if(this._columnWidth==null){
            this._columnWidth = 70;
        }
        return this._columnWidth;
    },

    setColumnWidth: function(columnWidth){
        this._columnWidth = columnWidth;
    },

    getBindDataField: function(){
        if(this._bindDataField==null){
            this._bindDataField = '';
        }
        return this._bindDataField;
    },

    setBindDataField: function(bindDataField){
        this._bindDataField = bindDataField;
    },

    getGridId: function(){
        if(this._gridId==null){
            this._gridId = '';
        }
        return this._gridId;
    },

    setGridId: function(gridId){
        this._gridId = gridId;
    },

    getDisplay: function(){
        if(this._display==null){
            this._display = true;
        }
        return this._display;
    },

    setDisplay: function(display){
        this._display = display;
    },

    getIsPin: function(){
        if(this._isPin==null){
            this._isPin = false;
        }
        return this._isPin;
    },

    setIsPin: function(isPin){
        this._isPin = isPin;
    },

    getDateTimeFormat: function(){
        if(this._dateTimeFormat==null){
            this._dateTimeFormat = 'yyyy-MM-dd';
        }
        return this._dateTimeFormat;
    },

    setDateTimeFormat: function(dateTimeFormat){
        this._dateTimeFormat = dateTimeFormat;
    },

    getEditor: function(){
        if(this._editor==null){
            this._editor = false;
        }
        return this._editor;
    },

    setEditor: function(editor){
        this._editor = editor;
    },

    getPicUrl: function(){
        if(this._picUrl==null){
            this._picUrl = '';
        }
        return this._picUrl;
    },

    setPicUrl: function(picUrl){
        this._picUrl = picUrl;
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

    getVisbleType: function(){
        if(this._visbleType==null){
            this._visbleType = 'text';
        }
        return this._visbleType;
    },

    setVisbleType: function(visbleType){
        this._visbleType = visbleType;
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

    getOrderByType: function(){
        if(this._orderByType==null){
            this._orderByType = '';
        }
        return this._orderByType;
    },

    setOrderByType: function(orderByType){
        this._orderByType = orderByType;
    },

    getCanSearch: function(){
        if(this._canSearch==null){
            this._canSearch =  false;
        }
        return this._canSearch;
    },

    setCanSearch: function(canSearch){
        this._canSearch = canSearch;
    },

    getLength: function(){
        if(this._length==null){
            this._length =  '';
        }
        return this._length;
    },

    setLength: function(length){
        this._length = length;
    },

    getMin: function(){
        if(this._min==null){
            this._min =  '';
        }
        return this._min;
    },

    setMin: function(min){
        this._min = min;
    },

    getMax: function(){
        if(this._max==null){
            this._max =  '';
        }
        return this._max;
    },

    setMax: function(max){
        this._max = max;
    },

    getIntLength: function(){
        if(this._intLength==null){
            this._intLength =  '';
        }
        return this._intLength;
    },

    setIntLength: function(intLength){
        this._intLength = intLength;
    },

    getScaleLength: function(){
        if(this._scaleLength==null){
            this._scaleLength =  '';
        }
        return this._scaleLength;
    },

    setScaleLength: function(scaleLength){
        this._scaleLength = scaleLength;
    },

    getRegExp: function(){
        if(this._regExp==null){
            this._regExp =  '';
        }
        return this._regExp;
    },

    setRegExp: function(regExp){
        this._regExp = regExp;
    },

    getRefSearchCondition: function(){
        if(this._refSearchCondition==null){
            this._refSearchCondition =  '';
        }
        return this._refSearchCondition;
    },

    setRefSearchCondition: function(refSearchCondition){
        this._refSearchCondition = refSearchCondition;
    },

    getCheckErrorInfo: function(){
        if(this._checkErrorInfo==null){
            this._checkErrorInfo =  '';
        }
        return this._checkErrorInfo;
    },

    setCheckErrorInfo: function(checkErrorInfo){
        this._checkErrorInfo = checkErrorInfo;
    },

    getLinkForm: function(){
        if(this._linkForm==null){
            this._linkForm =  '';
        }
        return this._linkForm;
    },

    setLinkForm: function(linkForm){
        this._linkForm = linkForm;
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

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

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
            name:this.getName(),
            useMultiSelect:this.getUseMultiSelect(),
            columnType:this.getColumnType(),
            caption:this.getCaption(),
            columnWidth:this.getColumnWidth(),
            bindDataField:this.getBindDataField(),
            gridId:this.getGridId(),
            display:this.getDisplay(),
            isPin:this.getIsPin(),
            dateTimeFormat:this.getDateTimeFormat(),
            editor:this.getEditor(),
            picUrl:this.getPicUrl(),
            selectPattern:this.getSelectPattern(),
            visbleType:this.getVisbleType(),
            readOnly:this.getReadOnly(),
            required:this.getRequired(),
            orderByType:this.getOrderByType(),
            canSearch:this.getCanSearch(),
            length:this.getLength(),
            min:this.getMin(),
            max:this.getMax(),
            intLength:this.getIntLength(),
            scaleLength:this.getScaleLength(),
            regExp:this.getRegExp(),
            refSearchCondition:this.getRefSearchCondition(),
            checkErrorInfo:this.getCheckErrorInfo(),
            linkForm:this.getLinkForm(),
            index: this.getIndex()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setUseMultiSelect(data.useMultiSelect);
        this.setColumnType(data.columnType);
        this.setCaption(data.caption);
        this.setColumnWidth(data.columnWidth);
        this.setBindDataField(data.bindDataField);
        this.setGridId(data.gridId);
        this.setDisplay(data.display);
        this.setIsPin(data.isPin);
        this.setDateTimeFormat(data.dateTimeFormat);
        this.setEditor(data.editor);
        this.setPicUrl(data.picUrl);
        this.setSelectPattern(data.selectPattern);
        this.setVisbleType(data.visbleType);
        this.setReadOnly(data.readOnly);
        this.setRequired(data.required);
        this.setOrderByType(data.orderByType);
        this.setCanSearch(data.canSearch);
        this.setLength(data.length);
        this.setMin(data.min);
        this.setMax(data.max);
        this.setIntLength(data.intLength);
        this.setScaleLength(data.scaleLength);
        this.setRegExp(data.regExp);
        this.setRefSearchCondition(data.refSearchCondition);
        this.setCheckErrorInfo(data.checkErrorInfo);
        this.setLinkForm(data.linkForm);
        this.setIndex(data.index);
    }

};