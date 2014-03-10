<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<ol id="comment${comment.id}">
    <div class="post">
        <p class="image">
            <a <c:if test="${needUserLink}"> href="${contextPath}/euser/profile.do?uid=${loginUser.id}"</c:if> >
                <img alt="${loginUser.firstName}"
                     src="<ccs:userHead userId="${loginUser.id}" headPortrait="${loginUser.headPortrait}" headType="small"/>">
            </a>
        </p>

        <div class="info">
				<span class="author">
                    <a <c:if test="${needUserLink}"> href="${contextPath}/euser/profile.do?uid=${loginUser.id}"</c:if> >
                        <span class="visitor_online">${loginUser.firstName}</span>
                    </a>
                </span>
            <span class="time">1秒前 </span>
            <c:if test="${'true' eq canDelete}">
                        <span class="delete">
                            <a class="delete w-del a-pointer comment-del" resId="${param['resourceId']}"
                               commentId="${comment.id}" resType="${param['resourceType']}"
                               rel="${contextPath}/comment/deleteComment.do?commentId=<c:out value="${comment.id}"/>&userId=<c:out value="${loginUser.id}"/>"><spring:message
                                    code='action.delete'/> </a>
                        </span>
            </c:if>
        </div>

        <div class="content">
            ${comment.content}
        </div>
    </div>
</ol>