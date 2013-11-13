wof.bizWidget.ParamWindow = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','auto');

};
wof.bizWidget.ParamWindow.prototype = {

    _initFlag: null,

    _paramMap : null,

    getParamMap: function(){
        if(this._paramMap==null){
            this._paramMap = '';
        }
        return this._paramMap;
    },

    setParamMap: function(paramMap){
        this._paramMap = paramMap;
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
        trs.push(this._createTr('name1','value1'));


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
            paramMap: this.getParamMap()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setParamMap(data.paramMap);
    },

    //创建表
    _createTable: function(trs){
        var table = jQuery('<table style="border-collapse:collapse;text-align:left;width:96%;">');
        var tbody = jQuery('<tbody>');
        for(var i=0;i<trs.length;i++){
            tbody.append(trs[i]);
        }
        table.append(tbody);
        return table;
    },

    //创建行
    _createTr: function(name,value){
        var tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
        tr.append(jQuery('<td style="width:45%;"><span style="width:100px;" title="'+name+'">'+name+'</span></td>'));
        var td = jQuery('<td style="width:55%;"><input type="input" style="width:100px;" name="'+name+'" value="'+value+'"/></td>');
        tr.append(td);
        return tr;
    }

};