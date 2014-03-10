<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<%--<h4 class="ceibs-app-title-700"> 留言板 </h4>--%>
<div class="sect-brief">
<p>
<span id="cmtCount${resourceId}_${resourceType}">${PageObj.totalCount}</span>&nbsp;条留言
</p>
</div>

<dl id="ul${resourceId}_${resourceType}" class="cmtul">
    <c:forEach var="comment" items="${PageObj.items}">

        <ol id="comment${comment[0].id}">
            <div class="post parent-post">
                <p class="image">
                    <a href="${contextPath}/euser/profile.do?uid=${comment[0].userId}"><img
                            src="<ccs:userHead userId="${comment[0].userId}" headPortrait="${comment[1].headPortrait}" headType="small"/>"
                            alt="${comment[1].firstName}"> </a>
                </p>

                <div class="info">
				<span class="author"><a href="${contextPath}/euser/profile.do?uid=${comment[0].userId}">
                            <ccs:userOnline userId="${comment[0].userId}" nameType="firstName" online="false" showType="0"/>
                        </a>
                </span>
                    <span class="time"><ccs:formatDate value="${comment[0].createTime}"/></span>

                    <c:if test="${loginUser.id != comment[0].userId }">
	                    <span style="float:left;">
	                         <a class="reply a-pointer" ><spring:message code="action.reply"/>
                                 <span class="hidden">${comment[1].firstName}|${comment[1].id}</span>
                             </a>
	                    </span>
                    </c:if>
                    <c:if test="${comment[0].hasPermissionToDel}">
                        <span class="delete">
                            <a class="delete w-del a-pointer comment-del" resId="${param['resourceId']}" commentId="${comment[0].id}" resType="${param['resourceType']}"
                                                 rel="${contextPath}/comment/deleteComment.do?commentId=<c:out value="${comment[0].id}"/>&userId=<c:out value="${comment[0].userId}"/>"><spring:message
                                code='action.delete'/> </a>
                        </span>
                    </c:if>
                    <c:if test="${comment[0].whisperUserId != null && comment[0].whisperUserId > 0}">
            <span class="quietly">
            <img src="${contextPath}/images/lock.jpg">
            悄悄话
            </span>
            </c:if>

                </div>
                <div class="content">
                    <ccs:cleanWords len="${comment[0].faceNum}" words="${comment[0].content}"></ccs:cleanWords>
                </div>
            </div>
        </ol>

    </c:forEach>

</dl>

<c:if test="${PageObj.pageCount > 1}">
<div class="pagination">
            <c:if test="${PageObj.currentIndex > 1}">
			<a class="pageComments" page="1" resId="${resourceId}" resType="${resourceType}">首页</a>

			<a class="pageComments" page="${PageObj.currentIndex - 1}" resId="${resourceId}" resType="${resourceType}">上一页</a>
            </c:if>

            <c:forEach begin="${PageObj.startIndexOnShow}" end="${PageObj.endIndexOnShow}" var="page">
                <c:choose>
                    <c:when test="${PageObj.currentIndex == page}">
                        <strong>${PageObj.currentIndex}</strong>
                    </c:when>
                    <c:otherwise>
                         <a class="pageComments" page="${page}" resId="${resourceId}" resType="${resourceType}">${page}</a>
                    </c:otherwise>
                </c:choose>
            </c:forEach>

            <c:if test="${PageObj.currentIndex < PageObj.endIndex}">
            <a class="pageComments" page="${PageObj.currentIndex + 1}" resId="${resourceId}" resType="${resourceType}">下一页</a>

            <a class="pageComments" page="${PageObj.endIndex}" resId="${resourceId}" resType="${resourceType}">尾页</a>
            </c:if>
</div>
</c:if>




