/**
 * Total Video View Scripts
 */
// Totav Video View Parent Div
// Parent div
function totalViewsParentDiv(className){
	var parent_id = 'tab-total-video';
	return $('#'+parent_id+' '+className);
}

$(document).ready(function(){

	var loader = '<p class="dashboard_loader">loading</p>';

	// Get clients by companies ID
	totalViewsParentDiv('.industries_selector select').on('change', function(){
	
		$('#loader').show();
	
		var this_var 		= $(this);
		var company_id 		= this_var.val();
		var vertical_name 	= this_var.find(":selected").text();
		var parent_id 		= this_var.parents('.current_main_nav').attr('id');

		totalViewsParentDiv('.client_selector .bottom h1').html(loader);
		
		$.ajax({
			url: adminUrl()+'getClientByVerticalId',
			type: 'POST',
			//async: false,
			dataType: 'json',
			data: {'vertical_id' : company_id },
			success: function(res){
				totalViewsParentDiv('.client_selector .select_box_tab').html(res.client_html);
				totalViewsParentDiv('.industries_selector .bottom h1').html(vertical_name);
				totalViewsParentDiv('.graph-vertical-name').html(vertical_name);
				
				setTimeout(function(){ totalViewsParentDiv('.client_selector select').trigger('change'); }, 100);
			},
			error: function(){
				location.reload();
			},
			complete: function(){}
		});

	});

	// Get Users by client ID
	totalViewsParentDiv('.client_selector select').on('change', function(){

		$('#loader').show();

		var this_var 	= $(this);
		this_var.disabled = true;
		var client_id 	= this_var.val();
		var client_name = this_var.find(":selected").text();
		
		$.ajax({
			url: adminUrl()+'getCourseCountByClientId',
			type: 'POST',
			dataType: 'json',
			//async: false,
			data: {'client_id' : client_id },
			success: function(res){
				if (res.status == 'success') {
					totalViewsParentDiv('.client_selector .bottom h1').html(client_name);
					totalViewsParentDiv('.course_selector .bottom h1').html(res.course_count);
					totalViewsParentDiv('.main_mav_inner_tabbing_content .graph-right-client-name').html('Client: '+client_name);
					updateVideoViewCompareGraph({'client_id': client_id});					
				}else{
					totalViewsParentDiv('.course_selector .bottom h1').html(res.course_count);
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

	totalViewsParentDiv('.view_this').on('click', function(){
		var this_var 	= $(this);
		var parent_id 	= this_var.parents('.current_main_nav').attr('id');

		var data_graph = this_var.attr('data-graph');

		if (data_graph == 'total_view_by_year') {
			var year = $('#'+parent_id+' .video-total-year-list').val();
			updateVideoViewCompareGraph({'year': year});
		}

 		// Compare graph with client and vertical
 		if (data_graph == 'total_view_by_client') {
 			var client_id = $('#'+parent_id+' .client_selector select').val();
 			updateVideoViewCompareGraph({'client_id': client_id});
 		}
 	});


	// Change user and graph data by year
	$('.video-total-year-list').on('change', function(){
		var this_var 		= $(this);
		var parent_id 		= this_var.parents('.current_main_nav').attr('id');
		var mainParentDiv 	= this_var.parents('.current_main_nav');
		// Remove Class
		mainParentDiv.find('.main_mav_inner_tabbing li').removeClass('current_inner_content')
		// Add Class to current nav
		this_var.parents('li').addClass('current_inner_content');
		var year = this_var.val();
		updateVideoViewCompareGraph({'year': year});
		// getUserGraphData({'year': year}, 'update_year');
	});

	// Change user graph data by last year
	$('.video-last-year-list').on('change', function(){
		var this_var 		= $(this);
		var year 			= this_var.val();
		var client_id 		= totalViewsParentDiv('.client_selector .select_box_tab').val();
		updateVideoViewCompareGraph({'yearSelected': year,}, 'hide_year');
	});

	// Update graph by client year data
	$('.total-views-graph-year-dropdown').on('change', function(){
		var this_var 	= $(this);
		var year 		= this_var.val();
		var client_id 	= totalViewsParentDiv('.client_selector select').val();
		updateVideoViewCompareGraph({'year': year, 'client_id': client_id});
	});


	// Update Vertical data by week, month, year
	$('.video_verticals_section .select_box_tab').change(function(){

		var this_var 		= $(this);
		var vertical_id 	= this_var.val();
		var data_value 		= this_var.attr('data-id');

		$.ajax({
			url: adminUrl()+'updateVerticalVideoViews',
			type: 'POST',
			//async: false,
			data: {'vertical_id': vertical_id, 'data_value': data_value},
			dataType: 'json',
			success: function(res){
				if (res.status = 'success') {
					
				}
			},
			error: function(){
				console.log('Error');
			},
			complete: function(){
				$('#loader').hide();
			}
		});
	});


	// Get courses by vertical id
	totalViewsParentDiv('.latest_course select').change(function(){

		var client_id = $(this).val();
		
		$.ajax({
			url: adminUrl()+'getCoursesByVerticalId',
			type: 'POST',
			data: {'client_id': client_id},
			dataType: 'json',
			success: function(res){
				if (res.status = 'success') {
					totalViewsParentDiv('.latest_course_most_viewed_videos_section .latest_course ul').html(res.latest_course_html);
				}
			},
			error: function(){
			},
			complete: function(){

			}
		})
	});


});


// Update Second Section
function updateTotalVideoViewSection(curr_tab){

	var parentDiv 		= $('#'+curr_tab);
	var secondSection 	= totalViewsParentDiv('.video_view_second_section');
	var graph_section 	= totalViewsParentDiv('.video_compare_graph_section');
	var verticalSection = totalViewsParentDiv('.video_verticals_section');

	// Update Second Section
	//if (!secondSection.hasClass('updated')) {
		$('.loader').show();
		$.ajax({
			url: adminUrl()+'updateTotalVideoViewSecondSection',
			type: 'POST',
			//async: false,
			dataType: 'json',
			success: function(res){
				if (res.status = 'success') {
					var resp = res.data;
					totalViewsParentDiv('.year_to_date .bottom h1').html(resp.yeartodate);
					totalViewsParentDiv('.year_to_date .video-total-year-list').html(resp.total_year_html);
					totalViewsParentDiv('.industries_selector .bottom h1').html(resp.total_vertical);
					totalViewsParentDiv('.industries_selector .select_box_tab').html(resp.vertical_list);
					totalViewsParentDiv('.client_selector .bottom h1').html(resp.total_clients);
					totalViewsParentDiv('.client_selector .select_box_tab').html(resp.clients_list);
					totalViewsParentDiv('.course_selector .bottom h1').html(resp.total_course);
					totalViewsParentDiv('.graph-right-client-name').html('');

					secondSection.addClass('updated');

					if (!graph_section.hasClass("updated")){
						graph_section.addClass('updated');
						setTimeout(function(){
							updateVideoViewCompareGraph();
						}, 100);
					}else{
						$('#loader').hide();
					}
				}
			},
			error: function(){
				console.log('Error');
			},
			complete: function(){}
		});
	//}

	// Update Graph
	// if (!graph_section.hasClass("updated")){
	// 	graph_section.addClass('updated');
	// 	setTimeout(function(){
	// 		updateVideoViewCompareGraph();
	// 	}, 100);
	// }

	// Update Vertical View Count
	if (!verticalSection.hasClass("updated")){
		verticalSection.addClass('updated');
		setTimeout(function(){
			updateVerticalVideoViews(curr_tab);
		}, 500);
	}

	// Update Most View Video & Latest Courses
	var mostVideoNdCourses = totalViewsParentDiv('.latest_course_most_viewed_videos_section');
	if (!mostVideoNdCourses.hasClass('updated')) {
		mostVideoNdCourses.addClass('updated');
		setTimeout(function(){
			updateMostVideoAndLatestCourses(curr_tab);
		}, 1000);
	}

}


// Update Compare graph
function updateVideoViewCompareGraph(data, extraParam, showLoader){
	if (showLoader) {
		$('.loader').show();
	}

	var client_id 		= totalViewsParentDiv('.client_selector select').val();
	var vertical_id 	= totalViewsParentDiv('.industries_selector select').val();
	if (extraParam != 'hide_year') {
		var year 		= totalViewsParentDiv('select.video-total-year-list').val();
	}
	var yearSelected 	= totalViewsParentDiv('select.video-last-year-list').val();

	$.ajax({
		url: adminUrl()+'updateVideoViewCompareGraph',
		type: 'POST',
		data: {'yearSelected': yearSelected, 'client_id': client_id, 'year': year, 'vertical_id': vertical_id},
		//async: false,
		dataType: 'json',
		success: function(res){
			
			// comparison graph02
			Highcharts.chart('comparision_graph02', {
				chart: {type: 'column'},
				title: {text: ''},
				subtitle: {text: ''},
				xAxis: {
					categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
					crosshair: true
				},
				yAxis: {min: 0,max: res.maxUser,title: {text: 'Video Views'}},
				tooltip: {
					headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
					pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					'<td style="padding:0"><b>{point.y}</b></td></tr>',
					footerFormat: '</table>',
					shared: true,
					useHTML: true
				},
				plotOptions: {column: {pointPadding: 0,borderWidth: 0}},
				series: res.new_graph_data
			});

			// Change content of graph
			
			if (!data.yearSelected) {
				totalViewsParentDiv('select.video-last-year-list option:first').prop('selected', true);
			}

			// One year selected
			totalViewsParentDiv('.year_to_date .bottom h1').html(res.select_year_views);

			// Last compare year selected
			if (data.yearSelected) {
				if (!data.client_id) {
					totalViewsParentDiv('.graph-vertical-name').html('');
				}
			}
			totalViewsParentDiv('.total-views-graph-year-dropdown').hide();
			// Client selected
			if (data.client_id) {
				if (!data.year) {
					totalViewsParentDiv('.total-views-graph-year-dropdown').html(res.total_year_html);
				}
				totalViewsParentDiv('.total-views-graph-year-dropdown').show();
				
				var client_name = totalViewsParentDiv('.client_selector select').find(":selected").text();
				totalViewsParentDiv('.graph-right-client-name').html('Client: '+client_name);
				var vertical_name = totalViewsParentDiv('.industries_selector select').find(":selected").text();
				totalViewsParentDiv('.graph-vertical-name').html(vertical_name);

			}
			setTimeout(function(){ $('.loader').hide(); }, 100);

		},
		error: function(){
			console.log('Error');
			setTimeout(function(){ updateVideoViewCompareGraph(data, false, false); }, 200);
		},
		complete: function(){
			$('#loader').hide();
		}
	});


}


// Update vertical video views
function updateVerticalVideoViews(curr_tab){

	$.ajax({
		url: adminUrl()+'updateVerticalVideoViews',
		type: 'POST',
		//async: false,
		dataType: 'json',
		success: function(res){
			if (res.status = 'success') {
				$.each(res.weekly_data, function( index, value ) {
					var verticalId = value.vertical_id;
					var total_view = value.total_view;
					$('#'+curr_tab+' .video_verticals_section .verticals_views_id_'+verticalId).html('Views - '+total_view);
				});
			}
		},
		error: function(){
			console.log('Error');
			setTimeout(function(){ updateVerticalVideoViews(curr_tab); }, 200);
		},
		complete: function(){
			$('#loader').hide();
		}
	});
}


// Update Most Video Views And Lates Course
function updateMostVideoAndLatestCourses(curr_tab){

	$.ajax({
		url: adminUrl()+'updateMostVideoAndLatestCourses',
		type: 'POST',
		//async: true,
		dataType: 'json',
		success: function(res){
			if (res.status = 'success') {
				// Update Total Video
				$('#'+curr_tab+' .latest_course_most_viewed_videos_section .most_viewed_video .header_section h4').html('Total Views - '+res.total_video_view);
				$('#'+curr_tab+' .latest_course_most_viewed_videos_section .most_viewed_video ul').html(res.most_view_html);
				// Latest Courses
				$('#'+curr_tab+' .latest_course_most_viewed_videos_section .latest_course ul').html(res.latest_course_html);
			}
		},
		error: function(){
			console.log('Error');
			setTimeout(function(){
				updateMostVideoAndLatestCourses(curr_tab);
			}, 500);
		},
		complete: function(){
			$('#loader').hide();
		}
	});
}