/**
 * author : qsyan01@wisedu.com
 */
(function ($) {

    $.widget("ui.grid", {
        options: {
            title: null,   // 标题
            displayTitle: true,  // 是否显示标题
            url: null,
            gridData: null,
            mode: 'edit',  // view 显示模式，edit 编辑模式
            pageSize: 10,
            totalRecord: null,
            pageNo: 1,
            columns: null,
            width: 400,  // 单位 px
            height: 200, // height = title + pageBarHeight + grid
            pageBarHeight: 20,
            headHeight: 20,
            rowHeight: 20,
            usePage: true,  // 是否显示分页
            useCheckColumn: true, //  是否显示选择列
            activeRowIndex: null,   // 选中的行索引。
            checkedRowIndex: [],    // 选中的checkbox列索引。
            addedRow: [],
            deletedRow: [],
            updatedRow: [],
            onNextPage: null,
            onPrevPage: null,
            onFirstPage: null,
            onLastPage: null,
            onPageSizeChange: null,
            onSelectRow: null,
            onUnselectRow: null,
            onCheckRow: null,
            onReload: null, //TODO
            onChangeCellValue: null,
            onClickCell: null,
            afterAddColumn: null, //TODO
            afterDeleteColumn: null, //TODO
            _afterRender: null,
            onSortColumn: null //TODO
        },
        getData: function () {
            return {
                title: this.title,
                url: this.url,
                gridData: this.gridData,
                mode: this.mode,
                pageSize: this.pageSize
            };
        },
        setData: function (data) {
            if (data.gridData) {
                this.options.gridData = data.gridData;
            }
            if (data.activeRowIndex || data.activeRowIndex === 0) {
                this.options.activeRowIndex = data.activeRowIndex;
            }
            if (data.mode) {
                this.options.mode = data.mode;
            }
        },
        selectRow: function (rowIndex) {
            if (rowIndex != null) {
                this.unselectRow();
                var tr = $('.grid_main', this.element).find('tr').not(':first');
                $(tr[rowIndex]).addClass('grid_selectRow');
                var fixColumn = $('.grid_fix_column', this.element).find('tr').not(':first');
                $(fixColumn[rowIndex]).addClass('grid_selectRow');
                this.options.activeRowIndex = rowIndex;
                this._trigger('onSelectRow', null, this.getSelectedRowData());
            }
        },
        unselectRow: function () {
            if (this.options.activeRowIndex != null) {
                this._trigger('onUnselectRow', null, {data: this.getSelectedRowData()});
                this.options.activeRowIndex = null;
                $('.grid_selectRow', this.element).removeClass('grid_selectRow');
            }
        },
        _checkRow: function (rowIndexArray, isCheck) {
            if (this.options.useCheckColumn) {
                var check = $('.grid_fix_column', this.element).find('.grid_checkColumn').find('input');
                if (rowIndexArray) {
                    for (var i = 0; i < rowIndexArray.length; i++) {
                        var rowIndex = rowIndexArray[i];
                        $(check[rowIndex]).prop('checked', isCheck ? true : false);
                    }
                } else {
                    check.prop('checked', isCheck ? true : false);
                }
                var that = this;
                this.options.checkedRowIndex = [];
                $('.grid_fix_column', this.element).find('.grid_checkColumn').find('input:checked').each(function () {
                    var index = $(this).closest('tr').data('_index');
                    that.options.checkedRowIndex.push(index);
                });

                that._trigger('onCheckRow', null, {data: that.getCheckedRowData()});
            }
        },
        checkRow: function (index) {
            this._checkRow([index], true);
        },
        uncheckRow: function (index) {
            this._checkRow([index], false);
        },
        checkAllRow: function () {
            this._checkRow(null, true);
        },
        uncheckAllRow: function () {
            this._checkRow(null, false);
        },
        getSelectedRowData: function () {
            var data = null;
            if (this.options.activeRowIndex != null) {
                data = this.options.gridData[this.options.activeRowIndex];
            }
            return data;
        },
        getCheckedRowData: function () {
            var data = [];
            if (this.options.checkedRowIndex != null) {
                for (var i = 0; i < this.options.checkedRowIndex.length; i++) {
                    data.push(this.options.gridData[this.options.checkedRowIndex[i]]);
                }
            }
            return data;
        },
        addRow: function (index, rowData) {
            if (rowData === undefined) {
                rowData = index;
                index = 0;
            }
            var row = this._renderRow(0, rowData, false),
                fixRow = this._renderRow(0, rowData, true),
                allRow = $('.grid_main', this.element).find('tr'),
                firstRow = allRow.get(index),
                firstFixColumnRow = $('.grid_fix_column', this.element).find('tr').get(index);
            $(firstRow).after(row);
            $(firstFixColumnRow).after(fixRow);
            row.data('_new', true);
            this.options.addedRow.push(rowData);
            this._recomputeIndex();
        },
        deleteRow: function (index) {
            var addedRow = this.options.addedRow,
                gridData = this.options.gridData,
                rowData = addedRow[index],
                count = addedRow.length + gridData.length,
                mainDom = $('.grid_main', this.element).find('tr').get(index + 1),
                fixDom = $('.grid_fix_column', this.element).find('tr').get(index + 1);
            if (index > count) {
                return;
            }
            var removeData = null;
            if ($(mainDom).data('_new')) {
                removeData = rowData;
                this.options.addedRow = addedRow.slice(0, index).concat(addedRow.slice(index + 1))
            } else {
                if (addedRow.length) {
                    index -= addedRow.length;
                }
                removeData = this.options.gridData[index];
                this.options.gridData = gridData.slice(0, index).concat(gridData.slice(index + 1));
            }
            mainDom.remove();
            fixDom.remove();
            this.options.deletedRow.push(removeData);
            this._recomputeIndex();
        },
        updateRow: function (index, rowData) {
            if (!index) {
                return;
            }
            this.deleteRow(index);
            this.addRow(index, rowData);
        },
        editRow: function (index) {
            var row = $('.grid_main', this.element).find('tr').get(index + 1),
                fixRow = $('.grid_fix_column', this.element).find('tr').get(index + 1);
            if (this.options.useCheckColumn && this.lockColumns.length > 0) {
                $($(fixRow).find('td').get(1)).data('cell').editMode()
            } else {
                $($(row).find('td').get(1)).data('cell').editMode();
            }
        },
        _recomputeIndex: function () {
            var index = -1;
            $('.grid_main', this.element).find('tr').each(function () {
                $(this).data('_index', index);
                index++;
            });
            index = -1;
            $('.grid_fix_column', this.element).find('tr').each(function () {
                $(this).data('_index', index);
                index++;
            })
        },
        nextPage: function () {
            //TODO 如果设置了url，设置url参数重新加载数据,如果 gridData 大小大于pageSize，使用内存分页
            var eventData = {pageNo: this.pageNo, pageSize: this.pageSize};
            this._trigger('onNextPage', eventData);
        },
        prevPage: function () {
            var eventData = {pageNo: this.pageNo, pageSize: this.pageSize};
            this._trigger('onPrevPage', eventData);
        },
        moveColumn: function (sourceColumn, targetColumn) {

        },
        sortColumn: function (columnIndex) {
            // 事件
        },
        addColumn: function (columnData, index) {

        },
        deleteColumnsByIndex: function (index) {

        },
        deleteColumnsByName: function () {

        },
        getColumnIndexByName: function (columnName) {

        },
        updateColumn: function (columnData, column) {

        },
        _setOption: function (key, value) {
            this._super(key, value);
            if (key.activeRowIndex || key.activeRowIndex === 0) {
                this.selectRow(value);
            }
        },
        _create: function () {
            var columns = this.options.columns;
            if (columns == null || columns.length == 0) {
                return;
            }
            columns.sort(function (obj) {
                if (obj.lock == true) {
                    return -1;
                } else {
                    return 1;
                }
            });
            this.lockColumns = [];
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                if (column.lock == true) {
                    this.lockColumns.push(column);
                }
            }
            if (!this.options.totalRecord) {
                this.options.totalRecord = this.options.gridData.length;
            }
            if (!this.options.headHeight) {
                this.options.headHeight = 20;
            }
            var container = this.container = $('<div>').addClass('grid_container')
                    .width(this.options.width).height(this.options.height).css({position: 'relative'}),
                titleHeight = 20,
                title = this.options.title,
                displayTitle = this.options.displayTitle && title;
            if (displayTitle) {
                this.title = $('<div>').height(titleHeight).css({position: 'absolute'}).addClass('grid_title').text(this.options.title);
                container.append(this.title);
            }
            if (this._useFixLayout()) {
                var height = this.options.height;
                var top = 0;
                if (this.options.usePage) {
                    height -= this.options.pageBarHeight;
                }
                if (displayTitle) {
                    height -= titleHeight;
                    top += titleHeight;
                }
                var table = $('<div class="grid_main"><table><tr></tr></table></div>')
                    .css({overflow: 'auto', position: 'absolute', top: top, width: this.options.width, height: height});
                this.head = table.find('tr').height(this.options.headHeight);
                this.body = table.find('table');
                this._renderHead();
                container.append(table);
            } else {
                height = this.options.height;
                top = 0;
                if (this.options.usePage) {
                    height -= this.options.pageBarHeight;
                }
                if (displayTitle) {
                    height -= titleHeight;
                    top += titleHeight;
                }
                height -= this.options.headHeight;
                var head = $('<div><table><tr></tr></table></div>').addClass('grid_head')
                        .css({top: top, overflow: 'hidden', position: 'absolute'}).width(this.options.width).height(this.options.headHeight),
                    body = $('<div><table></table></div>').width(this.options.width)
                        .addClass('grid_body').css({position: 'absolute', top: top + this.options.headHeight, height: height, overflow: 'auto'});
                this.head = head.find('tr');
                this.body = body.find('table');
                this._renderHead();
                container.append(head);
                container.append(body);
            }
            this.element.append(container);
            this.render();
        },
        render: function () {
            var that = this;
            if (!that.options.gridData) {
                if (that.options.url) {
                    $.ajax({
                        url: that.options.url,
                        type: 'post',
                        dataType: 'json'
                    }).then(function (data) {
                        that.options.gridData = data.record;
                        that.options.totalRecord = data.totalRecord;
                        that.render();
                    })
                }
            } else {
                that._renderBody();
                that._renderPage();
                if (that._useFixLayout()) {
                    $('.grid_fix_head', that.element).remove();
                    $('.grid_fix_column', that.element).remove();
                    $('.grid_fix', that.element).remove();
                    var body = $('.grid_main', that.element);
                    var head = body.clone().removeClass('grid_main').addClass('grid_fix_head').css({height: that.options.headHeight,
                        overflow: 'hidden', width: that.options.width - 17, background: 'white'});
                    body.after(head);
                    var width = 0;
                    $('.grid_main', that.element).scroll(function () {
                        head.scrollLeft($(this).scrollLeft());
                        table.scrollTop($(this).scrollTop());
                    }).find('.grid_lock_column').each(function () {
                        width += $(this).outerWidth();
                    });
                    var table = $('<div class="grid_fix_column"><table><tr></tr></table></div>')
                        .css({background: 'white', overflow: 'hidden', position: 'absolute',
                            top: body.css('top'), width: width, height: body.height() - 17});
                    var lockColumnsBody = table.find('table');
                    var tr = table.find('tr').height(that.options.headHeight);
                    that._renderHead(tr, true);
                    that._renderBody(lockColumnsBody, true);
                    body.after(table);
                    var fix = table.clone().removeClass('grid_fix_column').addClass('grid_fix');
                    $('tr', fix).not(':first').remove();
                    fix.css({height: that.options.headHeight});
                    if (this.options.useCheckColumn) {
                        var checkAll = $('<input/>', {
                            type: 'checkbox'
                        }).click(function () {
                            var t = $(this);
                            if (t.prop('checked')) {
                                that.checkAllRow();
                            } else {
                                that.uncheckAllRow();
                            }
                        });
                        $(fix.find("td")[0]).append(checkAll);
                    }
                    head.after(fix);
                }
                that._rendered();
            }
        },
        _renderRow: function (index, rowData, lockOnly) {
            if (!rowData) {
                rowData = {};
            }
            var that = this,
                columns = lockOnly ? this.lockColumns : this.options.columns,
                tr = $('<tr>').height(this.options.rowHeight).data('_index', index).click(function () {
                    that.selectRow($(this).data('_index'));
                });
            if (this.options.useCheckColumn) {
                (function (tr) {
                    var checkbox = $('<input>', {
                        type: 'checkbox'
                    }).click(function () {
                        var checkbox = $(this),
                            index = tr.data('_index');
                        if (checkbox.prop('checked')) {
                            that.checkRow(index);
                        } else {
                            that.uncheckRow(index);
                        }
                    });
                    var content = $('<div>').width(30).addClass('grid_checkColumn');
                    content.append(checkbox);
                    var th = $('<td></td>').append(content);
                    tr.append(th);
                })(tr);
            }
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j],
                    columnName = column.name,
                    value = rowData[columnName] || '',
                    cell = new $.ui.cell({type: 'text', value: value, width: column.width, onClick: function () {
                        that._trigger('onClickCell');
                    }, onValueChange: function () {
                        console.log(rowData);
                        that.options.updatedRow.push(rowData);
                        that._trigger('onChangeCellValue');
                    }});
                (function (c) {
                    tr.append($('<td>').append(cell.widget()).data('cell', c).click(function () {
                        if (that.options.mode == 'edit') {
                            c.editMode();
                        }
                        return true;
                    }));
                })(cell);
            }
            return tr;
        },
        _renderHead: function (head, lockOnly) {
            head = (head || this.head);
            var content = null,
                th = null;
            if (this.options.useCheckColumn) {
                content = $('<div>').width(30);
                th = $('<td></td>').addClass('grid_lock_column').append(content);
                head.append(th);
            }
            var columns = lockOnly ? this.lockColumns : this.options.columns;
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                content = $('<div>').text(column.title).width(column.width);
                th = $('<td></td>').html(content);
                if (column.lock == true) {
                    th.addClass('grid_lock_column');
                }
                head.append(th);
            }
        },
        _renderBody: function (body, lockOnly) {
            var data = this.options.gridData;
            if ($.isEmptyObject(data)) {
                this.body.empty();
                return;
            }
            body = (body || this.body);
            body.find('tr').not(':first').remove();
            var count = 0,
                addedRow = this.options.addedRow,
                i = 0;
            if (addedRow) {
                for (; i < addedRow.length; i++) {
                    body.append(this._renderRow(count, addedRow[i], lockOnly));
                    count++;
                }
            }
            for (i = 0; i < data.length; i++) {
                body.append(this._renderRow(i, this.options.gridData[i], lockOnly));
                count++;
            }
        },
        _renderPage: function () {
            if (this.options.usePage) {
                var that = this;
                if (this.page) {
                    this.page.destroy();
                } else {
                    this.page = new $.ui.page({width: this.options.width, totalRecord: this.options.totalRecord,
                        pageNo: this.options.pageNo, pageSize: this.options.pageSize, height: this.options.pageBarHeight, onNextPage: function (e) {
                            that._trigger('onNextPage', e);
                        }, onPrevPage: function (e) {
                            that._trigger('onPrevPage', e);
                        }, onPageSizeChange: function (e, data) {
                            that._trigger('onPageSizeChange', e, data)
                        }});
                    this.container.append(this.page.widget());
                }
            }
        },
        _rendered: function () {
            this.selectRow(this.options.activeRowIndex);
            this._checkRow(this.options.checkedRowIndex, true);
            this._trigger('_afterRender');
        },
        _useFixLayout: function () {
            return this.lockColumns.length > 0 || this.options.useCheckColumn;
        }
    });

    $.widget('ui.page', {
        options: {
            pageNo: 1,
            pageSize: 10,
            totalRecord: null,
            height: 20,
            width: 50,
            pageDisplay: "{from}-{to}记录，共{totalRecord}条,{currentPage}/{totalPage}页",
            onNextPage: null,
            onPrevPage: null,
            onPageSizeChange: null
        },
        isLastPage: function () {
            return this.options.pageNo === this.totalPage;
        },
        _create: function () {
            this.element.append($('<span>').addClass('page_display'));
            this.render();
            var firstButton = $('<button>', {
                    text: '首'
                }).click(function (e) {
                    that._trigger('onFirstPage', e);
                }), lastButton = $('<button>', {
                    text: '末'
                }).click(function (e) {
                    that._trigger('onLastPage', e);
                }), prevButton = $('<button>', {
                    text: '上'
                }).click(function (e) {
                    that._trigger('onPrevPage', e);
                }), nextButton = $('<button>', {
                    text: '下'
                }).click(function (e) {
                    that._trigger('onNextPage', e);
                }), pageSize = [5, 10, 20],
                that = this,
                select = $('<select>').change(function (e) {
                    that.options.pageSize = $(this).val();
                    that._trigger('onPageSizeChange', e, {pageSize: $(this).val()})
                });
            for (var i = 0; i < pageSize.length; i++) {
                var option = $('<option>', {
                    text: pageSize[i],
                    value: pageSize[i]
                });
                if (pageSize[i] == this.options.pageSize) {
                    option.prop('selected', true);
                }
                select.append(option);
            }
            this.element.addClass('grid_page')
                .css({position: 'absolute', bottom: 0, height: this.options.height, overflow: 'hidden', width: this.options.width})
                .append(firstButton)
                .append(prevButton)
                .append(nextButton)
                .append(lastButton)
                .append(select);
        },
        render: function () {
            this._renderPageDisplay();
        },
        _renderPageDisplay: function () {
            this.options.pageSize = parseInt(this.options.pageSize);
            var from = (this.options.pageNo - 1) * this.options.pageSize,
                totalPage = this.totalPage = parseInt(this.options.totalRecord % this.options.pageSize == 0 ? this.options.totalRecord / this.options.pageSize : this.options.totalRecord / this.options.pageSize + 1),
                to = this.isLastPage() ? parseInt(this.options.totalRecord % this.options.pageSize == 0 ? from + this.options.pageSize : from + this.options.totalRecord % this.options.pageSize) : from + parseInt(this.options.pageSize),
                display = this.options.pageDisplay.replace('{from}', (from + 1) + '').replace('{to}', parseInt(to) + '')
                    .replace('{totalPage}', totalPage + '').replace('{totalRecord}', this.options.totalRecord + '').replace('{currentPage}', this.options.pageNo + '');
            $('.page_display', this.element).text(display);
        }
    });

    $.widget('ui.cell', {
        options: {
            type: null,
            value: null,
            width: null,
            mode: 'view',
            onValueChange: null,
            onSwitchMode: null,
            onClick: null
        },
        _create: function () {
            var that = this;
            this.element.width(this.options.width).text(this.options.value).click(function (e) {
                that._trigger('onClick', e);
            });
        },
        editMode: function () {
            if (this.options.mode != 'edit') {
                this.options.mode = 'edit';
                var that = this;
                this.element.empty();
                this.element.append($('<input>', {
                    type: 'text'
                }).width(this.options.width - 5).val(this.options.value).blur(function () {
                    that.options.value = $(this).val();
                    var eventData = {value: $(this).val()};
                    that._trigger('onValueChange', eventData);
                    that.viewMode()
                }));
                this._delay(function () {
                    this.element.find('input').focus();
                }, 100);
                this._trigger('onSwitchMode');
            }
        },
        viewMode: function () {
            if (this.options.mode != 'view') {
                this.options.mode = 'view';
                this.element.empty();
                this.element.text(this.options.value);
                this._trigger('onSwitchMode');
            }
        }
    })
})(jQuery);