function check_validation(form_id,edit_id,field_id){
	var error = 0;
	var filds = $('#'+form_id).find('.req');
	var debt_type 	= $('#'+form_id).find('select.select_debt_type').val();
	filds.each(function(){
		var value = $(this).val();
		var id = $(this).attr('id');
		if((field_id != undefined) && (field_id != id)){
			return;
		}

		if(value == null || value.length <1|| value == 'NULL' ||value==""){
			$(this).addClass('error');
			$('#error_'+id).html('This field is required.');
			error++;
		}else{   
			$(this).removeClass('error');
			$('#error_'+id).html(''); 
			if(edit_id != ''){
				var current_balance;
				var minimum_payment;
				minimum_payment = $("#minimum_payment_"+edit_id).val();
				minimum_payment = minimum_payment.replace("$","");

				current_balance = $("#current_balance_"+edit_id).val();
				current_balance = current_balance.replace("$","");
				current_balance = parseInt($.trim(current_balance)); 
				if(isNaN(current_balance)){
					current_balance = 0;
				}

				var interest = $("#interest_"+edit_id).val();
				var curr_month_day = $('.curr_month_day').val();
				//var debt_type = $('.select_debt_type').val();

				if(interest >= 0 && interest <= 100){
					$('#error_interest_'+edit_id).html('');
				}else{
					$('#error_interest_'+edit_id).html('');
					$('#error_interest_'+edit_id).html('Interest value can\'t be less than 0 and greater than 100. ');
					error++; 
				}

				if(parseInt(minimum_payment) == 0){
					$("#minimum_payment_"+edit_id).addClass('error');
					$('#error_minimum_payment_'+edit_id).html('Minimum payment can not zero. we can not accept it.');   
					error++; 
				}else{
					var min_val = ((current_balance * interest * 1) / (12 * 100)); // For fixed payment
					min_val = min_val.toFixed(2); 
					// For revolving payment

					var debt_type_id = $('.select_debt_type_'+edit_id).val();
					if (debt_type_id == 8) {
						if( parseInt(current_balance) > parseInt(minimum_payment) ){
							$('#error_current_balance_'+edit_id).html('');
						}else{
							$('#error_current_balance_'+edit_id).html('Current payment can not less than minimum payment');
							error++; 
						}

						// if(parseInt(current_balance) <= parseInt(min_val)){
						// 	$('#error_current_balance').html('Current payment can not less than minimum payment');
						// }
					}else{
						if(parseInt(minimum_payment) >= parseInt(min_val)){
							if(parseInt(current_balance) >= parseInt(minimum_payment)){
								$("#minimum_payment_"+edit_id).removeClass('error');
								$('#error_minimum_payment_'+edit_id).html('');  
							}else{
								$("#minimum_payment_"+edit_id).addClass('error');
								$('#error_minimum_payment_'+edit_id).html('Minimum payment can not more than Current balance.');   
								error++;
							}
						}else{
							$("#minimum_payment_"+edit_id).addClass('error');
							$('#error_minimum_payment_'+edit_id).html('Your minimum payment is less than the interest being charged. It should be at least $'+ min_val+'.');   
							error++;  
						}
					}
				} 
			}else{
				var current_balance;
				var minimum_payment;
				minimum_payment = $("#minimum_payment").val();
				minimum_payment = minimum_payment.replace("$","");
				minimum_payment = parseInt(minimum_payment);

				current_balance = $("#current_balance").val();
				current_balance = current_balance.replace("$","");
				current_balance = parseInt(current_balance);
				if(isNaN(current_balance)){
					current_balance = 0;
				}

				var minimum = $('#minimum_payment').val();
				minimum_payment = minimum.replace("$","");
				var current = $('#current_balance').val();
				current_balance = current.replace("$","");
				if(current_balance != "" && minimum_payment){
					if( parseInt(current_balance) > parseInt(minimum_payment) ){
						$('#error_current_balance').html('');
					}else{
						$('#error_current_balance').html('Current payment can not less than minimum payment');
						error++;
					}
				}

				var interest = $("#interest").val();
				var curr_month_day = $('.curr_month_day').val();
				//var debt_type = $('.select_debt_type').val();

				if(parseInt(minimum_payment) == 0){
					$("#minimum_payment").addClass('error');
					$('#error_minimum_payment').html('Minimum payment can not zero. we can not accept it.');   
					error++; 
				}else{
					var min_val = ((current_balance * interest * 1) / (12 * 100)); // For fixed payment
					min_val = min_val.toFixed(2);
					console.log(debt_type);
					// For revolving payment
					if (debt_type == 8) {
						var min_payment = current_balance*(interest/36500)*curr_month_day;
						min_val = min_payment.toFixed(2);
						//$('#minimum_payment').val('10');
					}else{
						if(parseInt(minimum_payment) >= parseInt(min_val)){
							if(parseInt(current_balance) >= parseInt(minimum_payment)){
								$("#minimum_payment").removeClass('error');
								$('#error_minimum_payment').html('');  
							}else{
								$("#minimum_payment").addClass('error');                     
								$('#error_minimum_payment').html('Minimum payment can not more than Current balance.');   
								error++;
							}
						}else{
							$("#minimum_payment").addClass('error');                  
							$('#error_minimum_payment').html('Your minimum payment is less than the interest being charged. It should be at least $'+ min_val+'.');   
							error++;  
						}
					}
				} 
			}
		}
	});
if(error == 0 )
	return true;
else
	return false;
}

function remove_validation_error(id){
	$("#"+id).removeClass('error');
	$("#error_"+id).html('');
}

function isNumberKey(evt){
	var val = evt.replace('$','');
	if(val != ''){
		if(isNaN(val)){
			$('#current_balance').val('');
			$('#error_current_balance').html('');
			$('#error_current_balance').html('Current balance must only be in numbers. ');
		}else{
			return true;
		}
	}
}

function isNumberKey1(evt,id){
	var val = evt.replace('$','');
	if(val != ''){
		if(isNaN(val)){
			$('#current_balance_'+id).val('');
			$('#error_current_balance_'+id).html('');
			$('#error_current_balance_'+id).html('Current balance must only be in numbers. ');
		}else{
			return true;
		}
	}
}

function isNumberKey_current_balance(evt){
	var val = evt.replace('$','');
	if(val != ''){
		if(isNaN(val)){
			$('#minimum_payment').val('');
			$('#error_minimum_payment').html('');
			$('#error_minimum_payment').html('Minimum payment must only be in numbers. ');
		}else{
			return true;
		}
	}
}

function isNumberKey_current_balance1(evt,id){
	var val = evt.replace('$','');
	if(val != ''){
		if(isNaN(val)){
			$('#minimum_payment_'+id).val('');
			$('#error_minimum_payment_'+id).html('');
			$('#error_minimum_payment_'+id).html('Minimum payment must only be in numbers. ');
		}else{
			return true;
		}
	}
}

function check_interest(evt,value){
	console.log(evt)
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == 46){
        var inputValue = $("#floor").val();
        var count = (inputValue.match(/'.'/g) || []).length;
        if(count<1){
            if (inputValue.indexOf('.') < 1){
                return true;
            }
            return false;
        }else{
            return false;
        }
    }
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }
    return true;
}

function check_rate(){
	var value = document.getElementById('interest').value;
	if(value.match(/^[+]?\d*(\.\d+)?$/)){
		if(value == 0){
			return true;
		}
		if(value >= 0 && value <= 100){
			return true; 
		}else{
			$('#interest').val('');
			$('#error_interest').html('');
			$('#error_interest').html('Interest value can\'t be less than 0 and greater than 100. ');
		}
	}else{
		$('#interest').val('');
		$('#error_interest').html('');
		$('#error_interest').html('Interest value must only be in numbers. ');
	}
}

function check_rate_edit(value,id){
	if(value.match(/^[+]?\d*(\.\d+)?$/)){
		// if(value > 0 && value < 100)
		if(value == 0){
			return true;
		}
		if(value >= 0 && value <= 100){
			return true; 
		}else{ 
			$('#interest_'+id).val('');
			$('#error_interest_'+id).html('');
			$('#error_interest_'+id).html('Interest value can\'t be less than 0 and greater than 100. ');
		}
	}else{ 
		$('#interest_'+id).val('');
		$('#error_interest_'+id).html('');
		$('#error_interest_'+id).html('Interest value must only be in numbers. ');
	}
}

function checkLength_interest(){}

function checkLength_interest_edit(id){
	var fieldLength = document.getElementById('interest_'+id).value.length;
	var field_value = document.getElementById('interest_'+id).value;
	// Suppose u want 4 number of character
	if(fieldLength <= 5 && field_value <= 20){
		return true;
	}else{
		var str = document.getElementById('interest_'+id).value;
		str = str.substring(0, str.length - 1);
		document.getElementById('interest_'+id).value = str;
	}
}

function check_val(value){
	if(value != ''){
		if(value.replace('$','') != ''){
			if(value.indexOf('$') == -1){
				$('#current_balance').val('$'+value);
			}
		}else{
			$('#current_balance').val('');
		}
	}    
}



function check_edit_balance(value,id){
	if(value != ''){
		if(value.replace('$','') != ''){
			if(value.indexOf('$') == -1){
				$('#current_balance_'+id).val('$'+value);
			}
		}else{
			$('#current_balance_'+id).val('');
		}
	} 
}

function check_current_minimum(){
	var debt_type = $('.add_select_debt_type').val();
	if (debt_type == 8) {
		var minimum = $('#minimum_payment').val();
		minimum_payment = minimum.replace("$","");
		var current = $('#current_balance').val();
		current_balance = current.replace("$","");
		if(current_balance != '' && minimum_payment != ''){
			if( parseInt(current_balance) > parseInt(minimum_payment) ){
				$('#error_current_balance').html('');
			}else{
				$('#error_current_balance').html('Current payment can not less than minimum payment');
			}
		}
	}
}

function check_current_minimum_edit(id){
	var debt_type = $('.select_debt_type_'+id).val();
	if (debt_type == 8) {
		var minimum = $('#minimum_payment_'+id).val();
		minimum_payment = minimum.replace("$","");
		var current = $('#current_balance_'+id).val();
		current_balance = current.replace("$","");
		if(current_balance != '' && minimum_payment != ''){
			if( parseInt(current_balance) > parseInt(minimum_payment) ){
				$('#error_current_balance_'+id).html('');
			}else{
				$('#error_current_balance_'+id).html('Current payment can not less than minimum payment');
			}
		}
	}
}

function check_val1(value){
	if(value != ''){
		if(value.replace('$','') != ''){
			if(value.indexOf('$') == -1){
				$('#minimum_payment').val('$'+value);
			}
		}else{
			$('#minimum_payment').val('');
		}
	}  
}

function check_edit_min_balance(value,id){
	if(value != ''){
		if(value.replace('$','') != ''){
			if(value.indexOf('$') == -1){
				$('#minimum_payment_'+id).val('$'+value);
			}
		}else{
			$('#minimum_payment_'+id).val('');
		}
	}
}




/**
 * Developer Work Start
 */
// debt type

function debt_type_validation(this_var){

	var debt_id = this_var.value;

	if (debt_id == '8') {
		$('#minimum_payment').val('$10');
		$('#minimum_payment').attr('placeholder', '$10');
		$('#minimum_payment').prop('disabled', true);
		$('#error_minimum_payment').hide();
		$('.info-icon').show();
	}else{
		$('#minimum_payment').val('');
		$('#error_minimum_payment').show();
		$('#minimum_payment').prop('disabled', false);
		$('#minimum_payment').attr('placeholder', 'Current Minimum payment');
		$('.info-icon').hide();
	}

}