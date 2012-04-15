/**
 * This function creates a 7 day by 24 hour grid
 * starting from today
 *
 * @param id an object that can be passed to the dollar
 * function to specify the element to selectorize
 */
var selectorize = function(id) {
  var grid = "";
  var polarity = "sel-dark";
  var date = new Date();
  date.setDate(date.getDate() - 1);
  for (var i=0; i < 7; i++) {
    date.setDate(date.getDate() + 1);
    grid += "<div class='selector-day' id='selector-day-" + i + "'>";
    grid += "<div class='selector-day-descriptor'>" + monthToNameMap[date.getMonth()] +
            " " + date.getDate() + "</div>";
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
    grid += "</div>";
    polarity = (polarity === "sel-dark" ? "sel-light" : "sel-dark");
  }
  $(id).append(grid);

  // hide everything
  for (var h=0; h < 24; h++) {
    $(".selector-hour-" + h).css({ display : "none", opacity : 0 });
  }
  var selWidth = (100 / (SELECTOR_WIDTH + 1) - 5);
  $(".selector-hour").css({ display : "none", float : "left",
                            width : selWidth + "%", height : "100%" });
  $(".selector-day").css({ clear : "both", width : "100%", height : "10%", "padding-bottom" : "3%" });
  $(".selector-day-descriptor").css({ width : selWidth + "%", float : "left" });
  $(id).css({ height : "70%" });

  // init the display
  for (var h=currentHour; h < currentHour + SELECTOR_WIDTH; h++) {
    $(".selector-hour-" + h).css({ display : "block", opacity : 1 });
  }

  $(".selector-hour").bind("taphold", function(e) {
    if ($(this).hasClass("selector-selected")) {
      $(this).removeClass("selector-selected");
    } else {
      $(this).addClass("selector-selected");
    }
  });

  // swipe events
  $(id).bind("swipeleft", function(e) { scrollSelector(1); });
  $(id).bind("swiperight", function(e) { scrollSelector(-1); });
}

var SELECTOR_WIDTH = 3;
var currentHour = (new Date()).getHours();

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
    currentHour = Math.min(23, currentHour + 1);
  }
  // short circuit if nothing has changed
  if (oldCurrentHour === currentHour) return;

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

