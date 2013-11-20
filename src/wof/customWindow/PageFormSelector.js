if (!wof.customWindow.PageFormSelector) {
	wof.customWindow.PageFormSelector = {
		
		_tree: null,

        _initFlag: null,

        _dialogDiv: null,

		run: function(hidden, customParam) {
            if(wof.customWindow.PageFormSelector._initFlag==null){
                var tree = new wof.bizWidget.ComponentsTree();
                tree.setIsInside(true);
                tree.setTop(0);
                tree.setLeft(0);
                tree.setWidth(420);
                tree.setHeight(450);

                wof.customWindow.PageFormSelector._dialogDiv = jQuery('<div title="绑定页面"></div>');
                wof.customWindow.PageFormSelector._dialogDiv.append(tree.getDomInstance());
                wof.util.ObjectManager.add(tree.getId(), tree);

                wof.customWindow.PageFormSelector._tree = tree;
                wof.customWindow.PageFormSelector._initFlag = true;
            }
            wof.customWindow.PageFormSelector._tree.setNodes(wof.customWindow.PageFormSelector.getPageFormList());
            wof.customWindow.PageFormSelector._tree.render();
            wof.customWindow.PageFormSelector._dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                open: function(event, ui){
                    var nodeTypes = customParam.split(',');
                    function filter(node){
                        return (node.level==1 && jQuery.inArray(node.nodeType, nodeTypes)==-1);
                    }
                    var nodes = wof.customWindow.PageFormSelector._tree.getNodesByFilter(filter);
                    for (var i=0;i<nodes.length; i++) {
                        wof.customWindow.PageFormSelector._tree.setChkDisabled(nodes[i], true);
                    }
                    if( hidden.val().length>0){
                        var componentIds = JSON.parse(decodeURIComponent(hidden.val())).split(',');
                        for(var i=0;i<componentIds.length;i++){
                            wof.customWindow.PageFormSelector._tree.checkNodeByParam('nodeId',componentIds[i]);
                        }
                    }
                },
                buttons:{
                    '确定':function(){
                        var nodes = wof.customWindow.PageFormSelector._tree.getCheckedNodes();
                        if(nodes.length>0){
                            var componentIds = [];
                            for(var i=0;i<nodes.length;i++){
                                var node = nodes[i];
                                componentIds.push(node.nodeId);
                            }
                            hidden.val(encodeURIComponent(JSON.stringify(componentIds.join(','))));
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

        getAppList: function(){
            var json = [
                {"id":"app1","label":"应用1"},
                {"id":"app2","label":"应用2"},
                {"id":"app3","label":"应用3"},
                {"id":"app4","label":"应用4"}
            ];
            return json;
        },

        getPageFormsByAppId : function(appId){
            var json = {
                "pageForms":[
                    {"id":"id1","name":"name1","caption":"caption1","moduleCode":"code1"},
                    {"id":"id2","name":"name2","caption":"caption2","moduleCode":"code2"},
                    {"id":"id3","name":"name3","caption":"caption3","moduleCode":"code3"},
                    {"id":"id4","name":"name4","caption":"caption4","moduleCode":"code4"},
                    {"id":"id5","name":"name5","caption":"caption5","moduleCode":"code5"}
                ],
                "modules":[
                    {"code":"code1","displayName":"模块1",parentId:""},
                    {"code":"code2","displayName":"模块2",parentId:"code1"},
                    {"code":"code3","displayName":"模块3",parentId:"code1"},
                    {"code":"code4","displayName":"模块4",parentId:"code2"},
                    {"code":"code5","displayName":"模块5",parentId:"code4"}
                ]
        };
            return json;
        }


		
	};
}
