/**
 * jQuery 访客组件
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
//定义一个内部管理器
if (typeof (LoveyUIManagers) == "undefined") LoveyUIManagers = {};
(function ($) {
    //JQ扩展函数
    $.fn.loveyGetVisitManager = function () {
        return LoveyUIManagers[this[0].id + "_Visit"];
    };

    //命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //组件参数集合定义
    $.loveyDefaults.Visit = {
    };

    //组件提示从参数集合
    $.loveyDefaults.VisitString = {
    };


})(jQuery);