<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<div class="moudle03">
    <h2>应用评论(<span id="cmtCount${resId}_${resType}">0</span>)</h2>

    <form name="comment" id="wall-form${resId}_${resType}" method="post">
        <textarea class="text-content" name="content" style="height:47px" id="input${resId}_${resType}"></textarea>
        <div style="float:left;">
                <a id="facebtn${resId}_${resType}" rel="${contextPath}/js/lovey/plugins/comment/face.jsp" href="javascript:void(0);"><img width="20" height="20"  class="faceImgbtn" style="cursor:pointer" src="${contextPath}/images/face/02.gif">表情</a>
            </div>

        <div class="mt10">
        <span class="float_r">
            <input id="submit${resId}_${resType}" class="btn_c04 btn_s02" type="button" value="评论"/>
        </span>
        </div>
    </form>
</div>