$(document).ready(function() {

	$('#navigation li a').click(function() {
	  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		  if (target.length) {
		    $('html,body').animate({
		        scrollTop: target.offset().top - 40
		    }, 900);
		    return false;
		  }
	  }
	});

  // --------------------------------------------------------
  //  Stats Counter + Waypoints to know when to activate
  // --------------------------------------------------------   
  $('#stats').waypoint(function() {
    $('h3').each(function() {
      counter = $(this).attr('data-count'),
      $(this).find('span').delay(6000).countTo({
        from: 50,
        to: counter,
        speed: 4000, // Stats Counter Speed
        refreshInterval: 50,
      });
    });
  }, {
    offset: '50%',
    triggerOnce: true
  });


  $(".single-slider").owlCarousel({

      navigation: false, // Show next and prev buttons
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true,
      autoPlay: true,
      autoHeight: true

      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

  });



  $('.submenu-toggle').on('click', function(e) {
      e.preventDefault();

      var $subNav = $(this).next('.submenu');
      var $othernav = $(this).parents().find('.submenu');

      if ($subNav.hasClass('hidden') && $('.submenu-toggle').hasClass('toggled')) {
          $('.submenu-toggle').removeClass('toggled');
      }

      if ($subNav.hasClass('hidden')) {
          $othernav.slideUp(420, function() {
              $(this).addClass('hidden');
          });
          $subNav.hide().removeClass('hidden').stop().slideDown(420);
          $(this).addBack().addClass('toggled');
      } else {
          $subNav.stop().slideUp(420, function() {
              $(this).addClass('hidden');
          });
          if ($(this).addBack().hasClass('toggled')) {
              $(this).addBack().removeClass('toggled');
          }
      }
  });


  $('[data-toggle=offcanvas]').click(function() {
      $('.row-offcanvas').toggleClass('active');
  });


  // --------------------------------------------------------
  // Pretty Photo for Lightbox Image
  // -------------------------------------------------------- 
  $("a[data-gal^='prettyPhoto']").prettyPhoto();


  // --------------------------------------------------------
  //	Smooth Scrolling
  // -------------------------------------------------------- 	
  $(".navbar-nav li a[href^='#']").on('click', function(e) {
      e.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
          scrollTop: $(hash).offset().top
      }, 1000, function() {
          window.location.hash = hash;
      });
  });

  // --------------------------------------------------------
  //	Scroll Up
  // -------------------------------------------------------- 	
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('.scroll-up').fadeIn();
      } else {
          $('.scroll-up').fadeOut();
      }
  });

  $('.scroll-up').click(function() {
      $("html, body").animate({
          scrollTop: 0
      }, 600);
      return false;
  });

});







(function($) {
    $('.accordion > li:eq(0) a').addClass('active').next().slideDown();

    $('.accordion a').click(function(j) {
        var dropDown = $(this).closest('li').find('p');

        $(this).closest('.accordion').find('p').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('a.active').removeClass('active');
            $(this).addClass('active');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });
})(jQuery);







// --------------------------------------------------------
//	Collapse Navigation (Mobile) on click
// -------------------------------------------------------- 	
$(document).on('click', '.navbar-collapse.in', function(e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});



// --------------------------------------------------------
//	Banner Form
// -------------------------------------------------------- 
$('.bottom-form').on('submit', function(e) {
    e.preventDefault(); //Prevents default submit
    var form = $(this);
    var post_url = form.attr('action');
    var post_data = form.serialize(); //Serialized the form data for process.php
    $('.form-process').html('<p><i class="ion-ios-information-outline"></i> Please Wait...</p>');
    $.ajax({
        type: 'POST',
        url: 'bottom-form.php', // Your form script
        data: post_data,
        success: function(msg) {
            $(form).fadeOut(500, function() {
                form.html(msg).fadeIn();
            });
            $('.form-process').html('<p class="text-center">Submission Successful</p>');
        }
    });
});
