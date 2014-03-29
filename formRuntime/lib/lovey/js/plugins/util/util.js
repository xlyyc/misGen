// JavaScript Document
(function(){
     topWindow = function () 
     {
        if (easyloader && easyloader.dialogToTop) 
        {
            if (top.using) 
            {
                return top.window;
            } 
            else 
            {
                //当前窗体对象暂存
                var parentWindow = window;
                while (parentWindow.using && (parentWindow.parent && parentWindow.parent.using)) 
                {
                    parentWindow = parentWindow.parent;
                }
                return parentWindow;
            }
        } 
        else if (easyloader && easyloader.isIframe)
        {
            return parent.window;
        }
        else 
        {
            return window;
        }
    };          
          
    //兼容oa
    getWindow = topWindow ;
})()


