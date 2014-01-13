/**
 * @bizWidgetClass DataObject class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.DataObject = function () {
    this._version = '1.0';


    this.getDomInstance().css('overflow','hidden');
    this.setIsInside(true);

};
/**
 * 数据对象
 *
 */
wof.bizWidget.DataObject.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
/*    _mainEntity:null,  //主实体

    _childEntity:null, //对等实体()*/

    _primaryBuffer:null, //主缓冲区 存放检索出来的数据，但不包括过滤掉和删除掉的数据(以构件ID作为key)

    _filterBuffer:null, //过滤缓冲区 存放从主缓冲区中过滤掉的数据(以构件ID作为key)

    _deleteBuffer:null, //删除缓冲区 存放从主缓冲区中删除掉的数据(以构件ID作为key)

    _originalBuffer:null, //原始缓冲区 存放从检索到的原始数据

    /**
     * get/set 属性方法定义
     */
   /* getMainEntity: function(){
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
*/
    getPrimaryBuffer: function(){
        if(this._primaryBuffer==null){
            this._primaryBuffer = {};
        }
        return this._primaryBuffer;
    },

    setPrimaryBuffer: function(primaryBuffer){
        this._primaryBuffer = primaryBuffer;
    },

    getFilterBuffer: function(){
        if(this._filterBuffer==null){
            this._filterBuffer = {};
        }
        return this._filterBuffer;
    },

    setFilterBuffer: function(filterBuffer){
        this._filterBuffer = filterBuffer;
    },

    getDeleteBuffer: function(){
        if(this._deleteBuffer==null){
            this._deleteBuffer = {};
        }
        return this._deleteBuffer;
    },

    setDeleteBuffer: function(deleteBuffer){
        this._deleteBuffer = deleteBuffer;
    },

    getOriginalBuffer: function(){
        if(this._originalBuffer==null){
            this._originalBuffer = {};
        }
        return this._originalBuffer;
    },

    setOriginalBuffer: function(originalBuffer){
        this._originalBuffer = originalBuffer;
    },
    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag==null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.DataObject_mousedown');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.bizWidget.DataObject_dblclick');
            });

            this._initFlag = true;
        }

    },

    //----------必须实现----------
    render: function () {

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
            /*mainEntity:this.getMainEntity(),
            childEntity:this.getChildEntity()*/
        };
    },
    //----------必须实现----------
    setData: function (data) {
       /* this.setMainEntity(data.mainEntity);
        this.setChildEntity(data.childEntity);*/
    }


};