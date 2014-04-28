(function($) {
	$.loveyTextArea = $.loveyTextArea || {};
	$.loveyTextArea.Default = {
		cid: "",
		name: "",
		classname: "",
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		disabled: false,
		validate: "",
		value: "",
		readonly: false,
		placeholder: "",
		rows: 2,
		cols: 20,
		onchange: null,
		onclick: null,
		onfocus: null,
		onblur: null
	};
	
	$.loveyTextArea.create = function(option) {
		var input = {
			_option: {},
			_render: function() {
				if (this._option.cid) this.root.attr('id', this._option.cid);
				if (this._option.name) this.root.attr('name', this._option.name);
				if (this._option.classname) this.root.css('class', this._option.classname);
				if (this._option.width) this.root.css('width', this._option.width);
				if (this._option.height) this.root.css('height', this._option.height);
				if (this._option.top) this.root.css('top', this._option.top);
				if (this._option.left) this.root.css('left', this._option.left);
				if (this._option.disabled) this.root.attr('disabled', this._option.disabled);
				if (this._option.value) this.root.attr('value', this._option.value);
				if (this._option.readonly) this.root.attr('readonly', this._option.readonly);
				if (this._option.rows) this.root.attr('rows', this._option.rows);
				if (this._option.cols) this.root.attr('cols', this._option.cols);
			},
			_bindEvents: function() {
				var that = this;
				this.root.on('focus', function(e) {
					if (that._option.onfocus) {
						that._option.onfocus(e);
					}

					var value = that.root.val();
					//when the input is focused and the value is palceholder then clear the value.
					if (value == that._option.placeholder) {
						that.root.val('');
					}
				});

				this.root.on('blur', function(e) {
					if (that._option.onblur) {
						that._option.onblur(e);
					}

					var value = that.root.val();
					if (!value) that.root.val(that._option.placeholder);
				});

				this.root.on('change',function(e) {
					var value = that.root.val();

					var handler = that._option.onchange;
					if (handler) {
						handler(value);
					}
					that.text = value;
				});

				this.root.on('click', function(e) {
					if (that._option.onclick) {
						that._option.onclick(e);
					}
				});
			},
			_unbindEvents: function() {
				this.root.off('focus');
				this.root.off('blur');
				this.root.off('change');
				this.root.off('click');
			},
			root: null,
			init: function(option) {
				this.root = $('<textarea />');
				$.extend(this._option, $.loveyTextArea.Default, option);
				this.root.val(this._option.placeholder);
				this.refresh();
			},
			refresh: function() {
				this._render();
				this._unbindEvents();
				this._bindEvents();
			},
			text: "",
			setOptions: function(option) {
				$.extend(this._option, option);
				this.refresh();
			},
			getOptions: function() {
				//if the value is equal to placeholder then the actual value is empty
				if (this._option.value == this._option.placeholder) {
					this._option.value = '';
				}
				return this._option;
			}
		};

		input.init(option);

		return input;
	}
}(jQuery));