wof.widget.Grid = function() {
	this._version = '1.0';
};

wof.widget.Grid.prototype = {
	_title : null,  //标题
	_checkbox : false,  // 是否显示checkbox列
	_headerRowHeight : null,  // 表头高度
	_rowHeight : null,// 行高
	_columnWidth : null,// 列宽
	_gridUrl : null,  //TODO 没实现
	_gridData : null,// 数据
	_usePage : true, // 是否显示分页
	_page : 1,   //当前页
	_pageSize : 20,//每页显示几条
	_total : null,// 共几条
	_pageSizeOptions : [ 10, 20, 30, 40, 50 ],//没页显示几条选项
	_pageMsg : "显示记录从{from}到{to}，总数 {total} 条 。每页显示记录数：{pagesize}",// 分页条模板
	_params : [],  // URL中的参数
	_loadingMsg : "正在加载数据，请稍候…", // 加载时tip
	_emptyMsg : "没有数据",// 没数据时显示的信息
	_errorMsg : "出错",  // 加载出错显示的信息
	_columns : [], // 列定义
	_onAfterEdit : null,  // 编辑之后
	_onBeforeEdit : null,  // 编辑之前
	_onReload : null,  // 重新加载数据
	_onToFirst : null,  // 第一页
	_onToPrev : null,  // 上一页
	_onToNext : null,  // 下一页
	_onToLast : null, // 最后一页
	_onSelectRow : null, // 选择一行
	_onUnSelectRow : null, // 取消选择一行
	_onBeforeCheckRow : null,//选中一行之前
	_onCheckRow : null,//选中一行
	_onDblClickRow : null,//双击一行
	_onBeforeCheckAllRow : null,// 全部选中之前
	_onCheckAllRow : null,// 全部选中
	_addRow : null,  // 添加一行
	_deleteRow : null,//删除一行
	_getGridData : null,//获取数据
	_setGridData : null,// 设计数据
	_getSelectedRow : null, // 获取选择的行
	_getSelectedRowObj : null,// 获取选择的行对象
	_refData : null,// 参照数据
	_grid : null, //  内部 grid对象
	
	_currentSelectedRowIndex:null,
	_currentSelectedRowData:null,
	_state:null,
	getState : function() {
		return this._state;
	},
	setState : function(state) {
		this._state = state;
	},
	getRefData : function() {
		return this._refData;
	},

	setRefData : function(refData) {
		this._refData = refData;
	},
	getTitle : function() {
		return this._title;
	},

	setTitle : function(title) {
		this._title = title;
	},

	setCheckbox : function(checkbox) {
		this._checkbox = checkbox;
	},

	getCheckbox : function() {
		return this._checkbox;
	},

	setHeaderRowHeight : function(headerRowHeight) {
		this._headerRowHeight = headerRowHeight;
	},

	getHeaderRowHeight : function() {
		return this._headerRowHeight;
	},

	setRowHeight : function(rowHeight) {
		this._rowHeight = rowHeight;
	},

	getRowHeight : function() {
		return this._rowHeight;
	},

	setColumnWidth : function(columnWidth) {
		this._columnWidth = columnWidth;
	},

	getColumnWidth : function() {
		return this._columnWidth;
	},

	setGridUrl : function(gridUrl) {
		this._gridUrl = gridUrl;
	},

	getTotal : function() {
		return this._total || 0;
	},

	setTotal : function(total) {
		this._total = total;
	},

	getGridUrl : function() {
		return this._gridUrl;
	},

	setGridData : function(gridData) {
		this._gridData = gridData;
	},

	getGridData : function() {
		return this._gridData;
	},

	setUsePage : function(usePage) {
		this._usePage = usePage;
	},

	getUsePage : function() {
		return this._usePage;
	},

	setPage : function(page) {
		this._page = page;
	},

	getPage : function() {
		return this._page;
	},

	setPageSize : function(pageSize) {
		this._pageSize = pageSize;
	},

	getPageSize : function() {
		return this._pageSize;
	},

	setPageSizeOptions : function(pageSizeOptions) {
		this._pageSizeOptions = pageSizeOptions;
	},

	getPageSizeOptions : function() {
		return this._pageSizeOptions;
	},

	setPageMsg : function(pageMsg) {
		this._pageMsg = pageMsg;
	},

	getPageMsg : function() {
		return this._pageMsg;
	},

	setParams : function(params) {
		this._params = params;
	},

	getParams : function() {
		return this._params;
	},

	setLoadingMsg : function(loadingMsg) {
		this._loadingMsg = loadingMsg;
	},

	getLoadingMsg : function() {
		return this._loadingMsg;
	},

	setEmptyMsg : function(emptyMsg) {
		this._emptyMsg = emptyMsg;
	},

	getEmptyMsg : function() {
		return this._emptyMsg;
	},

	setErrorMsg : function(errorMsg) {
		this._errorMsg = errorMsg;
	},

	getErrorMsg : function() {
		return this._errorMsg;
	},

	setColumns : function(columns) {
		this._columns = columns;
	},

	getColumns : function() {
		return this._columns;
	},

	setColumns : function(columns) {
		this._columns = columns;
	},
	/**
	 * 初始化方法
	 */
	_init : function(data) {
		if(data.width){
			this.setWidth(data.width);
		}
		if(data.height){
			this.setHeight(data.height);
		}
		if(data.name){
			this.setTitle(data.name);
		}
		if (data.checkbox) {
			this.setCheckbox(data.checkbox);
		}
		if (data.data) {
			this.setGridData(data.data);
		}
		if (data.columns) {
			this.setColumns(data.columns);
		}
		if (data.total) {
			this.setTotal(data.total);
		}
		if (data.page) {
			this.setPage(data.page)
		}
		if (data.pageSize) {
			this.setPageSize(data.pageSize);
		}
		if (data.onToNext) {
			this.onToNext = data.onToNext;
		}
		if (data.onToPrev) {
			this.onToPrev = data.onToPrev;
		}
		if (data.onToFirst) {
			this.onToFirst = data.onToFirst;
		}
		if (data.onToLast) {
			this.onToLast = data.onToLast;
		}
		if(data.onReload){
			this.onReload = data.onReload;
		}
		if (data.refData) {
			this.setRefData(data.refData);
		}
		if(data.onSelectRow){
			this.onSelectRow = data.onSelectRow;
		}
	},
	addRow : function() {
		this._grid.addRow();
	},
	getCurrentData : function() {
		return this._grid.getCurrentData();
	},
	getCurrentAddData : function() {
		return this._grid.getCurrentData();
	},
	getSelectedRows : function() {
		var rows = this._grid.getSelectedRows();
		return rows;
	},
	updateRow : function() {
		this._grid.updateRow();
	},
	/**
	 * 初始化渲染方法 仅在第一次调用render时执行
	 */
	_initRender : function() {

	},

	// 渲染前处理方法
	_beforeRender : function() {

	},

	// 渲染方法
	render : function() {
		var that = this;
		if (this._grid) {
			this._grid.remove(true);
		}
		
		 var ss = {
					title : this.getTitle(),
					checkbox : this.getCheckbox(),
					columns : this.getColumns(),
					data : this.getGridData(),
					useClientPage : true,
					width : this.getWidth(),
					height : this.getHeight(),
					isScroll : false,
					onCheckRow : this.onCheckRow,
					enabledEdit : true,
					dblClickToEdit : true,
					pageSize : this.getPageSize(),
					page : this.getPage(),
					refData : this.getRefData(),
					total : this.getTotal(),
					onToNext : function() {
						that.sendMessage('wof.widget.Grid_onToNext');
					},
					onToPrev : function() {
						that.sendMessage('wof.widget.Grid_onToPrev');
					},
					onToFirst : function() {
						that.sendMessage('wof.widget.Grid_onToFirst');
					},
					onToLast : function() {
						that.sendMessage('wof.widget.Grid_onToLast');
					},
					onSelectRow : function (data,index){
						that._currentSelectedRowIndex = index;
						that._currentSelectedRowData = data;
						that.sendMessage('wof.widget.Grid_onSelectRow');
					},
					onReload : function (){
						that.sendMessage('wof.widget.Grid_reload');
					}
				};
		this._grid = wis$.create('Grid', {
			title : this.getTitle(),
			checkbox : this.getCheckbox(),
			columns : this.getColumns(),
			data : this.getGridData(),
			useClientPage : true,
			width : this.getWidth(),
			height : this.getHeight(),
			isScroll : false,
			onCheckRow : this.onCheckRow,
			enabledEdit : true,
			dblClickToEdit : true,
			pageSize : this.getPageSize(),
			page : this.getPage(),
			refData : this.getRefData(),
			total : this.getTotal(),
			onToNext : function() {
				that.sendMessage('wof.widget.Grid_onToNext');
			},
			onToPrev : function() {
				that.sendMessage('wof.widget.Grid_onToPrev');
			},
			onToFirst : function() {
				that.sendMessage('wof.widget.Grid_onToFirst');
			},
			onToLast : function() {
				that.sendMessage('wof.widget.Grid_onToLast');
			},
			onSelectRow : function (data,index){
				that._currentSelectedRowIndex = index;
				that._currentSelectedRowData = data;
				that.sendMessage('wof.widget.Grid_onSelectRow');
			},
			onReload : function (){
				that.sendMessage('wof.widget.Grid_reload');
			}
		});
		this._grid.appendTo(this.getDomInstance());
		this._grid.render();
	},
	// 渲染后处理方法
	_afterRender : function() {
		
	},
	getCurrentSelectedRowIndex:function (){
		return this._currentSelectedRowIndex;
	},
	getCurrentSelectedRowData:function (){
		return this._currentSelectedRowData;
	},
	// ----------必须实现----------
	getData : function() {
		return {
			currentSelectedRowIndex : this.getCurrentSelectedRowIndex(),
			currentSelectedRowData : this.getCurrentSelectedRowData()
		};
	},

	// ----------必须实现----------
	setData : function(data) {
		this.setCid(data.cid);
	} 

};