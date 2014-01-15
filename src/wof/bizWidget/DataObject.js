/**
 * @bizWidgetClass DataObject class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 14-1-14 下午2:29
 */
wof.bizWidget.DataObject = function () {
    this._version = '1.0';

    this.getDomInstance().css('overflow','hidden');

    this._dataTotal = 0;
};
/**
 * 数据对象
 *
 */
wof.bizWidget.DataObject.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    _totalDataNumber:null, //设定本地缓冲数据数量

    _queryPolicy:null, //二次过滤策略(默认remote)   本地 local  远程 remote

    _entityId:null, //实体id

    _dataTotal:null, //原始缓冲区数据数量

    _bufferPageNubmer: null, //预缓存页数(默认两页)

    /**
     * 主缓冲区 存放检索出来的数据
     * New 指定行是新行，但此行的列并未赋值 只适用到行
     * NewModified 指定行是新行且行中的列已经赋值 只适用到行
     * NotModified 指定行或列处的信息与最初检索出的相同
     * DataModified 指定列或行中某列处的数据发生了改变
     */
    _primaryBuffer:null,

    /**
     * 过滤主缓冲区 存放从主缓冲区中过滤后的引用(以构件ID作为key 需要保证顺序)
     *
     * 保存检索到的记录的引用(如果二次过滤策略为remote 那么不需要合并引用 直接将对应过滤缓冲区设置为检索到的数据引用)
     */
    _filterBuffer:null,

    /**
     * 过滤删除缓冲区 存放从对应过滤主缓冲区删除的引用(以构件ID作为key 需要保证顺序)
     *
     */
    _filterDeleteBuffer:null,

    /**
     * 删除缓冲区 存放从主缓冲区中删除掉的数据
     * New 指定行是新行，但此行的列并未赋值 只适用到行
     * NewModified 指定行是新行且行中的列已经赋值 只适用到行
     * NotModified 指定行或列处的信息与最初检索出的相同
     * DataModified 指定列或行中某列处的数据发生了改变
     */
    _deleteBuffer:null,

    /**
     * 原始缓冲区 存放从检索到的原始数据(一般用来做数据恢复)
     * 保存按照条件检索到的记录(需要合并，以保证记录唯一)
     */
    _originalBuffer:null,

    /**
     * get/set 属性方法定义
     */

    getTotalDataNumber: function(){
        if(this._totalDataNumber==null){
            this._totalDataNumber = 2000;
        }
        return this._totalDataNumber;
    },

    setTotalDataNumber: function(totalDataNumber){
        this._totalDataNumber = totalDataNumber;
    },

    getBufferPageNubmer: function(){
        if(this._bufferPageNubmer==null){
            this._bufferPageNubmer = 2;
        }
        return this._bufferPageNubmer;
    },

    setBufferPageNubmer: function(bufferPageNubmer){
        this._bufferPageNubmer = bufferPageNubmer;
    },

    getQueryPolicy: function(){
        if(this._queryPolicy==null){
            this._queryPolicy = 'remote';
        }
        return this._queryPolicy;
    },

    setQueryPolicy: function(queryPolicy){
        this._queryPolicy = queryPolicy;
    },


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

    getFilterDeleteBuffer: function(){
        if(this._filterDeleteBuffer==null){
            this._filterDeleteBuffer = {};
        }
        return this._filterDeleteBuffer;
    },

    setFilterDeleteBuffer: function(filterDeleteBuffer){
        this._filterDeleteBuffer = filterDeleteBuffer;
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

    getEntityId: function(){
        return this._entityId;
    },

    setEntityId: function(entityId){
        this._entityId = entityId;
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
            totalDataNumber: this.getTotalDataNumber(),
            policy: this.getQueryPolicy(),
            entityId: this.getEntityId(),
            bufferPageNubmer: this.getBufferPageNubmer()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setTotalDataNumber(data.totalDataNumber);
        this.setQueryPolicy(data.policy);
        this.setEntityId(data.entityId);
        this.setBufferPageNubmer(data.bufferPageNubmer);
    },

    /**
     * 新增数据
     * 并发出对应消息
     *
     * componentId 数据感知构件id
     * entityAlias 实体别名
     * entityData 实体数据
     */
    _new: function(componentId, entityAlias, entityData){
        //entityData id由数据感知构件生成
        //在主缓冲区中增加该条数据 并在对应的过滤缓冲区增加该数据的引用(需要保证顺序)
        //该数据在主缓冲区的状态为New或者NewModified(要结合实体的元数据中的默认值来决定是何种状态)
        //并且在对应的过滤缓冲区加入该数据引用

    },

    /**
     * 修改数据
     * 并发出对应消息
     *
     * entityAlias 实体别名
     * entityData 实体数据
     */
    _update: function(entityAlias, entityData){
        //在主缓冲区中修改对应数据 并将数据状态改为DataModified

    },

    /**
     * 删除数据
     * 并发出对应消息
     *
     * entityAlias 实体别名
     * entityDataId 实体数据id
     */
    _delete: function(entityAlias, entityDataId){
        //将指定的数据从主缓冲区移动到对应的删除缓冲区(该数据的状态保持不变)

        //同时检查所有的过滤缓冲区 如果存在该数据的引用 则将该引用移动到对应的过滤删除缓冲区


    },

    /**
     * 查询方法
     * todo 是否需要增加未保存数据处理策略配置?
     * 并发出对应消息
     *
     * componentId 数据感知构件id
     * entityAlias 实体别名
     * queryParam 查询参数(JSON数组格式)
     * pageNo 页号(从0开始)
     * pageSize 分页记录数
     */
    _query: function(componentId, entityAlias, queryParam, pageNo, pageSize){
        var entityId = this.getEntityId();
        if(this.getQueryPolicy()=='remote'){ //预定义检索条件+二次过滤条件向远处服务器请求数据
            /**
             * 步骤一
             * 根据bufferPageNubmer和pageSize计算出查询返回记录数
             * 根据pageNo和pageSize计算出查询偏移量
             *
             * 步骤二
             * 根据查询条件发起检索 接收返回数据
             *
             * 步骤三
             * 清空对应过滤缓冲区
             * 将返回数据合并入原始缓冲区和主缓冲区和删除缓冲区
             * 注意如果主缓冲区和删除缓冲区数据发生修改 需要覆盖数据并将状态设置为NotModified(此逻辑将导致所涉及到的未保存的数据丢失)
             * 再将返回数据引用保存入对应过滤缓冲区和对应过滤删除缓冲区(需要保持顺序)
             *
             */
        }else{
            console.log('本地策略暂时不支持');
        }
        this._calcDataTotal();
    },

    /**
     * todo 提交保存数据
     * 服务端会根据数据状态决定保存方式(inset、update、delete)
     *
     * 保存成功后 将清空删除缓冲区(包括删除缓冲区对应在原始缓冲区中保存的数据)
     *
     * entityData 实体数据
     */
    _submit: function(entityData){
        var entityId = this.getEntityId();

    },

    /**
     * 根据原始缓冲区恢复本地数据
     * 并发出对应消息
     *
     */
    _reset: function(){
        /**
         * 步骤一
         * 清空主缓冲区和删除缓冲区
         *
         * 步骤二
         * 从原始缓冲区覆盖数据到主缓冲区
         * 并将主缓冲区的行列状态恢复为默认值(NotModified)
         *
         * 步骤三
         * 将所有过滤删除缓冲区的数据合并入各自所对应的过滤缓冲区(需要保证顺序)
         *
         */


    },

    /**
     * 回收内存
     *
     * 此内存清理方法会移除原始缓冲区(包括主缓冲区、删除缓冲区)中没有被过滤缓冲区和过滤删除缓冲区引用的数据
     */
    _gc: function(){

    },

    /**
     * 计算原始缓冲区的数据数量
     *
     * 此方法会在 _query、_new方法中被调用
     */
    _calcDataTotal: function(){

        this._dataTotal = 2000;
    }

};