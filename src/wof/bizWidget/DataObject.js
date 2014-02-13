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

    this._originalBuffer = {};
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

    _mainEntityAlias:null, //主实体别名

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

        this.query('pageId', 'JZGJBXXB');

        this.newData({'mainEntityAlias':'','childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}, [{"hjmc":"好员工","jxjlid":wof.util.Tool.uuid()}]);

        this.updateData({'mainEntityAlias':'','childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}, [{"hjmc":"好员工修改过","jxjlid":"1"}]);

        this.deleteData({'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}, [{"jxjlid":"1"}]);

        this.deleteData({'mainEntityAlias':'JZGJBXXB'}, [{'zgid':'1'}]);

        this.saveOrUpdate({'mainEntityAlias':'JZGJBXXB'});

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
     * entityParameter 实体参数
     * 形如 {'mainEntityAlias':'','childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     * data 新增的数据
     */
    newData: function(entityParameter, data){
        //entityData id由数据感知构件生成
        //在主缓冲区中增加该条数据
        //该数据在主缓冲区的状态为New或者NewModified(要结合实体的元数据中的默认值来决定是何种状态)
        var mainEntityAlias = entityParameter['mainEntityAlias'];
        var childEntityAlias = entityParameter['childEntityAlias'];
        var mainRowId = entityParameter['mainRowId'];
        var id = null;
        if(mainEntityAlias!=null&&mainEntityAlias.length>0){
            id = mainEntityAlias;
        }else{
            id = this._mainEntityAlias+'.'+mainRowId+'.'+childEntityAlias;
        }
        var original = this._originalBuffer[id];
        if(original!=null){
            var idPro = original["idPro"];
            var primary = this._primaryBuffer[id];
            if(primary!=null){
                for(var i=0;i<data.length;i++){
                    var record = data[i];
                    if(record[idPro]!=null){
                        var newData = {
                            'data':{},
                            'status':'New',
                            'rowId':wof.util.Tool.uuid()
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
                console.log('主缓冲区不存在对应实体:'+id);
            }
        }else{
            console.log('原始缓冲区不存在对应实体:'+id);
        }
    },

    /**
     * 修改数据
     * 并发出对应消息
     *
     * todo 需要考虑过滤缓冲区和删除缓冲区的情况
     * todo 同时需要修改相同实体的数据
     * entityParameter 实体参数
     * 形如 {'mainEntityAlias':'','childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     * data 修改数据
     *
     */
    updateData: function(entityParameter, data){
        //在主缓冲区中修改对应数据 并将数据状态改为DataModified
        var mainEntityAlias = entityParameter['mainEntityAlias'];
        var childEntityAlias = entityParameter['childEntityAlias'];
        var mainRowId = entityParameter['mainRowId'];
        var id = null;
        if(mainEntityAlias!=null&&mainEntityAlias.length>0){
            id = mainEntityAlias;
        }else{
            id = this._mainEntityAlias+'.'+mainRowId+'.'+childEntityAlias;
        }
        var original = this._originalBuffer[id];
        if(original!=null){
            var idPro = original['idPro'];
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
            var primary = this._primaryBuffer[id];
            if(primary!=null){
                for(var i=0;i<data.length;i++){
                    var record = data[i];
                    var r = _findRowFromPrimaryById(record);
                    if(r>-1){
                        for(var n in record){
                            var f = primary[r]['data'][n];
                            f['value'] = record[n];
                            if(idPro!=n){
                                f['status'] = 'DataModified';
                            }
                        }
                        if(primary[r]['status'] == 'New'){
                            primary[r]['status'] = 'NewModified';
                        }else if(primary[r]['status'] == 'NotModified'){
                            primary[r]['status'] = 'DataModified';
                        }
                    }
                }
            }else{
                console.log('主缓冲区不存在对应实体:'+id);
            }
            console.log('主缓冲区数据:'+JSON.stringify(this._primaryBuffer[id]));
        }else{
            console.log('原始缓冲区不存在对应实体:'+id);
        }
    },

    /**
     * 删除数据
     * 并发出对应消息
     * todo 同时需要考虑相同实体的数据
     *
     * entityParameter 实体参数
     * 形如 {'mainEntityAlias':'','childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     * entityData 实体数据
     */
    deleteData: function(entityParameter, data){
        //将指定的数据从主缓冲区移动到对应的删除缓冲区(该数据的状态保持不变)
        var mainEntityAlias = entityParameter['mainEntityAlias'];
        var childEntityAlias = entityParameter['childEntityAlias'];
        var mainRowId = entityParameter['mainRowId'];
        var id = null;
        if(mainEntityAlias!=null&&mainEntityAlias.length>0){
            id = mainEntityAlias;
        }else{
            id = this._mainEntityAlias+'.'+mainRowId+'.'+childEntityAlias;
        }
        var original = this._originalBuffer[id];
        if(original!=null){
            var idPro = original['idPro'];
            var primary = this._primaryBuffer[id];
            if(this._deleteBuffer[id]==null){
                this._deleteBuffer[id] = [];
            }
            var dele = this._deleteBuffer[id];
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
                console.log('主缓冲区不存在对应实体:'+id);
            }
            console.log('删除缓冲区数据:'+JSON.stringify(this._deleteBuffer[id]));
        }else{
            console.log('原始缓冲区不存在对应实体:'+id);
        }

    },

    /**
     * todo 撤销删除
     * 并发出对应消息
     *
     * entityAlias 实体别名
     * entityData 实体数据
     */
    undelete: function(entityAlias, data){
        data = [
            {"zgid":"1"}
        ];


    },

    /**
     * 查询方法
     * 如果entityAlias为空 则表示查询全部实体数据
     * 此方式会直接忽略为保存的数据
     * 并发出对应消息
     *
     * pageId 页面id
     * entityAlias 实体别名
     * queryParam 查询参数(JSON数组格式)
     * offset 偏移量(从0开始)
     * rowsCount 返回数据数量
     */
    query: function(pageId, entityAlias, queryParam, offset, rowsCount){
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
            var ents = JSON.parse(rsp.responseText);

            /**
             * 步骤二
             * 清空对应原始缓冲区 主缓冲区 过滤缓冲区 删除缓冲区对应实体数据
             * 将返回数据加入对应原始缓冲区和主缓冲区 并将状态设置为NotModified(此逻辑将导致所涉及到的未保存的数据丢失)
             */
            var _this = this;
            function _findJSON(pathId){
                var path = null;
                if(pathId.indexOf('.')>0){
                    var ns = pathId.split('.');
                    path = "$.'"+ns[0]+"'.rows[?(@.rowId='"+ns[1]+"')].childData.'"+ns[2]+"'";
                }else{
                    path = "$.'"+pathId+"'";
                }
                var o = jsonPath(ents, path)[0];
                return o;
            }
            function _setChildEnt(parentEnt, row){
                for(var n in row['childData']){
                    var ent = row['childData'][n];
                    var pathId = parentEnt['entityAlias']+'.'+row['rowId']+'.'+ent['entityAlias'];
                    var entity = _findJSON(pathId);
                    delete _this._originalBuffer[pathId];
                    delete _this._primaryBuffer[pathId];
                    delete _this._filterBuffer[pathId];
                    delete _this._deleteBuffer[pathId];
                    _this._originalBuffer[pathId] = entity;
                    _this._primaryBuffer[pathId] = JSON.parse(JSON.stringify(entity['rows'])); //值copy
                }
            }
            var i=0;
            for(var n in ents){   //实际由于只有一个主实体 所以循环只有一次
                var ent = ents[n];
                var pathId = ent['entityAlias'];
                this._mainEntityAlias = pathId;
                var entity = _findJSON(pathId);
                delete this._originalBuffer[pathId];
                delete this._primaryBuffer[pathId];
                delete this._filterBuffer[pathId];
                delete this._deleteBuffer[pathId];
                this._originalBuffer[pathId] = entity;
                this._primaryBuffer[pathId] = JSON.parse(JSON.stringify(entity['rows'])); //值copy

                if(ent['rows'][i]['childData']!=null){
                    _setChildEnt(ent, ent['rows'][i]);
                }
                i++;
            }
            for(var n in this._primaryBuffer){
                console.log(n);
            }
        }else{
            console.log('本地策略暂时不支持');
        }
        this._calcDataTotal();
    },

    /**
     * 提交保存数据
     * 服务端会根据数据状态决定保存方式(inset、update、delete)
     *
     * 保存成功后 将清空删除缓冲区(包括删除缓冲区对应在原始缓冲区中保存的数据)
     *
     * entityParameter 实体参数
     * 形如 {'mainEntityAlias':'','childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     *
     */
    saveOrUpdate: function(entityParameter){
        var data = {};
        var saveType = null; //保存方式
        if(jQuery.isEmptyObject(entityParameter)){
            entityParameter = {};
            saveType = 0;
            console.log('entityParameter为空对象 保存所有实体的数据');
        }else if(entityParameter['mainEntityAlias']!=null && entityParameter['childEntityAlias']!=null && entityParameter['mainRowId']!=null){
            saveType = 1;
            console.log('mainEntityAlias和childEntityAlias及mainRowId都不为空 则保存主实体和mainRowId下对应子实体数据');
        }else if(entityParameter['mainEntityAlias']!=null && entityParameter['childEntityAlias']!=null && entityParameter['mainRowId']==null){
            saveType = 2;
            console.log('mainEntityAlias和childEntityAlias不为空 mainRowId为空 则保存主实体和所有子实体数据');
        }else if(entityParameter['mainEntityAlias']!=null && entityParameter['childEntityAlias']==null && entityParameter['mainRowId']==null){
            saveType = 3;
            console.log('如果mainEntityAlias不为空 childEntityAlias和mainRowId为空 则只保存主实体数据');
        }else if(entityParameter['mainEntityAlias']==null && entityParameter['childEntityAlias']!=null && entityParameter['mainRowId']!=null){
            saveType = 4;
            console.log('如果mainEntityAlias为空 childEntityAlias和mainRowId不为空 则只保存mainRowId下对应子实体数据');
        }
        var mainEntityAlias = entityParameter['mainEntityAlias'];
        var childEntityAlias = entityParameter['childEntityAlias'];
        var mainRowId = entityParameter['mainRowId'];
        var id = null;
        if(mainEntityAlias!=null&&mainEntityAlias.length>0){
            id = mainEntityAlias;
        }else{
            id = this._mainEntityAlias+'.'+mainRowId+'.'+childEntityAlias;
        }


        var _this = this;
        //根据id组织数据
        function _getEnt(id){
            var idPro = _this._originalBuffer[id]['idPro'];
            var entity = {"primaryBuffer":[],"deleteBuffer":[]};
            var primary = _this._primaryBuffer[id];
            if(primary!=null){
                var primaryRows = [];
                for(var i=0;i<primary.length;i++){
                    var row = primary[i];
                    if(row['status']!='NotModified'){
                        var record = {'data':{},'status':'NotModified'};
                        for(var n in row['data']){
                            var f = row['data'][n];
                            if(f['status']!='NotModified' || n==idPro){
                                record['data'][n] = row['data'][n];
                            }
                        }
                        record['status'] = row['status'];
                        primaryRows.push(record);
                    }
                }
                entity['primaryBuffer'] = primaryRows;
            }
            var dele = _this._deleteBuffer[id];
            if(dele!=null){
                var deleRows = [];
                for(var i=0;i<dele.length;i++){
                    var row = dele[i];
                    if(row['status']!='New' && row['status']!='NewModified'){
                        var record = {'data':{},'status':''};
                        for(var n in row['data']){
                            var f = row['data'][n];
                            if(f['status']!='NotModified' || n==idPro){
                                record['data'][n] = row['data'][n];
                            }
                        }
                        record['status'] = row['status'];
                        deleRows.push(record);
                    }
                }
                entity['deleteBuffer'] = deleRows;
            }
            return entity;
        }
        if(saveType==0){
            _getEnt(id);
        }else if(saveType==1){

        }else if(saveType==2){

        }else if(saveType==3){
            data[mainEntityAlias] = _getEnt(id);
        }else if(saveType==4){

        }
        console.log('提交数据:'+JSON.stringify(data));
    },

    /**
     *
     * 是否存在未保存的数据
     *
     * entityAlias 实体别名
     * 如果entityAlias为空 则检查全部的实体
     */
    existsUnsavedData : function(entityAlias){

    },

    /**
     * todo 根据原始缓冲区恢复本地数据
     * 并发出对应消息
     *
     */
    reset: function(){
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