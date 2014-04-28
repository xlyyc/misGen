/**
 * jQuery lovey 1.0
 *
 * Author yzhao [178518@gmail.com]
 *
 * history:
 *
 * 继承方法，事件控制
 *
 */
(function ($) {
    /**
     * lovey继承
     * @param parent    父类
     * @param overrides 复写方法
     * @returns {*}
     */
    Function.prototype.loveyExtend = function (parent, overrides) {
        if (typeof parent != "function") return this;
        //保存对父类的引用
        this.base = parent.prototype;
        this.base.constructor = parent;
        //继承，子类
        var f = function () {
        };
        f.prototype = parent.prototype;
        this.prototype = new f();
        this.prototype.constructor = this;
        //附加属性方法
        if (overrides) $.extend(this.prototype, overrides);
    };

    //命名空间总跟
    $.com = {};
    $.com.wisedu = {};
    //核心对象
    window.lovey = $.com.wisedu.lovey = {
        version: "V1.0",
        managerIdPrev: "lovey",
        managerCount: 0,
        //组件管理器池
        managers: {},
        //错误提示
        error: {
            managerIsNotExist: "管理器id不经存在",
            managerIsExist: "管理器id已经存在"
        },
        getId: function (prev) {
            prev = prev || this.managerIdPrev;
            var id = prev + (1000 + this.managerCount);
            this.managerCount++;
            return id;
        },
        add: function (manager) {
            //实际调试中不起作用
            if (arguments.length == 2) {
                var m = arguments[1];
                m.id = m.id || m.options.id || arguments[0].id;
                this.addManager(m);
                return;
            }
            if (!manager.id) manager.id = this.getId(manager.__idPrev());
            //ID绑定必须唯一
            if (this.managers[manager.id]) throw new Error(this.error.managerIsExist);
            //放置到组件管理池
            this.managers[manager.id] = manager;
        },
        remove: function (arg) {
            if (typeof arg == "string" || typeof arg == "number") {
                delete $.com.wisedu.lovey.managers[arg];
            } else if (typeof arg == "object" && arg instanceof $.com.wisedu.lovey.core.Component) {
                delete $.com.wisedu.lovey.managers[arg.id];
            }
        },//获取ligerui对象
        //1,传入ligerui ID
        //2,传入Dom Object Array(jQuery)
        get: function (arg, idAttrName) {
            idAttrName = idAttrName || "loveyid";
            if (typeof arg == "string" || typeof arg == "number") {
                return $.com.wisedu.lovey.managers[arg];
            }
            else if (typeof arg == "object" && arg.length) {
                if (!arg[0][idAttrName] && !$(arg[0]).attr(idAttrName)) return null;
                return $.com.wisedu.lovey.managers[arg[0][idAttrName] || $(arg[0]).attr(idAttrName)];
            }
            return null;
        },
        //根据类型查找某一个对象
        find: function (type) {
            var arr = [];
            for (var id in this.managers) {
                var manager = this.managers[id];
                if (type instanceof Function) {
                    if (manager instanceof type) {
                        arr.push(manager);
                    }
                }
                else if (type instanceof Array) {
                    if ($.inArray(manager.__getType(), type) != -1) {
                        arr.push(manager);
                    }
                }
                else {
                    if (manager.__getType() == type) {
                        arr.push(manager);
                    }
                }
            }
            return arr;
        },
        //$.fn.liger{Plugin} 和 $.fn.ligerGet{Plugin}Manager
        //会调用这个方法,并传入作用域(this)
        //@parm [plugin]  插件名
        //@parm [args] 参数(数组)
        //@parm [ext] 扩展参数,定义命名空间或者id属性名
        run: function (plugin, args, ext) {
            if (!plugin) return;
            ext = $.extend({
                defaultsNamespace: 'loveyDefaults',
                methodsNamespace: 'loveyMethods',
                controlNamespace: 'controls',
                idAttrName: 'loveyid',
                isStatic: false,
                hasElement: true,           //是否拥有element主体(比如drag、resizable等辅助性插件就不拥有)
                propertyToElemnt: null      //链接到element的属性名
            }, ext || {});
            plugin = plugin.replace(/^loveyGet/, '');
            plugin = plugin.replace(/^lovey/, '');
            if (this == null || this == window || ext.isStatic) {
                if (!$.com.wisedu.lovey.plugins[plugin]) {
                    $.com.wisedu.lovey.plugins[plugin] = {
                        fn: $['lovey' + plugin],
                        isStatic: true
                    };
                }
                return new $.com.wisedu.lovey[ext.controlNamespace][plugin]($.extend({}, $[ext.defaultsNamespace][plugin] || {}, $[ext.defaultsNamespace][plugin + 'String'] || {}, args.length > 0 ? args[0] : {}));
            }
            if (!$.com.wisedu.lovey.plugins[plugin]) {
                $.com.wisedu.lovey.plugins[plugin] = {
                    fn: $.fn['lovey' + plugin],
                    isStatic: false
                };
            }
            if (/Manager$/.test(plugin)) return $.com.wisedu.lovey.get(this, ext.idAttrName);
            this.each(function () {
                if (this[ext.idAttrName] || $(this).attr(ext.idAttrName)) {
                    var manager = $.com.wisedu.lovey.get(this[ext.idAttrName] || $(this).attr(ext.idAttrName));
                    if (manager && args.length > 0) manager.set(args[0]);
                    //已经执行过
                    return;
                }
                if (args.length >= 1 && typeof args[0] == 'string') return;
                //只要第一个参数不是string类型,都执行组件的实例化工作
                var options = args.length > 0 ? args[0] : null;
                var p = $.extend({}, $[ext.defaultsNamespace][plugin] || {}, $[ext.defaultsNamespace][plugin + 'String'] || {}, options || {});
                if (ext.propertyToElemnt) p[ext.propertyToElemnt] = this;
                //构造函数，相当于初始化了对应组件里面的路由方法
                if (ext.hasElement) {
                    new $.com.wisedu.lovey[ext.controlNamespace][plugin](this, p);
                }
                else {
                    new $.com.wisedu.lovey[ext.controlNamespace][plugin](p);
                }
            });
            if (this.length == 0) return null;
            if (args.length == 0) return $.com.wisedu.lovey.get(this, ext.idAttrName);
            if (typeof args[0] == 'object') return $.com.wisedu.lovey.get(this, ext.idAttrName);
            if (typeof args[0] == 'string') {
                var manager = $.com.wisedu.lovey.get(this, ext.idAttrName);
                if (manager == null) return;
                if (args[0] == "option") {
                    if (args.length == 2)
                        return manager.get(args[1]);  //manager get
                    else if (args.length >= 3)
                        return manager.set(args[1], args[2]);  //manager set
                }
                else {
                    var method = args[0];
                    if (!manager[method]) return; //不存在这个方法
                    var parms = Array.apply(null, args);
                    parms.shift();
                    return manager[method].apply(manager, parms);  //manager method
                }
            }
            return null;
        },

        //扩展
        //1,默认参数
        //2,本地化扩展
        defaults: {},
        //3,方法接口扩展
        methods: {},
        //命名空间,核心控件,封装了一些常用方法
        core: {},
        //命名空间,组件的集合
        controls: {},
        //plugin 插件的集合
        plugins: {},
        //工具命名空间
        utils:{}
    };

    $.com.wisedu.lovey.utils.getNow = function () {
        var now = new Date();
        return now.getTime();
    };

    $.com.wisedu.lovey.utils.getMD5Str = function (moduleName) {
        if (moduleName == "" || moduleName == undefined) return "";
        return hex_md5($.com.wisedu.lovey.utils.getNow() + moduleName);
    };

    //扩展对象
    $.loveyDefaults = {};
    //扩展对象
    $.loveyMethos = {};

    //关联起来
    $.com.wisedu.lovey.defaults = $.loveyDefaults;
    $.com.wisedu.lovey.methods = $.loveyMethos;

    //组件基类
    //1,完成定义参数处理方法和参数属性初始化的工作
    //2,完成定义事件处理方法和事件属性初始化的工作
    $.com.wisedu.lovey.core.Component = function (options) {
        //事件容器
        this.events = this.events || {};
        //配置参数
        this.options = options || {};
        //子组件集合索引
        this.children = {};
    };

    $.extend($.com.wisedu.lovey.core.Component.prototype, {
        __getType: function () {
            return "$.lovey.core.Component";
        },
        __idPrev: function () {
            return "lovey";
        },

        //设置属性
        // arg 属性名    value 属性值
        // arg 属性/值   value 是否只设置事件
        set: function (arg, value) {
            if (!arg) return;
            if (typeof arg == 'object') {
                var tmp;
                if (this.options != arg) {
                    $.extend(this.options, arg);
                    tmp = arg;
                }
                else {
                    tmp = $.extend({}, arg);
                }
                if (value == undefined || value == true) {
                    for (var p in tmp) {
                        if (p.indexOf('on') == 0)
                            this.set(p, tmp[p]);
                    }
                }
                if (value == undefined || value == false) {
                    for (var p in tmp) {
                        if (p.indexOf('on') != 0)
                            this.set(p, tmp[p]);
                    }
                }
                return;
            }
            var name = arg;
            //事件参数
            if (name.indexOf('on') == 0) {
                if (typeof value == 'function')
                    this.bind(name.substr(2), value);
                return;
            }
            //this.trigger('propertychange', arg, value);
            if (!this.options) this.options = {};
            this.options[name] = value;
            var pn = '_set' + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn]) {
                this[pn].call(this, value);
            }
            //this.trigger('propertychanged', arg, value);
        },
        //获取属性
        get: function (name) {
            var pn = '_get' + name.substr(0, 1).toUpperCase() + name.substr(1);
            if (this[pn]) {
                return this[pn].call(this, name);
            }
            return this.options[name];
        },
        destroy: function () {
            //销毁组件
            $.lovey.remove(this);
        }
    });

    //界面组件基类,
    //1,完成界面初始化:设置组件id并存入组件管理器池,初始化参数
    //2,渲染的工作,细节交给子类实现
    //@parm [element] 组件对应的dom element对象
    //@parm [options] 组件的参数
    $.com.wisedu.lovey.core.UIComponent = function (element, options) {
        $.com.wisedu.lovey.core.UIComponent.base.constructor.call(this, options);
        var extendMethods = this._extendMethods();
        if (extendMethods) $.extend(this, extendMethods);
        this.element = element;
        //初始化
        this._init();
        //预渲染，渲染开始,渲染完成
        this._preRender();
        //this.trigger('render');
        this._render();
        //this.trigger('rendered');
        this._rendered();
    };

    $.com.wisedu.lovey.core.UIComponent.loveyExtend($.com.wisedu.lovey.core.Component, {
        __getType: function () {
            return "$.com.wisedu.lovey.core.UIComponent";
        },
        //扩展方法
        _extendMethods: function () {

        },
        _init: function () {
            this.type = this.__getType();
            if (!this.element) {
                this.id = this.options.id || $.com.wisedu.lovey.getId(this.__idPrev());
            }
            else {
                this.id = this.options.id || this.element.id || $.com.wisedu.lovey.getId(this.__idPrev());
            }
            //存入管理器池
            $.com.wisedu.lovey.add(this);

            if (!this.element) return;

            //读取attr方法,并加载到参数,比如['url']
            var attributes = this.attr();
            if (attributes && attributes instanceof Array) {
                for (var i = 0; i < attributes.length; i++) {
                    var name = attributes[i];
                    this.options[name] = $(this.element).attr(name);
                }
            }
            //读取lovey这个属性，并加载到参数，比如 lovey = "width:120,heigth:100"
            var p = this.options;
            if ($(this.element).attr("lovey")) {
                try {
                    var attroptions = $(this.element).attr("lovey");
                    if (attroptions.indexOf('{') != 0) attroptions = "{" + attroptions + "}";
                    eval("attroptions = " + attroptions + ";");
                    if (attroptions) $.extend(p, attroptions);
                }catch (e) {

                }
            }
        },
        //预渲染,可以用于继承扩展
        _preRender: function () {

        },
        _render: function () {

        },
        _rendered: function () {
            if (this.element) {
                $(this.element).attr("loveyid", this.id);
            }
        },
        //返回要转换成lovey参数的属性,比如['url']
        attr: function () {
            return [];
        },
        destroy: function () {
            if (this.element) $(this.element).remove();
            this.options = null;
            $.com.wisedu.lovey.remove(this);
        }
    });
})(jQuery);