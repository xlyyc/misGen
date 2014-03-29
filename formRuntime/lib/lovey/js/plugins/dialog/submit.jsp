<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.io.*,java.util.*" %>
<%@ page import="com.wiscom.generic.base.util.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.ServletFileUpload" %>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory" %>
<%@ page import="org.apache.commons.fileupload.FileItem" %><%
/*String loginName = request.getParameter("loginName");
String password = request.getParameter("password");
String sex = request.getParameter("sex");
String age = request.getParameter("age");
String p_comment = request.getParameter("p_comment");
    sex = sex==null?"man":sex;
    age = age==null?"-1":age;
    if(loginName!=null&&password!=null&&!"".equals(loginName)&&!"".equals(password)){
        if("dialog".equals(loginName)&&"wisedu".equals(password))
            out.print("{status:1,msg:'操作成功！',sex:'"+sex+"',age:"+age+",htmlStr:'<li><span style=\"color:#00008b;\">服务端返回的数据["+p_comment+"]</span></li>'}");
        else out.print("{status:0,msg:'用户名密码错误',sex:'"+sex+"',age:"+age+"}");
    }else out.print("{status:0,msg:'参数有误',sex:'"+sex+"',age:"+age+"}");
    *//*out.print("<div>不搞json，玩html了</div>");*/
        // 解析 request，判断是否有上传文件

        Map<String, String> map = new Hashtable<String, String>();
        boolean isMultipart = ServletFileUpload.isMultipartContent(request);
        if (isMultipart) {
            // 创建磁盘工厂，利用构造器实现内存数据储存量和临时储存路径
             DiskFileItemFactory factory = new DiskFileItemFactory(1024 * 4, new File("F:\\Temp"));
            // 设置最多只允许在内存中存储的数据,单位:字节
            // factory.setSizeThreshold(4096);
            // 设置文件临时存储路径
            // factory.setRepository(new File("D:\\Temp"));
            // 产生一新的文件上传处理程式
             ServletFileUpload upload = new ServletFileUpload(factory);
             // 设置路径、文件名的字符集
            upload.setHeaderEncoding("UTF-8");
            // 设置允许用户上传文件大小,单位:字节
            upload.setSizeMax(1024 * 1024 * 100);

            // 解析请求，开始读取数据
            // Iterator<FileItem> iter = (Iterator<FileItem>) upload.getItemIterator(request);
            // 得到所有的表单域，它们目前都被当作FileItem
             List<FileItem> fileItems = upload.parseRequest(request);
            // 依次处理请求
             Iterator<FileItem> iter = fileItems.iterator();
            while (iter.hasNext()) {
                FileItem item = (FileItem) iter.next();
                if (item.isFormField()) {
                    // 如果item是正常的表单域

                } else {
                    // 如果item是文件上传表单域
                    // 获得文件名及路径
                    String fileName = item.getName();
                    if (fileName != null) {
                        // 如果文件存在则上传
                        File fullFile = new File(item.getName());
                        if (!fullFile.exists()) {
                            File fileOnServer = new File(request.getRealPath("/js/plugins/dialog/upload/"+fullFile.getName()));
                            item.write(fileOnServer);
                        }
                    }
                }
            }
        }
    out.print("{status:1,msg:'处理成功！'}");

%>