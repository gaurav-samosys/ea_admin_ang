  $(document).ready(function(){ 

 $("#userLoginForm").validate({
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

             }
     });
  $.validator.addMethod('email-pattern1',function(value, element) {
      return this.optional(element) || /^[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,3}|[.]{1}[a-zA-Z]{2,3}[.]{1}[a-zA-Z]{2,3})/.test(value);
    }, "Please enter valid email address");


    $("#searchEmailForm").validate(); 
    $('#termsCheck').val("1");
    $('#sub_Domain').hide();
});
$('#termsCheck').click(function()
{
    var isCheck = $('#termsCheck').val();
    if(isCheck == 1)
    {
        $('#termsCheck').val("2");
    }
    else
    {
        $('#termsCheck').val("1");
    }
});

$('.remove_setflash').click(function(){
        $('#flashMessage').css('display','none');
    })

