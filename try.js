Init();

//Mouse Wheel event : jQuery Mouse Wheel Plugin
$('.pane,.scrzone').on('wheel', function (event) {
	event.preventDefault();
	if ($ScrollState == false) { $ScrollState = true; if (event.originalEvent.deltaY < 0) { UpdateScreen('+'); } else if (event.originalEvent.deltaY > 0) { UpdateScreen('-'); } else { $ScrollState = false; } }
});
//Touch events
var startX, startY;
$('.pane,.scrzone').on('touchstart', function (event) {
	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;
});

$('.pane,.scrzone').on('touchmove', function (event) {
	event.preventDefault();
	var endX = event.touches[0].clientX;
	var endY = event.touches[0].clientY;
	var diffX = startX - endX;
	var diffY = startY - endY;
	if (Math.abs(diffX) > Math.abs(diffY)) {
		if (diffX > 0) {
			UpdateScreen('+');
		} else {
			UpdateScreen('-');
		}
	} else {
		if (diffY > 0) {
			UpdateScreen('+');
		} else {
			UpdateScreen('-');
		}
	}
});

$('.pane,.scrzone').on('touchend', function (event) {
	$ScrollState = false;
});

//Init
function Init() {
	$ScrollSpeed = 1.5; //Vitesse animation
	$ScrollState = false; //Scroll possible si True - Si False anim déjà en cours //
	$ActualSlide = $CibleSlide = $('.pane').first().attr('data-id'); //Première slide
	$ListSlides = new Array(); $('.pane').each(function () { $ListSlides.push($(this).attr('data-id')); }); //Liste des slides (.pane)
	TweenMax.to(window, 0, { scrollTo: 0 });
	TweenMax.to('.spane', 0, { scrollTo: { y: 0, x: 0 } });
	$('.visible').removeClass('visible');
	$('#Helper').html("Init()");//Helper
}
/ANIMATE
function UpdateScreen(operator) {
	$ActualSlide = $CibleSlide;
	if (operator == "+") { $CibleSlide = $ListSlides[$ListSlides.indexOf($ActualSlide) + 1]; } else { $CibleSlide = $ListSlides[$ListSlides.indexOf($ActualSlide) - 1]; }//Si + slide suivante / si - slide précédente
	$('#Helper').html("From <strong>" + $ActualSlide + "</strong> to <strong>" + $CibleSlide + "</strong>");//helper
	if (!$CibleSlide) { $ScrollState = false; $('#Helper').html("Break"); $CibleSlide = $ActualSlide; return; }//Arrete tout si pas de slide avant/après
	$ActualSlideDOM = $('.pane[data-id=' + $ActualSlide + ']');
	$CibleSlideDOM = $('.pane[data-id=' + $CibleSlide + ']');
//Scroll To : Greensock GSAP	
