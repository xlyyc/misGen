
wof.widget.Dialog = function () {
    this._version = '1.0';
};

wof.widget.Dialog.prototype = {
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

    _scroll: true,

    // ligerui按钮
    // [ { text: '确定', onclick: function (item, dialog) { alert(item.text); } ]
    _buttons: null, 

    _onMax:null,              
    _onClose:null,
    _onRestore:null,
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

    getScroll: function () {
        return this._scroll;
    },

    setScroll: function (s) {
        this._scroll = s;
    }, 

    getCanMax: function () {
        return ( this._canMax == null ) ? true : this._canMax ;
    },

    setCanMax: function (canMax) {
        this._canMax = canMax;
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

    setWidth: function (w) {
        if (w > 0) {
            this._width = w;
            if (this._dialog) {
                this._dialog.setWidth(w);
            };
        };
    },

    setHeight: function (h) {
        if (h > 0) {
            this._height = h;
            if (this._dialog) {
                this._dialog.setHeight(h);
            };
        };
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


    _initRender: function() {
        var self = this;
        this._dialog = wis$.create('Dialog');
        this._dialog.setName(this.getName())
        this._dialog.setType(this.getType())
        this._dialog.setTitle(this.getTitle());
        this._dialog.setCanMax(this.getCanMax());
        this._dialog.setCanDrag(this.getCanDrag());
        this._dialog.setDefaultFullScreen(this.getDefaultFullScreen());
        this._dialog.setWidth(this.getWidth());
        this._dialog.setHeight(this.getHeight());
        this._dialog.setTop(this.getTop());
        this._dialog.setLeft(this.getLeft());
        this._dialog.setModal(this.getModal());
        this._dialog.setRefreshFlag(this.getRefreshFlag());
        this._dialog.setUrl(this.getUrl());
        this._dialog.setTarget(this.getTarget());
        this._dialog.setTextContent(this.getTextContent());
        this._dialog.setButtons(this.getButtons());
        this._dialog.setScroll(this.getScroll());

        this._dialog.onMax(function () {
            self._onMax && self.onMax();
            self.sendMessage('wof.widget.Dialog_max');
        });
        this._dialog.onClose(function () {
            self._onClose && self._onClose();
            self.sendMessage('wof.widget.Dialog_close');
        });
        this._dialog.onRestore(function () {
            self._onRestore && self._onRestore();
            self.sendMessage('wof.widget.Dialog_restore');
        });
        this._dialog.onClickTypeButton(function (answer) {
            self._onClickTypeButton && self._onClickTypeButton(answer);
            if(answer){
            	self.sendMessage('wof.widget.Dialog_clicktypebutton_yes');
            }else{
            	self.sendMessage('wof.widget.Dialog_clicktypebutton_no');
            }
        });
        this._dialog.appendTo(this.getDomInstance());
    },

    _beforeRender: function() { },
    render: function() {
        this._dialog.render();
    },
    _afterRender: function() {
        this.sendMessage('wof.widget.Dialog_render');
    },

    //----------必须实现----------
    getData: function () {
        return {
            name: this.getName(),
            type: this.getType(),
            title: this.getTitle(),
            scroll: this.getScroll(),
            canMax: this.getCanMax(),
            canDrag: this.getCanDrag(),
            defaultFullScreen: this.getDefaultFullScreen(),
            refreshFlag: this.getRefreshFlag(),
            url: this.getUrl(),
            target: this.getTarget(),
            textContent: this.getTextContent(),
            modal: this.getModal(),
            buttons: this.getButtons(),

            onMax: this.onMax(),
            onClose: this.onClose(),
            onRestore: this.onRestore(),
            onClickTypeButton: this.onClickTypeButton()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setType(data.type);
        this.setTitle(data.title);
        this.setScroll(data.scroll);
        this.setCanMax(data.canMax);
        this.setCanDrag(data.canDrag);
        this.setDefaultFullScreen(data.defaultFullScreen);
        this.setRefreshFlag(data.refreshFlag);
        this.setUrl(data.url);
        this.setTarget(data.target);
        this.setTextContent(data.textContent);
        this.setModal(data.modal);
        this.setButtons(data.buttons);

        this.onMax(data.onMax);
        this.onClose(data.onClose);
        this.onRestore(data.onRestore);
        this.onClickTypeButton(data.onClickTypeButton);
    }


};




