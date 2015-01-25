/*
The MIT License (MIT)

Copyright (c) 2015 avcs06

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function($) {
	var avcs = function() {
		var avcs = new Object();
		avcs.nonAuto = '';
		avcs.getSettings = function(element,settings) {
			var $element = $(element);
			
			settings.fontSize = parseFloat($element.css('font-size'));
			
			var width = $element.width();
			if($element.is('.fa,.glyphicon')) width=width||settings.fontSize;
			settings.absoluteWidth = width;

			this.nonAuto='';
			if($element.is('td,th')) this.nonAuto = $element.closest('table');
			else this.getClosestNonAuto($element,settings.container,true);

			if(this.nonAuto && !this.nonAuto.is($element)) {
				settings.parent = this.nonAuto;
				settings.fractionalWidth = width/this.nonAuto.width();
			}
			settings.fontRatio = settings.fontSize/width;
			return settings;
		};
		
		avcs.getClosestNonAuto = function($element,container,first) {
			if($element.is(container)) {
				this.nonAuto = $element
				return;
			}
			if($element.is('.fa,.glyphicon')&&$element.width()==0) {
				$element.addClass('avcsauto');
				this.getClosestNonAuto($element.parent(),container,false);
				return;
			}
			var thisFontSize = $element.get(0).style.fontSize;
			var thisWidth = $element.width();
			$element.css('font-size','1px');
			var isAuto = (thisWidth != $element.width());
			$element.css('font-size',thisFontSize);
			if(isAuto) {
				if(first) $element.addClass('avcsauto');
				this.getClosestNonAuto($element.parent(),container,false);
			}
			else {
				var paddingLeft = $element.get(0).style.paddingLeft;
				$element.css('padding-left',((parseFloat($element.css('padding-left'))||2) - 1)+'px');
				var difference = Math.abs(thisWidth-$element.width());
				isAuto = (difference!=1&&difference!=0);
				$element.css('padding-left',paddingLeft);
				if(isAuto) {
					if(first) $element.addClass('avcsauto');
					this.getClosestNonAuto($element.parent(),container,false);
				}
				else {
					this.nonAuto = $element
					return;
				}
			}
		};
		
		avcs.setFontsize = function(element) {
			var $element = $(element);
			var settings = $element.data('avcsscale');
			if(!settings.isFixedWidth) {
				var width = settings.fractionalWidth ? settings.parent.width()*settings.fractionalWidth : $element.width();
				var fontSize = width*settings.fontRatio;
				fontSize = fontSize > settings.maxFont ? settings.maxFont : fontSize < settings.minFont ? settings.minFont : fontSize;
				$element.css('font-size', fontSize + 'px');
				if(!$element.hasClass('avcsauto') && $(settings.container).width() != settings.initialWidth && settings.absoluteWidth == $element.width()) $element.css('font-size', settings.fontSize + 'px');
			}
		};
		return avcs;
	}();
	
	$.fn.scaleText = function(options) {
		options = $.extend({container : 'body',initialWidth : 1366}, options);
		var container = $(options.container);
		var containerWidth = container.get(0).style.width;
		if( container.width() != options.initialWidth ) {
			container.width(options.initialWidth);
			for(i=1;i<=12;i++){
				$('.bootscale3-'+i+',.bootscale2-'+i).addClass('bootscale');
			}
		}
		this.each(function() {
			var that = this;
			var settings = $.extend({maxFont:999 , minFont: 10}, options);
			settings = avcs.getSettings(this,settings);
			$(this).addClass('avcsscale').data('avcsscale',settings);
			$(window).resize(function() {
				avcs.setFontsize(that);
			});
		});
		container.css('width',containerWidth);
		$('.bootscale').removeClass('bootscale');
		$(window).trigger('resize');
		return this;
	};
	
	$.scaleText = function(container) {
		var scalers = container ? $(container).find('.avcsscale') : $('.avcsscale');
		scalers.each(function(){
			avcs.setFontsize(this);
		});
	}
}(jQuery));