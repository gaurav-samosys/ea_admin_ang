
// var url = window.location.protocol + "//" + window.location.host + "/tools_refresh/"; 
function add_debt(form_id){
var check_validation_val = check_validation(form_id,'');
if(check_validation_val)
{
$('#loading_add').css('display','block');
	var url1 = getWebroot()+"Tools/debt_register";
	$.ajax({    
	    type: 'POST',  
	    url: url1,  
	    data:$("#"+form_id).serialize(),  
	    success:function(data){
	   
	    window.location.assign(getWebroot()+"Tools");
	     $('#loading_add').css('display','none');
	    },
	    error: function(data) { 
	        // if error occured
	        
	    }
	    });
}

}
function delete_debt(val){
	if(confirm('Do You Want to Delete this?'))
	var url1 = getWebroot()+"Tools/delete_debt";
    $.post(url1,{"id":val},function(data){
   	 	window.location.assign(getWebroot()+"Tools");
    });
}
function Move_step(){
	$("#show_move_msg").html('<p style="color:red">You can not move other step without add any debt.</p>');
}

$(document).ready(function() {
  $('.flash_message').animate({opacity: 1.0}, 5000).fadeOut();  
});
function view_details_show(id){
	var url1 = getWebroot()+"Tools/show_calculate_value";
	$.post(url1,{"id":id},function(data){
		   	 	//window.location.assign(getWebroot()+"Tools");
		   	 	$("#show_details_calculate_"+id).html(data);
		    });
	$("#show_details_calculate_"+id).toggle();
}
function view_details_old_value_show(id){
	var url1 = getWebroot()+"Tools/show_calculate_value";
	$.post(url1,{"id":id},function(data){
		   	 	//window.location.assign(getWebroot()+"Tools");
		   	 	$("#show_details_old_value_"+id).html(data);
		    });
	$("#show_details_old_value_"+id).toggle();
}
function view_details_show_third_step(id){
var url1 = getWebroot()+"Tools/show_calculate_value_third";
	$.post(url1,{"id":id},function(data){
		
		   	 	//window.location.assign(getWebroot()+"Tools");
		   	 	$("#show_details_third_step_"+id).html(data);
		    });
$("#show_details_third_step_"+id).toggle();
}
function edit_third_step(id){
$("#edit_"+id).toggle();
}
function edit_debt(id){
	//$('#edit_submit_'+id).attr("disabled","true");
	
	var check_validation1 = check_validation('edit_form_debt_'+id,id);
	if(check_validation1)
	{
		$('#loading_'+id).css('display','block');
		var current_balance = $("#current_balance_"+id).val();
		var interest = $("#interest_"+id).val();
		var minimum_payment = $("#minimum_payment_"+id).val();
		var url1 = getWebroot()+"Tools/edit_debt_value";
	    $.post(url1,{"id":id,"new_current_balance":current_balance,"new_minimum_payment":minimum_payment,"new_interest":interest},function(data){
	   	  $('#loading_'+id).css('display','none');
	   	 	//$("#msform fieldset:not(:nth-of-type(2))").css("display", "none");
	   	 	window.location.assign(getWebroot()+"Tools");

	    });
	}    
}

/*slider*/
jQuery(document).ready(function ($) {

  $('#checkbox').change(function(){
    setInterval(function () {
        moveRight();
    }, 3000);
  });
  
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider').css({ width: slideWidth, height: slideHeight });
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

});    
jQuery(document).ready(function ($) {

  $('#checkbox_second_step').change(function(){
    setInterval(function () {
        moveRight();
    }, 3000);
  });
  
	var slideCount = $('#slider_second_step ul li').length;
	var slideWidth = $('#slider_second_step ul li').width();
	var slideHeight = $('#slider_second_step ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider_second_step').css({ width: slideWidth, height: slideHeight });
	
	$('#slider_second_step ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider_second_step ul li:last-child').prependTo('#slider1 ul');

    function moveLeft() {
        $('#slider_second_step ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider_second_step ul li:last-child').prependTo('#slider_second_step ul');
            $('#slider_second_step ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider_second_step ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider_second_step ul li:first-child').appendTo('#slider_second_step ul');
            $('#slider_second_step ul').css('left', '');
        });
    };

    $('a.control_prev_second_step').click(function () {
        moveLeft();
    });

    $('a.control_next_second_step').click(function () {
        moveRight();
    });

});    


 	
    $(document).ready(function(){
    var chart = new CanvasJS.Chart("chartContainer_principal",
    {
      title:{
        text: "<?php echo $principal_title; ?>"             
      }, 
      animationEnabled: true,     
      axisY:{
        titleFontFamily: "arial",
        titleFontSize: 12,
        includeZero: false
      },
      toolTip: {
        shared: false
      },
      data: <?php echo $final_json_encoded_graph_value; ?>,
      legend:{
        cursor:"pointer",
        itemclick:function(e){
          if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;            
          }
          chart.render();
        }
      }
    });

chart.render();
var chart = new CanvasJS.Chart("chartContainer_principal_paid",
    {
      title:{
        text: "<?=$principal_paid_title?>"             
      }, 
      animationEnabled: true,     
      axisY:{
        titleFontFamily: "arial",
        titleFontSize: 12,
        includeZero: false
      },
      toolTip: {
        shared: false
      },
      data: <?php echo $final_json_encoded_graph_value_principal_paid; ?>,
      legend:{
        cursor:"pointer",
        itemclick:function(e){
          if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;            
          }
          chart.render();
        }
      }
    });

chart.render();
    var chart = new CanvasJS.Chart("chartContainer_interest_paid",
    {
      title:{
        text: "<?=$interest_paid_title?>"             
      }, 
      animationEnabled: true,     
      axisY:{
        titleFontFamily: "arial",
        titleFontSize: 12,
        includeZero: false
      },
      toolTip: {
        shared: false
      },
      data: <?php echo $final_json_encoded_graph_value_intrest_paid; ?>,
      legend:{
        cursor:"pointer",
        itemclick:function(e){
          if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;            
          }
          chart.render();
        }
      }
    });

chart.render();
var chart = new CanvasJS.Chart("chartContainer_monthly_paid",
    {
      title:{
        text: "<?=$monthly_payment_title?>"             
      }, 
      animationEnabled: true,     
      axisY:{
        titleFontFamily: "arial",
        titleFontSize: 12,
        includeZero: false
      },
      toolTip: {
        shared: false
      },
      data: <?php echo $final_json_encoded_graph_value_monthly_payment; ?>,
      legend:{
        cursor:"pointer",
        itemclick:function(e){
          if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          }
          else {
            e.dataSeries.visible = true;            
          }
          chart.render();
        }
      }
    });

chart.render();


});
 
  window.onload = function (event) {
  	if(window.location.hash){
  		$("#msform fieldset:not(:nth-of-type(2))").css("display", "none");
  	}  
 }
function show_graph_principal(){
$("#chartContainer_principal").css('display','block');	
$("#chartContainer_principal_paid").css('display','none');	
$("#chartContainer_interest_paid").css('display','none');	
$("#chartContainer_monthly_paid").css('display','none');
}
function show_graph_principal_paid(){
$("#chartContainer_principal").css('display','none');	
$("#chartContainer_principal_paid").css('display','block');	
$("#chartContainer_interest_paid").css('display','none');	
$("#chartContainer_monthly_paid").css('display','none');	
}
function show_graph_interest_paid(){
	$("#chartContainer_principal").css('display','none');	
$("#chartContainer_principal_paid").css('display','none');	
$("#chartContainer_interest_paid").css('display','block');	
$("#chartContainer_monthly_paid").css('display','none');
}
function show_graph_monthly_payment(){
$("#chartContainer_principal").css('display','none');	
$("#chartContainer_principal_paid").css('display','none');	
$("#chartContainer_interest_paid").css('display','none');	
$("#chartContainer_monthly_paid").css('display','block');
}
