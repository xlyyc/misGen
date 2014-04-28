wof.bizWidget.PropertyBar = function(){
    this._version = '1.0';

    jQuery.fn.naturalNumber = function(required) {     //非负整数(包括0)
        jQuery(this).css("ime-mode", "disabled");
        this.bind("keypress", function(e){
            if (e.charCode === 0) return true;  //非字符键 for firefox
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
            return code >= 48 && code <= 57;
        });
        this.bind("blur", function(){
            if (!/(^[1-9]\d*$)|(^[0]$)/.test(this.value)){
                if(required!=true){
                    if(this.value!=null&&this.value!=''){
                        alert('请输入非负整数');
                        this.focus();
                    }
                }else{
                    alert('请输入非负整数');
                    this.focus();
                }
            }
        });
        /*this.bind("paste", function(){
            if (window.clipboardData){
                var s = clipboardData.getData('text');
                if (!/\D/.test(s)){
                    value = parseInt(s, 10);
                    return true;
                }
            }
            return false;
        });
        this.bind("dragenter", function(){
            return false;
        });
        this.bind("keyup", function(){
            if (this.value !== '0' && /(^0+)/.test(this.value)){
                this.value = parseInt(this.value, 10);
            }
        });
        this.bind("propertychange", function(e){
            if (isNaN(this.value))
                this.value = this.value.replace(/\D/g, "");
        });
        this.bind("input", function(e){
            if (isNaN(this.value)){
                this.value = this.value.replace(/\D/g, "");
            }
        });*/
    };

    jQuery.fn.positiveIntegerOrPositiveDecimal = function(required) {    //正整数(不包括0)或者正小数
        jQuery(this).css("ime-mode", "disabled");
        this.bind("keypress", function(e){
            if (e.charCode === 0) return true;  //非字符键 for firefox
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
            return (code >= 48 && code <= 57) || code==46;
        });
        this.bind("blur", function(){
            if (!/(^[1-9]\d*$)|(^[1-9]\d*\.\d+$)|(^[0]\.\d+$)/.test(this.value)){
                if(required!=true){
                    if(this.value!=null&&this.value!=''){
                        alert('请输入正整数或者正小数');
                        this.focus();
                    }
                }else{
                    alert('请输入正整数或者正小数');
                    this.focus();
                }
            }
        });
    };

};
wof.bizWidget.PropertyBar.prototype={

    _parameters: null,

    _meta: null,  //构件元数据

    getMeta: function(){
        return this._meta;
    },

    setMeta: function(meta){
        this._meta = meta;
    },

    setParameters:function(parameters){
        this._parameters = parameters;
    },

    getParameters: function(){
        if(this._parameters==null){
            this._parameters = {};
        }
        return this._parameters;
    },

	//创建表
	_createTable: function(trs){
		var table = jQuery('<table id="propertyTable" style="border-collapse:collapse;text-align:left;width:96%;">');
		var tbody = jQuery('<tbody>');
		for(var i=0;i<trs.length;i++){
			tbody.append(trs[i]);
		}
		table.append(tbody);
		return table;
	},
	//创建行
	_createTr: function(meta,value){
        var tr = null;
        if(meta.isHide==true){
            tr = jQuery('<tr style="height:0px;">');
            tr.append(jQuery('<td style="height:0px;"></td>'));
            var td = jQuery('<td style="height:0px;"></td>');
            var input = jQuery('<input type="hidden" name="'+meta.prop+'"/>');
            td.append(input.val(String(value)));
            tr.append(td);
        }else{
            tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
            tr.append(jQuery('<td style="width:45%;"><span style="width:100px;" title="'+meta.prop+'">'+meta.name+(meta.required==true?'<span style="color:red;">*</span>':'')+'</span></td>'));
            if(meta.type=='text'){  //文本类型
                var td = null;
                if(meta.readOnly==true){
                    td = jQuery('<td style="width:55%;"></td>');
                    var input = jQuery('<input type="text" style="width:100px;border:0px;border-bottom:1px solid black;background-color:transparent;"'+(meta.readOnly==true?'readonly':'')+' name="'+meta.prop+'"/>');
                    td.append(input.val(String(value)));
                    tr.append(td);
                }else{
                    td = jQuery('<td style="width:55%;">');
                    var input = jQuery('<input type="text" style="width:100px;" name="'+meta.prop+'"/>');
                    td.append(input.val(String(value)));
                    if(meta.required==true){
                        input.bind("blur", function(){
                            if(this.value==null||this.value==''){
                                alert('请输入属性值');
                                this.focus();
                            }
                        });
                    }
                }
                tr.append(td);
            }else if(meta.type=='yesOrNo'){ //是否类型
                var sel =jQuery('<select name="'+meta.prop+'">');
                sel.append(jQuery('<option value="true" '+(String(value)=='true'?'selected':'')+'>是</option>'));
                sel.append(jQuery('<option value="false" '+(String(value)=='false'?'selected':'')+'>否</option>'));
                var td = jQuery('<td style="width:55%;">');
                td.append(sel);
                tr.append(td);
            }else if(meta.type=='naturalNumber'){ //自然数类型
                var td = null;
                if(meta.readOnly==true){
                    td = jQuery('<td style="width:55%;"></td>');
                    var input = jQuery('<input type="text" style="width:100px;border:0px;border-bottom:1px solid black;background-color:transparent;"'+(meta.readOnly==true?'readonly':'')+' name="'+meta.prop+'"/>');
                    td.append(input.val(String(value)));
                }else{
                    td = jQuery('<td style="width:55%;">');
                    var input = jQuery('<input type="text" style="width:100px;"  name="'+meta.prop+'"/>');
                    input.naturalNumber(meta.required);
                    td.append(input.val(String(value)));
                }
                tr.append(td);
            }else if(meta.type=='positiveIntegerOrPositiveDecimal'){  //自然数(包括0)或者非负小数类型
                var td = null;
                if(meta.readOnly==true){
                    td = jQuery('<td style="width:55%;"></td>');
                    var input = jQuery('<input type="text" style="width:100px;border:0px;border-bottom:1px solid black;background-color:transparent;"'+(meta.readOnly==true?'readonly':'')+' name="'+meta.prop+'"/>');
                    td.append(input.val(String(value)));
                }else{
                    td = jQuery('<td style="width:55%;">');
                    var input = jQuery('<input type="text" style="width:100px;"  name="'+meta.prop+'"/>');
                    input.positiveIntegerOrPositiveDecimal(meta.required);
                    td.append(input.val(String(value)));
                }
                tr.append(td);
            }else if(meta.type=='enum'){ //枚举类型
                var enumData = meta.enumData;
                var sel =jQuery('<select  style="width:100px;" name="'+meta.prop+'">');
                for(var e in enumData){
                    sel.append(jQuery('<option value="'+e+'" '+(e==String(value)?'selected':'')+'>'+enumData[e]+'</option>'));
                }
                var td = jQuery('<td style="width:55%;">');
                td.append(sel);
                tr.append(td);
            }else if(meta.type=='custom'){ //定制类型
                tr = jQuery('<tr style="height:30px;border:1px inset #a1a1a1;">');
                tr.append(jQuery('<td style="width:45%;"><span style="width:100px;" title="'+meta.prop+'">'+meta.name+'</span></td>'));
                var td = jQuery('<td style="width:55%;">');
                value = encodeURIComponent(JSON.stringify(value));
                var hidden = jQuery('<input type="hidden" name="'+meta.prop+'" value="'+String(value)+'"/>');
                td.append(hidden);
                var button = jQuery('<input type="button" name="'+meta.prop+'_button" value=" 设置 ">');
                td.append(button);
                var _this = this;
                button.mousedown(function(event){
                    event.stopPropagation();
                    var hidden = jQuery(event.target).prev();
                    var customParam = meta.customParam;
                    eval(meta.customMethod+'.run(hidden,customParam,_this);');
                });
                tr.append(td);
            }
        }
		return tr;
	},

	//选择实现
	_beforeRender: function(){

		this.getDomInstance().children().remove();
	},

	//必须实现
	render: function(){
		var _this = this;
        var parameters = this.getParameters();
        var meta = this.getMeta();
		if(!jQuery.isEmptyObject(parameters)){
            var disabledComponents = [];
            var trs = [];
            for(var name in parameters){
                var m = meta.propertys[parameters.activeClass][name];
                if(m!=null){
                    var value = parameters[name];
                    trs.push(this._createTr(m,value));
                    if(m.disabledComponents!=null){
                        var enums = m.disabledComponents.enums.split(',');
                        var idx=jQuery.inArray(String(value), enums);
                        if(idx>=0){
                            disabledComponents = jQuery.merge(disabledComponents, m.disabledComponents.components.split(','));
                        }
                    }
                }
            }
            var table = this._createTable(trs);
            this.getDomInstance().append(table);

            var texts = jQuery('table[id="propertyTable"] > tbody > tr > td > input[type="text"]');
            texts.each(function(){
                 jQuery(this).bind("blur", function(){
                    var name = jQuery(this).attr('name');
                    var val = String(jQuery(this).val());
                    parameters[name] = val;
                });
            });

            var sels = jQuery('table[id="propertyTable"] > tbody > tr > td > select');
            sels.each(function(){
                jQuery(this).on('change', function() {
                    var name = jQuery(this).attr('name');
                    var val = String(jQuery(this).val());
                    parameters[name] = val;
                    _this.render();
                });
            });

            //禁用相关的控件
            for(var i=0;i<disabledComponents.length;i++){
                var component = jQuery('table[id="propertyTable"] > tbody > tr > td > *[name="'+disabledComponents[i]+'"]');
                if(component!=null){
                    if(component.attr('type')=='hidden'){
                        component = jQuery('table[id="propertyTable"] > tbody > tr > td > *[name="'+disabledComponents[i]+'_button"]');
                    }
                    component.attr("disabled", true);
                }
            }
		}
        var applyBtn = jQuery('<input type="button" value=" 应用 ">');
        this.getDomInstance().append(applyBtn);
        applyBtn.mousedown(function(event){
            event.stopPropagation();
            var f = true;
            var inputs = jQuery('table[id="propertyTable"] > tbody > tr > td > input');
            var parameters = _this.getParameters();
            inputs.each(function(){
                var name = jQuery(this).attr('name');
                var val = String(jQuery(this).val());
                if(jQuery(this).attr('type')=='hidden'){
                    val = JSON.parse(decodeURIComponent(val));
                }
                parameters[name] = val;
                var m = meta.propertys[parameters.activeClass][name];
                if((val==null||val=='') && (m!=null && m.required==true)){
                    alert('请输入必填项');
                    jQuery(this).focus();
                    f=false;
                    return false;
                }
            });
            if(f==true){
                var sels = jQuery('table[id="propertyTable"] > tbody > tr > td > select');
                sels.each(function(){
                    var name = jQuery(this).attr('name');
                    var val = String(jQuery(this).val());
                    parameters[name] = val;
                    var m = meta.propertys[parameters.activeClass][name];
                    if((val==null||val=='') && (m!=null && m.required==true)){
                        alert('请输入必填项');
                        jQuery(this).focus();
                        f=false;
                        return false;
                    }
                });
            }
            if(f==true){
                _this.sendMessage('wof.bizWidget.PropertyBar_apply');
            }
        });
	},
	//必须实现
	getData:function(){
		return {
            parameters: this.getParameters(),
            meta: this.getMeta()
		};
	},
	//必须实现
	setData:function(data){
		this.setParameters(data.parameters);
        this.setMeta(data.meta);
	}
	
};