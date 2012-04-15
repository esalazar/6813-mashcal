$(function() {
	var availableTags = ["Brat","Bob", "Kate", "Tito"];
    $('#search_box').autocomplete({
      source: availableTags,
		  target: $('#suggestions'),
      link: 'testing.cfm?term=',
		  minLength: 1
    });
});

