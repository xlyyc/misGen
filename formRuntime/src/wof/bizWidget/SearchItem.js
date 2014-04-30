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


    _value:null, //当前选中值 如果是范围搜索 该值多于一个

    /**
     * get/set 属性方法定义
     */
    getValue: function(){
        return this._value || '';
    },

    setValue: function(value){
        this._value = value;
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
            this._labelWidth = 100;
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
        this._label.setText(this.getCaption());
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
        if(this.getVisbleType()=='text'){
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


    _insideOnReceiveMessage: {
        'wof.widget.Input_blur': function(message) {
            console.log(message.id+'   '+this.getClassName());
            var input = wof.util.ObjectManager.get(message.sender.id);
            if(this.getFromTo()==false){
                this.setValue(input.getValue());
            }else{ //todo 范围搜索

            }
            return false;
        }, 
        'wof.widget.ComboBox_selected': function (message) {
            console.log(message.id+'   '+this.getClassName());
            var cb = wof.util.ObjectManager.get(message.sender.id);
            if(this.getFromTo()==false){
                var vals = cb.getValues();
                var vstr = '';
                for(var i=0;i<vals.length;i++){
                    vstr+='@start@'+vals[i]+'@end@';
                }
                this.setValue(vstr);
            }else{ //todo 范围搜索

            }
            return false;
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

        // if (!readonlyMethod) {
        //     readonlyMethod = 'setReadonly';
        // }
        // switch (this.getOriginNode().getState()) {
        // case 'Add':
        //     this._component[readonlyMethod](false);
        //     break;
        // case 'View':
        //     this._component[readonlyMethod](true);
        //     break;
        // default:
        //     this._component[readonlyMethod](this.getReadOnly() ? true : false);
        // }
    },


    //根据当前的显示类型设置对应的元件
    _setComponent: function(){      //todo 需要考虑范围搜索的情况
        if(this.getDataField().length <= 0) {
            return;
        }

        var visbleType = this.getVisbleType();
        switch (visbleType) {
        case 'text':
            this._initComponent('wof.widget.Input');
            this._component.setValue(this.getValue());
            break;

        case 'textArea':
            this._initComponent('wof.widget.TextArea');
            break;
        
        case 'richTextArea':
            this._initComponent('wof.widget.HTMLEditor');
            break;
        
        case 'select':
            this._initComponent('wof.widget.ComboBox');
            var refData = this.getOriginNode().getDataSource().getRefData();
            var ref = refData[this.getDataField()];
            if(!jQuery.isEmptyObject(ref)){ //并且参照字段有值
                //var data = [{'name':'','value':''}];
                var data = [];
                for(var i=0;ref['data']!=null&&i<ref['data'].length;i++){
                    var row = ref['data'][i];
                    data.push({'name':row['name'],'value':row['value']});
                }
                var vals = [];
                var val = this.getValue();
                var re = /(@start@)(.*?)(@end@)/g;
                var matches = val.match(re);
                for (var i=0;matches!=null&&i<matches.length;i++){
                    var v = matches[i].substring(7,matches[i].length-5);
                    vals.push(v);
                }
                this._component.setValues(vals);
                this._component.setComboBoxData(data);
            }
            break;
        
        case 'checkBox':
            this._initComponent('wof.widget.CheckBox');
            break;
        
        case 'date':
            this._initComponent('wof.widget.DateEditor');
            break;
        
        case 'radio':
            this._initComponent('wof.widget.RadioGroup');
            break;
        
        case 'file':
            this._initComponent('wof.widget.FileBox');
            break;
        
        case 'number':
            this._initComponent('wof.widget.Input');
            break;
        
        default:
        }
    },

    // _createComponent: function(){
    //     var visbleType = this.getVisbleType();
    //     var clzName = '';
    //     if(visbleType=='text'){
    //         clzName = 'wof.widget.Input';
    //     }else if(visbleType=='textArea'){
    //         clzName = 'wof.widget.TextArea';
    //     }else if(visbleType=='richTextArea'){
    //         clzName = 'wof.widget.HTMLEditor';
    //     }else if(visbleType=='select'){
    //         clzName = 'wof.widget.ComboBox';
    //     }else if(visbleType=='checkBox'){
    //         clzName = 'wof.widget.CheckBox';
    //     }else if(visbleType=='date'){
    //         clzName = 'wof.widget.DateEditor';
    //     }else if(visbleType=='radio'){
    //         clzName = 'wof.widget.RadioGroup';
    //     }else if(visbleType=='file'){
    //         clzName = 'wof.widget.FileBox';
    //     }else if(visbleType=='number'){
    //         clzName = 'wof.widget.Input';
    //     }
    //     /**
    //      * todo 暂时使用
    //      */
    //     //clzName = 'wof.widget.Input';

    //     if(this._component!=null&&this._component.getClassName()==clzName){
    //         component = this._component;
    //     }else{
    //         if(this._component!=null){
    //             this._component.removeChildren(true);
    //             this._component.remove(true);
    //             this._component = null;
    //         }
    //         component = wof$.create(clzName);
    //         component.setIsInside(true);
    //         component.appendTo(this);
    //         this._component = component;
    //     }
    //     component.setLeft(this.getLabelWidth());
    //     component.setWidth(this.getInputWidth());
    //     component.setHeight(this.getInputHeight());

    //     var refData = this.getOriginNode().getDataSource().getRefData();
    //     //如果显示类型为下拉框 则需要初始化参照值
    //     if(visbleType=='select'){
    //         var ref = refData[this.getDataField()];
    //         if(!jQuery.isEmptyObject(ref)){ //并且参照字段有值
    //             var data = [];
    //             for(var i=0;ref['data']!=null&&i<ref['data'].length;i++){
    //                 var row = ref['data'][i];
    //                 data.push({'name':row['name'],'value':row['value']});
    //             }
    //             component.setInitValue('0');//默认值
    //             component.setComboboxData(data);
    //         }
    //     }
    // },

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
