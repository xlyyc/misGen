wof.bizWidget.ParamWindow = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','auto');

};
wof.bizWidget.ParamWindow.prototype = {

    _initFlag: null,

    _paramMaps : null,

    _compParamNames : null,

    getCompParamNames: function(){
        if(this._compParamNames==null){
            this._compParamNames = [];
        }
        return this._compParamNames;
    },

    setCompParamNames: function(compParamNames){
        this._compParamNames = compParamNames;
    },

    getParamMaps: function(){
        if(this._paramMaps==null){
            this._paramMaps = {};
        }
        return this._paramMaps;
    },

    setParamMaps: function(paramMaps){
        this._paramMaps = paramMaps;
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
        var paramMaps = this.getParamMaps();
        var compParamNames = this.getCompParamNames();
        for(var i=0;i<compParamNames.length;i++){
            var compParamName = compParamNames[i];
            var param = paramMaps[compParamName];
            if(param!=null){
                trs.push(this._createTr(param.mapType,param.compParamName,param.compParamValue,param.pageParamName,param.changeExpt));
            }else{
                trs.push(this._createTr('value',compParamName,'','',''));
            }
        }
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
            paramMaps: this.getParamMaps(),
            compParamNames: this.getCompParamNames()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setParamMaps(data.paramMaps);
        this.setCompParamNames(data.compParamNames);
    },

    //获得设置值
    receiveCompParamValue: function(){
        var paramMaps = {};
        var compParamNameArr = [];
        var mapTypeArr = [];
        var paramValueArr = [];

        var labels = jQuery('table[id="paramWindowTable"] > tbody > tr > td > label');
        labels.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).text();
            compParamNameArr.push(name);
        });
        var selects = jQuery('table[id="paramWindowTable"] > tbody > tr > td > select');
        selects.each(function(){
            var name = jQuery(this).attr('name');
            var val = jQuery(this).val();
            mapTypeArr.push(val);
        });
        var inputs = jQuery('table[id="paramWindowTable"] > tbody > tr > td > input');
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
        var table = jQuery('<table id="paramWindowTable" style="border-collapse:collapse;text-align:left;width:100%;">');
        var tbody = jQuery('<tbody>');
        for(var i=0;i<trs.length;i++){
            tbody.append(trs[i]);
        }
        table.append(tbody);
        return table;
    },

    //创建行
    _createTr: function(mapType, compParamName, compParamValue, pageParamName, changeExpt){
        if(mapType==null){
            mapType = 'value';
        }
        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
        var sel = this._createSelect({'name':'mapType','value':mapType,options:[{'name':'固定值','value':'value'},{'name':'页面值','value':'page'},{'name':'表达式','value':'expression'}]});
        var td1 = jQuery('<td style="width:30%;">');
        td1.append(sel);
        tr.append(td1);

        var td2 = jQuery('<td style="width:30%;">');
        var label = this._createLabel(compParamName,'参数:'+compParamName);
        td2.append(label);
        tr.append(td2);

        var td3 = jQuery('<td style="width:40%;">');
        var paramValue = '';
        if(mapType=='value'){
            paramValue = compParamValue;
        }else if(mapType=='page'){
            paramValue = pageParamName;
        }else if(mapType=='expression'){
            paramValue = changeExpt;
        }
        var input = this._createInput('paramValue',paramValue);
        td3.append(input);
        tr.append(td3);

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
        var input = jQuery('<input type="text" name="'+name+'" value="'+value+'">');
        return input;
    },

    //创建label
    _createLabel: function(name,value){
        var label = jQuery('<label name="'+name+'">'+value+'</label>');
        return label;
    }

};