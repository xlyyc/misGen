wis.widget.Tree = function() {
	this._version = '1.0';
};

wis.widget.Tree.prototype = {

	//============基本属性============

	_name : null, //名称

	_themes : null, //主题

	_mode : null, //模式 TODO

	_setting : null, // 内部对象

	_ztree : null,// ZTree对象（内部使用，不用于序列化）

	_items : null, //节点(未设置URL时启用)

	//============异步加载属性============

	_url : null, // 请求地址

	_asynctype : 'post', //请求类型，默认post

	_dataType : 'text', //异步请求返回的数据格式

	//============数据格式 ============

	_datachecked : 'checked', //zTree 节点数据中保存 check 状态的属性名称

	_datachildren : 'children', //zTree 节点数据中保存子节点数据的属性名称

	_dataname : 'name', //zTree 节点数据保存节点名称的属性名称

	_datatitle : "tltle", //zTree 节点数据保存节点提示信息的属性名称

	_dataurl : 'url', //zTree 节点数据保存节点链接的目标 URL 的属性名称

	_datasimpledata : false, 	//是否采用简单数据模式 (Array)，
								//不需要用户再把数据库中取出的 List 强行转换为复杂的 JSON 嵌套格式
								//如果设置为 true，请务必设置 setting.data.simpleData 内的其他参数: 
								//idKey / pIdKey / rootPId，并且让数据满足父子关系。
	_dataidKey : 'pkId', //节点数据中保存唯一标识的属性名称

	_datapIdKey : 'pId', //节点数据中保存其父节点唯一标识的属性名称

	_datarootPId : null, //用于修正根节点父节点数据，即 pIdKey 指定的属性值。

	//============选择属性(初始化之后更改无效)============
	_checkFlag : false, //是否可选择

	_chkStyle : 'checkbox', //勾选框类型 CheckBox 或 Radio

	_radioType : 'level', //radio的分组范围 :level-在每一级节点范围内当做一个分组  ，all- 在整棵树范围内当做一个分组

	_isSelLeafOnly : false, //仅能选择叶子节点

	//============查看属性============

	_isMultSelect : false, // 是否多选，设置为 true时，按下 Ctrl 或 Cmd 键可以选中多个节点

	_dblClickExpand : true, //是否双击展开

	// ============修改/拖动属性============
	_canDrag : null,

	// ============回调函数============
	_beforeExpand : null,
	_onExpand : null,
	_onClick : null,
	_onCheck : null,

	// ============Getter/Setter============
	getName : function() {
		return this._name;
	},

	setName : function(name) {
		this._name = name;
	},
	getThemes : function() {
		return this._themes;
	},
	setThemes : function(themes) {
		this._themes = themes;
	},

	setChkStyle : function(chkStyle) {
		this._chkStyle = chkStyle;
	},

	getChkStyle : function() {
		return this._chkStyle;
	},

	setRadioType : function(radioType) {
		this._radioType = radioType;
	},

	getRadioType : function() {
		return this._radioType;
	},

	setUrl : function(url) {
		this._url = url;
	},

	getUrl : function() {
		return this._url;
	},

	setAsynctype : function(asynctype) {
		this._asynctype = asynctype;
	},

	getAsynctype : function() {
		return this._asynctype;
	},
	setDataType : function(dataType) {
		this._dataType = dataType;
	},

	getDatachecked : function() {
		return this._datachecked;
	},
	setDatachecked : function(dataChecked) {
		this._datachecked = dataChecked;
	},

	getDataType : function() {
		return this._dataType;
	},
	setCheckFlag : function(checkFlag) {
		this._checkFlag = checkFlag;
	},

	getCheckFlag : function() {
		return this._checkFlag;
	},
	getDatachildren : function() {
		return this._datachildren;
	},
	setDatachildren : function(datachildren) {
		this._datachildren = datachildren;
	},

	getDataname : function() {
		return this._dataname;
	},
	setDataname : function(dataname) {
		this._dataname = dataname;
	},

	getDatatitle : function() {
		return this._datatitle;
	},
	setDatatitle : function(datatitle) {
		this._datatitle = datatitle;
	},
	getDataurl : function() {
		return this._dataurl;
	},
	setDataurl : function(dataurl) {
		this._dataurl = dataurl;
	},

	getDatasimpledata : function() {
		return this._datasimpledata;
	},
	setDatasimpledata : function(datasimpledata) {
		this._datasimpledata = datasimpledata;
	},

	getDataidKey : function() {
		return this._dataidKey;
	},
	setDataidKey : function(_dataidKey) {
		this._dataidKey = _dataidKey;
	},
	getDatapIdKey : function() {
		return this._datapIdKey;
	},
	setDatapIdKey : function(datapIdKey) {
		this._datapIdKey = datapIdKey;
	},
	getDatarootPId : function() {
		return this._datarootPId;
	},
	setDatarootPId : function(datarootPId) {
		this._datarootPId = datarootPId;
	},

	getIsSelLeafOnly : function() {
		return this._isSelLeafOnly;
	},
	setIsSelLeafOnly : function(isSelLeafOnly) {
		this._isSelLeafOnly = isSelLeafOnly;
	},

	getIsMultSelect : function() {
		return this._isMultSelect;
	},
	setIsMultSelect : function(isMultSelect) {
		this._isMultSelect = isMultSelect;
	},
	getDblClickExpand : function() {
		return this._dblClickExpand;
	},
	setDblClickExpand : function(dblClickExpand) {
		this._dblClickExpand = dblClickExpand;
	},
	
	setItems : function(nodes) {
		this._items = nodes;
	},

	getItems : function() {
		return this._items;
	},
	
	beforeExpand : function(beforeExpand) {
		this._beforeExpand = beforeExpand;
	},
	onExpand : function(onExpand) {
		this._onExpand = onExpand;
	},
	onClick : function(onClick) {
		this._onClick = onClick;
	},
	onCheck : function(onCheck) {
		this._onCheck = onCheck;
	},
	/**
	 * 初始化方法
	 */
	_init : function(data) {
		this.setOptions(data);
	},

	/**
	 * 初始化渲染方法
	 * 仅在第一次调用render时执行
	 */
	initRender : function() {
		var setting = {};
		//以下为默认设置
		setting.treeId = this.getId();
		//设置异步加载
		if (this.getUrl()) {
			setting.async = {};
			setting.async.enable = true;
			setting.async.url = this.getUrl();
			setting.async.type = this.getAsynctype();
			setting.async.dataType = this.getDataType();

		}
		//选择属性
		if (this.getCheckFlag()) {
			setting.check = {};
			setting.check.enable = true;
			setting.check.autoCheckTrigger = false;
			setting.check.chkboxType = {
				"Y" : "p",
				"N" : "s"
			};
			setting.check.nocheckInherit = true;
			setting.check.chkDisabledInherit = true;
			setting.check.chkStyle = this.getChkStyle();
			setting.check.radioType = this.getRadioType();
		}
		//数据设置
		setting.data = {};
		setting.data.key = {};
		if (this.getDatachecked()) {
			setting.data.key.checked = this.getDatachecked();
		}
		if (this.getDatachildren()) {
			setting.data.key.children = this.getDatachildren();
		}
		if (this.getDataname()) {
			setting.data.key.name = this.getDataname();
		}
		if (this.getDatatitle()) {
			setting.data.key.title = this.getDatatitle();
		}
		if (this.getDataurl()) {
			setting.data.key.url = this.getDataurl();
		}
		if (this.getDatasimpledata()) {
			//数据格式为基本
			setting.data.simpleData.enable = this.getDatasimpledata();
			if (this.getDataidKey()) {
				setting.data.simpleData.idKey = this.getDataidKey();
			}
			if (this.getDatapIdKey()) {
				setting.data.simpleData.pIdKey = this.getDatapIdKey();
			}
			if (this.getDatarootPId()) {
				setting.data.simpleData.rootPId = this.getDatarootPId();
			}
		}
		//查看设置
		setting.view = {};
		if (this.getIsMultSelect()) {
			setting.view.selectedMulti = this.getIsMultSelect();
		}
		if (this.getDblClickExpand()) {
			setting.view.dblClickExpand = this.getDblClickExpand();
		}
		//回调设置
		setting.callback = {};
		setting.callback.beforeExpand = this._beforeExpand;
		setting.callback.onExpand = this._onExpand;
		setting.callback.onClick = this._onClick;
		setting.callback.onCheck = this._onCheck;

		var zNodes = this.getUrl() ? null : this.getItems();//URL不为空，则设置节点无效     
		this._setting = setting;
		this._ztree = jQuery.fn.zTree.init(this.getDomInstance().addClass(
				'ztree'), setting, zNodes);
	},

	//选择实现
	beforeRender : function() {

	},
	//----------必须实现----------
	render : function() {
		//选择属性
		if (this.getCheckFlag() != null) {
			this._ztree.setting.check.enable = this.getCheckFlag();
			if (this.getChkStyle()) {
				this._ztree.setting.check.chkStyle = this.getChkStyle();
			}
			if (this.getRadioType()) {
				this._ztree.setting.check.radioType = this.getRadioType();
			}
		}
		//数据设置
		if (this.getDatachecked()) {
			this._ztree.setting.data.key.checked = this.getDatachecked();
		}
		if (this.getDatachildren()) {
			this._ztree.setting.data.key.children = this.getDatachildren();
		}
		if (this.getDataname()) {
			this._ztree.setting.data.key.name = this.getDataname();
		}
		if (this.getDatatitle()) {
			this._ztree.setting.data.key.title = this.getDatatitle();
		}
		if (this.getDataurl()) {
			this._ztree.setting.data.key.url = this.getDataurl();
		}
		if (this.getDatasimpledata() != null) {
			//数据格式为基本
			this._ztree.setting.data.simpleData.enable = this
					.getDatasimpledata();
			if (this.getDataidKey()) {
				this._ztree.setting.data.simpleData.idKey = this.getDataidKey();
			}
			if (this.getDatapIdKey()) {
				this._ztree.setting.data.simpleData.pIdKey = this
						.getDatapIdKey();
			}
			if (this.getDatarootPId()) {
				this._ztree.setting.data.simpleData.rootPId = this
						.getDatarootPId();
			}
		}
		//查看设置
		if (this.getIsMultSelect() != null) {
			this._ztree.setting.view.selectedMulti = this.getIsMultSelect();
		}
		if (this.getDblClickExpand() != null) {
			this._ztree.setting.view.dblClickExpand = this.getDblClickExpand();
		}
		//回调设置
		if (this._beforeExpand) {
			this._ztree.setting.callback.beforeExpand = this._beforeExpand;
		}
		if (this._onExpand) {
			this._ztree.setting.callback.onExpand = this._onExpand;
		}
		if (this._onClick) {
			this._ztree.setting.callback.onClick = this._onClick;
		}
		if (this._onCheck) {
			this._ztree.setting.callback.onCheck = this._onCheck;
		}

		//设置异步加载(由URL异步加载改为静态节点需重新加载树)
		//1. 原来为异步，更改URL
		if (this._ztree.setting.async.url!=null&&this.getUrl()!=null && this.getUrl() != this._ztree.setting.async.url) {
			this._ztree.setting.async.url = this.getUrl();
			this._ztree.setting.async.type = this.getAsynctype();
			this._ztree.setting.async.dataType = this.getDataType();
			//更改异步加载属性，需要刷新节点
			this.reAsyncChildNodes(null, "refresh");
		//2. 原来为异步，更改为静态
		} else if (this._ztree.setting.async.url!=null&&this.getUrl() == null && this.getItems() != null) {
			//更新已经解决不了，重新生成树
			this._ztree.setting.async.enable = false;
			this._ztree.setting.async.url = null;
			var zNodes = this.getUrl() ? null : this.getItems();//URL不为空，则设置节点无效     
			this._setting = this._ztree.setting;
			this._ztree.destroy();//销毁
			this._ztree = jQuery.fn.zTree.init(this.getDomInstance().addClass(
					'ztree'), this._setting, zNodes);
		//3. 原来为静态，更改为异步
		}else if(this._ztree.setting.async.url==null&&this.getUrl() != null){
			this._ztree.setting.async.enable = true;
			this._ztree.setting.async.url = this.getUrl();
			this._ztree.setting.async.type = this.getAsynctype();
			this._ztree.setting.async.dataType = this.getDataType();
			// 更改异步加载属性，需要刷新节点
			this.reAsyncChildNodes(null, "refresh");
		}
	},

	//选择实现
	afterRender : function() {
		//若设置只允许选择叶子节点，将非叶子节点选择功能禁用
		if (this.getIsSelLeafOnly == true) {
			var nodes = this._ztree.getNodesByParam("isParent", true);
			for ( var i = 0, l = nodes.length; i < l; i++) {
				this._ztree.setChkDisabled(nodes[i], true, false, false);
			}
		}
	},

	/**
	 * getData/setData 方法定义
	 */
	//----------必须实现----------
	getData : function() {
		return {
			
			name:this.getName(),
			
			themes:this.getThemes(),

			chkStyle:this.getChkStyle(),

			radioType:this.getRadioType(),

			url:this.getUrl(),

			asynctype:this.getAsynctype(),

			dataType:this.getDataType(),
			
			dataChecked:this.getDatachecked(),

			checkFlag:this.getCheckFlag(),
			
			datachildren:this.getDatachildren(),

			dataname:this.getDataname(),

			datatitle:this.getDatatitle(),
			
			dataurl:this.getDataurl(),

			datasimpledata:this.getDatasimpledata(),

			dataidKey:this.getDataidKey(),
			
			datapIdKey:this.getDatapIdKey(),
			
			datarootPId:this.getDatarootPId(),

			isSelLeafOnly:this.getIsSelLeafOnly(),

			isMultSelect:this.getIsMultSelect(),
			
			dblClickExpand:this.getDblClickExpand(),
			
			items:this.getItems()
		}
	},

	//----------必须实现----------
	setData : function(data) {
		if (!data) {
			return;
		}
		
		if(data.name) this.setName(data.name);
		
		if(data.themes) this.setThemes(data.themes );

		if(data.chkStyle) this.setChkStyle(data.chkStyle);

		if(data.radioType) this.setRadioType(data.radioType);

		if(data.url) this.setUrl(data.url);

		if(data.asynctype) this.setAsynctype(data.asynctype);

		if(data.dataType) this.setDataType(data.dataType);
		
		if(data.dataChecked) this.setDatachecked(data.dataChecked);

		if(data.checkFlag!=null) this.setCheckFlag(data.checkFlag);
		
		if(data.datachildren) this.setDatachildren(data.datachildren);

		if(data.dataname) this.setDataname(data.dataname);

		if(data.datatitle) this.setDatatitle(data.datatitle);
		
		if(data.dataurl) this.setDataurl(data.dataurl);

		if(data.datasimpledata!=null) this.setDatasimpledata(data.datasimpledata);

		if(data.dataidKey) this.setDataidKey(data.dataidKey);
		
		if(data.datapIdKey) this.setDatapIdKey(data.datapIdKey);
		
		if(data.datarootPId) this.setDatarootPId(data.datarootPId);

		if(data.isSelLeafOnly!=null) this.setIsSelLeafOnly(data.isSelLeafOnly);

		if(data.isMultSelect!=null) this.setIsMultSelect(data.isMultSelect);
		
		if(data.dblClickExpand!=null) this.setDblClickExpand(data.dblClickExpand);
		
		if(data.items) this.setItems(data.items);
	},
	/**
	 * 对外提供的方法
	 */
	//获取全部节点
	getAllNodes : function() {
		var nodes = this._ztree.getNodes();
		return nodes;
	},
	//获取选中节点（全部选中）
	getSelectedNodes : function() {
		var nodes = this._ztree.getSelectedNodes();
		return nodes;
	},
	//获取勾选节点(全部勾选)
	getCheckedNodes : function() {
		var nodes = this._ztree.getCheckedNodes(true);
		return nodes;
	},
	//勾选节点
	checkNode : function(treeNode, checked, checkTypeFlag, callbackFlag){
		this._ztree.checkNode(treeNode, checked, checkTypeFlag, callbackFlag);
	},
	//勾选全部节点
	checkAllNodes : function(checked) {
		if (checked == null) {
			checked = true;
		}
		this._ztree.checkAllNodes(checked);
	},
	//根据指定参数选中节点（标记符合条件的第一个节点）
	checkNodeByParam : function(key, value) {
		var node = this._ztree.getNodeByParam(key, value);
		if (node != null) {
			this._ztree.checkNode(node, true, false);//标记选中，勾选
			this._ztree.selectNode(node, false);// 选择
		}
	},
	//根据指定参数选中节点（标记符合条件的全部节点）
	checkNodesByParam : function(key, value) {
		var nodes = this._ztree.getNodeByParam(key, value);
		for ( var i = 0, l = nodes.length; i < l; i++) {
			this._ztree.checkNode(nodes[i], true, false, false);//勾选选中节点
			this._ztree.selectNode(node[i], false);// 选择
		}
	},
	//获取符合指定参数值的节点（标记符合条件的全部节点）
	getNodesByParam : function(key, name, parentNode) {
		var nodes = this._ztree.getNodesByParam(key, name, parentNode);
		return nodes;
	},
	//禁用 或 解禁 某个节点的 CheckBox/Radio[setting.check.enable = true 时有效]
	setChkDisabled : function(node, disable, inheritParent, inheritChildren) {
		//disable为true时禁止，否则解禁
		this._ztree.setChkDisabled(node, disable, inheritParent,
				inheritChildren);
	},
	//根据自定义规则搜索节点数据 JSON 对象集合 或 单个节点数据
	getNodesByFilter : function(filter, isSingle) {
		var nodes = this._ztree.getNodesByFilter(filter, isSingle);
		return nodes;
	},
	//展开全部节点
	expandAll : function() {
		this._ztree.expandAll(true);
	},
	//折叠全部节点
	collapseAll : function() {
		this._ztree.expandAll(false);
	},
	// 展开/折叠特定节点
	expandNode : function(treeNode, expandFlag, sonSign, focus, callbackFlag) {
		this._ztree.expandNode(treeNode, expandFlag, sonSign, focus,
				callbackFlag);
	},
	// 新增节点
	addNodes : function(parentNode, newNodes, isSilent) {
		this._ztree.addNodes(parentNode, newNodes, isSilent);
	},
	// 修改节点
	updateNode : function(treeNode, checkTypeFlag) {
		this._ztree.updateNode(treeNode, checkTypeFlag);
	},
	//强行异步加载父节点的子节点
	reAsyncChildNodes : function(parentNode, reloadType, isSilent) {
		this._ztree.reAsyncChildNodes(parentNode, reloadType, isSilent);
	},
	//----------自定义实现----------
	getOptions : function() {
		return {
			
			name:this.getName(),
			
			themes:this.getThemes(),

			chkStyle:this.getChkStyle(),

			radioType:this.getRadioType(),

			url:this.getUrl(),

			asynctype:this.getAsynctype(),

			dataType:this.getDataType(),
			
			dataChecked:this.getDatachecked(),

			checkFlag:this.getCheckFlag(),
			
			datachildren:this.getDatachildren(),

			dataname:this.getDataname(),

			datatitle:this.getDatatitle(),
			
			dataurl:this.getDataurl(),

			datasimpledata:this.getDatasimpledata(),

			dataidKey:this.getDataidKey(),
			
			datapIdKey:this.getDatapIdKey(),
			
			datarootPId:this.getDatarootPId(),

			isSelLeafOnly:this.getIsSelLeafOnly(),

			isMultSelect:this.getIsMultSelect(),
			
			dblClickExpand:this.getDblClickExpand(),
			
			items:this.getItems(),

			beforeExpand:this._beforeExpand,
			
			onExpand:this._onExpand,
			
			onClick: this._onClick,
			
			onCheck: this._onCheck
		}
	},

	//----------自定义实现(进行必要的校验和默认值设置)----------
	setOptions : function(data) {	
		if (!data) {
			return;
		}
		
		if(data.name) this.setName(data.name);
		
		if(data.themes) this.setThemes(data.themes );

		if(data.chkStyle) this.setChkStyle(data.chkStyle);

		if(data.radioType) this.setRadioType(data.radioType);

		if(data.url) this.setUrl(data.url);

		if(data.asynctype) this.setAsynctype(data.asynctype);

		if(data.dataType) this.setDataType(data.dataType);
		
		if(data.dataChecked) this.setDatachecked(data.dataChecked);

		if(data.checkFlag!=null) this.setCheckFlag(data.checkFlag);
		
		if(data.datachildren) this.setDatachildren(data.datachildren);

		if(data.dataname) this.setDataname(data.dataname);

		if(data.datatitle) this.setDatatitle(data.datatitle);
		
		if(data.dataurl) this.setDataurl(data.dataurl);

		if(data.datasimpledata!=null) this.setDatasimpledata(data.datasimpledata);

		if(data.dataidKey) this.setDataidKey(data.dataidKey);
		
		if(data.datapIdKey) this.setDatapIdKey(data.datapIdKey);
		
		if(data.datarootPId) this.setDatarootPId(data.datarootPId);

		if(data.isSelLeafOnly!=null) this.setIsSelLeafOnly(data.isSelLeafOnly);

		if(data.isMultSelect!=null) this.setIsMultSelect(data.isMultSelect);
		
		if(data.dblClickExpand!=null) this.setDblClickExpand(data.dblClickExpand);
		
		if(data.items) this.setItems(data.items);

		if(data.beforeExpand) this.beforeExpand(data.beforeExpand);
		
		if(data.onExpand) this.onExpand(data.onExpand);
		
		if(data.onClick){
			this.onClick(data.onClick);
		}else{
			var _this = this;
			this.onClick(function(event, treeId, treeNode) {
				event.stopPropagation();//不再派发事件
				var nodes = _this.getSelectedNodes();
				for ( var i = 0, l = nodes.length; i < l; i++) {
					_this.checkNode(nodes[i], true, false, false);//勾选选中节点
				}
			});
		}	
		if(data.onCheck) this.onCheck(data.onCheck);
	}
};