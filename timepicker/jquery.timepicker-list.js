/*
 *
 * Copyright (c) 2006/2007 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-09-04 11:06:57 +0100 (Tue, 04 Sep 2007) $
 * $Rev: 3101 $
 *
 * Demo: http://www.texotela.co.uk/code/jquery/timepicker/?version=list
 *
 */

(function($) {
/*
 * A time picker for jQuery (list version)
 *
 *
 * @name     timePicker
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $("#mytime").timePicker(); // start time 8am, finish 6pm, step 30 minutes
 *
 * Add the following CSS to your stylesheet:
 *
 *  div.time-holder {
 *     position: relative;
 *     display: none;
 *     z-index: 99;
 *     width: 100px;
 * }
 * div.time-holder div.times {
 *     position: absolute;
 *     top: 0;
 *     height: 120px;
 *     overflow: auto;
 *     background: #fff;
 *     border: 1px solid #000;
 * }
 * div.time-holder div.times ul {
 *     list-style-type: none;
 *     margin: 0;
 *     padding: 0;
 *     width: 80px;
 * }
 * div.time-holder div.times li {
 *     padding: 1px;
 * }
 * div.time-holder div.times li.selected {
 *     background: #316AC5;
 *     color: #fff;
 * }
 *
 */
$.fn.timePicker = function(options)
{
	var settings = { step : 30, startTime : "08:00", endTime : "18:00"};
	$.extend(settings, options);
	var active = false;
	this.each(
		function()
		{
			var el = this;
			var timeHolder = $("<div class='time-holder'></div>");
			var times = [];
			var time = $.timePicker._timeStringToDate(settings.startTime);
			var endTime = $.timePicker._timeStringToDate(settings.endTime);
			while(time <= endTime)
			{
				times[times.length] = $.timePicker._formatTime(time);
				time = new Date(time.setMinutes(time.getMinutes() + settings.step));
			}
			var timesDiv = $("<div class='times'></div>");
			var timesList = $("<ul></ul>");
			for(var i = 0; i < times.length; i++)
			{
				timesList.append("<li>" + times[i] + "</li>");
			}
			timesDiv.append(timesList);
			timeHolder.append(timesDiv);
			$(el).after(timeHolder);
			if($.fn.below) timeHolder.below(el).hide();
			$("li", timesList).hover(
				function()
				{
					$(this).siblings().removeClass("selected").end()
					.addClass("selected");
				}
				,function()
				{
					$(this).removeClass("selected");
				}
			).click(
				function()
				{
					el.value = $(this).text();
					$(this).parents("div.time-holder").hide();
				}
			).removeClass("selected");
		}
	).click(
		function(e)
		{
			var timeHolder = $(this).next("div.time-holder");
			// hide other time pickers
			$("div.time-holder").not(timeHolder).hide();
			// toggle this one
			timeHolder.toggle();
			// set selected value
			if(this.value)
			{
				var selected = timeHolder.find("li").removeClass("selected").contains(this.value).addClass("selected");
				if(selected[0])
				{
					timeHolder.find("div.times")[0].scrollTop = selected[0].offsetTop;
				}
			}
			e.stopPropagation();
		}
	);
	// hide timepickers when body clicked
	$("body").click(
		function()
		{
			$("div.time-holder").hide();
		}
	);
	return this;
}
$.timePicker =
{
	_formatTime : function(input)
	{
		if(input && input.constructor == Date)
		{
			return input.toUTCString().match(/\d{2}:\d{2}/);
		}
		throw "not a valid date";
	},
	_timeStringToDate : function(input)
	{
		var error;
		if(typeof input != "string")
		{
			error = "a string must be supplied";
		}
		else if(input.match(/^\d{2}:\d{2}$/))
		{
			var s = input.split(":");
			var hours = parseFloat(s[0]);
			var minutes = parseFloat(s[1]);
			minutes += hours * 60;
			var output = new Date();
			output.setTime(minutes * 60 * 1000);
			return output;
		}
		else
		{
			error = "not a valid time string - should be in 24 hour format, i.e. 15:00";
		}
		if(error) throw error;
	}
}

})(jQuery);