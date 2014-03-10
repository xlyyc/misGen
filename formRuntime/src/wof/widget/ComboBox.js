/**
 * @widgetClass ComboBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:35
 */

wof.widget.ComboBox = function () {
    this._version = '1.0';
    this._selectBoxWidth = 200;
    this._multiSelectSplit = ',';
};

wof.widget.ComboBox.prototype = {

    _url: null, // 加载数据url

    _comboboxData: null, // 下拉框时数据格式： [{text:'男',value:'1'},{'text':'女',value:2}]

    _tree: null, // 下拉树

    _grid: null, // 下拉表格

    _isMultiSelect: null, // 是否可多选

    _multiSelectSplit: null, // 多选后显示、值分隔符

    _selectedValue: null, // 当前选中的值

    _selectedText: null, //  当前选中的文本

    _selectBoxHeight: null, //  下拉框的高度

    _selectBoxWidth: null, //  下拉框的宽度

    initRender: function () {
        var _this = this;
        using("combobox", function () {
            _this.ligerComboboxInput = jQuery('<input type="text">');
            _this.getDomInstance().append(_this.ligerComboboxInput);
            _this.ligerComboboxInput.ligerComboBox({
                width: _this.getSelectBoxWidth(),
                textField: "text",
                data: _this.getComboboxData()
            });
        })
    },
    getSelectBoxWidth: function () {
        return this._getSelectBoxWidth;
    },

    getComboboxData: function () {
        return this._comboboxData;
    },

    setComboboxData: function (comboboxData) {
        this._comboboxData = comboboxData;
    },

    beforeRender: function () {

    },

    render: function () {
        //TODO lovey中如何改变已实例化的属性?
    },

    afterRender: function () {

    },

    getData: function () {
        return {

        };
    },

    setData: function (data) {
    }
};