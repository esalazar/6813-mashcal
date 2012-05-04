var getContacts = function(id) {
  console.log("here");
  $("#listClone").remove();
  $.get("/ajax/contacts/" + id, null, function(data, textStatus, jqXHR) {
    var contacts = JSON.parse(data);
    contacts = contacts.contacts;
    contacts.sort();
    var lastLetter = null;
    var list = $("#suggestions");
    var listClone = list.clone();
    listClone.attr("id", "listClone");
    listClone.html("");
    for (var i=0; i < contacts.length; i++) {
      var curr = contacts[i];
      var firstLetter = curr.charAt(0).toUpperCase();
      var last = false;
      if (firstLetter !== lastLetter) {
        lastLetter = firstLetter;
        var divider = list.find(".suggestionsDivider");
        divider = divider.clone();
        divider.html(lastLetter);
        listClone.append(divider);
      }
      if (i == contacts.length - 1) { last = true; }
      else {
        var next = contacts[i+1];
        if (next.charAt(0).toUpperCase() !== lastLetter) {
          last = true;
        }
      }
      var neutral, sel;
      if (last) {
        neutral = $("#suggestions2").find(".suggestionsNeutral-last");
        sel = list.find(".suggestionsSel-last");
      } else {
        neutral = list.find(".suggestionsNeutral");
        sel = list.find(".suggestionsSel");
      }

      neutral = neutral.clone();
      sel = sel.clone();
      neutral.attr("data-contact", curr);
      neutral.find("a").html(curr);
      neutral.find("span").remove();
      sel.attr("data-contact", curr);
      sel.find("a").html(curr);
      sel.find("span").remove();
      sel.css({ "display" : "none" })
      listClone.append(neutral);
      listClone.append(sel);
    }
    list.css({ "display" : "none" });
    $("#suggestions2").css({ "display" : "none" });
    $(list).after(listClone);
    $("#listClone li").click(function() {
      var current = this;
      $("#listClone li[data-contact='"+$(this).attr("data-contact")+"']").each(function() {
      console.log("click")
        if (this === current) {
          $(this).css({ "display" : "none" });
        } else {
          $(this).css({ "display" : "block" });
        }
      });
      return false;
    });
  });
};
