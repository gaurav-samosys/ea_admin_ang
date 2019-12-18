$(document).ready(function(){
	jQuery( document ).ajaxSend( function( event, request, settings ) {
	    jQuery('#ajax-loader').show();
	});
	jQuery( document ).ajaxComplete(function( event, request, settings ) {
	    jQuery('#ajax-loader').hide();
	});
	jQuery( document ).ajaxSuccess(function( event, request, settings ) {
	    jQuery('#ajax-loader').hide();
	});
});

var url = getWebroot();   

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

$(function(){

	var userId = $("#welcome_user").text();
	var user_name_id = userId.replace(/^Welcome+/i, '');
	var givenAnsLength = '';
	var givenAnswers = '';
	var queLength = '';
	var sliders	= 0;
	var birth = '';

	$("#lets_start_first").click(function(){
		$('.welcome-screen').hide();
		$('.welcome-screen-next').show();
		setPageProgress("Welcome Screen");
		quiz_slide();
		
	});

	$("#lets_start_second").click(function(){	
		setPageProgress("Welcome Screen 2");
		slider_name2();

	});
	
	// $.ajax({
	// 	type:"post",
	// 	url: url+'users/starting_survey',
	// 	datatype:"JSON",
	// 	success: function(data)
	// 	{
	// 		if(data.comp == 105){
	// 			return false;
	// 		}
			
	// 		var que = data.q,ans = allque = allans = '',a = 1;
			
	// 		if(data.givenAns != 0){
	// 		 givenAnsLength= data.givenAns.replace(/\,/g,'').length;
	// 		 givenAnswers = data.givenAns.replace(/\,/g,'');
	// 		}
			
 // 			queLength = que.length;
	// 		var color = new Array('#C8C8C8','#C8C8C8 !important','#C8C8C8 !important','#C8C8C8','#C8C8C8 !important','#C8C8C8 !important');
	// 		for(var i = 0;i<queLength; i++ ){
			    
	// 		    allans = '', ans = data.a[i], ansLength = ans.length;
				
	// 			for(var j=0; j<ansLength; j++){
	// 			   	if(i==6){
	// 					allans +='<div class="answer-dv" ><div class="answer-no" style="background:'+color[j]+'">'+(j+1)+'</div><label><div class="answer-txt" style="background:'+color[j]+'">&nbsp; '+data.a[i][j].starting_level_answers.answers+'</div></label></div>'; 
	// 				}else{
	// 					allans +='<div class="answer-dv" ><div class="answer-no" style="background:'+color[j]+'">'+(j+1)+'</div><label><div class="answer-txt" style="background:'+color[j]+'"><input name="'+i+'" type="radio"  name="'+i+'" value='+(j+1)+' q_data="'+data.a[i][j].starting_level_answers.answers+'">&nbsp; <div class="answr-rgth-txt"> '+data.a[i][j].starting_level_answers.answers+'</div></div></label></div>';
	// 				}
	// 			}
	// 			allque += '<li><div class="quiz-no">'+(i+1)+'</div><div class="count_quiz">Question '+(i+1)+' of 7</div><div class="quiz-question">'+data.q[i]+'</div><div class="answers">'+allans+'</div><span id="error_'+i+'" style="display:none;color:red;">Please select any one of the answers.</span></li>';
	// 		}
			
	// 		$("#popup").html(allque);
	// 		$("#popup").css('margin-left','0px');
	// 		$("#popup").css('height','');
	// 		$("#level").val(data.level);
			   
	// 		$("#date_pic").html('<select name="month" id="month" onchange="monthly()"><option value="">-Select Month-</option><option value="1">January</option><option value="2">February</option><option value="3">March</option><option value="4">April</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">August</option><option value="9">September</option><option value="10">October</option><option value="11">November</option><option value="12">December</option></select><select name="year" id="year" onchange="fly()">');
			
	// 		if(data.ansUserBirth != ''){
	// 			birth =data.ansUserBirth.split('-');
	// 		}
	// 		// $('.wh-box-inner').html(allque);
	// 		$("#popup_first").bPopup({
	// 			follow: [false, false], //x, y
	// 			modalClose: false,
	// 			opacity: 0.6,
	// 			escClose: false//x, y
	// 		});
							
	// 	},
	// 	error: function(error){
	// 		console.log(error);
	// 	}
	// });
	
 var nextcount = prevcount = values_ans = 0;

$("#next").click(function(){
	
	 if($('input[name=2][value=2]:checked').length>0){
		 $("#month").val('');
		  $("#year").val('');
		  $("#events_user").text('No problem. We can skip that one!');
		  $('#2_option').html('For Birthday: Rather Not Say or ');
	 }
	var ans_wise_val = $('input[name=0]:checked').attr('name');
    if(ans_wise_val == 0){
	    var values = $('input[name=0]:checked').val();
		$.ajax({
			type:"post",
			url: url+"users/starting_ans_wise_text",
			datatype:"JSON",
			data:{name:ans_wise_val,val:values},
			success: function(data)
			{
				$("#first_user_text").html(data.ans_wise_texts.text);
				$("#second_uname").html(user_name_id);
			},
			error: function(error){
				console.log(error);
			}
		});
   }
   var ans_wise_val_sec = $('input[name=1]:checked').attr('name');
   if(ans_wise_val_sec == 1){
   	   var values_second = $('input[name=1]:checked').val();
	   $.ajax({
			type:"post",
			url: url+"users/starting_ans_wise_text",
			datatype:"JSON",
			data:{name:ans_wise_val_sec,val:values_second} ,
			success: function(data)
			{
				$("#second_user_text").html(data.ans_wise_texts.text);
			   $("#third_uname").html(user_name_id);
			},
			error: function(error){
				console.log(error);
			}
		});
   }
   var ans_wise_val_third = $('input[name=2][value=1]:checked').attr('name');
	   if(nextcount == 2 && ans_wise_val_third == 2 ){
		  var year=  $("#year").val();
		  var month=  $("#month").val();
		   if(birth == ''){
				 if(month == '' || year == ''){
					 $("#error_"+nextcount).show();
					 return false;
				 }else{
					  $.ajax({
							type:"post",
							url: url+"users/starting_ans_wise_text_year",
							datatype:"JSON",
							data:{years:year} ,
							success: function(data)
							{
								$("#events_user").html(data.year_wise_events.events);
							},
							error: function(error){
								console.log(error);
							}
						});
					 
				 }
		   } else {
			   var years=  $("#year").val();
				$.ajax({
					type:"post",
					url: url+"users/starting_ans_wise_text_year",
					datatype:"JSON",
					data:{years:years} ,
					success: function(data)
					{
						$("#events_user").html(data.year_wise_events.events);
					},
					error: function(error){
						console.log(error);
					}
				});
		 }
		   
	}
	values_ans = $('input[name='+nextcount+']:checked', '#starting').attr("q_data"); 
	if(nextcount == 2){
			if($('input[name=2][value=2]:checked').length>0){
					$('#'+nextcount+'_option').html(values_ans);
			}else{
				var month_Wise_Data = $("#month_text").val();
				 var year_Wise_Data = $("#yearly_pick").val();
				
				$('#'+nextcount+'_option').html('For Birthday: '+month_Wise_Data+','+year_Wise_Data);
			}
	}else if(nextcount ==4){
		$('#'+nextcount+'_option').html('Income : '+values_ans);
	}else{
		$('#'+nextcount+'_option').html(values_ans);
	}
	
	$("#prev").show();
	if($('input[name='+nextcount+']:checked').length<=0){
		 if(nextcount == 0){
			 $("#prev").hide();
		 }
		 $("#error_"+nextcount).show();
		 return false;
	}
	$("#error_"+nextcount).hide();
	nextcount += 1;
	$.ajax({
		type:"post",
		url: url+"users/starting_survey_save",
		datatype:"JSON",
		data: $("#starting").serialize(),
		success: function(data) {
			if(data.response == '101'){
				//alert("save");
			}else if(data.response == '102'){
			   // alert("not save");
			}
		},
		error: function(error){
			console.log(error);
		}
	});
			
	if(nextcount == (queLength-1)){
		$("#next").hide();
		$("#save").show();
	}
			
 });
		
	$("#prev").click(function(){
		prevcount = (nextcount-1);
		if(prevcount ==0){
			$("#prev").hide();
		}
		if(prevcount == (queLength-2)){
			$("#next").show();
			$("#save").hide();
		}
		nextcount =prevcount;
	});

		
	$("#save").click(function(){
	   $.ajax({
			type:"post",
			url: url+"users/starting_survey_save",
			datatype:"JSON",
			data: $("#starting").serialize()+'&'+$.param({ 'key': '1' }),
			success: function(data)
			{ 
				if(data.response == '101'){
					$("#quiz-popup").bPopup().close();
					location.reload();
				}else if(data.response == '102'){
				 alert("not save");
				}
			},
			error: function(error){
				 console.log(error);
			}
		});

	});



	 function slider_name(){  
	 	
	         var year='';
	         
	         for(var i=1940;i< new Date().getFullYear();i++){
	         year +='<option value="'+i+'" >'+i+'</option>';
	         }
	         $("#year").html('<option value="">-Select Year-</option>'+year);
	         $("#user_name_id").html(user_name_id);
	         $("#first_uname").html(user_name_id);
	         $("#second_uname").html(user_name_id);
	         $("#third_uname").html(user_name_id);
	          $("#five_uname").html(user_name_id);
	          $("#year").val(birth[1]);
	          $("#month").val(birth[0]);
	         
	        $("#prev").hide();
	        $("#quiz-popup").bPopup(
	        {
	            follow: [false, false], //x, y
	             modalClose: false,
	            opacity: 0.6,
	            positionStyle: 'fixed',
	            escClose: false//x, y
	        }
	    );
	    var slideCount = $('#quiz-popup ul li').length;
	    var slideWidth = $('#quiz-popup ul li').width();
	    var slideHeight =  $('#quiz-popup ul li').height();
	    var sliderUlWidth = slideCount * slideWidth;

	    $('#quiz-popup').css({ width: slideWidth, height: slideHeight });

	    $('#quiz-popup ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

	    $('#quiz-popup ul li:last-child').prependTo('#quiz-popup ul');

	    $(".next").click(function(){
	    moveRight();
	    });

	    $(".previous").click(function(){
	    moveLeft();
	    });
	    
	 function moveRight() {
	    $('#quiz-popup ul').animate({
	        left: - slideWidth
	    }, 200, function () {
	        $('#quiz-popup ul li:first-child').appendTo('#quiz-popup ul');
	        $('#quiz-popup ul').css('left', '');
	    });
	                             };


	function moveLeft() {
	        $('#quiz-popup ul').animate({
	            left: + slideWidth
	        }, 200, function () {
	            $('#quiz-popup ul li:last-child').prependTo('#quiz-popup ul');
	            $('#quiz-popup ul').css('left', '');
	        });
	};
	    var radio = '';
	    for(var k=0;k < (givenAnsLength);k++){

	    radio='';

	    radio= $('input[type=radio][name='+k+'][value='+givenAnswers[k]+']').prop('checked', true);
	     $("#next").click();     
	    }
	    
	 
	    
	        if($.isNumeric(birth[0])){

	            //$("#month").val(birth[0]);
	            //$("#year").val(birth[1]);
	            $("#birthday").html(birth[1]);
	         var monthly = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	           //var monthdata = birth[0]
	             $('#2_option').html('For Birthday: '+monthly[birth[0]-1]+','+birth[1]);
	        }else{
	            //alert('f');
	        }
	    
	    
	    }   


});

function fly(){
   var y = $("#year").val();
   $('input[type=radio][name=2][value=1]').prop('checked', true);
   var y = $("#year option:selected").text();
   $("#yearly_pick").val(y);
}

function monthly(){
	var m = $("#month option:selected").text();
	$('#month_text').val(m);
}


//SECOND POPUP 

var givenAnsLength = givenAnswers = queLength= actualGivenAnswers = '';
var org_que_id;

function quiz_slide(){

	 $.ajax({
		type:"post",
		url: url+"users/second_survey",
		datatype:"JSON",
		success: function(data){
			if(data.comp == 105){
				return false;
			}
			var ans = allque = allans =  limits_list = '';
			var a =1, que = data.q;
			org_que_id = data.org_que_id;

			if(data.givenAns != 0){
				givenAnsLength= data.givenAns.replace(/\,/g,'').length;
				givenAnswers = data.givenAns.replace(/\,/g,'');
				actualGivenAnswers = givenAnswers.replace(/0/g,'');
			}
			
			queLength = que.length;
			for(var i = 0;i<queLength; i++ ){
				allans = '', ans = data.a[i], ansLength = ans.length;
				
				for(var j=0; j<ansLength; j++){
					allans += '<li><a class="question-options"><div class="q-item check"><input class="radio-options" name="'+i+'" type="radio" style="display:none;"   name="'+i+'" value='+(j+1)+' ><p>'+data.a[i][j].starting_level_answers.answers+'</p></div></a></li>';
				}
				allque += '<li class="questions question-'+(i)+'" data-sequence="'+(i+1)+'"><div class="wh-q-box"><div class="titles-box"><h1 class="q-title-numeric">'+(i+1)+'.</h1><h1 class="q-title">'+data.q[i]+' </h1></div><div class="box-inner"><ul style="">'+allans+'</ul></div></div></li>';
				limits_list  += '<li><a title="Go to question '+(i+1)+'" data-sequence="'+(i)+'" class="question-status question-status-'+(i+1)+'"></a></li>';
			}
						
			$("#popup-school").html(allque).append('<input type="hidden" value='+org_que_id+' name="org_que" /><input type="hidden" name="whichQuestion" id="whichQuestion" value="" />');
			$("#popup-school").css({'margin-left':'0px', 'list-style' : 'none'});
			$("#popup-school").css('height','');
			$("#level-school2").val(data.level);
			$(".questions").hide();
			// $(".question-1").show();
			
			$('.limits-list ul').html(limits_list);
			$('.q-limit-wrap').show();
			setPageProgress("Welcome Screen 2");
			if(givenAnsLength == ''){
				showQuestion(0);
			}
			slider_name2();
		},
		error: function(error){
			console.log(error);
			location.reload();
		}
	});
		 

			
	
}

 function slider_name2(){   
		var year='';
		$("#prev").hide();
		$("#quiz-popup-school").bPopup(
		{
			follow: [false, false], 
			 modalClose: false,
			opacity: 0.6,
			positionStyle: 'fixed',
			escClose: false//x, y
		}
	);
	$("#prev2").hide();
	var slideCount = $('#quiz-popup-school ul li').length;
	var slideWidth = $('#quiz-popup-school ul li').width();
	var slideHeight =  $('#quiz-popup-school ul li').height();
	var sliderUlWidth = slideCount * slideWidth;

	$('#quiz-popup-school').css({ width: slideWidth, height: slideHeight });

	$('#quiz-popup-school ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

	$('#quiz-popup-school ul li:last-child').prependTo('#quiz-popup-school ul');
	setPageProgress('Financial Health Quiz');
	$(".next").click(function(){
	  moveRight();
	});

	$(".previous").click(function(){
		moveLeft();
	});
	
	function moveRight() {
		$('#quiz-popup-school ul').animate({
			left: - slideWidth
		}, 200, function () {
			$('#quiz-popup-school ul li:first-child').appendTo('#quiz-popup-school ul');
			$('#quiz-popup-school ul').css('left', '');
		});
	 };
	function moveLeft() {
			$('#quiz-popup-school ul').animate({
				left: + slideWidth
			}, 200, function () {
				$('#quiz-popup-school ul li:last-child').prependTo('#quiz-popup-school ul');
				$('#quiz-popup-school ul').css('left', '');
			});
	};
	var radio = '';
	$('.all').html(queLength);
	// console.log(givenAnsLength);
	// console.log(givenAnswers);
	var masterIndex = org_que_id;
	var inc = 0;
	for(var k=0;k < (givenAnsLength);k++){	 
		radio = '';
		inc = masterIndex[k]-1;
		// if(givenAnswers[k] > 0){
		// console.log(givenAnswers[k]);
		// console.log($('input[type=radio][name='+inc+'][value='+givenAnswers[inc]+']');
			radio = $('input[type=radio][name='+k+'][value='+givenAnswers[inc]+']').prop('checked', true);
	 		$('input[type=radio][name='+k+'][value='+givenAnswers[inc]+']').closest('.question-options').click();
		// }
		inc++;
   }
	
}  

var nextcount_second = prevcount_second = prevClickcount = 0;
		
	$("#prev2").click(function(){
		
		 prevcount_second = (nextcount_second-1);
		if(prevcount_second ==0){
				$("#prev2").hide();
			}
		if(prevcount_second == (queLength-2)){
			$("#next2").show();
			$("#save2").hide();
		}
		nextcount_second = prevcount_second;
	});

	var prev = false;
	$(document).on('click','.question-status',function (argument) {
		if($(this).hasClass('orange-bar')){
			prevClickcount = nextcount_second;		
			nextcount_second = parseInt($(this).attr('data-sequence'));	
			$(".completed-quiz").hide();
			$('.welcome-screen-next').show()
			showQuestion(nextcount_second);
			prev = true;
		}
	});
	$(document).on('click','#more-questions',function (argument) {
		$('.q-limit-wrap').show();
		$('.SectionQuiz').hide();
		$('.welcome-screen-next').show();
	});


	


	$(document).on('click','.question-options',function (argument) {
		$(this).closest('.questions').find('.check').removeClass('check-selected');		
		$(this).find('.check').addClass('check-selected');
		$(this).find('.radio-options').prop('checked',true);
		var questionNumber = parseInt($(this).closest('.questions').attr('data-sequence'));
		$('#whichQuestion').val(questionNumber);
		$('.question-status-'+questionNumber).addClass('orange-bar');			
		
		if(actualGivenAnswers.length < 5){
			if(questionNumber == 6)	{
				$('.q-limit-wrap').hide();
				$('.SectionQuiz').show();
				$('.welcome-screen-next').hide();
			}
		}		
		
		if($('input[name='+nextcount_second+']:checked').length<=0){
			if(nextcount_second == 0){
				$("#prev2").hide();
			}
			$("#error_"+nextcount_second).show();
			return false;
		}
		
		$("#error_"+nextcount_second).hide();		
		
		$(".questions").hide();
		// console.log(nextcount_second);
		nextcount_second += 1;
		if(nextcount_second >= prevClickcount){
			$('.given').html(nextcount_second);
		}
		
		$.ajax({
			type:"post",
			url: url+"users/second_survey_save",
			datatype:"JSON",
			async:false,
			data: $("#starting2").serialize(),
			beforeSend: function (argument) {
				// $('#loader').show();
			},
			success: function(data)
			{
				if(data.response == '101'){
					// alert("Saved");	
				}else if(data.response == '102'){
					// alert("not save");
				}
			},
			error: function(error){
				console.log(error);
			}
		});
		// $('#loader').hide();
		if(nextcount_second != queLength){
			showQuestion(nextcount_second);			
		}else{
			$('.wh-widget').hide();
			$(".completed-quiz").show();
		}


	});
		
		
	$("#save2").click(function(){
		if($('input[name=14]:checked').length<=0){
			$("#error_14").css('display','block');
			return false;
		}
			
		var lavel_data = $("#level-school2").val();
			
		$.ajax({
			type:"post",
			url: url+"users/second_survey_save",
			datatype:"JSON",
			data: $("#starting2").serialize()+'&'+$.param({ 'key': lavel_data }),
			success: function(data)
			{
				if(data.response == '101'){
					// $("#quiz-popup-school").bPopup().close();
					window.location.replace(url+"users/dashboard");
					// survey_result();
				}else if(data.response == '102'){
					alert("not save");
				}
				nextcount_second = prevcount_second='';
			},
			error: function(error){
				console.log(error);
			}
		});
	});

	$("#save2continue").click(function(){
		if($('input[name=14]:checked').length<=0){
			$("#error_14").css('display','block');
			return false;
		}
			
		var lavel_data = $("#level-school2").val();
			
		$.ajax({
			type:"post",
			url: url+"users/second_survey_save",
			datatype:"JSON",
			data: $("#starting2").serialize()+'&'+$.param({ 'key': lavel_data }),
			success: function(data)
			{
				if(data.response == '101'){
					// $("#quiz-popup-school").bPopup().close();
					window.location.replace(url+"users/detailedReport");
					// survey_result();
				}else if(data.response == '102'){
					alert("not save");
				}
				nextcount_second = prevcount_second='';
			},
			error: function(error){
				console.log(error);
			}
		});
	});
		

function survey_result(){
	$.ajax({
		type:"post",
		url: url+"users/final_result",
		datatype:"JSON",
		success: function(data)
		{
			$(".a_count").html(data.first[0].cat_wise_marks.grade);
			$(".b_count").html(data.second[0].cat_wise_marks.grade);
			$(".c_count").html(data.third[0].cat_wise_marks.grade);
			$(".d_count").html(data.fourth[0].cat_wise_marks.grade);
			$(".demo_a").html('Financial Stress Level');
			$(".demo_b").html('Financial Awareness');
			$(".demo_c").html('Controlling Debt');
			$(".demo_d").html('Financial Preparedness');
			$(".all_count").html(data.final_result[0].final_marks.grade+'</br><span class="marks">('+data.sum+'/60)</span>');
			$("#result_text").html(data.final_result[0].final_marks.note);
			
			setPageProgress('Survey Quiz Completed');
			
			$("#popup-reusult").bPopup({
				follow: [false, false], //x, y
				position: [200, 10],
				modalClose: false,
			   opacity: 0.6,
			   escClose: false//x, y
			});
			
			$("#result_marks").html('Level');
		},
		error: function(error){
			console.log(error);
		}
	});

}

$(".act_now").click(function(){
	$(".page-bg").css("display","block");
	$("page-bg").css("z-index", "19909");
	$("#wait").css("display", "block");
	$("#wait").css("z-index", "19910");
	window.location.replace(url+"users/dashboard");
	$("#popup-reusult").bPopup().close();
});
function showQuestion (number) {
	$('.questions').hide();
	var $revealMe = $('.question-'+number);
    var originalHeight = $revealMe.height();
    $revealMe.css({
        position: "relative",
        bottom: originalHeight,
    }).show().animate({
        top: 0,	        
    }, {
        duration: 400,
        step: function(now, fx) {
            if (fx.prop == "top") {
                $(fx.elem).scrollTop(now);
            }
        }
    });
}