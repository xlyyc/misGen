(function($) {
	$.loveyCheckbox = $.loveyCheckbox || {};
    //组件参数集合定义
    $.loveyCheckbox.Default = {
        id: "",        //容器的id,非空
        name: "",                //checkbox的名字
        class: "",     //预加载的样式名称
        dir: "",                //设置或返回文本的方向
        lang: "",               //设置或返回元素的语言代码
        top:"",
        left:"",
        width:"",
        height:"",
        title: "",              //设置或返回title的属性
        disabled: "",           //设置或返回 checkbox 是否应被禁用。
        checked: "",            //设置或返回 checkbox 是否应被选中。
        value: "",              //设置或返回 checkbox 的 value 属性的值
        text: "",                //设置或返回 checkbox 的文本
        accessKey: "",          //设置或返回访问 checkbox 的快捷键。
        alt: "",                //设置或返回不支持 checkbox 时显示的替代文本。
        defaultChecked: "",     //返回 checked 属性的默认值。
        form: "",               //返回对包含 checkbox 的表单的引用。
        tabIndex: "",           //设置或返回 checkbox 的 tab 键控制次序。
        onClick: null,           //单击事件
        //onChange: null,          //内容改变事件
        onSelect: null           //选中事件
    };

	$.loveyCheckbox.create = function(option) {
		var g = {
			_option: {},
            root: null,
            label: null,
            input: null,
            link: null,
            span: null,
            init: function(option) {
                $.extend(this._option, $.loveyCheckbox.Default, option);
                this.root = $('<div></div>');
                this.label = $('<label class="ui_checkbox"></label>');
                this.input = $('<input type="checkbox"/>');
                this.link = $('<a class="checkbox_text"/>');
                this.span = $('<span></span>');
                this.label.append(this.input).append(this.link);
                this.root.append(this.label).append(this.span);
                this._render();
                this._bindEvents();
            },
			_render: function() {
				if (this._option.id) this.label.attr('id', this._option.id);
				if (this._option.name) this.root.attr('name', this._option.name);
				if (this._option.class) this.label.removeClass(this._option.class).addClass(this._option.class);
				if (this._option.width) this.label.css('width', this._option.width);
				if (this._option.height) this.label.css('height', this._option.height);
				if (this._option.top) this.label.css('top', this._option.top);
				if (this._option.left) this.label.css('left', this._option.left);
                if (this._option.value) this.input.val(this._option.value);
                if (this._option.text) this.span.html(this._option.text);
                //disabled状态
                if (this._option.disabled) {
                    this.input.attr("disabled", "disabled");
                    this.label.addClass("ui_checkbox_disabled");
                } else {
                    this.input.removeAttr("disabled");
                    this.label.removeClass("ui_checkbox_disabled");
                }
                //checked状态
                if (this._option.checked) {
                    this.input.attr("checked", "checked");
                    this.label.addClass("ui_checkbox_checked");
                } else {
                    this.input.removeAttr("checked");
                    this.label.removeClass("ui_checkbox_checked");
                }
			},
			_bindEvents: function() {
                //单击事件
                g.link.on("click", function(e) {
                    //disabled状态不处理
                    if (g.label.hasClass("ui_checkbox_disabled")) {
                        return;
                    }
                    //自定义onClick事件
                    if ((typeof g._option.onClick == "function") && g._option.onClick() == false) {
                        return;
                    }
                    if (g.label.hasClass("ui_checkbox_checked")) {
                        g.label.removeClass("ui_checkbox_checked");
                        g.input.removeAttr("checked");
                    } else {
                        g.label.addClass("ui_checkbox_checked");
                        g.input.attr("checked", "checked");
                    }

                    //自定义onSelect事件
                    if ((typeof g._option.onSelect == "function") && g.label.hasClass("ui_checkbox_checked") && g._option.onSelect() == false) {
                        return;
                    }

                });
			},
			_unbindEvents: function() {
                g.link.off('click');
			},
			setOptions: function(option) {
				$.extend(this._option, option);
				this._render();
				this._unbindEvents();
				this._bindEvents();
			},
			getOptions: function() {
				return this._option;
			}
		};

        g.init(option);

		return g;
	}
}(jQuery));