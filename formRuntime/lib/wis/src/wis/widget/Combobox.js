/**
 * 下拉框控件统一API
 * 
 * 
 */
wis.widget.Combobox = function () {
    this._version = '1.0';

};

wis.widget.Combobox.prototype = {

    _selectName: null,
    _isMultSelect: null,
    _mode: null,
    _selectData: null,
    _gridColumn: null,
    _renderFlag: null,
    _onBeforeSelect: null,
    _onSelected: null,

    _select: null,


    /**
     * 数据格式
     * [
     { value: 1, name: "金智科技"},
     { value: 2, name: "金智教育"},
     { value: 3, name: "金智投资"},
     { value: 4, name: "金智智能"}
     ]
     */
    getSelectData:function (){
    	return this._selectData || [];
    },
    setSelectData:function (selectData){
		this._selectData = selectData;
	},

    getSelectName: function () {
        return this._selectName;
    },

    setSelectName: function (selectName) {
        this._selectName = selectName;
    },

    getIsMultSelect: function () {
        return this._isMultSelect || false;
    },

    setIsMultSelect: function (isMultSelect) {
        this._isMultSelect = isMultSelect;
    },

    getMode: function () {
        return this._mode;
    },

    setMode: function (mode) {
        this._mode = mode;
    },

    setValue: function(v) {
        this._value = v;
    },

    getValue: function() {
        return this._value;
    },

    getGridColumn: function () {
        return this._gridColumn;
    },
    setGridColumn: function (gridColumn) {
        this._gridColumn = gridColumn || [];
    },

    onBeforeSelect: function (callBack) {
        this._onBeforeSelect = callBack;
    },
    onSelected:function(callBack){
        this._onSelected = callBack;
    },

    /**
	 * 初始化方法
	 */
    _init: function (data) {

    },

    /**
	 * 初始化渲染方法 仅在第一次调用render时执行
	 */
    initRender: function () {
        var select = jQuery('<select>');

        this.getDomInstance().append(select);

        this._select = select;



        /*<select id="combobox">
            <option value="">Select one...</option>
            <option value="ActionScript">ActionScript</option>
            <option value="AppleScript">AppleScript</option>
            <option value="Asp">Asp</option>
            <option value="BASIC">BASIC</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="Clojure">Clojure</option>
            <option value="COBOL">COBOL</option>
            <option value="ColdFusion">ColdFusion</option>
            <option value="Erlang">Erlang</option>
            <option value="Fortran">Fortran</option>
            <option value="Groovy">Groovy</option>
            <option value="Haskell">Haskell</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Lisp">Lisp</option>
            <option value="Perl">Perl</option>
            <option value="PHP">PHP</option>
            <option value="Python">Python</option>
            <option value="Ruby">Ruby</option>
            <option value="Scala">Scala</option>
            <option value="Scheme">Scheme</option>
        </select>*/
    },

    // 渲染前处理方法
    beforeRender: function () {
        this._select.children().remove();
        for(var i=0;i<this.getSelectData().length;i++){
            var item = this.getSelectData()[i];
            var opt = jQuery('<option value="'+item['value']+'">'+item['name']+'</option>');
            this._select.append(opt);
        }
    },

    // 渲染方法
    render: function () {

    },

    // 渲染后处理方法
    afterRender: function () {
       // this._select.destroy();
        this._select.combobox({
            select: function( event, ui ) {
                alert(ui.item.label+'   '+ui.item.value);
            }
        });
        if(this.getValue()!=null){
            this._select('search', this.getValue());
        }
    },

    // ----------必须实现----------
    getData: function () {
        return {
            selectData: this.getSelectData()
        };
    },

    // ----------必须实现----------
    setData: function (data) {
        this.setSelectData(data.selectData);
    }

};


(function( $ ) {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
                .addClass( "custom-combobox" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .tooltip()
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();

                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
                .val( "" )
                .attr( "title", value + " didn't match any item" )
                .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.data( "ui-autocomplete" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})( jQuery );