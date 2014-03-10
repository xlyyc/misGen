/**
 * jQuery 评论组件
 *
 * Author huangmin [ minhuang@wisedu.com ]
 * history:
 *
 * 使用说明:
 *
 *  在评论组件需要展示的地方放置
 *  <div class="cmtdiv" id="cmtdiv${resourceId}_${resourceType}"></div>
 *
 *  然后再js中添加如下代码
 *  1：使用class方式添加组件
 *  using(['comment'],function(){
 *         $.ligerComment.comment({comment_class:"cmtdiv"});
 *   });
 *   2：使用id方式添加组件
 *  using(['comment'],function(){
 *         $.ligerComment.comment({
 *            comment_type:"id",
 *            resourceId:"${resourceId}",
 *            resourceType:"${resourceType}"
 *         });
 *   });
 *
 *   ********重要*******
 *       在资源所在的service层需要实现必要的接口GeneralCommentService,重写isResourceCreateBySelf方法，判断当前的资源是否是本人发布的,
 *       例如：评论一张图片，重写isResourceCreateBySelf方法判断这张图片是否是自己创建的，如果是留言板，需要判断当前访问的页面是否是自己的留言板
 *
 *   备注：
 *   如果需要使用不同风格的评论插件，需要设定comment_style参数，目前支持（blog,reply,apply）
 *   如果是留言板，那么需要设定uid参数
 *
 */
// todo 代码需要优化，一些变量需要提取 by nnheng.
if (typeof (LoveyUIManagers) == "undefined") LoveyUIManagers = {};
(function($) {

    $.ligerComment = {};

    //JQ扩展函数,获得评论插件的管理器
    $.ligerComment.loveyGetcommentManager = function () {
        return LoveyUIManagers["LoveyUI_comment"];
    };

    // 评论默认参数
    $.ligerComment.defaults = {
        comment_type:"class", // 评论组件加载的方式（id,class），如果是class，那么只需要将所有的评论组件div的地方class设置为一致
        comment_class:null,  // 评论组件加载的class（在comment_type为class的时候必填）
        resourceId:null,  // 资源ID（在comment_type为id的时候必填）
        resourceType:null,  // 资源类型（在comment_type为id的时候必填）
        uid:null,             // 访问的留言板所属主页的用户id，即我访问用户xx的留言板，那么uid为xx的id,如果是留言模块，为必填字段
        comment_style:"blog",   //评论插件的风格
        page_new_comment:"comment.blog.newComment",   //评论插件新评论的片段
        page_comments:"comment.blog.comments",   //评论插件所有评论的片段
        page_reply:"comment.blog.reply",   //评论插件回复框的片段
        comment_num:2,    // 评论默认展示数量
        orderby:"desc",     // 排序的规则,desc和asc (默认倒序排列)
        page:1,             // 取第几页的数据
        canDelete:"true",    // 是否能删除评论
        reply_before:false,   // 回复框是否在评论之前
        need_user_link:true,   // 是否需要用户的链接
        at_user:false //是否开启atuser的功能.
    };

    /**
     * 主函数方法入口,类插件
     * @param options
     */
    $.ligerComment.comment = function(options) {

        var opts = $.extend({}, $.ligerComment.defaults, options || {});

        // 根据插件的风格设定所有评论展示的片段（tiles的配置）,如果需要添加新的风格，加上相应的判断然后配置tiles即可
        if(opts.comment_style.toLowerCase() == "blog"){
           opts.page_reply = "comment.blog.reply";
           opts.page_new_comment = "comment.blog.newComment";
           opts.page_comments = "comment.blog.comments";
        }else if(opts.comment_style.toLowerCase() == "reply"){
           opts.page_reply = "comment.reply.reply";
           opts.page_new_comment = "comment.reply.newComment";
           opts.page_comments = "comment.reply.comments";
           opts.comment_num = 10;
        }else if(opts.comment_style.toLowerCase() == "apply"){
           opts.page_reply = "comment.apply.reply";
           opts.page_new_comment = "comment.apply.newComment";
           opts.page_comments = "comment.apply.comments";
           opts.comment_num = 10;
        }

        var resourceIds = new Array();
        var resourceTypes = new Array();

        var cmt = {
            currentReply:null,

            /** 初始化页面中显示的评论框 */
            initOneComment:function (_opts) {
                var _resourceId = _opts.resourceId;  // resourceId
                var _resourceType = _opts.resourceType; // resourceType
                var _comStyle = _opts.comment_style;   // 评论插件的风格

                var div = $("#cmtdiv"+_resourceId+"_"+_resourceType);
                if(_opts.range != undefined && _opts.range != null){//可控制评论的范围.
                   div = _opts.range;
                }

                $.ajax({
                    async:false,
                    url:easyloader.URI + "/comment/getCommentReplyDialog.do",
                    data:{
                        "resourceType":_resourceType,
                        "resourceId":_resourceId,
                        "view":_opts.page_reply,
                        "uid":_opts.uid
                    },
                    dataType:"html",
                    success:function(data) {
                        div.html(data);
                    },
                    error:function() {
                        div.html("获取评论组件失败！");
                    }
                });

                if(_opts.reply_before){
                    // 在回复框之后添加所有回复展示区域
                    div.children(":last").after("<div id=\"cmtList"+_resourceId+"_"+_resourceType+"\"></div>");
                }else{
                    // 在回复框前面添加所有回复展示区域
                    div.children(":first").before("<div id=\"cmtList"+_resourceId+"_"+_resourceType+"\"></div>");
                }

                // 展示评论
                cmt.getComments(_opts);

                var showAll = div.find('#showAll'+_resourceId+'_'+_resourceType);
                var input = div.find('#input'+_resourceId+"_"+_resourceType);
                var submit = div.find('#submit'+_resourceId+"_"+_resourceType);
                var facebtn = div.find('#facebtn'+_resourceId+"_"+_resourceType);

                // 展开所有回复事件
                showAll.click(function(){
                    cmt.getComments($.extend({},_opts,{comment_num:-1}));
                });

                if(_comStyle.toLowerCase() == "blog"){
                    input.val("发表评论");
                }
                 //at功能初始化；
                if(opts.at_user){
                    input.atUserFn();
                }


                // 回复框点击事件
                input.click(function(){
                    cmt.openCommentReply(this);
                    input.focus();
                });

                // 发表新评论事件
                submit.click(function(){
                    cmt.publishComment(_opts);


//                    //发表新评论之后需要将新发表的评论绑定删除方法
//                    cmt.bindDelete($(".newcomment"));
//                    $(".newcomment").removeClass("newcomment");
                });

                // 图片快速回复事件
                facebtn.cluetip({
                         positionBy:'bottomTop',
                         activation:'click',
                         mouseOutClose:false,
                         rightOffset: 100,
                         width: 395,
                         closePosition:'top',
                         closeText:"关闭",
                         showTitle:false,
                         cluetipClass:"comment",
                         sticky:"false",
                         positionBy:"fixed"
                });

                /**$("#facebtn"+_resourceId+"_"+_resourceType).jqfaceedit({
                    textArea:'input'+_resourceId+"_"+_resourceType,
                    top:25,
                    left:-27
                });**/

                // 当图片快速回复框点击的时候，将光标定位到土图片快速回复框所在的文字回复框
                facebtn.click(function(){
                      input.click();
                });


            },

            /** 获得评论，并且显示评论 */
            getComments:function (params) {
                var resid = params.resourceId; // resourceId
                var num = params.comment_num;     // 获取的数量
                var restype = params.resourceType; // resourceType
                var orderby = params.orderby;  //排序的规则,desc和asc
                var range = params.range;//控制评论的显示范围.
                var cmtList = range.children("#cmtList" + resid+"_"+restype);
                if (num == null || num == undefined) {
                    num = 2; // 默认显示2条
                }

                $.ajax({
                    async:false,
                    url:easyloader.URI + "/comment/getAllComments.do",
                    data:{
                        "shownum":num,
                        "resourceType":restype,
                        "resourceId":resid,
                        "orderby":orderby,
                        "canDelete":params.canDelete,
                        "commentPage":params.page,
                        "view":params.page_comments,
                        "needUserLink":params.need_user_link
                    },
                    dataType:"html",
                    success:function(data) {
                        cmtList.html(data);
                        cmt.initAfterGetComments(params);
                    },
                    error:function() {
                        cmtList.html("获取评论失败！");
                    }
                });
            },

            // 收起回复和展开回复
            togglecomments:function(resId,resType,range) {
                var obj = range.find("#toggle" + resId+"_"+resType);
                var ulObj = range.find("#ul" + resId+"_"+resType);
                var cmtDiv = range.find("#cmtDiv" + resId+"_"+resType);
                var hideDiv = range.find("#hide" + resId+"_"+resType);
                var wallformDiv =range.find("#wall-form" + resId+"_"+resType);
                var input = range.find("#input" + resId + "_" + resType);
                if (obj.html() == "收起回复") {

                    ulObj.addClass("hidden");
                    wallformDiv.addClass("hidden");
                    obj.html("展开回复");
                } else {
                    obj.html("收起回复");

                    ulObj.removeClass("hidden");
                    ulObj.addClass("cmtul");
                    wallformDiv.removeClass("hidden");
                    wallformDiv.addClass("");

                    var target = input;
                    if (target) {
                        cmt.openCommentReply(target);
                        target.focus();
                    }
                }
            },

            // 展开完整的回复框
            openCommentReply:function(target) {
                target = $(target);
               if (target.hasClass("cmtinput")) {

                    target.attr("rows", "3");
                    target.removeClass("cmtinput");
                    target.addClass("cmtinput1");
                    target.siblings("#act" + target.attr("id").split("t")[1]).css("display", "");
                    target.siblings("#img" + target.attr("id").split("t")[1]).css("display", "");
                    target.val("");
                }
                cmt.currentReply = target;
            },

            // 关闭完整的回复框，展示精简框
            closeCommentReply:function(target){
                target = $(target);
                if (target.hasClass("cmtinput1")) {
                    target.attr("rows", "1");
                    target.removeClass("cmtinput1");
                    target.addClass("cmtinput");
                    target.siblings("#act" + target.attr("id").split("t")[1]).css("display", "none");
                    target.siblings("#img" + target.attr("id").split("t")[1]).css("display", "none");
                    target.val("发表评论");
                }
                cmt.currentReply = null;
            },

            // 发表一条新的评论
            publishComment:function(params){
                var resId = params.resourceId;
                var resType = params.resourceType;
                var range = params.range;
                var input = range.find("#input"+resId+"_"+resType);
                var wallForm = range.find("#wall-form"+resId+"_"+resType);
                var cmtDiv = range.find("#cmtdiv"+resId+"_"+resType);
                var _content = input.val();
                var _replyUserId = wallForm.children("#replyUserId").val();
                var _beforeCommentId = wallForm.children("#beforeCommentId").val();
                var ul = range.find("#ul"+resId+"_"+resType);
                var cmtCount = range.find("#cmtCount"+resId+"_"+resType);


                var _whisper=$("#whisper:checked").length == 0 ? 0:1;

                if(_content.length == 0 ||_content.length > 500){
                    $.ligerDialog.alert("评论字数必须在1到500之间", null, null, 'l-dialog', function(){
                    });
                    return false;
                }

                $.ajax({
                    async:false,
                    url:easyloader.URI + "/comment/publishOneComment.do",
                    data:{
                        "resourceType":resType,
                        "resourceId":resId,
                        "content":_content,
                        "replyUserId":_replyUserId,
                        "beforeCommentId":_beforeCommentId,
                        "canDelete":params.canDelete,
                        "whisper":_whisper,
                        "view":params.page_new_comment,
                        "needUserLink":params.need_user_link
                    },
                    dataType:"html",
                    success:function(data) {
                        if(ul.children("ol").length > 0){
                            ul.children(":first").before(data);
                        }else{
                            ul.append(data);
                        }

                        cmtCount.html(cmtCount.text()*1 + 1);

                        // 如果不展示回复框，那么就隐藏回复框
                        if(cmtDiv.find(".showReply").first().val() == "false")
                        {
                            wallForm.css("display","none");
                        }
                    }
                });

                input.val("");
                cmt.closeCommentReply(input);
                wallForm.children("#replyUserId").val("");
                wallForm.children("#beforeCommentId").val("");
            },

            // 回复其他人的评论的方法
            replyOther:function(params,target){
                var resId = params.resourceId;
                var resType = params.resourceType;
                var _comStyle = params.comment_style;

                if($("#wall-form"+resId+"_"+resType).css("display") == "none"){
                    $("#wall-form"+resId+"_"+resType).css("display","block");
                }

                cmt.openCommentReply($("#input"+resId+"_"+resType));
                var re_value_0 = $(target).children().text().split("|")[0];
                var re_value_1 = $(target).children().text().split("|")[1];
                if(_comStyle.toLowerCase() == "blog"){
                    $("#input"+resId+"_"+resType).val("回复@"+re_value_0+":");
                }else if(_comStyle.toLowerCase() == "reply"){
                    $("#input"+resId+"_"+resType).val("回复"+re_value_0+":");
                }
                var wallDiv = $("#wall-form" + resId +"_"+resType);
                wallDiv.children("#replyUserId").val(re_value_1);
                var len = $("#input"+resId+"_"+resType).val().length;
                if (document.all) {
                    var range = $("#input"+resId+"_"+resType)[0].createTextRange();
                    range.moveStart("character", len);
                    range.moveEnd("character", len);
                    range.select();
                } else {
                    $("#input"+resId+"_"+resType)[0].focus();
                    $("#input"+resId+"_"+resType)[0].setSelectionRange(len, len);
                }
                var ol_id_value;
                var ol_div = $(target)[0].parentNode.parentNode.parentNode.parentNode;
                if (ol_div != null) {
                    var ol_id = $(ol_div).attr("id");
                    ol_id_value = ol_id.split("t")[1];
                    wallDiv.children("#beforeCommentId").val(ol_id_value);
                }
            },

            // 删除一条评论
            deleteComment:function(commentId,url,_resourceId,_resourceType){
                $.ajax({
                    url:url,
                    dataType:"json",
                    success:function(data) {
                        if(data.status == 1){
                            $("#comment"+commentId).fadeOut("slow",function(){
                                $("#comment"+commentId).remove();
                            });
                            $("#cmtCount"+_resourceId+"_"+_resourceType).html($("#cmtCount"+_resourceId+"_"+_resourceType).text()*1 - 1);
                        }else{
                             $.ligerDialog.alert("删除评论失败！", null, null, 'l-dialog', function(){});
                        }

                    }
                });
            },

            // 点击图片快速回复中图片的事件
            clickFace:function(target){
                cmt.currentReply.focus();
                cmt.currentReply.val(cmt.currentReply.val() + $(target).attr("facecode"));
            },

            // 绑定删除评论方法
            bindDelete:function(target){
                $(target).die().live("click",function(){
                    var _commentId = $(this).attr("commentId");
                    var _url = $(this).attr("rel");
                    var _resourceId = $(this).attr("resId");
                    var _resourceType = $(this).attr("resType");
                    $.ligerDialog.confirm("确认删除这条评论?", null,
                            function(type){
                                if(type){
                                    cmt.deleteComment(_commentId,_url,_resourceId,_resourceType);
                                }
                             }, null, "question");
                });
            },

            // 获得所有评论之后需要初始化的事件
            initAfterGetComments:function(params){
                var _resourceId = params.resourceId;
                var _resourceType = params.resourceType;
                var range = params.range;
                var toggle = range.find("#toggle"+_resourceId+"_"+_resourceType);
                var ul = range.find("#ul"+_resourceId+"_"+_resourceType);
                var cmtCount = range.find("#cmtCount"+_resourceId+"_"+_resourceType);
                // 收起回复，展开回复事件
                toggle.click(function(){
                    cmt.togglecomments(_resourceId,_resourceType,range);
                });

                // 回复他人事件
                ul.find(".reply").click(function(){
                    cmt.replyOther(params,this);
                });

                if(params.comment_style.toLowerCase() == "apply"){
                   cmtCount.html($("#comments_count").val());
                }
            },

            // 初始化所有的评论组件需要展示地方
            initAllCmtDiv:function(_opts){
                if (_opts.comment_type == "class") {
                    var divs = $("." + _opts.comment_class);
                    for (i = 0; i < divs.length; i ++) {
                        var id = $(divs[i]).attr("id");
                        var resourceId = id.split("cmtdiv")[1].split("_")[0];
                        var resourceType = id.split("cmtdiv")[1].split("_")[1];
                        cmt.initOneComment($.extend({},_opts,{resourceId:resourceId,resourceType:resourceType},{range:$(divs[i])}));
                    }
                }else{
                    cmt.initOneComment($.extend({},_opts,{range:$("#cmtdiv"+_opts.resourceId+"_"+_opts.resourceType)}));
                }
            },

            // 获得分页数据
            getPageComments:function(_opts,obj){
                var _resId = $(obj).attr("resId");
                var _resType = $(obj).attr("resType");
                var _page = $(obj).attr("page");
                cmt.getComments($.extend({},_opts,{resourceId:_resId,resourceType:_resType,page:_page}));
            }

        };

        // 在页面中展现评论插件
        cmt.initAllCmtDiv(opts);

        if(opts.at_user){
            // 整个页面的click事件
            $("body").live("click",function(e){
                if(cmt.currentReply != null){
                    var e=e?e:window.event;
                    var tar = e.srcElement||e.target;
                    var _resourceId = cmt.currentReply.attr("id").split("t")[1].split("_")[0];
                    var _resourceType = cmt.currentReply.attr("id").split("t")[1].split("_")[1];
                    // 每个表情的点击事件, 要在绑定的clueTip框之内，防止其他地方也有这个_face的样式
                    if($(".cluetip-comment").find(tar).hasClass("_face")){
                        cmt.clickFace($(tar));
                        // 评论校验弹出层、评论插件和图片回复弹出层之外的点击事件
                    }else if(!$(tar).closest(".l-dialog").length && !$(tar).closest(".l-window-mask").length  && !$(tar).closest(".cluetip-outer").length && !$(tar).closest("#cmtdiv"+_resourceId+"_"+_resourceType).length){
                        // 如果已经弹出图片选择框，那么只关闭图片选择框，否则需要将回复框变成精简模式
                        if($(".cluetip-comment").css("display") == "block"){
                            $(".cluetip-comment").find(".cluetip-close").click();
                            $("#input"+_resourceId+"_"+_resourceType).focus();
                        }
                    }

                }
            });
        }else{
           // 整个页面的click事件
            $("body").live("click",function(e){
                if(cmt.currentReply != null){
                    var e=e?e:window.event;
                    var tar = e.srcElement||e.target;
                    var _resourceId = cmt.currentReply.attr("id").split("t")[1].split("_")[0];
                    var _resourceType = cmt.currentReply.attr("id").split("t")[1].split("_")[1];

                    // 每个表情的点击事件, 要在绑定的clueTip框之内，防止其他地方也有这个_face的样式
                    if($(".cluetip-comment").find(tar).hasClass("_face")){
                        cmt.clickFace($(tar));
                        // 评论校验弹出层、评论插件和图片回复弹出层之外的点击事件
                    }else if(!$(tar).closest(".l-dialog").length && !$(tar).closest(".l-window-mask").length  && !$(tar).closest(".cluetip-outer").length && !$(tar).closest("#cmtdiv"+_resourceId+"_"+_resourceType).length){
                        // 如果已经弹出图片选择框，那么只关闭图片选择框，否则需要将回复框变成精简模式
                        if($(".cluetip-comment").css("display") == "block"){
                            $(".cluetip-comment").find(".cluetip-close").click();
                            $("#input"+_resourceId+"_"+_resourceType).focus();
                        }else{
                            // 将回复框变成精简模式
                            cmt.closeCommentReply($("#input"+_resourceId+"_"+_resourceType));
                            $("#wall-form"+_resourceId+"_"+_resourceType).children("#replyUserId").val("");
                            $("#wall-form"+_resourceId+"_"+_resourceType).children("#beforeCommentId").val("");
                        }
                    }
                }
            });
        }

        // 需要将所有展现的评论绑定删除方法
        cmt.bindDelete($(".comment-del"));

        // 给分页标签添加事件
        $(".pageComments").die().live("click",function(){
            cmt.getPageComments(opts,this);
        });

        //构造一个管理器用于存放私有方法
        LoveyUIManagers["LoveyUI_comment"] = cmt;

        // 返回当前的管理器
        return LoveyUIManagers["LoveyUI_comment"];
    };

})(jQuery);