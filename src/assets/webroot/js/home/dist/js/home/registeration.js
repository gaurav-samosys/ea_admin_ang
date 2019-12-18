$(document).ready(function  (argument) {  
  //COMMENTING THE ORIGINAL VALIDATIONS
  //  $.dobPicker({
  //  daySelector: '#dobday',
  //  monthSelector: '#dobmonth',
  //  yearSelector: '#dobyear',
  //  dayDefault: 'Day',
  //  monthDefault: 'Month',
  //  yearDefault: 'Year',
  //  minimumAge: 12,
  //  maximumAge: 80
  //   });

  //  $("#userContactUsForm").validate({
  //     showErrors: function(errorMap, errorList) {
 //                $.each(this.validElements(), function (index, element) {
 //                    var $element = $(element);
 //                  $element.closest('.input-group').find('.error_box').remove();
 //                });
 //                $.each(errorList, function (index, error) {
 //                    var $element = $(error.element);            
 //                    var errortext = "<div class=\'error_box\'><p class=\'margin0 no-padding\'>"+error.message+"</p></div>";
 //                    if($element.closest('.input-group').find('.error_box').length  == 1){
 //                       $element.closest('.input-group').find('.error_box').remove();
 //                    }
 //                    $element.closest('.input-group').append(errortext); 
 //                    });
 //            },
 //             messages:{

 //             }
  //  });


  //  $.validator.addMethod('phone',function(value, element) {
  //   return this.optional(element) || /^\+?\d+$/.test(value);
  // }, "Please enter correct phone number");

  //   $.validator.addMethod('email-pattern',function(value, element) {
  //   return this.optional(element) || /^[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,3}|[.]{1}[a-zA-Z]{2,3}[.]{1}[a-zA-Z]{2,3})/.test(value);
  // }, "Please enter valid email address");

  //  $('#userContactUsForm input,#userContactUsForm select').each(function (argument) {
  //    var _msg = $(this).attr('error-required');
  //    if(_msg != '' && _msg != null){
  //    $(this).rules('add', {messages: {required: _msg } });
  //  }
  //  });

function checkClientId(){
  if($('#client_id').val() == ''){
    return false;
  }else{
    return true;
  }
}

$("#userContactUsForm").validate({
    onkeyup: false,
    rules : {
      email : {
        required: true,
        noSpace: true
      },
      first_name : {
        required: true,
        noSpace: true      
      },
      last_name : {
        required: true,
        noSpace: true
        
      },
      phone_no : {
        required: true,
        digits: true
      }
    },
   showErrors: function(errorMap, errorList) {
        $.each(this.validElements(), function (index, element) {
            var $element = $(element);
          $element.closest('.input-group').find('.error_box').remove();
        });
        $.each(errorList, function (index, error) {
            var $element = $(error.element);            
            var errortext = "<div class=\'error_box\'><p class=\'margin0 no-padding\'>"+error.message+"</p></div>";
            if($element.closest('.input-group').find('.error_box').length  == 1){
               $element.closest('.input-group').find('.error_box').remove();
            }
            $element.closest('.input-group').append(errortext); 
            });
    },
     messages:{
      email : {
        required : "Your e-mail is required!",
        // remote : function(){return $.validator.format("E-mail is already taken", $("email").val())}
        // remote_checkmail : "E-mail already exists!",
        // remote_checkdomain : "Please select client domain e-mail!"
      },
      first_name : {
        required : "Your first name is required!",
        lettersonly : "Your first name should contain alphabets only!"
      },
      last_name : {
        required : "Your last name is required!",
        lettersonly : "Your last name should contain alphabets only!"
      },
      phone_no : {
        required: "Your phone number is required!",
      }
     }
 });

$('#userContactUsForm input,#userContactUsForm select').each(function (argument) {
  var _msg = $(this).attr('error-required');
  if(_msg != '' && _msg != null){
    $(this).rules('add', {messages: {required: _msg } });
  }
});


  $.validator.addMethod("noSpace", function(value, element) { 
    return value.indexOf(" ") < 0; 
  }, "No spaces are allowed!");


$.validator.addMethod('email-pattern',function(value, element) {
  //if(this.optional(element) || /^[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,3}|[.]{1}[a-zA-Z]{2,3}[.]{1}[a-zA-Z]{2,3})/.test(value)){
  if(this.optional(element) || /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(value)){
  return true;
  }
},"Your e-mail address is not valid!");

$.validator.addMethod('pass-confirm', function(value, element){
  if($('#pass').val() == $('#cpass').val()){return true;}
}, "Your password did not match!");

$.validator.addMethod('pass-length', function(value, element){
  if(($('#pass').val()).length > 7){return true;}
}, "Your password should be atleast 8 characters!");


// $.validator.addMethod('email-domain', function(value, element){
//   return checkDomain()
// }, "Email domain not supported.");

$.validator.addMethod(
    "remote_checkdomain", function(value, element){
      var client = $('#client_id').val();
      if(client != '' ){
        res = $.ajax({url : 'checkCompanyDomain', data : {'email' : value, 'client_id' : client}, dataType : 'json', async : false}).success();
         if(res.responseJSON === true){return true;}
       }else{
          return true;
       }
    }, "Your e-mail should contain client's e-mail domain!");

$.validator.addMethod(
  "remote_checkmail",
  function(value,elemet){
    if($.trim(value) != ''){
      res = $.ajax({url : 'isMailExists', data : {email : $.trim(value)}, dataType : 'json', async : false}).success();
      if(res.responseJSON === true){return true;}
    }
  },"This e-mail already exist!");

$.validator.addMethod("check_id", function(value,element){
    if($('$client_id').val() != ''){return true;}
},"Please select client from dropdown!")

function checkDomain(){
    var client_id = $('#client_id').val();
    var email = $('#email').val();
     var data = 'false';
      $.ajax({
        url : 'checkCompanyDomain',
        type : 'POST',
        async: false,
        data : {'client_id' :  client_id, 'email' : email},
        success : function(res){
          data = res;
        }
      });
      return data;
 }

});

