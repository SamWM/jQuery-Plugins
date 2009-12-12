/*
 *
 * Copyright (c) 2006/2007 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * $LastChangedDate: 2007-09-04 11:06:57 +0100 (Tue, 04 Sep 2007) $
 * $Rev: 3101 $
 * 
 * Demo: http://www.texotela.co.uk/code/jquery/timepicker/?version=table
 *
 */

(function($) {
/*
 * A time picker for jQuery (table version)
 *
 *
 * @name     timePicker
 * @author   Sam Collett (http://www.texotela.co.uk)
 * @example  $("#mytime").timePicker(); // start time 8am, finish 6pm, step 30 minutes
 *
 * Add the following CSS to your stylesheet:
 *
 * div.time-holder {
 *     position: absolute;
 *     display: none;
 *     width: 1px;
 *     z-index: 99;
 * }
 * div.time-holder table.times {
 *     position: relative;
 *     background: #fff;
 *     border-collapse: collapse;
 *     border: 1px solid #000;
 * }
 * div.time-holder table.times td.time {
 *     padding: 4px;
 *     width: 45px;
 *     cursor: hand;
 *     border: 1px solid #000;
 *     background: #fff;
 *     font-size: 0.9em;
 * }
 * div.time-holder table.times td.empty {
 *     padding: 2px;
 *     width: 45px;
 *     border: 1px solid #000;
 *     }
 * div.time-holder table.times td.selected {
 *     background: #ff0;
 *     color: #000;
 * }
 *
 */
$.fn.timePicker = function(options)
{
	var settings = { step : 30, startTime : "08:00", endTime : "18:00", columns : 4};
	$.extend(settings, options);
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
				times[times.length] = jQuery.timePicker._formatTime(time);
				time = new Date(time.setMinutes(time.getMinutes() + settings.step));
			}
			var timesTable = $(document.createElement("table")).attr("class", "times");
			var timesRow = $(document.createElement("tr"));
			var appended = false;
			for(var i = 0; i < times.length; i++)
			{
				appended = false;
				timesRow.append("<td class='time'>" + times[i] + "</td>");
				if(i % settings.columns == settings.columns - 1)
				{
					timesTable.append(timesRow);
					appended = true;
					timesRow = $(document.createElement("tr"));
				};
			}
			var tdcount = timesRow.find("td").size();
			if(tdcount != settings.columns)
			{
				var i = tdcount;
				do
				{
					timesRow.append("<td class='empty'></td>");
					i++;
				} while (i != settings.columns)
			}
			if(!appended) timesTable.append(timesRow);
			timeHolder.append(timesTable);
			$(el).after(timeHolder);
			if(jQuery.fn.below) timeHolder.below(el).hide();
			$("td.time", timeHolder).hover(
				function()
				{
					$(this).parents("table:eq(0)").find("td").removeClass("selected").end().end()
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
				timeHolder.find("td.time").removeClass("selected").contains(this.value).addClass("selected");
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