/**
 * 验证控件统一API
 */
wis.widget.Validation = function () {
    this._version = '1.0';

};

wis.widget.Validation.prototype = {
    _themes:null,			// 主题
    _prefabricateRule: null,	// 默认验证规则的集合(包括基本校验和提供的ajax校验)。不可更改
    _customRule: null,		// 可扩展验证规则的集合,使用者可重新设置
    _ruleFunction: null,		// 自定义验证的函数：Func ,alertText，优先校验此项
    _errorMsg: null,		// 错误信息(默认提示)
    _msgPosition:null, 	// 错误提示信息的定位 
    						  	// 可选 : topLeft, topRight, bottomLeft, centerRight, bottomRight
    
    //_alertTextFlag: false,		// 是否启用默认提示
    //_returnDealFunc: null,		// 校验返回信息处理函数，alertTextFlag为false时生效
    //_liveEvent:true,			// 即时触发，为true时绑定_validationEventTriggers指定的事件
    //_validationEventTriggers: null, // 触发校验的事件
    //_returnIsValid: false, 		//通过校验是否也返回提示，如对号标识
    
    getPrefabricateRule: function () {
        return this._prefabricateRule;
    },

    setPrefabricateRule: function (prefabricateRule) {
        this._prefabricateRule = prefabricateRule;
    },
    getCustomRule: function () {
        return this._customRule;
    },

    setCustomRule: function (customRule) {
        this._customRule = customRule;
    },
    
    getThemes: function () {
        return this._themes;
    },

    setThemes: function (themes) {
        this._themes = themes;
    },
    
    getRuleFunction: function () {
        return this._ruleFunction;
    },

    setRuleFunction: function (ruleFunction) {
        this._ruleFunction = ruleFunction;
    },

    getErrorMsg: function () {
        return this._errorMsg;
    },

    setErrorMsg: function (errorMsg) {
        this._errorMsg = errorMsg;
    },

    getMsgPosition: function () {
        return this._msgPosition||'topRight';
    },

    setMsgPosition: function (msgPosition) {
        this._msgPosition = msgPosition;
    },

    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    _initRender: function () {
    	if(!this.getPrefabricateRule()){
    		this.setOptions(null);
    	}
    },

    //渲染前处理方法
    _beforeRender: function () { },

    //渲染方法
    render: function () {},

    //渲染后处理方法
    _afterRender: function () {},

    //----------必须实现----------
    getData: function () {
    	return {
            name: this.getName(),
            themes:this.getThemes(),
            prefabricateRule: this.getPrefabricateRule(),
            ruleFunction: this.getRuleFunction(),
            errorMsg: this.getErrorMsg(),
            msgPosition: this.getMsgPosition()
        }
    },

    //----------必须实现----------
    setData: function (data) {
    	if (!data) {
    		return;
    	}
	    if(data.name){
			this.setName(data.name);
		}
	    if(data.themes){
	    	this.setThemes(data.themes);
	    }
	    if(data.prefabricateRule){
    		this.setPrefabricateRule(data.prefabricateRule);
    	}
        if(data.ruleFunction){
    		this.setRuleFunction(data.ruleFunction);
    	}
        if(data.errorMsg){
    		this.setErrorMsg(data.errorMsg);
    	}
        if(data.msgPosition){
    		this.setMsgPosition(data.msgPosition);
    	}
    },
    //----------自定义实现----------
	getOptions: function () {
		return {
            name: this.getName(),
            themes:this.getThemes(),
            prefabricateRule: this.getPrefabricateRule(),
            customRule: this.getCustomRule(),
            ruleFunction: this.getRuleFunction(),
            errorMsg: this.getErrorMsg(),
            msgPosition: this.getMsgPosition()
        }
    },
   
    /**
     *  校验方法，对外提供（构件触发执行）
     *  @param rules 校验规则，数组，如[required,length[2,10]]
     *  @param value 待校验的值，object
     *  @returns 校验结果 true|false
     */    
    doValidate: function (value,rules) {
    	var validationPass = this._validateCall(value,rules);
        return validationPass;
    },
    _validateCall: function (value, rulesStr) {
    	_that = this;
    	var rulesRegExp = /\[(.*)\]/;
        var getRules = rulesRegExp.exec(rulesStr);
        if(getRules == null||getRules==''){
        	return true;
        }
        var str = getRules[1];
        if(str == null||str==''){
        	return true;
        }
        var pattern = /\[|,|\]|\|/;
        var rules = str.split(pattern);
        if(rules == null||rules==''){
        	return true;
        }
        var errorMsg = "";
        for (i = 0; i < rules.length; i++) {
    		var _result = true;
    		/**
    		 * 目前只对值进行校验，对于分组校验个数需求的通过定制处理
         	 * 如: "maxCheckbox"、 "minCheckbox"等\
         	 * case "equalsFiled":	//值等于字段
         	 * case "notEqualsFiled":	//值不等于字段
    		 */
    		switch (rules[i]) {
                case "optional": //选填
                    if (!value) {
                        return true;
                    }
                    break;
                case "required":// 必填
                case "length": // 长度区间
                case "minLength":	//最小长度
                case "maxLength":	//最大长度
                case "equalsValue":	//值等于
                case "notEqualsValue":	//值不等于
                case "limit":  //值大小区间
                case "minValue": //最小值
                case "maxValue": //最大值
                case "acceptfile": // 有效文件格式
                case "doFilter": // 文件类型过滤
                case "ajax":	// 执行AJAX请求进行校验
                case "funcCall": // 自定义处理函数
                	_result = this._prefabricateRule[rules[i]].validateFunc(value, rules, i);
                	if(_result!=true){
                		errorMsg += _result+"<br/>";//
                    }
                    break;
                case "exemptString": // 不校验字符串，出现某特定字符串则清空错误信息
                	_result = this._prefabricateRule.exemptString.validateFunc(value, rules, i);
                	if(_result==true){
                		errorMsg = "";
                    }
                    break;
                case "custom": // 可扩展
                	_result = this._customRegex(value,rules, i);
                	if(_result!=true){
                		errorMsg += _result;//+"<br/>"
                    }
                    break;
                default :
                    break;
            }
            //if(errorMsg!=""){
            	// 校验一个不通过就返回，不再校验？？
            	// 有些情形可能有清空错误的处理，可能全部校验完再返回结果
            	//break;
            	//return errorMsg;
            //}
    	}
    	if(errorMsg==""){
    		return true;
    	}else{
    		return errorMsg;
    	}
    },
    //----------自定义实现(进行必要的校验和默认值设置)----------
    setOptions: function (data) {
    	var preRule = {
            "required": {
                "regex": "none",
                "validateFunc":this._required,
                "alertText": "* 非空选项.",
                "alertTextCheckboxMultiple": "* 请选择一个单选框.",
                "alertTextCheckboxe": "* 请选择一个复选框."},
            "length": {
                "regex": "none",
                "validateFunc":this._length,
                "alertText": "* 长度必须在 ",
                "alertText2": " 至 ",
                "alertText3": " 之间."},
	        "minLength": {
	            "regex": "none",
	            "validateFunc":this._minLength,
	            "alertText": "* 长度必须大于 "},
            "maxLength": {
	            "regex": "none",
	            "validateFunc":this._maxLength,
	            "alertText": "* 长度必须小于 "},
            "limit": {
                "regex": "none",
                "validateFunc":this._limit,
                "alertText": "* 大小必须在 ",
                "alertText2": " 至 ",
                "alertText3": " 之间."},
            "minValue": {
                "regex": "none",
                "validateFunc":this._minValue,
                "alertText": "* 值不小于 "},
            "maxValue": {
                "regex": "none",
                "validateFunc":this._maxValue,
                "alertText": "* 值不大于 "},
            "maxCheckbox": {
                "regex": "none",
                "validateFunc":this._maxCheckbox,
                "alertText": "* 最多选择 ",
                "alertText2": " 项."},
            "minCheckbox": {
                "regex": "none",
                "validateFunc":this._minCheckbox,
                "alertText": "* 至少选择 ",
                "alertText2": " 项."},
            "equalsField": {
                "regex": "none",
                "validateFunc":this._equalsValue,
                "alertText": "* 两次输入不一致,请重新输入."},
            "notEqualsField": {
                "regex": "none",
                "validateFunc":this._notEqualsValue,
                "alertText": "* 不能出现重复,请重新输入."},
            "equalsValue": {
                "regex": "none",
                "validateFunc":this._equalsValue,
                "alertText": "* 输入错误,请重新输入."},
            "notEqualsValue": {
                "regex": "none",
                "validateFunc":this._notEqualsValue,
                "alertText": "* 输入内容被排除,请重新输入."}
            
        };
    	this.setPrefabricateRule(preRule);
    	var customRule = {
            "telephone": {
                "regex": "/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/",
                "alertText": "* 请输入有效的电话号码,如:010-29292929."},
            "mobilephone": {
                "regex": "/(^0?[1][3458][0-9]{9}$)/",
                "alertText": "* 请输入有效的手机号码."},
            "phone": {
                "regex": "/^((\\(\\d{2,3}\\))|(\\d{3}\\-))?(\\(0\\d{2,3}\\)|0\\d{2,3}-)?[1-9]\\d{6,7}(\\-\\d{1,4})?$/",
                "alertText": "* 请输入有效的联系号码."},
            "email": {
                "regex": "/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/",
                "alertText": "* 请输入有效的邮件地址."},
            "date": {
                "regex": "/^(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)$/",
                "alertText": "* 请输入有效的日期,如:2008-08-08."},
            "ip": {
                "regex": "/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/",
                "alertText": "* 请输入有效的IP."},
            "accept": {
                "regex": "none",
                "alertText": "* 请输入有效的文件格式."},
            "chinese": {
                "regex": "/^[\u4e00-\u9fa5]+$/",
                "alertText": "* 请输入中文."},
            "url": {
                "regex": "/^((https|http|ftp|rtsp|mms)?:\\/\\/)?"
                    + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                    + "|" // 允许IP和DOMAIN（域名）
                    + "([0-9a-z_!~*'()-]+\\.)*" // 域名- www.
                    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." // 二级域名
                    + "[a-z]{2,6})" // first level domain- .com or .museum
                    + "(:[0-9]{1,5})?" // 端口- :80,最多5位
                    + "[\\/a-zA-Z0-9\\/]{0,}"
                    + "(\\/[0-9a-zA-Z\\.\\?\\-\\&=]{0,})?$/",
                "alertText": "* 请输入有效的网址."},
            "domain": {
                "regex": "/^([\\w-]+\\.)+((com)|(net)|(org)|(gov\\.cn)|(info)|(cc)|(com\\.cn)|(net\\.cn)|(org\\.cn)|(name)|(biz)|(tv)|(cn)|(mobi)|(name)|(sh)|(ac)|(io)|(tw)|(com\\.tw)|(hk)|(com\\.hk)|(ws)|(travel)|(us)|(tm)|(la)|(me\\.uk)|(org\\.uk)|(ltd\\.uk)|(plc\\.uk)|(in)|(eu)|(it)|(jp))$/",
                "alertText": "* 请输入有效的域名."},
            "zipcode": {
                "regex": "/^[1-9]\\d{5}$/",
                "alertText": "* 请输入有效的邮政编码."},
            "idCard": {
                //对身份证的验证分别加入了区域，出生年月（简单）的验证
                "regex": "/^(([16][1-5]|2[1-4]|3[1-7]|4[1-6]|5[0-4]|[7-9]1)\\d{4}(19|20|21)\\d{2}(0[0-9]|1[0-2])(0[0-9]|[1-2][0-9]|3[0-1])\\d{3}[0-9xX])" + //验证18位身份证
                    "|(([16][1-5]|2[1-4]|3[1-7]|4[1-6]|5[0-4]|[7-9]1)\\d{6}(0[0-9]|1[0-2])(0[0-9]|[1-2][0-9]|3[0-1])\\d{3})$/", //验证15位的身份证
                "alertText": "* 请输入有效的身份证号码."},
            "mp3": {
                "regex": "/^(http(s)?:\\/\\/)[\\w\\W]+(\.(mp|MP)3)$/",
                "alertText": "* 请输入有效的mp3链接地址."},
            "qq": {
                "regex": "/^[1-9]\\d{4,9}$/",
                "alertText": "* 请输入有效的QQ号码."},
            "onlyInteger": {
                "regex": "/^[0-9-]+$/",
                "alertText": "* 请输入整数."},
            "onlyNumber": {
                "regex": "/^\\-?[0-9\\,]*\\.?\\d*$/",
                "alertText": "* 请输入数字."},
            "points": {
                "regex": "/^[1-9]\\d{0,2}$/",
                "alertText": "* 请输入1~999的整数."},
            "awardTimes": {
                "regex": "/^[1-9]\\d{0,4}$/",
                "alertText": "* 请输入1~99999的整数."},
            "notZero": {
                "regex": "/^[1-9]\\d*$/",
                "alertText": "* 必须大于零整数."},
            "oneToNine": {
                "regex": "/^[1-9]{1}$/",
                "alertText": "* 请输入1-9的整数."},
            "onlyLetter": {
                "regex": "/^[a-zA-Z]+$/",
                "alertText": "* 请输入英文字母."},
            "noSpecialCaracters": {
                "regex": "/^[0-9a-zA-Z]+$/",
                "alertText": "* 请输入英文字母和数字."},
            "imageCaracters": {
                "regex": "/^[0-9]+(%|px)$/",
                "alertText": "* 请输入百分数或者像素值，例如15%或者15px"},
            "onlyFile": {
                "regex": "/^[0-9a-zA-Z]+\\.*[a-zA-Z]{0,4}$/",
                "alertText": "* 目录或者文件名不合法."
            },
            "sectionNum": {
                "regex": "/^[0-9]\\d{2}$/",
                "alertText": "必须为3位数字"
            },
            "noSpecialCaractersWithChinese": {
                "regex": "/^[0-9a-zA-Z\u4e00-\u9fa5]*$/",
                "alertText": "* 只允许英文字母、数字和中文"
            }
        };
    	this.setCustomRule(customRule);
    	if (!data) {
    		data = {};
    	}
	    if(data.name){
			this.setName(data.name);
		}
	    if(data.themes){
	    	this.setThemes(data.themes);
	    }
	    if(data.customRule){//验证规则的集合
    		jQuery.extend(this._customRule,data.customRule);
    	}
        if(data.ruleFunction){
    		this.setRuleFunction(data.ruleFunction);
    	}
        if(data.errorMsg){
    		this.setErrorMsg(data.errorMsg);
    	}
        if(data.msgPosition){
    		this.setMsgPosition(data.msgPosition);
    	}
    },
    /** 执行校验函数 */
    _required: function (value,rules,position) {   //校验必填
        if (!value) {
        	return _that._getPreAlertText(rules[position],"alertText");
        }else{
        	return true;
        }
    },  
    
    _length: function(value, rules, position) {         // 校验长度
        startLength = eval(rules[position + 1]);
        endLength = eval(rules[position + 2]);
        feildLength = value?value.length:0;

        if (feildLength < startLength || feildLength > endLength) {
            return _that._getPreAlertText(rules[position],"alertText") 
            + startLength + _that._getPreAlertText(rules[position],"alertText2") 
            + endLength + _that._getPreAlertText(rules[position],"alertText3");
        }else{
        	return true;
        }
    },
    _minLength: function(value, rules, position) {         // 校验长度
        startLength = eval(rules[position + 1]);
        feildLength = value?0:value.length;

        if (feildLength < startLength) {
            return _that._getPreAlertText(rules[position],"alertText")+ startLength ;
        }else{
        	return true;
        }
    },
    _maxLength: function(value, rules, position) {         // 校验长度
        endLength = eval(rules[position + 1]);
        feildLength = value?0:value.length;
        if (feildLength > endLength) {
            return _that._getPreAlertText(rules[position],"alertText")+ endLength ;
        }else{
        	return true;
        }
    },
    _equalsValue: function(value, rules, position) {         // VALIDATE FIELD MATCH
        equalValue = rules[position + 1];
        if (value != equalValue) {
           return _that._getPreAlertText(rules[position],"alertText");
        }else{
        	return true;
        }
    },
    _notEqualsValue: function(value, rules, position) {         // VALIDATE FIELD MATCH
        equalValue = rules[position + 1];
        if (value == equalValue) {
           return _that._getPreAlertText(rules[position],"alertText");
        }else{
        	return true;
        }
    },
    _limit: function(value,rules,position)  {          // VALIDATE LIMIT
        min = eval(rules[position + 1]);
        max = eval(rules[position + 2]);
        if (value < min || value > max) {
           return _that._getPreAlertText(rules[position],"alertText")+ min 
           + _that._getPreAlertText(rules[position],"alertText2") + max 
           + _that._getPreAlertText(rules[position],"alertText3");
        }else{
        	return true;
        }
    },

    _minValue: function(value, rules, position) {
        min = eval(rules[position + 1]);
        if (value < min) {
            return _that._getPreAlertText(rules[position],"alertText") + min;
        }
    },

    _maxValue: function(value, rules, position) {
        max = eval(rules[position + 1]);
        if (value > max) {
            return _that._getPreAlertText(rules[position],"alertText") + max;
        }
    },
    _acceptfile: function(value, rules, position) {
        fileName = value;
        fileExt = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName.toLowerCase()) : '';
        acceptRule = rules[position + 1];

        if (fileExt == '' || acceptRule.indexOf(fileExt) < 0) {
            $.validationEngine.isError = true;
            return _that._getPreAlertText(rules[position],"alertText")
            + ",如：" + acceptRule.split(":").join(",");
        }
    },
    _doFilter: function(value, rules, position)  { // doFilter['filter'],参数即为文件类型
        var filter = rules[position + 1];
        var regexp = new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(str);
        if (!regexp) {
        	return "* 文件类型只支持" + filter+".";
        }else{
        	return true;
        }
    },

    _exemptString: function(value, rules, position) {    
        customString = rules[position + 1];
        if (customString == value) {
            return true;
        }
    },

    /**
     * 执行一个自定义函数，函数的规则由用户指定
     * @param caller
     * @param rules
     * @param position
     * @private
     */
    _funcCall: function(value, rules, position) {      
        customRule = rules[position + 1];
        var fn = window[customRule]; //window中已经定义该函数
        if (typeof(fn) == 'function') {
            //函数返回true则不允许提交，返回false则允许提交
            var fn_result = fn(value, rules, position);
            return fn_result;
        }
        return true;
    },
    /**
     * 表单客户端ajax验证
     * 验证格式为class="validate[ajax['${contextPath}/doc/checkDirtyWord.do','right','loading','wrong']]"
     * @param caller
     * @param rules
     * @param position
     */
    _ajax: function(fieldValue, rules, position) {                 // VALIDATE AJAX RULES
        //定位找到指定的正则表达式规则
        customAjaxRule = rules[position + 1];
        var extraData = '';
        
        //如果从页面上没有拿到参数，则使用默认的参数
        var ajaxCheckSetting = this._customRule[customAjaxRule];
        postfile = ajaxCheckSetting.url;
        alertNo = ajaxCheckSetting.alertText;

        if (ajaxCheckSetting.extraData) {
            extraData += '&' + ajaxCheckSetting.extraData;
        }
        if (!ajaxisError) {
            $.ajax({
                type: "POST",
                url: postfile,
                //将客户端的验证表单值，验证inputID，验证规则，数据一起传至服务端,这种拼装方式还是url提交参数
                //data: "validateValue=" + fieldValue + "&validateId=" + fieldId + "&validateRule=" + customAjaxRule + extraData,
                data: {"validateValue": fieldValue,"validateRule": customAjaxRule + extraData},
                dataType: "json",
                error: function (data, transport) {
                	_that.error("error in the ajax: " + data.status + " " + transport)
                },
                success: function (data) {
                    // 如果回传的是字符串将其转换成对象
                    data = (typeof data == 'string') ? eval("(" + data + ")") : data;
                    //取得验证的结果，验证规则，验证的input的ID
                    if(data.success==true){
                    	return true;
                    }else{
                    	return data.errorMsg||alertNo;
                    }
                }
            });
        }
    },

    _customRegex:function(value,rules,position) {         // VALIDATE REGEX RULES
        var customRule = rules[position + 1];
        var pattern = eval(this._customRule[customRule].regex);
        if (!pattern.test(value)) {
            return _that._getCustomAlertText(customRule,"alertText");
        }else{
        	return true;
        }
    },
    // 校验程序错误提示
    error: function (error) {
        if (!$("#debugMode")[0]) {
            $("body").append("<div id='debugMode'><div class='debugError'><strong>校验程序出现异常，若已解决，请刷新页面</strong></div></div>");
        }
        $(".debugError").append("<div class='debugerror'>" + error + "</div>");
    },
    // 关闭提示信息
    closePrompt: function (caller, outside) {                        // CLOSE PROMPT WHEN ERROR CORRECTED
        if (!$.validationEngine.settings) {
            $.validationEngine.defaultSetting()
        }
        if (outside) {
            $(caller).fadeTo("fast", 0, function () {
                $(caller).remove();
                //创建tip提示的时候执行刷新
                if ($.validationEngine.settings.hideFormError) {
                    $.validationEngine.updateTips(caller);
                }
            });
            return false;
        }
        if (typeof(ajaxValidate) == 'undefined') {
            ajaxValidate = false
        }
        if (!ajaxValidate) {
            linkTofield = $.validationEngine.linkTofield(caller);
            closingPrompt = "." + linkTofield;
            $(closingPrompt).fadeTo("fast", 0, function () {
                //by yzhao radio和checkbox返回的是对象
                var errorId = caller.id ? caller.id : caller.attr("id");
                $("." + errorId + "formError").remove();
                //成功的时候会执行这个方法
                if ($.validationEngine.settings.hideFormError) {
                    $.validationEngine.updateTips(caller);
                }
            });
        }
    },
    _getPreAlertText:function(rule,strName){
       return this._prefabricateRule[rule][strName];
    },
    _getCustomAlertText:function(rule,strName){
        return this._customRule[rule][strName];
     }
};