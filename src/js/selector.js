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
  var grid = "";
  var polarity = "sel-dark";
  var date = new Date();
  date.setDate(date.getDate() - 1);
  for (var i=0; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    grid += "<div class='selector-day selector-day-" + i + "'>";
    grid += "<div class='selector-day-descriptor'>" + monthToNameMap[date.getMonth()] +
            " " + date.getDate() + "</div>";
    grid += "<div class='sel-more-left'>...</div>";
    for (var h=0; h < 24; h++) {
      var time = h % 12;
      if (time === 0) time = 12;
      if (h < 12) {
        time = "" + time + " AM";
      } else {
        time = "" + time + " PM";
      }
      grid += "<div class='selector-hour selector-hour-" + h + " " + polarity + "'>" + time + "</div>";
      polarity = (polarity === "sel-dark" ? "sel-light" : "sel-dark");
    }
    grid += "<div class='sel-more-right'>...</div><div style='clear:both'></div>";
    grid += "</div>";
    polarity = (polarity === "sel-dark" ? "sel-light" : "sel-dark");
  }
  $(id).append(grid);

  // time for the dynamic css bits
  // hide everything
  for (var h=0; h < 24; h++) {
    $(".selector-hour-" + h).css({ display : "none", opacity : 0 });
  }
  var selWidth = (100 / (1.5 * SELECTOR_WIDTH));
  $(".selector-hour").css({ width : selWidth + "%" });
  $(id).css({ height : "100%" });
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

  // init the display
  for (var h=currentHour; h < currentHour + SELECTOR_WIDTH; h++) {
    $(".selector-hour-" + h).css({ display : "block", opacity : 1 });
  }

  if (mode) {
    $(".selector-hour").bind("tap", function(e) {
      if ($(this).hasClass("selector-selected")) {
        $(this).removeClass("selector-selected");
      } else {
        $(this).addClass("selector-selected");
      }
    });
  } else {
    $(".selector-hour").bind("tap", function(e) {
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
  $(id).bind("swipeleft", function(e) { scrollSelector(1); });
  $(id).bind("swiperight", function(e) { scrollSelector(-1); });
}

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

