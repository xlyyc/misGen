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


    //选择实现
    beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

        var input = jQuery('<input type="text" name="' + this.getName() + '" value="' + this.getValue() + '">');
        this.getDomInstance().append(input);

    },

    //选择实现
    afterRender: function () {

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