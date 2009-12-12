/**
 *
 * Copyright (c) 2007 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Version 1.0
 * Demo: http://www.texotela.co.uk/code/jquery/focusfields/
 *
 * $LastChangedDate: 2007-06-19 10:29:30 +0100 (Tue, 19 Jun 2007) $
 * $Rev: 2108 $
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
			this.oldbgcolour = $this.css("background-color") || "#fff";
			this.oldtextcolour = $this.css("color") || "#000";
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
				$this.focus(
					function()
					{
						$(this.parentNode).css(this.parentNode.borderCss.on);
						$(this).css({backgroundColor: bgColour, color: textColour});
					}
				)
				.blur(
					function()
					{
						$(this.parentNode).css(this.parentNode.borderCss.off);
						$(this).css({backgroundColor: this.oldbgcolour, color: this.oldtextcolour});
					}
				);
				outlineElement.borderCss = {
					off:
					{
						backgroundColor: $this.parent().css("background-color") || "#fff",
						padding: oWidth + "px"
					}
					, on:
					{
						backgroundColor: oColour
					}
				};
				$(outlineElement).css(outlineElement.borderCss.off);
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
				$this.css({margin: oWidth + "px"});
				this.outlineCss = {
					off:
					{
						outlineStyle: "solid",
						outlineWidth: oWidth + "px"
					}
					, on:
					{
						outlineColor: oColour
					}
				};
				var $parent = $this.parent(), parentBG;
				do
				{
					parentBG = $parent.css("background-color") || "#fff";
					$parent = $parent.parent();
					if($parent[0] == document) break;
				}
				while (parentBG == "transparent")
				if(parentBG == "transparent") parentBG = "#fff";
				this.outlineCss.off.outlineColor = parentBG;
				$this.css(this.outlineCss.off)
				.focus(
					function()
					{
						$(this).css(this.outlineCss.on).css({backgroundColor: bgColour, color: textColour});
					}
				)
				.blur(
					function()
					{
						$(this).css(this.outlineCss.off).css({backgroundColor: this.oldbgcolour, color: this.oldtextcolour});
					}
				);
			}	
		}
	);
	return this;
}

})(jQuery);