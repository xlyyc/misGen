/**
 * 时间选择控件统一API
 *
 *
 */
wis.widget.DateEditor = function () {
    this._version = '1.0';

};

wis.widget.DateEditor.prototype = {

    _name: null,                //名称
    _format: null,              //日期格式化类型"yyyy-MM-dd hh:mm:ss"
    _showTime: null,            //是否显示时间
    _customValidate: null,      //验证器
    _defaultValue: null,       //初始化的默认值
    _value: null,               //当前时间
    _cancelable: null,         //是否可以取消选择
    _onChangeDate:null,         //事件改变

    _dateEditorTemp: null,
    _dateEidtor:null,

    getDefaultValue: function () {
        return this._defaultValue || '';
    },

    setDefaultValue: function (defaultValue) {
        this._defaultValue = defaultValue;
    },

    getShowTime: function () {
        return this._showTime || false;
    },

    setShowTime: function (showTime) {
        this._showTime = showTime;
    },

    getCancelable: function () {
        return this._cancelable || true;
    },

    setCancelable: function (cancelable) {
        this._cancelable = cancelable;
    },

    getName: function () {
        return this._name || '';
    },

    setName: function (name) {
        this._name = name;
    },

    getFormat: function() {
        return this._format || 'yyyy-MM-dd';
    },

    setFormat: function(format) {
        this._format= format;
    },

    getCustomValidate: function () {
        return this._customValidate;
    },

    setCustomValidate: function (customValidate) {
        this._customValidate = customValidate;
    },

    getValue: function () {
        return this._dateEditorTemp.attr('value');
    },

    setValue: function (value) {
        this._dateEditorTemp.attr('value',value);
    },

    getWidth: function(){
        return this._width || 200;
    },


    onChangeDate: function(callback){
        if(typeof callback  === "function" ){
             this._onChangeDate = callback;
        }
    },

    /**
     * 初始化方法
     */
    _init: function (data) {
        this.setData(data);
    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    _initRender: function () {
        var dateEditorTemp = jQuery('<input type="text" name="'+this.getName()+'">');
        this._dateEditorTemp = dateEditorTemp;
        this.getDomInstance().append(dateEditorTemp);
        this._dateEidtor = dateEditorTemp.ligerDateEditor(
            {
                absolute:true,
                showTime:this.getShowTime(),
                format: this.getFormat(),
                labelWidth: this.getWidth(),
                cancelable : this.getCancelable()
            }
        );
        var that = this;
        this._dateEidtor.bind("changeDate",function(e){
            that.setValue(e);
            if(that._onChangeDate){
                that._onChangeDate(that);
            }
        });
        this.setValue(this.getDefaultValue());
    },

    //渲染前处理方法
    _beforeRender: function () {

    },

    //渲染方法
    render: function () {

    },

    //渲染后处理方法
    _afterRender: function () {

    },

    //----------必须实现----------
    getData: function () {
        return {
            defaultValue: this.getDefaultValue(),
            showTime: this.getShowTime(),
            cancelable: this.getCancelable(),
            name: this.getName(),
            format: this.getFormat(),
            customValidate: this.getCustomValidate(),
            value: this.getValue()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setDefaultValue(data.defaultValue);
        this.setShowTime(data.showTime);
        this.setCancelable(data.cancelable);
        this.setName(data.name);
        this.setFormat(data.format);
        this.setCustomValidate(data.setCustomValidate);
        this.setValue(data.value);
    }


};