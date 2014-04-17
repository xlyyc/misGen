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
    _values: null,
    _split: null, //分隔符
    _selectExt: null,   //是否展开下拉框

    _input: null,
    _table: null,
    _select: null,
    _domSelect: null,
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
        return this._selectData || [];
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

    setSelectExt: function(selectExt) {
        this._selectExt = selectExt;
    },

    getSelectExt: function() {
        return this._selectExt || false;
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
        var _this = this;
        this._domInput = jQuery('<div class="l-text l-text-combobox" style="width: 70px;">'
            +'<input type="text" class="l-text-field" style="width: 50px;">'
            +'<div class="l-trigger">'
            +'<div class="l-trigger-icon"></div>'
            +'</div>'
            +'<div class="l-trigger l-trigger-cancel" style="display: none;">'
            +'<div class="l-trigger-icon"></div>'
            +'</div>'
            +'</div>');
        this._domSelect = jQuery('<div class="l-box-select" style="width: 100px; display: none;">'
            +'<div class="l-box-select-inner" style="height: auto;"></div>'
            +'<div class="l-btn-nw-drop"></div>'
            +'</div>');
        this._input = jQuery('input:first',this._domInput);
        this._input.mousedown(function(event){
            event.stopPropagation();
            if(_this.getReadonly()==false){
                if(_this.getSelectExt()==true){
                    _this.setSelectExt(false);
                }else{
                    _this.setSelectExt(true);
                }
            }else{
                _this.setSelectExt(false);
            }
            _this.render();
        });
        var divBtn = jQuery('div[class=l-trigger]:first',this._domInput);
        divBtn.hover(function (e){
            event.stopPropagation();
            this.className = 'l-trigger-hover';
        }, function (e){
            event.stopPropagation();
            this.className = 'l-trigger';
        });
        divBtn.mousedown(function(event){
            event.stopPropagation();
            if(_this.getReadonly()==false){
                if(_this.getSelectExt()==true){
                    _this.setSelectExt(false);
                }else{
                    _this.setSelectExt(true);
                }
                _this.render();
            }
        });
        this._domSelect.hover(null, function (e){
            event.stopPropagation();
            _this.setSelectExt(false);
            _this.render();
        });
        this._select = jQuery('div[class=l-box-select-inner]:first',this._domSelect);
        this.getDomInstance().append(this._domInput).append(this._domSelect);
    },

    // 渲染前处理方法
    beforeRender: function () {
        this._renderFlag = true;

        var _this = this;

        this._select.empty();
        if(this.getMode()=='normal'){
            this._input.val(this._getTexts());
            var table = jQuery('<table cellpadding="0" cellspacing="0" border="0" class="l-box-select-table l-table-nocheckbox"><tbody></tbody></table>');
            var data = this.getSelectData();
            var tbody = jQuery('tbody:first',table);
            for(var i=0;i<data.length;i++){
                var value = data[i]['value'];
                var name = data[i]['name'];
                var tr = jQuery('<tr align="left"><td></td></tr>');
                var td = jQuery('td:first',tr);
                td.attr('value',value).html(name);
                tbody.append(tr);
            }
            jQuery("td", tbody).click(function(){
                if(_this.getReadonly()==false){
                    var value = jQuery(this).attr("value");
                    var values = _this.getValues();
                    var idx = jQuery.inArray(value,values);
                    if(idx>-1){
                        values.splice(idx,1);
                    }else{
                        values.push(value);
                    }
                    _this.setValues(_this._arrayUnique(values));
                    _this.setSelectExt(false);
                    _this.render();
                }
            });
            jQuery("td", tbody).removeClass("l-selected");
            for(var i=0;i<this.getValues().length;i++){
                jQuery('td[value='+this.getValues()[i]+']', tbody).addClass("l-selected");
            }
            this._select.append(table);
        }else if(this.getMode()=='tree'){
            //todo
        }else if(this.getMode()=='grid'){
            //todo
        }
        if(this.getSelectExt()==true){
            this._domSelect.show();
        }else{
            this._domSelect.hide();
        }
    },

    // 渲染方法
    render: function () {
        //this._comboBox.selectValue(this._value);

    },

    // 渲染后处理方法
    afterRender: function () {
        this._renderFlag = false;

    },

    // ----------必须实现----------
    getData: function () {
        return {
            selectExt: this.getSelectExt(),
            values: this.getValues(),
            split: this.getSplit(),
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
        this.setSelectExt(data.selectExt);
        this.setValues(data.values);
        this.setSplit(data.split);
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
    },

    //数组去重
    _arrayUnique: function(arr){
        var res = [];
        var json = {};
        for(var i = 0; arr!=null&&i < arr.length; i++){
            if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    },

    /**
     * 获得选中文本
     */
    _getTexts: function(){
        var texts = [];
        var data = this.getSelectData();
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
