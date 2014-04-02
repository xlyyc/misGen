wof.bizWidget.VoucherGridComponent = function() {
	// 初始化监听消息
	this.setOnReceiveMessage([ {
		id : 'wof.bizWidget.DataObject_query',
		priority : 50,
		method : 'this._onQueryDataCompleted(message);'
	}, {
		id : 'wof.bizWidget.DataObject_add',
		priority : 50,
		method : 'this._onAddDataCompleted(message);'
	}, {
		id : 'wof.bizWidget.DataObject_update',
		priority : 50,
		method : 'this._onUpdateDataCompleted(message);'
	}, {
		id : 'wof.bizWidget.DataObject_delete',
		priority : 50,
		method : 'this._onDeleteDataCompleted(message);'
	}, {
		id : 'wof.bizWidget.DataObject_undelete',
		priority : 50,
		method : 'this._onUndeleteDataCompleted(message);'
	}, {
		id : 'wof.bizWidget.DataObject_save',
		priority : 50,
		method : 'this._onSaveDataCompleted(message);'
	}, {
		id : 'wof.functionWidget.DeleteRecordComponent_click',
		priority : 50,
		method : 'this._onDeleteRecordComponent_click(message)'
	}, {
		id : 'wof.functionWidget.AddRecordComponent_click',
		priority : 50,
		method : 'this._onAddRecordComponent_click(message)'
	}, {
		id : 'wof.functionWidget.UpdateRecordComponent_click',
		priority : 50,
		method : 'this._onUpdateRecordComponent_click(message)'
	}, {
		id : 'wof.functionWidget.CommitComponent_click',
		priority : 50,
		method : 'this._onCommitRecordComponent_click(message)'
	}, {
		id : 'wof.bizWidget.GridComponent_selectRow',
		priority : 50,
		method : 'this._onGridComponent_selectRow(message)'
	} ]);
};

wof.bizWidget.VoucherGridComponent.prototype = {

	_insideOnReceiveMessage : {
		"wof.widget.Grid_onToNext" : function(message) {
			this.nextPage();
			this.sendMessage('wof.bizWidget.GridComponent_ToNext');
		},
		"wof.widget.Grid_onToPrev" : function(message) {
			this.prevPage();
			this.sendMessage('wof.bizWidget.GridComponent_ToPrev');
		},
		"wof.widget.Grid_onToFirst" : function(message) {
			this.gotoPage(1);
			this.sendMessage('wof.bizWidget.GridComponent_ToFirst');
		},
		"wof.widget.Grid_onToLast" : function(message) {
			this.gotoPage(this.getTotalPage());
			this.sendMessage('wof.bizWidget.GridComponent_ToLast');
		},
		"wof.widget.Grid_onReload" : function(message) {
			this.gotoPage(this.getPageNo(), true);
			this.sendMessage('wof.bizWidget.GridComponent_OnReload');
		},
		"wof.widget.Grid_onSelectRow" : function(message) {
			this._currentSelectedRowIndex = message.sender.currentSelectedRowIndex;
			var gridData = this._getDataByIndex(this._currentSelectedRowIndex);
			this._currentSelectedRowData = gridData;
			if (gridData != null) {
				var idPro = this._getIdPro();
				this._currentRowId = gridData[idPro].value;
			}
			this.sendMessage('wof.bizWidget.GridComponent_selectRow');
		}
	},

	_onGridComponent_selectRow : function(message) {
		if (message.sender.componentId == this.getVoucherHeadComponent()) {
			this._currentMainRowId = message.sender.currentRowId;
			this.gotoPage(1, true);
		}
	},
	/**
	 * 设计时属性
	 */
	_name : null,
	_bindEntityId : null,
	_headerHeight : null,
	_rowHeight : null,
	_numberDisplay : null,
	_useMutiplePage : null,
	_rowsCount : null,
	_paramMaps : null,
	_voucherHeadComponent : null,

	setVoucherHeadComponent : function(voucherHeadComponent) {
		this._voucherHeadComponent = voucherHeadComponent;
	},
	getVoucherHeadComponent : function() {
		return this._voucherHeadComponent;
	},

	setName : function(name) {
		this._name = name;
	},
	getName : function() {
		return this._name;
	},
	getData : function() {
		return {};
	},
	setData : function() {

	},
	setBindEntityId : function(bindEntityId) {
		this._bindEntityId = bindEntityId;
	},
	getBindEntityId : function() {
		return this._bindEntityId;
	},
	setHeaderHeight : function(headerHeight) {
		this._headerHeight = headerHeight;
	},
	getHeaderHeight : function() {
		return this._headerHeight
	},
	setRowHeight : function(rowHeight) {
		this.rowHeight = rowHeight;
	},
	getRowHeight : function() {
		return this._rowHeight;
	},
	setNumberDisplay : function(numberDisplay) {
		this._numberDisplay = numberDisplay;
	},
	getNumberDisplay : function() {
		return this._numberDisplay;
	},
	setUseMutiplePage : function(useMutiplePage) {
		this._useMutiplePage = useMutiplePage;
	},
	getUseMutiplePage : function() {
		return this._useMutiplePage;
	},
	setRowsCount : function(rowsCount) {
		this.setPageSize(rowsCount);
	},
	getRowsCount : function() {
		return this.getPageSize();
	},
	setParamMaps : function(paramMaps) {
		this._paramMaps = paramMaps;
	},
	getParamMaps : function() {
		return this._paramMaps;
	},
	/**
	 * 子对象
	 */
	_columns : null,

	_pageBar : null,

	_footer : null, // TODO 设计时需要实现

	setColumns : function(columns) {
		this._columns = columns;
	},
	getColumns : function() {
		return this._columns;
	},
	updateColumnByIndex : function(data, columnIndex) {
		var column = this.getColumns[columnIndex];
		if (data.name) {
			column.name = data.name;
		}
		if (data.useMultiSelect) {
			column.useMultiSelect = data.useMultiSelect;
		}
		if (data.columnType) {
			column.columnType = data.columnType;
		}
		if (data.caption) {
			column.caption = data.caption;
		}
		if (data.columnType) {
			column.columnType = data.columnType;
		}
		if (data.columnWidth) {
			column.columnWidth = data.columnWidth;
		}
		if (data.columnType) {
			column.gridId = data.gridId;
		}
		if (data.bindDataField) {
			column.bindDataField = data.bindDataField;
		}
		if (data.display) {
			column.display = data.display;
		}
		if (data.isPin) {
			column.isPin = data.isPin;
		}
		if (data.dataTimeFormate) {
			column.dataTimeFormate = data.dataTimeFormate;
		}
		if (data.editor) {
			column.editor = data.editor;
		}
		if (data.picUrl) {
			column.picUrl = data.picUrl;
		}
		if (data.selectPattern) {
			column.selectPattern = data.selectPattern;
		}
		if (data.visbleType) {
			column.visbleType = data.visbleType;
		}
		if (data.readOnly) {
			column.readOnly = data.readOnly;
		}
		if (data.required) {
			column.required = data.required;
		}
		if (data.orderbyType) {
			column.orderbyType = data.orderbyType;
		}
		if (data.canSearch) {
			column.canSearch = data.canSearch;
		}
		if (data.length) {
			column.length = data.length;
		}
		if (data.min) {
			column.min = data.min;
		}
		if (data.max) {
			column.max = data.max;
		}
		if (data.intlength) {
			column.intlength = data.intlength;
		}
		if (data.scaleLength) {
			column.scaleLength = data.scaleLength;
		}
		if (data.regExp) {
			column.regExp = data.regExp;
		}
		if (data.refSearchCondition) {
			column.refSearchCondition = data.refSearchCondition;
		}
		if (data.checkErrorInfo) {
			column.checkErrorInfo = data.checkErrorInfo;
		}
		if (data.inkeForm) {
			column.inkeForm = data.inkeForm;
		}
	},
	updateColumnByName : function(data, columnName) {
		this.updateColumnByIndex(data, this._getColumnIndexByName(columnName));
	},
	_getColumnIndexByName : function(columName) {
		var index = -1;
		var columns = this.getColumns();
		for (var i = 0; i < columns.length; i++) {
			if (columns[i].name == columnName) {
				index = i;
				break;
			}
		}
		return index;
	},
	getGridColumnDataByIndex : function(index) {
		var column = this.getColumns()[index];
		return {
			"bindDataField" : column.bindDataField,
			"width" : column.columnWidth,
			"colNo" : index, // 列号 从1开始
			"name" : column.name,
			"caption" : column.caption,
			"sortable" : column.orderByType != 'none',
			"sortType" : column.orderByType,
			"sortFun" : column.sortFun,
			"align" : "center", // TODO 设计时需要实现
			"bold" : "true",// TODO 设计时需要实现
			"underline" : "true",// TODO 设计时需要实现
			"bgColor" : "#efefef",// TODO 设计时需要实现
			"font" : "宋体",// TODO 设计时需要实现
			"fontSize" : "max",// TODO 设计时需要实现
			"fontColor" : "black",// TODO 设计时需要实现
			"style" : "", // 自定义样式
			"adjustContent" : "true",
			"format" : {
				"name" : column.dataTimeFormat, // year年 yearMonth年月
				// yearMonthDay年月日
				// monthDay月日 url链接 percentage百分比
				// currency货币 number数字
				"param" : "short", // TODO 设计时需要实现 // 针对name定义的参数
				// 比如short表示为短日期格式
				// 再比如name为currency货币 param为US 表明是美元
				"functionName" : null
			// 自定义格式化函数名称(当没有对应预设格式的时候
			// 设置该自定义格式化函数)
			},
			"isPin" : column.isPin, // 是否锁定
			"display" : column.display, // 是否显示该列
			"type" : column.columnType, // string字符 number数字 time时间 date日期
			"visbleType" : column.visbleType, // number数字 text文本框 date日期
			// select下拉框
			"selectPattern" : column.selectPattern, // 下拉框类型 normal普通 tree树形
			// grid列表
			"required" : column.required, // 是否必填
			"readonly" : column.readOnly, // 是否只读
			"verifyFunctionName" : null, // TODO 设计时需要实现 //自定义校验回调函数名称
			"verifyErrorInfo" : column.checkErrorInfo
		// 验证错误信息提示
		}
	},
	getGridColumnsData : function() {
		var columns = this.getColumns();
		var columnsData = [];
		for (var i = 0; i < columns.length; i++) {
			var columnData = this.getGridColumnDataByIndex(i);
			columnsData.push(columnData);
		}
		return columnsData;
	},
	setPageBar : function(pageBar) {
		this._pageBar = pageBar;
	},
	getPageBar : function() {
		return this._pageBar;
	},
	getPageSize : function() {
		return this.getPageBar().pageSize;
	},
	setPageSize : function(pageSize) {
		return this.getPageBar().pageSize = pageSize;
	},
	getPageNo : function() {
		return this.getPageBar().pageNo;
	},
	setPageNo : function(pageNo) {
		this.getPageBar().pageNo = pageNo;
	},
	/**
	 * TODO 暂时用不到
	 */
	_activeColumnIndex : null,
	_callStr : null,
	_initActionName : null,
	/**
	 * 运行时属性
	 */
	_pageId : null,
	_themes : null,
	_mode : null, // 显示还是编辑模式， view 或 edit
	_dataSourceType : null,
	_dataSource : null,
	_gridId : null,
	_cachePageNo : null,
	_gridData : null,
	_currentRow : null,
	_currentRowId : null,
	_grid : null,

	_currentSelectedRowIndex : null,

	_currentSelectedRowData : null,

	getCurrentSelectedRowIndex : function() {
		return this._currentSelectedRowIndex;
	},
	getCurrentSelectedRowData : function() {
		return this._currentSelectedRowData;
	},
	getCurrentRowId : function() {
		return this._currentRowId;
	},
	setCurrentRow : function(currentRow) {
		this._currentRow = currentRow;
	},
	reload : function(mode) {
		if (!mode) {
			mode = 'currentPage';
		}
		switch (mode) {
		case 'currentPage':
			this.gotoPage(this.getPageNo(), true);
			break;
		case 'firstPage':
			this.gotoPage(1, true);
			break;
		case 'lastPage':
			this.gotoPage(this.getTotalPage(), true);
			break;
		}
	},
	getPageId : function() {
		return this._pageId;
	},
	setPageId : function(pageId) {
		this._pageId = pageId;
	},
	getThemes : function() {
		return this._themes;
	},
	setThemes : function(themes) {
		this._themes = themes;
	},
	getMode : function() {
		return this._mode;
	},
	setMode : function(mode) {
		this._mode = mode;
	},
	getDataSourceType : function() {
		return this._dataSourceType;
	},
	setDataSourceType : function(dataSourceType) {
		this._dataSourceType = dataSourceType;
	},
	getDataSource : function() {
		return this._dataSource;
	},
	setDataSource : function(dataSource) {
		this._dataSource = dataSource;
	},
	getGridData : function() {
		return this._gridData;
	},
	setGridData : function(gridData) {
		this._gridData = gridData;
	},
	getCheckedRows : function() {
		var rows = this.grid.getSelectedRows();
		var gridData = this.getGridData();
		var selectedRows = [];
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			var data = gridData[row].data;
			selectedRows.push(data);
		}
		return selectedRows;
	},
	/**
	 * 初始化
	 */
	_init : function(data) {
		this.setPageBar({
			"pageNo" : 1,
			"pageSize" : 10
		});
		this.setRowsCount(10);
		this.setColumns([]);
		this.setMode('view');
		this.setNumberDisplay(true);
		this.updateVoucherGridComponent(data);
		this.setRefData(this.getDataSource().getRefData());
	},
	beforeRender : function() {

	},
	initRender : function() {
		var that = this;
		var objs = wof$.find('*');
		for (var i = 0; i < objs.size(); i++) {
			var obj = objs.get(i);
			if (obj != null && obj.getComponentId() != null
					&& obj.getComponentId() == this.getVoucherHeadComponent()) {
				this._bindComponent = obj;
				break;
			}
		}
		this.setRefData(this.getRefData());
		this.gotoPage(this.getPageNo());
	},
	render : function() {
		if (!this.grid) {
			var that = this;
			this.grid = wof$.create('Grid', {
				width : this.getWidth(),
				height : this.getHeight(),
				top : this.getTop(),
				left : this.getLeft(),
				isHide : this.getHiden(),
				name : this.getName(),
				bindEntityId : this.getBindEntityId(),
				headerHeight : this.getHeaderHeight(),
				rowHeight : this.getRowHeight(),
				numberDisplay : this.getNumberDisplay(),
				useMutiplePage : this.getUseMutiplePage(),
				columns : this.getGridColumnsData(),
				total : this.getPageBar().total,
				page : this.getPageBar().pageNo,
				pageSize : this.getPageBar().pageSize,
				data : this.getGridData(),
				refData : this.getRefData()
			});
			this.grid.setIsInside(true);
		}
		var grid = this.grid;
		grid.setTitle(this.getName());
		grid.setWidth(800);
		grid.setHeight(600);
		grid.setCheckbox(true);
		grid.setPage(this.getPageNo());
		grid.setPageSize(this.getPageSize());
		grid.setGridData(this.getGridData());
		grid.setTotal(this.getPageBar().total);
		grid.render();
		grid.appendTo(this);
	},
	nextPage : function() {
		var pageNo = this.getPageNo();
		var totalPage = this.getTotalPage();
		if (pageNo >= totalPage) {
			alert('没有下页'); // todo 调用widget下的对话框
			return;
		}
		pageNo++;
		this.gotoPage(pageNo);
	},
	prevPage : function() {
		var pageNo = this.getPageNo();
		if (pageNo <= 1) {
			alert('没有上页'); // todo 调用widget下的对话框
			return;
		}
		pageNo--;
		this.gotoPage(pageNo);
	},
	/**
	 * 如果pageNo落在当前缓存中 直接从缓存载入数据 如果pageNo不在缓存中 则需要发起新的查询(此查询将修改相关数据和属性)
	 * 
	 */
	gotoPage : function(pageNo, forceFlush) {
		if (pageNo != 1) {
			if (pageNo <= 0 || pageNo > this.getTotalPage()) {
				alert(pageNo + '页号不存在'); // todo 调用widget下的对话框
				return;
			}
		}
		var currentRow = this.getCurrentMainRowId();
		this.setPageNo(pageNo);
		// 表明pageNo不在缓存中需要发起新的查询或者强制加载数据
		if (true == forceFlush || null == this._getPageDataInCache(pageNo)) {
			var offset = (pageNo - 1) * this.getPageSize();
			var rowsCount = this.getPageSize() * 2;
			var dataSource = this.getDataSource();
			dataSource.queryData('child', {
				'childEntityAlias' : this.getBindEntityId(),
				'mainRowId' : currentRow
			}, null, offset, rowsCount);
		} else {
			this.setGridData(this._getPageDataInCache(this.getPageNo()));
		}
		this.render();
	},
	getCurrentMainRowId : function() {
		var currentRow = this._currentMainRowId
				|| this._bindComponent.getCurrentRowId();
		if (!currentRow) {
			return;
		}
		return currentRow;
	},
	// 从缓存中获得指定页的数据
	_getPageDataInCache : function(pageNo) {
		if (this._isPageDataInCache(pageNo) == -1) {
			return null;
		}
		var currentMainRowId = this.getCurrentMainRowId();
		var data = [];
		var cachePageNo = this.getCachePageNo();
		var offset = (cachePageNo[0] == pageNo) ? 0 : this.getPageSize();
		var cacheData = this.getDataSource().getLocalData({
			'childEntityAlias' : this.getBindEntityId(),
			'mainRowId' : currentMainRowId
		});
		if (cacheData) {
			var rows = cacheData.rows;
			// end为指定页数据的结束下标位置(下标从0开始)
			var end = ((offset + this.getPageSize()) < rows.length ? (offset + this
					.getPageSize())
					: rows.length) - 1;
			for (var i = offset; i <= end; i++) {
				data.push(rows[i]);
			}
		}
		return data;
	},
	getDataSource : function() {
		if (this.getDataSourceType() == 'do') {
			return this.getDo();
		}
		return null;
	},
	_onAddRecordComponent_click : function(message) {
		var bindComponentId = message.sender.bindComponents;
		if (bindComponentId == this.getComponentId()) {
			if (this.getCurrentMainRowId() != null) {
				this.addRow();
			} else {
				alert('未选择数据 ！')
			}
		}
	},
	_onDeleteRecordComponent_click : function(message) {
		var bindComponentId = message.sender.bindComponents;
		if (bindComponentId == this.getComponentId()) {
			var selectedRows = this.getCheckedRows();
			if (!selectedRows || selectedRows.length == 0) {
				alert('请选择!');
				return;
			}
			this.deleteRow(selectedRows);
		}
	},
	_onUpdateRecordComponent_click : function(message) {
		var bindComponentId = message.sender.bindComponents;
		if (bindComponentId == this.getComponentId()) {
			var selectedRows = this.getCheckedRows();
			if (!selectedRows || selectedRows.length == 0) {
				alert('请选择!');
				return;
			}
			if (selectedRows.length > 1) {
				alert('请选择一条记录修改!')
				return;
			}
			this.grid.updateRow();
		}
	},
	_onCommitRecordComponent_click : function(message) {
		var bindComponentId = message.sender.bindComponents;
		if (bindComponentId == this.getComponentId()) {
			this.commitRow();
		}
	},
	/**
	 * "JZGJBXXB.361974512142520320.jtcychild" 查询完成后 将触发此函数
	 */
	_onQueryDataCompleted : function(message) {
		if (this._isDataChange(message)) {
			this.setCachePageNo([ this.getPageNo(), this.getPageNo() + 1 ]);
			var data = this._getPageDataInCache(this.getPageNo());
			if (data && data.length) {
				var dataSource = this.getDataSource();
				var total = dataSource.getLocalOriginalData({
					'childEntityAlias' : this.getBindEntityId(),
					'mainRowId' : this.getCurrentMainRowId()
				}).totalCount;
				var pageBar = this.getPageBar();
				pageBar.total = parseInt(total);
				this.setPageBar(pageBar);
			} else {
				var pageBar = this.getPageBar();
				pageBar.total = 0;
			}
			this.setGridData(data);
		}
	},
	_onAddDataCompleted : function(message) {
		if (this._isDataChange(message)) {
			this.gotoPage(this.getPageNo());
		}
	},
	_onUpdateDataCompleted : function(message) {
		if (this._isDataChange(message)) {
			// this.gotoPage(this.getPageNo());
		}
	},
	_onDeleteDataCompleted : function(message) {
		if (this._isDataChange(message)) {
			this.gotoPage(this.getPageNo());
		}
	},
	_onUndeleteDataCompleted : function(message) {
		if (this._isDataChange(message)) {
			this.gotoPage(this.getPageNo());
		}
	},
	_onSaveDataCompleted : function(message) {
		if (this._isDataChange(message)) {
			this.gotoPage(1, true);
		}
	},

	_getIdPro : function() {
		return this.getDataSource().getLocalOriginalData({
			'childEntityAlias' : this.getBindEntityId(),
			'mainRowId' : this.getCurrentMainRowId()
		}).idPro;
	},
	_getDataByIndex : function(index) {
		var gridData = this.getGridData();
		if (typeof index == 'string') {
			index = parseInt(index);
		}
		if (index >= gridData.length) {
			return null;
		}
		return gridData[index].data;

	},

	_isDataChange : function(message) {
		var flag = false;
		for (var i = 0; i < message.data.length; i++) {
			// "JZGJBXXB.361974512142520320.jtcychild"
			if (message.data[i].indexOf(this.getBindEntityId()) != -1) {
				flag = true;
				break;
			}
		}
		return flag;
	},

	/**
	 * pageNo页面中的数据是否在缓存中索引， -1代表不在。
	 */
	_isPageDataInCache : function(pageNo) {
		var index = -1;
		var cachePageNo = this.getCachePageNo();
		if (cachePageNo) {
			for (var i = 0; i < cachePageNo.length; i++) {
				if (cachePageNo[i] == pageNo) {
					index = i;
					break;
				}
			}
		}
		return index;
	},
	/**
	 * 获取总页数
	 * 
	 * @returns {Number}
	 */
	getTotalPage : function() {
		var total = parseInt(this.getPageBar().total);
		return parseInt(total % this.getPageSize() == 0 ? total
				/ this.getPageSize() : total / this.getPageSize() + 1);
	},
	getColumnDisplay : function(columnName) {
		var index = _getColumnIndexByColumnName(columnName);
		return this.getColumns()[index].display;
	},
	setColumnDisplay : function(columnName, display) {
		var index = _getColumnIndexByColumnName(columnName);
		this.getColumns()[index].display = display;
	},
	_getColumnIndexByColumnName : function(columnName) {
		var index = -1;
		var columns = this.getColumns();
		for (var i = 0; i < columns.length; i++) {
			if (columns[i].name == columnName) {
				index = i;
				break;
			}
		}
		return index;
	},
	deleteColumnByName : function(columnName) {
		var index = this._getColumnIndexByColumnName();
		if (index >= 0) {
			var columns = this.getColumns();
			this.setColumns(columns.slice(0, index - 1).concat(
					columns.slice(index, columns.length)));
		}
	},
	addColumnByIndex : function(columnIndex, columnData) {
		var columns = this.getColumns();
		if (columnIndex < 0) {
			columns.unshift(columnData);
		} else if (columnIndex > columns.length - 1) {
			columns.push(columnData);
		} else {
			var front = columns.slice(0, columnIndex - 1);
			front.push(columnData);
			this.setColumns(front.concat(columns.clice(columnIndex + 1,
					columns.length)));
		}
	},
	moveColumn : function(sourceIndex, targetIndex) {
		var columns = this.getColumns();
		var sourceColumn = jQuery.extend(true, {}, columns[sourceIndex]);
		columns[sourceIndex] = columns[targetIndex];
		columns[targetIndex] = sourceColumn;
	},
	getGridId : function() {
		return this.getId();
	},
	setRefData : function(refData) {
		this._refData = refData;
	},
	getPageId : function() {
		return this._pageId;
	},
	setPageId : function(pageId) {
		this._pageId = pageId;
	},
	getRefData : function() {
		return this._refData;
	},
	setCellValue : function(columnName, rowIndex, value) {
		if (value !== undefined) {
			var gridData = this.getGridData();
			try {
				var data = gridData[rowIndex];
				data.data[columnName].value = value;
				return true;
			} catch (e) {
				return false;
			}
		}
	},
	getCellValue : function(columnName, rowIndex) {
		var gridData = this.getGridData();
		try {
			var data = gridData[rowIndex];
			return data.data[columnName].value;
		} catch (e) {
			return null;
		}
	},
	getCachePageNo : function() {
		return this._cachePageNo;
	},
	setCachePageNo : function(cachePageNo) {
		this._cachePageNo = cachePageNo;
	},
	getColumns : function() {
		return this._columns;
	},
	setDo : function(dataObject) {
		this._dataObject = dataObject;
	},
	getDo : function() {
		return this._dataObject;
	},
	getTotalRecord : function() {
		return this._totalRecord;
	},
	getBindEntityId : function() {
		return this._bindEntityId;
	},
	setBindEntityId : function(bindEntityId) {
		this._bindEntityId = bindEntityId;
	},
	setTotalRecord : function() {
		return this._totalRecord;
	},
	getPageSize : function() {
		return this.getPageBar().pageSize;
	},
	setPageSize : function(pageSize) {
		return this.getPageBar().pageSize = pageSize;
	},
	getPageNo : function() {
		return this.getPageBar().pageNo;
	},
	setPageNo : function(pageNo) {
		this.getPageBar().pageNo = pageNo;
	},
	refreshGridData : function() {
		this.gotoPage(this.getPageNo(), true);
		$(this).trigger('afterRefreshData', {});
	},
	setDataObject : function(dataObject) {
		this._dataObject = dataObject;
	},
	getDataObject : function() {
		return this._dataObject;
	},
	addRow : function(data) {
		// this.getDataSource().addData(data);
		this.grid.addRow(data, {
			'childEntityAlias' : this.getBindEntityId(),
			'mainRowId' : this.getCurrentMainRowId()
		});
	},
	deleteRow : function(data) {

		var array = [];
		for (var i = 0; i < data.length; i++) {
			var obj = {};
			var d = data[i];
			for ( var attr in d) {
				obj[attr] = d[attr].value;
			}
			array.push(obj);
		}

		this.getDataSource().deleteData(array, {
			'childEntityAlias' : this.getBindEntityId(),
			'mainRowId' : this.getCurrentMainRowId()
		});
	},
	updateRow : function(data) {
		this.getDataSource().updateData(data, {
			'childEntityAlias' : this.getBindEntityId(),
			'mainRowId' : this.getCurrentMainRowId()
		});
	},
	commitRow : function() {

		var map = new wof.util.Hashtable();
		var columns = this.getColumns();
		for (var i = 0; i < columns.length; i++) {
			var column = columns[i];
			if (column.bindDataField) {
				map.add(column.bindDataField, column);
			}
		}

		var currentData = this.grid.getCurrentData();
		var gridData = this.getGridData();
		var updateData = [];
		for (var i = 0; i < currentData.length; i++) {
			var data = currentData[i];
			if (i < gridData.length) {
				var originalData = gridData[i].data;
				for ( var d in data) {
					var value = data[d];
					var column = map.items(d);
					var message = this.validate(value, column);
					if (true != message) {
						alert(message);
						return;
					}
					originalData[d] = value;
				}
				updateData.push(originalData);
			}
		}

		var addData = this.grid.getCurrentAddData();
		for (var i = 0; i < addData.length; i++) {
			var row = addData[i]
			for ( var prop in row) {
				var column = map.items(prop);
				if (column) {
					var message = this.validate(row[prop], column);
					if (true != message) {
						alert(message);
						return;
					}
				}

			}
		}
		this.getDataSource().addData(addData, {
			'childEntityAlias' : this.getBindEntityId(),
			'mainRowId' : this.getCurrentMainRowId()
		});
		this.getDataSource().updateData(updateData, {
			'childEntityAlias' : this.getBindEntityId(),
			'mainRowId' : this.getCurrentMainRowId()
		});
	},
	validate : function(value, columnDef) {
		var result = true;
		var rule = '[';
		if (columnDef.required) {
			rule += 'required,';
		}
		if (columnDef.max) {
			rule += 'maxValue,';
		}
		if (columnDef.min) {
			rule += 'minValue,';
		}
		if (columnDef.length) {
			rule += 'length,'
		}
		if (rule.length > 1) {
			rule = rule.substring(0, rule.length - 1);
			rule += ']';
		}
		result = emap_validate.doValidate(value, '' + rule + '');
		return result;
	},
	undeleteData : function() {
		this.getDataSource().undeleteData();
	},
	saveData : function() {
		this.getDataSource().saveData();
	},
	// 事件
	/**
	 * 
	 * @param data
	 *            data.newSize 改变后大小 data.oldSize 改变前大小
	 */
	onResize : function(data) {

	},
	/**
	 * 列表刷新
	 */
	onRefreshData : function() {

	},
	/**
	 * 添加一行之后
	 * 
	 * @param rowData
	 */
	afterAddRow : function(data) {

	},
	/**
	 * 删除一行之后
	 * 
	 * @param rowData
	 */
	afterDeleteRow : function(data) {

	},
	/**
	 * 
	 * @param data
	 *            data.columnData data.newIndex data.oldIndex
	 */
	onColumnMove : function(data) {

	},
	/**
	 * 
	 * @param data
	 *            data.Rank 行列号 data.newValue 改变后的值 data.oldValue 改变前的值
	 */
	onCellValueChange : function(data) {

	},
	/**
	 * 设置属性
	 */
	updateVoucherGridComponent : function(options) {
		if (!options) {
			return;
		}
		if (options.height) {
			this.setHeight(options.height);
		}
		if (options.width) {
			this.setWidth(options.width);
		}
		if (options.title) {
			this.setTitle(options.title);
		}
		if (options.themes) {
			this.setThemes(options.themes);
		}
		if (options.dataSourceType) {
			this.setDataSourceType(options.dataSourceType);
		}
		if (options.numberDisplay) {
			this.setNumberDisplay(options.numberDisplay);
		}
		if (options.headHeight) {
			this.setHeadHeight(options.headHeight);
		}
		if (options.rowHeight) {
			this.setRowHeight(options.rowHeight);
		}
		if (options.editor) {
			this.setEditor(options.editor);
		}
		if (options.columns) {
			this.setColumns(options.columns);
		}
		if (options.rows) {
			this.setRows(options.rows);
		}
		if (options.cells) {
			this.setCells(options.cells);
		}
		if (options.header) {
			this.setHeader(options.header);
		}
		if (options.footer) {
			this.setFooter(options.footer);
		}
		if (options.pageBar) {
			this.setPageBar(options.PageBar);
		}
		if (options.dataObject) {
			this.setDo(options.dataObject);
		}
		if (options.bindEntityId) {
			this.setBindEntityId(options.bindEntityId);
		}
		if (options.pageId) {
			this.setPageId(options.pageId);
		}
		if (options.componentId) {
			this.setComponentId(options.componentId)
		}
		if (options.currentRow) {
			this.setCurrentRow(options.currentRow)
		}
		if (options.voucherHeadComponent) {
			this.setVoucherHeadComponent(options.voucherHeadComponent)
		}

	}
}