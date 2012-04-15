
$(document).ready(function (){	
		
	var availableTags = ["Bob", "Kate", "Tito", "Josh"];
	
	$("#searchField").autocomplete({
		target: $('#suggestions'),
		source: availableTags,
		link: 'friend=',
		minLength: 1,
		//select: function(event, ui) { alert("");}
	});
	
});
