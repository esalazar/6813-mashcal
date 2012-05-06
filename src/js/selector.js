/**
* This function creates a 7 day by 24 hour grid
* starting from today
*
* @param id an object that can be passed to the dollar
* function to specify the element to selectorize
*
* @param mode true if this is for general input, false if
* this is for responding to preselected times
*/
var selectorize = function(id, mode) {
  var grid = "<table>";
  var polarity = "sel-light";
  var date = new Date();
  date.setDate(date.getDate() - 1);
  for (var i=0; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    span = "";
    date.setDate(date.getDate() + 1);
    grid += "<tr class='selector-day selector-day-" + i + "'>"
    grid += "<td><div>";
    grid += "<div class='selector-day-descriptor'>" + monthToNameMap[date.getMonth()] +
      " " + date.getDate() + "</div>";
    grid += "</td>";
    for (var h=0; h < 24; h++) {
      date.setHours(h,0,0,0);
      var time = h % 12;
      if (time === 0) time = 12;
      if (h < 12) {
        time = "" + time + " AM";
      } else {
        time = "" + time + " PM";
      }
      span += "<div date-ms='"+date.getTime()+"' class='selector-hour selector-hour-" + h + " " + polarity + "'>" + time + "</div>";
    }
    span += "</div></div>";
    grid += "<td class='all-of-the-times'><div class='time-window'>" +
            span + "</div></td></tr>";
  }
  grid += "</table>";
  $(id).append(grid);

  // time for the dynamic css bits
  //$(".time-window").css({ "width" : "80%" });

  if (mode) {
    $(id + " .selector-hour").bind("tap", function(e) {
      if (dragging && prevX !== null) {
        return;
      }
      if ($(this).hasClass("selector-selected")) {
        $(this).removeClass("selector-selected");
      } else {
        $(this).addClass("selector-selected");
      }
    });
  } else {
    $(id + " .selector-hour").bind("tap", function(e) {
      if (dragging && prevX !== null) {
        return;
      }
      if ($(this).hasClass("selector-respond-selected")) {
        if ($(this).hasClass("selector-respond-accept")) {
          $(this).removeClass("selector-respond-accept");
        } else {
          $(this).addClass("selector-respond-accept");
        }
      }
    });
  }

  // swipe events
  //$(id).bind("swipeleft", function(e) { scrollSelector(1); });
  //$(id).bind("swiperight", function(e) { scrollSelector(-1); });
  $(id).bind("vmousedown", function(e) {
    dragging = true;
    if (leftmost === null) {
      leftmost = $(id + " .selector-hour-0").offset().left
    }
  });
  $(id).bind("vmousemove", function(e) {
    if (!dragging) return;
    if (prevX === null) {
      prevX = e.screenX;
    } else {
      var margin = $(id + " .time-window").css("margin-left");
      margin = parseInt(margin.replace("px", ""));
      var newmargin = margin + (e.screenX - prevX);
      if (newmargin > 0) {
        newmargin = 0;
      } else if (newmargin < (-$(id + " .time-window").width() + 0.7 * $(window).width())) {
        newmargin = -$(id + " .time-window").width() + 0.7 * $(window).width();
      }
      $(id + " .time-window").css({ "margin-left" : newmargin + "px" });
      prevX = e.screenX;
    }

    for (var i=0; i < 24; i++) {
      var pos = $(id + " .selector-hour-" + i).offset();
      if (pos.left < leftmost) {
        $(id + " .selector-hour-" + i).css({ "opacity" : 0 });
      } else if (pos.left < leftmost + $(id + " .selector-hour").width() && i != 0) {
         var frac = (pos.left - leftmost) / $(id + " .selector-hour").width();
        $(id + " .selector-hour-" + i).css({ "opacity" : frac });
      } else {
        $(id + " .selector-hour-" + i).css({ "opacity" : 1 });
      }
    }
  });

  $(id).bind("vmouseup", function(e) {
    dragging = false;
    prevX = null;
  });
}

var dragging = false;
var tapfired = false;
var prevX = null;
var leftmost = null;

var SELECTOR_WIDTH = 3;
var currentHour = Math.min(23 + 1 - SELECTOR_WIDTH, (new Date()).getHours());

var clearSelector = function(id) {
  $( id + " .selector-hour").removeClass("selector-selected");
}

var schedule_random_times = function(id) {
  var sel = $(id);
  console.log(sel);
  for (var h=currentHour; h < currentHour + 4; h++) {
    sel.find(".selector-day-0 .selector-hour-" + h).addClass("selector-respond-selected");
  }
  sel.find(".selector-day-1 .selector-hour-" + (currentHour + 1)).addClass("selector-respond-selected");
  sel.find(".selector-day-3 .selector-hour-" + (currentHour + 3)).addClass("selector-respond-selected");
  sel.find(".selector-day-4 .selector-hour-" + (currentHour - 1)).addClass("selector-respond-selected");
  sel.find(".selector-day-4 .selector-hour-" + (currentHour)).addClass("selector-respond-selected");
}

// date stuff
var monthToNameMap = {
  0  : "jan",
  1  : "feb",
  2  : "mar",
  3  : "apr",
  4  : "may",
  5  : "jun",
  6  : "jul",
  7  : "aug",
  8  : "sep",
  9  : "oct",
  10 : "nov",
  11 : "dec"
};

var formize = function(id) {
  var str = "";
  $(id + " .selector-selected").each(function() {
    str += $(this).attr("date-ms");
    str += ",";
  })
  $("#times").val(str);
}

