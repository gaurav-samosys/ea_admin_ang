function setPageProgress(pageID) {
//alert(pageID);
	$.ajax({
		url: getWebroot()+'users/user_steps',
		type: 'post',
		data: {status: pageID},
		dataType: 'json',
		success: function (data) {
			//alert(data.status)
		}
	});
	
	//alert(pageID)
	return 0;
}
