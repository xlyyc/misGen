if (!wof.customWindow.ComponentTreeSelector) {
	wof.customWindow.ComponentTreeSelector = {
		
		_tree: null,

        _initFlag: null,

        _dialogDiv: null,

		run: function(hidden) {
            if(wof.customWindow.ComponentTreeSelector._initFlag==null){
                var tree = new wof.bizWidget.ComponentsTree();
                tree.setTop(0);
                tree.setLeft(0);
                tree.setWidth(420);
                tree.setHeight(450);

                wof.customWindow.ComponentTreeSelector._dialogDiv = jQuery('<div title="绑定构件"></div>');
                wof.customWindow.ComponentTreeSelector._dialogDiv.append(tree.getDomInstance());
                wof.util.ObjectManager.add(tree.getId(), tree);

                wof.customWindow.ComponentTreeSelector._tree = tree;
                wof.customWindow.ComponentTreeSelector._initFlag = true;
            }
            wof.customWindow.ComponentTreeSelector._tree.setNodes(wof.customWindow.ComponentTreeSelector.getComponents());
            wof.customWindow.ComponentTreeSelector._tree.render();
            wof.customWindow.ComponentTreeSelector._dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                open: function(event, ui){
                    wof.customWindow.ComponentTreeSelector._tree.checkAllNodes(false);
                    if( hidden.val().length>0){
                        var componentIds = hidden.val().split(',');
                        for(var i=0;i<componentIds.length;i++){
                            wof.customWindow.ComponentTreeSelector._tree.checkNodeByParam('nodeId',componentIds[i]);
                        }
                    }
                },
                buttons:{
                    '确定':function(){
                        var nodes = wof.customWindow.ComponentTreeSelector._tree.getCheckedNodes();
                        if(nodes.length>0){
                            var componentIds = [];
                            for(var i=0;i<nodes.length;i++){
                                var node = nodes[i];
                                componentIds.push(node.nodeId);
                            }
                            hidden.val(componentIds.join(','));
                            jQuery(this).dialog('close');
                        }else{
                            alert('请至少选择一个构件');
                        }
                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                    }
                },
                close: function(event, ui){
                }
            });

		},

        getComponents : function(){
            var layout = getContentLayout();
            var data = layout.getData();
            var json = [];
            var voucherComponents = {"nodeId":"0", "name":"表头构件", nocheck:true, children:[]};
            var gridComponents = {"nodeId":"1", "name":"列表构件", nocheck:true, children:[]};
            json.push(voucherComponents);
            json.push(gridComponents);
            function findComponent(d){
                if(d.className=='wof.bizWidget.VoucherComponent'){
                    voucherComponents.children.push({"nodeId": d.id, "name": d.caption});
                } else if(d.className=='wof.bizWidget.GridComponent'){
                    gridComponents.children.push({"nodeId": d.id, "name": d.name});
                }
                var cds = d.childNodes;
                for(var i=0; i<cds.length; i++){
                    var c = cds[i];
                    findComponent(c);
                }
            }
            findComponent(data);
            return json;
        }
		
	};
}
