/*
* All downloads Certificates, Spreadsheets, Workbooks 
*/

function totalDownloadsParentDiv(className){
	var parent_id = 'tab-total-downloads';
	return $('#'+parent_id+' '+className);
}

$(document).ready(function(){
	// Mini Loader
	var loader = '<p class="dashboard_loader">loading</p>';

	// Get clients by Vertical ID
	totalDownloadsParentDiv('.industries_selector select').on('change', function(){
		var this_var 		= $(this);
		var company_id 		= this_var.val();
		var vertical_name 	= this_var.find(":selected").text();
		
		totalDownloadsParentDiv('.client_selector .bottom h1').html(loader);
		//totalDownloadsParentDiv('.downloads_selector .bottom h1').html(loader);
		
		$.ajax({
			url: adminUrl()+'getClientByVerticalId', 
			type: 'POST',
			async: false,
			dataType: 'json',
			data: {'vertical_id' : company_id, 'downloads' : 'get_all_downloads' },
			success: function(res){
				totalDownloadsParentDiv('.client_selector .select_box_tab').html(res.client_html);
				totalDownloadsParentDiv('.industries_selector .bottom h1').html(vertical_name);
				totalDownloadsParentDiv('.vertical_name').html(vertical_name);
				
				setTimeout(function(){ totalDownloadsParentDiv('.client_selector select').trigger('change'); }, 200);
			},
			error: function(){
				location.reload();
			},
			complete: function(){}
		});
	});

	// Get Downloads by client ID
	totalDownloadsParentDiv('.client_selector select').on('change', function(){

		var this_var 	= $(this);	
		var client_id 	= this_var.val();
		var client_name = this_var.find(":selected").text();
		var year = totalDownloadsParentDiv('select.downloads-total-year-list').val();
		var vertical_id = totalDownloadsParentDiv('.industries_selector select').val();
		
		$.ajax({
			url: adminUrl()+'getDownloadsByClaimedId',
			type: 'POST',
			dataType: 'json',
			async: false,
			data: {'client_id' : client_id,'year' : year, 'vertical_id': vertical_id },
			success: function(res){
				if (res.status == 'success') {
					totalDownloadsParentDiv('.downloads_selector select option:first').prop('selected', true);
					totalDownloadsParentDiv('.downloads_selector .bottom h1').html("All Downloads");
					totalDownloadsParentDiv('.client_selector .bottom h1').html(client_name);
					updateTotalDownloadsCompareGraph({'client_id': client_id});
					totalDownloadsParentDiv('.main_mav_inner_tabbing_content .graph-right-client-name').html('Client: '+client_name);
				}else{
					var download_name = totalDownloadsParentDiv('.downloads_selector select').find(":selected").text();
					totalDownloadsParentDiv('.downloads_selector .bottom h1').html(download_name);
				}
			},
			error: function(){
				//location.reload();
			},
			complete: function(){
				this_var.disabled = true;
			}
		});
	});

	totalDownloadsParentDiv('.view_this').on('click', function(){
		var this_var 	= $(this);	
		var data_graph 	= this_var.attr('data-graph');

		if (data_graph == 'total_view_by_year') {
			var year = totalDownloadsParentDiv('.downloads-total-year-list').val();
			updateTotalDownloadsCompareGraph({'year': year}, 'update_year');
		}

 		// Compare graph with client and vertical
 		if (data_graph == 'total_view_by_client') {

 			var client_id = totalDownloadsParentDiv('.client_selector select').val();
 			var downloads_selector = totalDownloadsParentDiv('.downloads_selector select').val();
 			updateTotalDownloadsCompareGraph({'client_id': client_id, 'downloads': downloads_selector});
 		}
 	});

	// Last 3 Year dropdown
	totalDownloadsParentDiv('.last_year_selected').on('change', function(){
		var this_var 			= $(this);
		var yearSelected 		= this_var.val();
		updateTotalDownloadsCompareGraph({'yearSelected': yearSelected},'hide_year');
	});

	// client graph year
	totalDownloadsParentDiv('.client_year_dropdown').on('change', function(){

		var year 		= $(this).val();
		var client_id 	= totalDownloadsParentDiv('.client_selector select').val();
		var downloads_selector = totalDownloadsParentDiv('.downloads_selector select').val();
		updateTotalDownloadsCompareGraph({'client_id': client_id,'year': year, 'downloads': downloads_selector});

	});

	// Year to date dropdown
	totalDownloadsParentDiv('.downloads-total-year-list').on('change', function(){
		
		totalDownloadsParentDiv('.main_mav_inner_tabbing li').removeClass('current_inner_content');
		$(this).parents('li').addClass('current_inner_content');
		var year = $(this).val();
		updateTotalDownloadsCompareGraph({'year': year}, 'update_year');
	});

	// Download type dropdown
	totalDownloadsParentDiv('.downloads_selector select').on('change', function(){
		
		var this_var = $(this);
		totalDownloadsParentDiv('.main_mav_inner_tabbing li').removeClass('current_inner_content');
		this_var.parents('li').addClass('current_inner_content');

		var download_name = this_var.find(":selected").text();
		
		var download_id = this_var.val();
		var client_id = totalDownloadsParentDiv('.client_selector select').val();
		var year 			= totalDownloadsParentDiv('select.downloads-total-year-list').val();
		var vertical_id 	= totalDownloadsParentDiv('.industries_selector select').val();

		// Get each download count
		$.ajax({
			url: adminUrl()+'getDownloadsByClaimedId',
			type: 'POST',
			async: false,
			data: {'download_id' : download_id,'client_id' : client_id,'year' : year,'vertical_id' : vertical_id},
			dataType: 'json',
			success: function(res){
				
				totalDownloadsParentDiv('.downloads_selector .bottom h1').html(download_name);

				updateTotalDownloadsCompareGraph({'client_id' : client_id,'downloads': download_id});
			}
		});
	});

});






function updateTotalDownloadsSecondSection(){

	$('#loader').show();
	var loader = '<p class="dashboard_loader">loading</p>';
	totalDownloadsParentDiv('.client_selector .bottom h1').html(loader);
	//totalDownloadsParentDiv('.downloads_selector .bottom h1').html(loader);

	$.ajax({
		url: 'http://localhost/enrichedacademy_live/api/web/dashboard',
		type: 'POST',
		//async: false,
		dataType: 'json',
		success: function(res){
			if (res.status = 'success') {
				var resp = res.data;
				totalDownloadsParentDiv('.year_to_date .bottom h1').html(resp.yeartodate);
				totalDownloadsParentDiv('.year_to_date .downloads-total-year-list').html(resp.total_year_html);
				totalDownloadsParentDiv('.industries_selector .bottom h1').html(resp.total_vertical);
				totalDownloadsParentDiv('.industries_selector .select_box_tab').html(resp.vertical_list);
				totalDownloadsParentDiv('.client_selector .bottom h1').html(resp.total_clients);
				totalDownloadsParentDiv('.client_selector .select_box_tab').html(resp.clients_list);
				//totalDownloadsParentDiv('.downloads_selector .bottom h1').html(resp.total_downloads);
				
				updateTotalDownloadsCompareGraph();

			}
		},
		error: function(){
			console.log('Error');
		},
		complete: function(){}
	});


}



// Update Total download compare graph
function updateTotalDownloadsCompareGraph(graphData, extraParam){

	var client_id 		= totalDownloadsParentDiv('.client_selector select').val();
	var vertical_id 	= totalDownloadsParentDiv('.industries_selector select').val();
	if (extraParam != 'hide_year') {
		var year 			= totalDownloadsParentDiv('select.downloads-total-year-list').val();
	}
	var yearSelected 	= totalDownloadsParentDiv('select.last_year_selected').val();
	var downloads 	= totalDownloadsParentDiv('.downloads_selector select').val();

	$('.loader').show();
	$.ajax({
		url: adminUrl()+'updateTotalDownloadsCompareGraph',
		type: 'POST',
		//async: false,
		data: {'yearSelected': yearSelected, 'client_id': client_id, 'year': year, 'vertical_id': vertical_id, 'downloads': downloads},
		dataType: 'json',
		success: function(res){
			if (res.total_year_html != '') {
				totalDownloadsParentDiv('.right_sec .drop_down_small').html(res.total_year_html);
			}
			// comparision_graph_n1
			Highcharts.chart('total_downloads_compare_graph', {
				title: {
					text: ''
				},
				xAxis: {
					categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
				},
				yAxis: {min: 0,max: res.maxUser,title: {text: 'Users'}},
				series: res.new_graph_data
			});

			// Update Graph Year
			// if (graphData.year) {
			// 	$('.graph-total-user-year').html('Total User ('+graphData.year+')');
			// }
			if (!yearSelected) {
				totalDownloadsParentDiv('.left_sec h1').hide();
				totalDownloadsParentDiv('select.last_year_selected option:first').prop('selected', true);
			}
			if (extraParam != 'hide_year') {
				totalDownloadsParentDiv('.year_to_date .bottom h1').html(res.select_year_views);
				totalDownloadsParentDiv('.left_sec h1').show();
				totalDownloadsParentDiv('.left_sec h1').html('Downloads ('+year+')');
				var download_name = totalDownloadsParentDiv('.downloads_selector select').find(":selected").text();
				totalDownloadsParentDiv('.downloads_selector .bottom h1').html(download_name);
			}
			totalDownloadsParentDiv('.totaluser_year_dropdown').hide();
			// Client ID
			if (client_id) {
				totalDownloadsParentDiv('.client_year_dropdown').show();
				totalDownloadsParentDiv('.totaluser_year_dropdown').show();
				var client_name = totalDownloadsParentDiv('.client_selector select').find(":selected").text();
				totalDownloadsParentDiv('.graph-right-client-name').html('Client: '+client_name);
				var vertical_name = totalDownloadsParentDiv('.industries_selector select').find(":selected").text();
				totalDownloadsParentDiv('.vertical_name').html(vertical_name);

			}

			setTimeout(function(){ $('.loader').hide(); }, 100	);

			// Update growth_graph_section
			var getAllDownloadSection = totalDownloadsParentDiv('.growth_graph_section');
			if (!getAllDownloadSection.hasClass('updated')) {
				getAllDownloadSection.addClass('updated');
				setTimeout(function(){
					getDownloads();
				}, 500);
			}

			// Update all_downloads_graph
			var all_downloads_graph = totalDownloadsParentDiv('.all_downloads_graph');
			if (!all_downloads_graph.hasClass('updated')) {
				all_downloads_graph.addClass('updated');
				setTimeout(function(){
					getalldownloads();
				}, 1000);
			}
		},
		error: function(){
			console.log('Error');
			//location.reload();
		},
		complete: function(){
		}
	});

}









$(function(){
	$(".allDownloads").on("change", function(){
		var this_var  = $(this);
		var year = this_var.val();
		getalldownloads({'year': year});
	});
})

function getalldownloads(data){
	$.ajax({
		url: adminUrl()+'getAllDownloadsGraph',
		type: 'POST',
		//async: false,
		data: data,
		dataType: 'json',
		success: function(res){
			if (res.totalYear != '') {
				$(".allDownloads").html(res.totalYear);
			}
			// all Aownloads
			Highcharts.chart('all-downloads', {
				chart: {type: 'areaspline'},
				title: {text: ''},
				legend: {
					layout: 'vertical',
					align: 'left',
					verticalAlign: 'top',
					x: 150,
					y: 100,
					floating: true,
					borderWidth: 1,
					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				},
				xAxis: {
					categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
				},
				yAxis: {title: {text: ''}},
				tooltip: {shared: true,valueSuffix: ' units'},
				credits: {enabled: false},
				plotOptions: {areaspline: {fillOpacity: 0.5}},
				series: [{
					name: res.alldata[0].name,
					data: res.alldata[0].data
				}, {
					name: res.alldata[1].name,
					data: res.alldata[1].data
				}, {
					name: res.alldata[2].name,
					data: res.alldata[2].data
				}]
			});
		},
		error: function(){
			console.log('Error');
		},
		complete: function(){
		}
	});
}

/*
* Downloads Certificates, Spreadsheets, Workbooks 
*/
function getDownloads(){
	$.ajax({
		url: adminUrl()+'getTotalDownloadsGraph',
		type: 'POST',
		//async: false,
		dataType: 'json',
		success: function(res){

			$('.certificates_box .top .item span').html(res.CertificatesPercentage+'% Last Week');
			$('.workbook_box .top .item span').html(res.WorkbookPercentage+'% Last Week');
			$('.spreadsheet_box .top .item span').html(res.SpreadsheetPercentage+'% Last Week');

			$(".certificates_D").html("Downloads - "+res.CertificatesDownlod);
			$(".workbook_D").html("Downloads - "+res.WorkbookDownlod);
			$(".spreadsheet_D").html("Downloads - "+res.SpreadsheetDownlod);

			// Certificates graph
			Highcharts.chart('growth_graph01', {
				chart: {type: 'areaspline'},
				title: {text: ''},
				legend: {
					layout: 'vertical',align: 'left',verticalAlign: 'top',x: 150,y: 100,floating: true,borderWidth: 0.5,
					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				},
				xAxis: {categories: res.graph_data.certificate.day},
				yAxis: {title: {text: ''},},
				credits: {enabled: false},
				plotOptions: {areaspline: {fillOpacity: 0.5}},
				series: [{
					name: 'Certificates',
					data: res.graph_data.certificate.data
				}]
			});
			
			// Workbook
			Highcharts.chart('growth_graph02', {
				chart: {type: 'areaspline'},
				title: {text: ''},
				legend: {
					layout: 'vertical',align: 'left',verticalAlign: 'top',x: 150,y: 100,floating: true,borderWidth: 0.5,
					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				},
				xAxis: {categories: res.graph_data.workbook.day},
				yAxis: {title: {text: ''}},
				credits: {enabled: false},
				plotOptions: {areaspline: {fillOpacity: 0.5}},
				series: [{
					name: 'Workbook',
					data: res.graph_data.workbook.data
				}]
			});
			// Spreadsheet Graph
			Highcharts.chart('growth_graph03', {
				chart: {type: 'areaspline'},
				title: {text: ''},
				legend: {layout: 'vertical',align: 'left',verticalAlign: 'top',x: 150,y: 100,floating: true,borderWidth: 0.5,					backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'},
				xAxis: {categories: res.graph_data.spreadsheet.day},
				yAxis: {title: {text: ''}},
				credits: {enabled: false},
				plotOptions: {areaspline: {fillOpacity: 0.5}},
				series: [{
					name: 'Spreadsheet',
					data: res.graph_data.spreadsheet.data
				}]
			});
		},
		error: function(){
			console.log('Error');
		},
		complete: function(){
		}
	});
}