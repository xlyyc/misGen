/*
 * jQuery Progress Bar plugin
 * Version 2.0 (06/22/2009)
 * @requires jQuery v1.2.1 or later
 *
 * Copyright (c) 2008 Gary Teo
 * http://t.wits.sg

USAGE:
	$(".someclass").progressBar();
	$("#progressbar").progressBar();
	$("#progressbar").progressBar(45);							// percentage
	$("#progressbar").progressBar({showText: false });			// percentage with config
	$("#progressbar").progressBar(45, {showText: false });		// percentage with config
*/
(function($) {
	$.extend({
		progressBar: new function() {

			this.defaults = {
				steps			: 20,											// steps taken to reach target
				stepDuration	: 20,											
				max				: 100,											// Upon 100% i'd assume, but configurable
				showText		: true,											// show text with percentage in next to the progressbar? - default : true
				textFormat		: 'percentage',									// Or otherwise, set to 'fraction'
				width			: 120,											// Width of the progressbar - don't forget to adjust your image too!!!												// Image to use in the progressbar. Can be a single image too: 'images/progressbg_green.gif'
				height			: 12,											// Height of the progressbar - don't forget to adjust your image too!!!
				callback		: null,											// Calls back with the config object that has the current percentage, target percentage, current image, etc
                isPic            : false,                                       //确认是用样式还是背景图片，默认为样式
				
				
				// Internal use
				running_value	: 0,
				value			: 0,
                barClassName:   {
                    40:	'bar_success',
                    55: 'bar_warning',
                    70: 'bar_danger'
                },
                className  : ""
			};
			
			/* public methods */
			this.construct = function(arg1, arg2) {
				var argvalue	= null;
				var argconfig	= null;
				
				if (arg1 != null) {
					if (!isNaN(arg1)) {
						argvalue = arg1;
						if (arg2 != null) {
							argconfig = arg2;
						}
					} else {
						argconfig = arg1; 
					}
				}
				
				return this.each(function(child) {
					var pb		= this;
					var config	= this.config;
					
					if (argvalue != null && this.bar != null && this.config != null) {
						this.config.value 		= parseInt(argvalue)
						if (argconfig != null)
							pb.config			= $.extend(this.config, argconfig);
						config	= pb.config;
					} else {
						var $this				= $(this);
						var config				= $.extend({}, $.progressBar.defaults, argconfig);
						config.id				= $this.attr('id') ? $this.attr('id') : Math.ceil(Math.random() * 100000);	// random id, if none provided
						
						if (argvalue == null)
							argvalue	= $this.html().replace("%","")	// parse percentage
						
						config.value			= parseInt(argvalue);
						config.running_value	= 0;

						var numeric = ['steps', 'stepDuration', 'max', 'width', 'height', 'running_value', 'value'];
						for (var i=0; i<numeric.length; i++) 
							config[numeric[i]] = parseInt(config[numeric[i]]);
						
						$this.html("");
						var bar					= $this.addClass("bar");
						var text				= document.createElement('span');
						var $bar				= $(bar);
                        var $par             = $(bar).wrap('<div class="ui_progress '+config.className +'"></div>').parent();
						var $text				= $(text);
						pb.bar					= $bar;
                        pb.par                 = $par;
						
						$text.html(getText(config));

						$par.css("width", config.width + "px");
						$par.css("height", config.height + "px");
					}

					function getPercentage(config) {
						return config.running_value * 100 / config.max;
					}

                    function getBarClassName(config) {
                        var className = config.barClassName;
                        if (typeof(config.barClassName) == 'object') {
                            for (var i in config.barClassName) {
                                if (config.running_value >= parseInt(i)) {
                                    className = config.barClassName[i];
                                } else { break; }
                            }
                        }
                        return className;
                    }


					function getText(config) {
						if (config.showText) {
							if (config.textFormat == 'percentage') {
								return " " + Math.round(config.running_value) + "%";
							} else if (config.textFormat == 'fraction') {
								return " " + config.running_value + '/' + config.max;
							}
						}
					}
					
					config.increment = Math.round((config.value - config.running_value)/config.steps);
					if (config.increment < 0)
						config.increment *= -1;
					if (config.increment < 1)
						config.increment = 1;
					
					var t = setInterval(function() {
						var pixels	= config.width / 100;			// Define how many pixels go into 1%
						
						if (config.running_value > config.value) {
							if (config.running_value - config.increment  < config.value) {
								config.running_value = config.value;
							} else {
								config.running_value -= config.increment;
							}
						}
						else if (config.running_value < config.value) {
							if (config.running_value + config.increment  > config.value) {
								config.running_value = config.value;
							} else {
								config.running_value += config.increment;
							}
						}
						
						if (config.running_value == config.value)
							clearInterval(t);
                        var className	= getBarClassName(config);
                        //alert(className);
                        //pb.bar.addClass(className);
                        if (className != config.className) {
                            //alert(className +"  "+ config.className);
                            pb.bar.addClass(className)
                            pb.bar.removeClass(config.className);
                            config.className = className;
                        }
                        pb.bar.css("width", config.running_value+'%');

						if (config.callback != null && typeof(config.callback) == 'function')
							config.callback(config);
						
						pb.config = config;
					}, config.stepDuration); 
				});
			};
		}
	});
		
	$.fn.extend({
        progressBar: $.progressBar.construct
	});
	
})(jQuery);