if (!wof.customWindow.MetaTreeSelector) {
	wof.customWindow.MetaTreeSelector = {
		
		_tree: null,

        _initFlag: null,

        _dialogDiv: null,

		run: function(hidden) {
            if(wof.customWindow.MetaTreeSelector._initFlag==null){
                var tree = new wof.bizWidget.BizEntityTree();
                tree.setTop(0);
                tree.setLeft(0);
                tree.setWidth(420);
                tree.setHeight(450);
                tree.setValue(hidden.val());

                wof.customWindow.MetaTreeSelector._dialogDiv = jQuery('<div id="dialog-form" title="绑定实体属性"></div>');
                wof.customWindow.MetaTreeSelector._dialogDiv.append(tree.getDomInstance());
                wof.util.ObjectManager.add(tree.getId(), tree);
                tree.render();

                wof.customWindow.MetaTreeSelector._tree = tree;
                wof.customWindow.MetaTreeSelector._initFlag = true;
            }
            wof.customWindow.MetaTreeSelector._tree.checkNodeByParam('nodeId',hidden.val());
            wof.customWindow.MetaTreeSelector._dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                buttons:{
                    '确定':function(){
                        var nodes = wof.customWindow.MetaTreeSelector._tree.getCheckedNodes();
                        if(nodes.length>0){
                            var node = nodes[0];
                            hidden.val(node.nodeId);
                            jQuery(this).dialog('close');
                        }else{
                            alert('请选择一个属性');
                        }
                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                    }
                },
                close: function(event, ui){
                }
            });

		}
		
	};
}
