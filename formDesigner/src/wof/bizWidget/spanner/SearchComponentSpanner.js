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
            'linkComponentID':{prop:'linkComponentID','name':'关联构件','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ComponentTreeSelector', customParam:'gridComponent,voucherGridComponent'},
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
            'dateTimeBoxFormat':{prop:'dateTimeBoxFormat','name':'时间格式','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    'yyyy-MM-dd HH:mm:ss':'yyyy-MM-dd HH:mm:ss',
                    'yyyy-MM':'yyyy-MM',
                    'MM-dd':'MM-dd',
                    'yyyy-MM-dd':'yyyy-MM-dd',
                    'HH:mm:ss':'HH:mm:ss',
                    'HH:mm':'HH:mm'
                },required:false},
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
            'fromTo':{prop:'fromTo','name':'是否范围搜索','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'labelWidth':{prop:'labelWidth','name':'Label宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputWidth':{prop:'inputWidth','name':'输入框宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'inputHeight':{prop:'inputHeight','name':'输入框高度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'colspan':{prop:'colspan','name':'横向通栏','type':'naturalNumber','readOnly':false,'isHide':false,required:true},
            'tipValue':{prop:'tipValue','name':'提示信息','type':'text','readOnly':false,'isHide':false,required:false},
            'linkageItem':{prop:'linkageItem','name':'关联联动项','type':'text','readOnly':false,'isHide':false,required:false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.SearchComponent_active',method:'this._receivePropertysAndRenderSelf(message.sender);'});

    var method = 'this._receiveAndProcessParameters(message.sender.parameters);';
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

    _parameters: null,

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

    getParameters:function(){
        return this._parameters;
    },

    setParameters:function(parameters){
        this._parameters = parameters;
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
            searchComponent.deleteSearchItem(activeSearchItemRank);
            searchComponent.setActiveSearchItemRank(null);
            searchComponent.render();

            searchComponent.sendMessage('wof.bizWidget.SearchComponent_active');
        });
    },

    //----------必须实现----------
    render: function () {
        var parameters = {};
        var searchComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(searchComponent!=null){
            parameters.id = this.getPropertys().id;
            parameters.componentId = this.getPropertys().componentId;
            parameters.className = this.getPropertys().className;
            parameters.onReceiveMessage = this.getPropertys().onReceiveMessage;
            parameters.onSendMessage = this.getPropertys().onSendMessage;

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
                parameters.activeClass = 'SearchItem';
                parameters.name = activeSearchItem.getName();
                parameters.index = activeSearchItem.getIndex();
                parameters.colNum = activeSearchItem.getColNum();
                parameters.rowNum = activeSearchItem.getRowNum();
                parameters.isFixItem = activeSearchItem.getIsFixItem();
                parameters.rowspan = activeSearchItem.getRowspan();
                parameters.caption = activeSearchItem.getCaption();
                parameters.dataField = activeSearchItem.getDataField();
                parameters.dateTimeBoxFormat = activeSearchItem.getDateTimeBoxFormat();
                parameters.selectPattern = activeSearchItem.getSelectPattern();
                parameters.useMultiSelect = activeSearchItem.getUseMultiSelect();
                parameters.visbleType = activeSearchItem.getVisbleType();
                parameters.fromTo = activeSearchItem.getFromTo();
                parameters.labelWidth = activeSearchItem.getLabelWidth();
                parameters.inputWidth = activeSearchItem.getInputWidth();
                parameters.inputHeight = activeSearchItem.getInputHeight();
                parameters.colspan = activeSearchItem.getColspan();
                parameters.tipValue = activeSearchItem.getTipValue();
                parameters.linkageItem = activeSearchItem.getLinkageItem();
            }else{
                parameters.activeClass = 'SearchComponent';
                parameters.initActionName = searchComponent.getInitActionName();
                parameters.itemHeight = searchComponent.getItemHeight();
                parameters.name = searchComponent.getName();
                parameters.callStr = searchComponent.getCallStr();
                parameters.index = searchComponent.getIndex();
                parameters.caption = searchComponent.getCaption();
                parameters.linkComponentID = searchComponent.getLinkComponentID();
                parameters.state = searchComponent.getState();
                parameters.mustInOrder = searchComponent.getMustInOrder();
                parameters.colsNum = searchComponent.getColsNum();
                parameters.titleHeight = searchComponent.getTitleHeight();
                parameters.rows = searchComponent.getRows();
                parameters.isExpand = searchComponent.getIsExpand();
                parameters.activeSearchItemRank = searchComponent.getActiveSearchItemRank();
                parameters.paramMaps = searchComponent.getParamMaps();
            }

            //当前选中的SearchComponent加入拖放 删除操作句柄
            this._selectSearchComponentIco.css('top',0).css('left',0);
            searchComponent.getDomInstance().append(this._selectSearchComponentIco);
            this._deleteSearchComponentIco.css('top',0).css('left',this._deleteSearchComponentIco.width()+2);
            searchComponent.getDomInstance().append(this._deleteSearchComponentIco);
            this._cutSearchComponentIco.css('top',0).css('left',this._deleteSearchComponentIco.width()*2+4);
            searchComponent.getDomInstance().append(this._cutSearchComponentIco);
        }
        this.setParameters(parameters);
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
            parameters: this.getParameters(),
            meta: this.getMeta()
        };
    },
    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setParameters(data.parameters);

    },

    //静态方法 导出数据
    exportData: function(node){
        /**
         <SearchComponent ColsNum="4" State="null" LinkComponentID="10ECB93CBDCD4C1C87E820FEECD15638"
         Caption="未命名搜索" index="null" Id="DDA2D8FAF570415296692376AB131B53" CallStr="searchComponent:0_0_1"
         Name="rsSearch" InitActionName="null" itemHeight="45">
             <SearchItem TipValue="" Colspan="1" LinkageItem="" InputHeight="13" InputWidth="120" LableWidth="80" FromTo="false" VisbleType="text" DateTimeBoxFormat="yyyy-MM-dd HH:mm:ss" selectPattern="normal" UseMultiSelect="false" Caption="工号" DataField="JZGJBXXB.gh" Name="" rowspan="1"/>
             <SearchItem TipValue="" Colspan="1" LinkageItem="" InputHeight="13" InputWidth="120" LableWidth="80" FromTo="false" VisbleType="text" DateTimeBoxFormat="yyyy-MM-dd HH:mm:ss" selectPattern="normal" UseMultiSelect="false" Caption="姓名" DataField="JZGJBXXB.xm" Name="" rowspan="1"/>
             <SearchItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="120" LableWidth="80" FromTo="false" VisbleType="select" DateTimeBoxFormat="yyyy-MM-dd HH:mm:ss" selectPattern="normal" UseMultiSelect="false" Caption="政治面貌" DataField="JZGJBXXB.zzmmbm" Name="" rowspan="1"/>
             <SearchItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="120" LableWidth="80" FromTo="false" VisbleType="select" DateTimeBoxFormat="yyyy-MM-dd HH:mm:ss" selectPattern="normal" UseMultiSelect="false" Caption="所属机构" DataField="JZGJBXXB.zzjg" Name="jzgzz" rowspan="1"/>
             <SearchItem TipValue="" Colspan="2" LinkageItem="" InputHeight="13" InputWidth="150" LableWidth="80" FromTo="true" VisbleType="date" DateTimeBoxFormat="yyyy-MM-dd HH:mm:ss" selectPattern="normal" UseMultiSelect="false" Caption="出生日期" DataField="JZGJBXXB.csrq" Name="" rowspan="1"/>
             <SearchItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="120" LableWidth="80" FromTo="false" VisbleType="number" DateTimeBoxFormat="yyyy-MM-dd HH:mm:ss" selectPattern="normal" UseMultiSelect="false" Caption="年龄" DataField="JZGJBXXB.NL" Name="zgage" rowspan="1"/>
             <SearchItem TipValue="" Colspan="1" LinkageItem="" InputHeight="20" InputWidth="120"
         LableWidth="80" FromTo="false" VisbleType="select" DateTimeBoxFormat="" selectPattern="normal"
         UseMultiSelect="false" Caption="性别" DataField="JZGJBXXB.xb" Name="jzgsex" rowspan="1"/>
             <ParamMaps/>
         </SearchComponent>
         */
        if(node.getClassName()=='wof.bizWidget.SearchComponent'){
            var tool = wof.util.Tool;
            var root = tool.stringToXml("<searchComponent></searchComponent>");
            var rootElement = root.documentElement;

            tool.setAttribute(rootElement,"colsNum",node.getColsNum());
            tool.setAttribute(rootElement,"state",node.getState());
            tool.setAttribute(rootElement,"linkComponentID",node.getLinkComponentID());
            tool.setAttribute(rootElement,"caption",node.getCaption());
            tool.setAttribute(rootElement,"index",node.getIndex());
            tool.setAttribute(rootElement,"id",node.getComponentId());
            tool.setAttribute(rootElement,"callStr",node.getCallStr());
            tool.setAttribute(rootElement,"name",node.getName());
            tool.setAttribute(rootElement,"initActionName",node.getInitActionName());
            tool.setAttribute(rootElement,"itemHeight",node.getItemHeight());

            var childNodes = node.childNodes();
            for(var i=0;i<childNodes.length;i++){
                if(childNodes[i].getClassName()=='wof.bizWidget.SearchItem'){
                    var item = childNodes[i];
                    var SearchItem = tool.createElement(root,"searchItem");
                    tool.setAttribute(SearchItem,"caption",item.getCaption());
                    tool.setAttribute(SearchItem,"name",item.getName());
                    tool.setAttribute(SearchItem,"colNum",item.getColNum());
                    tool.setAttribute(SearchItem,"isFixItem",item.getIsFixItem());
                    tool.setAttribute(SearchItem,"rowspan",item.getRowspan());
                    tool.setAttribute(SearchItem,"colspan",item.getColspan());
                    tool.setAttribute(SearchItem,"dataField",item.getDataField());
                    tool.setAttribute(SearchItem,"dateTimeBoxFormat",item.getDateTimeBoxFormat());
                    tool.setAttribute(SearchItem,"selectPattern",item.getSelectPattern());
                    tool.setAttribute(SearchItem,"useMultiSelect",item.getUseMultiSelect());
                    tool.setAttribute(SearchItem,"visbleType",item.getVisbleType());
                    tool.setAttribute(SearchItem,"fromTo",item.getFromTo());
                    tool.setAttribute(SearchItem,"labelWidth",item.getLabelWidth());
                    tool.setAttribute(SearchItem,"inputWidth",item.getInputWidth());
                    tool.setAttribute(SearchItem,"inputHeight",item.getInputHeight());
                    tool.setAttribute(SearchItem,"tipValue",item.getTipValue());
                    tool.setAttribute(SearchItem,"linkageItem",item.getLinkageItem());
                    tool.appendChild(rootElement,SearchItem);
                }
            }

            var paramMapsElement = tool.createElement(root,'paramMaps');
            var paramMapElement = tool.createElement(root,'paramMap');

            for(var k in node.getParamMaps()){
                var param = node.getParamMaps()[k];
                tool.setAttribute(paramMapElement,'mapType',param['mapType']);
                tool.setAttribute(paramMapElement,'compParamName',param['compParamName']);
                tool.setAttribute(paramMapElement,'compParamValue',param['compParamValue']);
                tool.setAttribute(paramMapElement,'pageParamName',param['pageParamName']);
                tool.setAttribute(paramMapElement,'changeExpt',param['changeExpt']);
            }

            tool.appendChild(paramMapsElement,paramMapElement);
            tool.appendChild(rootElement,paramMapsElement);
            console.log(tool.xmlToString(root));
            return tool.xmlToString(root);
        }

        /*var json = {};
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
        console.log(JSON.stringify(json));
        return json;*/
    },


    //加工并发送数据
    _receivePropertysAndRenderSelf:function(propertys){
        this.setPropertys(propertys);
        this.render();
    },



    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        if(parameters.id==this.getPropertys().id){
            var searchComponent=wof.util.ObjectManager.get(parameters.id);
            if(parameters.activeClass=="SearchComponent"){
                searchComponent.updateSearchComponent(parameters);
                searchComponent.render();
                searchComponent.sendMessage("wof.bizWidget.SearchComponent_active");
            }else if(parameters.activeClass=="SearchItem"){
                searchComponent.updateSearchItem(parameters);
                searchComponent.render();
                searchComponent.sendMessage("wof.bizWidget.SearchComponent_active");
            }
        }
    }

};