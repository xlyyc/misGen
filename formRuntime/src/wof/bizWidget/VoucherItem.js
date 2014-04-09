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

    _label: null,

    _value: null,

    _component: null, //字段元件

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
            this._labelWidth = 100;
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

    getValue : function (){
        return this._value || '';
    },

    setValue : function (value){
        this._value = value;
    },

    /**
     * Render 方法定义
     */
    initRender:function(){
        var label = wof$.create('Label');
        label.setIsInside(true);
        label.setLeft(0);
        label.setIsUnderline(false);
        label.setScale(this.getScale());
        label.appendTo(this);
        this._label = label;
    },
    //选择实现
    beforeRender: function () {
        this._label.setWidth(this.getLabelWidth());
        this._label.setText(this.getItemLabel());
        this._label.setTip(this.getTipValue());

        this._setComponent();

    },

    //----------必须实现----------
    render: function () {

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
            linkageItem: this.getLinkageItem(),
            value : this.getValue()
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
        this.setValue(data.value);
    },

    _insideOnReceiveMessage:{
        'wof.widget.Input_blur': function(message) {
            console.log(message.id+'   '+this.getClassName());
            var input = wof.util.ObjectManager.get(message.sender.id);
            this.setValue(input.getValue());
            this.sendMessage('wof.bizWidget.VoucherItem_change');
            return false;
        },

        'wof.widget.ComboBox_selected': function (message) {
            console.log(message.id+'   '+this.getClassName());
            var cb = wof.util.ObjectManager.get(message.sender.id);
            // console.log('selected: %s -> %s', cb.getSelectedText(), cb.getSelectedValue());
            this.setValue(cb.getSelectedValue());
            this.sendMessage('wof.bizWidget.VoucherItem_change');
        }
    },

    _initComponent: function(clzName, readonlyMethod) {
        if (this._component && 
                this._component.getClassName() !== clzName) {
            this._component.removeChildren(true);
            this._component.remove(true);
            this._component = null;
        }

        if (this._component == null) {
            this._component = wof$.create(clzName);
            this._component.setIsInside(true);
            this._component.appendTo(this);
        }

        this._component.setLeft(this.getLabelWidth());
        this._component.setWidth(this.getInputWidth());
        this._component.setHeight(this.getInputHeight());

        if (!readonlyMethod) {
            readonlyMethod = 'setReadonly';
        }
        switch (this.getOriginNode().getState()) {
        case 'Add':
            this._component[readonlyMethod](false);
            break;
        case 'View':
            this._component[readonlyMethod](true);
            break;
        default:
            this._component[readonlyMethod](this.getReadOnly() ? true : false);
        }
    },

    //根据当前的显示类型设置对应的元件
    _setComponent: function() {
        if(this.getDataField().length <= 0) {
            return;
        }
        // var component = null;
        // var clzName = '';
        // var setValMethod = '';
        // var readonlyMethod = '';

        var visbleType = this.getVisbleType();
        switch (visbleType) {
        case 'text':
            this._initComponent('wof.widget.Input');
            this._component.setValue(this.getValue());
            break;

        case 'textArea':
            throw new Error(visbleType + 'is not yet implemented');
            break;
        
        case 'richTextArea':
            throw new Error(visbleType + 'is not yet implemented');
            break;
        
        case 'select':
            this._initComponent('wof.widget.ComboBox');
            var refdata = this.getOriginNode().getRefData();
            var fname = this.getDataField();
            if (refdata && refdata[fname]) {
                this._component.setComboboxData(refdata[fname]['data']);
            }
            break;
        
        case 'checkBox':
            throw new Error(visbleType + 'is not yet implemented');
            break;
        
        case 'date':
            throw new Error(visbleType + 'is not yet implemented');
            break;
        
        case 'radio':
            throw new Error(visbleType + 'is not yet implemented');
            break;
        
        case 'file':
            throw new Error(visbleType + 'is not yet implemented');
            break;
        
        case 'number':
            throw new Error(visbleType + 'is not yet implemented');
            break;
        
        default:
        }


            // if(visbleType=='text'){
            //     clzName = 'wof.widget.Input';
            //     setValMethod = 'setValue';
            // }else if(visbleType=='textArea'){
            //     clzName = 'wof.widget.TextArea';
            // }else if(visbleType=='richTextArea'){
            //     clzName = 'wof.widget.HTMLEditor';
            // }else if(visbleType=='select'){
            //     clzName = 'wof.widget.ComboBox';
            // }else if(visbleType=='checkBox'){
            //     clzName = 'wof.widget.CheckBox';
            // }else if(visbleType=='date'){
            //     clzName = 'wof.widget.DateBox';
            // }else if(visbleType=='radio'){
            //     clzName = 'wof.widget.RadioGroup';
            // }else if(visbleType=='file'){
            //     clzName = 'wof.widget.FileBox';
            // }else if(visbleType=='number'){
            //     clzName = 'wof.widget.Input';
            // }

            // /**
            //  * todo 暂时使用
            //  */
            // clzName = 'wof.widget.Input';
            // setValMethod = 'setValue';
            // readonlyMethod = 'setReadonly';

            // if(this._component!=null&&this._component.getClassName()==clzName){
            //     component = this._component;
            // }else{
            //     if(this._component!=null){
            //         this._component.removeChildren(true);
            //         this._component.remove(true);
            //         this._component = null;
            //     }
            //     component = wof$.create(clzName);
            //     component.setIsInside(true);
            //     component.appendTo(this);
            //     this._component = component;
            // }
            // component.setLeft(this.getLabelWidth());
            // component.setWidth(this.getInputWidth());
            // component.setHeight(this.getInputHeight());


            // var displayVal = this.getValue();
            // component[setValMethod](displayVal); //todo 需要结合当前的格式化配置来进行显示

            // //根据编辑状态和只读属性设置控件只读
            // var voucherComponent = this.getOriginNode();
            // var state = voucherComponent.getState();
            // console.log(state);
            // if(state=='Add'){
            //     component[readonlyMethod](false);
            // }else if(state=='View'){
            //     component[readonlyMethod](true);
            // }else{
            //     if(this.getReadOnly() == true){
            //         component[readonlyMethod](true);
            //     }else{
            //         component[readonlyMethod](false);
            //     }
            // }
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
