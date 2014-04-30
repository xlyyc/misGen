/**
 * 时间选择控件统一API
 *
 *
 */
wis.widget.Dialog = function () {
    this._version = '1.0';

};

wis.widget.Dialog.prototype = {
    _cid: null,
    _name: null,
    _type: null,
    _title: null,
    _canMax: null,
    _canDrag: null,
    _defaultFullScreen: null,
    _dialog: null,             //对话框的引用
    _url:null,                //内容 
    _textContent: null,       //内容
    _target:null,             //内容
    _modal:null,              //是否使用模态
    _refreshFlag: null,       //刷新内容标示

    _buttons: null,

    _onMax:null,              
    _onClose:null,
    _onRestore:null,

    _scroll:true,

    _onClickTypeButton:null,

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

    getType: function () {
        return this._type;
    },

    setType: function (type) {
        this._type = type;
    },

    getTitle: function () {
        return this._title || "提示";
    },

    setTitle: function (title) {
        this._title = title;
    },

    getCanMax: function () {
        return ( this._canMax == null ) ? true : this._canMax ;
    },

    setCanMax: function (canMax) {
        this._canMax = canMax;
    },

    getScroll: function () {
        return this._scroll;
    }, 
    setScroll: function (s) {
        this._scroll = s;
    }, 

    getCanDrag: function () {
        return ( this._canDrag == null ) ? false : this._canDrag;
    },

    setCanDrag: function (canDrag) {
        this._canDrag = canDrag;
    },

    getDefaultFullScreen: function () {
        return ( this._defaultFullScreen == null ) ? false : this._defaultFullScreen;
    },

    setDefaultFullScreen: function (defaultFullScreen) {
        this._defaultFullScreen = defaultFullScreen;
    },

    getWidth: function () {
        return this._width || 500 ;
    },

    getHeight: function () {
        return this._height || 400 ;
    },

    getTop: function () {
        return this._top || null ; 
    },

    getLeft: function () {
        return this._left || null ; 
    },

    getModal: function () {
        return ( this._modal == null ) ? true : this._modal ;
    },

    setModal: function (modal) {
        this._modal = ( typeof modal === "boolean" ) ? modal : true;
    },

    getRefreshFlag: function () {
        return ( this._refreshFlag == null ) ? true : this._refreshFlag;
    },

    setRefreshFlag: function (refreshFlag) {
        this._refreshFlag = refreshFlag ;
    },

    getUrl: function () {
        return this._url;
    },

    setUrl: function (url) {
        this.setRefreshFlag(true);
        this._url = url;
    },

    setButtons: function (buttons) {
        this._buttons = buttons || [];
    },

    getButtons: function () {
        return this._buttons;
    },

    getTarget: function () {
        return this._target;
    }, 

    setTarget: function (target) {
        this.setRefreshFlag(true);
        this._target = target;
    },

    getTextContent: function () {
        return this._textContent || "";
    },

    setTextContent: function (textContent) {
        this.setRefreshFlag(true);
        this._textContent = textContent;
    },


    afterRemove: function () {
        if( this._dialog )
        {
            this._dialog.close();
            this._dialog = null;    
        }
    },

    onMax: function (onMaxFun) {
        this._onMax = onMaxFun;
    },

    onClose: function (onCloseFun) {
        this._onClose = onCloseFun;
    },

    onRestore: function (onRestoreFun) {
        this._onRestore = onRestoreFun ;
    },

    onClickTypeButton: function(clickButton) {
        if( !this.getType() ) clickButton = null ;
        this._onClickTypeButton = clickButton ;
    },

    /**
     * 初始化方法
     */
    _init: function (data) {
    },
    
    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    _initRender: function () {

        if( this.getType() )
        {
            var dialogOpenFun = null;
            
            switch( this.getType() )
            {
                case "success":
                    dialogOpenFun = jQuery.ligerDialog.success;
                    break ;
                case "waitting":
                    dialogOpenFun = jQuery.ligerDialog.waitting;
                    break ;
                case "error":
                    dialogOpenFun = jQuery.ligerDialog.error;
                    break ;
                case "warn":
                    dialogOpenFun = jQuery.ligerDialog.warn;
                    break ;
                case "question":
                    dialogOpenFun = jQuery.ligerDialog.question;
                    break ;
                case "confirm":
                    dialogOpenFun = jQuery.ligerDialog.confirm;
                default:
                    break ;
            }
            var clickButton = this._onClickTypeButton || ( function(){} );
            this._dialog = dialogOpenFun(this.getTextContent(), this.getTitle() , jQuery.ligerDefaults.Dialog.className, clickButton);
        }
        else
        {
            this._dialog = jQuery.ligerDialog.open({
                width: this.getWidth(),
                height: this.getHeight(),
                top: this.getTop(),
                left: this.getLeft(),
                title: this.getTitle(),
                buttons: this.getButtons(),
                allowToMax: true,
                isDrag: true,
                scroll: this.getScroll(),
                content: "",
                modal: true
            });
        }
      
        var that = this;
        this._dialog.bind("dialogMax",function(param){
            that.setTop(param.top);
            that.setLeft(param.left);
            that.setWidth(param.width);
            that.setHeight(param.height);
            that._onMax && that._onMax(that);
        });

        this._dialog.bind("dialogRestore",function(param){
            that.setTop(param.top);
            that.setLeft(param.left);
            that.setWidth(param.width);
            that.setHeight(param.height);
            that._onRestore && that._onRestore(that);
        });
        this._dialog.bind("dialogClose",function(){
            that._dialog = null;
            that.remove();
            that._onClose && that._onClose(that);
        });

        // 自适应对话框大小
        this._dialog.bind("dialogIFrameLoad", function (ev, frmwin) {
            if (that.getScroll()) {
                return; // 设置滚动条时不做自适应
            };
            try {
                var w = jQuery(frmwin.document).width();
                var h = jQuery(frmwin.document).height();
                that.setWidth(w);
                that.setHeight(h);
                that._reDrawDialog();
                // console.log(w + ' x ' + h);
            } catch (e) {
                window.console && console.warn(e.message);
            }
        });

        //for themes
        this._dialog.addClass(this.getClassName().replace(/\./g,"_"));
    },

    //渲染前处理方法
    _beforeRender: function () {
        // to do ...
    },

    //渲染方法
    render: function () {
        this._reDrawDialog();
        if (this._dialog) {
            this._dialog._setOption({
                url: this.getUrl(),
                target: this.getTarget(),
                content: this.getTextContent()
            });
        };

        if(this._dialog && this.getRefreshFlag())
        {
            this._dialog.setContent();
            this.setRefreshFlag(false);
        }
    },

    _reDrawDialog: function() {
        if (this._dialog && !this.getType()) {
          //position
            this._dialog.css({
                top: this.getTop() || this._dialog.position().top,
                left: this.getLeft() || this._dialog.position().left
            });

             // width and  height
            this._dialog._setWidth( this.getWidth() );
            this._dialog._setHeight( this.getHeight() );   
            //
            this._dialog.titleTarget.html( this.getTitle() );
            this._dialog._setMask( this.getModal() );
            this._dialog._setIsDrag( this.getCanDrag());
            this._dialog._setMaxSupport( this.getCanMax() ) ;
        };
    },


    //渲染后处理方法
    _afterRender: function () {


    },


    //----------必须实现----------
    getData: function () {
        return {
            cid:  this.getCid(),
            name: this.getName(),
            type: this.getType(),
            title: this.getTitle(),
            canMax: this.getCanMax(),
            canDrag: this.getCanDrag(),
            defaultFullScreen: this.getDefaultFullScreen(),
            url: this.getUrl(),
            buttons: this.getButtons(),
            textContent: this.getTextContent(),
            modal: this.getModal()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
        this.setName(data.name);
        this.setType(data.type);
        this.setTitle(data.title);
        this.setCanMax(data.canMax);
        this.setCanDrag(data.canDrag);
        this.setDefaultFullScreen(data.defaultFullScreen);
        this.setModal(data.modal);
        this.setUrl(data.url);
        this.setButtons(data.buttons);
        this.setTextContent(data.textContent);
    }
};



