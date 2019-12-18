function getStateByCountry(id)
{
	var getUrl = $('#baseUrl').val()+'Registrations/getStateData';
	var html_option = "";
	var country = $("#country").val();
	if(country >= 1)
	{
		var country_data = {'COUNTRY':country};
		$.ajax({
			url: getUrl,
			type:'POST',			
			data:country_data,
			dataType:'json',			
			success: function(jsondata){
				var statelen= jsondata.length;
				html_option += "<option value='0'> Select State </option>";
				for(var i =0; i< statelen; i++)
				{
					html_option +="<option value='"+ jsondata[i].State.id +"'>" + jsondata[i].State.state_name + "</option>";
				}
				$("#state").html(html_option);				
			}
		});
	} else
	{
		$("#state").html('<option value="0"> Select State </option>');	
	}
}
function getEmail(email,eid)
{
		var domain = email;
			var getUrl = $('#baseUrl').val()+'registrations/searchDomain';
            $.ajax({
			type: "POST",
			data: {"domain":domain},
			url: getUrl,
			success: function(response)
			{
				var json_obj = $.parseJSON(response);
				if(json_obj.result == 1)
				{
					confirm("Your domain name is exists");
					$('.registration-middle').show();
					$('.register-email').hide();
					$('#email').val(domain);
				} 
				else
				{
					$('.back-btn').show();
					$('.back-btn').click();
					if(eid == 1)
					{
						$('#domain_error').show();
					}
					
					if(eid == 2)
					{
						$('#domain_error1').show();
					}
				}

			}
				
		});
}
function getCoprate()
{
	$('#sub_Domain').hide();
}
function getPersonal()
{
	$('#sub_Domain').show();
}
function getEmailAddress()
{

}


