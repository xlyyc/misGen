/**
 * @bizWidgetClass VoucherItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.VoucherItem = function () {
    this._version = '1.0';

    this.setIsInside(true);
   // this.getDomInstance().css('overflow','hidden');


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
        return this._itemName || '';
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
        return this._itemLabel || '';
    },

    setItemLabel: function(itemLabel){
        this._itemLabel = itemLabel;
    },

    getDataField: function(){
        return this._dataField || '';
    },

    setDataField: function(dataField){
        this._dataField = dataField;
    },

    getDateTimeBoxFormat: function(){
        return this._dateTimeBoxFormat || 'yyyy-MM-dd';
    },

    setDateTimeBoxFormat: function(dateTimeBoxFormat){
        this._dateTimeBoxFormat = dateTimeBoxFormat;
    },

    getReadOnly: function(){
        return this._readOnly || false;
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
        return this._length || '';
    },

    setLength: function(length){
        this._length = length;
    },

    getMin: function(){
        return this._min || '';
    },

    setMin: function(min){
        this._min = min;
    },

    getMax: function(){
        return this._max || '';
    },

    setMax: function(max){
        this._max = max;
    },

    getRegExp: function(){
        return this._regExp || '';
    },

    setRegExp: function(regExp){
        this._regExp = regExp;
    },

    getCheckErrorInfo: function(){
        return this._checkErrorInfo || '';
    },

    setCheckErrorInfo: function(checkErrorInfo){
        this._checkErrorInfo = checkErrorInfo;
    },

    getSelectPattern: function(){
        return this._selectPattern || 'normal';
    },

    setSelectPattern: function(selectPattern){
        this._selectPattern = selectPattern;
    },

    getUseMultiSelect: function(){
        return this._useMultiSelect || false;
    },

    setUseMultiSelect: function(useMultiSelect){
        this._useMultiSelect = useMultiSelect;
    },

    getVisbleType: function(){
        return this._visbleType || 'text';
    },

    setVisbleType: function(visbleType){
        this._visbleType = visbleType;
    },

    getLabelWidth: function(){
        return this._labelWidth || 100;
    },

    setLabelWidth: function(labelWidth){
        this._labelWidth = labelWidth;
    },

    getInputWidth: function(){
        return this._inputWidth || 100;
    },

    setInputWidth: function(inputWidth){
        this._inputWidth = inputWidth;
    },

    getInputHeight: function(){
        return this._inputHeight || 20;
    },

    setInputHeight: function(inputHeight){
        this._inputHeight = inputHeight;
    },

    getTipValue: function(){
        return this._tipValue || '';
    },

    setTipValue: function(tipValue){
        this._tipValue = tipValue;
    },

    getLinkageItem: function(){
        return this._linkageItem || '';
    },

    setLinkageItem: function(linkageItem){
        this._linkageItem = linkageItem;
    },

    getRowspan: function(){
        return this._rowspan || 1;
    },

    setRowspan: function(rowspan){
        this._rowspan = rowspan;
    },

    getIsFixItem: function(){
        return this._isFixItem || false;
    },

    setIsFixItem: function(isFixItem){
        this._isFixItem = isFixItem;
    },

    getColspan: function(){
        return this._colspan || 1;
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
    _initRender:function(){
        var label = wof$.create('Label');
        label.setIsInside(true);
        label.setLeft(0);
        label.setIsUnderline(false);
        label.setScale(this.getScale());
        label.appendTo(this);
        this._label = label;
    },
    //选择实现
    _beforeRender: function () {
        this._label.setWidth(this.getLabelWidth());
        this._label.setText(this.getItemLabel());
        this._label.setTip(this.getTipValue());

        this._setComponent();

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
            var vals = cb.getValues();
            var vstr = '';
            for(var i=0;i<vals.length;i++){
                vstr+='@start@'+vals[i]+'@end@';
            }
            this.setValue(vstr);
            this.sendMessage('wof.bizWidget.VoucherItem_change');
        }
    },

    _initComponent: function(clzName, readonlyMethod) {
        if (this._component && this._component.getClassName() !== clzName) {
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
        switch (this.getOriginNode()._pageState) {
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
        if(this.getDataField().length > 0) {
            var visbleType = this.getVisbleType();
            switch(visbleType){
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
                    this._component.setIsMultiSelect(this.getUseMultiSelect());
                    this._component.setMode(this.getSelectPattern());
                    var refdata = this.getOriginNode().getRefData();
                    var fname = this.getDataField();
                    if (refdata && refdata[fname]) {

                        var vals = [];
                        var val = this.getValue();
                        var re = /(@start@)(.*?)(@end@)/g;
                        var matches = val.match(re);
                        for (var i=0;matches!=null&&i<matches.length;i++){
                            var v = matches[i].substring(7,matches[i].length-5);
                            vals.push(v);
                        }
                        this._component.setValues(vals);
                        var data = refdata[fname]['data'];
                        this._component.setComboBoxData(data);
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
        }
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
