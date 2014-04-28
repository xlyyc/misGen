<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<ol id="comment${comment.id}" class="cmtli" style="background-color: rgb(255, 255, 255); opacity: 1;">
    <div class="post">
        <p class="image">
            <a href="${contextPath}/euser/profile.do?uid=${loginUser.id}">
                <img alt="${loginUser.firstName}" src="<ccs:userHead userId="${loginUser.id}" headPortrait="${loginUser.headPortrait}" headType="small"/>">
            </a>
        </p>

        <div class="info">
            <span class="author">
                <a href="${contextPath}/euser/profile.do?uid=${loginUser.id}">
                    <span class="visitor_online">${loginUser.firstName}</span>
                </a>
            </span>
            <span class="time">1秒前 </span>
            <c:if test="${'true' eq canDelete}">
            <span class="delete">
                <a class="delete w-del a-pointer comment-del" rel="${contextPath}/comment/deleteComment.do?commentId=${comment.id}&userId=${loginUser.id}"
                          commentId="${comment.id}"  resId="${comment.resourceId}" resType="${comment.resourceType}">删除</a>
            </span>
            </c:if>

            <!-- <span>
                <a href="blog_new_comment.jsp#" onclick="WE.app.tipoff.submit('1236540','58','15049','ssss','/ccs')">举报</a>
            </span> -->
        </div>
        <div class="content">${comment.content}</div>
    </div>
</ol>