<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<form id="wall-form${resId}_${resType}" method="post" action="${contextPath}/comment/sendAjax.do">
    <input type="hidden" id="replyUserId" name="replyUserId">
    <input type="hidden" name="beforeCommentId" id="beforeCommentId">

    <div id="reply${resId}_${resType}" class="inputdiv"><p style="display:none; float:left" id="img${resId}_${resType}" class="image">
        <a href="${contextPath}/euser/profile.do?uid=${loginUser.id}">
            <img alt="${loginUser.firstName}"
                 src='<ccs:userHead userId="${loginUser.id}" headPortrait="${loginUser.headPortrait}" headType="small"/>'>
        </a>
    </p><textarea id="input${resId}_${resType}" class="cmtinput unsharp" value="" cols="70" rows="1" name="content"></textarea>

        <div style="display:none;" class="cmtact" id="act${resId}_${resType}">
            <input type="button" style="float:right;margin-right:0px;" value="发表" id="submit${resId}_${resType}" class="f-button _cmtbtn">
            <input type="hidden" value="${resType}" name="resourceType">
            <input type="hidden" value="${resId}" name="resourceId">

            <div style="float:left;">
                <a id="facebtn${resId}_${resType}" style="display:block;height:20px" rel="${contextPath}/js/lovey/plugins/comment/face.jsp" href="javascript:void(0);"><img width="20" height="20"  class="faceImgbtn" style="cursor:pointer" src="${contextPath}/images/face/02.gif"><span style="margin-bottom:5px;padding: 3px 0;
    position: absolute;color:#000;">表情</span></a>
            </div>
        </div>
    </div>
</form>