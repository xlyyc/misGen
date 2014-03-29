wisedu.InputAdapter = function (option) {
    this._plugin = $.loveyInput.create(option);
};

wisedu.InputAdapter.prototype = {
    setOptions: function (options) {
        this._plugin.setOptions(options);
    },
    getOptions: function () {
        this._plugin.getOptions();
    },
    appendTo: function (container) {
        if (container instanceof jQuery) {
            container.append(this._plugin.root);
        } else {
            console.error("container is not a jQuery object");
        }
    }

};