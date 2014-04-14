/**
 * @widgetClass ComboBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:35
 */

wof.widget.ComboBox = function () {
    this._version = '1.0';

};

wof.widget.ComboBox.prototype = {

    _comboBoxData: null, // 下拉框时数据格式
    _gridColumn: null, // 下拉表格
    _isMultiSelect: null, // 是否可多选
    _multiSelectSplit: null, // 多选后显示、值分隔符
    _name: null,
    _readonly: null,
    _value: null,    // 当前选中的值
    _text: null,
    _mode: null,


    _comboBox:null,

    setText: function(text) {
        this._text = text;
    },

    getText: function() {
        return this._text || '';
    },

    setValue: function(value) {
        this._value = value;
    },

    getValue: function() {
        return this._value || '';
    },

    /**
     [
        { header: 'ID', name: 'id', width: 20 },
        { header: '名字', name: 'name' },
        { header: '性别', name: 'sex' }
      ]
     */
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

    getReadonly: function () {
        return this._readonly || false;
    },

    setReadonly: function (readonly) {
        this._readonly = readonly;
    },

    getIsMultiSelect: function () {
        return this._isMultiSelect || false;
    },

    setIsMultiSelect: function (isMultiSelect) {
        this._isMultiSelect = isMultiSelect;
    },

    getMode: function () {
        return this._mode || false;
    },

    setMode: function (mode) {
        this._mode = mode;
    },

    /**
     [
        { id: 1, name: '李三', sex: '男' },
        { id: 2, name: '李四', sex: '女' },
        { id: 3, name: '赵武', sex: '女' },
        { id: 4, name: '陈留', sex: '女' }
     ]
     */
    getComboBoxData: function () {
        return this._comboBoxData || [];
    },

    setComboBoxData: function (comboBoxData) {
        this._comboBoxData = comboBoxData;
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
        var comboBox = wis$.create('ComboBox');
        comboBox.setReadonly(this.getReadonly());
        comboBox.setComboBoxName(this.getName());
        comboBox.setIsMultiSelect(this.getIsMultiSelect());
        comboBox.setMode(this.getMode());
        comboBox.setSelectData(this.getComboBoxData());
        comboBox.setGridColumn(this.getGridColumn());

        comboBox.onBeforeSelect(function (val, text) {
            var ret = true;
            if (_this._onBeforeSelect) {
                ret = _this._onBeforeSelect(val, text);
            }
            _this.sendMessage('wof.widget.ComboBox_beforeselect');
            return ret;
        });

        comboBox.onSelected(
            function (val, text) {
                _this.setText(text);
                _this.setValue(val);
                _this._onSelected && _this._onSelected(val, text);
                _this.sendMessage('wof.widget.ComboBox_selected');
            }
        );

        comboBox.appendTo(this.getDomInstance());

        this._comboBox = comboBox;
    },
    
    render: function () {
        this._comboBox.setWidth(this.getWidth());
        this._comboBox.setHeight(this.getHeight());

        console.log('this._value==='+this.getValue());
        this._comboBox.setValue(this._value);

        this._comboBox.render();
    },

    afterRender: function () {

        this.sendMessage('wof.widget.ComboBox_render');
    },

    getData: function () {
        return {
            comboBoxData: this.getComboBoxData(),
            gridColumn: this.getGridColumn(),
            isMultiSelect: this.getIsMultiSelect(),
            multiSelectSplit: this.getMultiSelectSplit(),
            name: this.getName(),
            readonly: this.getReadonly(),
            value: this.getValue(),
            text: this.getText(),
            mode: this.getMode()
        };
    },

    setData: function (data) {
        this.setComboBoxData(data.comboBoxData);
        this.setGridColumn(data.gridColumn);
        this.setIsMultiSelect(data.isMultiSelect);
        this.setMultiSelectSplit(data.multiSelectSplit);
        this.setName(data.name);
        this.setReadonly(data.readonly);
        this.setValue(data.value);
        this.setText(data.text);
        this.setMode(data.mode);
    }
};
