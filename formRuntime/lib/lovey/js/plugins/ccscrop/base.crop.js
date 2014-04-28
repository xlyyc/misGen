/*-------------------------------------------------------
 LoveY Framework
 http://www.wisedu.com.cn
 Developed By: yzhao
 Mail: 178518@gmail.com

 demo.js
 JS插件开发规范演示
 ---------------------------------------------------------*/
//使用闭包,避免全局依赖,避免第三方破坏,兼容jQuery操作符'$'和'jQuery '

(function ($) {
    $.ccsCorpDefaults = $.ccsCorpDefaults || {};

    //受控制插件的行为参数集合
    $.ccsCorpDefaults.Options = {
        width: 550, //弹出框的宽度
        height: 400, //弹出框的高度
        imgWidth: 80, //图片裁剪的高度
        imgHeight: 80, //图片裁剪的宽度
        maxWidth: 600, //图片的最大宽度,当图片的高度大于宽度的时候，会自动用高度作为缩放比例
        resType: '', //资源类型
        resId: '', //资源编号
        elementDiv: '', //操作的div元素，作为回写的依据
        uploadImagUrl: '', //图片的上传处理地址
        cropImgUrl: '', //图片裁剪处理地址
        initSrc: '', //初始化地址
        popWinUrl:'' //弹出框地址
    };

    $.ccsCorpDefaults.OptionsString = {
        title: '更换图片'                  //标题
    };

    $.ccsCorp = $.ccsCorp || {};

    /**
     * 类级别的插件开发,单一插件的脚本,暴露函数,
     * 使用范围全局
     * $.ccsCorp.confirm()
     * @param options
     */
    $.ccsCorp.open = function (options) {
        $.ajax({
            type:"post",
            dataType: "html",
            url: options.popWinUrl,
            data:{
                "imgWidth":options.imgWidth,
                "imgHeight":options.imgHeight,
                "uploadImagUrl":options.uploadImagUrl,
                "cropImgUrl": options.cropImgUrl,
                "resType": options.resType,
                "resId": options.resId,
                "maxWidth": options.maxWidth,
                "elementId":$(options.elementDiv).attr("elid")
            },
            success: function (data) {
                $.ligerDialog.open({
                    title: options.title,
                    content: data,
                    width: options.width,
                    height: options.height,
                    showButton: false
                });
            }

        });
    };

    /**
     * 对象级别的插件开发，单一插件的脚本，使用委托进行绑定
     * $("#crop").ccsCorpPop()
     * @param options
     */
    $.fn.ccsCorpPop = function (options) {
        //获取当前操作的元素
        var tpElement = $(this);
        var corpId = tpElement[0].id;
        //接受options参数以控制插件的行为
        var t_options = $.extend($.ccsCorpDefaults.Options, $.ccsCorpDefaults.OptionsString, options || {});

        if (t_options.uploadImagUrl == '' || t_options.cropImgUrl == '' || t_options.popWinUrl == '') {
            $.ligerDialog.waitting("图片上传地址(uploadImagUrl)和裁剪地址(cropImgUrl)未指定...", 2000);
            return;
        }

        //函数定义
        var cp = {
            init: function () {
                //绑定click事件
                cp.upload.click(function () {
                            //解决多个绑定的时候不能正确识别ID
                            t_options = $.extend(t_options, {elementDiv: $(this)} || {});
                            $.ccsCorp.open(t_options);
                        }
                );

                cp.cancel.click(function () {
                    alert("cancel");
                })
            }
        };

        //取得绑定的元素
        cp.coprDiv = tpElement;

        if (tpElement[0].tagName.toLowerCase() == "input" || tpElement[0].tagName.toLowerCase() == "textarea") {
            return;
        }

        //对绑定的元素进行操作
        if (t_options.initSrc == '') {
            cp.coprDiv.append('<div class="app_pic_80"><span class="mask"></span><div id="backArea_' + corpId + '"></div></div>');
        } else {
            var uuid = new Date().getTime();
            var end = "";
            if (t_options.initSrc.indexOf("?") > 1) {
                end += "&v=" + uuid;
            } else {
                end += "?v=" + uuid;
            }
            cp.coprDiv.append('<div class="app_pic_80"><span class="mask"></span><div id="backArea_' + corpId + '"><img src="' + t_options.initSrc + end + '"></div></div>');
        }

        cp.elId = $(tpElement).attr("id");

        cp.coprDiv.append('<div class="ccscrop_btn"><a id="upload" elid="' + cp.elId + '" href="javascript:void(0);">上传</a> <!--| <a id="cancel" href="javascript:void(0);">清除</a>--></div>');
        cp.upload = cp.coprDiv.find("#upload");
        cp.cancel = cp.coprDiv.find("#cancel");

        cp.init();
    };
// 闭包结束
})(jQuery);