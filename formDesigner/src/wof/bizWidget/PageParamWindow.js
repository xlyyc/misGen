wof.bizWidget.PageParamWindow = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','auto');

};
wof.bizWidget.PageParamWindow.prototype = {

    _inputParam : null,

    _contextParams : null,

    getContextParams: function(){
        if(this._contextParams==null){
            this._contextParams = [];
        }
        return this._contextParams;
    },

    setContextParams: function(contextParams){
        this._contextParams = contextParams;
    },

    getInputParam: function(){
        if(this._inputParam==null){
            this._inputParam = {};
        }
        return this._inputParam;
    },

    setInputParam: function(inputParam){
        this._inputParam = inputParam;
    },

    //选择实现
    _beforeRender: function () {

        this.getDomInstance().children('table').remove();
    },

    //----------必须实现----------
    render: function () {
        var trs = [];
        trs.push(this._createTh('类型','标题','名称','值','',''));

        var contextParams = this.getContextParams();
        for(var i=0;i<contextParams.length;i++){
            var param = contextParams[i];
            var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
            var td1 = jQuery('<th style="width:20%;">');
            td1.append(this._createLabel('', this.dataTypeToString(param.dataType)));
            tr.append(td1);

            var td2 = jQuery('<th style="width:20%;">');
            td2.append(this._createLabel('', param.caption));
            tr.append(td2);

            var td3 = jQuery('<th style="width:20%;">');
            td3.append(this._createLabel('', param.name));
            tr.append(td3);

            var td4 = jQuery('<th style="width:20%;">');
            tr.append(td4);

            var td5 = jQuery('<th style="width:10%;">');
            tr.append(td5);

            var td6 = jQuery('<th style="width:10%;">');
            tr.append(td6);

            trs.push(tr);
        }

        var paramMaps = this.getInputParam();
        for(var name in paramMaps){
            var param = paramMaps[name];
            if(param!=null){
                trs.push(this._createTr(param.dataType,param.name,param.caption,param.value));
            }
        }
        if(trs.length==(contextParams.length+1)){
            trs.push(this._createTr('char','','',''));
        }
        var table = this._createTable(trs);
        this.getDomInstance().append(table);
    },

    //选择实现
    _afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            inputParam: this.getInputParam()

        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setInputParam(data.inputParam);

    },

    dataTypeToString: function(dataType){
        var str = '';
        if(dataType=='char'){
            str = '字符';
        }else if(dataType=='number'){
            str = '数字';
        }else if(dataType=='time'){
            str = '时间';
        }
        return str;
    },

    //获得设置值
    receiveCompParamValue: function(){
        var inputParam = {};
        var dataTypeArr = [];
        var captionArr = [];
        var nameArr = [];
        var valueArr = [];
        var selects = jQuery('table[id="pageParamWindowTable"] > tbody > tr > td > select');
        selects.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).val();
            dataTypeArr.push(val);
        });
        var inputs = jQuery('table[id="pageParamWindowTable"] > tbody > tr > td > input[name="caption"]');
        inputs.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).val();
            captionArr.push(val);
        });
        var inputs = jQuery('table[id="pageParamWindowTable"] > tbody > tr > td > input[name="name"]');
        inputs.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).val();
            nameArr.push(val);
        });
        var inputs = jQuery('table[id="pageParamWindowTable"] > tbody > tr > td > input[name="value"]');
        inputs.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).val();
            valueArr.push(val);
        });
        for(var i=0;i<dataTypeArr.length;i++){
            var dataType = dataTypeArr[i];
            var name = nameArr[i];
            var caption = captionArr[i];
            var value = valueArr[i];
            inputParam[nameArr[i]] = {"dataType":dataType, "name":name, "caption":caption, "value":value};
        }
        this.setInputParam(inputParam);
        return inputParam;
    },

    //创建表
    _createTable: function(trs){
        var table = jQuery('<table id="pageParamWindowTable" style="border-collapse:collapse;text-align:left;width:100%;">');
        var tbody = jQuery('<tbody>');
        for(var i=0;i<trs.length;i++){
            tbody.append(trs[i]);
        }
        table.append(tbody);
        return table;
    },

    //创建行
    _createTr: function(dataType, name, caption, value){
        var _this = this;

        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
        var sel = this._createSelect({'name':'dataType','value':dataType,options:[{'name':'字符','value':'char'},{'name':'数字','value':'number'},{'name':'时间','value':'time'}]});
        var td1 = jQuery('<td style="width:20%;">');
        td1.append(sel);
        tr.append(td1);

        var td2 = jQuery('<td style="width:20%;">');
        var input2 = this._createInput('caption', caption);
        td2.append(input2);
        tr.append(td2);

        var td3 = jQuery('<td style="width:20%;">');
        var input3 = this._createInput('name', name);
        td3.append(input3);
        tr.append(td3);

        var td4 = jQuery('<td style="width:20%;">');
        var input4 = this._createInput('value', value);
        td4.append(input4);
        tr.append(td4);

        var td5 = jQuery('<td style="width:10%;">');
        var deleteBtn = this._createImg('src/img/deleteObject.png');
        deleteBtn.mousedown(function(event){
            event.stopPropagation();
            jQuery(event.target).parent().parent().remove();
        });
        td5.append(deleteBtn);
        tr.append(td5);

        var td6 = jQuery('<td style="width:10%;">');
        var insertBtn = this._createImg('src/img/insertObject.png');
        insertBtn.mousedown(function(event){
            event.stopPropagation();
            var tr = _this._createTr('char','','','');
            var preTr = jQuery(event.target).parent().parent();
            preTr.after(tr);
        });
        td6.append(insertBtn);
        tr.append(td6);

        return tr;
    },

    //创建行头
    _createTh: function(th1, th2, th3, th4, th5, th6){
        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');

        var td1 = jQuery('<th style="width:20%;">');
        var label1 = this._createLabel('', th1);
        td1.append(label1);
        tr.append(td1);

        var td2 = jQuery('<th style="width:20%;">');
        var label2 = this._createLabel('', th2);
        td2.append(label2);
        tr.append(td2);

        var td3 = jQuery('<th style="width:20%;">');
        var label3 = this._createLabel('', th3);
        td3.append(label3);
        tr.append(td3);

        var td4 = jQuery('<th style="width:20%;">');
        var label4 = this._createLabel('', th4);
        td4.append(label4);
        tr.append(td4);

        var td5 = jQuery('<th style="width:10%;">');
        var label5 = this._createLabel('', th5);
        td5.append(label5);
        tr.append(td5);

        var td6 = jQuery('<th style="width:10%;">');
        var label6 = this._createLabel('', th6);
        td6.append(label6);
        tr.append(td6);

        return tr;
    },

    //创建下拉框
    _createSelect: function(selectData){
        var sel =jQuery('<select name="'+selectData.name+'">');
        var options = selectData.options;
        for(var i=0;i<options.length;i++){
            var opt = options[i];
            sel.append(jQuery('<option value="'+opt.value+'" '+(opt.value==selectData.value?'selected':'')+'>'+opt.name+'</option>'));
        }
        return sel;
    },

    //创建文本框
    _createInput: function(name,value){
        var input = jQuery('<input type="text" name="'+name+'" style="width:100px;">');
        if(value!=null){
            input.val(value);
        }
        return input;
    },

    //创建label
    _createLabel: function(name,value){
        var label = jQuery('<label name="'+name+'">'+value+'</label>');
        return label;
    },

    _createImg: function(ico){
        var img = jQuery('<img src="'+ico+'"/>');
        return img;
    }

};