$(function(){

	// Scroll to section
	$('.nav-link').on('click' , function(){
		var target = $(this).attr('href');
		if ( $(this).closest('.navbar-collapse.show') ) {
			$('.nav-link').removeClass('active-link');
			$(this).addClass('active-link');
			$('.navbar-collapse.show').removeClass('show');
			$('.navbar-toggler').removeClass('showed');
			$('html, body').animate({scrollTop: $(target).offset().top - 114}, 1000);
		}

	    return false;
	});

	$('.intro .scroll').on('click' , function(){
		var target = $(this).attr('href');
		
		$('html, body').animate({scrollTop: $(target).offset().top - 114}, 1000);

		return false;
	});

	// Active link when scroll
	$(window).scroll(function(){

		var target = $(this).attr('href');

		if ( $('body , html').scrollTop() >= $('#index').offset().top & $('body , html').scrollTop() <= $('#mission').offset().top ) {
			$('.nav-link').removeClass('active-link');
			$('.nav-link[href="#index"]').addClass('active-link');
		} else if ( $('body , html').scrollTop() >= $('#mission').offset().top & $('body , html').scrollTop() <= $('#capsule').offset().top ) {
			$('.nav-link').removeClass('active-link');
			$('.nav-link[href="#mission"]').addClass('active-link');
		} else if ( $('body , html').scrollTop() >= $('#capsule').offset().top & $('body , html').scrollTop() <= $('#reg').offset().top ) {
			$('.nav-link').removeClass('active-link');
			$('.nav-link[href="#capsule"]').addClass('active-link');
		} else if ( $('body , html').scrollTop() >= $('#reg').offset().top & $('body , html').scrollTop() <= $('#partners').offset().top ) {
			$('.nav-link').removeClass('active-link');
			$('.nav-link[href="#reg"]').addClass('active-link');
		} else if ( $('body , html').scrollTop() >= $('#partners').offset().top ) {
			$('.nav-link').removeClass('active-link');
			$('.nav-link[href="#partners"]').addClass('active-link');
		}

	})

	// Slick slider
	$('.reviews__slide').slick({
		autoplay: false,
		dots: true,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	// Send message
	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}
	$('#order__form').on('submit',function(e){

		e.preventDefault()
		var data = $('#order__form').serializeArray();
		var hasError = false;
		$('.form__input.error').removeClass('error')
		if($('input[name="name"]').val().length < 2){
			hasError = true;
			$('input[name="name"]').parents('.form__input').addClass('error')
		}
		/*var phone = $('input[name="phone"]').val().trim();
		var phoneNumbers =  phone.match(/\d+/g);*/
		var email = $('input[name="email"]').val().trim();
		

		/*if(phoneNumbers){
			phoneNumbers = phoneNumbers.join('')
		if(phoneNumbers.length < 10 || phoneNumbers.length > 11){
			$('input[name="phone"]').parents('.form__input').addClass('error')
				hasError = true;
		}
	}else{
		hasError = true;
		$('input[name="phone"]').parents('.form__input').addClass('error')
	}*/
		if(email.length <= 3 || !validateEmail(email)){
			hasError = true;
			$('input[name="email"]').parents('.form__input').addClass('error')
		}

		if(!hasError){
	        $.post('/post.php',$('#order__form').serializeArray()).done(function(){
	            $('#order__form input').each((function () {
	            	if(!$(this).hasClass('btn-submit')) {
	                    $(this).val('');
	                }

	            }))
				$('#order__form').fadeOut();
				$('.success-submited').fadeIn();
			})
    	}

		
	})

	// Parallax
	//$('.intro').parallax({imageSrc: '../images/photo-1.png"'});
	//$('.why').parallax({imageSrc: '../images/Pattern-1.jpg"'});
	//$('.our__produce').parallax({imageSrc: '../images/photo-5.png"'});

});