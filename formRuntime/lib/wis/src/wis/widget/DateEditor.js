/**
 * 时间选择控件统一API
 *
 *
 */
wis.widget.DateEditor = function () {
    this._version = '1.0';

};

wis.widget.DateEditor.prototype = {

    _cid: null,                 //页面唯一编号
    _name: null,                //名称
    _format: null,              //日期格式化类型"yyyy-MM-dd hh:mm:ss"
    _customValidate: null,      //验证器
    _value: null,               //默认值
    _onChangeDate:null,         //事件改变

    

    getCid: function () {
        return this._cid || this.getId();
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
     * 初始化方法
     */
    _init: function (data) {
        // to do ...
        
    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    initRender: function () {
        var dateEditorTemp = jQuery('<input type="text">');
        //default value opeartion
       
        //append to page 
        jQuery("body").append(dateEditorTemp);
      
        // start to build datepicker
        this._dateEidtor = dateEditorTemp.ligerDateEditor({absolute:false,showTime:true});

        this.getDomInstance().append(this._dateEidtor.textwrapper).append(this._dateEidtor.dateeditor);

        var that = this;
        this._dateEidtor.bind("changeDate",function(e){
            that.setValue(e);
            if(  that._onChangeDate  )
            {
                that._onChangeDate(that);
            }
        })
    },

    //渲染前处理方法
    beforeRender: function () {
        // to do ...
    },

    //渲染方法
    render: function () {  

        if( this.getFormat() )
        {
            this._dateEidtor._setFormat( this.getFormat() );
        }

        // yyyy-mm-dd hh:mm
        if( this.getValue() )
        {
            var date = this._dateEidtor._bulidDate( this.getValue() );
            this._dateEidtor._setValue(date);
        }

        if( this.getWidth() )
        {
            this._dateEidtor._setWidth( this.getWidth() );
        }
    },

    //渲染后处理方法
    afterRender: function () {
        // to do ...
    },

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