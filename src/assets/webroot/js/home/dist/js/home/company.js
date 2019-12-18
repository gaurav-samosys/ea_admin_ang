$(function() {
   var webroot = getWebroot();
   var initbasepath = getinitbasepath();
   $('input').val('');
   $("#search-box").autocomplete({
      minLength: 0,
      source:webroot+"home/getCompanies",
      focus: function( event, ui ) {
         $( "#search-box" ).val( ui.item.label );
            return false;
         },
      select: function( event, ui ) {
         $( "#search-box" ).val( ui.item.label );
         $( "#search-box-hidden" ).val( ui.item.value );
         return false;
      }
   }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
    ul.addClass( "custom_complete" );
      return $( "<li>" )
      .append( "<a>" + item.label  + "</a>" )
      .appendTo( ul );
   };
});

  $(document).on('click','.go-to-resigter',function  (e) { 
     if($("#search-box-hidden").val() == ''){
        swal("Notice!", "Please select company first!", "warning");
        return;
     }
     set_company('home/register');
  });

    $(document).on('click','.go-to-resigter-code',function  (e) { 
     if($("#search-box-hidden").val() == ''){
        swal("Notice!", "Please select company first!", "warning");
        return;
     }
     set_company('home/proregister');
  });

  $(document).on('click','.go-to-login',function  (e) {   
      e.preventDefault();
     if($("#search-box-hidden").val() == ''){
        swal("Notice!", "Please select company first!", "warning");
        return;
     }
     set_company('users/login');
  });

  function runScript(e) {
      if (e.keyCode == 13) {
            if($("#search-box-hidden").val() == ''){
              swal("Notice!", "Please select company first!", "warning");
              return;
           }
          set_company('users/login');
          return false;
      }
  }

 function set_company (url) {
    company_url = $("#search-box").val().replace(/\s+/g, '-').toLowerCase();
    if(ajax('home/set_company',false,{company_url:company_url,company_id:$("#search-box-hidden").val()})){
      window.location.href  = getWebroot()+company_url+'/'+url;
    }
    return false;
 }

 

