function fullheight(){
//get full height
var FullWidth = jQuery(document).width();
var FullHeight = jQuery(window).height();
var HeaderHeight = jQuery('header.header').height();
var footerheight = jQuery('.bottom-footer').height();
var QLimits = jQuery('.q-limit-wrap').height();

var LeftHeight = FullHeight - HeaderHeight;
var screenheight = FullHeight - footerheight;

var whpagesScreen = FullHeight - QLimits - footerheight;

var notclude_f_h = FullHeight - HeaderHeight - footerheight - 100;


jQuery('.wh-pages-height').css('min-height', FullHeight);

if(FullWidth >= 768){
	jQuery('.full-height').css('min-height', screenheight);
	jQuery('.wh-pages-height2').css('min-height', whpagesScreen);


	jQuery('.landing-column-left').css('min-height', LeftHeight);
	jQuery('.landing-column-right').css('min-height', LeftHeight);

}if(FullWidth >= 600){
	jQuery('.notclude_f_h').css('min-height', notclude_f_h);

}else if(FullHeight <= 750){

	jQuery('.wh-pages-height2').css('min-height', whpagesScreen);

}else{
	jQuery('.landing-column-left').css('height', 'auto');
	jQuery('.landing-column-right').css('height', 'auto');
}

}


jQuery(document).ready(function() {
	fullheight();

	jQuery('.user-name-wrap').click(function(event) {
		jQuery('.mobile-navs').removeClass('open_menu_n');
		jQuery(this).toggleClass('open_menu_n');
	});

	jQuery('.mobile-navs').click(function(event) {
		jQuery('.user-name-wrap').removeClass('open_menu_n');
		jQuery(this).toggleClass('open_menu_n');
	});


	/* CLOSE menu ON OUTSIDE CLICK */
	jQuery('body').click(function(e) {
		if (!jQuery(e.target).parents().andSelf().is('.user-name-wrap')) {
			jQuery('.user-name-wrap').removeClass('open_menu_n')
		}
	});
	jQuery('body').click(function(e) {
		if (!jQuery(e.target).parents().andSelf().is('.mobile-navs')) {
			jQuery('.mobile-navs').removeClass('open_menu_n')
		}
	});


	jQuery(document).on('click','.remove_setflash',function  () {
		$('#session_set_flash').hide();  
	});


	// Pro User Popup

	$('.become_pro_customer').on('click', function(){
		
		swal({
			title: "Congrats on getting started!",
			text: "You have taken a big step toward your financial health. Sign up to unlock everything Enriched has to offer!",
			type: "success",
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Contact Enriched!',
			cancelButtonText: "Sign me up!",
			closeOnConfirm: false,
			closeOnCancel: false
		},
		function(isConfirm){
			if (isConfirm){
				swal("Cancelled", "Your imaginary file is safe :)", "error");
			} else {
				window.open("https://www.eacourse.ca/coursee",'_blank');
			}
		});
	});

	// $('.pro_customer_for_downloads').on('click', function(){
	// 	swal("Thanks for register!", "The rest of the tools will be activated after you become a Pro user. Please call us at 800-892-9228 for more information.", "success");
	// 	return false;
	// });

	$('.pro_customer_for_downloads, .become_pro_customer').on('click', function(){
		swal({
			title: "Want the full experience?",
			text: "Downloads are available for Pro users",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Contact Enriched!',
			cancelButtonText: "Sign me up!",
			customClass: 'close_swal_btn',
			closeOnConfirm: true,
			closeOnCancel: true,
			allowOutsideClick: false
		},
		function(isConfirm){
			if (isConfirm){
				$('html').addClass('dcrfPopUp');
			} else {
				window.open("https://www.eacourse.ca/course",'_blank');
			}
		});
	});

	$('.pro_customer_for_workbook').on('click', function(){
		swal({
			title: "Want the full experience?",
			text: "The Workbook is available for Pro users",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Contact Enriched!',
			cancelButtonText: "Sign me up!",
			customClass: 'close_swal_btn',
			closeOnConfirm: true,
			closeOnCancel: true,
			allowOutsideClick: false
		},
		function(isConfirm){
			if (isConfirm){
				$('html').addClass('dcrfPopUp');
			} else {
				window.open("https://www.eacourse.ca/course",'_blank');
			}
		});
	});
	// Debt Crusher Free version Popup
	$('.pro_customer_for_debt_crusher').on('click', function(){
		swal({
			title: "Want the full experience?",
			text: "The Debt Crusher is available for Pro users.",
			type: "info",
			showCancelButton: true,
			confirmButtonColor: '#DD6B55',
			confirmButtonText: 'Contact Enriched!',
			cancelButtonText: "Sign me up!",
			customClass: 'close_swal_btn',
			closeOnConfirm: true,
			closeOnCancel: true,
			allowOutsideClick: false
		},
		function(isConfirm){
			if (isConfirm){
				$('html').addClass('dcrfPopUp');
			} else {
				window.open("https://www.eacourse.ca/course",'_blank');
			}
		});
	});

	$('body').on('click', '.sweet-overlay', function(){
		swal.close();
	});

	/* CLOSE HAM ON OUTSIDE CLICK */

	// 		jQuery( document ).ajaxSend( function( event, request, settings ) {
	// 		    jQuery('#ajax-loader').show();
	// 		});
	// 		jQuery( document ).ajaxComplete(function( event, request, settings ) {
	// 		    jQuery('#ajax-loader').hide();
	// 		});
	// 		jQuery( document ).ajaxSuccess(function( event, request, settings ) {
	// 		    jQuery('#ajax-loader').hide();
	// 		});

});


// jQuery( document ).ajaxSend( function( event, request, settings ) {

//     jQuery('#ajax-loader').show();
// });

// jQuery( document ).ajaxComplete(function( event, request, settings ) {

//     jQuery('#ajax-loader').hide();
// });

// jQuery( document ).ajaxSuccess(function( event, request, settings ) {
//     jQuery('#ajax-loader').hide();
// });


jQuery(window).resize(function() {
	fullheight();

});

if (window.DeviceOrientationEvent) {

	window.addEventListener('orientationchange', fullheight, false);

}




function ajax(url,async,data){
	var response;
	if(typeof data == 'undefined'){
		data = {};
	}
	$.ajax({
		async : async,
		type: "POST",
		url: getWebroot()+url,
		data : data,
		success: function (data) {
			response = data;  
		}
	});
	return response;
}




// jQuery(window).scroll(function() {
// if (jQuery(this).scrollTop() > 1){  
//     jQuery('header').addClass("sticky");
//   }
//   else{
//     jQuery('header').removeClass("sticky");
//   }
// });


