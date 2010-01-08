/**
 *
 * Copyright (c) 2007, 2009 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Version 2.0
 * Demo: http://www.texotela.co.uk/code/jquery/focusfields/
 */

(function($) {
/**
 * Outlines input elements (of type text) and/or textarea's when they gain focus
 *
 * @name     focusFields
 * @param    oColour Outline colour
 * @param    oWidth Outline width
 * @param    bgColour Background colour
 * @param    textColour Text Colour
 */
$.fn.focusFields = $.fn.focusfields = function(oColour, oWidth, bgColour, textColour)
{
	this.each(
		function()
		{
			// if node is not an input or textarea, skip
			if((this.nodeName.toLowerCase() != "input"
				&& this.nodeName.toLowerCase() != "textarea")
				// also skip the following types of inputs:
				|| this.type == "checkbox"
				|| this.type == "radio"
				|| this.type == "image"
				|| this.type == "reset"
				|| this.type == "submit")
			{
				return;
			}
			oColour = oColour || "#9cc";
			oWidth = oWidth || 2;
			var $this = $(this);
			$this.data("oldbgcolor", $this.css("background-color") || "#fff")
				.data("oldtextcolour", $this.css("color") || "#000");
			bgColour = bgColour || this.oldbgcolour;
			textColour = textColour || this.oldtextcolour;
			var isIE = false;
			/*@cc_on
				isIE = true;
			@*/
			if(isIE)
			{
				var outlineElement = document.createElement("span");
				outlineElement.className = "outline";
				$this.data("borderCssOff", {
					"background-color": $this.parent().css("background-color") || "#fff",
					"padding": oWidth + "px"
				})
				.data("borderCssOn", { "background-color": oColour })
				.focus(
					function()
					{
						$(this.parentNode).css($this.data("borderCssOn"));
						$(this).css({backgroundColor: bgColour, color: textColour});
					}
				)
				.blur(
					function()
					{
						$(this.parentNode).css($this.data("borderCssOff"));
						$(this).css({backgroundColor: $this.data("oldbgcolor"), color: $this.data("oldtextcolour")});
					}
				);
				
				$(outlineElement).css($this.data("borderCssOff"));
				// remove existing wrapper if reapplied
				if($this.parent()[0].className == "outline")
				{
					var $parent = $this.parent();
					$parent.after($this);
					$parent.parent()[0].removeChild($parent[0]);
				}
				$this.wrap(outlineElement);
			}
			else
			{
				// apply a margin equal to the width of the outline (to prevent overlap)
				$this.css({margin: oWidth + "px"})
				.data("outlineCssOff", {
					"outline-style": "solid",
					"outline-width": oWidth + "px"
				})
				.data("outlineCssOn", {
					"outline-color": oColour
				});
				var $parent = $this.parent(), parentBG;
				do
				{
					parentBG = $parent.css("background-color") || "#fff";
					$parent = $parent.parent();
					if($parent[0] == document) break;
				}
				while (parentBG == "transparent")
				if(parentBG == "transparent") parentBG = "#fff";
				$this.data("outlineCssOff", {
					"outline-color": parentBG
				})
				.css($this.data("outlineCssOff"))
				.focus(
					function()
					{
						$(this).css($this.data("outlineCssOn")).css({backgroundColor: bgColour, color: textColour});
					}
				)
				.blur(
					function()
					{
						$(this).css($this.data("outlineCssOff")).css({backgroundColor: $this.data("oldbgcolour"), color: $this.data("oldtextcolour")});
					}
				);
			}	
		}
	);
	return this;
}

})(jQuery);