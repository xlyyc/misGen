﻿wof.bizWidget.ObjectBar = function(){
    this._version = '1.0';

};
wof.bizWidget.ObjectBar.prototype={

    _bizWidgetComponents: null,

    _layoutComponents: null,

    _widgetComponents: null,

    _compositeComponents: null,

    getWidgetComponents: function(){
        if(this._widgetComponents==null){
            this._widgetComponents = [];
        }
        return this._widgetComponents;
    },

    setWidgetComponents: function(widgetComponents){
        this._widgetComponents = widgetComponents;
    },

    getBizWidgetComponents: function(){
        if(this._bizWidgetComponents==null){
            this._bizWidgetComponents = [];
        }
        return this._bizWidgetComponents;
    },

    setBizWidgetComponents: function(bizWidgetComponents){
        this._bizWidgetComponents = bizWidgetComponents;
    },

    getLayoutComponents: function(){
        if(this._layoutComponents==null){
            this._layoutComponents = [];
        }
        return this._layoutComponents;
    },

    setLayoutComponents: function(layoutComponents){
        this._layoutComponents = layoutComponents;
    },

    getCompositeComponents: function(){
        if(this._compositeComponents==null){
            this._compositeComponents = [];
        }
        return this._compositeComponents;
    },

    setCompositeComponents: function(compositeComponents){
        this._compositeComponents = compositeComponents;
    },


    _initRender: function(){
            var toolbar = wof$.create('Toolbar');
            toolbar.setIsInside(true);
            toolbar.setWidth(this.getWidth());
            toolbar.setTop(0);
            toolbar.setLeft(0);
            toolbar.appendTo(this);

            var layoutComponents = this.getLayoutComponents();
            if(layoutComponents.length>0){
                var toolbarItem0 = wof$.create('ToolbarItem');
                toolbarItem0.setIsInside(true);
                toolbarItem0.setTitle('布局构件');
                toolbarItem0.setName('layout');
                toolbarItem0.appendTo(toolbar);
                for(var i=0;i<layoutComponents.length;i++){
                    var widget = layoutComponents[i];
                    var label = new wof.widget.Label();
                    label.setIsInside(true);
                    label.setIco('src/img/dropdown.png');
                    label.setWidth(130);
                    label.setHeight(25);
                    label.setValue(widget.getMeta().name);
                    label.setText(widget.getMeta().title);
                    label.appendTo(toolbarItem0);
                    label.getDomInstance().draggable({
                        cursor:"move",
                        opacity: 0.7,
                        cursorAt:{
                            top:0,
                            left:0
                        },
                        scroll: false,
                        helper: 'clone',
                        start:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex',60000);
                        },
                        stop:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex','auto');
                        }
                    });
                }
            }

            var bizWidgetComponents = this.getBizWidgetComponents();
            if(bizWidgetComponents.length>0){
                var toolbarItem1 = wof$.create('ToolbarItem');
                toolbarItem1.setIsInside(true);
                toolbarItem1.setTitle('页面构件');
                toolbarItem1.setName('biz');
                toolbarItem1.appendTo(toolbar);
                for(var i=0;i<bizWidgetComponents.length;i++){
                    var widget = bizWidgetComponents[i];
                    var label = new wof.widget.Label();
                    label.setIsInside(true);
                    label.setIco('src/img/dropdown.png');
                    label.setWidth(130);
                    label.setHeight(25);
                    label.setValue(widget.getMeta().name);
                    label.setText(widget.getMeta().title);
                    label.appendTo(toolbarItem1);
                    label.getDomInstance().draggable({
                        cursor:"move",
                        opacity: 0.7,
                        cursorAt:{
                            top:0,
                            left:0
                        },
                        scroll: false,
                        helper: 'clone',
                        start:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex',60000);
                        },
                        stop:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex','auto');
                        }
                    });
                }
            }


            var widgetComponents = this.getWidgetComponents();
            if(widgetComponents.length>0){
                var toolbarItem2 = wof$.create('ToolbarItem');
                toolbarItem2.setIsInside(true);
                toolbarItem2.setTitle('功能构件');
                toolbarItem2.setName('base');
                toolbarItem2.appendTo(toolbar);
                for(var i=0;i<widgetComponents.length;i++){
                    var widget = widgetComponents[i];
                    var label = new wof.widget.Label();
                    label.setIsInside(true);
                    label.setIco('src/img/dropdown.png');
                    label.setWidth(130);
                    label.setHeight(25);
                    label.setValue(widget.getMeta().name);
                    label.setText(widget.getMeta().title);
                    label.appendTo(toolbarItem2);
                    label.getDomInstance().draggable({
                        cursor:"move",
                        opacity: 0.7,
                        cursorAt:{
                            top:0,
                            left:0
                        },
                        scroll: false,
                        helper: 'clone',
                        start:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex',60000);
                        },
                        stop:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex','auto');
                        }
                    });
                }
            }

            var compositeComponents = this.getCompositeComponents();
            if(compositeComponents.length>0){
                var toolbarItem3 = wof$.create('ToolbarItem');
                toolbarItem3.setIsInside(true);
                toolbarItem3.setTitle('构件组合');
                toolbarItem3.setName('composite');
                toolbarItem3.appendTo(toolbar);
                for(var i=0;i<compositeComponents.length;i++){
                    var compositeComponent = compositeComponents[i];
                    var label = new wof.widget.Label();
                    label.setIsInside(true);
                    label.setIco('src/img/dropdown.png');
                    label.setWidth(130);
                    label.setHeight(25);
                    label.setType('composite');
                    label.setValue(compositeComponent.id);
                    label.setText(compositeComponent.label);
                    label.appendTo(toolbarItem3);
                    label.getDomInstance().draggable({
                        cursor:"move",
                        opacity: 0.7,
                        cursorAt:{
                            top:0,
                            left:0
                        },
                        scroll: false,
                        helper: 'clone',
                        start:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex',60000);
                        },
                        stop:function(event,ui){
                            event.stopPropagation();
                            label.getDomInstance().css('zIndex','auto');
                        }
                    });
                }
            }


    },

	//选择实现
	_beforeRender: function(){

	},
	//必须实现
	render: function(){

	},
    //选择实现
    _afterRender: function(){

    },
	//必须实现
	getData:function(){
		return {
            layoutComponents: this.getLayoutComponents(),
            bizWidgetComponents: this.getLayoutComponents(),
            widgetComponents: this.getWidgetComponents(),
            compositeComponents: this.getCompositeComponents()
		};
	},
	//必须实现
	setData:function(data){
        this.setLayoutComponents(data.layoutComponents);
        this.setLayoutComponents(data.bizWidgetComponents);
        this.setWidgetComponents(data.widgetComponents);
        this.setCompositeComponents(data.compositeComponents);
	}
	
};