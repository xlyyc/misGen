CKEDITOR.plugins.add('insertcode',
    {
        init: function (editor) {
            var pluginName = 'Insertcode';
            CKEDITOR.dialog.add(pluginName, this.path + 'insertcode.js');
            editor.config.flv_path = editor.config.flv_path || (this.path);
            editor.addCommand(pluginName, new CKEDITOR.dialogCommand(pluginName));
            editor.ui.addButton('Insertcode',
                {
                    label: '插入代码',
                    command: pluginName,
                    icon: this.path + 'insertcode.gif'
                });
        }
    });