function fixQTags()
{
	if($.browser.msie)
	{
		$("q").prepend("&#8220;").append("&#8221;");
	}
}
// execute fixQTags when page is ready
$(fixQTags);