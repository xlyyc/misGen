if (!wof.customWindow.PageFormSelector) {
	wof.customWindow.PageFormSelector = {
		
		_tree: null,

        _initFlag: null,

        _dialogDiv: null,

		run: function(hidden, customParam) {
            if(wof.customWindow.PageFormSelector._initFlag==null){
                var selData = {
                    'name':'dataType',
                    'value':dataType,
                    options:[
                        {
                            'name':'字符',
                            'value':'char'
                        },
                        {
                            'name':'数字',
                            'value':'number'
                        },
                        {
                            'name':'时间',
                            'value':'time'
                        }
                    ]
                };
                wof.customWindow.PageFormSelector._select = wof.customWindow.PageFormSelector._createSelect(selData);

                wof.customWindow.PageFormSelector._initFlag = true;
            }

            wof.customWindow.PageFormSelector._dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                open: function(event, ui){

                },
                buttons:{
                    '确定':function(){

                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                    }
                },
                close: function(event, ui){

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
