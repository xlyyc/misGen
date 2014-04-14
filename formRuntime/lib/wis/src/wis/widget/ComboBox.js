/**
 * 下拉框控件统一API
 *
 *
 */
wis.widget.ComboBox = function () {
    this._version = '1.0';

};

wis.widget.ComboBox.prototype = {

    _comboBoxName: null,
    _isMultiSelect: null,
    _mode: null,      //normal 普通 tree 树 grid 列表
    _selectData : null,
    _gridColumn : null, //如果mode是grid 需要设置该属性
    _treeData: null,  //如果mode是tree 需要设置该属性
    _readonly: null,
    _value: null,

    _textDom: null,
    _comboBox: null,
    _renderFlag:null,

    getReadonly: function () {
        return this._readonly || false;
    },
    setReadonly: function (readonly) {
        this._readonly = readonly;
    },

    /**
     [
     { value: 1, name: "金智科技"},
     { value: 2, name: "金智教育"},
     { value: 3, name: "金智投资"},
     { value: 4, name: "金智智能"}
     ]
     */
    getSelectData:function (){
        return this._selectData;
    },
    setSelectData:function (selectData){
        this._selectData = selectData;
    },

    getComboBoxName: function () {
        return this._comboBoxName;
    },

    setComboBoxName: function (comboBoxName) {
        this._comboBoxName = comboBoxName;
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

    setValue: function(value) {
        this._value = value;
    },

    getValue: function() {
        return this._value || '';
    },

    setTreeData: function(treeData) {
        this._treeData = treeData;
    },

    /**
     [
     { text: '节点1', children: [
         { text: '节点1.1' },
         { text: '节点1.2' },
         { text: '节点1.3', children: [
                 { text: '节点1.3.1' ,children: [
                     { text: '节点1.3.1.1' },
                     { text: '节点1.3.1.2' }]
                 },
                 { text: '节点1.3.2' }
         ]
         },
         { text: '节点1.4' }
         ]
     },
     { text: '节点2' },
     { text: '节点3' },
     { text: '节点4' }
     ]
     */
    getTreeData: function() {
        return this._treeData || {};
    },

    /*
     [
     { header: 'ID', name: 'value', width: 30 },
     { header: '名字', name: 'name' },
     { header: '性别', name: 'sex' }
     ];
     */
    getGridColumn: function () {
        return this._gridColumn || [];
    },
    setGridColumn: function (gridColumn) {
        this._gridColumn = gridColumn;
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
        this._textDom = jQuery('<input type="text">');
        this._textDom.attr('id',this.getCid());
        this._textDom.attr('name',this.getComboBoxName());

        this.getDomInstance().append(this._textDom);

        var _this = this;
        var options = {
            readonly: this.getReadonly(),
            absolute: false,
            selectBoxWidth: 100,
            data: this.getSelectData(),
            isMultiSelect: this.getIsMultiSelect(),
            width: this.getWidth(),
            emptyText: '',
            onBeforeSelect:function (val, txt) {
                var flag = false;
                if(_this._renderFlag==false){ //如果不是在render过程中触发
                    if (_this._onBeforeSelect) {
                        flag = _this._onBeforeSelect(val, txt);
                    }
                }
                return flag;
            },
            onSelected: function (val, txt) {
                if(_this._renderFlag==false){ //如果不是在render过程中触发
                    _this.setValue(val);
                    if (_this._onSelected) {
                        _this._onSelected(val, txt);
                    }
                }
            }
        };

        if(this.getMode()=='normal'){ // 普通下拉框
            options.textField = "name";
            options.valueField = "value";
        }else if(this.getMode()=='grid'){ // 下拉表格
            options.textField = 'name';
            options.valueField = "value";
            options.columns = this.getGridColumn();
        }else if(this.getMode()=='tree'){ // 树
            options.textField = "name";
            options.valueField = "value";
            options.getTreeData = this.getTreeData();
        }

        this._comboBox = this._textDom.ligerComboBox(options);
    },

    // 渲染前处理方法
    beforeRender: function () {
        this._renderFlag = true;
    },

    // 渲染方法
    render: function () {
        this.getCid() && this._textDom.attr('id',this.getCid());
        this.getComboBoxName() && this._textDom.attr('name',this.getComboBoxName());
        this._comboBox.selectValue(this._value);

    },

    // 渲染后处理方法
    afterRender: function () {
        this._renderFlag = false;
        // 替换掉ligerui的列表和树
        if(this.getMode()=='grid'){ // 下拉表格
            console.log(this.getGridColumn());
            console.log(this.getSelectData());
            jQuery('<div style="width:120px;height:20px;">我的测试</div>').replaceAll(jQuery('table', this.getDomInstance()));
        }else if(this.getMode()=='tree'){ // 树
            console.log(this.getGridColumn());
            console.log(this.getTreeData());
            jQuery('<div style="width:120px;height:20px;">我的测试</div>').replaceAll(jQuery('table', this.getDomInstance()));
        }
    },

    // ----------必须实现----------
    getData: function () {
        return {
            value: this.getValue(),
            comboBoxName: this.getComboBoxName(),
            isMultiSelect: this.getIsMultiSelect(),
            mode: this.getMode(),
            selectData: this.getSelectData(),
            gridColumn: this.getGridColumn(),
            treeData: this.getTreeData(),
            readonly: this.getReadonly()
        };
    },

    // ----------必须实现----------
    setData: function (data) {
        this.setValue(data.value);
        this.setSelectData(data.comboBoxName);
        this.setIsMultiSelect(data.isMultiSelect);
        this.setMode(data.mode);
        this.setSelectData(data.selectData);
        this.setGridColumn(data.gridColumn);
        this.setTreeData(data.treeData);
        this.setReadonly(data.readonly)
    },
    onBeforeSelect: function (callBack) {
        this._onBeforeSelect = callBack;
    },
    onSelected:function(callBack){
        this._onSelected = callBack;
    }
};
