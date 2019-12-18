window.addEventListener('DOMContentLoaded', function() {
});

var resizeTimer = null;
jQuery(window).resize(function (){
  clearTimeout(resizeTimer);
   resizeTimer= setTimeout(function(){
    
   }, 10);
});//END OF WINDOW RESIZE



// Preloader JS START
// $(document).ready(function() {

// $(window).on("load", function() {
// preloaderFadeOutTime = 500;
// function hidePreloader() {
// var preloader = $('.spinner-wrapper');
// preloader.fadeOut(preloaderFadeOutTime);
// }
// hidePreloader();
// });

// });
// Preloader JS END


// remove widow words
$(document).ready(function(){
$('p').each(function(){
    var string = $(this).html();
    string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
    $(this).html(string);
});

$('span').each(function(){
    var string = $(this).html();
    string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
    $(this).html(string);
});

});


jQuery(document).ready(function($) {

    // banner slider
    var banner_slider = new Swiper('.banner_slider', {
      speed: 1300,
       autoplay: {
        delay: 22000,
        disableOnInteraction: false,
      },
      loop:true,
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    // banner slider

    //simple language slider 
    var simple_language_slider = new Swiper('.simple_language_slider', {
      speed: 900,
      loop:true,
      slidesPerView: 4,
        spaceBetween: 15,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1900: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      }
    });
    //simple language slider

    // clientel_slider
    var clientel_slider = new Swiper('.clientel_slider', {
      speed: 2000,
      loop:true,
       autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      slidesPerView: 4,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        1900: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      }
    });
    // clientel_slider

    // customers_slider
    var customers_slider = new Swiper('.customers_slider', {
      speed: 1300,
      loop:true,
      slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
    });
    // customers_slider

    // date_counter_slider
    var date_counter_slider = new Swiper('.date_counter_slider', {
      spaceBetween: 20,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
    });

    // experience_slider
    var experience_slider = new Swiper('.experience_slider', {
      speed: 1300,
      slidesPerView:'auto',
      spaceBetween: 0,
      loop:true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: date_counter_slider
      }
    });
    // experience_slider

    $('.date_counter_slider .swiper-slide').click(function(event) {
      $('.date_counter_slider .swiper-slide').removeClass('active_date');
      $(this).addClass('active_date');
    });
    // date_counter_slider

    // popular_course_slider
    var popular_course_slider = new Swiper('.popular_course_slider', {
      speed: 1300,
      slidesPerView: 2.6,
      loop:true,
      initialSlide:1,
        spaceBetween: 20,
        centeredSlides:true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
        320: {
          slidesPerView: 1,
          initialSlide:1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1,
          initialSlide:1,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView:2.6,
          initialSlide:1,
          spaceBetween: 20,
        },
        1900: {
          slidesPerView: 2.6,
          initialSlide:1,
          spaceBetween: 20,
        },
      }
    });
    // popular_course_slider

    
    // team_slider
    var team_slider = new Swiper('.team_slider', {
      speed: 1300,
      slidesPerView: 4,
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1900: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      }
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
    $(document).ready(function(){
      $("#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4").click(function(){
        $(".mob_nav").toggle();
        
      });
    });
    // responsive menu

    $(document).ready(function(){
      $("#user_access").click(function(){
        event.preventDefault();
        $(".intro_rol").toggle();
      });
    });



    // Coching banner slider
    var banner_slider = new Swiper('.coching_slider', {
      speed: 1300,
      loop:true,
       autoplay: {
        delay: 22000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    // Coching banner slider

    // Coching banner slider
    var banner_slider = new Swiper('.event_slider', {
      speed: 1300,
      loop:true,
       autoplay: {
        delay: 22000,
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
      speed: 1300,
      loop:true,
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
      loop:true,
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1900: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }
        
    });
    //simple language slider

    // timer
      function makeTimer() {
      //var endTime = new Date("29 April 2018 9:56:00 GMT+01:00");  
      var endTime = new Date("25 November 2019 8:00:00 GMT+01:00");      
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
      speed: 1300,
      loop:true,
      slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
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

    // date picker event page
    $(function() {
      $('#date_select').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901,
        maxYear: parseInt(moment().format('YYYY'),10),
        
      }, function(start, end, label) {
        //var years = moment().diff(start, 'years');
        //alert("You are " + years + " years old!");
      });
    });
    // date picker event page

    // event speaker slider
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 20,
      loop:true,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });
    var galleryTop = new Swiper('.gallery-top', {
      loop:true,
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
      speed: 1300,
      loop:true,
       autoplay: {
        delay: 22000,
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
      speed: 1300,
      loop:true,
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
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1900: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }
      
    });
    // editors_pick_slider slider
    $('.event_signup').click(function(event) {
      $('body').addClass('open_signup_popup');
    });

    $('.submit_form').click(function(event) {
      $('body').removeClass('open_signup_popup');
    });

    $('.more_info_btn').click(function(event) {
      $('body').addClass('open_more_info_form');
    });

    $('.close_more_info_form').click(function(event) {
      $('body').removeClass('open_more_info_form');
    });

   // About us
    var swiper = new Swiper('#abous_us_slider-new', {
      navigation: {
        nextEl: '.abnext',
        prevEl: '.abpre',
      },
    });

  // Other fild 
    $(document).ready(function(){
      $("#other_fild").click(function(){
        $(".other_text").toggle();
      });
    });
    
    // Hover

   
});