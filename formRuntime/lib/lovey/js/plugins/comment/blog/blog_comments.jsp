<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>



<p>
    <span id="hide${resourceId}_${resourceType}" style="<c:if test="${PageObj.totalCount==0}">display:none</c:if> ">
        <a id="toggle${resourceId}_${resourceType}" class="a-pointer" ><spring:message
                code="comment.collapse"/></a>
    </span>

</p>
<dl id="ul${resourceId}_${resourceType}" class="cmtul">
    <c:forEach var="comment" items="${PageObj.items}">
        <ol id="comment${comment[0].id}">
            <div class="post">
                <p class="image">
                    <a href="${contextPath}/euser/profile.do?uid=${comment[0].userId}"><img
                            src="<ccs:userHead userId="${comment[0].userId}" headPortrait="${comment[1].headPortrait}" headType="small"/>"
                            alt="${comment[1].firstName}"> </a>
                </p>

                <div class="info">
					<span class="author">
                        <a href="${contextPath}/euser/profile.do?uid=${comment[0].userId}">
                            <ccs:userOnline userId="${comment[0].userId}" nameType="firstName" online="false" showType="0"/>
                        </a>
                    </span>
                    <span class="time"><ccs:formatDate value="${comment[0].createTime}"/> </span>
                    <c:if test="${loginUser.id != comment[0].userId }">
	                    <span style="float:left;">
	                         <a class="reply a-pointer" ><spring:message code="action.reply"/>
                                 <span class="hidden">${comment[1].firstName}|${comment[1].id}</span>
                             </a>
	                    </span>
                    </c:if>
                    <c:if test="${comment[0].hasPermissionToDel}">
                        <span class="delete">
                            <a title="<spring:message
                                code='action.delete'/>" class="delete w-del a-pointer comment-del" resId="${param['resourceId']}" commentId="${comment[0].id}" resType="${param['resourceType']}"
                                                 rel="${contextPath}/comment/deleteComment.do?commentId=<c:out value="${comment[0].id}"/>&userId=<c:out value="${comment[0].userId}"/>"><spring:message
                                code='action.delete'/> </a>
                        </span>
                    </c:if>
                    <!-- <span>
                    <a onclick="WE.app.tipoff.submit('${comment[0].userId}', '58', '${comment[0].id}', '${comment[0].contentStr}', '${contextPath}');" href="blog_comments.jsp#">举报</a>
                    </span> -->
                </div>
                <div class="content">
                    <ccs:cleanWords len="${comment[0].faceNum}" words="${comment[0].content}"></ccs:cleanWords>
                </div>
            </div>
        </ol>
    </c:forEach>
    <c:if test="${PageObj.totalCount>param['shownum']&&param['shownum']>=0}">
        <div style="background:#EBF3F7;padding:2px 0 2px 7px;">
            <a id="showAll${resourceId}_${resourceType}" class="a-pointer" ><spring:message
                    code="comment.showall"/> <span
                    id="cmtCount${resourceId}_${resourceType}">${PageObj.totalCount}</span><spring:message
                    code="comment.showall.count"/></a>
        </div>
    </c:if>
</dl>




