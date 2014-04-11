if (!wof.customWindow.PageParamWindow) {
	wof.customWindow.PageParamWindow = {

        _initFlag: null,

        _pageParamWindow: null,

        _dialogDiv: null,

		run: function() {
            if(wof.customWindow.PageParamWindow._initFlag==null){
                var pageParamWindow = new wof.bizWidget.PageParamWindow();
                pageParamWindow.setIsInside(true);
                //pageParamWindow.setContextParams(wof.customWindow.PageParamWindow.getContextParams());
                if(jQuery.isEmptyObject(pageInputParam)){
                    pageInputParam = wof.customWindow.PageParamWindow.getContextParams();
                }
                pageParamWindow.setTop(0);
                pageParamWindow.setLeft(0);
                pageParamWindow.setWidth(420);
                pageParamWindow.setHeight(450);

                wof.customWindow.PageParamWindow._dialogDiv = jQuery('<div title="页面参数设置">');
                wof.customWindow.PageParamWindow._dialogDiv.append(pageParamWindow.getDomInstance());
                wof.util.ObjectManager.add(pageParamWindow.getId(), pageParamWindow);

                wof.customWindow.PageParamWindow._pageParamWindow = pageParamWindow;
                wof.customWindow.PageParamWindow._initFlag = true;
            }
            wof.customWindow.PageParamWindow._pageParamWindow.setInputParam(pageInputParam);
            wof.customWindow.PageParamWindow._pageParamWindow.render();
            wof.customWindow.PageParamWindow._dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                open: function(event, ui){

                },
                buttons:{
                    '确定':function(){
                        pageInputParam = wof.customWindow.PageParamWindow._pageParamWindow.receiveCompParamValue();
                        jQuery(this).dialog('close');
                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                    }
                },
                close: function(event, ui){
                }
            });

		},

        getContextParams: function(){
            var json = [];
            json.push({"dataType":"char","name":"pageState","caption":"页面状态","value":""});
            json.push({"dataType":"char","name":"dataId","caption":"主记录ID","value":""});
            return json;
        }
		
	};
}
