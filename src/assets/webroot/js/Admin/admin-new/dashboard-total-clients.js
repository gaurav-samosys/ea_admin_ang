/**
 * Total Client
 */

// get parent div
function totalClientsParentDiv(className){
	var parent_id = 'tab-total-clients';
	return $('#'+parent_id+' '+className);
}

// call jquery method
$(document).ready(function(){

	// Top Year (Change user graph data by year)
	totalClientsParentDiv('.total-year-list').on('change', function(){
		var this_var 		= $(this);
		// Remove Class
		totalUserParentDiv('.main_mav_inner_tabbing li').removeClass('current_inner_content')
		// Add Class to current nav
		this_var.parents('li').addClass('current_inner_content');
		var year 			= this_var.val();
		var client_id 	= totalUserParentDiv('.client_selector .select_box_tab').val();
		updateTotalClientsCompareGraph('update_year');
	});



});


// Get Section Section Data
function updateTotalClientsSecondSection(){

	var loader = '<p class="dashboard_loader">loading</p>';
	totalClientsParentDiv('.year_to_date .bottom h1').html(loader);
	totalClientsParentDiv('.industries_selector .bottom h1').html(loader);
	totalClientsParentDiv('.client_selector .bottom h1').html(loader);

	$.ajax({
		url: adminUrl()+'updateTotalClientsSecondSection',
		type: 'POST',
		async: false,
		dataType: 'json',
		success: function(res){
			if (res.status = 'success') {
				var resp = res.data;
				totalClientsParentDiv('.year_to_date .bottom h1').html(resp.yeartodate);
				totalClientsParentDiv('.year_to_date .total-year-list').html(resp.total_year_html);
				totalClientsParentDiv('.industries_selector .bottom h1').html(resp.total_vertical);
				totalClientsParentDiv('.industries_selector .select_box_tab').html(resp.vertical_list);
				totalClientsParentDiv('.client_selector .bottom h1').html(resp.total_clients);
				totalClientsParentDiv('.client_selector .select_box_tab').html('<option value="all_client">All Clients</option>');
				totalClientsParentDiv('.client-total-users .bottom h1').html(resp.total_users);
				totalClientsParentDiv('.graph-vertical-name').html('');
				// Get graph data
				updateTotalClientsCompareGraph();
			}
		},
		error: function(){
			console.log('Error');
		},
		complete: function(){
			//$('#loader').hide();
		}
	});
}

// Update Compare Graph
function updateTotalClientsCompareGraph(extraParam){

	var client_id 		= totalClientsParentDiv('.client_selector select').val();
	var vertical_id 	= totalClientsParentDiv('.industries_selector select').val();
	if (extraParam != 'hide_year') {
		var year 			= totalClientsParentDiv('select.total-year-list').val();
	}
	var yearSelected 	= totalClientsParentDiv('select.compare_user_yearly').val();

	$.ajax({
		url: adminUrl()+'updateTotalClientsCompareGraph',
		type: 'POST',
		//async: false,
		data: {'yearSelected': yearSelected, 'client_id': client_id, 'year': year, 'vertical_id': vertical_id},
		dataType: 'json',
		success: function(res){
			if (res.total_year_html != '') {
				$('.totaluser_year_dropdown').html(res.total_year_html);
			}
			// comparision_graph_n1
			Highcharts.chart('comparision_graph_n1', {
				title: {text: ''},
				xAxis: {categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']},
				yAxis: {min: 0,max: res.maxUser,title: {text: 'Users'}},
				series: res.new_graph_data
			});

			if (!graphData.yearSelected) {
				totalUserParentDiv('select.compare_user_yearly option:first').prop('selected', true);
			}
			
			// Update Graph Year
			if (graphData.year) {
				$('.graph-total-user-year').html('Total User ('+graphData.year+')');
			}

			if (graphData.client_id) {
				totalUserParentDiv('.graph-total-user-year').html('');
			}
			if (extraParam != 'hide_year') {
				totalUserParentDiv('.year_to_date .bottom h1').html(res.select_year_users);
			}
			
			totalUserParentDiv('.totaluser_year_dropdown').hide();
			// Client ID
			if (graphData.client_id) {
				totalUserParentDiv('.totaluser_year_dropdown').show();

				var client_name = totalUserParentDiv('.client_selector select').find(":selected").text();
				totalUserParentDiv('.graph-right-client-name').html('Client: '+client_name);
				var vertical_name = totalUserParentDiv('.industries_selector select').find(":selected").text();
				totalUserParentDiv('.graph-vertical-name').html(vertical_name);

			}
			setTimeout(function(){ totalUserDistributionGraph(); }, 1000);
		},
		error: function(){
			console.log('Error');
		},
		complete: function(){
			setTimeout(function(){ $('#loader').hide(); }, 100	);
		}
	});

}