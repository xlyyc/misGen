/**
 * 下拉框控件统一API
 * 
 * 
 */
wis.widget.Select = function () {
    this._version = '1.0';

};

wis.widget.Select.prototype = {
    _cid: null,
    _selectName: null,
    _isMultSelect: false,
    _mode: null,
    _initValue: null,
    _isAsync: false,
    _select: false,
    
    /**
     * 数据格式
     * [
                { id: 1, text: "金智科技"},
                { id: 2, text: "金智教育"},
                { id: 3, text: "金智投资"},
                { id: 4, text: "金智智能"}
            ]
     */
    _selectData : false,
    
    
    getSelectData:function (){
    	return this._selectData;
    },
    setSelectData:function (selectData){
		this._selectData = selectData;
	},
    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getSelectName: function () {
        return this._selectName;
    },

    setSelectName: function (selectName) {
        this._selectName = selectName;
    },

    getIsMultSelect: function () {
        return this._isMultSelect;
    },

    setIsMultSelect: function (isMultSelect) {
        this._isMultSelect = isMultSelect;
    },

    getMode: function () {
        return this._mode;
    },

    setMode: function (mode) {
        this._mode = mode;
    },

    getInitValue: function () {
        return this._initValue;
    },

    setInitValue: function (initValue) {
        this._initValue = initValue;
    },

    getIsAsync: function () {
        return this._isAsync;
    },

    setIsAsync: function (isAsync) {
        this._isAsync = isAsync;
    },
    /**
	 * 初始化方法
	 */
    _init: function (data) {
    },

    /**
	 * 初始化渲染方法 仅在第一次调用render时执行
	 */
    initRender: function () {
        this._select = jQuery('<input type="text">');
        this._select.attr('id',this.getCid());
        this._select.attr('name',this.getSelectName());

        // 将容器添加到dom上
        $("body").append(this._select);
        var ligerComboBox = this._select.ligerComboBox({
            textField: "text",
            valueField: "id",
            data: this.getSelectData(),
            isMultiSelect: this.getIsMultSelect(),
            isNotShowClear: true,
            onBeforeSelect:this._onBeforeSelect,
            onSelected:this._onSelected
        });
        this.getDomInstance().append(ligerComboBox);
    },

    // 渲染前处理方法
    beforeRender: function () {

    },

    // 渲染方法
    render: function () {
        this.getCid() && this._select.attr('id',this.getCid());
        this.getSelectName() && this._select.attr('name',this.getSelectName());
    },

    // 渲染后处理方法
    afterRender: function () {


    },

    // ----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid(),
            selectData: this.getSelectData()
        };
    },

    // ----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setSelectData(data.selectData);
    },
    onBeforeSelect: function (callBack) {
        this._onBeforeSelect = callBack;
    },
    onSelected:function(callBack){
        this._onSelected = callBack;
    }
};