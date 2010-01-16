/*
 *
 * Copyright (c) 2010 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 1.0
 *
 */
;(function($) {

/*
 * Shows a web page (using iframe) in a jQuery UI Dialog box.
 *
 */
$.fn.dialogIframe = function(options)
{
	options = $.extend({}, $.fn.dialogIframe.defaults, options);
	$(this).click(
		function(e) {
			var el = this;
			e.preventDefault();
			var title = el.title;
			if (!title.length) title = $(el).text();
			// create a dialog box and set the iframe to the linked page
			var dialog = $("<div id='iframedialog'><iframe /></div>")
				.find("iframe").attr({ "frameBorder": 0, "width": "100%", "height": "100%", "scrolling": "auto", "src": el.href }).end()
				.dialog(
				{
					title: title,
					height: options.height,
					width: options.width
				}
			).find(".ui-dialog-content").css("padding", 0).end();
		});
}

$.fn.dialogIframe.defaults = {
	width: 500, height: 400
};

})(jQuery);