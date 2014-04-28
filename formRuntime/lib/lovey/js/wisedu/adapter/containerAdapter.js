wisedu.ContainerAdapter = function (option) {
    this._plugin = $.loveyContainer.create(option);
};

wisedu.ContainerAdapter.prototype = {
    setOptions: function (option) {
        this._plugin.setOptions(option);
    },
    getOptions: function () {
        return this._plugin.getOptions();
    },
    append: function (control) {
        var plugin = control && control._adapter && control._adapter._plugin;
        if (plugin.root) {
            this._plugin.append(plugin.root);
        } else {
            console.error('the plugin does not have root element');
        }
    },
    appendToBody: function () {
        this._plugin.appendToBody();
    }

};