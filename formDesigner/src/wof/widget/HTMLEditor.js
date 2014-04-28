/**
 * @widgetClass HTMLEditor class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:47
 */

wof.widget.HTMLEditor = function () {
    this._version = '1.0';

};

wof.widget.HTMLEditor.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    /**
     * get/set 属性方法定义
     */


    /**
     * Render 方法定义
     */

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

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