function check_validation(form_id,edit_id,field_id){
	
	// Error varibale if varible true then break for submit
	var error = 0;
	var filds 		= $('#'+form_id).find('.req');
	var debt_type 	= $('#'+form_id).find('select.select_debt_type').val();
	
	filds.each(function() {
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
			
			// Edit form Validation
			if(edit_id != ''){
				var current_balance;var minimum_payment;
				minimum_payment = $("#minimum_payment_"+edit_id).val();
				minimum_payment = minimum_payment.replace("$","");
				current_balance = $("#current_balance_"+edit_id).val();
				current_balance = current_balance.replace("$","");
				current_balance = parseInt($.trim(current_balance)); 
				if(isNaN(current_balance)){
					current_balance = 0;
				}

				var interest 		= $("#interest_"+edit_id).val();
				var curr_month_day 	= $('.curr_month_day').val();
				var debt_type 		= $('.select_debt_type').val();

				// Check Interest
				if(interest >= 0 && interest <= 100){
					$('#error_interest_'+edit_id).html('');
				}else{
					$('#error_interest_'+edit_id).html('');
					$('#error_interest_'+edit_id).html('Interest value can\'t be less than 0 and greater than 100. ');
					error++; 
				}

				// Check Minimun Payment
				if(parseInt(minimum_payment) == 0){
					$("#minimum_payment_"+edit_id).addClass('error');
					$('#error_minimum_payment_'+edit_id).html('Minimum payment can not zero. we can not accept it.');   
					error++; 
				}else{
					var min_val = ((current_balance * interest * 1) / (12 * 100)); // For fixed payment
					min_val = min_val.toFixed(2); 
					
					// For revolving payment
					var debt_type = $('#debt_type_'+edit_id).val();
					if (debt_type == '8') {
						if( parseInt(current_balance) > parseInt(minimum_payment) ){
							$('#error_current_balance_'+edit_id).html('');
						}else{
							$('#error_current_balance_'+edit_id).html('Current payment can not less than minimum payment');
							error++; 
						}
						// For Car Loan
					} else if (debt_type == '3' || debt_type == '18') {
						if( parseInt(minimum_payment) > 0){
							$('#error_current_balance_'+edit_id).html('');
						}else{
							$('#error_current_balance_'+edit_id).html('Month can not less than 1 month');
							error++; 
						}
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
				// Add New Debt Validation
				var current_balance;var minimum_payment;
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
				
				// Check mini balance and current balnc 
				if(current_balance != "" && minimum_payment){
					if( parseInt(current_balance) > parseInt(minimum_payment) ){
						$('#error_current_balance').html('');
					}else{
						$('#error_current_balance').html('Current payment can not less than minimum payment');
						error++;
					}
				}

				var interest 		= $("#interest").val();
				var curr_month_day 	= $('.curr_month_day').val();
				var debt_type 		= $('.select_debt_type').val();

				// Minimun Balance
				if(parseInt(minimum_payment) == 0){
					$("#minimum_payment").addClass('error');
					$('#error_minimum_payment').html('Minimum payment can not zero. we can not accept it.');   
					error++; 
				}else{
					var min_val = ((current_balance * interest * 1) / (12 * 100)); // For fixed payment
					min_val = min_val.toFixed(2);

					// For revolving payment
					if (debt_type == '8') {
						var min_payment = current_balance*(interest/36500)*curr_month_day;
						min_val = min_payment.toFixed(2);
						// Car Loan
					} else if (debt_type == '3' || debt_type == '18') {
						if( parseInt(minimum_payment) > 0){
							$('#error_current_balance_'+edit_id).html('');
						}else{
							$('#error_current_balance_'+edit_id).html('Month can not less than 1 month');
							error++; 
						}
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

	// Check error is true than break form submittion
	if(error == 0 ){
		return true;
	}else{
		return false;
	}

}
// Check Validation End

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

function isNumberKey_current_balance(evt, formTag){
	
	var val = evt.replace('$','');

	if(val != ''){
		var debt_type 	= formTag.find('select[name="debt_type"]').val();
		// Car Loan
		if (debt_type == '3' || debt_type == '18') {
			if(isNaN(val)){
				$('#minimum_payment').val('');
				$('#error_minimum_payment').html('');
				$('#error_minimum_payment').html('Month must only be in numbers. ');
			}else{
				return true;
			}
		}else{
			if(isNaN(val)){
				$('#minimum_payment').val('');
				$('#error_minimum_payment').html('');
				$('#error_minimum_payment').html('Minimum payment must only be in numbers. ');
			}else{
				return true;
			}
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

function check_interest(value){}

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

function check_val1(value, formTag){

	var debt_type 	= formTag.find('select[name="debt_type"]').val();
	
	if(value != ''){
		if (debt_type != '3' || debt_type != '18') {
			if(value.replace('$','') != ''){
				if(value.indexOf('$') == -1){
					$('#minimum_payment').val('$'+value);
				}
			}else{
				$('#minimum_payment').val('');
			}
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


// console.log("<p>Browser CodeName: " + navigator.appCodeName + "</p>");
// console.log("<p>Browser Name: " + navigator.appName + "</p>");
// console.log("<p>Browser Version: " + navigator.appVersion + "</p>");
// console.log("<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>");
// console.log("<p>Platform: " + navigator.platform + "</p>");
// console.log("<p>User-agent header: " + navigator.userAgent + "</p>");


/**
 * Developer Work Start
 */
// debt type
// RULES div with class='debt_type_wrap' and data-type='8,5,*' * for all
function debt_type_validation(this_var, formTag){

	var debt_type = this_var.value;
	formTag.find('.debt_type_wrap').each(function(){
		var debtType = $(this).attr('data-type');
		if (debt_type == '') { debt_type = '*'; }
		
		var debtTypeArray = debtType.split(',');

		var has_debt_data = debtTypeArray.indexOf(debt_type) != -1;
		if(has_debt_data && debt_type != '') {
			$(this).slideDown();
			var inputType = $(this).find('input[type=text]');
			inputType.each(function(){
				var name = $(this).attr('data-name');
				$(this).attr('name', name);
			});
		}else{
			$(this).slideUp();
			var inputType = $(this).find('input[type=text]');
			inputType.each(function(){
				var name = $(this).attr('name');
				$(this).attr('data-name', name);
				$(this).attr('name', '');
			});
		}
	});

	if (debt_type == '8') {
		//formTag.find('[name="current_balance"]').attr('max', '99999');
		formTag.find('[name="current_balance"]').attr('maxlength', '5');
	}else{
		//formTag.find('[name="current_balance"]').removeAttr('max');
		formTag.find('[name="current_balance"]').attr('maxlength', '6');
	}

	setTimeout(function(){ formTag.find('[name="current_balance"]').trigger("change"); }, 100);
	//formTag.find('[name="minimum_payment"], [name="interest"], [name="current_balance"]').val('');

	// if (debt_type == '8') {
	// 	formTag.find('[name="minimum_payment"]').prop('disabled', true);
	// 	formTag.find('[name="minimum_payment"]').css('background-color', '#ccc');
	// }else{
	// 	formTag.find('[name="minimum_payment"]').prop('disabled', false);
	// 	formTag.find('[name="minimum_payment"]').css('background-color', '#fff');
	// }

}


/**
* Custom Jquery
*/

function validate_value(this_var) {
	var rem_val 	= $('#remaining_months').val();
	var total_val 	= $('#total_loan_term').val();
	if (total_val < rem_val) {
		$('#error_remaining_months').html('Remaining month can\'t be greate than total term');
	}else{
		$('#error_remaining_months').html('');
	}


}

function chk_curr_balance( formTag ){
	var current_balance = formTag.find('input[name="current_balance"]').val();
}


/**
 * Only Number Allow
 */
 function isNumber(thisTag, errorMsg){

 	var formTag 	= thisTag.parents('form');
 	var debt_type 	= formTag.find('select[name="debt_type"]').val();
 	var name 		= thisTag.attr('name');
 	var values 		= thisTag.val();
 	value 			= values.replace('$','');
 	var divExist 	= thisTag.next().is('.debtE_'+name);

 	var isValidNumber = /^\d{0,10}(\.\d{0,2})?$/.test(value);
 	// Check Validation
 	if (isValidNumber) {
 		thisTag.val('$'+value);
 	}else{
 		thisTag.val('');
 		if (divExist) {
 			thisTag.next('.debtE_'+name).html(errorMsg);
 		}else{
 			thisTag.after('<span class="error debtE_'+name+'">'+errorMsg+'</span>');
 		}
 	}

 }


// Remove Validation Error
function removeValidationError( thisTag ){

	var name 		= thisTag.attr('name');
	var nextDiv 	= thisTag.next('.debtE_'+name)
	var divExist 	= nextDiv.is('.debtE_'+name);

	if (divExist) {
		nextDiv.remove();
	}
}

// Add dollor in amount
function validateAmount( thisTag ){
	// var value = thisTag.value;
	// value = value.replace('$','');
	// thisTag.value = '$'+value;
}

// Remove dollor in amount
function removeDollor( thisTag ){
	// var value = thisTag.value;
	// value = value.replace('$','');
	// thisTag.value = value;
}