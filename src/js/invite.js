
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