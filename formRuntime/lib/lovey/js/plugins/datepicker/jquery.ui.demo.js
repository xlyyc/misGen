/**
 * jQuery widget插件示范
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
(function ($) {
    // 必选 插件名称 namespace.widgetname
    // 可选 一个已经存在的组件的prototype来继承
    // 可选 传递到组件prototype有一系列的属性组成的对象
    $.widget("wisedu.demo", $.ui.inputText, {
        //在这里面保存的是widget的配置信息，在创建widget的时候需要设置一些配置参数
        options: {
            width: 130
        },
        //此方法提供了options的属性的设置，一般情况下如果options里面的参数不需要特殊处理（校验，类型转换，以及设置属性的时候触发某一操作等）的时候不需要对此方法进行重写
        _setOption: function (key, value) {
            this.options[key] = value;
            window.console && console.log("_setOption");
        },
        //这个方法大多数时候不会被重写，这个方法在构建widget的时候在_create后执行。
        //它可以在_create调用后第一次调用。也可以在控件生成后的任何时间调用那样，_init允许你重写初始化，而不必强制用户调用destroy->create的循环
        _init: function () {
            window.console && console.log("_init");
            this.initDemo();
            //触发一个自定义事件,并将参数进行暴露
            this.element.trigger("initStart",this.options);
        },
        //这个方法就是创建widget的方法，在页面调用widget的时候，就会执行此方法，来构建widget。Widget的绝大大多数行为和结构都是在这里创建的。
        //比如创建元素，绑定事件。这个方法在实例化后立刻运行一次。
        _create: function () {
            window.console && console.log("_create");
        },
        initDemo: function () {
            window.console && console.log(this.options);
            window.console && console.log("initDemo");
            //this.element.trigger("initStart",this.options);
        },
        //禁用和启用widget的。其实是修改options.disabled
        enable: function () {
            window.console && console.log("enable");
        },
        disable: function () {
            window.console && console.log("disable");
        },
        //将widget实例从dom对象上移除，在开发widget的时候一般此方法是必须的。就是移除你自己在dom element上添加的样式和行为以及dom结构
        destroy: function () {
            window.console && console.log("destroy");
        }
    })
})(jQuery);
