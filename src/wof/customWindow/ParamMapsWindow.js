﻿if (!wof.customWindow.ParamMapsWindow) {
	wof.customWindow.ParamMapsWindow = {

        _initFlag: null,

        _paramWindow: null,

        _dialogDiv: null,

		run: function(hidden, customParam) {
            if(wof.customWindow.ParamMapsWindow._initFlag==null){
                var paramWindow = new wof.bizWidget.ParamWindow();
                paramWindow.setIsInside(true);
                paramWindow.setTop(0);
                paramWindow.setLeft(0);
                paramWindow.setWidth(420);
                paramWindow.setHeight(450);

                wof.customWindow.ParamMapsWindow._dialogDiv = jQuery('<div title="参数设置面板">');
                wof.customWindow.ParamMapsWindow._dialogDiv.append(paramWindow.getDomInstance());
                wof.util.ObjectManager.add(paramWindow.getId(), paramWindow);

                wof.customWindow.ComponentTreeSelector._paramWindow = paramWindow;
                wof.customWindow.ParamMapsWindow._initFlag = true;
            }

            wof.customWindow.ComponentTreeSelector._paramWindow.render();
            wof.customWindow.ParamMapsWindow._dialogDiv.dialog({
                resizable:false,
                width:450,
                height:550,
                modal: true,
                open: function(event, ui){
                    //wof.customWindow.ParamMapsWindow._input.val(decodeURIComponent(hidden.val()));
                },
                buttons:{
                    '确定':function(){
                        //var val = wof.customWindow.ParamMapsWindow._input.val();
                        //hidden.val(encodeURIComponent(val));

                        jQuery(this).dialog('close');
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
