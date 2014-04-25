/**
 *
 *
 *
 */
wis.widget.Button = function () {
    this._version = '1.0';

};
wis.widget.Button.prototype = {

    _name: null,            //名称
    _label: null,           //文字
    _icon: null,            //语义层面的ICON标识，对应图标的类型(add/edit)、颜色(white/black)、位置属性(position:left/right/top/bottom)
    _disabled: null,        //禁用
    _onClick: null,

    getName: function () {
        return this._name;
    },

    setName: function (name) {
        this._name = name;
    },

    getLabel: function () {
        return this._label || '';
    },

    setLabel: function (label) {
        this._label = label;
    },

    getIcon: function () {
        return this._icon;
    },

    setIcon: function (icon) {
        this._icon = icon;
    },

    getDisabled: function () {
        return this._disabled == null ? false : this._disabled ;
    },

    setDisabled: function (disabled) {
        this._disabled = ( typeof disabled ) === "boolean" ? disabled  : false ;
    },

    onClick: function (callBack) {
        this._onClick = callBack;
    },


    /**
     * 初始化方法
     */
    _init: function (data) {
        this.setData(data);
    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    initRender: function () {
        this._linkObj = jQuery('<a class="ui_btn ui_btn_small" onclick="" style="width: 100%;height:100%"></a>');
        this._iObj = jQuery('<i></i>');
        this._linkObj.append(this._iObj);
        this.getDomInstance().append(this._linkObj);
        
        //单击事件
        var that = this;
        this._linkObj.on("click", function (e) {
            //disabled状态不处理
            if(that.getDisabled()){
                return;
            }
            //自定义onClick事件
            if ((typeof that._onClick == "function") && that._onClick() == false){
                return; 
            }
        });
    },

    //渲染前处理方法
    beforeRender: function () {

    },

    //渲染方法
    render: function () {
        if( this.getName() ){
            this._linkObj.attr('name', this.getName());
        }
        if( this.getIcon() ){
            this._iObj.addClass(this.getIcon());
        }
        if( this.getLabel() ){
            if( this._linkObj[0].lastChild.nodeType === 1 ){
                this._linkObj.append(this.getLabel());
            }else{
                // nodeType === 3
                this._linkObj[0].lastChild.nodeValue  = this.getLabel();
            }
        }
        //disabled状态
         if (this.getDisabled()) {
            this._linkObj.addClass("disabled");
         }else{
            this._linkObj.removeClass("disabled");
         }
    },

    //渲染后处理方法
    afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name: this.getName(),
            label: this.getLabel(),
            icon: this.getIcon(),
            disabled: this.getDisabled()
        };  
    },

    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setLabel(data.label);
        this.setIcon(data.icon);
        this.setDisabled(data.disabled);
    }

};