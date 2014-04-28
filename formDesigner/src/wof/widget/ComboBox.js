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
    _values: null,    // 当前选中的值
    _split: null, //分隔符
    _mode: null,    //normal 普通 tree 树 grid 列表


    _comboBox:null,

    setValues: function(values) {
        this._values = values;
    },

    getValues: function() {
        return this._values || [];
    },

    setSplit: function(split) {
        this._split = split;
    },

    getSplit: function() {
        return this._split || ',';
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
        return this._mode || 'normal';
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

    _beforeRender: function () {

    },


    _initRender: function () {
        var _this = this;
        var comboBox = wis$.create('ComboBox');
        comboBox.setReadonly(this.getReadonly());
        comboBox.setName(this.getName());
        comboBox.setIsMultiSelect(this.getIsMultiSelect());
        comboBox.setMode(this.getMode());
        comboBox.setSelectData(this.getComboBoxData());
        comboBox.setGridColumn(this.getGridColumn());

        comboBox.onBeforeSelect(function (val, text) {
            _this.setValues(val);
            _this.sendMessage('wof.widget.ComboBox_beforeSelect');
            return true;
        });

        comboBox.onSelected(
            function (val, text) {
                _this.setValues(val);
                _this.sendMessage('wof.widget.ComboBox_selected');
            }
        );

        comboBox.appendTo(this.getDomInstance());

        this._comboBox = comboBox;
    },
    
    render: function () {
        this._comboBox.setWidth(this.getWidth());
        this._comboBox.setHeight(this.getHeight());
        this._comboBox.setValues(this.getValues());

        this._comboBox.render();
    },

    _afterRender: function () {

        this.sendMessage('wof.widget.ComboBox_render');
    },

    getData: function () {
        return {
            split: this.getSplit(),
            comboBoxData: this.getComboBoxData(),
            gridColumn: this.getGridColumn(),
            isMultiSelect: this.getIsMultiSelect(),
            multiSelectSplit: this.getMultiSelectSplit(),
            name: this.getName(),
            readonly: this.getReadonly(),
            values: this.getValues(),
            mode: this.getMode()
        };
    },

    setData: function (data) {
        this.setSplit(data.split);
        this.setComboBoxData(data.comboBoxData);
        this.setGridColumn(data.gridColumn);
        this.setIsMultiSelect(data.isMultiSelect);
        this.setMultiSelectSplit(data.multiSelectSplit);
        this.setName(data.name);
        this.setReadonly(data.readonly);
        this.setValues(data.values);
        this.setMode(data.mode);
    },

    getTexts: function(){
        var texts = [];
        var data = this.getComboBoxData();
        var len = data.length;
        for(var i=0;i<len;i++){
            var item = data[i];
            if(jQuery.inArray(item['value'],this.getValues())>-1){
                texts.push(item['name']);
            }
        }
        return texts.join(this.getSplit());
    }


};
