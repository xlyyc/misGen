if (!wof.customWindow.MetaTreeSelector) {
	wof.customWindow.MetaTreeSelector = {
		
		_tree: null,

        _initFlag: null,

		run: function(hidden) {
            if(wof.customWindow.MetaTreeSelector._initFlag==null){
                var tree = new wof.bizWidget.BizEntityTree();
                tree.setTop(0);
                tree.setLeft(0);
                tree.setWidth(300);
                tree.setHeight(400);
                tree.setValue(hidden.val());
                console.log('hidden.val()='+hidden.val());
                var layout = wof.util.ObjectManager.get(jQuery('#content').children('div[oid]').first().attr('oid'));
                tree.appendTo(layout);
                tree.render();
                wof.customWindow.MetaTreeSelector._tree = tree;
                wof.customWindow.MetaTreeSelector._initFlag = true;
            }

		}
		
	};
}
