/**
 * @widgetClass RadioGroup class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:36
 */

wof.widget.RadioGroup = function () {
    this._version = '1.0';
};

wof.widget.RadioGroup.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
	_name : null , 			//分组名称
	_value : null , 		//当前所选值
	_childNodes:null,		//子节点
	_showType:null, 		//展示类型，横排|分行
   
    /**
     * get/set 属性方法定义
     */

    getName: function(){
        if(this._name == null)
            this._name = '';
        return this._name;
    },
    setName: function(name){
        this._name = name;
    },
    setValue: function(value){
        this._value = value;
    },
    getValue: function(){
        return this._value;
    },
    setChildNodes: function(childNodes){
        this._childNodes = childNodes;
    },
    getChildNodes: function(){
        return this._childNodes;
    },

    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },
    /**
     * Render 方法定义
     */
    _initRender: function () {
    	
    },
    //选择实现
    _beforeRender: function () {},

    //----------必须实现----------
    render: function () {
        this.getDomInstance().attr('id', this.getName());
    },

    //选择实现
    _afterRender: function () {
        //radio按钮组渲染
        jQuery('#'+this.getName()).buttonset();
        var _this = this;
        jQuery('input[type=radio]',_this.getDomInstance()).on('change', function() {
            for (var i=0; i <_this.childNodes().length; i++){
                if(_this.childNodes()[i].getId() === this.id)
                    _this.childNodes()[i].setChecked('checked');
                else
                     _this.childNodes()[i].setChecked('');
            }
        });

    },
    //----------自定义实现(进行必要的校验和默认值设置)----------
    setOptions: function (data) {
    	if (!data) {
    		return;
    	}
	    if(data.name){
			this.setName(data.name);
		}
	    if(data.value){
	    	this.setValue(data.value);
	    }
        if(data.childNodes){
    		this.setChildNodes(data.childNodes);
    	}
    },
    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name : this.getName()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
    }

};