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

    this._originalBuffer = {
        "hjxxchild":{
            "CorrentPageSize":"10",
            "Rows":[
                {	"hjxxchild":{"hjms":"","hjmc":"2014优秀员工","jxjlid":"1","dqzt":"0","hjrqks":"2014-01-01","zgid":"1","jxbm":"1","hjrqjs":"2014-09-01"},
                    "jxbmref":{"bz":"","jxmc":"优秀员工","sfqy":"true","jxbm":"1"},
                    "zzidref":{"lbbm":"1","zgbz":"好人","gh":"20153021422","xm":"张三丰","zzmmbm":"1","xb":"1","csrq":"2014-01-01","zzjg":"1001","zgid":"1","zzid":"1001"}
                },
                {	"hjxxchild":{"hjms":"","hjmc":"2014优秀团队","jxjlid":"2","dqzt":"0","hjrqks":"2014-01-01","zgid":"1","jxbm":"2","hjrqjs":"2014-09-01"},
                    "jxbmref":{"bz":"","jxmc":"优秀团队","sfqy":"true","jxbm":"2"},
                    "zzidref":{"lbbm":"1","zgbz":"好人","gh":"20153021422","xm":"张三丰","zzmmbm":"1","xb":"1","csrq":"2014-01-01","zzjg":"1001","zgid":"1","zzid":"1001"}
                }
            ],
            "EntityAlias":"hjxxchild",
            "TotalCount":"2",
            "CurrentPageNum":"1",
            "IdPro":"jxjlid",
            "EntityType":"child",// 子实体
            "EntityName":"HJXX"
        },
        "JZGJBXXB":{
            "CorrentPageSize":"1",
            "Rows":[
                {	"zglbref":{"lbmc":"全职员工","lbbm":"1","lbbz":"全职员工"},
                    "JZGJBXXB":{"xb_show":"男","lbbm_show":"全职员工","zgbz":"好人","xm":"张三丰","zzmmbm":"1","zzmmbm_show":"团员","zzjg":"1001","zzid":"1001","lbbm":"1","gh":"20153021422","zzjg_show":"计算机学院","xb":"1","csrq":"2014-01-01 12:00:00","zgid":"1"},
                    "zzmmref":{"zzmmbz":"","zzmmbm":"1","zzmmmc":"团员"},
                    "zzjgref":{"bz":"","zzmc":"计算机学院","zzbm":"1001","sjzzbm":"1","zzid":"10"},
                    "XBref":{"xbbh":"1","xbmc":"男"},
                    "zzidref":{}
                }
            ],
            "EntityAlias":"JZGJBXXB",
            "TotalCount":"1",
            "CurrentPageNum":"1",
            "IdPro":"zgid",
            "EntityType":"main", // 主实体
            "EntityName":"JZGJBXXB"
        }
    };
    this._primaryBuffer = {
        "hjxxchild":{
            "hjmc":{"1":{"value":"2014最佳员工","status":"DataModified"}},
            "hjrqks":{"0":{"value":"2014-01-14","status":"DataModified"}}
        }


    };
    this._filterBuffer = {};
    this._deleteBuffer = {};
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

    _queryPolicy:null, //二次过滤策略(默认remote) 本地 local  远程 remote

    _entityId:null, //实体id

    _dataTotal:null, //原始缓冲区数据数量

    /**
     * New 指定行是新行，但此行的列并未赋值 只适用到行
     * NewModified 指定行是新行且行中的列已经赋值 只适用到行
     * NotModified 指定行或列处的信息与最初检索出的相同
     * DataModified 指定列或行中某列处的数据发生了改变
     */

    /**
     * 主缓冲区 存放检索出来的数据 但不包括过滤掉和删除掉的数据
     */
    _primaryBuffer:null,

    /**
     * 过滤主缓冲区 存放从主缓冲区中过滤掉的数据
     */
    _filterBuffer:null,

    /**
     * 删除缓冲区 存放从主缓冲区中删除掉的数据
     */
    _deleteBuffer:null,

    /**
     * 原始缓冲区 存放从检索到的原始数据(一般用来做数据恢复)
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
        this._query("hjxxchild");

        this._update("hjxxchild");

        this._update("hjxxchild");

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            totalDataNumber: this.getTotalDataNumber(),
            policy: this.getQueryPolicy(),
            entityId: this.getEntityId()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setTotalDataNumber(data.totalDataNumber);
        this.setQueryPolicy(data.policy);
        this.setEntityId(data.entityId);
    },

    /**
     * 新增数据
     * 并发出对应消息
     *
     * entityAlias 实体别名
     * entityData 实体数据
     */
    _new: function(entityAlias, entityData){
        //entityData id由数据感知构件生成
        //在主缓冲区中增加该条数据
        //该数据在主缓冲区的状态为New或者NewModified(要结合实体的元数据中的默认值来决定是何种状态)





    },

    /**
     * 修改数据
     * 并发出对应消息
     *
     * todo 需要考虑过滤缓冲区和删除缓冲区的情况
     * entityAlias 实体别名
     * data 修改数据
     *
     */
    _update: function(entityAlias, data){
        data = [
            {
                "row":"1",
                "data":{"hjmc":"2018优秀员工","jxjlid":"1","dqzt":"0","hjrqks":"2014-05-05","zgid":"1"}
            }
        ];
        //在主缓冲区中修改对应数据 并将数据状态改为DataModified
        var original = this._originalBuffer[entityAlias];
        if(original!=null){
            var primary = this._primaryBuffer[entityAlias];
            if(primary!=null){
                //需要和原有修改数据进行合并
                for(var i=0;i<data.length;i++){
                    var record = data[i];
                    for(var n in record["data"]){
                        var f = primary[n];
                        if(f!=null){
                            primary[n][record["row"]] = {"value":record["data"][n],"status":"DataModified"};
                        }else{
                            var o = {};
                            o[record["row"]] = {"value":record["data"][n],"status":"DataModified"};
                            primary[n] = o;
                        }
                    }
                }
                console.log("1111111111111111111111");
            }else{
                var updateData = {};
                for(var i=0;i<data.length;i++){
                    var record = data[i];
                    for(var n in record["data"]){
                        var f = updateData[n];
                        if(f!=null){
                            updateData[n][record["row"]] = {"value":record["data"][n],"status":"DataModified"};
                        }else{
                            var o = {};
                            o[record["row"]] = {"value":record["data"][n],"status":"DataModified"};
                            updateData[n] = o;
                        }
                    }
                }
                this._primaryBuffer[entityAlias] = updateData;
                console.log("2222222222222222222222222");
            }
            console.log(JSON.stringify(this._primaryBuffer[entityAlias]));
        }else{
            console.log('被修改的数据在原始缓冲区中不存在');
        }
    },

    /**
     * 删除数据
     * 并发出对应消息
     *
     * entityAlias 实体别名
     * entityData 实体数据
     */
    _delete: function(entityAlias, entityData){
        //将指定的数据从主缓冲区移动到对应的删除缓冲区(该数据的状态保持不变)


    },

    /**
     * 查询方法
     * todo 是否需要增加未保存数据处理策略配置?
     * 并发出对应消息
     *
     * entityAlias 实体别名
     * queryParam 查询参数(JSON数组格式)
     * offset 偏移量(从0开始)
     * rowsCount 返回数据数量
     */
    _query: function(entityAlias, queryParam, offset, rowsCount){
        var entityId = this.getEntityId();
        if(this.getQueryPolicy()=='remote'){ //预定义检索条件+二次过滤条件向远程服务请求数据
            /**
             * 步骤一
             * 根据查询条件发起检索 接收返回数据
             */
            var ent = {
                "CorrentPageSize":"10",
                "Rows":[
                    {
                        "hjxxchild":{"hjms":"","hjmc":"2013优秀员工","jxjlid":"1","dqzt":"0","hjrqks":"2014-01-01","zgid":"1","jxbm":"1","hjrqjs":"2014-09-01"},
                        "jxbmref":{"bz":"","jxmc":"优秀员工","sfqy":"true","jxbm":"1"},
                        "zzidref":{"lbbm":"1","zgbz":"好人","gh":"20153021422","xm":"张三丰","zzmmbm":"1","xb":"1","csrq":"2014-01-01","zzjg":"1001","zgid":"1","zzid":"1001"}
                    },
                    {
                        "hjxxchild":{"hjms":"","hjmc":"2014优秀团队","jxjlid":"2","dqzt":"0","hjrqks":"2014-01-01","zgid":"1","jxbm":"2","hjrqjs":"2014-09-01"},
                        "jxbmref":{"bz":"","jxmc":"优秀团队","sfqy":"true","jxbm":"2"},
                        "zzidref":{"lbbm":"1","zgbz":"好人","gh":"20153021422","xm":"张三丰","zzmmbm":"1","xb":"1","csrq":"2014-01-01","zzjg":"1001","zgid":"1","zzid":"1001"}
                    }
                ],
                "EntityAlias":"hjxxchild",
                "TotalCount":"2",
                "CurrentPageNum":"1",
                "IdPro":"jxjlid",
                "EntityType":"child",// 子实体
                "EntityName":"HJXX"
            };
            /**
             * 步骤二
             * 清空原始缓冲区 主缓冲区 过滤缓冲区 删除缓冲区对应实体数据
             */
            delete this._originalBuffer[entityAlias];
            delete this._primaryBuffer[entityAlias];
            delete this._filterBuffer[entityAlias];
            delete this._deleteBuffer[entityAlias];
            /**
             * 步骤三
             * 将返回数据加入原始缓冲区和主缓冲区 并将状态设置为NotModified(此逻辑将导致所涉及到的未保存的数据丢失)
             */
            this._originalBuffer[entityAlias] = ent;

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
    _save: function(entityData){
        var entityId = this.getEntityId();
        /**
         *
         * 步骤一
         * 根据当前状态整理提交的数据
         *
         * 步骤二
         * 提交成功后刷新数据
         *
         */
    },

    /**
     * todo 根据原始缓冲区恢复本地数据
     * 并发出对应消息
     *
     */
    _reset: function(){
        /**
         * 步骤一
         * 清空主缓冲区 过滤缓冲区 删除缓冲区
         *
         * 步骤二
         * 从原始缓冲区覆盖数据到主缓冲区
         * 并将主缓冲区的行列状态恢复为默认值(NotModified)
         *
         */


    },

    /**
     * 回收内存
     *
     * todo 此内存清理方法会移除原始缓冲区(包括主缓冲区、删除缓冲区)中没有被主缓冲区和过滤缓冲区以及过滤删除缓冲区引用的对应实体的数据
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