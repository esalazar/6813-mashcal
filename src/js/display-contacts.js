var getContacts = function(id) {
  $("#suggestions li").click(function() {
    var current = this;
    $("#suggestions li[data-contact='"+$(this).attr("data-contact")+"']").each(function() {
    console.log("click")
      if (this === current) {
        $(this).addClass("invite-hidden");
      } else {
        $(this).removeClass("invite-hidden");
      }
    });
    return false;
  });
};

var goToInvite = function() {
  $.mobile.changePage("invite.html");
};
