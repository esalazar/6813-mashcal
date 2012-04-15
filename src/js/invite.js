$(function() {
	/*
	var button = document.getElementById('button');
	
	if (button.addEventListener){
		button.addEventListener('click', function () {clickevent()}, false );	
	}
	else {
    	if (button.attachEvent) {  
        	button.attachEvent ("onclick", function () {clickevent()});
        }
    }
    $("#form_input").bind('keypress', function(e) {

    	var code = (e.keyCode ? e.keyCode : e.which);
    	//alert(code);
  			if(code == 13) { 
				clickevent();
			       
  			}

	});
   
	last_s = generaterRandomWord()	;
	document.getElementById("spanish_word").innerHTML = last_s;
	document.getElementById("spanish_word").setAttribute("class","bold") ;
	
	*/
	alert("");
	var availableTags = ["Brat","Bob", "Kate", "Tito"];
    $('#search_box').autocomplete({
        source: availableTags,
		target: $('#suggestions'),
        link: 'testing.cfm?term=',
		minLength: 1
		
        //select: function (event, ui) { }
    });
});