/**
 * @widgetClass ComboBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:35
 */

wof.widget.ComboBox = function () {
    this._version = '1.0';
    // this._selectBoxWidth = 200;
    // this._multiSelectSplit = ',';
};

wof.widget.ComboBox.prototype = {

    _url: null, // 加载数据url

    _comboBoxData: null, // 下拉框时数据格式： [{'name':'男',value:'1'},{'name':'女',value:2}]
    _tree: null, // 下拉树

    // 下拉表格时数据格式:
    // setComboboxData([
    //     { id: 1, name: '李三', sex: '男' },
    //     { id: 2, name: '李四', sex: '女' },
    //     { id: 3, name: '赵武', sex: '女' },
    //     { id: 4, name: '陈留', sex: '女' }
    // ]);
    // setGridColumn([
    //     { header: 'ID', name: 'id', width: 20 },
    //     { header: '名字', name: 'name' },
    //     { header: '性别', name: 'sex' }
    // ]);
    _gridColumn: null, // 下拉表格

    _isMultiSelect: false, // 是否可多选
    _multiSelectSplit: ',', // 多选后显示、值分隔符

    _selectedValue: null, // 当前选中的值
    _selectedText: null, //  当前选中的文本

    // _selectBoxHeight: null, //  下拉框的高度
    // _selectBoxWidth: null, //  下拉框的宽度

    _name: null,
    _value: null,
    _readonly: false,
    _isMultSelect: false,
    // _mode: null,
    _initValue: null,
    // _isAsync: false,

    getGridColumn: function () {
        return this._gridColumn;
    },
    setGridColumn: function (gridColumn) {
        this._gridColumn = gridColumn || [];
    },

    setMultiSelectSplit: function (split) {
        this._multiSelectSplit = split || ',';
    },
    getMultiSelectSplit: function () {
        return this._multiSelectSplit;
    },

    getName: function () {
        return this._name;
    },

    setName: function (selectName) {
        this._name = selectName;
    },

    getValue: function () {
        return this._value;
    },

    setValue: function (val) {
        this._value = val;
    },

    getReadonly: function () {
        return this._readonly;
    },

    setReadonly: function (ro) {
        this._readonly = ro;
    },

    getSelectedText: function () {
        return this._selectedText;
    }, 

    getSelectedValue: function () {
        return this._selectedValue;
    },

    getIsMultSelect: function () {
        return this._isMultSelect;
    },

    setIsMultSelect: function (isMultSelect) {
        this._isMultSelect = isMultSelect;
    },

    // getMode: function () {
    //     return this._mode;
    // },

    // setMode: function (mode) {
    //     this._mode = mode;
    // },

    // setWidth: function (w) {
    //     if (w > 0) {
    //         this._width = w;
    //         if (this._select) {
    //             this._select.setWidth(w);
    //         };
    //     };
    // },

    // setHeight: function (h) {
    //     if (h > 0) {
    //         this._height = h;
    //         if (this._select) {
    //             this._select.setHeight(h);
    //         };
    //     };
    // },

    // getInitValue: function () {
    //     return this._initValue;
    // },

    // setInitValue: function (initValue) {
    //     this._initValue = initValue;
    // },

    // getIsAsync: function () {
    //     return this._isAsync;
    // },

    // setIsAsync: function (isAsync) {
    //     this._isAsync = isAsync;
    // },

    // getSelectBoxWidth: function () {
    //     return this._getSelectBoxWidth;
    // },

    getComboboxData: function () {
        return this._comboBoxData;
    },

    setComboboxData: function (comboboxData) {
        this._comboBoxData = comboboxData || [];
    },

    onBeforeSelect: function (callBack) {
        this._onBeforeSelect = callBack;
    },
    onSelected:function(callBack){
        this._onSelected = callBack;
    },

    beforeRender: function () {

    },


    initRender: function () {
        var _this = this;
        // using("combobox", function () {
        //     _this.ligerComboboxInput = jQuery('<input type="text">');
        //     _this.getDomInstance().append(_this.ligerComboboxInput);
        //     _this.ligerComboboxInput.ligerComboBox({
        //         width: _this.getSelectBoxWidth(),
        //         textField: "text",
        //         data: _this.getComboboxData()
        //     });
        // })

        this._select = wis$.create('Select');

        this._select.setSelectName(this.getName());
        this._select.setIsMultSelect(this.getIsMultSelect());
        // this._select.setMode(this.getMode());
        // this._select.setInitValue(this.getInitValue());
        // this._select.setIsAsync(this.getIsAsync());
        this._select.setSelectData(this.getComboboxData());

        this._select.setGridColumn(this.getGridColumn());

        this._select.onBeforeSelect(function (val, text) {
            var ret = true;
            if (_this._onBeforeSelect) {
                ret = _this._onBeforeSelect(val, text);
            }
            _this.sendMessage('wof.widget.ComboBox_beforeselect');
            return ret;
        });

        this._select.onSelected(
            function (val, text) {
                _this._onSelected && _this._onSelected(val, text);
                _this._selectedText = text;
                _this._selectedValue = val;
                _this.sendMessage('wof.widget.ComboBox_selected');
            }
        );

        this._select.appendTo(this.getDomInstance());
    },
    
    render: function () {
        //TODO lovey中如何改变已实例化的属性?

        this._select.setWidth(this.getWidth());
        this._select.setHeight(this.getHeight());
        console.log('this._value==='+this._value);
        this._select.setValue(this._value);

        this._select.render();
    },

    afterRender: function () {
        this.sendMessage('wof.widget.ComboBox_render');
    },

    getData: function () {
        return {

        };
    },

    setData: function (data) {
    }
};
