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
    span = "";
    date.setDate(date.getDate() + 1);
    grid += "<tr>"
    grid += "<td><div class='selector-day selector-day-" + i + "'>";
    grid += "<div class='selector-day-descriptor'>" + monthToNameMap[date.getMonth()] +
      " " + date.getDate() + "</div>";
    grid += "</td>";
    for (var h=0; h < 24; h++) {
      var time = h % 12;
      if (time === 0) time = 12;
      if (h < 12) {
        time = "" + time + " AM";
      } else {
        time = "" + time + " PM";
      }
      span += "<div class='selector-hour selector-hour-" + h + " " + polarity + "'>" + time + "</div>";
    }
    span += "<div style='clear:both'></div></div>";
    grid += "<td class='all-of-the-times'><div class='time-window'>" +
            span + "</div></td></tr>";
  }
  span += "</td>"
  grid = grid.replace("SUBSTITUTE", span)
  grid += "</table>";
  $(id).append(grid);

  // time for the dynamic css bits
  //$(".time-window").css({ "width" : "80%" });

  if (mode) {
    $(".selector-hour").bind("tap", function(e) {
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
    $(".selector-hour").bind("tap", function(e) {
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
      leftmost = $(".selector-hour-0").offset().left
    }
  });
  $(id).bind("vmousemove", function(e) {
    if (!dragging) return;
    if (prevX === null) {
      prevX = e.screenX;
    } else {
      var margin = $(".time-window").css("margin-left");
      margin = parseInt(margin.replace("px", ""));
      var newmargin = margin + (e.screenX - prevX);
      if (newmargin > 0) {
        newmargin = 0;
      } else if (newmargin < (-$(".time-window").width() + 0.7 * $(window).width())) {
        newmargin = -$(".time-window").width() + 0.7 * $(window).width();
      }
      $(".time-window").css({ "margin-left" : newmargin + "px" });
      prevX = e.screenX;
    }

    for (var i=0; i < 24; i++) {
      var pos = $(".selector-hour-" + i).offset();
      if (pos.left < leftmost) {
        $(".selector-hour-" + i).css({ "opacity" : 0 });
      } else if (pos.left < leftmost + $(".selector-hour").width() && i != 0) {
         var frac = (pos.left - leftmost) / $(".selector-hour").width();
        $(".selector-hour-" + i).css({ "opacity" : frac });
      } else {
        $(".selector-hour-" + i).css({ "opacity" : 1 });
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

/**
* scrolls the selector to the left or right by one hour
*
* @param direction negative values for left scrolling; positive
* values for right scrolling
*/
var scrollSelector = function(direction) {
  var oldCurrentHour = currentHour;
  if (direction < 0) {
    currentHour = Math.max(0, currentHour - 1);
  } else {
    currentHour = Math.min(23 + 1 - SELECTOR_WIDTH, currentHour + 1);
  }
  // short circuit if nothing has changed
  if (oldCurrentHour === currentHour) return;

  // more indicators
  if (currentHour === 23 + 1 - SELECTOR_WIDTH) {
    $(".sel-more-right").css({ display : "none" });
  } else {
    $(".sel-more-right").css({ display : "block" });
  }

  if (currentHour === 0) {
    $(".sel-more-left").css({ display : "none" });
  } else {
    $(".sel-more-left").css({ display : "block" });
  }

  if (direction < 0) {
    $(".selector-hour-" + (currentHour + SELECTOR_WIDTH)).animate({ opacity : 0 }, "fast",
      function() {
        $(this).css({ display : "none" });
        $(".selector-hour-" + currentHour).css({ display : "block" }).animate({ opacity : 1 }, "fast");
      });

  } else {
    $(".selector-hour-" + oldCurrentHour).animate({ opacity : 0 }, "fast",
      function() {
        $(this).css({ display : "none" });
        $(".selector-hour-" + (oldCurrentHour + SELECTOR_WIDTH)).css(
        { display : "block" }).animate({ opacity : 1 }, "fast");
      });
  }
}

var schedule_random_times = function(id) {
  var sel = $(id);
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

