(function($) {
	$.loveyRadio = $.loveyRadio || {};
	$.loveyRadio.Default = {
		cid: "",
		name: "",
		classname: "",
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		disabled: false,
		validate: "",
		text: "",
		value: "",
		onchecked: null,
		onclick: null
	};

	$.loveyRadio.create = function(option) {
		var radio = {
			_option: {},
			_render: function() {
				if (this._option.cid) this._radio.attr('id', this._option.cid);
				if (this._option.name) this._radio.attr('name', this._option.name);
				if (this._option.classname) this._radio.css('class', this._option.classname);
				if (this._option.width) this._radio.css('width', this._option.width);
				if (this._option.height) this._radio.css('height', this._option.height);
				if (this._option.top) this._radio.css('top', this._option.top);
				if (this._option.left) this._radio.css('left', this._option.left);
				if (this._option.disabled) this._radio.attr('disabled', this._option.disabled);
				if (this._option.value) this._radio.val(this._option.value);
				
				if (this._option.text){
					this.root.empty();
					this.root.append(this._radio).append(this._option.text);
				} 
			},
			_bindEvents: function() {
				var that = this;
				this._radio.on('click', function(e) {
					var checked = that._radio.attr('checked');
					if (checked && that._option.onchecked) {
						that._option.onchecked(e);
					}

					if (that._option.onclick) {
						that._option.onclick(e);
					}

					that.checked = checked;
				});
			},
			_unbindEvents: function() {
				this._radio.off('click');
			},
			_radio: null,
			root: null,
			init: function(option) {
				this._radio = $('<input type="radio"/>');
				this.root = $('<label></label>').append(this._radio);

				$.extend(this._option, $.loveyRadio.Default, option);
				this.refresh();
			},
			refresh: function() {
				this._render();
				this._unbindEvents();
				this._bindEvents();
			},
			setOption: function(option) {
				$.extend(this._option, option);
				this.refresh();
			},
			getOption: function() {
				return this._option;
			},
			checked: false,
			val: function() {
				return this._radio.val();
			}
		};

		radio.init(option);

		return radio;
	}
}(jQuery));