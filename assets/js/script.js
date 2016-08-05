$(document).ready(function(){
	console.log('working');

	// expanding/collapsing section on click
	var bioOpen = false;
	var playOpen = false;
	var contOpen = false
	// close all sections
	// function closeSections(){
	// 	$('.section-head').animate({height: '30vh'}, 1);
	// 	bioOpen = false;
	// 	playOpen = false;
	// 	contOpen = false;
	// };
	$('#bio').click(function(){
		if(!bioOpen){
			$(this).animate({height: '50vh'}, 800);
			bioOpen = true;
		}else{
			$(this).animate({height: '30vh'}, 500);
			bioOpen = false;
		};
	});
	$('#play').click(function(){
		if(!playOpen){
			$(this).animate({height: '50vh'}, 800);
			playOpen = true;
		}else{
			$(this).animate({height: '30vh'}, 500);
			playOpen = false;
		};
	});
	$('#cont').click(function(){
		if(!contOpen){
			$(this).animate({height: '50vh'}, 800);
			contOpen = true;
		}else{
			$(this).animate({height: '30vh'}, 500);
			contOpen = false;
		};
	});

});