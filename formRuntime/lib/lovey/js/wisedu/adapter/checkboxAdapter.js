wisedu.CheckboxAdapter = function (option) {
    this._plugin = $.loveyCheckbox.create(option);
};

wisedu.CheckboxAdapter.prototype = {
    setOptions: function (options) {
        this._plugin.setOptions(options);
    },
    getOptions: function () {
        this._plugin.getOptions();
    },
    appendTo: function (container) {
        if (container instanceof jQuery) {
            container.append(this._plugin.root.children);
        } else {
            console.error("container is not a jQuery object");
        }
    }

};