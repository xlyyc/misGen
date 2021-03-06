<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<ol id="comment${comment.id}">
    <div class="post parent-post">
        <p class="image">
            <a href="${contextPath}/euser/profile.do?uid=${loginUser.id}">
                <img alt="${loginUser.firstName}"
                     src="<ccs:userHead userId="${loginUser.id}" headPortrait="${loginUser.headPortrait}" headType="small"/>">
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
                            <a class="delete w-del a-pointer comment-del" resId="${param['resourceId']}"
                               commentId="${comment.id}" resType="${param['resourceType']}"
                               rel="${contextPath}/comment/deleteComment.do?commentId=<c:out value="${comment.id}"/>&userId=<c:out value="${loginUser.id}"/>"><spring:message
                                    code='action.delete'/> </a>
                        </span>
                        </c:if>

            <c:if test="${comment.whisperUserId != null}">
            <span class="quietly">
            <img src="${contextPath}/images/lock.jpg">
            悄悄话
            </span>
            </c:if>

        </div>
        <div class="content">
            ${comment.content}
        </div>
    </div>
</ol>