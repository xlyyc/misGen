/**
 * @bizWidgetClass GridComponent class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.GridComponent = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','hidden');

    this._borderStyle = '1px solid #bcbcbc';
    this._pinColumns = [];
    this._unPinColumns = [];
    this._realWidth = 0;
    this._realHeight = 0;
    this._themeColumnsWidth = 0;
    this._numberColumnWidth = 45;

};
wof.bizWidget.GridComponent.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */


    _borderStyle: null,

    _unPinColumns: null,

    _pinColumns: null,

    _realWidth: null, //grid实际宽度

    _realHeight: null, //grid实际高度

    _themeColumnsWidth: null,  //主题列的总宽度

    _headerDiv: null,

    _themeColumnsDiv: null,

    _themeColumnsHeaderDiv: null,

    _gridDiv: null,

    _createPageToolDiv: null,

    _numberColumnWidth: null, //序号列的宽度

    _activeColumnIndex: null,    //当前激活的列序号

    _callStr: null,    //调用字符串，格式为 构件类型唯一识别串:构件版本，例如【GridComponent:1.0.0】

    _initActionName: null,

    _name: null,

    _numberDisplay: null,

    _gridComponentState: null,    //列表构件状态

    _bindEntityID: null,    //实体ID,Grid部件中可用到此实体及与该实体存在参照及对等关系的实体中的属性

    _index: null, //渲染位置

    _headerHeight:null,

    _rowHeight: null, //行高

    _useMutiplePage: null, //是否使用分页

    _rowsCount: null,    //每页行数


    _paramMaps:null,

    /**
     * get/set 属性方法定义
     */

    getParamMaps: function(){
        if(this._paramMaps==null){
            this._paramMaps = {};
        }
        return this._paramMaps;
    },

    setParamMaps: function(paramMaps){
        this._paramMaps = paramMaps;
    },

    getActiveColumnIndex: function(){
        return this._activeColumnIndex;
    },

    setActiveColumnIndex: function(activeColumnIndex){
        this._activeColumnIndex = activeColumnIndex;
    },

    getRowsCount: function(){
        if(this._rowsCount==null){
            this._rowsCount = 30;
        }
        return this._rowsCount;
    },

    setRowsCount: function(rowsCount){
        this._rowsCount = rowsCount;
    },

    getUseMutiplePage: function(){
        if(this._useMutiplePage==null){
            this._useMutiplePage = false;
        }
        return this._useMutiplePage;
    },

    setUseMutiplePage: function(useMutiplePage){
        this._useMutiplePage = useMutiplePage;
    },

    getRowHeight: function(){
        if(this._rowHeight==null){
            this._rowHeight = 30;
        }
        return this._rowHeight;
    },

    setRowHeight: function(rowHeight){
        this._rowHeight = rowHeight;
    },

    getCallStr: function(){
        if(this._callStr==null){
            this._callStr = 'gridComponent:0_0_1';
        }
        return this._callStr;
    },

    setCallStr: function(callStr){
        this._callStr = callStr;
    },

    getInitActionName: function(){
        return this._initActionName;
    },

    setInitActionName: function(initActionName){
        this._initActionName = initActionName;
    },

    getName: function(){
        if(this._name==null){
            this._name = '未命名列表';
        }
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },

    getNumberDisplay: function(){
        if(this._numberDisplay==null){
            this._numberDisplay = true;
        }
        return this._numberDisplay;
    },

    setNumberDisplay: function(numberDisplay){
        this._numberDisplay = numberDisplay;
    },

    getGridComponentState: function(){
        return this._gridComponentState;
    },

    setGridComponentState: function(gridComponentState){
        this._gridComponentState = gridComponentState;
    },

    getBindEntityID: function(){
        if(this._bindEntityID==null){
            this._bindEntityID = '';
        }
        return this._bindEntityID;
    },

    setBindEntityID: function(bindEntityID){
        this._bindEntityID = bindEntityID;
    },

    getIndex: function(){
        return this._index;
    },

    setIndex: function(index){
        this._index = index;
    },


    getHeaderHeight: function(){
        if(this._headerHeight==null){
            this._headerHeight = 25;
        }
        return this._headerHeight;
    },

    setHeaderHeight: function(headerHeight){
        this._headerHeight = headerHeight;
    },



    /**
     * Render 方法定义
     */

    _init: function(data){

    },

    _initRender: function(){

    },

    //选择实现
    _beforeRender: function () {

        this.getDomInstance().children('div:not([oid])').remove();

    },

    //----------必须实现----------
    render: function () {
        this._calcColumns();
        var table = this._createGrid();

        var _this = this;
        this._gridDiv = this._createGridDiv();
        this._gridDiv.scroll(function(event){
            event.stopPropagation();
            var stop = _this._gridDiv.scrollTop();
            _this._themeColumnsDiv.scrollTop(stop);
            var sleft = _this._gridDiv.scrollLeft();
            _this._headerDiv.scrollLeft(sleft);
            _this.sendMessage('wof.bizWidget.GridComponent_scroll');
            _this.sendMessage('wof.bizWidget.GridComponent_active');
        });
        this._gridDiv.append(table);
        this.getDomInstance().append(this._gridDiv);

        var clientWidth = this._gridDiv.get(0).clientWidth;
        var clientHeight = this._gridDiv.get(0).clientHeight;

        this._headerDiv = this._createHeader(clientWidth);
        this._headerDiv.append(table.clone(true));
        this.getDomInstance().append(this._headerDiv);

        this._themeColumnsDiv = this._createThemeColumns(clientHeight);
        this._themeColumnsDiv.append(table.clone(true));
        this.getDomInstance().append(this._themeColumnsDiv);

        this._themeColumnsHeaderDiv = this._createThemeColumnsHeader();
        this._themeColumnsHeaderDiv.append(table.clone(true));
        this.getDomInstance().append(this._themeColumnsHeaderDiv);

        if(this.getUseMutiplePage()==true){
            this._createPageToolDiv = this._createPageTool();
            this.getDomInstance().append(this._createPageToolDiv);
        }

    },
    getBindEntity : function (){
        var bindEntityId = this.getBindEntityID();
        if(bindEntityId){
            var bizEntity = JSON.parse(getBizEntities());
            //var bizEntity = {"childEntity":[{"ID":"JTCY","alias":"jtcychild","calculateFiled":[],"defaultCondition":"","name":"家庭成员","properties":[{"columnName":"gx","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197743245148160","isSystemAttribute":false,"label":"关系","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gx","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197782633857024","isSystemAttribute":false,"label":"姓名","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"nl","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197805966770176","isSystemAttribute":false,"label":"年龄","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"nl","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"integer","uniqueName":""},{"columnName":"gzdw","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197838208385024","isSystemAttribute":false,"label":"工作单位","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gzdw","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"lxfs","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197860161372160","isSystemAttribute":false,"label":"联系方式","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lxfs","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"id","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197917573005312","isSystemAttribute":false,"label":"id","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"id","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"zgid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360601494145613824","isSystemAttribute":false,"label":"职工ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""}]},{"ID":"HJXX","alias":"hjxxchild","calculateFiled":[],"defaultCondition":"","name":"获奖信息","properties":[{"columnName":"jxjlid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041042047090688","isSystemAttribute":false,"label":"奖项纪录ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"jxjlid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"zgid","content":"","defaultValue":"","description":"jxmc","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"1","guid":"350041084380200960","isSystemAttribute":false,"label":"职工ID","length":"1","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"JZGJBXXB","refEntityDisplay":"xm","refEntityProperty":"zgid","refName":"zzidref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"jxbm","content":"","defaultValue":"","description":"jxmc","disabled":true,"display":"","displayWidth":"","enumValue":"1","errorMessage":"1","guid":"350041115774566400","isSystemAttribute":false,"label":"类别编码","length":"1","max":0,"maxLength":0,"min":0,"minLength":0,"name":"jxbm","notNull":false,"prompt":"","refEntity":"HJLB","refEntityDisplay":"jxmc","refEntityProperty":"jxbm","refName":"jxbmref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"hjmc","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041168790568960","isSystemAttribute":false,"label":"获奖名称","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjmc","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"hjrqks","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041224167964672","isSystemAttribute":false,"label":"获奖日期开始","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjrqks","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"hjrqjs","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041263426650112","isSystemAttribute":false,"label":"获奖日期结束","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjrqjs","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"dqzt","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041300714012672","isSystemAttribute":false,"label":"当前状态","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"dqzt","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"integer","uniqueName":""},{"columnName":"hjms","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"359756481085980672","isSystemAttribute":false,"label":"获奖描述","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjms","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""}]}],"linkEntity":[{"ID":"JZGJBXXB","alias":"444","defaultCondition":"","isPhysicalLink":false,"linkPath":"[JZGJBXXB.zgid] = [444.zgid]","name":"教职工基本信息表","properties":[{"columnName":"zgid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037837531725824","isSystemAttribute":false,"label":"职工ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"gh","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037995602460672","isSystemAttribute":false,"label":"工号","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gh","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038199814733824","isSystemAttribute":false,"label":"姓名","length":"5","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xb","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038224783425536","isSystemAttribute":false,"label":"性别","length":"4","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xb","notNull":false,"prompt":"","refEntity":"XBCZB","refEntityDisplay":"xbmc","refEntityProperty":"xbbh","refName":"XBref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"xmpy","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038292810842112","isSystemAttribute":false,"label":"姓名拼音","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xmpy","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"csrq","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038337308213248","isSystemAttribute":false,"label":"出生日期","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"csrq","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"zzmmbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038401208434688","isSystemAttribute":false,"label":"政治面貌编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzmmbm","notNull":false,"prompt":"","refEntity":"RSZZMMCZB","refEntityDisplay":"zzmmmc","refEntityProperty":"zzmmbm","refName":"zzmmref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"lbbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038453570125824","isSystemAttribute":false,"label":"类别编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbm","notNull":false,"prompt":"","refEntity":"ZGLBCZB","refEntityDisplay":"lbmc","refEntityProperty":"lbbm","refName":"zglbref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zzid","content":"","defaultValue":"","description":"name","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038503507509248","isSystemAttribute":false,"label":"组织ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzid","notNull":false,"prompt":"","refEntity":"organization","refEntityDisplay":"name","refEntityProperty":"id","refName":"zzidref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zgbz","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038638446657536","isSystemAttribute":false,"label":"职工备注","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgbz","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"zzjg","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"352584552268840960","isSystemAttribute":false,"label":"所在院系","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzjg","notNull":false,"prompt":"","refEntity":"ZZJGB","refEntityDisplay":"zzmc","refEntityProperty":"zzbm","refName":"zzjgref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""}],"targetEntityID":"JZGJBXXB"},{"ID":"organization","alias":"organization","defaultCondition":"","isPhysicalLink":true,"linkPath":"[JZGJBXXB.zzid] = [organization.code]","name":"组织表","properties":[{"columnName":"id","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927332474208256","isSystemAttribute":false,"label":"id","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"id","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"org_type","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927396701585408","isSystemAttribute":false,"label":"org_type","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"org_type","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"integer","uniqueName":""},{"columnName":"code","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927427227729920","isSystemAttribute":false,"label":"code","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"code","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"name","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927444525039616","isSystemAttribute":false,"label":"name","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"name","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"is_use","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927485419503616","isSystemAttribute":false,"label":"is_use","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"is_use","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"boolean","uniqueName":""},{"columnName":"parent_org_id","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927525680627712","isSystemAttribute":false,"label":"parent_org_id","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"parent_org_id","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"long","uniqueName":""}],"targetEntityID":"JZGJBXXB"}],"mainEntity":{"alias":"JZGJBXXB","calculateFiled":[],"defaultCondition":"","mainEntityName":"教职工基本信息表","metaDataID":"JZGJBXXB","properties":[{"columnName":"zgid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037837531725824","isSystemAttribute":false,"label":"职工ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"gh","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037995602460672","isSystemAttribute":false,"label":"工号","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gh","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038199814733824","isSystemAttribute":false,"label":"姓名","length":"5","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xb","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038224783425536","isSystemAttribute":false,"label":"性别","length":"4","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xb","notNull":false,"prompt":"","refEntity":"XBCZB","refEntityDisplay":"xbmc","refEntityProperty":"xbbh","refName":"XBref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"xmpy","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038292810842112","isSystemAttribute":false,"label":"姓名拼音","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xmpy","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"csrq","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038337308213248","isSystemAttribute":false,"label":"出生日期","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"csrq","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"zzmmbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038401208434688","isSystemAttribute":false,"label":"政治面貌编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzmmbm","notNull":false,"prompt":"","refEntity":"RSZZMMCZB","refEntityDisplay":"zzmmmc","refEntityProperty":"zzmmbm","refName":"zzmmref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"lbbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038453570125824","isSystemAttribute":false,"label":"类别编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbm","notNull":false,"prompt":"","refEntity":"ZGLBCZB","refEntityDisplay":"lbmc","refEntityProperty":"lbbm","refName":"zglbref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zzid","content":"","defaultValue":"","description":"name","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038503507509248","isSystemAttribute":false,"label":"组织ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzid","notNull":false,"prompt":"","refEntity":"organization","refEntityDisplay":"name","refEntityProperty":"id","refName":"zzidref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zgbz","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038638446657536","isSystemAttribute":false,"label":"职工备注","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgbz","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"zzjg","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"352584552268840960","isSystemAttribute":false,"label":"所在院系","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzjg","notNull":false,"prompt":"","refEntity":"ZZJGB","refEntityDisplay":"zzmc","refEntityProperty":"zzbm","refName":"zzjgref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""}]}};

            var entity = bizEntity.mainEntity;
            return entity;
        }
        return null;
    },
    //选择实现
    _afterRender: function () {
        this.sendMessage('wof.bizWidget.GridComponent_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            paramMaps: this.getParamMaps(),
            callStr:this.getCallStr(),
            initActionName:this.getInitActionName(),
            name:this.getName(),
            numberDisplay:this.getNumberDisplay(),
            gridComponentState: this.getGridComponentState(),
            bindEntityID:this.getBindEntityID(),
            index:this.getIndex(),
            headerHeight:this.getHeaderHeight(),
            rowHeight:this.getRowHeight(),
            activeColumnIndex:this.getActiveColumnIndex()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setParamMaps(data.paramMaps);
        this.setCallStr(data.callStr);
        this.setInitActionName(data.initActionName);
        this.setName(data.name);
        this.setNumberDisplay(data.numberDisplay);
        this.setGridComponentState(data.gridComponentState);
        this.setBindEntityID(data.bindEntityID);
        this.setIndex(data.index);
        this.setHeaderHeight(data.headerHeight);
        this.setRowHeight(data.rowHeight);
        this.setActiveColumnIndex(data.activeColumnIndex);
    },

    /**
     * 锁定指定列
     */
    pinColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        column.setIsPin(true);
    },

    /**
     * 解锁指定列
     */
    unPinColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        column.setIsPin(false);
    },

    /**
     * 删除指定列
     */
    deleteColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        column.remove(true);
    },

    /**
     * 在指定列后插入新列
     */
    insertColumnByIndex: function(index){
        var column = this.findColumnByIndex(index);
        var newColumn = new wof.bizWidget.GridComponentColumn();
        newColumn.setCaption('未命名');
        newColumn.setIsPin(column.getIsPin());
        newColumn.afterTo(column);
    },

    /**
     * 是否能够将指定列移动上一个位置
     */
    canMoveToPrevColumnByIndex: function(index){
        var f = false;
        if(index>1){
            f = true;
        }
        return f;
    },

    /**
     * 将指定列移动上一个位置
     */
    moveToPrevColumnByIndex: function(index){
        if(index>1){
            var column = this.findColumnByIndex(index);
            var prevColumn = this.findColumnByIndex(index-1);
            column.remove();
            column.beforeTo(prevColumn);
        }
    },

    /**
     * 是否能够将指定列移动下一个位置
     */
    canMoveToNextColumnByIndex: function(index){
        var f = false;
        var nextColumn = this.findColumnByIndex(index+1);
        if(nextColumn!=null){
            f = true;
        }
        return f;
    },

    /**
     * 将指定列移动下一个位置
     */
    moveToNextColumnByIndex: function(index){
        var nextColumn = this.findColumnByIndex(index+1);
        if(nextColumn!=null){
            var column = this.findColumnByIndex(index);
            column.remove();
            column.afterTo(nextColumn);
        }
    },

    /**
     * 修改gridComponent
     * gridComponentData gridComponentData数据
     */
    updateGridComponent: function(gridComponentData){
        if(!jQuery.isEmptyObject(gridComponentData)){
            if(gridComponentData.componentName!=null){
                this.setComponentName(gridComponentData.componentName);
            }
            if(gridComponentData.name!=null){
                this.setName(gridComponentData.name);
            }
            if(gridComponentData.bindEntityID!=null){
                this.setBindEntityID(gridComponentData.bindEntityID);
            }
            if(gridComponentData.headerHeight!=null){
                this.setHeaderHeight(Number(gridComponentData.headerHeight));
            }
            if(gridComponentData.rowHeight!=null){
                this.setRowHeight(Number(gridComponentData.rowHeight));
            }
            if(gridComponentData.numberDisplay!=null){
                this.setNumberDisplay((gridComponentData.numberDisplay=='true'||gridComponentData.numberDisplay==true)?true:false);
            }
            if(gridComponentData.useMutiplePage!=null){
                this.setUseMutiplePage((gridComponentData.useMutiplePage=='true'||gridComponentData.useMutiplePage==true)?true:false);
            }
            if(gridComponentData.rowsCount!=null){
                this.setRowsCount(Number(gridComponentData.rowsCount));
            }
            if(gridComponentData.onSendMessage!=null){
                this.setOnSendMessage(gridComponentData.onSendMessage);
            }
            if(gridComponentData.onReceiveMessage!=null){
                this.setOnReceiveMessage(gridComponentData.onReceiveMessage);
            }
            if(gridComponentData.paramMaps!=null){
                this.setParamMaps(gridComponentData.paramMaps);
            }
        }
    },

    /**
     * 修改指定序号的gridComponentColumn
     * gridComponentColumnData gridComponentColumn数据
     */
    updateGridComponentColumn: function(gridComponentColumnData){
        if(!jQuery.isEmptyObject(gridComponentColumnData)){
            var gridComponentColumn = this.findColumnByIndex(gridComponentColumnData.index);
            if(gridComponentColumn!=null){
                if(gridComponentColumnData.name!=null){
                    gridComponentColumn.setName(gridComponentColumnData.name);
                }
                if(gridComponentColumnData.useMultiSelect!=null){
                    gridComponentColumn.setUseMultiSelect((gridComponentColumnData.useMultiSelect=='true'||gridComponentColumnData.useMultiSelect==true)?true:false);
                }
                if(gridComponentColumnData.columnType!=null){
                    gridComponentColumn.setColumnType(gridComponentColumnData.columnType);
                }
                if(gridComponentColumnData.caption!=null){
                    gridComponentColumn.setCaption(gridComponentColumnData.caption);
                }
                if(gridComponentColumnData.columnWidth!=null){
                    gridComponentColumn.setColumnWidth(Number(gridComponentColumnData.columnWidth));
                }
                if(gridComponentColumnData.bindDataField!=null){
                    gridComponentColumn.setBindDataField(gridComponentColumnData.bindDataField);
                }
                if(gridComponentColumnData.gridId!=null){
                    gridComponentColumn.setGridId(gridComponentColumnData.gridId);
                }
                if(gridComponentColumnData.display!=null){
                    gridComponentColumn.setDisplay((gridComponentColumnData.display=='true'||gridComponentColumnData.display==true)?true:false);
                }
                if(gridComponentColumnData.isPin!=null){
                    gridComponentColumn.setIsPin((gridComponentColumnData.isPin=='true'||gridComponentColumnData.isPin==true)?true:false);
                }
                if(gridComponentColumnData.dateTimeFormat!=null){
                    gridComponentColumn.setDateTimeFormat(gridComponentColumnData.dateTimeFormat);
                }
                if(gridComponentColumnData.editor!=null){
                    gridComponentColumn.setEditor((gridComponentColumnData.editor=='true'||gridComponentColumnData.editor==true)?true:false);
                }
                if(gridComponentColumnData.picUrl!=null){
                    gridComponentColumn.setPicUrl(gridComponentColumnData.picUrl);
                }
                if(gridComponentColumnData.selectPattern!=null){
                    gridComponentColumn.setSelectPattern(gridComponentColumnData.selectPattern);
                }
                if(gridComponentColumnData.visbleType!=null){
                    gridComponentColumn.setVisbleType(gridComponentColumnData.visbleType);
                }
                if(gridComponentColumnData.readOnly!=null){
                    gridComponentColumn.setReadOnly((gridComponentColumnData.readOnly=='true'||gridComponentColumnData.readOnly==true)?true:false);
                }
                if(gridComponentColumnData.required!=null){
                    gridComponentColumn.setRequired((gridComponentColumnData.required=='true'||gridComponentColumnData.required==true)?true:false);
                }
                if(gridComponentColumnData.orderByType!=null){
                    gridComponentColumn.setOrderByType(gridComponentColumnData.orderByType);
                }
                if(gridComponentColumnData.canSearch!=null){
                    gridComponentColumn.setCanSearch((gridComponentColumnData.canSearch=='true'||gridComponentColumnData.canSearch==true)?true:false);
                }
                if(gridComponentColumnData.length!=null){
                    gridComponentColumn.setLength(gridComponentColumnData.length==''?'':Number(gridComponentColumnData.length));
                }
                if(gridComponentColumnData.min!=null){
                    gridComponentColumn.setMin(gridComponentColumnData.min==''?'':Number(gridComponentColumnData.min));
                }
                if(gridComponentColumnData.max!=null){
                    gridComponentColumn.setMax(gridComponentColumnData.max==''?'':Number(gridComponentColumnData.max));
                }
                if(gridComponentColumnData.intLength!=null){
                    gridComponentColumn.setIntLength(gridComponentColumnData.intLength==''?'':Number(gridComponentColumnData.intLength));
                }
                if(gridComponentColumnData.scaleLength!=null){
                    gridComponentColumn.setScaleLength(gridComponentColumnData.scaleLength==''?'':Number(gridComponentColumnData.scaleLength));
                }
                if(gridComponentColumnData.regExp!=null){
                    gridComponentColumn.setRegExp(gridComponentColumnData.regExp);
                }
                if(gridComponentColumnData.refSearchCondition!=null){
                    gridComponentColumn.setRefSearchCondition(gridComponentColumnData.refSearchCondition);
                }
                if(gridComponentColumnData.checkErrorInfo!=null){
                    gridComponentColumn.setCheckErrorInfo(gridComponentColumnData.checkErrorInfo);
                }
                if(gridComponentColumnData.linkForm!=null){
                    gridComponentColumn.setLinkForm(gridComponentColumnData.linkForm);
                }
            }
        }

    },

    //获得所有列
    _getAllColumns: function(){
        var cols = [];
        var childNodes = this.childNodes();
        for(var i=0;i<childNodes.length;i++){
            if(childNodes[i].getClassName()=='wof.bizWidget.GridComponentColumn'){
                cols.push(childNodes[i]);
            }
        }
        return cols;
    },

    //根据index序号获得指定列
    findColumnByIndex: function(index){
        var column = null;
        var childNodes = this.childNodes();
        for(var i=1;i<=childNodes.length;i++){
            if(childNodes[i-1].getClassName()=='wof.bizWidget.GridComponentColumn'){
                if(i==index){
                    column = childNodes[i-1];
                    break;
                }
            }
        }
        return column;
    },

    //计算锁定列和非锁定列以及表格实际宽度并设置column序号(index从1开始)
    _calcColumns: function(){
        var columns = this._getAllColumns();
        this._pinColumns = [];
        this._unPinColumns = [];
        this._realWidth = 0;
        this._realHeight = 0;
        if(this.getNumberDisplay()==true){
            this._themeColumnsWidth = this._numberColumnWidth;
        }else{
            this._themeColumnsWidth = 0;
        }
        for(var i=0;i<columns.length;i++){
            var column = columns[i];
            column.setIndex(i+1);
            if(column.getDisplay()==true){
                if(column.getIsPin()==true){
                    this._pinColumns.push(column);
                    this._themeColumnsWidth += column.getColumnWidth();
                }else{
                    this._unPinColumns.push(column);
                }
                this._realWidth += column.getColumnWidth();
            }
        }
    },

    //创建表头
    _createHeader: function(clientWidth){
        var headerDiv = jQuery('<div style="position:absolute;overflow:hidden;top:'+(18*this.getScale())+'px;left:0px;width:'+clientWidth+'px;height:'+((this.getHeaderHeight()*this.getScale())+1)+'px;"></div>');
        return headerDiv;
    },

    //创建主题列(即锁定列)
    _createThemeColumns:function(clientHeight){
        var themeColumnsDiv = jQuery('<div style="position:absolute;overflow:hidden;top:'+(18*this.getScale())+'px;left:0px;width:'+((this._themeColumnsWidth*this.getScale())+1)+'px;height:'+clientHeight+'px;"></div>');
        return themeColumnsDiv;
    },

    //创建主题列表头
    _createThemeColumnsHeader:function(){
        var themeColumnsHeaderDiv = jQuery('<div style="position:absolute;overflow:hidden;top:'+(18*this.getScale())+'px;left:0px;width:'+((this._themeColumnsWidth*this.getScale())+1)+'px;height:'+((this.getHeaderHeight()*this.getScale())+1)+'px;"></div>');
        return themeColumnsHeaderDiv;
    },

    //创建grid div
    _createGridDiv:function(){
        var gridHeight = this.getHeight()-18;
        if(this.getUseMutiplePage()==true){
            gridHeight -= 18;
        }
        var gridDiv = jQuery('<div style="position:absolute;overflow:auto;top:'+(18*this.getScale())+'px;left:0px;width:'+(this.getWidth()*this.getScale())+'px;height:'+(gridHeight*this.getScale())+'px;"></div>');
        return gridDiv;
    },

    //创建分页 div
    _createPageTool: function(){
        var pageToolDivStr = '<div style="position:absolute;overflow:hidden;width:'+(this.getWidth()*this.getScale())+'px;height:'+(18*this.getScale())+'px;top:'+(this.getHeight()*this.getScale()-18)+'px;left:0px;">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:2px;"  src="src/img/icon-first.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:18px;" src="src/img/icon-prev.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:36px;" src="src/img/icon-next.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:54px;" src="src/img/icon-last.gif">'
            +'<img style="position:absolute;clip:rect(0px 16px 16px 0px);top:0px;left:90px;" src="src/img/icon-load.gif">'
            +'<span style="position:absolute;top:0px;left:130px;">每页 '+this.getRowsCount()+' 条记录</span>'
            +'</div>';
        var pageToolDiv = jQuery(pageToolDivStr);
        return pageToolDiv;
    },

    //创建grid
    _createGrid:function(){
        var table = jQuery('<table style="position:absolute;top:0px;left:0px;background-color:#ffffff;width:'+(this._realWidth*this.getScale())+'px;border-collapse:collapse;border:none;"></table>');
        var rows = 0;
        if(this.getUseMutiplePage()==true){
            rows = this.getRowsCount();
        }else{
            rows = 50; //todo 需要根据实际数据结果
        }
        this._realHeight = 0;
        for(var r=0; r<=rows; r++){
            var tr = jQuery('<tr style="width:'+(this._realWidth*this.getScale())+'px;">');
            if(r==0){
                tr.css('height',(this.getHeaderHeight()*this.getScale())+'px');
                this._realHeight += this.getHeaderHeight();
            }else{
                tr.css('height',(this.getRowHeight()*this.getScale())+'px');
                this._realHeight += this.getRowHeight();
            }
            if(this.getNumberDisplay()==true){
                if(r==0){
                    var th = jQuery('<th class="ui-state-default" style="cursor:pointer;width:'+(this._numberColumnWidth*this.getScale())+'px;border:'+this._borderStyle+'"></th>');
                    var div = jQuery('<div style="position:relative;overflow:hidden;width:'+((this._numberColumnWidth*this.getScale())-2)+'px;height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;vertical-align:middle;">序号</div>');
                    th.append(div);
                    tr.append(th);
                }else{
                    var td = jQuery('<td style="width:'+(this._numberColumnWidth*this.getScale())+'px;border:'+this._borderStyle+'"></td>');
                    var div = jQuery('<div style="position:relative;overflow:hidden;width:'+((this._numberColumnWidth*this.getScale())-2)+'px;height:'+((this.getRowHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+((this.getRowHeight()*this.getScale())-1)+'px;vertical-align:middle;">'+r+'</div>');
                    td.append(div);
                    tr.append(td);
                }
            }
            for(var c=1; c<=this._pinColumns.length;c++){
                var column = this._pinColumns[c-1];
                if(r==0){
                    var th = jQuery('<th class="ui-state-default" style="cursor:pointer;width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'"></th>');
                    var div = jQuery('<div colId="'+column.getId()+'" style="position:relative;overflow:hidden;width:'+((column.getColumnWidth()*this.getScale())-2)+'px;height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+(this.getHeaderHeight()-1)+'px;vertical-align:middle;">'+column.getCaption()+'</div>');
                    th.append(div);
                    tr.append(th);
                    var _this = this;
                    var timeFn = null;
                    div.mousedown(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        timeFn = setTimeout(function(){
                            var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                            _this.setActiveColumnIndex(column.getIndex());
                            _this.sendMessage('wof.bizWidget.GridComponent_active');
                        },250);
                    });
                    div.dblclick(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                        _this.setActiveColumnIndex(column.getIndex());
                        _this.sendMessage('wof.bizWidget.GridComponent_active');
                    });
                }else{
                    var td = jQuery('<td style="width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'">');
                    tr.append(td);
                }
            }
            for(var c=1; c<=this._unPinColumns.length;c++){
                var column = this._unPinColumns[c-1];
                if(r==0){
                    var th = jQuery('<th class="ui-state-default" style="cursor:pointer;width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'"></th>');
                    var div = jQuery('<div colId="'+column.getId()+'" style="position:relative;overflow:hidden;width:'+((column.getColumnWidth()*this.getScale())-2)+'px;height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;text-align:center;line-height:'+((this.getHeaderHeight()*this.getScale())-1)+'px;vertical-align:middle;">'+column.getCaption()+'</div>');
                    th.append(div);
                    tr.append(th);
                    var _this = this;
                    var timeFn = null;
                    div.mousedown(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        timeFn = setTimeout(function(){
                            var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                            _this.setActiveColumnIndex(column.getIndex());
                            _this.sendMessage('wof.bizWidget.GridComponent_active');
                        },250);
                    });
                    div.dblclick(function(event){
                        event.stopPropagation();
                        clearTimeout(timeFn);
                        var column = wof.util.ObjectManager.get(jQuery(event.target).attr('colid'));
                        _this.setActiveColumnIndex(column.getIndex());
                        _this.sendMessage('wof.bizWidget.GridComponent_active');
                    });
                }else{
                    var td = jQuery('<td style="width:'+(column.getColumnWidth()*this.getScale())+'px;border:'+this._borderStyle+'">');
                    tr.append(td);
                }
            }
            table.append(tr);
        }
        table.css('height',(this._realHeight*this.getScale())+'px');
        return table;
    },
    _getBindEntityPropertyColumns : function (){
        var bindPropertyColumns = [];
        var gridComponentColumns = this._getAllColumns();
        if(gridComponentColumns){
            for(var i = 0; i < gridComponentColumns.length;i++){
                var gridComponentColumn = gridComponentColumns[i]
                var bindDataField = gridComponentColumn.getBindDataField();
                if(bindDataField){
                    bindPropertyColumns.push(gridComponentColumn);
                }
            }
        }
        return bindPropertyColumns;
    },
    //创建初始化的GridComponent
    createSelf: function(width, height){
        var node = new wof.bizWidget.GridComponent();
        node.setWidth(width-8);
        node.setHeight(height-25);
        node.setHeaderHeight(45);
        node.setTop(2);
        node.setLeft(2);
        node.setUseMutiplePage(true);
        for(var i=0;i<1;i++){
            var column = new wof.bizWidget.GridComponentColumn();
            column.setCaption('列'+(i+1));
            column.setColumnWidth(120);
            column.appendTo(node);
        }
        return node;
    }



};