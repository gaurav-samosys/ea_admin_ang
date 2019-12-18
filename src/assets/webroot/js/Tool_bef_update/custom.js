WebFontConfig = {
    google: { families: [ 'Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

function getJson(url) {

  return JSON.parse($.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    global: false,
    async: false,    
    success: function (data) {
      return data;
    }
  }).responseText);
}

$(document).ready(function() {

  $('.question-icon').hover(
    function () {
     // $(this).show();
      $(".question-icon .tooltip").fadeIn('slow');
    }, 
    function () {
      //$(this).hide();
      $(".question-icon .tooltip").fadeOut('slow');
    }
  );
   

  //  $('.question-icon').mouseover(function(event) {
  //     event.stopPropagation();  
  //     //$(".tooltip, .tooltip-overlay").fadeIn('slow');    
  //     $(".question-icon .tooltip").fadeIn('slow'); 
  // });
  //  $('.question-icon').mouseout(function(event) {
  //     event.stopPropagation();  
  //     //$(".tooltip, .tooltip-overlay").fadeIn('slow');    
  //     $(".question-icon .tooltip").fadeOut('slow'); 
  // });
   


  //  $('.close-tooltip').click(function(event) {
  //     event.stopPropagation();
  //     $(".tooltip, .tooltip-overlay").fadeOut('slow');    
  // });


   
   
   $('.videoPopup').click(function(event) {
      event.stopPropagation();
      var videolink =  $(this).attr('data-videolink');
      var videoHeading =  $(this).attr('data-videoHeading');
      var videoText =  $(this).attr('data-videoText');
      var video_data = '<iframe src="'+videolink+'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
      $('.video-wrap-inner').html(video_data);
      $('#videoHeading').html(videoHeading);
      $('#videoText').html(videoText);
       $(".video-modal, .tooltip-overlay").fadeIn('fast');   
  });
  
    $('.video-close').click(function(event) {
      event.stopPropagation();
      $('.video-wrap-inner').html('');
       $(".video-modal, .tooltip-overlay").fadeOut('fast'); 

    });







   $('.add-debt-button').click(function(event) {
      event.stopPropagation();
      $(".add-debt-popover, .tooltip-overlay").css('display', 'table');
      $('input:text:first').focus(); 
      $(window).scrollTop(0); 
  });
   $('.close-tooltip').click(function(event) {
      event.stopPropagation();
      $(".add-debt-popover, .tooltip-overlay").css('display', 'none');    
  });

   $('#example').dataTable( {
      "autoWidth": false,
      "bLengthChange": false,
      "bFilter": false,
      "autoWidth": false,
      "bPaginate": false,
      "bInfo": false,
      // "scrollX":300,

  });


var url = window.location.protocol + "//" + window.location.host + "/"; 
var Imgurl = window.location.protocol + "//" + window.location.host+"/";
//alert(Imgurl)
// for hide in view
$(".check-you-commitment").on("click",function(){


    var isVisible = $(this).parent().siblings(".step-hide-content-container").is( ":visible" );
    var isHidden = $(this).parent().siblings(".step-hide-content-container").is( ":hidden" );

    //alert(isVisible);
    if(isVisible){
                $(this).parent().parent().parent().parent(".col-md-4").css({"z-index":"0"});
                //$(this).parent().siblings(".step-hide-content-container").fadeOut();
                $(this).parent().siblings(".step-hide-content-container").fadeOut("fast",function(){
                  $(this).parent(".cls-step-content-container").removeAttr('style');
                  $(this).parent(".cls-step-content-container").css({"position":"relative","padding":"10px","background":"#e4ebc7","max-width":"100%","border-bottom-left-radius": "0px","border-bottom-right-radius":"0px","position":"relative"});
                  $(".view_pop-up").fadeOut("slow");
                  $('body').removeClass('acti_scroll');
                });
                 //$('.view_pop-up').css('height', 'auto');
                 //$(this).parents('.main-content.view_debt').removeClass('has-overlay');
                 //$(this).parents('body, html').removeClass('inherit-height');

            $(this).children(".down-arrow").attr("src",Imgurl+"img/images/down.png");       

    }
    else if(isHidden){
                    // $('html,body').animate({
                    //   scrollTop: $(this).offset().top + 10
                    // }, 'slow');
                    $(this).parent().siblings(".step-hide-content-container").fadeIn("fast",function(){
                    $(".view_pop-up").fadeIn("fast");
                    //$('.view_pop-up').css('height', $('body, html').height());
                   //$(this).parents('.main-content.view_debt').addClass('has-overlay');
                     $(this).parent().parent().parent(".col-md-4").css({"z-index":"102"});
                     //$(this).parents('body').addClass('inherit-height');
                     $(this).parent(".cls-step-content-container").removeAttr('style');
                     $(this).parent(".cls-step-content-container").css({"position":"absolute", "padding":"10px 10px 9px 10px","background":"#e4ebc7","max-width":"360px","border-bottom-left-radius": "4px","border-bottom-right-radius":"4px", "min-height": "124px"});
                     $('body').addClass('acti_scroll');
    });
      $(this).children(".down-arrow").attr("src",Imgurl+"img/images/up.png")              
    }    
});

jQuery('.view_debt .view_pop-up').click(function(event) {
	jQuery(this).css({
		display: 'none'
	});
  $('body').removeClass('acti_scroll');
	jQuery('.check-you-commitment').children(".down-arrow").attr("src",Imgurl+"img/images/down.png");
	jQuery('.step-hide-content-container').css({display: 'none'	});
  jQuery('.check-you-commitment').parent().parent().parent().parent(".col-md-4").css({"z-index":"0"});
});


});
// END OF READY


// Iterate over each select element
$('select').each(function () {

    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    $styledSelect.text($this.children('option').eq(0).text());

    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).toggleClass('active').next('ul.options').toggle();
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        /* alert($this.val()); Uncomment this for demonstration! */
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

function showTooltip(obj, id){
  $(id).show();
  $(id).css({"display":"block"});
}

function hideTooltip(obj, id){
  $(id).hide();
  $(id).css({"display":"none"});
}
    
