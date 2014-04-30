/**
 * @widgetClass Text class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午2:07
 */

wof.widget.Text = function () {
    this._version = '1.0';

};

wof.widget.Text.prototype = {

    _width: null,
    _height: null,
    _top: null,
    _left: null,
    _name: null,
    _validate: null,
    _value: null,
    _type: null,
    _disable: null,
    _readonly: null,
    _placeholder: null,

    _input: null,

    getName: function () {
        return this._name;
    },
    setName: function (name) {
        this._name = name;
    },
    getValue: function () {
        return this._value;
    },
    setValue: function (value) {
        this._value = value;
    },

    getReadonly: function(){
        if(this._readonly==null){
            this._readonly = false;
        }
        return this._readonly;
    },

    setReadonly: function(readonly){
        this._readonly = readonly;
    },

    _initRender: function () {
        this._input = jQuery('<input type="text">');
        this.getDomInstance().append(this._input);
    },
    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
        this._input.attr('name', this.getName());
        this._input.attr('value', this.getValue());
        this._input.attr('readonly', this.getReadonly());
        this._input.css('width', this.getWidth()+'px');

    },

    //选择实现
    _afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {

        };
    },
    //----------必须实现----------
    setData: function (data) {

    }

};