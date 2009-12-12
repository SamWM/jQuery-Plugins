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
 * Places selected element under another one
 *
 * @name     below
 * @name     element Which element to place the current one under
 * @param    options Hash with the following options:
 *                   adjustRight   How many pixels to adjust right by
 *                   adjustDown    How many pixels to adjust down by
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $("#mytip").below("#myinput");
 * @example  $("#mytip").below("#myinput", {adjustRight: 10});
 */
jQuery.fn.below = function(element, options)
{
	element = element || null;
	options = jQuery.extend({adjustRight: 0, adjustDown: 0}, options);
	return this.each(
		function()
		{
			if(element == null) return false;
			var what = jQuery(element);
			var left = what[0].offsetWidth - options.adjustRight, top = what[0].offsetHeight + options.adjustDown;
			if(jQuery.browser.opera)
			{
				var version = navigator.userAgent.match(/\d+\.\d+/);
				if(version < 9)
				{
					left += (parseInt(jQuery.css(what[0], 'borderLeftWidth'))  || 0) +
						(parseInt(jQuery.css(what.parent()[0], 'paddingLeft'))  || 0);
				}
			}
			what.after(this);
			jQuery(this).css(
				{
					position: "absolute",
					display: "inline",
					marginLeft: "-" + left  + "px",
					marginTop: top + "px"
				}
			);
		}
	);
}