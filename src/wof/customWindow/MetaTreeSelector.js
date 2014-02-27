if (!wof.customWindow.MetaTreeSelector) {
	wof.customWindow.MetaTreeSelector = {
		
		_tree: null,

        _initFlag: null,

        _dialogDiv: null,

		run: function(hidden, customParam,propertyBar) {
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
            var bizEntity = JSON.parse(getBizEntities());

            //var bizEntity = {"childEntity":[{"ID":"JTCY","alias":"jtcychild","calculateFiled":[],"defaultCondition":"","name":"家庭成员","properties":[{"columnName":"gx","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197743245148160","isSystemAttribute":false,"label":"关系","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gx","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197782633857024","isSystemAttribute":false,"label":"姓名","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"nl","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197805966770176","isSystemAttribute":false,"label":"年龄","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"nl","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"integer","uniqueName":""},{"columnName":"gzdw","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197838208385024","isSystemAttribute":false,"label":"工作单位","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gzdw","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"lxfs","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197860161372160","isSystemAttribute":false,"label":"联系方式","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lxfs","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"id","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360197917573005312","isSystemAttribute":false,"label":"id","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"id","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"zgid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"360601494145613824","isSystemAttribute":false,"label":"职工ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""}]},{"ID":"HJXX","alias":"hjxxchild","calculateFiled":[],"defaultCondition":"","name":"获奖信息","properties":[{"columnName":"jxjlid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041042047090688","isSystemAttribute":false,"label":"奖项纪录ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"jxjlid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"zgid","content":"","defaultValue":"","description":"jxmc","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"1","guid":"350041084380200960","isSystemAttribute":false,"label":"职工ID","length":"1","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"JZGJBXXB","refEntityDisplay":"xm","refEntityProperty":"zgid","refName":"zzidref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"jxbm","content":"","defaultValue":"","description":"jxmc","disabled":true,"display":"","displayWidth":"","enumValue":"1","errorMessage":"1","guid":"350041115774566400","isSystemAttribute":false,"label":"类别编码","length":"1","max":0,"maxLength":0,"min":0,"minLength":0,"name":"jxbm","notNull":false,"prompt":"","refEntity":"HJLB","refEntityDisplay":"jxmc","refEntityProperty":"jxbm","refName":"jxbmref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"hjmc","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041168790568960","isSystemAttribute":false,"label":"获奖名称","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjmc","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"hjrqks","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041224167964672","isSystemAttribute":false,"label":"获奖日期开始","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjrqks","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"hjrqjs","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041263426650112","isSystemAttribute":false,"label":"获奖日期结束","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjrqjs","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"dqzt","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350041300714012672","isSystemAttribute":false,"label":"当前状态","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"dqzt","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"integer","uniqueName":""},{"columnName":"hjms","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"359756481085980672","isSystemAttribute":false,"label":"获奖描述","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"hjms","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""}]}],"linkEntity":[{"ID":"JZGJBXXB","alias":"444","defaultCondition":"","isPhysicalLink":false,"linkPath":"[JZGJBXXB.zgid] = [444.zgid]","name":"教职工基本信息表","properties":[{"columnName":"zgid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037837531725824","isSystemAttribute":false,"label":"职工ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"gh","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037995602460672","isSystemAttribute":false,"label":"工号","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gh","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038199814733824","isSystemAttribute":false,"label":"姓名","length":"5","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xb","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038224783425536","isSystemAttribute":false,"label":"性别","length":"4","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xb","notNull":false,"prompt":"","refEntity":"XBCZB","refEntityDisplay":"xbmc","refEntityProperty":"xbbh","refName":"XBref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"xmpy","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038292810842112","isSystemAttribute":false,"label":"姓名拼音","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xmpy","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"csrq","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038337308213248","isSystemAttribute":false,"label":"出生日期","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"csrq","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"zzmmbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038401208434688","isSystemAttribute":false,"label":"政治面貌编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzmmbm","notNull":false,"prompt":"","refEntity":"RSZZMMCZB","refEntityDisplay":"zzmmmc","refEntityProperty":"zzmmbm","refName":"zzmmref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"lbbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038453570125824","isSystemAttribute":false,"label":"类别编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbm","notNull":false,"prompt":"","refEntity":"ZGLBCZB","refEntityDisplay":"lbmc","refEntityProperty":"lbbm","refName":"zglbref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zzid","content":"","defaultValue":"","description":"name","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038503507509248","isSystemAttribute":false,"label":"组织ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzid","notNull":false,"prompt":"","refEntity":"organization","refEntityDisplay":"name","refEntityProperty":"id","refName":"zzidref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zgbz","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038638446657536","isSystemAttribute":false,"label":"职工备注","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgbz","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"zzjg","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"352584552268840960","isSystemAttribute":false,"label":"所在院系","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzjg","notNull":false,"prompt":"","refEntity":"ZZJGB","refEntityDisplay":"zzmc","refEntityProperty":"zzbm","refName":"zzjgref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""}],"targetEntityID":"JZGJBXXB"},{"ID":"organization","alias":"organization","defaultCondition":"","isPhysicalLink":true,"linkPath":"[JZGJBXXB.zzid] = [organization.code]","name":"组织表","properties":[{"columnName":"id","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927332474208256","isSystemAttribute":false,"label":"id","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"id","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"org_type","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927396701585408","isSystemAttribute":false,"label":"org_type","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"org_type","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"integer","uniqueName":""},{"columnName":"code","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927427227729920","isSystemAttribute":false,"label":"code","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"code","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"name","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927444525039616","isSystemAttribute":false,"label":"name","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"name","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"is_use","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927485419503616","isSystemAttribute":false,"label":"is_use","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"is_use","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"boolean","uniqueName":""},{"columnName":"parent_org_id","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"347927525680627712","isSystemAttribute":false,"label":"parent_org_id","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"parent_org_id","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"long","uniqueName":""}],"targetEntityID":"JZGJBXXB"}],"mainEntity":{"alias":"JZGJBXXB","calculateFiled":[],"defaultCondition":"","mainEntityName":"教职工基本信息表","metaDataID":"JZGJBXXB","properties":[{"columnName":"zgid","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037837531725824","isSystemAttribute":false,"label":"职工ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgid","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"id","uniqueName":""},{"columnName":"gh","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350037995602460672","isSystemAttribute":false,"label":"工号","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"gh","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038199814733824","isSystemAttribute":false,"label":"姓名","length":"5","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xm","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"xb","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038224783425536","isSystemAttribute":false,"label":"性别","length":"4","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xb","notNull":false,"prompt":"","refEntity":"XBCZB","refEntityDisplay":"xbmc","refEntityProperty":"xbbh","refName":"XBref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"xmpy","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038292810842112","isSystemAttribute":false,"label":"姓名拼音","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"xmpy","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"csrq","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038337308213248","isSystemAttribute":false,"label":"出生日期","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"csrq","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"date","uniqueName":""},{"columnName":"zzmmbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038401208434688","isSystemAttribute":false,"label":"政治面貌编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzmmbm","notNull":false,"prompt":"","refEntity":"RSZZMMCZB","refEntityDisplay":"zzmmmc","refEntityProperty":"zzmmbm","refName":"zzmmref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"lbbm","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038453570125824","isSystemAttribute":false,"label":"类别编码","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"lbbm","notNull":false,"prompt":"","refEntity":"ZGLBCZB","refEntityDisplay":"lbmc","refEntityProperty":"lbbm","refName":"zglbref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zzid","content":"","defaultValue":"","description":"name","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038503507509248","isSystemAttribute":false,"label":"组织ID","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzid","notNull":false,"prompt":"","refEntity":"organization","refEntityDisplay":"name","refEntityProperty":"id","refName":"zzidref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""},{"columnName":"zgbz","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"350038638446657536","isSystemAttribute":false,"label":"职工备注","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zgbz","notNull":false,"prompt":"","refEntity":"","refEntityDisplay":"","refEntityProperty":"","refName":"","scale":"0","sql":"","tip":"","type":"string","uniqueName":""},{"columnName":"zzjg","content":"","defaultValue":"","description":"","disabled":false,"display":"","displayWidth":"","enumValue":"","errorMessage":"","guid":"352584552268840960","isSystemAttribute":false,"label":"所在院系","length":"","max":0,"maxLength":0,"min":0,"minLength":0,"name":"zzjg","notNull":false,"prompt":"","refEntity":"ZZJGB","refEntityDisplay":"zzmc","refEntityProperty":"zzbm","refName":"zzjgref","scale":"0","sql":"","tip":"","type":"ref","uniqueName":""}]}};

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

            var calculateFiled = {"nodeId":"", "name":"计算列", "nocheck":true, "children":[]};
            for(var i=0;i<mainEntity.calculateFiled.length;i++){
                calculateFiled.children.push({"nodeId":(mainEntity.alias+"."+mainEntity.calculateFiled[i].fieldID), "name":mainEntity.calculateFiled[i].fieldCaption});
            }
            children.push(calculateFiled);

            function linkEntities(alias){
                var ents = findEntityByTargetEntityIDFromLinkEntity(alias);
                if(ents!=null){
                    var link = {"nodeId": "", "name":"对等实体", "nocheck":true, "children":[] };
                    for(var i=0; i<ents.length; i++){
                        var ent = ents[i];
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


                var calculateFiled = {"nodeId":"", "name":"计算列", "nocheck":true, "children":[]};
                for(var y=0;y<child.calculateFiled.length;y++){
                    calculateFiled.children.push({"nodeId":(child.alias+"."+child.calculateFiled[y].fieldID), "name":child.calculateFiled[y].fieldCaption});
                }
                childEntity.children.push(calculateFiled);

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
