/**
 * Description: Total users
 * @Author Dev
 * @version 1.0.1
 */
// Parent div
function totalUserParentDiv(className){
	var parent_id = 'tab-all-user';
	return $('#'+parent_id+' '+className);
}

$(document).ready(function(){

	var parent_id = 'tab-all-user';

	// Get clients by companies ID
	totalUserParentDiv('.industries_selector .select_box_tab').on('change', function(){
		
		var loader = '<p class="dashboard_loader">loading</p>';
		$('#loader').show();

		totalUserParentDiv('.client_selector .bottom h1').html(loader);
		//totalUserParentDiv('.client-total-users .bottom h1').html(loader);

		var this_var 		= $(this);
		var company_id 		= this_var.val();
		var vertical_name 	= this_var.find(":selected").text();
		var parent_id 		= this_var.parents('.current_main_nav').attr('id');

		var chkClientGraph 	= $('#'+parent_id+' .current_inner_content').hasClass('client-graph-nav');

		$.ajax({
			url: adminUrl()+'getClientByVerticalId',
			type: 'POST',
			//async: false,
			dataType: 'json',
			data: {'vertical_id' : company_id },
			success: function(res){

				// Update Select Vertical Name
				totalUserParentDiv('.industries_selector .bottom h1').html(vertical_name);
				totalUserParentDiv('.client_selector .select_box_tab').html(res.client_html);
				// totalUserParentDiv('.client_selector .bottom h1').html(res.total_client);
				//if (chkClientGraph) {
					totalUserParentDiv('.graph-vertical-name').html(vertical_name);
				//}
				setTimeout(function(){ totalUserParentDiv('.client_selector .select_box_tab').trigger('change'); }, 200);
			},
			error: function(){
				location.reload();
			},
			complete: function(){}
		});
	});

	// Get Users by client ID
	totalUserParentDiv('.client_selector .select_box_tab').on('change', function(){

		var this_var 	= $(this);
		this_var.disabled = true;
		var client_id 	= this_var.val();
		var parent_id 	= this_var.parents('.current_main_nav').attr('id');
		var chkClientGraph 	= totalUserParentDiv('.current_inner_content').hasClass('client-graph-nav');

		var loader = '<p class="dashboard_loader">loading</p>';
		$('#loader').show();
		//totalUserParentDiv('.client-total-users .bottom h1').html(loader);

		var client_name = this_var.find(":selected").text();
		
		$.ajax({
			url: adminUrl()+'getUsersByClientId',
			type: 'POST',
			dataType: 'json',
			//async: false,
			data: {'client_id' : client_id },
			success: function(res){
				if (res.status == 'success') {
					//totalUserParentDiv('.client-total-users .bottom h1').html(res.user_data);
					totalUserParentDiv('.year_to_date .bottom h1').html(res.user_data);
					totalUserParentDiv('.client_selector .bottom h1').html(client_name);
					totalUserParentDiv('.main_mav_inner_tabbing_content .graph-right-client-name').html('Client: '+client_name);
					var year = totalUserParentDiv('.total-year-list').val();
					getUserGraphData({'client_id': client_id, 'year': year}, false);
				}else{
					//totalUserParentDiv('.client-total-users .bottom h1').html(res.user_data);
					$('.main_mav_inner_tabbing_content .graph-right-client-name').html('Total Users');
					getUserGraphData({'client_id': client_id}, false);
				}
			},
			error: function(){
				location.reload();
			},
			complete: function(){
				this_var.disabled = true;
			}
		});
	});

	// Top Year (Change user graph data by year)
	totalUserParentDiv('.total-year-list').on('change', function(){
		var this_var 		= $(this);
		// Remove Class
		totalUserParentDiv('.main_mav_inner_tabbing li').removeClass('current_inner_content')
		// Add Class to current nav
		this_var.parents('li').addClass('current_inner_content');
		var year 			= this_var.val();
		var client_id 	= totalUserParentDiv('.client_selector .select_box_tab').val();
		getUserGraphData({'year': year, 'client_id': client_id}, 'update_year');
	});

	// Last 3 year graph
	totalUserParentDiv('.compare_user_yearly').on('change', function(){
		var this_var 		= $(this);
		var parent_id 		= this_var.parents('.current_main_nav').attr('id');
		
		var client_id 	= totalUserParentDiv('.client_selector .select_box_tab').val();

		var yearSelected = this_var.val();
		getUserGraphData({'yearSelected': yearSelected}, 'hide_year' );
	});

	// Change user graph data by one year
	totalUserParentDiv('.totaluser_year_dropdown').on('change', function(){
		var this_var 	= $(this);
		var client_id 	= this_var.parents('.current_main_nav').find('.client_selector .select_box_tab').val();
		var year 		= this_var.val();
		getUserGraphData({'year': year, 'client_id': client_id}, false);
	});

	// View Button Click functionality
	totalUserParentDiv('.view_graph').click(function(){

		var this_var 		= $(this);
		var mainParentDiv 	= this_var.parents('.current_main_nav');

		// Remove Class
		mainParentDiv.find('.main_mav_inner_tabbing li').removeClass('current_inner_content')
		// Add Class to current nav
		this_var.parents('li').addClass('current_inner_content');
		
		var chkClientGraph 	= this_var.parents('li').hasClass('client-graph-nav');
		if (chkClientGraph) {
			// Get client and Vertical name for client graph
			var client_id 		= mainParentDiv.find('.client_selector select').val();
			var client_name 	= mainParentDiv.find('.client_selector select').find(":selected").text();
			var vertical_name 	= mainParentDiv.find('.industries_selector select').find(":selected").text();
			mainParentDiv.find('.dcrf_compare_graph .graph-vertical-name').html(vertical_name);
			mainParentDiv.find('.dcrf_compare_graph .graph-right-client-name').html(client_name);
			mainParentDiv.find('.dcrf_compare_graph .graph-total-user-year').html('');

			// Trigger Graph function
			getUserGraphData({'client_id': client_id}, false);

		}else{
			var year = mainParentDiv.find('.total-year-list').val();
			mainParentDiv.find('.dcrf_compare_graph .graph-total-user-year').html('Total User ('+year+')');
			// Remove class to graph for year graph
			mainParentDiv.find('.dcrf_compare_graph .graph-right-client-name').html('Total Users');
			mainParentDiv.find('.dcrf_compare_graph .graph-vertical-name').html('');
			getUserGraphData({'year': year}, 'update_year');
		}		

	});

});

// Get Section Section Data
function getDashboardSecondSectionData(){

	var loader = '<p class="dashboard_loader">loading</p>';
	totalUserParentDiv('.year_to_date .bottom h1').html(loader);
	totalUserParentDiv('.industries_selector .bottom h1').html(loader);
	totalUserParentDiv('.client_selector .bottom h1').html(loader);

	$.ajax({
		url: 'http://localhost/enrichedacademy_live/api/web/getUsers',//adminUrl()+'getDashboardSecondSectionData',
		type: 'POST',
		//async: false,
		dataType: 'json',
		success: function(res){
			if (res.status = 'success') {
				var resp = res.data;
				totalUserParentDiv('.year_to_date .bottom h1').html(resp.yeartodate);
				totalUserParentDiv('.year_to_date .total-year-list').html(resp.total_year_html);
				totalUserParentDiv('.industries_selector .bottom h1').html(resp.total_vertical);
				totalUserParentDiv('.industries_selector .select_box_tab').html(resp.vertical_list);
				totalUserParentDiv('.client_selector .bottom h1').html(resp.total_clients);
				totalUserParentDiv('.client_selector .select_box_tab').html(resp.clients_list);
				//totalUserParentDiv('.client-total-users .bottom h1').html(resp.total_users);
				totalUserParentDiv('.graph-vertical-name').html('');
				// Get graph data
				getUserGraphData(false, false);
			}
		},
		error: function(){
			console.log('Error');
		},
		complete: function(){
			$('#loader').hide();
		}
	});
}

// Get user Graph data
function getUserGraphData( graphData, extraParam ){
	
	$('#loader').show();

	var client_id 		= totalUserParentDiv('.client_selector select').val();
	var vertical_id 	= totalUserParentDiv('.industries_selector select').val();
	if (extraParam != 'hide_year') {
		var year 			= totalUserParentDiv('select.total-year-list').val();
	}
	var yearSelected 	= totalUserParentDiv('select.compare_user_yearly').val();

	$.ajax({
		url: adminUrl()+'getCurrentYearWith3YearData',
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

// User distribution graph
function totalUserDistributionGraph(){
	$.ajax({
		url: adminUrl()+'getUserDistributionByCompany',
		type: 'POST',
		//async: false,
		dataType: 'json',
		success: function(res){

			// Update Total User
			$('.total_users_dist_graph_sec .header_section h4').html('Total User - '+res.total_users);
			$('.total_users_destribution_by_company').html(res.html);$('.total_users_destribution_by_company').html(res.html);

			// USER DISTRIBTION GRAPH
			Highcharts.chart('User_distribution', {
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: 0,
					plotShadow: false
				},
				title: {
					text: 'Total Users<br>'+res.total_users,
					align: 'center',
					verticalAlign: 'middle',
					y: 0
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						dataLabels: {enabled: false},
						startAngle: 90,
						endAngle: 90,
						center: ['50%', '50%'],
						size: '170px'
					}
				},
				series: [{
					type: 'pie',
					name: 'Users',
					innerSize: '65%',
					data: res.graph_data
				}]
			});

			getAppUsageByYear();
		}
	});
  // USER DISTRIBTION GRAPH END

}

// Get App Usage Users
function getAppUsageByYear(year){

	// if (year) {
	// 	$('#loader').show();
	// }

	$.ajax({
		url: adminUrl()+'getAppUsageByYear',
		type: 'POST',
		data: {'year': year},
		//async: false,
		dataType: 'json',
		success: function(res){

			// Update Percentage
			$('.dcrf_app_usage .right_deatil_section .android_user .percentage').html(res.andriod_user+'%');
			$('.dcrf_app_usage .right_deatil_section .ios_user .percentage').html(res.ios_user+'%');
			if (res.total_year_html != '') {
				$('.dcrf_app_usage .header_section .app_usage_year_list ').html(res.total_year_html);
			}

			// APP_USAGE
			Highcharts.chart('app_usage', {
				chart: {plotBackgroundColor: null,plotBorderWidth: 0,plotShadow: false},
				title: {
					text: 'On Year <br>'+res.year,
					align: 'center',verticalAlign: 'middle',y: 0
				},
				tooltip: {pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'},
				plotOptions: {
					pie: {
						dataLabels: {enabled: true,distance: -50,style: {fontWeight: 'bold',color: 'white'}},
						startAngle: 90,endAngle: 90,center: ['50%', '50%'],size: '170px'
					}
				},
				series: [{
					type: 'pie',
					name: 'Users',
					innerSize: '65%',
					data: [
					['Andriod', res.andriod_user],
					['iOS', res.ios_user]
					]
				}]
			});
		}
	});



}