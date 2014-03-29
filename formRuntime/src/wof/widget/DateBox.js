/**
 * @widgetClass DateBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:35
 */

wof.widget.DateBox = function () {
    this._version = '1.0';
};

wof.widget.DateBox.prototype = {

    _dateBox: null,
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _cid: null,                 //页面唯一编号
    _name: null,                //名称
    _format: null,              //日期格式化类型"yyyy-MM-dd hh:mm:ss"
    _customValidate: null,      //验证器
    _value: null,               //默认值
    _onChangeDate:null,         //事件改变
	
    /**
     * get/set 属性方法定义
     */
    getCid: function () {
        return this._cid ;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getName: function () {
        return this._name;
    },

    setName: function (name) {
        this._name = name;
    },

    getFormat: function() {
        return this._format || 'yyyy-MM-dd hh:mm:ss';
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
        return this._value;
    },

    setValue: function (value) {
        this._value = value;
    },

    getWidth: function(){
        return this._width || 200;
    },

    // not support
    getHeight: function(){
        return null;
    },


    onChangeDate: function(callback){
        if(typeof callback  === "function" )
        {
            this._onChangeDate = callback;
        }
    },
    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this._dateBox = wis$.create('DateEditor');
         //setDate
        this._dateBox.setData({
            cid:   this.getCid(),
            name:  this.getName(),
            format: this.getFormat(),
            customValidate: this.getCustomValidate(),
            value: this.getValue()
        });

        var that = this;
        this._dateBox.onChangeDate(function(dateObj){
            that.sendMessage('wof.widget.DateBox_dateChange');
            that.setValue(dateObj.getValue());
            that._onChangeDate && that._onChangeDate(that);
        });

        this._dateBox.render();

        this.getDomInstance().append(this._dateBox.getDomInstance());
    },

    //----------必须实现----------
    render: function () {

        this._dateBox.setData({
            cid:   this.getCid(),
            name:  this.getName(),
            format: this.getFormat(),
            customValidate: this.getCustomValidate(),
            value: this.getValue()
        });

        this._dateBox.render();
    },

    //选择实现
    afterRender: function () {
        this.sendMessage('wof.widget.DateBox_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid(),
            name: this.getName(),
            format: this.getFormat(),
            customValidate: this.getCustomValidate(),
            value: this.getValue()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setName(data.name);
        this.setFormat(data.format);
        this.setCustomValidate(data.setCustomValidate);
        this.setValue(data.value);
    }

};