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
                {
                    "data":{"hjms":{"value":"","status":"NotModified"},"hjmc":{"value":"2014优秀员工","status":"NotModified"},"jxjlid":{"value":"1","status":"NotModified"},"dqzt":{"value":"0","status":"NotModified"},"hjrqks":{"value":"2014-01-01","status":"NotModified"},"zgid":{"value":"1","status":"NotModified"},"jxbm":{"value":"1","status":"NotModified"},"hjrqjs":{"value":"2014-09-01","status":"NotModified"}},
                    "status":"NotModified"
                },
                {
                    "data":{"hjms":{"value":"","status":"NotModified"},"hjmc":{"value":"2014优秀团队","status":"NotModified"},"jxjlid":{"value":"2","status":"NotModified"},"dqzt":{"value":"0","status":"NotModified"},"hjrqks":{"value":"2014-01-01","status":"NotModified"},"zgid":{"value":"1","status":"NotModified"},"jxbm":{"value":"2","status":"NotModified"},"hjrqjs":{"value":"2014-09-01","status":"NotModified"}},
                    "status":"NotModified"
                }
            ],
            "Ref":{
                "jxbmref":{"bz":"","jxmc":"优秀团队","sfqy":"true","jxbm":"2"},
                "zzidref":{"lbbm":"1","zgbz":"好人","gh":"20153021422","xm":"张三丰","zzmmbm":"1","xb":"1","csrq":"2014-01-01","zzjg":"1001","zgid":"1","zzid":"1001"}
            },
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
                {
                    "data":{"xb_show":{"value":"男","status":"NotModified"},"lbbm_show":{"value":"全职员工","status":"NotModified"},"zgbz":{"value":"好人","status":"NotModified"},"xm":{"value":"张三丰","status":"NotModified"},"zzmmbm":{"value":"1","status":"NotModified"},"zzmmbm_show":{"value":"团员","status":"NotModified"},"zzjg":{"value":"1001","status":"NotModified"},"zzid":{"value":"1001","status":"NotModified"},"lbbm":{"value":"1","status":"NotModified"},"gh":{"value":"20153021422","status":"NotModified"},"zzjg_show":{"value":"计算机学院","status":"NotModified"},"xb":{"value":"1","status":"NotModified"},"csrq":{"value":"2014-01-01 12:00:00","status":"NotModified"},"zgid":{"value":"1","status":"NotModified"}},
                    "status":"NotModified"
                }
            ],
            "Ref":{
                "zglbref":{"lbmc":"全职员工","lbbm":"1","lbbz":"全职员工"},
                "zzmmref":{"zzmmbz":"","zzmmbm":"1","zzmmmc":"团员"},
                "zzjgref":{"bz":"","zzmc":"计算机学院","zzbm":"1001","sjzzbm":"1","zzid":"10"},
                "XBref":{"xbbh":"1","xbmc":"男"},
                "zzidref":{}
            },
            "EntityAlias":"JZGJBXXB",
            "TotalCount":"1",
            "CurrentPageNum":"1",
            "IdPro":"zgid",
            "EntityType":"main", // 主实体
            "EntityName":"JZGJBXXB"
        }
    };
    this._primaryBuffer = {};
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

        this._new("hjxxchild");

        this._update("hjxxchild");

        this._delete("hjxxchild");

        this._save("hjxxchild");

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
     * data 新增数据
     */
    _new: function(entityAlias, data){
        //entityData id由数据感知构件生成
        //在主缓冲区中增加该条数据
        //该数据在主缓冲区的状态为New或者NewModified(要结合实体的元数据中的默认值来决定是何种状态)

        data = [
            {"hjmc":"2011优秀员工","jxjlid":wof.util.Tool.uuid(),"dqzt":"0","hjrqks":"2014-08-05","zgid":"1"},
            {"hjmc":"2000最佳新员工","jxjlid":wof.util.Tool.uuid(),"dqzt":"0","hjrqks":"2014-08-05","zgid":"1"}
        ];

        var original = this._originalBuffer[entityAlias];
        if(original!=null){
            var idPro = original["IdPro"];
            var primary = this._primaryBuffer[entityAlias];
            if(primary!=null){
                for(var i=0;i<data.length;i++){
                    var record = data[i];
                    if(record[idPro]!=null){
                        var newData = {
                            'data':{},
                            'status':'New'
                        };
                        for(var n in record){
                            newData['data'][n] = {'value':record[n],'status':'DataModified'};
                        }
                        primary.push(newData);
                    }else{
                        console.log('新增数据'+JSON.stringify(record)+'没有主键');
                    }
                }
            }else{
                console.log('主缓冲区不存在对应实体别名:'+entityAlias);
            }
        }else{
            console.log('原始缓冲区不存在对应实体别名:'+entityAlias);
        }


    },

    /**
     * 修改数据
     * 并发出对应消息
     *
     * todo 需要考虑过滤缓冲区和删除缓冲区的情况
     * todo 同时需要修改相同实体的数据
     * entityAlias 实体别名
     * data 修改数据
     *
     */
    _update: function(entityAlias, data){
        data = [
            {"hjmc":"2018优秀员工","jxjlid":"1","dqzt":"0","hjrqks":"2014-08-05","zgid":"1"},
            {"hjmc":"2017优秀员工","jxjlid":"2","dqzt":"0","hjrqks":"2014-08-05","zgid":"1"}
        ];
        //在主缓冲区中修改对应数据 并将数据状态改为DataModified
        var original = this._originalBuffer[entityAlias];
        if(original!=null){
            var idPro = original['IdPro'];

            //在主缓冲区查找列号(返回-1表示没有找到)
            function _findRowFromPrimaryById(record){
                var row = -1;
                var id = record[idPro];
                for(var i=0;i<primary.length;i++){
                    if(id==primary[i]['data'][idPro]['value']){
                        row = i;
                        break;
                    }
                }
                return row;
            }
            var primary = this._primaryBuffer[entityAlias];
            if(primary!=null){
                for(var i=0;i<data.length;i++){
                    var record = data[i];
                    var r = _findRowFromPrimaryById(record);
                    if(r>-1){
                        for(var n in record){
                            var f = primary[r]['data'][n];
                            f['value'] = record[n];
                            f['status'] = 'DataModified';
                        }
                        if(primary[r]['status'] == 'New'){
                            primary[r]['status'] = 'NewModified';
                        }else if(primary[r]['status'] == 'NotModified'){
                            primary[r]['status'] = 'DataModified';
                        }
                    }
                }
            }else{
                console.log('主缓冲区不存在对应实体别名:'+entityAlias);
            }
            console.log('主缓冲区数据:'+JSON.stringify(this._primaryBuffer[entityAlias]));
        }else{
            console.log('原始缓冲区不存在对应实体别名:'+entityAlias);
        }
    },

    /**
     * 删除数据
     * 并发出对应消息
     * todo 需要考虑新增数据的处理方式
     * todo 同时需要考虑相同实体的数据
     *
     * entityAlias 实体别名
     * entityData 实体数据
     */
    _delete: function(entityAlias, data){
        data = [
            {"jxjlid":"2"}
        ];
        //将指定的数据从主缓冲区移动到对应的删除缓冲区(该数据的状态保持不变)
        var original = this._originalBuffer[entityAlias];
        if(original!=null){
            var idPro = original['IdPro'];

            var primary = this._primaryBuffer[entityAlias];
            if(this._deleteBuffer[entityAlias]==null){
                this._deleteBuffer[entityAlias] = [];
            }
            var dele = this._deleteBuffer[entityAlias];

            if(primary!=null){
                //在主缓冲区查找列号(返回-1表示没有找到)
                function _findRowFromPrimaryById(record){
                    var row = -1;
                    var id = record[idPro];
                    for(var i=0;i<primary.length;i++){
                        if(id==primary[i]['data'][idPro]["value"]){
                            row = i;
                            break;
                        }
                    }
                    return row;
                }
                for(var i=data.length-1;i>=0;i--){
                    var record = data[i];
                    var r = _findRowFromPrimaryById(record);
                    if(r>-1){
                        dele.push((primary[r]));
                        primary.splice(r,1);
                    }
                }
            }else{
                console.log('主缓冲区不存在对应实体别名:'+entityAlias);
            }
            console.log('删除缓冲区数据:'+JSON.stringify(this._deleteBuffer[entityAlias]));
        }else{
            console.log('原始缓冲区不存在对应实体别名:'+entityAlias);
        }

    },

    /**
     * todo 撤销删除
     * 并发出对应消息
     *
     * entityAlias 实体别名
     * entityData 实体数据
     */
    _undelete: function(entityAlias, data){

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

            var rsp = jQuery.ajax(
                {
                    url:'data.json',
                    async:false
                }
            );
            var ent = JSON.parse(rsp.responseText);

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
            this._primaryBuffer[entityAlias] = ent["Rows"];
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
     * entityAlias 实体别名
     * 如果entityAlias为空 则保存全部实体的修改数据
     */
    _save: function(entityAlias){
        var data = {};
        if(entityAlias!=null){
            //只保存指定实体的修改数据
            var entity = {"primaryBuffer":[],"deleteBuffer":[]};
            var primary = this._primaryBuffer[entityAlias];
            if(primary!=null){
                var primaryRows = [];
                for(var i=0;i<primary.length;i++){
                    var row = primary[i];
                    if(row['status']!='NotModified'){
                        var record = {'data':{},'status':'NotModified'};
                        for(var n in row['data']){
                            var f = row['data'][n];
                            if(f['status']!='NotModified'){
                                record['data'][n] = row['data'][n];
                                record['status'] = row['status'];
                            }
                        }
                        primaryRows.push(record);
                    }
                }
                entity['primaryBuffer'].push(primaryRows);
            }
            var dele = this._deleteBuffer[entityAlias];
            if(dele!=null){
                var deleRows = [];
                for(var i=0;i<dele.length;i++){
                    var row = dele[i];
                    var record = {'data':{},'status':'NotModified'};
                    for(var n in row['data']){
                        var f = row['data'][n];
                        if(f['status']!='NotModified'){
                            record['data'][n] = row['data'][n];
                            record['status'] = row['status'];
                        }
                    }
                    deleRows.push(record);
                }
            }
            entity['deleteBuffer'].push(deleRows);
            data[entityAlias] = entity;
            console.log('实体'+entityAlias+'数据=='+JSON.stringify(data));
        }else{
            //保存全部实体的修改数据

        }

    },

    /**
     *
     * 是否存在未保存的数据
     *
     * entityAlias 实体别名
     * 如果entityAlias为空 则检查全部的实体
     */
    hasNotSavedData: function(entityAlias){

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