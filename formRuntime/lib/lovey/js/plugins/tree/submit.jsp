<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String treeParentNode = request.getParameter("txt1_val");
    String treeNodeName = request.getParameter("treeNodeName");
    System.out.println(treeParentNode + "________" + treeNodeName);
    out.print("{status:1,msg:'处理成功！',treeParentNodeIndex:'" + treeParentNode + "',treeNodeName:'" + treeNodeName + "'}");
%>