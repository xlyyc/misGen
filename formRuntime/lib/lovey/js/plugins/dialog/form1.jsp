<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--
 * Developed By: zwzhao
 * Mail: zwzhao@wiscom.com.cn
 * Version:1.0
 * History:

  表单测试页面
-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv=Content-Type content="text/html; charset=UTF-8">
    <title></title>
    <style>

    body{font-size:12px;}
    table{width:100%}
    tr{height:35px;width:100%;padding-left:10px;}
    </style>
    <script>


    </script>
</head>
<body>

<form id="form1"  action="submit.jsp" method="post" enctype="multipart/form-data">
<table>
    <tr><td>姓名：<input name="loginName" type="text"/>&nbsp;dialog</td></tr>
    <tr><td>密码：<input name="password" type="password"/>&nbsp;wisedu</td></tr>
    <tr><td>性别：男<input name="sex" type="radio" value="man" checked=""/>女<input name="sex" type="radio" value="woman"/></td></tr>
    <tr><td>兴趣：<input name="hobby" type="checkbox" value="sing"/>唱歌&nbsp;<input name="hobby" type="checkbox" value="dance"/>跳舞&nbsp;<input name="hobby" type="checkbox" value="football"/>足球&nbsp;<input name="hobby" type="checkbox" value="basketball"/>篮球&nbsp;</td></tr>
    <tr><td>文件：<input name="file0" type="file" value="选择" /></td></tr>
</table>
</form>
</body>
</html>