if (!wof.customWindow.MetaTreeSelector) {
	wof.customWindow.MetaTreeSelector = {
		
		_tree: null,

        _initFlag: null,

		run: function(hidden) {
            if(wof.customWindow.MetaTreeSelector._initFlag==null){
                var tree = new wof.bizWidget.BizEntityTree();
                tree.setTop(0);
                tree.setLeft(0);
                tree.setWidth(420);
                tree.setHeight(450);
                tree.setValue(hidden.val());
                console.log('hidden.val()='+hidden.val());
                var layout = wof.util.ObjectManager.get(jQuery('#content').children('div[oid]').first().attr('oid'));
                tree.appendTo(layout);
                tree.render();
                wof.customWindow.MetaTreeSelector._tree = tree;
                wof.customWindow.MetaTreeSelector._initFlag = true;
            }

            var dialogDiv = jQuery('<div id="dialog-form" title="绑定实体属性"></div>');
            dialogDiv.append(wof.customWindow.MetaTreeSelector._tree.getDomInstance());
            dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                buttons:{
                    '确定':function(){



                        wof.customWindow.MetaTreeSelector._tree.remove();
                        jQuery(this).dialog('close');
                    },
                    '关闭':function(){
                        wof.customWindow.MetaTreeSelector._tree.remove();
                        jQuery(this).dialog('close');
                    }
                },
                close: function(event, ui){
                    jQuery(this).remove();
                }
            });

		}
		
	};
}
