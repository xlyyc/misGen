/**
 * 下拉框控件统一API
 *
 *
 */
wis.widget.ComboBox = function () {
    this._version = '1.0';

};

wis.widget.ComboBox.prototype = {

    _name: null,
    _isMultiSelect: null,
    _mode: null,      //normal 普通 tree 树 grid 列表
    _selectData : null,
    _gridColumn : null, //如果mode是grid 需要设置该属性
    _treeData: null,  //如果mode是tree 需要设置该属性
    _readonly: null,
    _values: null,
    _split: null, //分隔符
    _selectExt: null,   //是否展开下拉框
    _onBeforeSelect:null,
    _onSelected:null,

    _input: null,
    _table: null,
    _select: null,
    _grid:null,
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

    getName: function () {
        return this._name;
    },

    setName: function (name) {
        this._name = name;
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
    _initRender: function () {
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
        this.getDomInstance().append(this._domInput);
    },

    // 渲染前处理方法
    _beforeRender: function () {
        this._renderFlag = true;

        var _this = this;

        //如果下拉框不为空 则清空下拉框
        if(this._select!=null){
            this._select.empty();
        }
        if(this.getMode()=='normal'){
            //初始化下拉框div
            if(this._domSelect==null){
                this._domSelect = jQuery('<div class="l-box-select" style="width: 300px; display: none;">'
                    +'<div class="l-box-select-inner" style="height: auto;"></div>'
                    +'<div class="l-btn-nw-drop"></div>'
                    +'</div>');
                this._domSelect.hover(null, function (e){
                    event.stopPropagation();
                    _this.setSelectExt(false);
                    _this.render();
                });
                this._select = jQuery('div[class=l-box-select-inner]:first',this._domSelect);
                this.getDomInstance().append(this._domSelect);
            }
            //文本框显示选中值
            this._input.val(this.getTexts());
            //初始化表格
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
                    var values = _this.getValues();
                    var value = jQuery(this).attr("value");
                    var flag = true;
                    if(_this._onBeforeSelect){
                        flag = _this._onBeforeSelect(values);
                    }
                    if(flag){  //如果返回值为true 则继续执行
                        var idx = jQuery.inArray(value,values);
                        if(idx>-1){
                            if(_this.getIsMultiSelect()==false){
                                values = [];
                            }else{
                                values.splice(idx,1);
                            }
                        }else{
                            if(_this.getIsMultiSelect()==false){
                                values = [];
                            }
                            values.push(value);
                        }
                        _this.setValues(_this._arrayUnique(values));
                        _this.setSelectExt(false);
                        _this.render();
                        if(_this._onSelected){
                            _this._onSelected(values);
                        }
                    }
                }
            });
            //设置选中项高亮
            jQuery("td", tbody).removeClass("l-selected");
            for(var i=0;i<this.getValues().length;i++){
                jQuery('td[value='+this.getValues()[i]+']', tbody).addClass("l-selected");
            }
            this._select.append(table);
            //显示或隐藏下拉框
            if(this.getSelectExt()==true){
                this._domSelect.show();
            }else{
                this._domSelect.hide();
            }
        }else if(this.getMode()=='tree'){
            //todo
        }else if(this.getMode()=='grid'){
            //todo

            if(this._grid!=null){
                this._grid.remove(true);
                this._grid = null;
            }
            if(this.getSelectExt()==true){
                var data = {"title":null,"checkbox":true,"columns":[
                    {"bindDataField":"JBXX.zgh","width":"120","colNo":0,"name":"","caption":"职工号","sortable":true,"align":"center","bold":"true","underline":"true","bgColor":"#efefef","font":"宋体","fontSize":"max","fontColor":"black","style":"","adjustContent":"true","format":{"param":"short","functionName":null},"display":false,"type":"integer","visbleType":"text","selectPattern":null,"required":false,"verifyFunctionName":null,"verifyErrorInfo":""},{"bindDataField":"JBXX.xm","width":"70","colNo":1,"name":"","caption":"姓名","sortable":true,"align":"center","bold":"true","underline":"true","bgColor":"#efefef","font":"宋体","fontSize":"max","fontColor":"black","style":"","adjustContent":"true","format":{"param":"short","functionName":null},"display":false,"type":"","visbleType":"text","selectPattern":null,"required":false,"verifyFunctionName":null,"verifyErrorInfo":""},{"bindDataField":"JBXX.xb","width":"70","colNo":2,"name":"","caption":"性别","sortable":true,"align":"center","bold":"true","underline":"true","bgColor":"#efefef","font":"宋体","fontSize":"max","fontColor":"black","style":"","adjustContent":"true","format":{"param":"short","functionName":null},"display":false,"type":"","visbleType":"text","selectPattern":null,"required":false,"verifyFunctionName":null,"verifyErrorInfo":""}],"data":[{"data":{"JBXX.zgh":{"value":"11","status":"NotModified"},"JBXX.xm":{"value":"张三","status":"NotModified"},"JBXX.xb":{"value":"2","status":"NotModified"}},"status":"NotModified","childData":{}},{"data":{"JBXX.zgh":{"value":"12","status":"NotModified"},"JBXX.xm":{"value":"李四","status":"NotModified"},"JBXX.xb":{"value":"2","status":"NotModified"}},"status":"NotModified","childData":{}},{"data":{"JBXX.zgh":{"value":"232957F7C7A3436880F8A0FE77E24E24","status":"NotModified"},"JBXX.xm":{"value":"测试徐","status":"NotModified"},"JBXX.xb":{"value":"1","status":"NotModified"}},"status":"NotModified","childData":{}},{"data":{"JBXX.zgh":{"value":"CDB8D1A4122E4F2EBFB91FBCC16AB190","status":"NotModified"},"JBXX.xm":{"value":"李四三","status":"NotModified"},"JBXX.xb":{"value":"2","status":"NotModified"}},"status":"NotModified","childData":{}}],"useClientPage":true,"width":210,"height":200,"isScroll":false,"enabledEdit":true,"dblClickToEdit":true,"pageSize":10,"page":1,"refData":{},"total":4};
                var grid = wis$.create('Grid');
                grid.setOptions(data);
                grid.onSelectRow(function(data){console.log(JSON.stringify(data));});
                grid.onCheckRow(function(data){console.log(JSON.stringify(data));});
                grid.setWidth(300);
                var point = this._getPoint(this.getDomInstance().get(0));
                grid.setLeft(point.left);
                grid.setTop(point.top+(this._input.height()+10));
                grid.appendTo(jQuery('body'));
                grid.render();
                this._grid = grid;
            }

        }
    },

    // 渲染方法
    render: function () {
        //this._comboBox.selectValue(this._value);

    },

    // 渲染后处理方法
    _afterRender: function () {
        this._renderFlag = false;

    },

    // ----------必须实现----------
    getData: function () {
        return {
            name: this.getName(),
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
        this.setName(name);
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

    onBeforeSelect: function (callback) {
        this._onBeforeSelect = callback;
    },

    onSelected:function(callback){
        this._onSelected = callback;
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
    getTexts: function(){
        var texts = [];
        if(this.getMode()=='normal' || this.getMode()=='grid'){
            var data = this.getSelectData();
            var len = data.length;
            for(var i=0;i<len;i++){
                var item = data[i];
                if(jQuery.inArray(item['value'],this.getValues())>-1){
                    texts.push(item['name']);
                }
            }
        }else if(this.getMode()=='tree'){
            //todo
        }
        return texts.join(this.getSplit());
    },

    //获得对象相对于body的位置
    _getPoint: function(obj) {
        var t = obj.offsetTop || 0;
        var l = obj.offsetLeft || 0;
        while (obj = obj.offsetParent) {
            t += obj.offsetTop || 0;
            l += obj.offsetLeft || 0;
        }
        return {top:t,left:l};
    }

};
