window.addEventListener('DOMContentLoaded', function() {
});

var resizeTimer = null;
jQuery(window).resize(function (){
  clearTimeout(resizeTimer);
   resizeTimer= setTimeout(function(){
    
   }, 10);
});//END OF WINDOW RESIZE


jQuery(document).ready(function($) {

    // banner slider
    var banner_slider = new Swiper('.banner_slider', {
       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    	pagination: {
	        el: '.swiper-pagination',
	        clickable: true,
	    },
    });
    // banner slider

    //simple language slider 
    var simple_language_slider = new Swiper('.simple_language_slider', {
    	slidesPerView: 4,
      	spaceBetween: 15,
      	navigation: {
        	nextEl: '.swiper-button-next',
        	prevEl: '.swiper-button-prev',
      	},
    });
    //simple language slider

    // clientel_slider
    var clientel_slider = new Swiper('.clientel_slider', {
    	slidesPerView: 4,
      	spaceBetween: 0,
      	navigation: {
        	nextEl: '.swiper-button-next',
        	prevEl: '.swiper-button-prev',
      	},
    });
    // clientel_slider

    // customers_slider
    var customers_slider = new Swiper('.customers_slider', {
      slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    // customers_slider

    // experience_slider
    var experience_slider = new Swiper('.experience_slider', {
      slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    // experience_slider

    // date_counter_slider
    var date_counter_slider = new Swiper('.date_counter_slider', {
      slidesPerView: 'auto',
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
    });

    $('.date_counter_slider .swiper-slide').click(function(event) {
      $('.date_counter_slider .swiper-slide').removeClass('active_date');
      $(this).addClass('active_date');
    });
    // date_counter_slider

    // popular_course_slider
    var popular_course_slider = new Swiper('.popular_course_slider', {
      slidesPerView: 2.6,
      initialSlide:1,
        spaceBetween: 20,
        centeredSlides:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    // popular_course_slider

    
    // team_slider
    var team_slider = new Swiper('.team_slider', {
      slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
    });
    // team_slider

    // accordian
    $(".set > .question").on("click", function() {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(this)
          .siblings(".content")
          .slideUp(200);
        $(".set > .question i")
          .removeClass("fa-minus")
          .addClass("fa-plus");
      } else {
        $(".set > .question i")
          .removeClass("fa-minus")
          .addClass("fa-plus");
        $(this)
          .find("i")
          .removeClass("fa-plus")
          .addClass("fa-minus");
        $(".set > .question").removeClass("active");
        $(this).addClass("active");
        $(".content").slideUp(200);
        $(this)
          .siblings(".content")
          .slideDown(200);
      }
    });
    // accordian

    // responsive menu
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
      $(this).toggleClass('open');
    });
    // responsive menu

    $(document).ready(function(){
      $(".user_access").click(function(){
        event.preventDefault();
        $(".intro_rol").toggle();
      });
    });



    // Coching banner slider
    var banner_slider = new Swiper('.coching_slider', {
       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    // Coching banner slider


    // customers_slider
    var customers_slider = new Swiper('.coaching_clients', {
      slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    // customers_slider

    //simple language slider 
    var simple_language_slider = new Swiper('.coching_experts_slider', {
      slidesPerView:3,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
    });
    //simple language slider

    // timer
      function makeTimer() {
      //var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");  
      var endTime = new Date("30 November 2019 9:56:00 GMT+01:00");      
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
    
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");   
      }
      setInterval(function() { makeTimer(); }, 1000);
    // timer

    // testimonail_slider
    var customers_slider = new Swiper('.testimonail_slider', {
      slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    // customers_slider

    // Gallery tabs
    $(document).ready(function(){
  
      $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
      })

    })

    // Gallery tabs

    // timer
      function makeTimer() {
      //var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");  
      var endTime = new Date("30 November 2019 9:56:00 GMT+01:00");      
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
    
        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $("#days").html('<h5>'+days + "</h5><p>Days</p>");
        $("#hours").html('<h5>'+hours + "</h5><p>Hours</p>");
        $("#minutes").html('<h5>'+minutes + "</h5><p>Minutes</p>");
        $("#seconds").html('<h5>'+seconds + "</h5><p>Seconds</p>");   
      }
      setInterval(function() { makeTimer(); }, 1000);
    // timer

    // date picker event page
    $(function() {
      $('#date_select').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10)
      }, function(start, end, label) {
        var years = moment().diff(start, 'years');
        alert("You are " + years + " years old!");
      });
    });
    // date picker event page

    // event speaker slider
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 20,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      slidesPerView:'auto',
      spaceBetween: 0,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
    // event speaker slider

    // blog_slider slider
    var blog_slider = new Swiper('.blog_slider', {
       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
    });
    // blog_slider slider

    editors_pick_slider

    // editors_pick_slider slider
    var editors_pick_slider = new Swiper('.editors_pick_slider', {
      spaceBetween: 20,
      slidesPerView: 3,
       autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
    });
    // editors_pick_slider slider
});