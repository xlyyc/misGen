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

    this.setDataServicesUrl('data.json');
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

    _dataServicesUrl: null, //数据服务URL

    _asyncQuery:null, //是否异步查询数据 默认同步

    _asyncSave:null, //是否异步保存数据 默认同步

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

    getAsyncQuery: function(){
        if(this._asyncQuery==null){
            this._asyncQuery=false;
        }
        return this._asyncQuery;
    },

    setAsyncQuery: function(asyncQuery){
        this._asyncQuery = asyncQuery;
    },

    getAsyncSave: function(){
        if(this._asyncSave==null){
            this._asyncSave=false;
        }
        return this._asyncSave;
    },

    setAsyncSave: function(asyncSave){
        this._asyncSave = asyncSave;
    },

    getDataServicesUrl: function(){
        return this._dataServicesUrl;
    },

    setDataServicesUrl: function(dataServicesUrl){
        this._dataServicesUrl = dataServicesUrl;
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
        this.queryData('pageId', 'all', null, null, 0, 100);

        this.updateData([{"zglbref.lbbz":"外聘员工111","zgid":"362646149296820224"}]);

        this.deleteData([{"zgid":"362646149296820224"}]);

        this.addData([{"zglbref.lbbz":"好员工222","zgid":wof.util.Tool.uuid()}]);

        this.addData([{"hjmc":"好员工333","jxjlid":wof.util.Tool.uuid()}], {'childEntityAlias':'hjxxchild', 'mainRowId':'372873910208696320'});

        this.undeleteData();

        this.saveData();
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
     *
     * 并发出对应消息
     * data 新增的数据
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     *
     */
    addData: function(data, entityParameter){
        //entityData id由数据感知构件生成
        //在主缓冲区中增加该条数据
        //该数据在主缓冲区的状态为New或者NewModified(要结合实体的元数据中的默认值来决定是何种状态)
        var id = this._getBufferId(entityParameter);
        var alias = id.substring(id.lastIndexOf('.')+1);
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
                this.sendMessage('wof.bizWidget.DataObject_add',[alias]);
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
     * data 修改数据
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     *
     */
    updateData: function(data, entityParameter){
        //在主缓冲区中修改对应数据 并将数据状态改为DataModified
        var id = this._getBufferId(entityParameter);
        var alias = id.substring(id.lastIndexOf('.')+1);
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
                this.sendMessage('wof.bizWidget.DataObject_update',[alias]);
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
     * entityData 实体数据
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     */
    deleteData: function(data, entityParameter){
        //将指定的数据从主缓冲区移动到对应的删除缓冲区(该数据的状态保持不变)
        var id = this._getBufferId(entityParameter);
        var alias = id.substring(id.lastIndexOf('.')+1);
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
                this.sendMessage('wof.bizWidget.DataObject_delete',[alias]);
            }else{
                console.log('主缓冲区不存在对应实体:'+id);
            }
            console.log('删除缓冲区数据:'+JSON.stringify(this._deleteBuffer[id]));
        }else{
            console.log('原始缓冲区不存在对应实体:'+id);
        }

    },

    /**
     * 撤销删除
     * 并发出对应消息
     * todo 同时需要考虑相同实体的数据
     *
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     */
    undeleteData: function(entityParameter){
        var id = this._getBufferId(entityParameter);
        var alias = id.substring(id.lastIndexOf('.')+1);
        var primaryBuffer = this._primaryBuffer[id];
        if(primaryBuffer==null){
            primaryBuffer = [];
        }
        var deleBuffer = this._deleteBuffer[id];
        if(deleBuffer==null){
            deleBuffer = [];
        }
        for(var i=0;i<deleBuffer.length;i++){
            primaryBuffer.push((deleBuffer[i]));
            deleBuffer.splice(i,1);
        }
        this.sendMessage('wof.bizWidget.DataObject_undelete',[alias]);
    },

    /**
     * 查询方法
     * 此方式会直接忽略对应的未保存的数据
     * 并发出对应消息
     *
     * pageId 页面id
     * queryType all所有实体 main仅主实体 child仅子实体
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     * queryParam 查询参数(JSON数组格式)
     * offset 偏移量(从0开始)
     * rowsCount 返回数据数量
     */
    queryData: function(pageId, queryType, entityParameter, queryParam, offset, rowsCount){
        var queryData = {};
        queryData['pageId'] = pageId;
        queryData['offset'] = offset;
        queryData['rowsCount'] = rowsCount;
        queryData['queryParam'] = queryParam;
        if(queryType==null){
            queryType = 'all';
        }

        var aliasArr = [];
        /**
         * 根据查询类型组织查询参数
         */
        if(queryType=='all'){
            queryData['queryType'] = 'all';
        }else if(queryType=='main'){
            queryData['queryType'] = 'main';
        }else if(queryType=='child'){
            queryData['queryType'] = 'child';
            queryData['childEntityAlias'] = entityParameter['childEntityAlias'];
            queryData['mainRowIdVal'] = _getMainRowIdVal(entityParameter['mainRowId']);
        }
        var _this = this;
        function _getMainRowIdVal(mainRowId){
            var mainRowIdVal = null;
            var idPro = _this._originalBuffer[_this._mainEntityAlias]['idPro'];
            var primary = _this._primaryBuffer[_this._mainEntityAlias];
            if(primary!=null){
                for(var i=0;i<primary.length;i++){
                    var row = primary[i];
                    if(row['rowId']==mainRowId){
                        mainRowIdVal = row['data'][idPro]['value'];
                        break;
                    }
                }
            }
            return mainRowIdVal;
        }


        if(this.getQueryPolicy()=='remote'){ //预定义检索条件+二次过滤条件向远程服务请求数据
            /**
             * 步骤一
             * 根据查询条件发起检索 接收返回数据
             */
            var rsp = jQuery.ajax(
                {
                    //url:_this.getDataServicesUrl()+'/query',
                    url:_this.getDataServicesUrl(),
                    async:_this.getAsyncQuery()
                }
            );
            var ents = JSON.parse(rsp.responseText);

            /**
             * 步骤二
             * 清空对应原始缓冲区 主缓冲区 过滤缓冲区 删除缓冲区对应实体数据
             * 将返回数据加入对应原始缓冲区和主缓冲区 并将状态设置为NotModified(此逻辑将导致所涉及到的未保存的数据丢失)
             */

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
            function _setChildEnt(row){
                for(var n in row['childData']){
                    var ent = row['childData'][n];
                    var pathId = _this._mainEntityAlias+'.'+row['rowId']+'.'+ent['entityAlias'];
                    var entity = _findJSON(pathId);
                    aliasArr.push(pathId);
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
                if(queryType=='all'){
                    var ent = JSON.parse(JSON.stringify(ents[n]));
                    var pathId = ent['entityAlias'];
                    this._mainEntityAlias = pathId;
                    var entity = _findJSON(pathId);
                    delete this._originalBuffer[pathId];    //todo 此处需要考虑移除没有对应mainRowId的子实体数据
                    delete this._primaryBuffer[pathId];
                    delete this._filterBuffer[pathId];
                    delete this._deleteBuffer[pathId];
                    this._originalBuffer[pathId] = entity;
                    this._primaryBuffer[pathId] = JSON.parse(JSON.stringify(entity['rows'])); //值copy

                    aliasArr.push(pathId);
                    for(var t=0;t<ent['rows'].length;t++){
                        if(ent['rows'][t]['childData']!=null){
                            _setChildEnt(ent['rows'][t]);
                        }
                    }
                }else if(queryType=='main'){
                    var ent = JSON.parse(JSON.stringify(ents[n]));
                    var pathId = ent['entityAlias'];
                    this._mainEntityAlias = pathId;
                    var entity = _findJSON(pathId);
                    delete this._originalBuffer[pathId];    //todo 此处需要考虑移除没有对应mainRowId的子实体数据
                    delete this._primaryBuffer[pathId];
                    delete this._filterBuffer[pathId];
                    delete this._deleteBuffer[pathId];
                    this._originalBuffer[pathId] = entity;
                    this._primaryBuffer[pathId] = JSON.parse(JSON.stringify(entity['rows'])); //值copy

                    aliasArr.push(pathId);
                }else if(queryType=='child'){ //todo

                }
                i++;

            }

            this.sendMessage('wof.bizWidget.DataObject_query',aliasArr);
            console.log('aliasArr=='+JSON.stringify(aliasArr));
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
     * saveType 保存方式
     * all 保存全部实体(默认) main 仅保存主实体 mainAndChild 保存主实体和指定行下的子实体
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     *
     */
    saveData: function(saveType, entityParameter){
        if(saveType==null){
            saveType = 'all';
        }
        var data = {};
        if(jQuery.isEmptyObject(entityParameter)){
            entityParameter = {};
        }
        var childEntityAlias = entityParameter['childEntityAlias'];
        var mainRowId = entityParameter['mainRowId'];

        var _this = this;
        function _findMainRowAndSetData(mainEntData, mainRowId, childEntityAlias){
            var childId = _this._getBufferId({'childEntityAlias':childEntityAlias, 'mainRowId':mainRowId});
            var childEnt = _getEnt(childId);
            if(childEnt['primaryBuffer'].length>0 || childEnt['deleteBuffer'].length>0){
                var idPro = _this._originalBuffer[_this._mainEntityAlias]['idPro'];
                var mainPrimId = null;
                var mainPrim = _this._primaryBuffer[_this._mainEntityAlias];
                if(mainPrim!=null){
                    for(var i=0;i<mainPrim.length;i++){
                        var row = mainPrim[i];
                        if(row['rowId']==mainRowId){
                            mainPrimId = row['data'][idPro]['value'];
                            break;
                        }
                    }
                }
                var mainDeleId = null;
                var mainDele = _this._deleteBuffer[_this._mainEntityAlias];
                if(mainDele!=null){
                    for(var i=0;i<mainDele.length;i++){
                        var row = mainDele[i];
                        if(row['rowId']==mainRowId){
                            mainDeleId = row['data'][idPro]['value'];
                            break;
                        }
                    }
                }
                if(mainPrimId!=null){
                    var tempFlag = false;
                    for(var i=0;i<mainEntData['primaryBuffer'].length;i++){
                        var row = mainEntData['primaryBuffer'][i];
                        if(row['data'][idPro]!=null&&row['data'][idPro]['value']==mainPrimId){
                            row['child'][childEntityAlias] = childEnt;
                            tempFlag = true;
                            break;
                        }
                    }
                    if(tempFlag==false){
                        var childData = {
                            "data":{},
                            "status":"NotModified",
                            "child":{}
                        };
                        childData['data'][idPro] = {'value':mainPrimId,'status':'NotModified'};
                        childData['child'][childEntityAlias] = childEnt;
                        mainEntData['primaryBuffer'].push(childData);
                    }
                }else if(mainDeleId!=null){
                    var tempFlag = false;
                    for(var i=0;i<mainEntData['deleteBuffer'].length;i++){
                        var row = mainEntData['deleteBuffer'][i];
                        if(row['data'][idPro]!=null&&row['data'][idPro]['value']==mainDeleId){
                            row['child'][childEntityAlias] = childEnt;
                            tempFlag = true;
                            break;
                        }
                    }
                    if(tempFlag==false){
                        var childData = {
                            "data":{},
                            "status":"NotModified",
                            "child":{}
                        };
                        childData['data'][idPro] = {'value':mainDeleId,'status':'NotModified'};
                        childData['child'][childEntityAlias] = childEnt;
                        mainEntData['deleteBuffer'].push(childData);
                    }
                }else{
                    console.log('数据错误 找不到rowId为'+mainRowId+'的数据');
                }
            }
        }
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
                        var record = {'data':{},'status':'NotModified','child':{}};
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
                        var record = {'data':{},'status':'','child':{}};
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

        var aliasArr = [this._mainEntityAlias];

        if(saveType=='all'){
            data[this._mainEntityAlias] = _getEnt(this._mainEntityAlias);
            var primMainEnt = this._primaryBuffer[this._mainEntityAlias];
            if(primMainEnt!=null){
                for(var i=0;i<primMainEnt.length;i++){
                    var mainRowId = primMainEnt[i]['rowId'];
                    for(var n in primMainEnt[i]['childData']){
                        var childAlias = n.substring(n.lastIndexOf('.')+1);
                        _findMainRowAndSetData(data[this._mainEntityAlias], mainRowId, childAlias);
                        aliasArr.push(childAlias);
                    }
                }
            }
            var deleMainEnt = this._deleteBuffer[this._mainEntityAlias];
            if(deleMainEnt!=null){
                for(var i=0;i<deleMainEnt.length;i++){
                    var mainRowId = deleMainEnt[i]['rowId'];
                    for(var n in deleMainEnt[i]['childData']){
                        var childAlias = n.substring(n.lastIndexOf('.')+1);
                        _findMainRowAndSetData(data[this._mainEntityAlias], mainRowId, childAlias);
                        aliasArr.push(childAlias);
                    }
                }
            }
            console.log('保存所有实体的数据');
        }else if(saveType=='mainAndChild'){
            data[this._mainEntityAlias] = _getEnt(this._mainEntityAlias);
            _findMainRowAndSetData(data[this._mainEntityAlias], mainRowId, childEntityAlias);
            childAlias.push(childEntityAlias);
            console.log('保存主实体和指定行下对应子实体数据');
        }else if(saveType=='main'){
            data[this._mainEntityAlias] = _getEnt(this._mainEntityAlias);
            console.log('只保存主实体数据');
        }
        this.sendMessage('wof.bizWidget.DataObject_save',aliasArr);
        console.log('提交数据:'+JSON.stringify(data));
       /* var rsp = jQuery.ajax(
            {
                url:_this.getDataServicesUrl()+'/saveOrUpdate',
                async:_this.getAsyncSave()
            }
        );
        console.log('服务器返回:'+rsp.responseText);
        */
    },

    /**
     * todo 获得本地指定实体数据
     *
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     */
    getLocalData: function(entityParameter){
        var id = this._getBufferId(entityParameter);
        var primaryBuffer = this._primaryBuffer[id];

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
    },

    /**
     * 获得缓冲区id
     *
     * entityParameter 实体参数
     * 形如 {'childEntityAlias':'hjxxchild', 'mainRowId':'uuid1'}
     */
    _getBufferId: function(entityParameter){
        if(jQuery.isEmptyObject(entityParameter)){
            entityParameter = {};
        }
        var childEntityAlias = entityParameter['childEntityAlias'];
        var mainRowId = entityParameter['mainRowId'];
        var id = null;
        if((mainRowId!=null&&mainRowId.length>0) && (childEntityAlias!=null&&childEntityAlias.length>0)){
            id = this._mainEntityAlias+'.'+mainRowId+'.'+childEntityAlias;
        }else{
            id = this._mainEntityAlias
        }
        return id;
    }

};