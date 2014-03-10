(function () {
    //定义插件执行的函数
    var upload = {
        exec: function (editor) {
            // by yzhao IE6/7/8不支持
            // var lengthObj = Object.keys(CKEDITOR.instances).length;
            var i=0;
            for(var each in CKEDITOR.instances){
                i++;
            }
            if (i==1) {
                openUpload();
            } else {
                $.each(CKEDITOR.instances,function(i,item){
                    if (editor.name==item.name){
                        //window.console && console.log(item.name);
                        openUpload({"ckEditorName":item.name});
                    }
                });
            }
        }
    };

    //定义插件名称
    var pluginName = "Upload";
    CKEDITOR.plugins.add("upload", {
        init: function (editor) {
            editor.addCommand(pluginName, upload);
            editor.ui.addButton(pluginName, {
                label: "添加图片",
                icon: this.path + "upload.jpg",
                command: pluginName
            });
        }
    });
})();
