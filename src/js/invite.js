<<<<<<< HEAD

$(function(){
	alert(document.getElementById("searchField"));
	var availableTags = ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby"];
	var suggestions = document.getElementById("suggestions");
	document.getElementById("invite").bind("pageshow", function(e) {
		document.getElementById("searchField").autocomplete({
			target: suggestions,
			source: availableTags,
			link: 'testing.cfm?term=',
			minLength: 1
		});
	});	
 });
=======
$(function() {
	var availableTags = ["Brat","Bob", "Kate", "Tito"];
    $('#search_box').autocomplete({
      source: availableTags,
		  target: $('#suggestions'),
      link: 'testing.cfm?term=',
		  minLength: 1
    });
});

>>>>>>> 6e5dd50d7e207090b666082be52ddbd959bf1d01
