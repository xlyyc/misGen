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
            mode: 'view',  // view 显示模式，edit 编辑模式
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
            checkedRowIndex: null,    // 选中的checkbox列索引。
            addedRow: [],
            deletedRow: [],
            updatedRow: [],
            onNextPage: null,
            onPrevPage: null,
            onFirstPage: null,
            onLastPage: null,
            onSelectRow: null,
            onCheckRow: null,
            onReload: null,
            onChangeCellValue: null,
            onClickCell: null,
            afterAddColumn: null,
            afterDeleteColumn: null,
            onRowSelect: null,
            onRowChecked: null,
            afterRender: null,
            onSortColumn: null
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
            }
        },
        unselectRow: function () {
            if (this.options.activeRowIndex != null) {
                this.options.activeRowIndex = null;
                $('.grid_selectRow', this.element).removeClass('grid_selectRow');
            }
        },
        checkAllRow: function () {
            this.checkRow(null, true);
        },
        uncheckAllRow: function () {
            this.checkRow(null, false);
        },
        checkRow: function (rowIndexs, isCheck) {
            if (this.options.useCheckColumn) {
                var check = $('.grid_fix_column', this.element).find('.grid_checkColumn');
                if (rowIndexs) {
                    for (var i = 0; i < rowIndexs.length; i++) {
                        var rowIndex = rowIndexs[i];
                        $('input', check[rowIndex]).prop('checked', isCheck ? true : false);
                    }
                } else {
                    check.find('input').prop('checked', isCheck ? true : false);
                }
            }
        },
        uncheckRow: function (rowIndexs) {

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
                for (var i = 0; i < this.options.checkedRowIndex.length(); i++) {
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
                var height = this.options.height;
                var top = 0;
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
                (function (index, tr) {
                    var checkbox = $('<input>', {
                        type: 'checkbox'
                    }).click(function () {
                        if (that.options.checkedRowData == null) {
                            that.options.checkedRowData = [];
                        }
                        var checkbox = $(this);
                        if (checkbox.prop('checked')) {
                            that.options.checkedRowData.push(index);
                        } else {
                            var checkedRowData = that.options.checkedRowData;
                            for (var i = 0; i < checkedRowData.length; i++) {
                                var checkedIndex = checkedRowData[i];
                                if (checkedIndex === index) {
                                    var front = checkedRowData.slice(0, i);
                                    var end = checkedRowData.slice(i + 1);
                                    that.options.checkedRowData = front.concat(end);
                                    break;
                                }
                            }
                        }
                    });
                    var content = $('<div>').width(30).addClass('grid_checkColumn');
                    content.append(checkbox);
                    var th = $('<td></td>').append(content);
                    tr.append(th);
                })(index, tr);
            }
            for (var j = 0; j < columns.length; j++) {
                var column = columns[j],
                    columnName = column.name,
                    value = rowData[columnName] || '',
                    cell = new $.ui.cell({type: 'text', value: value, width: column.width});
                (function (c) {
                    c._on(cell.widget(), {
                        'onValueChange': function () {
                            that.options.updatedRow.push(rowData);
                        }
                    });
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
            var head = (head || this.head);
            if (this.options.useCheckColumn) {
                var content = $('<div>').width(30);
                var th = $('<td></td>').addClass('grid_lock_column').append(content);
                head.append(th);
            }
            var columns = lockOnly ? this.lockColumns : this.options.columns;
            for (var i = 0; i < columns.length; i++) {
                var column = columns[i],
                    content = $('<div>').text(column.title).width(column.width),
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
            var body = (body || this.body);
            body.find('tr').not(':first').remove();
            var count = 0,
                addedRow = this.options.addedRow;
            if (addedRow) {
                for (var i = 0; i < addedRow.length; i++) {
                    body.append(this._renderRow(count, addedRow[i], lockOnly));
                    count++;
                }
            }
            for (var i = 0; i < data.length; i++) {
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
                    this.page = new $.ui.page({totalRecord: this.options.totalRecord,
                        pageNo: 1, height: this.options.pageBarHeight, onNextPage: function (e) {
                            that._trigger('onNextPage', e);
                        }, onPrevPage: function (e) {
                            that._trigger('onPrevPage', e);
                        }});
                    this.container.append(this.page.widget());
                }
            }
        },
        _rendered: function () {
            this.selectRow(this.options.activeRowIndex);
            this.checkRow(this.options.checkedRowIndex);
            this._trigger('afterRender');
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
            height: 50,
            pageDisplay: "当前{from}-{to}记录,共{totalPage}页",
            onNextPage: null,
            onPrevPage: null
        },
        _create: function () {
            var from = (this.options.pageNo - 1) * this.options.pageSize,
                to = from + this.options.pageSize,
                totalPage = this.options.totalRecord % this.options.pageSize == 0 ?
                    this.options.totalRecord / this.options.pageSize : this.options.totalRecord / this.options.pageSize + 1,
                that = this,
                display = this.options.pageDisplay.replace('{from}',
                        (from + 1) + '').replace('{to}', to + '').replace('{totalPage}', totalPage + '');
            var prevButton = $('<button>', {
                text: '上一页'
            }).click(function (e) {
                that._trigger('onPrevPage', e);
            });
            var nextButton = $('<button>', {
                text: '下一页'
            }).click(function (e) {
                that._trigger('onNextPage', e);
            });
            this.element.addClass('grid_page').append(display)
                .css({position: 'absolute', bottom: 0, height: this.options.height, overflow: 'hidden'})
                .append(prevButton)
                .append(nextButton);
        }
    });

    $.widget('ui.cell', {
        options: {
            type: null,
            value: null,
            width: null,
            mode: 'view',
            onValueChange: null,
            onSwitchMode: null
        },
        _create: function () {
            this.element.width(this.options.width).text(this.options.value);
        },
        editMode: function () {
            if (this.options.mode != 'edit') {
                this.options.mode = 'edit';
                var that = this;
                this.element.empty();
                this.element.append($('<input type="text"/>')
                    .width(this.options.width - 5).val(this.options.value).blur(function () {
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