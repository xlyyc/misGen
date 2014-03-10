<%@page import="com.alibaba.fastjson.JSONObject"%>
<%@page import="net.sf.json.JSONObject"%>
<%@page  language="java" contentType="text/html;charset=UTF-8" %>
<%@page import="java.util.*" %>
<%@page import="org.json.simple.JSONObject" %>
<%@page import="org.json.simple.JSONArray" %>
<%
    JSONObject data  = new JSONObject();
    JSONArray rows  = new JSONArray();
    JSONArray rows2  = new JSONArray();
    for(int i=0;i<1000;i++)
    {
        JSONObject temp  = new JSONObject();
        temp.put("CustomerID",i);
        temp.put("CompanyName","company" +i);
        temp.put("ContactName","contact" +i);
        temp.put("City","nanjing"+i);
        rows.add(temp);
    }
    int currentPage = ( null == request.getParameter("page") ) ? 1 : Integer.parseInt(request.getParameter("page"));
    int pageSize = ( null == request.getParameter("pagesize") ) ? 10 : Integer.parseInt(request.getParameter("pagesize"));
    int start = (currentPage-1)*pageSize;
    int end = currentPage*pageSize-1;
    for(int i=start;i<=end;i++)
    {
        if(rows.size()>i)
        {
            rows2.add(rows.get(i));
        }
    }


    data.put("Rows",rows2);
    data.put("Total",rows.size());
    out.println(data);
%>