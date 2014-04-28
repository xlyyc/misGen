<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--
 * Developed By: zwzhao
 * Mail: zwzhao@wiscom.com.cn
 * Version:1.0
 * History:

  表格数据保存测试
--%>
<%!
/*    *//**
     * 根据json字符串获取一个JavaBean对象
     *
     * @param jsonString
     * @param classBean
     * @return
     *//*
    public static Object getBeanFromJson(String jsonString, Class classBean) {
        Object jsonBean = null;
        JSONObject jsonObject = JSONObject.fromObject(jsonString);
        jsonBean = JSONObject.toBean(jsonObject, classBean);
        return jsonBean;
    }

    *//**
     * 从json数组中得到相应json数组
     *
     * @param jsonString
     * @return
     *//*
    public static Object[] getObjectArrayFromJson(String jsonString) {
        JSONArray jsonArray = JSONArray.fromObject(jsonString);
        return jsonArray.toArray();
    }

    *//**
     * 将json数组转换成javabean集合
     * @param jsonString
     * @param classBean
     * @return
     *//*
    public static List getBeansFromJson(String jsonString, Class classBean) {
        List objectList = new ArrayList();
        JSONArray jsonArray = JSONArray.fromObject(jsonString);
        JSONObject jsonObject = null;
        if (jsonArray == null || jsonArray.size() == 0)
            return Collections.emptyList();
        for (int i = 0; i < jsonArray.size(); i++){
            jsonObject = jsonArray.getJSONObject(i);
            objectList.add(JSONObject.toBean(jsonObject, classBean));
        }
        return objectList;
    }*/
%>
<%
//    WebInput in = new WebInput(request);
//    WebOutput webout = new WebOutput(request, response);
//    String grid_data = in.getString("grid_data");
//    List list = null;
//    StringBuffer sb = new StringBuffer("{Rows:[");
///*    try{
//        list = getBeansFromJson(grid_data, UserInfo.class);
//        for(int i=0;list!=null&&list.size()>0&&i<list.size();i++){
//        UserInfo userInfo = (UserInfo)list.get(i);
//        sb.append("{username:'"+userInfo.getUsername()+"',sex:'"+userInfo.getSex()+"',age:"+userInfo.getAge()+"}");
//        sb.append((i==list.size()-1)?"":",");
//    }
//    }catch(java.lang.Exception ex){}*/
//
//
//    sb.append("],total:"+(list!=null?list.size():"")+"}");
//    Map param = new HashMap();
//        param.put("status",1);
//        param.put("msg","success!");
//        param.put("gdata",sb.toString());
//        webout.toJson(param);
        //out.println(test);
    out.print("{status:1,msg:'ok'}");
%>