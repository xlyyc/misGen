wisedu.CheckboxControl = function (option) {
    this._adapter = wisedu.adapterFactory.getCheckboxAdapter(option);
    this.setOptions(option);
};

wisedu.CheckboxControl.prototype = {
    setOptions: function (options) {
        this._adapter.setOptions(options);
    },
    getOptions: function () {
        return this._adapter.getOptions();
    },
    appendTo: function (ele) {
        this._adapter.appendTo(ele);
    }
};