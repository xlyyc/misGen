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

        stringToXml: function(xmlString) {
            var xmlDoc;
            if (typeof xmlString == "string") {
                if (document.implementation.createDocument) { //FF
                    var parser = new DOMParser();
                    xmlDoc = parser.parseFromString(xmlString, "text/xml");
                } else if (window.ActiveXObject) {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString);
                }
            }else {
                xmlDoc = xmlString;
            }
            return xmlDoc;
        },

        xmlToString: function(xmlDoc) {
            if (window.ActiveXObject) {
                return xmlDoc.xml;  //IE
            } else {
                return (new XMLSerializer()).serializeToString(xmlDoc);  //FF
            }
        }

    };
}