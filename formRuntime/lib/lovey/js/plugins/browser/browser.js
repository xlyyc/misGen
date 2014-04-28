/**
 * jQuery 通用的浏览器，PC硬件信息获取，PC信息获取需要Active控件支持
 *
 * Author yzhao [178518@gmail.com]
 * history:
 *
 */
(function ($) {
    //命名空间定义
    $.loveyDefaults = $.loveyDefaults || {};

    //浏览器信息
    $.loveyDefaults.Browser = {
        appName: "",            //浏览器的正式名称
        appVersion: "",      //浏览器的版本号
        cookieEnabled: true,    // 返回用户浏览器是否启用了cookie
        mimeType: "",           // 浏览器支持的所有MIME类型的数组
        platform: "",           // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)/Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)和ＭacPPC(Macintosh PowerPC)
        plugins: "",            // 安装在浏览器上的所有插件的数组.虽然 plugins[] 数组是由 IE 4 定义的，但是在 IE 4 中它却总是空的，因为 IE 4 不支持插件和 Plugin对象。
        userLanguage: "",     // 用户在自己的操作系统上设置的语言（火狐没有）
        systemLanguage: "",     // 用户操作系统支持的默认语言（火狐没有）
        userAgent: "",          //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
        browserType: "",        //浏览器类型
        browserPlugins: "",      //安装的插件
        Director: false,         //
        javaEnabled: false,      //
        quickTime: false,         //是否有quickTime
        flash: false,             //flash插件情况
        mediaPlayer: false,       //是否有MediaPlayer
        realPlayer: false,         //是否有realPlayer
        screenHeight: 0,           //屏幕分辨率高度
        screenWidth: 0,             //屏幕分辨率宽度
        colorDepth: 0,               //颜色质量
        deviceXDPI: 0,                //像素
        fontSmoothingEnabled: false,    //字体是否平滑
        taintEnabled: false            //规定浏览器是否启用数据污点
    };

    //电脑信息
    $.loveyDefaults.Computer = {
        cpuClass: ""      //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）
    };

    //函数命名空间
    $.loveyBrowser = $.loveyBrowser || {};

    //获取浏览器和PC信息
    $.loveyBrowser.info = function (options) {
        $.loveyDefaults.Browser.appName = navigator.appName;
        $.loveyDefaults.Browser.appVersion = navigator.appVersion;
        $.loveyDefaults.Browser.cookieEnabled = navigator.cookieEnabled;
        $.loveyDefaults.Browser.mimeType = navigator.mimeType;
        $.loveyDefaults.Browser.platform = navigator.platform;
        $.loveyDefaults.Browser.plugins = navigator.plugins;
        $.loveyDefaults.Browser.userLanguage = navigator.userLanguage;
        $.loveyDefaults.Browser.systemLanguage = navigator.systemLanguage;
        $.loveyDefaults.Browser.browserType = navigator.userAgent.toLowerCase();
        $.loveyDefaults.Browser.browserPlugins = navigator.plugins;
        $.loveyDefaults.Browser.screenWidth = screen.width;
        $.loveyDefaults.Browser.screenHeight = screen.height;

        return $.loveyDefaults.Browser;
    }

})
        (jQuery);