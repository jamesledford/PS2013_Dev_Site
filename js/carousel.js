$(document).ready(function() {
	//Variable Declaration
	var slides = [];
	var slideWidth;
	var margin = 10;

	// Slides Array
	function initSlides() {
		var s = $("#slides .slide");
		var slides = [];
		$.each(s, function(i) {
			slides[i] = s[i];
		});
		return slides;
	}

	// Position Slides
	function updateSlides() {
		windowWidth = document.body.offsetWidth;

		if (windowWidth < 560) {
			$(".slide").css("width", "90%");
		} else if (windowWidth < 1025) {
			$(".slide").css("width", "95%");
		} else {
			$(".slide").css("width", "100%");
		}

		slideWidth = slides[0].offsetWidth;

		var center = windowWidth * 0.5 - slideWidth * 0.5;

        $.each(slides, function(i, val){
			var pos;
			if (i+1 == slides.length && slides.length > 2) {
				pos = center - slideWidth - margin;
			} else if (i+1 == slides.length-1 && slides.length > 2) {
				pos = center - slideWidth*2 - margin*2;
			} else {
				pos =  center + (slideWidth+margin)*i;
			}

			slides[i].style.left = pos + 'px';
        });

		$("#carousel").css("height", slides[0].offsetHeight);
	}

	// Animate Slides
	function animateSlides(direction) {
		if ($("#carousel").hasClass("lock") === false) {
			if (direction === "next") {
				// Lock the carousel
				$("#carousel").addClass("lock");
				// Move the carousel
				$("#slides").animate({left: -(slideWidth+margin)}, "slow", function() {
					$("#carousel").removeClass("lock");
					slides.push(slides.shift());
					updateSlides();
					resetCarousel();
				});
			} else if (direction === "prev") {
				// Lock the carousel
				$("#carousel").addClass("lock");
				// Move the carousel			
				$("#slides").animate({left: slideWidth}, "slow", function() {
					$("#carousel").removeClass("lock");
					slides.unshift(slides.pop());
					updateSlides();
					resetCarousel();
				});
			}
		}
	}

	function initCarousel() {
		if (slides[0].offsetHeight < 50) {
			$("#carousel").fadeTo(0, 0);
			setTimeout(initCarousel, 250);
		} else {
			$("#carousel").css("height", slides[0].offsetHeight).fadeTo("slow", 1);
		}
	}

	function resetCarousel() {
		$("#slides").css("left", 0);
	}

	// Controls
	$("#prev").click(function(e) {
		e.preventDefault();
		animateSlides("prev");
	});

	$("#next").click(function(e) {
		e.preventDefault();
		animateSlides("next");
	});


	$(".slide").swipeleft(function(e) {
		e.preventDefault();
		animateSlides("prev");
	});

	$(".slide").swiperight(function(e) {
		e.preventDefault();
		animateSlides("next");
	});

	// Window Resize Events
	$(window).resize(function() {
		updateSlides();
	});

	//Init
	slides = initSlides();
	updateSlides();
	initCarousel();
});