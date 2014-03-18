/**
 * 验证控件统一API
 *
 *
 */
wis.widget.Validation = function () {
    this._version = '1.0';

};

wis.widget.Validation.prototype = {
    _cid: null,
    _prefabricateRule: null,
    _ruleFunction: null,
    _errorMsg: null,
    _msgPosition: null,

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getPrefabricateRule: function () {
        return this._prefabricateRule;
    },

    setPrefabricateRule: function (prefabricateRule) {
        this._prefabricateRule = prefabricateRule;
    },

    getRuleFunction: function () {
        return this._ruleFunction;
    },

    setRuleFunction: function (ruleFunction) {
        this._ruleFunction = ruleFunction;
    },

    getErrorMsg: function () {
        return this._errorMsg;
    },

    setErrorMsg: function (errorMsg) {
        this._errorMsg = errorMsg;
    },

    getMsgPosition: function () {
        return this._msgPosition;
    },

    setMsgPosition: function (msgPosition) {
        this._msgPosition = msgPosition;
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
    initRender: function () {
        this._input = jQuery('<input type="text">');
        this.getDomInstance().append(this._input);
    },

    //渲染前处理方法
    beforeRender: function () {

    },

    //渲染方法
    render: function () {

    },

    //渲染后处理方法
    afterRender: function () {


    },

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
    }
};