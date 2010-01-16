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
 * Shows an image in a jQuery UI Dialog box.
 *
 */
$.fn.dialogImage = function()
{
	$(this).click(
		function(e) {
			e.preventDefault();
			var link = this;
			var $loading = $("<div></div>").dialog({ title: "Loading..." });
			$("<img>").attr({ "src": this.href }).css({ "padding": 0 }).load(
				function() {
					$loading.dialog("destroy").remove();
					// don't make wider than the window width
					var maxWidth = $(window).width() - 20;
					// don't make taller than the window height
					var maxHeight = $(window).height() - 20;
					var width = this.width;
					var height = this.height;
					if (width > maxWidth) {
						height = height * (maxWidth / width);
						width = maxWidth;
						if (height > maxHeight) {
							width = width * (maxHeight / height);
							height = maxHeight;
						}
					}
					else if (height > maxHeight) {
						width = width * (maxHeight / height);
						height = maxHeight;
						if (width > maxWidth) {
							height = height * (maxWidth / width);
							width = maxWidth;
						}
					}
					this.width = width;
					this.height = height;
					$(this).dialog({ width: width, title: $(link).text() }).css({ "height": "", "width": "" });
				}
			)
		}
	);
}

})(jQuery);