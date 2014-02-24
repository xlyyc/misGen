if (!wof.customWindow.PageFormSelector) {
    wof.customWindow.PageFormSelector = {

        _currAppId: null,

        _tree:null,

        _currFormFunctionId: null,

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
            var formFunctionId = JSON.parse(decodeURIComponent(hidden.val()));
            wof.customWindow.PageFormSelector._currFormFunctionId = formFunctionId;
            if(formFunctionId!=null){
                wof.customWindow.PageFormSelector._currAppId = wof.customWindow.PageFormSelector.getAppByFunctionId(formFunctionId).id;
            }

            var apps = wof.customWindow.PageFormSelector.getAppList();
            if(wof.customWindow.PageFormSelector._currAppId!=null){
                selData.value = wof.customWindow.PageFormSelector._currAppId;
            }else{
                selData.value = apps.defultAppId;
                wof.customWindow.PageFormSelector._currAppId = apps.defultAppId;
            }
            var appList = apps.apps;
            for(var i=0;i<appList.length;i++){
                var app = appList[i];
                selData.options.push({"name":app.label,"value":app.id});
            }
            var sel = wof.customWindow.PageFormSelector._createSelect(selData);
            sel.change(function(event){
                var val = jQuery(this).val();
                wof.customWindow.PageFormSelector._currAppId = val;

                wof.customWindow.PageFormSelector._tree.setNodes(wof.customWindow.PageFormSelector.getPageFormsByAppId(wof.customWindow.PageFormSelector._currAppId));
                wof.customWindow.PageFormSelector._tree.render();
            });

            wof.customWindow.PageFormSelector._tree.setNodes(wof.customWindow.PageFormSelector.getPageFormsByAppId(wof.customWindow.PageFormSelector._currAppId));
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
                    wof.customWindow.PageFormSelector._tree.checkNodeByParam('nodeId',wof.customWindow.PageFormSelector._currFormFunctionId);
                },
                buttons:{
                    '确定':function(){
                        var nodes = wof.customWindow.PageFormSelector._tree.getCheckedNodes();
                        if(nodes.length>0){
                            var node = nodes[0];
                            wof.customWindow.PageFormSelector._currFormFunctionId = node.nodeId;
                            hidden.val(encodeURIComponent(JSON.stringify(wof.customWindow.PageFormSelector._currFormFunctionId)));
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

        getAppByFunctionId: function(functionId){
            var json = JSON.parse(getAppByFunctionId(functionId));

            //var json = {"id":"JZGGL","label":"教职工管理"};

            return json;
        },

        getAppList: function(){
            var json = JSON.parse(getAppList());


             /* var json = {
             "defultAppId": "XGXT",
             "apps": [
             {"id": "XGXT","label": "学工系统"},
             {"id": "JZGGL","label": "教职工管理"}
             ]
             };*/
            return json;
        },

        getPageFormsByAppId : function(appId){
            var json =  JSON.parse(getPageFormsByAppId(appId));
              /*  var json = {
             "pageForms": [
             {"id": "JBXXLB","name": "JBXXLB","caption": "基本信息列表","functionId": "346708216040013824","moduleId": "344666175227445249"},
             {"id": "ZDCS","name": "ZDCS","caption": "字典测试","functionId": "346761353350234112","moduleId": "346761307212890112"},
             {"id": "XBZD","name": "XBZD","caption": "性别字典","functionId": "346761418231922688","moduleId": "346761307212890112"},
             {"id": "SHS","name": "SHS","caption": "三好生","functionId": "346761507163750400","moduleId": "344666175227445212"}
             ],
             "modules": [
             {"code": "XGXT_modules","displayName": "学工系统_模块","id": "344666175227445212","parentId": ""},
             {"code": "JBXXYM","displayName": "基本信息页面","id": "344666175227445249","parentId": "344666175227445212"},
             {"code": "ZDYM","displayName": "字典页面","id": "346761307212890112","parentId": "344666175227445249"}
             ]
             };*/

            var tempPageFormTable = {};
            for(var i=0; i<json.pageForms.length; i++){
                var page = json.pageForms[i];
                if(tempPageFormTable[page.moduleId]==null){
                    tempPageFormTable[page.moduleId] = [page];
                }else{
                    tempPageFormTable[page.moduleId].push(page);
                }
            }
            function findPageFormByModuleCode(id){
                return tempPageFormTable[id];
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
                        var child = {"nodeId":mod.id, "name":mod.displayName,  "nocheck":true, "children":[]};

                        var pages = findPageFormByModuleCode(child.nodeId);
                        if(pages!=null){
                            for(var t=0;t<pages.length;t++){
                                var page = pages[t];
                                child.children.push({"nodeId": page.functionId, "name":page.caption, "nocheck":false, "nodeType":"pageForm", "children":[] });
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
            var moduData = {"nodeId": root.id, "name":root.displayName, "nocheck":true, "children":[] };
            moduleData(moduData);
            return moduData;
        }



    };
}
