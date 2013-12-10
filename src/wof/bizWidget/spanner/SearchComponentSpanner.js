/**
 * @widgetClass SearchComponentSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.SearchComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.bizWidget.SearchComponent';
    this._meta.title = '搜索';
    this._meta.sendMessages = {'wof.bizWidget.SearchComponent_mousedown':'单击','wof.bizWidget.SearchComponent_render':'重绘'};
    this._meta.propertys = {
        'SearchComponent':{
            'itemHeight':{prop:'itemHeight','name':'行高','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'name':{prop:'name','name':'构件名称','type':'text','readOnly':false,'isHide':false,required:false},
            'caption':{prop:'caption','name':'标题','type':'text','readOnly':false,'isHide':false,required:false},
            'linkComponentID':{prop:'linkComponentID','name':'关联组件','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ComponentTreeSelector', customParam:'gridComponent,voucherGridComponent'},
            'colsNum':{prop:'colsNum','name':'列数','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'isExpand':{prop:'isExpand','name':'是否展开','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'paramMaps':{prop:'paramMaps','name':'参数','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ParamMapsWindow', customParam:'dataId'}
        },
        'SearchItem':{
            'name':{prop:'name','name':'名称','type':'text','readOnly':false,'isHide':false,required:false},
            'colNum':{prop:'colNum','name':'列号','type':'naturalNumber','readOnly':true,'isHide':false,required:false},
            'rowNum':{prop:'rowNum','name':'行号','type':'naturalNumber','readOnly':true,'isHide':false,required:false},
            'isFixItem':{prop:'isFixItem','name':'是否锁定','type':'yesOrNo','readOnly':false,'isHide':false,required:true},
            'rowspan':{prop:'rowspan','name':'纵向通栏','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'caption':{prop:'caption','name':'显示名称','type':'text','readOnly':false,'isHide':false,required:false},
            'dataField':{prop:'dataField','name':'绑定实体属性','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.MetaTreeSelector', customParam:'field'},
            'dateTimeBoxFormat':{prop:'dateTimeBoxFormat','name':'时间格式','type':'enum','readOnly':false,'isHide':false,enumData:{'YYYY-MM-DD hh:mm:ss':'YYYY-MM-DD hh:mm:ss','YYYY-MM':'YYYY-MM','MM-DD':'MM-DD','YYYY-MM-DD':'YYYY-MM-DD','hh:mm:ss':'hh:mm:ss','hh:mm':'hh:mm'},required:false},
            'selectPattern':{prop:'selectPattern','name':'下拉框显示模式','type':'enum','readOnly':false,'isHide':false, 'enumData':{'normal':'普通','tree':'树形','grid':'列表'},required:false},
            'useMultiSelect':{prop:'useMultiSelect','name':'下拉框是否多选','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'visbleType':{prop:'visbleType','name':'显示类型','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    text:'文本框',
                    textArea:'文本域',
                    richTextArea:'文本编辑器',
                    select:'下拉框',
                    checkBox:'多选框',
                    date:'日期',
                    radio:'单选框',
                    file:'文件选择框',
                    number:'数字'
                },required:false},
            'fromTo':{prop:'fromTo','name':'是否范围搜索','type':'yesOrNo','yesOrNo':false,'isHide':false,required:false},
            'labelWidth':{prop:'labelWidth','name':'Label宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputWidth':{prop:'inputWidth','name':'输入框宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputHeight':{prop:'inputHeight','name':'输入框高度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'colspan':{prop:'colspan','name':'横向通栏','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'tipValue':{prop:'tipValue','name':'提示信息','type':'text','readOnly':false,'isHide':false,required:false},
            'linkageItem':{prop:'linkageItem','name':'关联联动项','type':'text','readOnly':false,'isHide':false,required:false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.bizWidget.SearchComponent"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +'if(data.id==this.getPropertys().id){ '
        +' var searchComponent=wof.util.ObjectManager.get(data.id); '
        +' if(data.activeClass=="SearchComponent"){ '
        +'   searchComponent.updateSearchComponent(data); '
        +'   searchComponent.render(); '
        +'   searchComponent.sendMessage("wof.bizWidget.SearchComponent_active");'
        +' }else if(data.activeClass=="SearchItem"){ '
        +'     searchComponent.updateSearchItem(data); '
        +'     searchComponent.render(); '
        +'     searchComponent.sendMessage("wof.bizWidget.SearchComponent_active");'
        +' } '
        +'}';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);

    this._selectSearchComponentIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/selectSearchComponent.png">');
    this._deleteSearchComponentIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteSearchComponent.png">');
    this._cutSearchComponentIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');

    this._mergeSearchItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/mergeSearchItemArrow.png">');
    this._splitSearchItemArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/splitSearchItemArrow.png">');
    this._addSearchItemRowspanArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/addSearchItemRowspanArrow.png">');
    this._reduceSearchItemRowspanArrow = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/reduceSearchItemRowspanArrow.png">');
    this._deleteSearchItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/deleteSearchItem.png">');
    this._lockSearchItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/lock.png">');
    this._unlockSearchItemIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/unlock.png">');

};
wof.bizWidget.spanner.SearchComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性

    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _activeData: null,

    _mergeSearchItemArrow:null,

    _splitSearchItemArrow:null,

    _addSearchItemRowspanArrow:null,

    _reduceSearchItemRowspanArrow:null,

    _deleteSearchItemIco:null,

    _lockSearchItemIco:null,

    _unlockSearchItemIco:null,

    _selectSearchComponentIco:null,

    _deleteSearchComponentIco:null,

    _cutSearchComponentIco:null,

    /**
     * get/set 属性方法定义
     */
    getMeta: function(){
        return this._meta;
    },

    setPropertys:function(propertys){
        this._propertys = propertys;
    },

    getPropertys: function(){
        if(this._propertys==null){
            this._propertys = {};
        }
        return this._propertys;
    },

    getActiveData:function(){
        return this._activeData;
    },

    setActiveData:function(activeData){
        this._activeData = activeData;
    },


    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        this._selectSearchComponentIco.remove();
        this._deleteSearchComponentIco.remove();
        this._cutSearchComponentIco.remove();
        this._splitSearchItemArrow.remove();
        this._mergeSearchItemArrow.remove();
        this._reduceSearchItemRowspanArrow.remove();
        this._addSearchItemRowspanArrow.remove();
        this._deleteSearchItemIco.remove();
        this._lockSearchItemIco.remove();
        this._unlockSearchItemIco.remove();

        var _this = this;
        this._selectSearchComponentIco.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._deleteSearchComponentIco.mousedown(function(event){
            event.stopPropagation();
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该构件吗?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '确定':function(){
                        var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
                        searchComponent.removeChildren(true);
                        searchComponent.remove(true);
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    }
                }
            });
        });

        this._cutSearchComponentIco.mousedown(function(event){
            event.stopPropagation();
            wof.util.GlobalObject.add('cutObjectId',_this.getPropertys().id);
        });

        this._mergeSearchItemArrow.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.addSearchItemColspan(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();

            searchComponent.sendMessage('wof_object_resize');
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._splitSearchItemArrow.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.reduceSearchItemColspan(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();

            searchComponent.sendMessage('wof_object_resize');
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._reduceSearchItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.reduceSearchItemRowspan(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();

            searchComponent.sendMessage('wof_object_resize');
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._addSearchItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.addSearchItemRowspan(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();

            searchComponent.sendMessage('wof_object_resize');
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });

        this._unlockSearchItemIco.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.unfixSearchItem(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._lockSearchItemIco.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.fixSearchItem(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._deleteSearchItemIco.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.deleteSearchItem(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();

            searchComponent.sendMessage('wof_object_resize');
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
    },

    //----------必须实现----------
    render: function () {
        var activeData = {};
        var searchComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(searchComponent!=null){
            activeData.id = this.getPropertys().id;
            activeData.componentId = this.getPropertys().componentId;
            activeData.className = this.getPropertys().className;
            activeData.onReceiveMessage = this.getPropertys().onReceiveMessage;
            activeData.onSendMessage = this.getPropertys().onSendMessage;

            var activeSearchItemRank = this.getPropertys().activeSearchItemRank;
            var activeSearchItem = searchComponent.findSearchItemByRank(activeSearchItemRank);
            if(activeSearchItem!=null){
                //当前激活SearchItem加入减少列数句柄
                if(searchComponent.canReduceSearchItemColspan(activeSearchItem)){
                    this._splitSearchItemArrow.css('top',2).css('left',0);
                    activeSearchItem.getDomInstance().append(this._splitSearchItemArrow);
                }
                //当前激活SearchItem加入增加列数句柄
                if(searchComponent.canAddSearchItemColspan(activeSearchItem)){
                    this._mergeSearchItemArrow.css('top',2).css('left',activeSearchItem.getWidth()*activeSearchItem.getScale()-this._mergeSearchItemArrow.width()-2);
                    activeSearchItem.getDomInstance().append(this._mergeSearchItemArrow);
                }
                if(searchComponent.canDeleteSearchItem(activeSearchItem)){
                    this._deleteSearchItemIco.css('top',activeSearchItem.getHeight()*activeSearchItem.getScale()-this._deleteSearchItemIco.height()-2).css('left',activeSearchItem.getWidth()*activeSearchItem.getScale()-this._deleteSearchItemIco.width()*2-6);
                    activeSearchItem.getDomInstance().append(this._deleteSearchItemIco);
                }
                if(searchComponent.canFixSearchItem(activeSearchItem)){
                    this._lockSearchItemIco.css('top',activeSearchItem.getHeight()*activeSearchItem.getScale()-this._lockSearchItemIco.height()-2).css('left',activeSearchItem.getWidth()*activeSearchItem.getScale()-this._lockSearchItemIco.width()-2);
                    activeSearchItem.getDomInstance().append(this._lockSearchItemIco);
                }
                if(searchComponent.canUnfixSearchItem(activeSearchItem)){
                    this._unlockSearchItemIco.css('top',activeSearchItem.getHeight()*activeSearchItem.getScale()-this._unlockSearchItemIco.height()-2).css('left',activeSearchItem.getWidth()*activeSearchItem.getScale()-this._unlockSearchItemIco.width()-2);
                    activeSearchItem.getDomInstance().append(this._unlockSearchItemIco);
                }
                if(searchComponent.canReduceSearchItemRowspan(activeSearchItem)){
                    this._reduceSearchItemRowspanArrow.css('top',0).css('left',activeSearchItem.getWidth()*activeSearchItem.getScale()/2-this._reduceSearchItemRowspanArrow.width()/2);
                    activeSearchItem.getDomInstance().append(this._reduceSearchItemRowspanArrow);
                }
                if(searchComponent.canAddSearchItemRowspan(activeSearchItem)){
                    this._addSearchItemRowspanArrow.css('top',activeSearchItem.getHeight()*activeSearchItem.getScale()-this._addSearchItemRowspanArrow.height()-2).css('left',activeSearchItem.getWidth()*activeSearchItem.getScale()/2-this._addSearchItemRowspanArrow.width()/2);
                    activeSearchItem.getDomInstance().append(this._addSearchItemRowspanArrow);
                }
                activeData.activeClass = 'SearchItem';
                activeData.name = activeSearchItem.getName();
                activeData.index = activeSearchItem.getIndex();
                activeData.colNum = activeSearchItem.getColNum();
                activeData.rowNum = activeSearchItem.getRowNum();
                activeData.isFixItem = activeSearchItem.getIsFixItem();
                activeData.rowspan = activeSearchItem.getRowspan();
                activeData.caption = activeSearchItem.getCaption();
                activeData.dataField = activeSearchItem.getDataField();
                activeData.dateTimeBoxFormat = activeSearchItem.getDateTimeBoxFormat();
                activeData.selectPattern = activeSearchItem.getSelectPattern();
                activeData.useMultiSelect = activeSearchItem.getUseMultiSelect();
                activeData.visbleType = activeSearchItem.getVisbleType();
                activeData.fromTo = activeSearchItem.getFromTo();
                activeData.labelWidth = activeSearchItem.getLabelWidth();
                activeData.inputWidth = activeSearchItem.getInputWidth();
                activeData.inputHeight = activeSearchItem.getInputHeight();
                activeData.colspan = activeSearchItem.getColspan();
                activeData.tipValue = activeSearchItem.getTipValue();
                activeData.linkageItem = activeSearchItem.getLinkageItem();
            }else{
                activeData.activeClass = 'SearchComponent';
                activeData.initActionName = searchComponent.getInitActionName();
                activeData.itemHeight = searchComponent.getItemHeight();
                activeData.name = searchComponent.getName();
                activeData.callStr = searchComponent.getCallStr();
                activeData.index = searchComponent.getIndex();
                activeData.caption = searchComponent.getCaption();
                activeData.linkComponentID = searchComponent.getLinkComponentID();
                activeData.state = searchComponent.getState();
                activeData.mustInOrder = searchComponent.getMustInOrder();
                activeData.colsNum = searchComponent.getColsNum();
                activeData.titleHeight = searchComponent.getTitleHeight();
                activeData.rows = searchComponent.getRows();
                activeData.isExpand = searchComponent.getIsExpand();
                activeData.activeSearchItemRank = searchComponent.getActiveSearchItemRank();
                activeData.paramMaps = searchComponent.getParamMaps();
            }

            //当前选中的SearchComponent加入拖放 删除操作句柄
            this._selectSearchComponentIco.css('top',0).css('left',0);
            searchComponent.getDomInstance().append(this._selectSearchComponentIco);
            this._deleteSearchComponentIco.css('top',0).css('left',this._deleteSearchComponentIco.width()+2);
            searchComponent.getDomInstance().append(this._deleteSearchComponentIco);
            this._cutSearchComponentIco.css('top',0).css('left',this._deleteSearchComponentIco.width()*2+4);
            searchComponent.getDomInstance().append(this._cutSearchComponentIco);
        }
        this.setActiveData(activeData);
        this.sendMessage('wof.bizWidget.spanner.SearchComponentSpanner_render');
    },

    //选择实现
    afterRender: function () {
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            activeData: this.getActiveData(),
            meta: this.getMeta()
        };
    },

    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setActiveData(data.activeData);
    },

    //静态方法 导出数据
    exportData: function(node){
        /**
         <SearchComponent BindEntityID="Employee" Id="emSearch" ColsNum="3" Caption="员工信息搜索" index="A" State="" CallStr="searchcomponent:0_0_1" LinkComponentID="emGrid">
            <SearchItem Caption="姓名" Index="0" DataField="name" Name="name" VisbleType="Text" LableWidth="100" InputWidth="100" Max="5"/>
            <SearchItem Caption="年龄" Index="1" DataField="age" Name="age" VisbleType="Number" FromTo="true" LableWidth="100" InputWidth="100" />
            <SearchItem Name="Sex" InputWidth="150" Visible="true" Caption="性别" LableWidth="100" DataField="sex" VisbleType="Text"/>
            <SearchItem Name="birthdate" InputWidth="150" Visible="true" Caption="出生日期" LableWidth="100" TipValue="点击选择时间" DataField="birthdate" DateTimeFormat="YYYY_MM_DD_HH_MM_SS" VisbleType="Date" FromTo="true"/>
            <ParamMaps>
               <ParamMap MapType="value" CompParamName="" PageParamName="" ChangeExpt=""></ParamMap>
            </ParamMaps>
         </SearchComponent>

         */
        var json = {};
        if(node.getClassName()=='wof.bizWidget.SearchComponent'){
            json.className = node.getClassName();
            json.linkComponentID = node.getLinkComponentID();
            json.id = node.getComponentId();
            json.initActionName = node.getInitActionName();
            json.colsNum = node.getColsNum();
            json.itemHeight = node.getItemHeight();
            json.name = node.getName();
            json.callStr = node.getCallStr();
            json.index = node.getIndex();
            json.caption = node.getCaption();
            json.state = node.getState();

            var paramMaps = [];
            for(var k in node.getParamMaps()){
                var param = node.getParamMaps()[k];
                paramMaps.push(param);
            }
            json.paramMaps = paramMaps;

            var searchItems = [];
            var childNodes = node.childNodes();
            for(var i=0;i<childNodes.length;i++){
                if(childNodes[i].getClassName()=='wof.bizWidget.SearchItem'){
                    var item = childNodes[i];
                    var searchItem = {};
                    searchItem.colspan = item.getColspan();
                    searchItem.name = item.getName();
                    searchItem.colNum = item.getColNum();
                    searchItem.rowNum = item.getRowNum();
                    searchItem.isFixItem = item.getIsFixItem();
                    searchItem.rowspan = item.getRowspan();
                    searchItem.caption = item.getCaption();
                    searchItem.dataField = item.getDataField();
                    searchItem.dateTimeBoxFormat = item.getDateTimeBoxFormat();
                    searchItem.selectPattern = item.getSelectPattern();
                    searchItem.useMultiSelect = item.getUseMultiSelect();
                    searchItem.visbleType = item.getVisbleType();
                    searchItem.fromTo = item.getFromTo();
                    searchItem.labelWidth = item.getLabelWidth();
                    searchItem.inputWidth = item.getInputWidth();
                    searchItem.inputHeight = item.getInputHeight();
                    searchItem.tipValue = item.getTipValue();
                    searchItem.linkageItem = item.getLinkageItem();
                    searchItems.push(searchItem);
                }
            }
            json.searchItem = searchItems;
        }
        return json;
    }
};