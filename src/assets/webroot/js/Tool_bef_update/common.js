// var url = window.location.protocol + "//" + window.location.host + "/pro1/enrich_tool/"; 
// var url = getWebroot();
function add_debt(form_id){
	var check_validation_val = check_validation(form_id,'');
	if(check_validation_val){
		$('#loading').show();
		var url1 = getWebroot()+"Tools/debt_register";
		$.ajax({    
			type: 'POST',  
			url: url1,  
			data:$("#"+form_id).serialize(),  
			success:function(data){
				var debt_type = $('#debt_type').val();
				//if (debt_type == '8') {
					window.location.assign(getWebroot()+"Tools/begin_debt");
				//}
				$('#loading').hide();
			},
			error: function(data) { 
				$('#loading').hide();
			}
		});
	}
}


function delete_debt(val){
	if(confirm('Do you really want to delete this?'))
	{
		var url1 = getWebroot()+"Tools/delete_debt";
		$('#loading').show();
		$.post(url1,{"id":val},function(data){
			location.reload();
			$('#loading').hide();
		});
	}
}

function edit_debt(id){
	$("#add-debt-popover"+id+", #tooltip-overlay"+id).css('display', 'table');
}

function edit_debt_value(id){
	var check_validation1 = check_validation('edit_debt'+id,id);
	if(check_validation1){
		$('#loading').show();
		var debt_name  = $('#name_'+id).val();
		var dedt_type = $('#debt_type_'+id).val();
		var current_balance = $("#current_balance_"+id).val();
		var interest = $("#interest_"+id).val();
		var minimum_payment = $("#minimum_payment_"+id).val();
		var url1 = getWebroot()+"Tools/edit_debt_value";
		$('#loading').show();
		$.post(url1,{"id":id,"new_debt_name":debt_name,"new_dedt_type":dedt_type,"new_current_balance":current_balance,"new_minimum_payment":minimum_payment,"new_interest":interest},function(data)
		{
			window.location.assign(getWebroot()+"Tools/begin_debt");
			$('#loading').hide();
		});
	}  
}

function copy_Debt(debt_name,debt_type,current_balance,minimum_pay,interest){
	var url1 = getWebroot()+"Tools/copy_debt_register";
	$('#loading').show();
	$.ajax({    
		type: 'POST',  
		url: url1,  
		data:({'name':debt_name,'debt_type':debt_type,'current_balance':current_balance,'minimum_payment':minimum_pay,'interest':interest}),  
		success:function(data){
			window.location.assign(getWebroot()+"Tools/begin_debt");
			$('#loading').hide();
		},
		error: function(data) {
			$('#loading').hide();
		}
	});
}


function reset_edit_form(id){
	$("#add-debt-popover"+id+", #tooltip-overlay"+id).css('display', 'none');
}

function reset_form(){
	document.getElementById("form_debt").reset();
	$('#error_name').html('');
	$('#error_debt_type').html('');
	$('#error_current_balance').html('');
	$('#error_minimum_payment').html('');
	$('#error_interest').html('');
}

function calculate_new_month(month_val,i_val,current_bal,interest_rate,total_old_month,debt_id,total_old_interest,total_old_debt,old_payoff){
	var url1 = getWebroot()+"Tools/calculate_debt_month"; 
	var array_val = $('#ids_array').val();
	var data1 = JSON.parse(array_val);
	var ajaxResponse;	var interest;	var months;	var replced_intrest;	var replced_month;	var total_save_interest = 0;	var total_save_months = 0;	var interest_calculate = 0;	var min_pay_calculate = 0;	var time_array = [];	var changed_interest;	var original_interest;	var changed_time;	var original_time;	var changed_min_pay;	var original_min_pay;	var explode_time;	var date;	var add_one_to_month;	var final_time;	var percent_val;
	
	$.ajax({
		type: 'POST',  
		url: url1,
		async: false,  
		data:({'old_payoff':old_payoff,'total_old_debt':total_old_debt,'total_old_interest':total_old_interest,'total_old_month':total_old_month,'month_val':month_val,'current_bal':current_bal,'interest':interest_rate,'debt_id':debt_id,'total_old_debt':total_old_debt}), 
		beforeSend: function( ) {
			$('#loading').show();
		},
		success:function(data){
			var data = JSON.parse(data);
			var minus_val = Math.abs(total_old_interest-data['total_interest']);
			var response_interest = Math.abs(data['total_interest']).toFixed(2);
			var new_interest = minus_val.toFixed(0);
			var new_interest1 = new_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			var ni = (total_old_interest-data['total_interest']);
			$('#save_interest'+debt_id).html('$'+new_interest1);
			if(ni >=0){
				$('#interest_title'+debt_id).html('INTEREST SAVED');
			}else{
				$('#interest_title'+debt_id).html('INTEREST ADDED');
			}

			$('#changed_interest'+debt_id).val('');
			$('#changed_interest'+debt_id).val(response_interest);
			$('#each_new_interest'+debt_id).val(ni);
			$('#each_new_saved_interest'+debt_id).val(ni);

			$('#changed_time'+debt_id).val('');
			$('#changed_time'+debt_id).val(data['month_name']);

			var old_total_month = $('#original_save_month'+debt_id).val();
			$('#each_new_month'+debt_id).val(data['month_count']);
			$('#each_new_saved_month'+debt_id).val(Number(old_total_month)-Number(data['month_count']));
			// TIME SAVED
			update_debt_crusher_time_saved();

			$('#changed_min_pay'+debt_id).val('');
			$('#changed_min_pay'+debt_id).val(data['minimum_pay']);
			$('#each_min_payments'+debt_id).val(data['minimum_pay']);

			$('#value'+i_val).val('');
			var neew_pay = data['minimum_pay'].toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			var neew_pay = neew_pay.split(".");
			var new_min_amt = Number(data['minimum_pay'])-Number(old_payoff);
			$('#value'+i_val).val("$"+new_min_amt.toLocaleString(undefined, {maximumFractionDigits:0}));
			$("#valuem"+i_val).val("$"+new_min_amt)
			ajaxResponse = data['minimum_pay'];
			percent_val = data['percent_val'];
			$('#percent_val'+debt_id).html('$'+data['minimum_pay'].toLocaleString(undefined, {maximumFractionDigits:0}));

			if(percent_val > 100){
				percent_val = 100;
			}else if(percent_val <= 0){
				percent_val = 0;
			}

			$('#percent'+debt_id).html(percent_val+'% paid');

			var new_month =  Math.abs(total_old_month-data['total_month']);
			var nw = (total_old_month-data['total_month']);
			$('#save_month'+debt_id).html(new_month+' months');
			if(nw >=0){
				$('#month_title'+debt_id).html('MONTHS SAVED');
			}else{
				$('#month_title'+debt_id).html('MONTHS ADDED');
			}

			$('#new_interest').val('');
			$('#new_payment').val('');
			$('#new_debt_free').val('');
			$('#final_debt_free_dt').val('');
			if(data1 != ''){
				for (var i = 0; i < data1.length; i++) {
					changed_interest = parseFloat($('#changed_interest'+data1[i]).val());
					if(changed_interest == ''){
						original_interest = parseFloat($('#original_interest'+data1[i]).val());
						interest_calculate +=original_interest;
					}else{
						interest_calculate +=changed_interest;
					}

					changed_time = $('#changed_time'+data1[i]).val();
					if(changed_time == '0'){
						original_time = $('#original_time'+data1[i]).val();
						explode_time = original_time.split(" ");
						date = new Date(explode_time[0]+" 10 "+explode_time[1]+" 00:00:00 GMT");
						time_array.push(date);
					}else{
						explode_time = changed_time.split(" ");
						date = new Date(explode_time[0]+" 10 "+explode_time[1]+" 00:00:00 GMT");
						time_array.push(date);
					}

					changed_min_pay = parseInt($('#changed_min_pay'+data1[i]).val());
					if(changed_min_pay == '0'){
						original_min_pay = parseInt($('#original_min_pay'+data1[i]).val());
						min_pay_calculate +=original_min_pay;
					}else{
						min_pay_calculate +=changed_min_pay;
					}

					interest = $('#save_interest'+data1[i]).html();
					interest = interest.replace(",", "");
					months = $('#save_month'+data1[i]).html();

					replced_intrest = interest.replace('$','');
					replced_intrest = parseFloat(replced_intrest);

					replced_month = months.replace(' months','');
					replced_month = parseInt(replced_month);
					total_save_interest= total_save_interest+replced_intrest;
					total_save_months = total_save_months+replced_month;
				}
			}
			var saved_interest = total_save_interest.toFixed(2);

			var saved_interest = saved_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');


			var cal_interest = interest_calculate.toFixed(0);
			cal_interest = cal_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			$('#new_interest').val('$'+Number(cal_interest).toLocaleString(undefined, {maximumFractionDigits:0}));

			min_pay_calculate = min_pay_calculate.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
			$('#new_payment').val('$'+min_pay_calculate);

			var max = '';
			for(var i=0; i<time_array.length; i++){
				if(time_array[i]>max){
					max=time_array[i];
				}
			}
			var monthNames = ["January", "February", "March", "April", "May", "June",   "July", "August", "September", "October", "November", "December" ];

			var months_val =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

			var short_month = months_val[max.getMonth()];
			var debt_free_month = monthNames[max.getMonth()];
			var debt_free_year = max.getFullYear();
			$('#new_debt_free').val(short_month+", "+debt_free_year);
			$('#final_debt_free_dt').val(debt_free_month+", "+debt_free_year);
			$('#final_saved_money').val(saved_interest);
			var months = parseInt(total_save_months%12); // Retutns reminder
			var year = parseInt(total_save_months/12); // Returns quotient
			if(year == 0){
				if(months == 1){
					$('#final_debt_free_month').val(months+" month");
				}else{
					$('#final_debt_free_month').val(months+" months");
				}
			}else if(months == 0){
				if(year == 1){
					$('#final_debt_free_month').val(year+" year");
				}else{
					$('#final_debt_free_month').val(year+" years");
				}
			}else{
				if(year == 1){ var year_nm = year+" year";}
				else{ var year_nm = year+" years"; }

				if(months == 1){ var month_nm = months+" month";}
				else{ var month_nm = months+" months"; }
				$('#final_debt_free_month').val(year_nm+" "+month_nm);
			}
			getsavedMonthMoney();
			$('#loading').hide();
		},
		error: function(data) { 
			$('#loading').hide();
		}
	});
$('.loader'+i_val).html('');
$('.loader'+i_val).circliful({
	animation: 1,
	animationStep: 10,
	foregroundBorderWidth: 15,
	backgroundBorderWidth: 15,
	foregroundColor : '#a0ba3b',
	backgroundColor : '#6399AE',
	percent: percent_val,
	textSize: 14,
	textStyle: 'font-size: 14px;',
	textColor: '#2d4058',

});
return ajaxResponse;
}

function calculate_new_debt(minimum_pay,i_val,current_bal,interest_rate,total_old_month,debt_id,total_old_interest,total_old_debt){
	var array_val 	= $('#ids_array').val();
	var url1 		= getWebroot()+"Tools/calculate_debt";
	var data1 		= JSON.parse(array_val);
	var ajaxResponse = '';
	var interest;
	var months;
	var replced_intrest;
	var replced_month;
	var total_save_interest = 0;
	var total_save_months = 0;
	var interest_calculate = 0;
	var min_pay_calculate = 0;
	var time_array = [];
	var changed_interest;
	var original_interest;
	var changed_time;
	var original_time;
	var changed_min_pay;
	var original_min_pay;
	var explode_time;
	var date;
	var add_one_to_month;
	var final_time;
	var percent_val;

	$.ajax({    
		type: 'POST',  
		url: url1,
		async: false,  
		data:({'minimum_payment':minimum_pay,'current_bal':current_bal,'interest':interest_rate,'debt_id':debt_id,'total_old_debt':total_old_debt}),
		beforeSend: function( ) {
			$('#loading').show();
		},
		success:function(data)
		{
			var data = JSON.parse(data);

			var minus_val = Math.abs(total_old_interest-data['total_interest']);
			var new_interest = minus_val.toFixed(0);
			var new_interest1 = new_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			var ni = (total_old_interest-data['total_interest']);
			$('#save_interest'+debt_id).html('$'+new_interest1);
			if(ni >=0){
				$('#interest_title'+debt_id).html('INTEREST SAVED');
			}else{
				$('#interest_title'+debt_id).html('INTEREST ADDED');
			}         
			$('#changed_interest'+debt_id).val('');
			$('#changed_interest'+debt_id).val(data['total_interest']);
			$('#each_new_interest'+debt_id).val(ni);
			$('#each_new_saved_interest'+debt_id).val(ni);

			$('#changed_time'+debt_id).val('');
			$('#changed_time'+debt_id).val(data['month_name']);
			$('#changed_min_pay'+debt_id).val('');
			$('#changed_min_pay'+debt_id).val(minimum_pay);
			$('#each_min_payments'+debt_id).val(minimum_pay);

			$('#duration'+i_val).val(data['total_month']);
			var total_old_month = $('#original_save_month'+debt_id).val();
			$('#each_new_month'+debt_id).val(data['total_month']);
			$('#each_new_saved_month'+debt_id).val(Number(total_old_month)-Number(data['total_month']));

			// TIME SAVED
			// var saved_month = 0;
			// $('input.each_new_saved_month').each(function(){
			//   var curr_month = Number($(this).val());
			//   saved_month += curr_month
			// });
			// // Update Time saved
			// var final_saved_month = saved_month;
			// var convert_month_to_year = (final_saved_month / 12 | 0) + " year " + final_saved_month % 12 +" month(s)";
			// jQuery('#time_saved').html(convert_month_to_year);
			update_debt_crusher_time_saved();

			ajaxResponse = data['total_month'];
			percent_val = data['percent_val'];
			$('#percent_val'+debt_id).html('$'+minimum_pay.toLocaleString(undefined, {maximumFractionDigits:0}));

			if(percent_val > 100){
				percent_val = 100;
			}else if(percent_val <= 0){
				percent_val = 0;
			}

			$('#percent'+debt_id).html(percent_val+'% paid');

			var new_month =  Math.abs(total_old_month-data['total_month']);
			var nw = (total_old_month-data['total_month']);
			$('#save_month'+debt_id).html(new_month+' months');
			if(nw >=0){
				$('#month_title'+debt_id).html('MONTHS SAVED');
			}else{
				$('#month_title'+debt_id).html('MONTHS ADDED');
			}

			$('#new_interest').val('');
			$('#new_payment').val('');
			$('#new_debt_free').val('');
			$('#final_debt_free_dt').val('');

			if(data1 != ''){
				for (var i = 0; i < data1.length; i++) {
					changed_interest = parseFloat($('#changed_interest'+data1[i]).val());
					if(changed_interest == '0'){
						original_interest 	= parseFloat($('#original_interest'+data1[i]).val());
						interest_calculate +=original_interest;
					}else{
						interest_calculate +=changed_interest;
					}

					changed_time = $('#changed_time'+data1[i]).val();
					if(changed_time == '0'){
						original_time 	= $('#original_time'+data1[i]).val();
						explode_time 	= original_time.split(" ");
						date 			= new Date(explode_time[0]+" 10 "+explode_time[1]+" 00:00:00 GMT");
						time_array.push(date);
					}else{ 
						explode_time = changed_time.split(" ");
						date = new Date(explode_time[0]+" 10 "+explode_time[1]+" 00:00:00 GMT");
						time_array.push(date);
					}

					changed_min_pay = parseInt($('#changed_min_pay'+data1[i]).val());
					if(changed_min_pay == '0'){
						original_min_pay = parseInt($('#original_min_pay'+data1[i]).val());
						min_pay_calculate +=original_min_pay;
					}else{
						min_pay_calculate +=changed_min_pay;
					}

					interest = $('#save_interest'+data1[i]).html();
					interest = interest.replace(",", "");
					months = $('#save_month'+data1[i]).html();

					replced_intrest = interest.replace('$','');
					replced_intrest = parseFloat(replced_intrest);

					replced_month = months.replace(' months','');
					replced_month = parseInt(replced_month);

					total_save_interest= total_save_interest+replced_intrest;
					total_save_months = total_save_months+replced_month;
				}
			}

			var saved_interest = total_save_interest.toFixed(2);
			var saved_interest = saved_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

			var cal_interest = interest_calculate.toFixed(0);
			cal_interest = cal_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

			min_pay_calculate = min_pay_calculate.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

			var max = '';
			for(var i=0; i<time_array.length; i++){
				if(time_array[i]>max)
					max=time_array[i];
			}
			var monthNames = ["January", "February", "March", "April", "May", "June",   "July", "August", "September", "October", "November", "December" ];

			var months_val =  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			var short_month = months_val[max.getMonth()];

			var debt_free_month = monthNames[max.getMonth()];
			var debt_free_year = max.getFullYear();
			$('#new_debt_free').val(short_month+", "+debt_free_year);
			$('#final_debt_free_dt').val(debt_free_month+", "+debt_free_year);
			$('#new_payment').val('$'+min_pay_calculate);

			$('#final_debt_free_month').val('');
			$('#final_saved_money').val('');
			$('#new_interest').val('$'+Number(cal_interest).toLocaleString(undefined, {maximumFractionDigits:0}));
			$('#final_saved_money').val(saved_interest);

			var months = parseInt(total_save_months%12); // Retutns reminder
			var year = parseInt(total_save_months/12); // Returns quotient
			if(year == 0){
				if(months == 1){
					$('#final_debt_free_month').val(months+" month");
				}else{
					$('#final_debt_free_month').val(months+" months");
				}
			}else if(months == 0){
				if(year == 1){
					$('#final_debt_free_month').val(year+" year");
				}else{
					$('#final_debt_free_month').val(year+" years");
				}
			}else{
				if(year == 1){ var year_nm = year+" year";}
				else{ var year_nm = year+" years"; }
				if(months == 1){ var month_nm = months+" month";}
				else{ var month_nm = months+" months"; }
				$('#final_debt_free_month').val(year_nm+" "+month_nm);
			}
			getsavedMonthMoney();
			$('#loading').hide();
		}
	});
$('.loader'+i_val).html('');
$('.loader'+i_val).circliful({
	animation: 1,
	animationStep: 10,
	foregroundBorderWidth: 15,
	backgroundBorderWidth: 15,
	foregroundColor : '#a0ba3b',
	backgroundColor : '#6399AE',
	percent: percent_val,
	textSize: 14,
	textStyle: 'font-size: 14px;',
	textColor: '#2d4058',

});
return ajaxResponse;


}

function calculate_new_formula(new_date,old_date)
{
	var url1 = getWebroot()+"Tools/calculate_new_formula";
	$.ajax({    
		type: 'POST', 
		url: url1,  
		data:({'new_date':new_date,'old_date':old_date}),
		beforeSend: function( ) {
			$('#loading').show();
		},  
		success:function(data)
		{
			if(data != '')
			{
				var data = JSON.parse(data);
				var debt_id;
				var minus_val;
				var new_interest;
				var new_month;
				var changed_interest;
				var original_interest;
				var changed_min_pay;
				var original_min_pay;
				var interest;
				var months;
				var year;
				var replced_intrest;
				var replced_month;
				var months;
				var new_interest1;
				var neew_pay;
				var percent_val;
				var original_debt;
				var original_save_month;
				var original_slider_pay_min;
				var min_pay_slider = 0;
				var month_per = 0;
				var total_save_interest = 0;
				var total_save_months = 0;
				var interest_calculate = 0;
				var min_pay_calculate = 0; 

				for (var i = 0; i < data.length; i++) 
				{
					debt_id = data[i].debt_id;
					percent_val = data[i].percent_val;
					minus_val = Math.abs(data[i].old_interest-data[i].new_interest);
					new_interest = minus_val.toFixed(0);
					new_interest1 = new_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					var ni = (data[i].old_interest-data[i].new_interest);
					$('#save_interest'+debt_id).html('$'+new_interest1);
					if(ni >=0){
						$('#interest_title'+debt_id).html('INTEREST SAVED');
					}else{
						$('#interest_title'+debt_id).html('INTEREST ADDED');
					}

					new_month =  Math.abs(data[i].total_months-data[i].month_count);
					var nw = (data[i].total_months-data[i].month_count);
					$('#save_month'+debt_id).html(new_month+' months');
					if(nw >=0){
						$('#month_title'+debt_id).html('MONTHS SAVED');
					}else{
						$('#month_title'+debt_id).html('MONTHS ADDED');
					}

					neew_pay = (data[i].min_pay).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					neew_pay = neew_pay.split(".");

					original_debt = $('#original_debt'+debt_id).val();
					original_save_month =$('#original_save_month'+debt_id).val();
					original_slider_pay_min = $('#original_slider_pay_min'+debt_id).val();

					min_pay_slider = 100 * (data[i].min_pay - original_slider_pay_min) / 
					(original_debt - original_slider_pay_min);

					month_per = 100 * (data[i].month_count - 1) / (original_save_month - 1);

					$('.new_min_pay'+debt_id).val("$"+neew_pay[0].toLocaleString(undefined, {maximumFractionDigits:0}));
					$('.new_min_paym'+debt_id).val("$"+neew_pay[0]);
					$('.new_duration'+debt_id).val(data[i].month_count);
					$('#changed_interest'+debt_id).val(data[i].new_interest);

					$('#each_new_interest'+debt_id).val(ni);
					$('#each_new_saved_interest'+debt_id).val(ni);

					$('#changed_min_pay'+debt_id).val(data[i].min_pay);
					$('#percent_val'+debt_id).html('$'+data[i].min_pay.toLocaleString(undefined, {maximumFractionDigits:0}));

					if(percent_val > 100){
						percent_val = 100;
					}else if(percent_val <= 0){
						percent_val = 0;
					}

					$('#percent'+debt_id).html(percent_val+'% paid');

					changed_interest = parseFloat($('#changed_interest'+debt_id).val());
					if(changed_interest == '0')
					{
						original_interest = parseFloat($('#original_interest'+debt_id).val());
						interest_calculate +=original_interest;
					}
					else
					{
						interest_calculate +=changed_interest;
					}

					changed_min_pay = parseInt($('#changed_min_pay'+debt_id).val());
					if(changed_min_pay == '0')
					{
						original_min_pay = parseInt($('#original_min_pay'+debt_id).val());
						min_pay_calculate +=original_min_pay;
					}
					else
					{
						min_pay_calculate +=changed_min_pay;
					}

					interest = $('#save_interest'+debt_id).html();
					interest = interest.replace(",", "");
					months = $('#save_month'+debt_id).html();

					$('#circle'+debt_id).html('');
					$('#circle'+debt_id).circliful({
						animation: 1,
						animationStep: 10,
						foregroundBorderWidth: 15,
						backgroundBorderWidth: 15,
						foregroundColor : '#a0ba3b',
						backgroundColor : '#6399AE',
						percent: percent_val,
						textSize: 14,
						textStyle: 'font-size: 14px;',
						textColor: '#2d4058',

					});

					if(month_per > 100){
						month_per = 100;
					}else if(month_per <= 0){
						month_per = 0;
					}

					if(min_pay_slider > 100){
						min_pay_slider = 100;
					}else if(min_pay_slider <= 0){
						min_pay_slider = 0;
					}

					$("#slide"+debt_id+" .ui-slider-handle").css({"left":month_per+'%'});
					$("#slider"+debt_id+" .ui-slider-handle").css({"left":min_pay_slider+'%'});
					$("#slide"+debt_id+" .ui-widget-header").css({'width':month_per+'%'});
					$("#slider"+debt_id+" .ui-widget-header").css({'width':min_pay_slider+'%'});

					replced_intrest = interest.replace('$','');
					replced_intrest = parseFloat(replced_intrest);

					replced_month = months.replace(' months','');
					replced_month = parseInt(replced_month);

					total_save_interest +=replced_intrest;
					total_save_months +=replced_month; 

					$('#changed_time'+debt_id).val(data[i].month_name);
				}

				var saved_interest = total_save_interest.toFixed(2);
				var saved_interest = saved_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');



				var cal_interest = interest_calculate.toFixed(0);
				var cal_interest = cal_interest.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

				min_pay_calculate = min_pay_calculate.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

				months = parseInt(total_save_months%12); // Retutns reminder
				year = parseInt(total_save_months/12); // Returns quotient
				if(year == 0){
					if(months == 1){
						$('#final_debt_free_month').val(months+" month");
					}else{
						$('#final_debt_free_month').val(months+" months");
					}
				}
				else if(months == 0){
					if(year == 1){
						$('#final_debt_free_month').val(year+" year");
					}else{  
						$('#final_debt_free_month').val(year+" years");
					}
				}
				else
				{
					if(year == 1){ var year_nm = year+" year";}
					else{ var year_nm = year+" years"; }

					if(months == 1){ var month_nm = months+" month";}
					else{ var month_nm = months+" months"; }
					$('#final_debt_free_month').val(month_nm);
				}
				$('#new_interest').val('$'+cal_interest.toLocaleString(undefined, {maximumFractionDigits:0}));
				$('#new_payment').val('$'+min_pay_calculate);
				$('#final_saved_money').val(saved_interest);
				$('#final_debt_free_dt').val(new_date);
				getsavedMonthMoney();
			}
			$('#loading').hide();
		},
		error: function(data) { 
			$('#loading').hide();
// if error occured
}
});
}

function getsavedMonthMoney(){
	var old_debt_free_date = $('#old_debt_free_date').html();
	var new_debt_free_date = $('#new_debt_free').val();
	if(old_debt_free_date == '' || old_debt_free_date == undefined){
//$('#time_saved').html('O Month');
}else{
	var d = old_debt_free_date.split(',');
	var yr = d[1].replace(' ','');
	var mnth = d[0].replace(' ','');

	var old_d =  new Date(mnth+" 10 "+yr+" 00:00:00 GMT");
//var old_d = new Date(mnth+' '+yr+' 10');

var d1 = new_debt_free_date.split(',');
var yr1 = d1[1].replace(' ','');
var mnth1 = d1[0].replace(' ','');
var new_d =  new Date(mnth1+" 10 "+yr1+" 00:00:00 GMT");
//var new_d = new Date(mnth+' '+yr+' 10');
var month_dif = (new_d.getFullYear() - old_d.getFullYear())*12 + (new_d.getMonth() - old_d.getMonth());
var dtxt = '';
if(month_dif > 0){
	dtxt = 'TIME ADDED';
}else{
	dtxt = 'TIME SAVED';
}
month_dif = Math.abs(month_dif);
var dtstr = '';
var sYear = parseInt(month_dif / 12);
var sMonth = parseInt(month_dif % 12);
if(sYear > 0){
	dtstr = sYear+' year(s) '+sMonth+' month(s)';
}else{
	dtstr = sMonth+' month(s)';
}


$('#timesaved-text').html(dtxt);
//$('#time_saved').html(dtstr);
//$('#totalSavedMonths').val(dtstr);
}
var old_intrest = $('#old_intrest').html();
old_intrest = old_intrest.replace('$', '');
old_intrest = old_intrest.replace(',', '');
old_intrest = old_intrest.replace(' ', '');
old_intrest = parseFloat(old_intrest);
var new_intrest = $('#new_interest').val();
new_intrest = new_intrest.replace('$', '');
new_intrest = new_intrest.replace(',', '');
new_intrest = new_intrest.replace(' ', '');
new_intrest = parseFloat(new_intrest);
var intrest_diff =  Math.abs(new_intrest - old_intrest);
intrest_diff = intrest_diff.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
var stxt = '';
// if(new_intrest > old_intrest){
// 	stxt = 'MONEY ADDED';
// }else{
// 	stxt = 'MONEY SAVED';
// }
// $('#moneysaved-text').html(stxt);
//$('#money_saved').html(intrest_diff);
update_debt_crusher_money_saved();
}


function calculate_revolving_by_additional_payment(old_data_array,new_data_array, slider_id){

	if (old_data_array) {

		old_data_array      = old_data_array[0];
		curr_balance        = old_data_array.curr_balance;
		interest_rate       = old_data_array.interest_rate;
		old_total_month     = old_data_array.old_total_month;
		old_total_interest  = old_data_array.old_total_interest;
		debt_id             = old_data_array.debt_id;
		old_all_interest    = old_data_array.old_all_interest;
		old_all_min_payment = old_data_array.old_all_min_payment;
		def_min_payment     = old_data_array.min_payment;
		original_min_payment  = old_data_array.min_payment;
		min_payment         = 10;

		// New data
		new_data_array      = new_data_array[0];
		additional_bal      = new_data_array.additional_bal;

		var min_pay_with_old_additional = Number(min_payment)+Number(additional_bal);

		if (additional_bal > 0) {
			var curr_balance_loops     = old_data_array.curr_balance;
			var curr_balance_loop      = curr_balance_loops;
			var min_payment            = additional_bal+min_payment;
			var per_month_interest     = 0;
			var new_total_interest     = 0;

			for (i = 0; curr_balance_loop >= 0; i++) {
				per_month_interest   = curr_balance_loop*(interest_rate/36500)*30;
				new_total_interest   = new_total_interest+per_month_interest;
				curr_balance_loop    = curr_balance_loop-min_payment;
			}

			// New Month
			var new_total_month = i;
			// Update Additional Amount
			if (min_payment >= curr_balance) {
				new_total_month = 1;
			}
			jQuery('input.new_min_pay'+debt_id).val('$'+additional_bal.toLocaleString(undefined, {maximumFractionDigits:0}));
			jQuery('input.new_min_paym'+debt_id).val('$'+min_pay_with_old_additional);

			// Update New Month Payoff
			jQuery('input.new_duration'+debt_id).val(new_total_month);
			convert_num_of_month_to_date(new_total_month, debt_id);
			// Update Save Month
			var final_saved_month = old_total_month-new_total_month;
			jQuery('#save_month'+debt_id).html(final_saved_month.toFixed(0)+' Months');
			// Update Save Interest
			var new_save_interests = old_total_interest-new_total_interest;
			new_save_interest = new_save_interests;
			jQuery('#save_interest'+debt_id).html('$'+new_save_interest.toLocaleString(undefined, {maximumFractionDigits:0}));
			jQuery('#changed_interest'+debt_id).val(new_total_interest.toFixed(2));

			// Update all saved Interest

			$('input#each_new_saved_interest'+debt_id).val(new_save_interests);

			$('input#each_new_interest'+debt_id).val(new_save_interests);
			var total_all_intrst = Number('0');
			jQuery('input.each_new_interest').each(function(){
				var curr_int_val = Number($(this).val());
				total_all_intrst = total_all_intrst+curr_int_val;
			});
			var final_interest = total_all_intrst.toFixed(0);
			var final_saved_intrst = Number(old_all_interest) - Number(final_interest);
			jQuery('#new_interest').val('$'+Number(final_saved_intrst).toLocaleString(undefined, {maximumFractionDigits:0}));
			// New Interest
			var final_saved_money = Number(old_all_interest) - Number(final_interest);
			// jQuery('#money_saved').html(final_saved_money.toLocaleString());
			// jQuery('#final_saved_money').val(final_saved_money.toLocaleString());


			// Saved Month
			$('input#each_new_saved_month'+debt_id).val(final_saved_month);
			// TIME SAVED
			// var saved_month = 0;
			// $('input.each_new_saved_month').each(function(){
			//   var curr_month = Number($(this).val());
			//   saved_month += curr_month
			// });
			// // Update Time saved
			// var final_saved_month = saved_month;
			// var convert_month_to_year = (final_saved_month / 12 | 0) + " year " + final_saved_month % 12 +" month(s)";
			// jQuery('#time_saved').html(convert_month_to_year);
			update_debt_crusher_time_saved();
			update_debt_crusher_money_saved();

			$('input#each_new_month'+debt_id).val(new_total_month);
			var new_tot_month = Number('0');
			var i = 0;
			$('input.each_new_month').each(function(){
				var curr_month = Number($(this).val());
				if (i < curr_month) {
					i = curr_month;
				}
			});

			convert_num_of_month_to_dates(i);

			// Update All New Payment
			var new_min_payment = Number(min_payment)-Number('10');
			var final_new_payment = Number(def_min_payment)+Number(new_min_payment);
			$('input#each_min_payments'+debt_id).val(final_new_payment.toFixed(0));
			$('#changed_min_pay'+debt_id).val(final_new_payment.toFixed(0));

			var total_min_val = Number('0');
			$('input.each_min_payments').each(function(){
				var curr_val = Number($(this).val());
				total_min_val = total_min_val+curr_val;
			});

			//$('input#new_payment').val('$'+total_min_val.toLocaleString(undefined, {maximumFractionDigits:0}));

			// Update All New Payment
			$('input#new_payment').val('$'+total_min_val.toLocaleString(undefined, {maximumFractionDigits:0}));

			var month_per = 100 * (new_total_month - 1) / (old_total_month - 1);
			if(month_per > 100){
				month_per = 100;
			}else if(month_per <= 0){
				month_per = 0;
			}
			$(".slide"+slider_id+" .ui-slider-handle").css({"left":month_per+'%'});
			$(".slide"+slider_id+" .ui-widget-header").css({'width':month_per+'%'});

			var cal_percentage = (additional_bal / curr_balance) * 100;
			if (cal_percentage >= 100) {
				cal_percentage = 100;
			}else{
				cal_percentage = cal_percentage.toFixed(0);
			}

			jQuery('#percent'+debt_id).html(cal_percentage+'% Paid');

			var circul_val = original_min_payment+additional_bal;
			jQuery('#percent_val'+debt_id).html('$'+circul_val.toLocaleString(undefined, {maximumFractionDigits:0}));

			$('.loader'+slider_id).html('');
			$('.loader'+slider_id).circliful({
				animation: 1,
				animationStep: 10,
				foregroundBorderWidth: 15,
				backgroundBorderWidth: 15,
				foregroundColor : '#a0ba3b',
				backgroundColor : '#6399AE',
				percent: cal_percentage,
				textSize: 14,
				textStyle: 'font-size: 14px;',
				textColor: '#2d4058',
			});

		}else{

			// Update Additional Amount
			jQuery('input.new_min_pay'+debt_id).val('$'+additional_bal.toLocaleString(undefined, {maximumFractionDigits:0}));
			// Update New Month Payoff
			jQuery('input.new_duration'+debt_id).val(old_total_month);
			// Update Save Month
			jQuery('#save_month'+debt_id).html('0 Months');
			// Update Save Interest
			jQuery('#save_interest'+debt_id).html('$0');
			// Update all saved Interest
			jQuery('input#each_new_interest'+debt_id).val('0');
			// Update all saved Interest
			jQuery('input#each_new_saved_interest'+debt_id).val('0');
			// Saved Month
			jQuery('input#each_new_saved_month'+debt_id).val('0');
			
			var month_per = 100 * (old_total_month - 1) / (old_total_month - 1);
			if(month_per > 100){
				month_per = 100;
			}else if(month_per <= 0){
				month_per = 0;
			}
			$(".slide"+slider_id+" .ui-slider-handle").css({"left":month_per+'%'});
			$(".slide"+slider_id+" .ui-widget-header").css({'width':month_per+'%'});

			var cal_percentage = (additional_bal / curr_balance) * 100;
			if (cal_percentage >= 100) {
				cal_percentage = 100;
			}else{
				cal_percentage = cal_percentage.toFixed(0);
			}

			jQuery('#percent'+debt_id).html(cal_percentage+'% Paid');

			var circul_val = original_min_payment+additional_bal;
			jQuery('#percent_val'+debt_id).html('$'+circul_val.toLocaleString(undefined, {maximumFractionDigits:0}));

			$('.loader'+slider_id).html('');
			$('.loader'+slider_id).circliful({
				animation: 1,
				animationStep: 10,
				foregroundBorderWidth: 15,
				backgroundBorderWidth: 15,
				foregroundColor : '#a0ba3b',
				backgroundColor : '#6399AE',
				percent: cal_percentage,
				textSize: 14,
				textStyle: 'font-size: 14px;',
				textColor: '#2d4058',
			});

			update_debt_crusher_time_saved();
			update_debt_crusher_money_saved();
		}
	}
}


function convert_num_of_month_to_dates(value){

	if(value){
		var url1 = getWebroot()+"Tools/get_date_by_num_of_month";
		$.ajax({    
			type: 'POST',  
			url: url1,
			dataType: "json",
			data: ({'number_of_month':value}),
			success:function(data){
				var new_date = data;
				$('#new_debt_free').val(new_date.date);
				$('#final_debt_free_dt').val(new_date.date);
			},
			error: function(data) {
			}
		});
	}
}


function convert_num_of_month_to_date(number_of_month, debt_id=""){

	if(number_of_month){
		var url1 = getWebroot()+"Tools/get_date_by_num_of_month";
		$.ajax({    
			type: 'POST',  
			url: url1,
			dataType: "json",
			data: ({'number_of_month':number_of_month}),
			success:function(data){
				var new_date = data;
				if (debt_id) {
					jQuery('#changed_time'+debt_id).val(new_date.date);
				}
			},
			error: function(data) {
			}
		});
	}
}


// Update Final Debt Crusher Saved Time

function update_debt_crusher_time_saved(){

	var saved_month = 0;
	$('input.each_new_saved_month').each(function(){
		saved_month += Number($(this).val());
	});
	// Update Time saved
	var final_saved_month = saved_month;
	if (final_saved_month <= 11) {
		var convert_month_to_year = final_saved_month+" month(s)";
		var convert_month_to_name = final_saved_month+" month(s)";
	}else{
		var convert_month_to_year = (final_saved_month / 12 | 0) + " year " + final_saved_month % 12 +" month(s)";
		var convert_month_to_name = (final_saved_month / 12 | 0) + " years ";
	}
	jQuery('#totalSavedMonths').val(convert_month_to_name);
	jQuery('#time_saved').html(convert_month_to_year);
	jQuery('#final_debt_free_month').val(convert_month_to_year);

}


// Update Final Debt Crusher Saved Money

function update_debt_crusher_money_saved(){

	var total_new_saved_intrst = Number('0');
	jQuery('input.each_new_saved_interest').each(function(){
		var curr_ints_val = Number($(this).val());
		total_new_saved_intrst += curr_ints_val;
	});

	// Update Saved Interest
	if (total_new_saved_intrst > 0) {
		//var final_saved_money = (total_old_interest-total_new_intrst);
		jQuery('#money_saved').html(total_new_saved_intrst.toLocaleString(undefined, {maximumFractionDigits:0}));
		jQuery('#final_saved_money').val(total_new_saved_intrst.toFixed(0));	
	}else{
		jQuery('#money_saved').html('0');
		jQuery('#final_saved_money').val('0');
	}

}



// Update Common Section
function update_debt_crusher_common_section(){

	var saved_month = 0;
	$('input.each_new_saved_month').each(function(){
		saved_month += Number($(this).val());
	});
	// Update Time saved
	var final_saved_month = saved_month;
	if (final_saved_month <= 11) {
		var convert_month_to_year = final_saved_month+" month(s)";
		var convert_month_to_name = final_saved_month+" month(s)";
	}else{
		var convert_month_to_year = (final_saved_month / 12 | 0) + " year " + final_saved_month % 12 +" month(s)";
		var convert_month_to_name = (final_saved_month / 12 | 0) + " years ";
	}
	jQuery('#totalSavedMonths').val(convert_month_to_name);
	jQuery('#time_saved').html(convert_month_to_year);
	jQuery('#final_debt_free_month').val(convert_month_to_year);



	var total_new_saved_intrst = Number('0');
	jQuery('input.each_new_saved_interest').each(function(){
		var curr_ints_val = Number($(this).val());
		total_new_saved_intrst += curr_ints_val;
	});

	// Update Saved Interest
	if (total_new_saved_intrst > 0) {
		jQuery('#money_saved').html(total_new_saved_intrst.toLocaleString(undefined, {maximumFractionDigits:0}));
		jQuery('#final_saved_money').val(total_new_saved_intrst.toFixed(0));	
	}else{
		jQuery('#money_saved').html('0');
		jQuery('#final_saved_money').val('0');
	}


	/**
	 * Header Section Calculation
	 */

	// Update Totoa New Interest
	var total_all_intrst = Number('0');
	 jQuery('input.each_new_interest').each(function(){
	 	var curr_int_val = Number($(this).val());
	 	total_all_intrst = total_all_intrst+curr_int_val;
	 });
	 var final_interest = total_all_intrst;
	 jQuery('#new_interest').val('$'+final_interest.toLocaleString(undefined, {maximumFractionDigits:0}));

	// Update Header Section Free date
	var i = 0;
	$('input.each_new_month').each(function(){
		var curr_month = Number($(this).val());
		if (i < curr_month) {
			i = curr_month;
		}
	});
	convert_num_of_month_to_dates(i);

	// Update Header Setion MIN Pay
	var total_min_val = Number('0');
	$('input.each_min_payments').each(function(){
		var curr_val = Number($(this).val());
		total_min_val = total_min_val+curr_val;
	});
	$('input#new_payment').val('$'+total_min_val.toLocaleString(undefined, {maximumFractionDigits:0}));

}