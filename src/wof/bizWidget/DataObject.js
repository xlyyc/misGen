/**
 * @bizWidgetClass DataObject class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.DataObject = function () {
    this._version = '1.0';


    this.getDomInstance().css('overflow','hidden');
    this.setIsInside(true);

};
wof.bizWidget.DataObject.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _name:null,



    /**
     * get/set 属性方法定义
     */
    getName: function(){
        if(this._name==null){
            this._name = '';
        }
        return this._name;
    },

    setName: function(name){
        this._name = name;
    },


    /**
     * Render 方法定义
     */

    //选择实现
    beforeRender: function () {
        if(this._initFlag==null){
            var _this = this;
            var timeFn = null;
            this.getDomInstance().mousedown(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                timeFn = setTimeout(function(){
                    _this.sendMessage('wof.bizWidget.DataObject_mousedown');
                },250);
            });
            this.getDomInstance().dblclick(function(event){
                event.stopPropagation();
                clearTimeout(timeFn);
                _this.sendMessage('wof.bizWidget.DataObject_dblclick');
            });

            this._initFlag = true;
        }

    },

    //----------必须实现----------
    render: function () {

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
            name:this.getName()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);

    }


};