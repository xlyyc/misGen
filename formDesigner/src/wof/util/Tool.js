if (!wof.util.Tool) {
    wof.util.Tool = {

        uuid: function() {
            var s = [];
            var hexDigits = "0123456789ABCDEF";
            for (var i = 0; i < 32; i++)
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            s[12] = "4";
            s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);
            return s.join("");
        },

        stringToXml: function(xmlString){
            var xmlDoc;
            if(typeof xmlString == "string"){
                if (window.ActiveXObject) { //IE
                    xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
                    xmlDoc.async="false";
                    xmlDoc.loadXML(xmlString);
                }else if (document.implementation.createDocument) { //FF
                    var parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xmlString, "application/xml");
                }
            } else {
                xmlDoc = xmlString;
            }
            return xmlDoc;
        },

        xmlToString:function(xmlDoc) {
            if (window.ActiveXObject) {
                return xmlDoc.xml;  //IE
            } else {
                return (new XMLSerializer()).serializeToString(xmlDoc);  //FF
            }
        },

        createElement : function (document,name){
            return document.createElement(name);
        },

        setAttribute : function (element,name,value){
            if(value==null){
                value = '';
            }
            element.setAttribute(name,value);
        },

        appendChild : function (element,node){
            element.appendChild(node);
        },

        getURLParams: function(){
            var urlParams = {};
            (function(){
                var match,
                    pl = /\+/g,
                    search = /([^&=]+)=?([^&]*)/g,
                    decode = function(s){ return decodeURIComponent(s.replace(pl," "));},
                    query = window.location.search.substring(1);
                while (match = search.exec(query)){
                    urlParams[decode(match[1])] = decode(match[2]);
                }
            })();
            return urlParams;
        }


    };
}