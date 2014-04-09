/**
 * 下拉框控件统一API
 * 
 * 
 */
wis.widget.Select = function () {
    this._version = '1.0';

};

wis.widget.Select.prototype = {
    _selectName: null,
    _isMultSelect: false,
    _mode: null,
    // _initValue: null,
    // _isAsync: false,
    _select: false,
    _comboBox: false,
    
    /**
     * 数据格式
     * [
                { value: 1, name: "金智科技"},
                { value: 2, name: "金智教育"},
                { value: 3, name: "金智投资"},
                { value: 4, name: "金智智能"}
            ]
     */
    _selectData : null,
    _gridColumn : null,
    
    
    getSelectData:function (){
    	return this._selectData;
    },
    setSelectData:function (selectData){
		this._selectData = selectData;
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

    // getInitValue: function () {
    //     return this._initValue;
    // },

    // setInitValue: function (initValue) {
    //     this._initValue = initValue;
    // },

    setValue: function(v) {
        this._value = v;
    },

    getValue: function() {
        return this._value;
    },

    getGridColumn: function () {
        return this._gridColumn;
    },
    setGridColumn: function (gridColumn) {
        this._gridColumn = gridColumn || [];
    },

    // getIsAsync: function () {
    //     return this._isAsync;
    // },
    // setIsAsync: function (isAsync) {
    //     this._isAsync = isAsync;
    // },

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

        this.getDomInstance().append(this._select);

        var _this = this;
        var options = {
            data: this.getSelectData(),
            isMultiSelect: this.getIsMultSelect(),
            // selectBoxHeight: this.getHeight(),
            width: this.getWidth(),
            // initValue: this.getInitValue(), 
            isNotShowClear: true,
            onBeforeSelect:this._onBeforeSelect,
            onSelected: function (val, txt) {
                _this.setValue(val);
                if (_this._onSelected) {
                    _this._onSelected(val, txt);
                }
            }
        };

        if (this.getGridColumn() && this.getGridColumn().length > 0) {
            // 下拉表格
            options.textField = 'name';
            options.columns = this.getGridColumn();
        } else {
            // 普通下拉框
            options.textField = "name";
            options.valueField = "value";
        }

        this._comboBox = this._select.ligerComboBox(options);
    },

    // 渲染前处理方法
    beforeRender: function () {

    },

    // 渲染方法
    render: function () {
        this.getCid() && this._select.attr('id',this.getCid());
        this.getSelectName() && this._select.attr('name',this.getSelectName());
        this._comboBox.selectValue(this._value);
    },

    // 渲染后处理方法
    afterRender: function () {
        // 替换掉ligerui的表格
        // if (this.getGridColumn() && this.getGridColumn().length > 0) {
        //     console.log(this.getGridColumn());
        //     console.log(this.getSelectData());
        //     jQuery('table', this.getDomInstance()).remove();
        // };
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
