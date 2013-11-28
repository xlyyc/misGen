if (!wof.customWindow.MetaTreeSelector) {
	wof.customWindow.MetaTreeSelector = {
		
		_tree: null,

        _initFlag: null,

        _dialogDiv: null,

		run: function(hidden, customParam) {
            if(wof.customWindow.MetaTreeSelector._initFlag==null){
                var tree = new wof.bizWidget.BizEntityTree();
                tree.setIsInside(true);
                tree.setTop(0);
                tree.setLeft(0);
                tree.setWidth(420);
                tree.setHeight(450);
                tree.setValue(JSON.parse(decodeURIComponent(hidden.val())));

                wof.customWindow.MetaTreeSelector._dialogDiv = jQuery('<div title="绑定实体属性"></div>');
                wof.customWindow.MetaTreeSelector._dialogDiv.append(tree.getDomInstance());
                wof.util.ObjectManager.add(tree.getId(), tree);

                wof.customWindow.MetaTreeSelector._tree = tree;
                wof.customWindow.MetaTreeSelector._initFlag = true;
            }
            wof.customWindow.MetaTreeSelector._tree.setNodes(wof.customWindow.MetaTreeSelector.getBizEntities(customParam));
            wof.customWindow.MetaTreeSelector._tree.render();
            wof.customWindow.MetaTreeSelector._dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                open: function(event, ui){
                    var filter = null;
                    if(customParam=='mainEntity'){  //主实体和主实体下的对等
                        filter = function(node){
                            return (node.level==2 && node.nodeType!='linkEntity') || (node.level==1 && node.nodeType!='linkEntity') || (node.level>2);
                        }
                    }else if(customParam=='field'){ //字段
                        filter = function(node){
                            return (node.nodeType=='mainEntity' || node.nodeType=='linkEntity' || node.nodeType=='childEntity');
                        }
                    }else if(customParam=='childEntity'){ //子实体及子实体下的对等实体
                        filter = function(node){
                            return (node.level==0) || (node.level==1) || (node.level==2 && node.nodeType!='childEntity') || (node.level>2 && node.nodeType!='linkEntity');
                        }
                    }else if(customParam=='allEntity'){   //所有实体
                        filter = function(node){
                            return (node.nodeType!='mainEntity' && node.nodeType!='linkEntity' && node.nodeType!='childEntity');
                        }
                    }
                    var nodes = wof.customWindow.MetaTreeSelector._tree.getNodesByFilter(filter);
                    for (var i=0;i<nodes.length; i++) {
                        wof.customWindow.MetaTreeSelector._tree.setChkDisabled(nodes[i], true);
                    }

                    wof.customWindow.MetaTreeSelector._tree.checkNodeByParam('nodeId',JSON.parse(decodeURIComponent(hidden.val())));
                },
                buttons:{
                    '确定':function(){
                        var nodes = wof.customWindow.MetaTreeSelector._tree.getCheckedNodes();
                        if(nodes.length>0){
                            var node = nodes[0];
                            hidden.val(encodeURIComponent(JSON.stringify(node.nodeId)));
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

		},

        getBizEntities:function(type){
            var bizEntity = {
                "childEntity": [{
                    "ID": "XXJL",
                    "alias": "XXZC",
                    "caculateFiled": [{
                        "caculateType": "",
                        "fieldCaculateParam": "",
                        "fieldCaption": "计算列323",
                        "fieldID": "calFiled2"
                    }],
                    "defaultCondition": "",
                    "name": "学习简历",
                    "properties": [{
                        "columnName": "YKTH",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "一卡通号",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "YKTH",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "id",
                        "uniqueName": ""
                    }, {
                        "columnName": "XX",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "学校",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "XX",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "string",
                        "uniqueName": ""
                    }, {
                        "columnName": "XL",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "XLMC",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "XL",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "XLZD",
                        "refEntityDisplay": "",
                        "refEntityProperty": "XLDM",
                        "refName": "xlcz",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "ref",
                        "uniqueName": ""
                    }, {
                        "columnName": "BYSJ",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "毕业时间",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "BYSJ",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "date",
                        "uniqueName": ""
                    }]
                }],
                "linkEntity": [{
                    "ID": "KNS",
                    "alias": "KNS_1",
                    "defaultCondition": "",
                    "isPhysicalLink": true,
                    "linkPath": "",
                    "name": "困难生",
                    "properties": [{
                        "columnName": "YKTH",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "一卡通号",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "YKTH",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "id",
                        "uniqueName": ""
                    }, {
                        "columnName": "KNS",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "困难生",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "KNS",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "string",
                        "uniqueName": ""
                    }],
                    "targetEntityID": "XSJBXX"
                }, {
                    "ID": "SHS",
                    "alias": "SHS_2",
                    "defaultCondition": "",
                    "isPhysicalLink": true,
                    "linkPath": "",
                    "name": "三好生",
                    "properties": [{
                        "columnName": "ykth",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "一卡通号",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "ykth",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "",
                        "uniqueName": ""
                    }, {
                        "columnName": "jxjlb",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "奖学金类别",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "jxjlb",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "",
                        "uniqueName": ""
                    }],
                    "targetEntityID": "KNS_1"
                }],
                "mainEntity": {
                    "alias": "XSJBXX",
                    "caculateFiled": [{
                        "caculateType": "",
                        "fieldCaculateParam": "",
                        "fieldCaption": "计算列1",
                        "fieldID": "mcalFiled1"
                    }],
                    "defaultCondition": "",
                    "mainEntityName": "学生基本信息",
                    "metaDataID": "XSJBXX",
                    "properties": [{
                        "columnName": "YKTH",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "一卡通号",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "YKTH",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "id",
                        "uniqueName": ""
                    }, {
                        "columnName": "XM",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "姓名",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "XM",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "",
                        "refEntityDisplay": "",
                        "refEntityProperty": "",
                        "refName": "",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "string",
                        "uniqueName": ""
                    }, {
                        "columnName": "XB",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "XBMC",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "XB",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "XBZD",
                        "refEntityDisplay": "",
                        "refEntityProperty": "XBDM",
                        "refName": "xbcz",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "ref",
                        "uniqueName": ""
                    }, {
                        "columnName": "ZY",
                        "content": "",
                        "defaultValue": "",
                        "description": "",
                        "disabled": false,
                        "display": "ZY",
                        "displayWidth": "",
                        "enumValue": "",
                        "errorMessage": "",
                        "isSystemAttribute": false,
                        "label": "ZYMC",
                        "length": "",
                        "max": 0,
                        "maxLength": 0,
                        "min": 0,
                        "minLength": 0,
                        "name": "ZY",
                        "notNull": false,
                        "prompt": "",
                        "refEntity": "ZYZD",
                        "refEntityDisplay": "",
                        "refEntityProperty": "ZYDM",
                        "refName": "zycz",
                        "scale": "0",
                        "sql": "",
                        "tip": "",
                        "type": "ref",
                        "uniqueName": ""
                    }]
                }
            };

            var tempLinkEntityTable = {};
            for(var i=0; i<bizEntity.linkEntity.length; i++){
                var ent = bizEntity.linkEntity[i];
                if(tempLinkEntityTable[ent.targetEntityID]==null){
                    tempLinkEntityTable[ent.targetEntityID] = [ent];
                }else{
                    tempLinkEntityTable[ent.targetEntityID].push(ent);
                }
            }

            function findEntityByTargetEntityIDFromLinkEntity(targetEntityID){
                return tempLinkEntityTable[targetEntityID];
            }

            var mainEntity = bizEntity.mainEntity;
            var entity = {
                "nodeId":mainEntity.alias,
                "name":mainEntity.alias+"("+mainEntity.mainEntityName+")"
                ,"nodeType":"mainEntity"
                //,"nocheck":true
            };
            var children = [];

            for(var i=0; i<mainEntity.properties.length; i++){
                children.push({"nodeId":(mainEntity.alias+"."+mainEntity.properties[i].name), "name":mainEntity.properties[i].label});
            }

            var caculateFiled = {"nodeId":"", "name":"计算列", "nocheck":true, "children":[]};
            for(var i=0;i<mainEntity.caculateFiled.length;i++){
                caculateFiled.children.push({"nodeId":(mainEntity.alias+"."+mainEntity.caculateFiled[i].fieldID), "name":mainEntity.caculateFiled[i].fieldCaption});
            }
            children.push(caculateFiled);

            function linkEntities(alias){
                var ents = findEntityByTargetEntityIDFromLinkEntity(alias);
                if(ents!=null){
                    var link = {"nodeId": "", "name":"对等实体", "nocheck":true, "children":[] };
                    for(var i=0; i<ents.length; i++){
                        var ent = ents[i];
                        //var linkEnt = {"nodeId":ent.alias, "name":ent.alias+"("+ent.name+")", "nocheck":true , "children":[]};
                        var linkEnt = {"nodeId":ent.alias, "name":ent.alias+"("+ent.name+")", "nodeType":"linkEntity", "children":[]};
                        link.children.push(linkEnt);
                        for(var t=0; t<ent.properties.length; t++){
                            linkEnt.children.push({"nodeId":(ent.alias+"."+ent.properties[t].name), "name":ent.properties[t].label});
                        }
                        var link2 = linkEntities(ent.alias);
                        if(link2!=null){
                            linkEnt.children.push(link2);
                        }
                    }
                    return link;
                }
            }

            var childEntity = {"nodeId": "", "name":"子实体", "nocheck":true, "children":[] };
            for(var i=0; i<bizEntity.childEntity.length; i++){
                var child = bizEntity.childEntity[i];
                var childNode = {"nodeId": child.alias, "name":child.alias+"("+child.name+")", "nodeType":"childEntity", "children":[] };
                for(var t=0; t<child.properties.length; t++){
                    childNode.children.push({"nodeId":(child.alias+"."+child.properties[t].name), "name":child.properties[t].label});
                }
                childEntity.children.push(childNode);


                var caculateFiled = {"nodeId":"", "name":"计算列", "nocheck":true, "children":[]};
                for(var i=0;i<child.caculateFiled.length;i++){
                    caculateFiled.children.push({"nodeId":(child.alias+"."+child.caculateFiled[i].fieldID), "name":child.caculateFiled[i].fieldCaption});
                }
                childEntity.children.push(caculateFiled);

                var link = linkEntities(child.alias);
                if(link!=null){
                    childNode.children.push(link);
                }
            }
            children.push(childEntity);

            var link = linkEntities(mainEntity.alias);
            if(link!=null){
                children.push(link);
            }

            entity.children = children;
            console.log(JSON.stringify([entity]));
            return [entity];
        }
		
	};
}
