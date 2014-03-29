/**
 * author : qsyan
*/
(function($) {

    var cacheKeyPrefix = "com_",
        initComponentCache = {};
    
    $.widget("ui.editableForm",{
        options : {
            photo : {},
            model : 'view'
        },
        _setOption: function(key, value) {
            this.options={key:value};
        },
        _init : function (){
            this.baseComponent = ['text','date','photo','textarea','kindedit'];
            this.comboBox = ssfwConfig.combobox;
            this.comboTree = ssfwConfig.combotree;
            this.combotable = ssfwConfig.combotable;
            this.options.contextPath = ssfwConfig.contextPath;
            var param = '',that = this;
            $('input[baseType]',this.element).each(function (){
                var input = $(this),value = input.val();
                if(value){
                    var baseType = input.attr('baseType');
                    if(!that._isBaseComponent(baseType)){
                        var key = (++$.uuid);
                        initComponentCache[cacheKeyPrefix + key] = input;
                        param += '&baseTypes=' + baseType + '&values=' 
                            + value + "&keys=" + key;
                    }
                }
            });
            if(param){
                $.fn.selectRange.getTextFromServer.call(this,param,function (data){
                    if(data && data.length){
                        for(var i = 0; i < data.length;i++){
                            var key = data[i].key;
                            var dom = initComponentCache[cacheKeyPrefix + key];
                            if(dom) dom.val(data[i].label);
                        }
                    }
                    initComponentCache = {};
                });
            }
            if(this.options.model === 'view'){
                this.showView();
            }
        },
        _isBaseComponent : function (baseType){
            for(var i = 0; i < this.baseComponent.length; i++){
                if(this.baseComponent[i] === baseType){
                    return true;
                }
            }
            return false;
        },
        showView : function (){
            this._findInstanceAndCreateIfNecessary('showView');
        },
        showEdit : function (options1){
            var tempOp = $.extend(this.options,options1);
            this._findInstanceAndCreateIfNecessary('showEdit');
        },
        _findInstanceAndCreateIfNecessary : function (action){
            var that = this,instance = null;
            $('*[baseType]',this.element).each(function (){
                var input = $(this);
                var baseType = input.attr('baseType');
                var find = false;
                switch(baseType){
                    case 'text':
                        instance = input.data('inputText');
                        if(!instance){
                            input.inputText();
                        }
                        input.inputText(action);
                        find = true;
                        break;
                    case 'date':
                        instance = input.data('date');
                        if(!instance){
                            input.date();
                        }
                        input.date(action);
                        find = true;
                        break;
                    case 'photo':
                        instance = input.data('photo');
                        if(!instance){
                            input.photo();
                        }
                        input.photo(action);
                        find = true;
                        break;
                    case 'kindedit':
                        that.processKindEdit(that.options.textarea,
                            $(this),action == 'showView' ? false : true);
                        find = true;
                        break;
                    case 'textarea':
                        instance = input.data('textarea');
                        if(!instance){
                            input.textarea();
                        }
                        input.textarea(action);
                        find = true;
                        break;
                }
                if(!find){
                    that.processOtherBaseType(input,baseType,action);
                }
            });
        },
        processOtherBaseType : function (input,baseType,action){
            var comboTree = this.comboTree,comboBox = this.comboBox,combotable = this.combotable;
            var find = false,instance; 
            var maxLength = comboTree.length >= comboBox.length ? 
            comboTree.length : comboBox.length;
            for(var i = 0; i < maxLength; i++){
                if(i < comboTree.length && baseType === comboTree[i]){
                    instance = input.data('combotree');
                    if(!instance){
                        input.combotree({
                            initTextByValue: false,
                            baseType : baseType
                        });
                    }
                    input.combotree(action);
                    find = true;
                    break;
                }
                if(i < comboBox.length && baseType === comboBox[i]){
                    instance = input.data('combobox');
                    if(!instance){
                        input.combobox({
                            initTextByValue: false,
                            baseType : baseType
                        });
                    }
                    input.combobox(action);
                    find = true;
                    break;
                }
                if(!find){
                // alert('û�ҵ� ' + baseType + ' ���');
                }
            }
            if(combotable && combotable.length){
                $.each(combotable,function (){
                    if(this.name == baseType){
                       var defaultOptions = { initTextByValue : false};
                       if(this.config){
                           $.extend(defaultOptions,this.config);
                           var instance = input.data('selectTable');
                           if(!instance){
                             input.selectTable(defaultOptions);
                           }
                           input.selectTable(action);
                       }
                       return false;
                    }
                    return true;
                });
            }
        },
        processKindEdit : function (option,textarea,isCreate){
            if(!textarea){
                return;
            }
            if(isCreate){
                textarea.show();
                var editor = KindEditor.create(textarea);
                textarea.data('editor',editor);
                var span = textarea.data('viewspan');
                if(span){
                    span.hide();
                }
            }else{
                var editor = textarea.data('editor');
                if(editor){
                    var span = textarea.data('viewspan');
                    if(!span){
                        span = $('<span/>');
                        span.insertBefore(textarea);
                    }
                    span.html(editor.html());
                    span.show();
                    textarea.data('viewspan',span);
                    editor.remove();
                }else{
                    textarea.hide();
                }
            }
        }
    });

})(jQuery);