/**
 * @bizWidgetClass Entity class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.Entity = function () {
    this._version = '1.0';

    this.setIsInside(true);
    this.getDomInstance().css('overflow','hidden');


};
/**
 * 实体对象
 * 包含了对实体对象的修改状态的维护、校验等方法
 */
wof.bizWidget.Entity.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _entityType:null, // main 主实体，child，子实体（设置所属主实体）
    _entityName:null, //实体ID  name暂时不需要
    _entityAlias:null, // 实体别名
    _parentEntity:null, // 参照或者子实体的主实体
    /*_totalCount:null,   //记录数
    _curerntPageNum:null, //当前页号
    CorrentPageSize :null,*/
    /*ConditionInfo :null,
    QueryFieldValues :null,
    OnlyRow :null,
    IdPro :null, //实体的主键属性，用于获取id值，进行查询
    ForeinPro :null, //实体的外键属性，用于设置外键值，进行增查
    Rows :null,// 数据记录  ，Status字段标识状态；0-默认状态，1-新增状态，2-修改状态 ，3-删除状态
    CachRows :null, //缓存数据 ，一般多于正在操作的Rows
    TemRows :null, //临时列  行编辑后未保存的row
    TemRowMap :null, //临时列  行编辑后未保存的row
    selectedId :null, //已选中的记录id  或者查看的页面中主表数据id*/

    /**
     * get/set 属性方法定义
     */
    getMainEntity: function(){
        if(this._mainEntity==null){
            this._mainEntity = {};
        }
        return this._mainEntity;
    },

    setMainEntity: function(mainEntity){
        this._mainEntity = mainEntity;
    },

    getChildEntity: function(){
        if(this._childEntity==null){
            this._childEntity = {};
        }
        return this._childEntity;
    },

    setChildEntity: function(childEntity){
        this._childEntity = childEntity;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

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
            mainEntity:this.getMainEntity(),
            childEntity:this.getChildEntity()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setMainEntity(data.mainEntity);
        this.setChildEntity(data.childEntity);
    }


};