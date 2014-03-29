<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="/WEB-INF/jsp/ccs/includes.jsp" %>
<ge:url/>

<%--<script type="text/javascript" src="face_data.js"></script>--%>
<script type="text/javascript" src="../../jquery-1.7.2.min.js"></script>

<style type="text/css">
    #tab a{
        cursor:pointer;
    }

</style>

<script type="text/javascript">

    var imgTab = {
    tabName:["qq表情","金馆长"],
    code:[["[/wx]","[/pz]","[/se]","[/fd]","[/dy]","[/ll]","[/hx]","[/bz]","[/shui]"
         ,"[/dk]","[/gg]","[/fn]","[/tp]","[/cy]","[/jy]","[/ng]","[/kuk]","[/lengh]",
         "[/zk]","[/tuu]","[/tx]" ,"[/ka]","[/baiy]","[/am]","[/jie]","[/kun]" ,"[/jk]"
         ,"[/lh]" ,"[/hanx]","[/db]","[/fendou]"
         ,"[/zhm]","[/yiw]","[/xu]","[/yun]","[/zhem]","[/shuai]","[/kl]","[/qiao]","[/zj]"
          ,"[/ch]","[/kb]","[/gz]","[/qd]","[/huaix]","[/zhh]","[/yhh]","[/hq]","[/bs]",
          "[/wq]","[/kk]" ,"[/yx]" ,"[/qq]" ,"[/xia]" ,"[/kel]" ,"[/cd]" ,"[/xig]" ,"[/pj]"
           ,"[/lq]" ,"[/pp]" ,"[/kf]" ,"[/fan]" ,"[/zt]" ,"[/mg]"
            ,"[/dx]" ,"[/sa]" ,"[/xin]" ,"[/xs]" ,"[/dg]" ,"[/shd]"
            ,"[/zhd]" ,"[/dao]" ,"[/zq]" ,"[/pch]" ,"[/bb]" ,"[/yl]"
            ,"[/ty]" ,"[/lw]" ,"[/yb]" ,"[/qiang]" ,"[/ruo]" ,"[/ws]" ,"[/shl]"
            ,"[/bq]" ,"[/qy]" ,"[/qt]" ,"[/cj]" ,"[/aini]" ,"[/bu]"
            ,"[/hd]" ,"[/aiq]" ,"[/fw]" ,"[/tiao]" ,"[/fad]" ,"[/oh]"
            ,"[/zhq]" ,"[/kt]" ,"[/ht]" ,"[/tsh]" ,"[/hsh]" ,"[/jd]"
            ,"[/jw]" ,"[/xw]" ,"[/zuotj]" ,"[/yoji]"],

          ["[/jizp]" ,"[/daxj]" ,"[/moxj]" ,"[/cexj]" ,"[/hulq]" ,"[/dapp]"
           ,"[/qixj]" ,"[/jkzp]" ,"[/daxjj]" ,"[/fzqt]" ,"[/nlmm]" ,"[/lvtf]"
           ,"[/qzxc]" ,"[/duoj]" ,"[/jiqm]" ,"[/tiaos]" ,"[/zqq]"
            ,"[/kyd]" ,"[/fengj]" ,"[/tcdao]" ,"[/pait]" ,"[/naoyy]"
            ,"[/ttg]" ,"[/xijiao]" ,"[/diuq]" ,"[/czt]" ,"[/tkz]" ,"[/dunyx]"
            ,"[/dazpp]"] ],

    imgDes:[ ["微笑", "撇嘴", "色", "发呆", "得意",
            "流泪","害羞","闭嘴","睡觉","大哭","尴尬","愤怒","调皮","呲牙","惊讶",
            "难过", "酷","冷汗","抓狂","吐","偷笑","可爱","白眼","傲慢","饥饿",
            "困","惊恐","流汗","憨笑","大兵","奋斗","咒骂","疑问","嘘","晕","折磨",
            "衰","骷髅","敲打","再见","擦汗","抠鼻","鼓掌","糗大了" ,"坏笑"
            ,"左哼哼" ,"右哼哼" ,"哈欠" ,"鄙视" ,"委屈" ,"快哭了" ,"阴笑"
            ,"亲亲" ,"吓" ,"可怜" ,"菜刀" ,"西瓜" ,"啤酒" ,"篮球" ,"乒乓"
            ,"咖啡" ,"饭" ,"猪头" ,"玫瑰" ,"凋谢" ,"示爱" ,"心" ,"心碎" ,"蛋糕"
            ,"闪电" ,"炸弹" ,"刀" ,"足球" ,"瓢虫" ,"便便" ,"月亮" ,"太阳"
            ,"礼物" ,"拥抱" ,"强" ,"弱" ,"握手" ,"胜利" ,"拜托" ,"勾引" ,"拳头"
            ,"差劲" ,"爱你" ,"不行" ,"好的" ,"爱情" ,"飞吻" ,"跳跳" ,"发抖"
            ,"怄火" ,"转圈" ,"磕头" ,"回头" ,"跳绳" ,"挥手" ,"激动" ,"街舞"
            ,"献吻" ,"左太极" ,"右太极"],
             ["金馆长1" ,"金馆长2" ,"金馆长3"
            ,"金馆长4" ,"金馆长5" ,"金馆长6" ,"金馆长7" ,"金馆长8" ,"金馆长9"
            ,"金馆长10" ,"金馆长11" ,"金馆长12" ,"金馆长13" ,"金馆长14"
            ,"金馆长15" ,"金馆长16" ,"金馆长17" ,"金馆长18" ,"金馆长19"
            ,"金馆长20" ,"金馆长21" ,"金馆长22" ,"金馆长23" ,"金馆长24"
            ,"金馆长25" ,"金馆长26" ,"金馆长27" ,"金馆长28" ,"金馆长29"] ],

    imgNum:[ ["01", "02","03","04","05","06","07","08",  "09"
            ,"10","11","12","13","14","15","16","17","18","19","20" ,"21",
            "22","23","24","25","26","27","28","29","30" ,"31" ,
            "32","33","34","35","36","37","38","39","40" ,"41",
            "42","43","44","45","46","47","48","49","50","51" ,"52"
            ,"53" ,"54" ,"55" ,"56" ,"57" ,"58"
            ,"59" ,"60" ,"61" ,"62" ,"63" ,"64"
            ,"65" ,"66" ,"67" ,"68" ,"69" ,"70"
            ,"71" ,"72" ,"73" ,"74" ,"75" ,"76"
            ,"77" ,"78" ,"79" ,"80" ,"81" ,"82" ,"83"
            ,"84" ,"85" ,"86" ,"87" ,"88" ,"89"
            ,"90" ,"91" ,"92" ,"93" ,"94" ,"95"
            ,"96" ,"97" ,"98" ,"99" ,"100" ,"101"
            ,"102" ,"103" ,"104" ,"105"],

            ["106","107","108" ,"109" ,"110" ,"111" ,"112"
            ,"113" ,"114" ,"115" ,"116" ,"117"
            ,"118" ,"119" ,"120" ,"121" ,"122"
            ,"123" ,"124" ,"125" ,"126" ,"127"
            ,"128" ,"129" ,"130" ,"131" ,"132" ,"133"
            ,"134"] ] };

    var imgDir = "/images/lhface/";

    var len = imgTab.tabName.length;
    $(document).ready(function() {

        var imgurl = "";
        for (i = 0; i < len; i++) {
            var tabHtml = "<a class='a-pointer' onclick=\"setImgTab(" + (i + 1) + ")\">" + imgTab.tabName[i] + "</a>";
            if(i != len -1){
                tabHtml += "|";
            }
            var imgpHtml = "<p style='height:225px' id=\"imgp" + (i + 1) + "\">";
            var imgNum = imgTab.imgNum[i];
            var code = imgTab.code[i];
            var imgDes = imgTab.imgDes[i];
            for (j = 0; j < imgNum.length; j++) {
                imgurl = "${contextPath}"+imgDir + imgNum[j] + ".gif";
                imgpHtml += "<img src=\"" + imgurl + "\" class=\"_face\" width=\"24\" height=\"24\" style=\"cursor:pointer;padding:2px;\" faceCode=\"" + code[j] + "\" title=\"" + imgDes[j] + "\">";
            }
            imgpHtml += "</p>";
            $("#_faceDiv").append(imgpHtml);
            $("#tab").append(tabHtml);
        }
        setImgTab(1);
    });


    function setImgTab(num) {
        for (k = 1; k <= len; k++) {
            if (num == k) {
                $("#imgp" + k).css("display", "");
            }
            else {
                $("#imgp" + k).css("display", "none");
            }
        }
    }


</script>

<div class="bd" style="visibility: inherit;background-color:#FFFFFF;">
    <span id="tab" style="margin-left: 10px;">
    </span>

    <div id="_faceDiv" class="team_r" style="width: 395px;">

    </div>
</div>