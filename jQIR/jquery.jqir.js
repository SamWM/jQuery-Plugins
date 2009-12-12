/*
 *
 * Copyright (c) 2006/2007 Sam Collett (http://www.texotela.co.uk)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 */

 
/*
 * jQuery Image Replacement. An alternative to using CSS hacks
 * The id attribute (or class) is used for the filename
 *
 * @name     jQIR
 * @param    String format    Image format/file extension (e.g. png, gif, jpg) - ignored if specifying the filename in the class
 * @param    String path      (optional) Path to images folder 
 * @param    Function onload  (optional) Function to run when image has loaded 
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $(".jqir").jQIR("png", "images/");
 * @before   <h1 id="heading1" class="jqir">Heading 1</h1>
 *           <h2 class="jqir {src:heading2.png}">Heading 2</h2>
 * @result   <h1 id="heading1" class="jqir"><img alt="Heading 1" src="images/heading1.png"></h1>   
 *           <h2 class="jqir {src:heading2.png}"><img alt="Heading 2" src="images/heading2.png"></h2>   
 * @example  $(".jqir").jQIR("gif"); // use same folder as page
 * @before   <h1 id="heading1" class="jqir">Heading 1</h1>
 * @result   <h1 id="heading1" class="jqir"><img alt="Heading 1" src="heading1.gif"></h1>   
 *
 */
jQuery.fn.jQIR = function(format, path, onload)
{
	if(!document.images) return this;
	path = path || "";
	this.each(
		function()
		{
			var img = $("<img>"), el = jQuery(this);
			var file;
			var re = /(?:{src\:)(\S+)(?:})/i;
			var m = this.className.match(re);
			if(m)
			{
				file = path + m[1];
			}
			else
			{
				file = path + this.id + "." + format;
			}
			
			jQuery(img).attr(
			{
				src: file,
				alt: el.text()
			}).load(typeof onload == "function" ? onload : function(){} );
			var a = el.find("a");
			var toAppend = a.length ? a.empty().append(img) : img;
			el.empty().append(toAppend);
		}
	)
	return this;
}