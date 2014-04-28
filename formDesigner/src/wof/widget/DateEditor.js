/**
 * @widgetClass DateEditor class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:35
 */

wof.widget.DateEditor = function () {
    this._version = '1.0';
};

wof.widget.DateEditor.prototype = {

    _dateBox: null,
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _name: null,                //名称
    _format: null,              //日期格式化类型"yyyy-MM-dd hh:mm:ss"
    _showTime: null,            //是否显示时间
    _customValidate: null,      //验证器
    _defaultValue: null,       //初始化的默认值
    _value: null,               //当前时间
    _cancelable: null,         //是否可以取消选择
	
    /**
     * get/set 属性方法定义
     */

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
        return this._dateBox.getValue();
    },

    setValue: function (value) {
        this._dateBox.setValue(value);
    },

    getWidth: function(){
        return this._width || 200;
    },

    /**
     * Render 方法定义
     */

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    _initRender: function () {
        var _this = this;

        var dateBox = wis$.create('DateEditor');
        dateBox.setName(this.getName());
        dateBox.setFormat(this.getFormat());
        dateBox.setShowTime(this.getShowTime());
        dateBox.setCustomValidate(this.getCustomValidate());
        dateBox.setDefaultValue(this.getDefaultValue());
        dateBox.setCancelable(this.getCancelable());
        dateBox.appendTo(this.getDomInstance());
        dateBox.render();
        dateBox.onChangeDate(function(dateObj){
            console.log('wof.widget.DateBox_dateChange');
            _this.sendMessage('wof.widget.DateBox_dateChange');
        });
        this._dateBox = dateBox;
    },

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {

        this.sendMessage('wof.widget.DateBox_render');
    },

    /**
     * getData/setData 方法定义
     */

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