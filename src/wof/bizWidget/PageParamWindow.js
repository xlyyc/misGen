wof.bizWidget.PageParamWindow = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','auto');

};
wof.bizWidget.PageParamWindow.prototype = {

    _initFlag: null,

    _inputParam : null,

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
    beforeRender: function () {
        var _this = this;
        if(this._initFlag==null){
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();

            });

            this._initFlag = true;
        }
        this.getDomInstance().children('table').remove();
    },

    //----------必须实现----------
    render: function () {
        var trs = [];
        trs.push(this._createTh('类型','标题','名称','值'));

        var paramMaps = this.getInputParam();
        for(var name in paramMaps){
            var param = paramMaps[name];
            if(param!=null){
                trs.push(this._createTr(param.dataType,param.name,param.caption,param.value));
            }
        }
        trs.push(this._createTr('char','','',''));
        var table = this._createTable(trs);
        this.getDomInstance().append(table);
    },

    //选择实现
    afterRender: function () {

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

    //获得设置值
    receiveCompParamValue: function(){
        var paramMaps = {};
        var compParamNameArr = [];
        var mapTypeArr = [];
        var paramValueArr = [];

        var labels = jQuery('table[id="PageParamWindowTable"] > tbody > tr > td > label');
        labels.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).text();
            compParamNameArr.push(name);
        });
        var selects = jQuery('table[id="PageParamWindowTable"] > tbody > tr > td > select');
        selects.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).val();
            mapTypeArr.push(val);
        });
        var inputs = jQuery('table[id="PageParamWindowTable"] > tbody > tr > td > input');
        inputs.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).val();
            paramValueArr.push(val);
        });
        for(var i=0;i<compParamNameArr.length;i++){
            var mapType = mapTypeArr[i];
            var paramValue = paramValueArr[i];
            var compParamName = compParamNameArr[i];
            var compParamValue = '';
            var pageParamName = '';
            var changeExpt = '';
            if(mapType=='value'){
                compParamValue = paramValue;
            }else if(mapType=='page'){
                pageParamName = paramValue;
            }else if(mapType=='expression'){
                changeExpt = paramValue;
            }
            paramMaps[compParamNameArr[i]] = {'mapType':mapTypeArr[i],'compParamName':compParamName,'compParamValue':compParamValue,'pageParamName':pageParamName,'changeExpt':changeExpt};
        }
        this.setParamMaps(paramMaps);
        return paramMaps;
    },

    //创建表
    _createTable: function(trs){
        var table = jQuery('<table id="PageParamWindowTable" style="border-collapse:collapse;text-align:left;width:100%;">');
        var tbody = jQuery('<tbody>');
        for(var i=0;i<trs.length;i++){
            tbody.append(trs[i]);
        }
        table.append(tbody);
        return table;
    },

    //创建行
    _createTr: function(dataType, name, caption, value){
        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
        var sel = this._createSelect({'name':'dataType','value':dataType,options:[{'name':'字符','value':'char'},{'name':'数字','value':'number'},{'name':'时间','value':'time'}]});
        var td1 = jQuery('<td style="width:25%;">');
        td1.append(sel);
        tr.append(td1);

        var td2 = jQuery('<td style="width:25%;">');
        var input2 = this._createInput('', caption);
        td2.append(input2);
        tr.append(td2);

        var td3 = jQuery('<td style="width:25%;">');
        var input3 = this._createInput('', name);
        td3.append(input3);
        tr.append(td3);

        var td4 = jQuery('<td style="width:25%;">');
        var input4 = this._createInput(name, value);
        td4.append(input4);
        tr.append(td4);

        return tr;
    },

    //创建行头
    _createTh: function(th1, th2, th3, th4){
        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');

        var td1 = jQuery('<th style="width:20%;">');
        var label1 = this._createLabel('', th1);
        td1.append(label1);
        tr.append(td1);

        var td2 = jQuery('<th style="width:25%;">');
        var label2 = this._createLabel('', th2);
        td2.append(label2);
        tr.append(td2);

        var td3 = jQuery('<th style="width:25%;">');
        var label3 = this._createLabel('', th3);
        td3.append(label3);
        tr.append(td3);

        var td4 = jQuery('<th style="width:25%;">');
        var label4 = this._createLabel('', th4);
        td4.append(label4);
        tr.append(td4);

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
    }

};