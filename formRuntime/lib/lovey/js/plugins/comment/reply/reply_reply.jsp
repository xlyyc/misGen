<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<div class="sect-content" id="commentReply">
        <div class="pf-wall-post">
            <form id="wall-form${resId}_${resType}"  style="<c:if test="${!showReply}">display: none;</c:if>" method="post" action="/comment/sendAjax.do">
                <input type="hidden" name="replyUserId" id="replyUserId">
       			<input type="hidden" name="beforeCommentId" id="beforeCommentId">
                <div id="reply${resId}_${resType}" class="inputdiv">
                <textarea class="text-content" cols="60" rows="5" id="input${resId}_${resType}" name="content"></textarea>
                </div>
                <p class="maxlength-hint warning">
                    <span></span>
                </p>


                <div class="pf-wall-act">
                    <div style="float:left;">
						<a id="facebtn${resId}_${resType}" rel="${contextPath}/js/lovey/plugins/comment/face.jsp" href="javascript:void(0);"><img width="20" height="20"  class="faceImgbtn" style="cursor:pointer" src="${contextPath}/images/face/02.gif">表情</a>
					</div>
                    <div style="float:right;">
                        <input type="checkbox" value="1" id="whisper" name="whisper"><label for="whisper">悄悄话</label>
                    	<input type="button" value="留言" id="submit${resId}_${resType}" class="f-button">
                    </div>
                    <div class="clear"></div>
                   <input type="hidden" value="${resType}" name="resourceType">
                   <input type="hidden" value="${resId}" name="resourceId">

                    <input type="hidden" value="${loginUser.id}" name="uid">
                    <input type="hidden" name="id" value="">
                    <input type="hidden" name="tuid" value="">
                    <input type="hidden" name="apage" value="">
                    <input type="hidden" class="showReply" name="showReply" value="${showReply}">

                    <input type="hidden" value="" name="referId">


                </div>
            </form>
        </div>
    </div>