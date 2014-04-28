<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--
* Developed By: junfang
* Mail: junfang@wisedu.com
* Version:1.0
* History:

新建节点测试页面
-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv=Content-Type content="text/html; charset=UTF-8">
    <link href="ligerui-all.css" rel="stylesheet" type="text/css"/>
    <!--API全局样式-->
    <link rel="stylesheet" href="../../../style/css/api.css" type="text/css" media="screen, projection"/>
    <!--引入自定义样式-->
    <!--<link rel="stylesheet" href="dg-extra.css" type="text/css" media="screen, projection"/>-->
    <!--jquery1.7.1核心js文件-->
    <script src="../../jquery.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="../../jquery.form.js" type="text/javascript" charset="utf-8"></script>

    <!--懒加载核心js文件-->
    <script type="text/javascript" src="../../easyloader.js"></script>
    <title></title>
    <style>

        body {
            font-size: 12px;
        }

        table {
            width: 100%
        }

        tr {
            height: 35px;
            width: 100%;
            padding-left: 10px;
        }
    </style>
    <script>
        /*加载树组件*/
        /*$(document).ready(function() {
            using(['tree','.js','ligerResizable.js'], function() {
                $("#txt1").({
                    width : 140,
                    selectBoxWidth: 200,
                    selectBoxHeight: 200, valueField: 'treedataindex', treeLeafOnly: false, initText:'节点1.2',initValue:'节点1.2',
                    tree: { url: 'tree.json',checkbox: false }
                });
            });
        });*/

    </script>
</head>
<body>

<form id="form1" action="submit.jsp" method="post">
    <table align="center">
        <%--<tr>
            <td>上级节点：</td>
            <td><input name="treeParentNode" type="text" id="txt1"/>&nbsp;</td>
        </tr>--%>
        <tr>
            <td>节点名称：</td>
            <td><input name="treeNodeName" type="text"/>&nbsp;</td>
        </tr>
    </table>
</form>
</body>
</html>