/**
 *
 * Copyright (c) 2007 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * $LastChangedDate: 2007-07-27 14:44:11 +0100 (Fri, 27 Jul 2007) $
 * $Rev: 2499 $
 *
 */

 
/**
 * Places selected element above another one
 *
 * @name     above
 * @name     element Which element to place the current one above
 * @param    options Hash with the following options:
 *                   adjustRight   How many pixels to adjust right by
 *                   adjustDown    How many pixels to adjust down by
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $("#mytip").above("#myinput");
 * @example  $("#mytip").above("#myinput", {adjustRight: 10});
 */
jQuery.fn.above = function(element, options)
{
	element = element || null;
	options = jQuery.extend({adjustRight: 0, adjustDown: 0}, options);
	getCSS = function(el, prop)
	{
		return (parseInt(jQuery.css(el, prop))  || 0);
	}
	return this.each(
		function()
		{
			if(element == null) return false;
			var what = jQuery(element);
			var left = what[0].offsetWidth - options.adjustRight, top = options.adjustDown +
				getCSS(this, 'borderBottomWidth') +
				getCSS(this, 'borderTopWidth') +
				getCSS(this, 'paddingBottom') +
				getCSS(this, 'paddingTop') +
				getCSS(this, 'height');
			if(jQuery.browser.opera)
			{
				var version = navigator.userAgent.match(/\d+\.\d+/);
				if(version < 9)
				{
					left += getCSS(what[0], 'borderLeftWidth') +
						getCSS(what.parent()[0], 'paddingLeft');
				}
			}
			what.after(this);
			jQuery(this).css(
				{
					position: "absolute",
					display: "inline",
					marginLeft: "-" + left  + "px",
					marginTop: "-" + top + "px"
				}
			);
		}
	);
}