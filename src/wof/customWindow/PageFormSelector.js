if (!wof.customWindow.PageFormSelector) {
	wof.customWindow.PageFormSelector = {

        _currAppId: null,

        _tree:null,

        _currPageFormId: null,

		run: function(hidden, customParam) {
            if(wof.customWindow.PageFormSelector._initFlag ==null){
                var tree = new wof.bizWidget.PageFormTree();
                tree.setIsInside(true);
                tree.setTop(25);
                tree.setLeft(0);
                tree.setWidth(400);
                tree.setHeight(420);

                wof.util.ObjectManager.add(tree.getId(), tree);
                wof.customWindow.PageFormSelector._tree = tree;
                wof.customWindow.PageFormSelector._initFlag = true;
            }

            var selData = {"name":"appList","options":[]};
            var data = JSON.parse(decodeURIComponent(hidden.val()));
            wof.customWindow.PageFormSelector._currAppId = data.appId;
            wof.customWindow.PageFormSelector._currPageFormId = data.pageFormId;

            selData.value = wof.customWindow.PageFormSelector._currAppId;

            var appList = wof.customWindow.PageFormSelector.getAppList();
            for(var i=0;i<appList.length;i++){
                var app = appList[i];
                selData.options.push({"name":app.label,"value":app.id});
            }
            var sel = wof.customWindow.PageFormSelector._createSelect(selData);
            sel.change(function(event){
                var val = jQuery(this).val();
                wof.customWindow.PageFormSelector._currAppId = val;

                wof.customWindow.PageFormSelector._tree.setNodes(wof.customWindow.PageFormSelector.getPageFormsByAppId(wof.customWindow.PageFormSelector._currPageFormId));
                wof.customWindow.PageFormSelector._tree.render();
            });

            wof.customWindow.PageFormSelector._tree.setNodes(wof.customWindow.PageFormSelector.getPageFormsByAppId(wof.customWindow.PageFormSelector._currPageFormId));
            wof.customWindow.PageFormSelector._tree.render();

            var dialogDiv = jQuery('<div title="绑定页面"></div>');
            dialogDiv.append(jQuery('<label>选择应用</label>'));
            dialogDiv.append(sel);
            dialogDiv.append(wof.customWindow.PageFormSelector._tree.getDomInstance());
            dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                open: function(event, ui){
                    console.log('wof.customWindow.PageFormSelector._currPageFormId='+wof.customWindow.PageFormSelector._currPageFormId);
                    wof.customWindow.PageFormSelector._tree.checkNodeByParam('nodeId',wof.customWindow.PageFormSelector._currPageFormId);
                },
                buttons:{
                    '确定':function(){
                        var nodes = wof.customWindow.PageFormSelector._tree.getCheckedNodes();
                        if(nodes.length>0){
                            var node = nodes[0];
                            wof.customWindow.PageFormSelector._currPageFormId = node.nodeId;
                            hidden.val(encodeURIComponent(JSON.stringify({"appId":wof.customWindow.PageFormSelector._currAppId,"pageFormId":wof.customWindow.PageFormSelector._currPageFormId})));
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
                    wof.customWindow.PageFormSelector._tree.getDomInstance().remove();
                    jQuery(this).remove();
                }
            });

		},

        //创建下拉框
        _createSelect: function(selectData){
            var sel =jQuery('<select name="'+selectData.name+'">');
            var options = selectData.options;
            for(var i=0;i<options.length;i++){
                var opt = options[i];
                sel.append(jQuery('<option value="'+opt.value+'" '+(opt.value==selectData.value?'selected':'')+'>'+opt.name+'</option>'));
            }
            return sel;
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
                    {"id":"id4","name":"name4","caption":"caption4","moduleCode":"code5"},
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

            var tempPageFormTable = {};
            for(var i=0; i<json.pageForms.length; i++){
                var page = json.pageForms[i];
                if(tempPageFormTable[page.moduleCode]==null){
                    tempPageFormTable[page.moduleCode] = [page];
                }else{
                    tempPageFormTable[page.moduleCode].push(page);
                }
            }
            function findPageFormByModuleCode(code){
                return tempPageFormTable[code];
            }

            var tempModuleTable = {};
            for(var i=0; i<json.modules.length; i++){
                var module = json.modules[i];
                if(tempModuleTable[module.parentId]==null){
                    tempModuleTable[module.parentId] = [module];
                }else{
                    tempModuleTable[module.parentId].push(module);
                }
            }

            function findModuleByParentId(parentId){
                return tempModuleTable[parentId];
            }
            function moduleData(modu){
                var modules = findModuleByParentId(modu.nodeId);
                if(modules!=null){
                    for(var i=0; i<modules.length; i++){
                        var mod = modules[i];
                        var child = {"nodeId":mod.code, "name":mod.displayName,  "nocheck":true, "children":[]};

                        var pages = findPageFormByModuleCode(child.nodeId);
                        if(pages!=null){
                            for(var t=0;t<pages.length;t++){
                                var page = pages[t];
                                child.children.push({"nodeId": page.id, "name":page.caption, "nocheck":false, "nodeType":"pageForm", "children":[] });
                            }
                        }

                        var moduData2 = moduleData(child);
                        if(moduData2!=null){
                            child.children.push(moduData2);
                        }
                        modu.children.push(child);
                    }
                }
            }
            var root = json.modules[0];
            var moduData = {"nodeId": root.code, "name":root.displayName, "nocheck":true, "children":[] };
            moduleData(moduData);
            return moduData;
        }


		
	};
}
