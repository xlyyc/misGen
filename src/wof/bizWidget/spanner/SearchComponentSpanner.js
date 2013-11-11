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
            'id':{prop:'id','name':'ID','type':'text','readOnly':true,'isHide':false},
            'className':{prop:'className','name':'类名','type':'text','readOnly':true,'isHide':false}
        },
        'SearchItem':{
            'id':{prop:'id','name':'ID','type':'text','readOnly':true,'isHide':false},
            'className':{prop:'className','name':'类名','type':'text','readOnly':true,'isHide':false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.Spanner_render',method:'var propertys=message.sender.propertys;if(propertys.className=="wof.bizWidget.SearchComponent"){this.setPropertys(propertys);}else{this.setPropertys(null)}this.render();'});
    var method = 'var data=message.sender.propertys; '
        +'if(data.id==this.getPropertys().id){ '
        +' var node=wof.util.ObjectManager.get(data.id); '
        +' node.setData(data); '
        +' node.render();'
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
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._splitSearchItemArrow.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.reduceSearchItemColspan(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._reduceSearchItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.reduceSearchItemRowspan(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();
            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
        this._addSearchItemRowspanArrow.mousedown(function(event){
            event.stopPropagation();
            var searchComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeSearchItemRank = _this.getPropertys().activeSearchItemRank;
            searchComponent.addSearchItemRowspan(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();
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
            var activeSearchItem = searchComponent.findSearchItemByRank(activeSearchItemRank);
            if(activeSearchItem!=null&&activeSearchItem.childNodes().length>0){
                var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>该单元格包含对象,确定要删除该单元格吗?</p></div>');
                dialogDiv.dialog({
                    resizable:false,
                    height:200,
                    modal: true,
                    buttons:{
                        '确定':function(){
                            searchComponent.deleteSearchItem(activeSearchItemRank);
                            searchComponent.setActiveSearchItemRank(null);
                            searchComponent.render();
                            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        },
                        '关闭':function(){
                            jQuery(this).dialog('close');
                            jQuery(this).remove();
                        }
                    }
                });
            }else{
                searchComponent.deleteSearchItem(activeSearchItemRank);
                searchComponent.setActiveSearchItemRank(null);
                searchComponent.render();
                searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
            }
        });
    },

    //----------必须实现----------
    render: function () {
        var activeData = {};
        var searchComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(searchComponent!=null){
            activeData.id = this.getPropertys().id;
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
                    activeData.rowNum = activeSearchItem.getRowNum();
                    activeData.colNum = activeSearchItem.getColNum();
                    activeData.colspan = activeSearchItem.getColspan();
                    activeData.rowspan = activeSearchItem.getRowspan();
                    activeData.isFixItem = activeSearchItem.getIsFixItem();
                    /*activeData.itemName = activeSearchItem.getItemName();
                    activeData.visiable = activeSearchItem.getVisiable();
                    activeData.itemLabel = activeSearchItem.getItemLabel();
                    activeData.dataField = activeSearchItem.getDataField();
                    activeData.dateTimeBoxFormat = activeSearchItem.getDateTimeBoxFormat();
                    activeData.readOnly = activeSearchItem.getReadOnly();
                    activeData.required = activeSearchItem.getRequired();
                    activeData.length = activeSearchItem.getLength();
                    activeData.min = activeSearchItem.getMin();
                    activeData.max = activeSearchItem.getMax();
                    activeData.regExp = activeSearchItem.getRegExp();
                    activeData.checkErrorInfo = activeSearchItem.getCheckErrorInfo();
                    activeData.selectPattern = activeSearchItem.getSelectPattern();
                    activeData.useMultiSelect = activeSearchItem.getUseMultiSelect();
                    activeData.visbleType = activeSearchItem.getVisbleType();
                    activeData.labelWidth = activeSearchItem.getLabelWidth();
                    activeData.inputWidth = activeSearchItem.getInputWidth();
                    activeData.inputHeight = activeSearchItem.getInputHeight();
                    activeData.linkageItem = activeSearchItem.getLinkageItem();
                    activeData.tipValue = activeSearchItem.getTipValue();
                    activeData.SearchItemGroupIndex = searchComponent.getIndex();*/
                }else{
                    activeData.activeClass = 'SearchComponent';
                    activeData.caption = searchComponent.getCaption();
                    activeData.colsNum = searchComponent.getColsNum();
                    activeData.itemHeight = searchComponent.getItemHeight();
                    activeData.isExpand = searchComponent.getIsExpand();
                    activeData.mustInOrder = searchComponent.getMustInOrder();
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

        console.log('node.getId()=='+node.getId()+'   '+node.getClassName());
    }
};