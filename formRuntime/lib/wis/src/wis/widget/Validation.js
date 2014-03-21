/**
 * 验证控件统一API
 */
wis.widget.Validation = function () {
    this._version = '1.0';

};

wis.widget.Validation.prototype = {
    _cid: null,				// 唯一标识
    _themes:null,			// 主题
    _prefabricateRule: null,	// 默认验证规则的集合(包括基本校验和提供的ajax校验)。不可更改
    _customRule: null,		// 可扩展验证规则的集合,使用者可重新设置
    _ruleFunction: null,		// 自定义验证的函数：Func ,alertText，优先校验此项
    _errorMsg: null,		// 错误信息(默认提示)
    _msgPosition: 'topRight', 	// 错误提示信息的定位 
    						  	// 可选 : topLeft, topRight, bottomLeft, centerRight, bottomRight
    
    _alertTextFlag: false,		// 是否启用默认提示
    _returnDealFunc: null,		// 校验返回信息处理函数，alertTextFlag为false时生效
    _liveEvent:true,			// 即时触发，为true时绑定_validationEventTriggers指定的事件
    _validationEventTriggers: 'blur', // 触发校验的事件
    _returnIsValid: false, 		//通过校验是否也返回提示，如对号标识
    
    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

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
        return this._msgPosition;
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
    initRender: function () {
    	if(!this.getPrefabricateRule()){
    		this.setOptions(null);
    	}
    },

    //渲染前处理方法
    beforeRender: function () { },

    //渲染方法
    render: function () {},

    //渲染后处理方法
    afterRender: function () {},

    //----------必须实现----------
    getData: function () {
    	return {
            cid: this.getCid(),
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
        if(data.cid){
    		this.setCid(data.cid);
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
            cid: this.getCid(),
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
     *  绑定校验规则的方法，对外提供（设置事件，自动绑定）
     *  @param rules 校验规则，数组，如[required,length[2,10]]
     *  @param alertTextFlag 是否启用默认处理，若是，则自动弹出错误提示，否则仅返回结果
     *  @param obj 构件实例，仅当alertTextFlag为true时用作弹出错误提示的定位
     *  @param returnDealFunc 校验返回信息处理函数，alertTextFlag为false时生效
     *  @param liveEvent 即时触发，为true时绑定_validationEventTriggers指定的事件
     *  @param validationEventTriggers  触发校验的事件
     *  @param returnIsValid 通过校验是否也返回提示，如对号标识
     *  @returns 无返回
     */   
    bindValidateRule: function (rules,obj,alertTextFlag,returnDealFunc,liveEvent,validationEventTriggers,returnIsValid) {
    	
    },
    /**
     *  校验方法，对外提供（构件触发执行）
     *  @param rules 校验规则，数组，如[required,length[2,10]]
     *  @param value 待校验的值，object
     *  @param alertTextFlag 是否启用默认处理，若是，则自动弹出错误提示，否则仅返回结果
     *  @param caller 构件实例，仅当alertTextFlag为true时用作弹出错误提示的定位
     *  @returns 校验结果 true|false
     */    
    doValidate: function (rules,value,caller,alertTextFlag) {
    	var validationPass = this._validateCall(value,rules);
        return (validationPass) ? true : false;
    },
    _validateCall: function (value, rulesStr) {
    	var rulesRegExp = /\[(.*)\]/;
        var getRules = rulesRegExp.exec(rulesStr);
        var str = getRules[1];
        var pattern = /\[|,|\]|\|/;
        var rules = str.split(pattern);
    	for (i = 0; i < rules.length; i++) {
    		var errorMsg = "";
    		var _result = true;
    		/**
    		 * 目前只对值进行校验，对于分组校验个数需求的通过定制处理
         	 * 如: "maxCheckbox"、 "minCheckbox"等
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
                case "equals":	//值等于
                case "notEquals":	//值不等于
                case "limit":  //值大小区间
                case "minValue": //最小值
                case "maxValue": //最大值
                case "acceptfile": // 有效文件格式
                case "doFilter": // 文件类型过滤
                case "ajax":	// 执行AJAX请求进行校验
                case "funcCall": // 自定义处理函数
                	_result = this._prefabricateRule[rules[i]].validateFunc(value, rules, i);
                	if(_result!=true){
                		errorMsg += _result+"<br/>";
                    }
                    break;
                case "exemptString": // 不校验字符串，出现某特定字符串则清空错误信息
                	_result = this._prefabricateRule.exemptString.validateFunc(value, rules, i);
                	if(_result==true){
                		errorMsg = "";
                    }
                    break;
                case "custom": // 可扩展
                    _customRegex(value,rules, i);
                    break;
                default :
                    break;
            }
            if(errorMsg!=""){
            	// 校验一个不通过就返回，不再校验？？
            	// 有些情形可能有清空错误的处理，可能全部校验完再返回结果
            	//break;
            	//return errorMsg;
            }
    	}
    	if(errorMsg==""){
    		return true;
    	}else{
    		return false;
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
                "alertText": "* 长度必须在 ",
                "alertText2": " 至 ",
                "alertText3": " 之间."},
            "limit": {
                "regex": "none",
                "alertText": "* 大小必须在 ",
                "alertText2": " 至 ",
                "alertText3": " 之间."},
            "minValue": {
                "regex": "none",
                "alertText": "* 值不小于 "},
            "maxCheckbox": {
                "regex": "none",
                "alertText": "* 最多选择 ",
                "alertText2": " 项."},
            "minCheckbox": {
                "regex": "none",
                "alertText": "* 至少选择 ",
                "alertText2": " 项."},
            "equals": {
                "regex": "none",
                "alertText": "* 两次输入不一致,请重新输入."}
            
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
            "noSpecialCaractersNew": {
                "regex": "/^[0-9a-zA-Z\u4e00-\u9fa5]*$/",
                "alertText": "* 只允许英文字母、数字和中文"
            }
        };
    	this.setCustomRule(customRule);
    	if (!data) {
    		data = {};
    	}
        if(data.cid){
    		this.setCid(data.cid);
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
        	return this._getPreAlertText(rules[position],"alertText");
        }else{
        	return true;
        }
    },  
    _doFilter: function(str, rules, position) { // doFilter['filter'],参数即为文件类型
        var filter = rules[position + 1];
        var regexp = new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(str);
        if (!regexp) {
        	return "* 文件类型只支持" + filter+".";
        }else{
        	return true;
        }
    }

    _exemptString: function(value, rules, position) {    
        customString = rules[position + 1];
        if (customString == value) {
            return true;
        }
    }

    /**
     * 执行一个自定义函数，函数的规则由用户指定
     * @param caller
     * @param rules
     * @param position
     * @private
     */
    _funcCall: function(value, rules, position) {          // VALIDATE CUSTOM FUNCTIONS OUTSIDE OF THE ENGINE SCOPE
        customRule = rules[position + 1];
        var fn = window[customRule]; //window中已经定义该函数
        var fieldId = $(caller).attr("id");
        /*if (typeof(fn) === 'function') {
         var fn_result = fn();
         $.validationEngine.isError = fn_result;
         promptText += $.validationEngine.settings.allrules[customRule].alertText + "<br />";
         }*/
        if (typeof(fn) == 'function') {
            //函数返回true则不允许提交，返回false则允许提交
            var fn_result = fn(fieldId, rules, position);
            $.validationEngine.isError = fn_result.isError;
            promptText += fn_result.alertText + "<br />";
        }
    }
    /**
     * 表单客户端ajax验证
     * 验证格式为class="validate[ajax['${contextPath}/doc/checkDirtyWord.do','right','loading','wrong']]"
     * @param caller
     * @param rules
     * @param position
     */
    _ajax: function(value, rules, position) {                 // VALIDATE AJAX RULES
        //定位找到指定的正则表达式规则
        customAjaxRule = rules[position + 1];

        var extraData = '';
        /**
         * by yzhao 2013-3-7 15:02
         * 原有CMS的方法不合理，在这里废弃
         * @type {*}
         */
        /*
         if (rules.length > 2) {
         //往checkUrl后拼接参数
         extraData = rules[position + 2].indexOf('=') > -1 ? '&' + rules[position + 2] : '';
         }

         //取得页面的参数
         postfile = eval(rules[position + 1]);
         alertOk = eval(rules[position + 2]);
         alertNo = eval(rules[position + 3]);*/

        //如果从页面上没有拿到参数，则使用默认的参数
        var ajaxCheckSetting = $.validationEngine.settings.allrules[customAjaxRule];
        postfile = ajaxCheckSetting.file;
        alertOk = $.validationEngineLanguage.getAlertText(caller,customAjaxRule,"alertTextOk");
        alertNo = $.validationEngineLanguage.getAlertText(caller,customAjaxRule,"alertText");

        /**
         * 取得验证的input的id和值
         * @type {*}
         */
        fieldValue = $(caller).val();
        ajaxCaller = caller;
        fieldId = $(caller).attr("id");
        ajaxValidate = true;
        ajaxisError = $.validationEngine.isError;

        //todo 扩展的参数，需要考虑？
        if ($.validationEngine.settings.allrules[customAjaxRule].extraData) {
            extraData += '&' + $.validationEngine.settings.allrules[customAjaxRule].extraData;
        }
        /* AJAX VALIDATION HAS ITS OWN UPDATE AND BUILD UNLIKE OTHER RULES */
        if (!ajaxisError) {
            $.ajax({
                type: "POST",
                url: easyloader.URI + postfile,
                //将客户端的验证表单值，验证inputID，验证规则，数据一起传至服务端,这种拼装方式还是url提交参数
                //data: "validateValue=" + fieldValue + "&validateId=" + fieldId + "&validateRule=" + customAjaxRule + extraData,
                data: {"validateValue": fieldValue, "validateId": fieldId, "validateRule": customAjaxRule + extraData},
                dataType: "json",
                beforeSend: function () {        // BUILD A LOADING PROMPT IF LOAD TEXT EXIST
                    if ($.validationEngine.settings.allrules[customAjaxRule].alertTextLoad) {

                        if (!$("div." + fieldId + "formError")[0]) {
                            return $.validationEngine.buildPrompt(ajaxCaller,
                                $.validationEngine.settings.allrules[customAjaxRule].alertTextLoad, "load");
                        } else {
                            $.validationEngine.updatePromptText(ajaxCaller,
                                $.validationEngine.settings.allrules[customAjaxRule].alertTextLoad, "load");
                        }
                    }
                },
                error: function (data, transport) {
                    $.validationEngine.debug("error in the ajax: " + data.status + " " + transport)
                },
                success: function (data) {
                    // 如果回传的是字符串将其转换成对象
                    data = (typeof data == 'string') ? eval("(" + data + ")") : data;
                    //取得验证的结果，验证规则，验证的input的ID
                    ajaxisError = data.jsonValidateReturn[2];
                    customAjaxRule = data.jsonValidateReturn[1];
                    ajaxCaller = $("#" + data.jsonValidateReturn[0])[0];
                    fieldId = ajaxCaller;
                    ajaxErrorLength = $.validationEngine.ajaxValidArray.length;
                    existInarray = false;

                    if (ajaxisError == "false") {            // DATA FALSE UPDATE PROMPT WITH ERROR;

                        _checkInArray(false);				// Check if ajax validation alreay used on this field

                        if (!existInarray) {                     // Add ajax error to stop submit
                            $.validationEngine.ajaxValidArray[ajaxErrorLength] = new Array(2);
                            $.validationEngine.ajaxValidArray[ajaxErrorLength][0] = fieldId;
                            $.validationEngine.ajaxValidArray[ajaxErrorLength][1] = false;
                            existInarray = false;
                        }

                        $.validationEngine.ajaxValid = false;
                        promptText += alertNo + "<br />";
                        $.validationEngine.updatePromptText(ajaxCaller, promptText, "", true);
                    } else {
                        _checkInArray(true);
                        $.validationEngine.ajaxValid = true;
                        if (!customAjaxRule) {
                            $.validationEngine.debug("wrong ajax response, are you on a server or in xampp? if not delete de ajax[ajaxUser] validating rule from your form ")
                        }
                        if ($.validationEngine.settings.allrules[customAjaxRule].alertTextOk) {    // NO OK TEXT MEAN CLOSE PROMPT
                            $.validationEngine.updatePromptText(ajaxCaller, alertOk, "pass", true);
                        } else {
                            ajaxValidate = false;
                            $.validationEngine.closePrompt(ajaxCaller);
                        }
                    }
                    function _checkInArray(validate) {
                        for (x = 0; x < ajaxErrorLength; x++) {
                            if ($.validationEngine.ajaxValidArray[x][0] == fieldId) {
                                $.validationEngine.ajaxValidArray[x][1] = validate;
                                existInarray = true;

                            }
                        }
                    }
                }
            });
        }
    }

    _equals: function(value, rules, position) {         // VALIDATE FIELD MATCH
        equalsField = rules[position + 1];

        if ($(caller).attr('value') != $("#" + equalsField).attr('value')) {
            $.validationEngine.isError = true;
            promptText += $.validationEngineLanguage.getAlertText(caller,"equals","alertText") + "<br />";

        }
    }

    _length: function(value, rules, position) {          // VALIDATE LENGTH

        startLength = eval(rules[position + 1]);
        endLength = eval(rules[position + 2]);
        feildLength = $(caller).attr('value').length;

        if (feildLength < startLength || feildLength > endLength) {
            $.validationEngine.isError = true;
            promptText += $.validationEngineLanguage.getAlertText(caller,"length","alertText") + startLength + $.validationEngineLanguage.getAlertText(caller,"length","alertText2") + endLength + $.validationEngineLanguage.getAlertText(caller,"length","alertText3") + "<br />"
        }
    }

    _limit: function(value,rules,position)  {          // VALIDATE LIMIT
        min = eval(rules[position + 1]);
        max = eval(rules[position + 2]);
        feildValue = $(caller).attr('value');
        if (feildValue < min || feildValue > max) {
            $.validationEngine.isError = true;
            promptText += $.validationEngineLanguage.getAlertText(caller,"limit","alertText") + min +  $.validationEngineLanguage.getAlertText(caller,"limit","alertText2") + max +  $.validationEngineLanguage.getAlertText(caller,"limit","alertText3") + "<br />"
        }
    }

    _minValue: function(caller, rules, position) {
        min = eval(rules[position + 1]);
        feildValue = $(caller).attr('value');
        if (feildValue < min) {
            $.validationEngine.isError = true;
            promptText +=  $.validationEngineLanguage.getAlertText(caller,"minValue","alertText") + min + "<br/>";
        }
    }

    _maxCheckbox: function(caller, rules, position) {        // VALIDATE CHECKBOX NUMBER
        nbCheck = eval(rules[position + 1]);
        groupname = $(caller).attr("name");
        groupSize = $("input[name='" + groupname + "']:checked").size();
        if (groupSize > nbCheck) {
            $.validationEngine.showTriangle = false;
            $.validationEngine.isError = true;
            //promptText += $.validationEngine.settings.allrules["maxCheckbox"].alertText + "<br />";
            promptText += promptText +=  $.validationEngineLanguage.getAlertText(caller,"maxCheckbox","alertText") + min + "<br/>"; + " " + nbCheck + " " +  $.validationEngineLanguage.getAlertText(caller,"maxCheckbox","alertText2") + "<br />";
        }
    }
    _minCheckbox: function(caller, rules, position) {        // VALIDATE CHECKBOX NUMBER
        nbCheck = eval(rules[position + 1]);
        groupname = $(caller).attr("name");
        groupSize = $("input[name='" + groupname + "']:checked").size();
        if (groupSize < nbCheck) {

            $.validationEngine.isError = true;
            $.validationEngine.showTriangle = false;
            promptText += $.validationEngineLanguage.getAlertText(caller,"minCheckbox","alertText") + " " + nbCheck + " " + $.validationEngineLanguage.getAlertText(caller,"minCheckbox","alertText2") + "<br />";
        }
    }
    _acceptfile: function(caller, rules, position) {
        fileName = $(caller).attr('value');
        fileExt = (/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName.toLowerCase()) : '';
        acceptRule = rules[position + 1];

        if (fileExt == '' || acceptRule.indexOf(fileExt) < 0) {
            $.validationEngine.isError = true;
            promptText += $.validationEngineLanguage.getAlertText(caller,"accept","alertText") + "<br />" + "* 如：" + acceptRule.split(":").join(",") + "<br />";
        }
    },
    
    _customRegex:function(value,rules,position) {         // VALIDATE REGEX RULES
        var customRule = rules[position + 1];
        var pattern = eval(this._customRule[customRule].regex);

        if (!pattern.test(value) {
            return this._getCustomAlertText(customRule,"alertText");
        }
    }
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