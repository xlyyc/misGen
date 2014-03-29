//定义一个加载器，注意，是全局变量
var easyloader = {
    debugMode: false, //true开发模式，false调试模式，实际中生产环境配置false，开启择不缓存文件
    minMode: false, //迷你模式下，只加载min的文件
    hideFormError: true,//校验默认规则，隐藏模式
    base: '.', //该属性是为了加载js,记录文件夹路径的
    theme: '', //个性主题标识
    css: true, //是否包含css样式控制
    pluginsStr: 'plugins', //主插件的地址
    dialogCssName: 'dialog_style01', //解决CMS和UCP的组件的冲突问题,其他项目不要使用
    dialogToTop: false,//是否弹到顶层,弹到顶层以后,回写需要指定document对象，不支持默认写到当前
    dialogAllowToMax: false, //弹出框允许最大化
    dialogAllowToMin: false, //弹出框允许最小化
    dialogAllowRefresh: false, //弹出框允许刷新
    /**
     * 外部插件开发最简单的配置是单插件模式，插件和配置文件放在js目录下，所有插件放在plugins目录下
     * 如果是多个插件必须已数组的形式统一给定
     */
    sysloading: "<div class='sys_loading'>正在加载中，请稍候...</div>",//全局统一等待样式
    extPlugins: (typeof pluginloader == "undefined") ? "" : pluginloader.defPlugins, //外部插件的集合
    extPluginsRoot: '', //扩展插件的根目录地址,程序会自动处理，不需要关注
    extPluginsFolder: 'js', //外部插件的相对目录,这个目录是一个相对根目录，和lovey目录必须同级
    extPluginsName: 'plugins', //用于存放插件的包名
    splitStr: '/', //文件路径分隔符
    URI: '', //应用部署路径
    pluginsJsonDone: false, //主插件是否加载完毕
    extPluginJsonDone: {}, //辅助插件是否加载完毕
    locale: null,
    isIframe: false, //是否iframe集成，默认否，by yzhao
    timeout: 2000 //加载超时事件
};