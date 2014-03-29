/**
 *
 *
 *
 */
wis.widget.Button = function () {
    this._version = '1.0';

};
wis.widget.Button.prototype = {

    _cid: null,             //id
    _name: null,            //名称
    _label: null,           //文字
    _icon: null,            //语义层面的ICON标识，对应图标的类型(add/edit)、颜色(white/black)、位置属性(position:left/right/top/bottom)
    _themes: null,          //对应主题里面的样式名
    _disabled: null,        //禁用
    _onClick: null,

    getCid: function () {
        return this._cid ;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

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
       // this._rootObj = jQuery('<div class="ui_toolbar" style="height:100%;"></div>');
       // this._spanObj = jQuery('<span class="pull_left" style="width: 100%;height:100%;"></span>');
        this._linkObj = jQuery('<a class="ui_btn ui_btn_small" onclick="" style="width: 100%;height:100%"></a>');
        this._iObj = jQuery('<i></i>');
        //this._rootObj.append(this._spanObj);
        //this._spanObj.append(this._linkObj);
        this._linkObj.append(this._iObj);
        this.getDomInstance().append(this._linkObj);
        this._bindEvents();
    },

    _bindEvents: function () {
        //单击事件
        var that = this;
        this._linkObj.on("click", function (e) {

            //disabled状态不处理
            if(that.getDisabled())
            {
                return;
            }

            //自定义onClick事件
            if ((typeof that._onClick == "function") && that._onClick() == false) 
            {
                return; 
            }

        });
    },

    //渲染前处理方法
    beforeRender: function () {

    },

    //渲染方法
    render: function () {
        if( this.getCid() )
        {
            this._linkObj.attr('id', this.getCid());
        }
        
        if( this.getName() )
        {
            this._linkObj.attr('name', this.getName());
        }
         
        if( this.getIcon() )
        {
            this._iObj.addClass(this.getIcon());
        }
        
        if( this.getLabel() )
        {
            if( this._linkObj[0].lastChild.nodeType === 1 )
            {
                this._linkObj.append(this.getLabel());
            }
            else
            {
                // nodeType === 3
                this._linkObj[0].lastChild.nodeValue  = this.getLabel();
            }
            
        }
      
        //to do ......  for   disabled
        //disabled状态
        /* if (this.getDisabled()) {
         this._inputObj.attr("disabled", "disabled");
         this._labelObj.addClass("ui_checkbox_disabled");
         } else {
         this._inputObj.removeAttr("disabled");
         this._labelObj.removeClass("ui_checkbox_disabled");
         }*/
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
            cid: this.getCid(),
            name: this.getName(),
            label: this.getLabel(),
            icon: this.getIcon(),
            disabled: this.getDisabled()
        };  
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setName(data.name);
        this.setLabel(data.label);
        this.setIcon(data.icon)
        this.setDisabled(data.disabled);
    }

};