jQuery(document).ready(function($) {

	/* Load All Graph after 2 seconds */
	setTimeout(function(){ getAppUsersComparisonGraphDataFunc()}, 1000);
	setTimeout(function(){ getCalculatorsComparisonGraphData_func()}, 1300);
	setTimeout(function(){ getNetworthUsersGraphData()}, 1600);
	setTimeout(function(){ getStudentUsersGraphData()}, 2100);
	setTimeout(function(){ getRetirementUsersGraphDataFunc()}, 2400);

	/*dashboar top slider*/
	var swiper = new Swiper('.swiper_app_main', {
		slidesPerView: 3,
		spaceBetween: 10,
		simulateTouch:false,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			560: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 2,
			},
			992: {
				slidesPerView: 3,
			},
			1025: {
				slidesPerView: 2,
			}
		}
	});

	/*JQUERY TABS*/
	$('.swiper_app_main .tab-link').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.swiper_app_main .tab-link').removeClass('active_now');
		$('.x_panel').removeClass('active_now');

		$(this).addClass('active_now');
		$("#"+tab_id).addClass('active_now');
	});

	/*DATEPICKER TABLE*/
	$('.ea_daterangepicker_datatable').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment().subtract(1, 'year'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],			
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
			'Current Month': [moment().startOf('month'), moment()],
			'Last Full Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Year To Date': [moment().startOf('year'), moment()],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	/* DatePicker for Admin */
	$('.ea_daterangepicker').daterangepicker({
		autoUpdateInput: true,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		startDate: moment().subtract(1, 'year'),
		endDate: moment(),
		locale: {
			format: 'MMM D, YYYY'
		},
		ranges: {
			'Default': [moment().subtract(1, 'year'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],			
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],			
			'Current Month': [moment().startOf('month'), moment()],
			'Last Full Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Year To Date': [moment().startOf('year'), moment()],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},		
	});

	/*DATEPICKER TABLE*/
	$('.comparison_graph_date').daterangepicker({
		autoUpdateInput: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		autoApply: true,
		opens: 'left',
		startDate: moment().subtract(1, 'year'),
		endDate: moment(),
		locale: {
			format: 'MMM D, YYYY'
		},
		ranges: {			
			'Default': [moment().subtract(1, 'year'), moment()],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
			'Last 2 Years': [moment().subtract(2, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
			'Last 3 Years': [moment().subtract(3, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
			'Last 5 Years': [moment().subtract(5, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
			'Last 10 Years': [moment().subtract(10, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
		},	
	});

	$('.appuser_daterangepicker_datatable').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.appuser_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.appuser_student_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.net_worth_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.Calculator_Comparision_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});


	$('.Yearly_Comparision_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	/*tabbing*/
	$('.tabbing_container ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('.tabbing_container ul.tabs li').removeClass('current');
		$('.tabbing_container .tab-content_new').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})
	/*tabbing */


	$('body').on('click', '.ranges ul li:last-child', function(){
		$(this).addClass('active');
	});


	$('.Retirement_ea_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});


	$('.Calculator_ea_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});


	$('.student_ea_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.Comparision-ea_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.user_ea_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.all-ea_daterangepicker').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.Showing-ea_daterangepicker_datatable').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.Clients-ea_daterangepicker_datatable').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});

	$('.Companies-ea_daterangepicker_datatable').daterangepicker({
		autoUpdateInput: false,
		autoApply: true,
		showDropdowns: true,
		minYear: 2010,
		maxYear: 2030,
		linkedCalendars: false,
		opens: 'center',
		ranges: {
			'Default': [moment('2010-01-01'), moment()],
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],      
			'Last 30 Days': [moment().subtract(29, 'days'), moment()],      
			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		},
	});


/**======================================================================================
 * Developer Code for APP Dashboard
 */
 /* Get All Section Users Counts */
 $.ajax({
 	url: adminApiUrl()+'getAllUsersCount',
 	type: 'POST',
 	dataType: 'json',
 	data: {"token": secretToken()},
 	success: function(res){
 		if (res.success == true) {
 			var resData = res.data;
 			$('.app_dash_main_tabs li.appuser strong').html(resData.totalUsers);
 			$('.app_dash_main_tabs li.calulator strong').html(resData.retirementUsers);
 			$('.app_dash_main_tabs li.student strong').html(resData.studentLoanUsers);
 			$('.app_dash_main_tabs li.networth strong').html(resData.networthUsers);

 			/* Update Count ON DataTable */
			// $('#tab_appuser .left_sec h5 strong').html(resData.totalUsers);
			// $('#tab_calulator .left_sec h5 strong').html(resData.retirementUsers);
			// $('#tab_student .left_sec h5 strong').html(resData.studentLoanUsers);
			// $('#tab_networth .left_sec h5 strong').html(resData.networthUsers);
		} else {
			alert('Something is wrong, please refresh your browser\'s current tab');
		}
	}
});


/**
 * Get All Users DataTable
 *
 */

 $('#appuser_datatable').DataTable({
 	"bFilter" : false,               
 	"bLengthChange": false,
 	"bInfo": true,
 	"processing": true,
 	"serverSide": true,
 	responsive: false,
 	ajax: {
 		"type": 'POST',			
 		"url": adminApiUrl()+'getAllAppUsersWithData', 			
 		"dataSrc": function (json) {
 			$('#tab_appuser .left_sec h5 strong').html(json.recordsTotal);
 			$('.appuser_datatable_loader').hide();
 			return json.data;
 		},
 		'beforeSend': function (request) {
 			$('.appuser_datatable_loader').show();
 		},
 		data : function(d){
 			d['token']    		= secretToken();
 			d['dateRange']    	= $('.appuser_datatable_date_data').val();
 			d['search']      	= $('.appuser_datatable_search').val();			
 			return d;
 		},
 	}
 });
 
 $('.appuser_datatable_date').on('apply.daterangepicker', function(ev, picker) {
 	$('.appuser_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
 	$('.appuser_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
 	$('#appuser_datatable').DataTable().draw();
 });

 $('.appuser_datatable_date').on('cancel.daterangepicker', function(ev, picker) {
 	$('.appuser_datatable_date_data').val('');
 	$('#appuser_datatable').DataTable().draw();
 });

 $('.appuser_datatable_search, .appuser_datatable_search_form').on('submit blur', function(e){
 	e.preventDefault();
 	/*$('.industries_datatable_loader').show();*/
 	$('#appuser_datatable').DataTable().draw();
 });
 /* All Users DataTable End */



/**
 * DataTable for Retirement Calculator
 */

 $('#calulator_datatable').DataTable({
 	"bFilter" : false,               
 	"bLengthChange": false,
 	"bInfo": true,
 	"processing": true,
 	"serverSide": true,
 	responsive: false,
 	ajax: {
 		"type": 'POST',			
 		"url": adminApiUrl()+'getAllRetirementUsersWithData',
 		"dataSrc": function (json) {
 			$('#tab_calulator .left_sec h5 strong').html(json.recordsTotal);
 			$('.calulator_datatable_loader').hide();
 			return json.data;
 		},
 		'beforeSend': function (request) {
 			$('.calulator_datatable_loader').show();
 		},
 		data : function(d){
 			d['token']    		= secretToken();
 			d['dateRange']    	= $('.retirement_datatable_date_data').val();
 			d['search']      	= $('.retirement_datatable_search').val();
 			return d;
 		},
 	},
 	'columnDefs': [
 	{'targets': 2,'orderable': false},
 	{'targets': 3,'orderable': false},
 	{'targets': 4,'orderable': false},
 	{'targets': 5,'orderable': false},
 	{'targets': 6,'orderable': false},
 	{'targets': 7,'orderable': false},
 	{'targets': 8,'orderable': false}
 	]
 });
 $('.retirement_datatable_date').on('apply.daterangepicker', function(ev, picker) {
 	$('.retirement_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
 	$('.retirement_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
 	$('#calulator_datatable').DataTable().draw();
 });
 $('.retirement_datatable_date').on('cancel.daterangepicker', function(ev, picker) {
 	$('.retirement_datatable_date_data').val('');
 	$('#calulator_datatable').DataTable().draw();
 });
 $('.retirement_datatable_search, .retirement_datatable_search_form').on('submit blur', function(e){
 	e.preventDefault();
 	$('#calulator_datatable').DataTable().draw();
 })

/**
 * DataTable for Student Loan Calculator
 */

 $('#student_datatable').DataTable({
 	"bFilter" : false,               
 	"bLengthChange": false,
 	"bInfo": true,
 	"processing": true,
 	"serverSide": true,
 	responsive: false,
 	ajax: {
 		"type": 'POST',			
 		"url": adminApiUrl()+'getAllStudentLoanUsersWithData',
 		"dataSrc": function (json) {
 			$('#tab_student .left_sec h5 strong').html(json.recordsTotal);
 			$('.student_datatable_loader').hide();
 			return json.data;
 		},
 		'beforeSend': function (request) {
 			$('.student_datatable_loader').show();
 		},
 		data : function(d){
 			d['token']    		= secretToken();
 			d['dateRange']    	= $('.student_datatable_date_data').val();
 			d['search']      	= $('.student_datatable_search').val();			
 			return d;
 		},
 	},
 	'columnDefs': [
 	{'targets': 2,'orderable': false},
 	{'targets': 3,'orderable': false},
 	{'targets': 4,'orderable': false}	
 	]
 });
 $('.student_datatable_date').on('apply.daterangepicker', function(ev, picker) {
 	$('.student_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
 	$('.student_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
 	$('#student_datatable').DataTable().draw();
 });
 $('.student_datatable_date').on('cancel.daterangepicker', function(ev, picker) {
 	$('.student_datatable_date_data').val('');
 	$('#student_datatable').DataTable().draw();
 });
 $('.student_datatable_search, .student_datatable_search_form').on('submit blur', function(e){
 	e.preventDefault();
 	$('#student_datatable').DataTable().draw();
 });



/**
 * DataTable for NetWorth Calculator
 */

 $('#networth_datatable').DataTable({
 	"bFilter" : false,               
 	"bLengthChange": false,
 	"bInfo": true,
 	"processing": true,
 	"serverSide": true,
 	responsive: false,
 	ajax: {
 		"type": 'POST',			
 		"url": adminApiUrl()+'getAllNetWorthUsersWithData',
 		"dataSrc": function (json) {
 			$('#tab_networth .left_sec h5 strong').html(json.recordsTotal);
 			$('.networth_datatable_loader').hide();
 			return json.data;
 		},
 		'beforeSend': function (request) {
 			$('.networth_datatable_loader').show();
 		},
 		data : function(d){
 			d['token']    		= secretToken();
 			d['dateRange']    	= $('.networth_datatable_date_data').val();
 			d['search']      	= $('.networth_datatable_search').val();
 			return d;
 		},
 	},
 	'columnDefs': [
 	{'targets': 2,'orderable': false},
 	{'targets': 3,'orderable': false}	
 	]
 });
 $('.networth_datatable_date').on('apply.daterangepicker', function(ev, picker) {
 	$('.networth_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
 	$('.networth_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
 	$('#networth_datatable').DataTable().draw();
 });
 $('.networth_datatable_date').on('cancel.daterangepicker', function(ev, picker) {
 	$('.networth_datatable_date_data').val('');
 	$('#networth_datatable').DataTable().draw();
 });
 $('.networth_datatable_search, .networth_datatable_search_form').on('submit blur', function(e){
 	e.preventDefault();
 	$('#networth_datatable').DataTable().draw();
 });


/**
* TOTAL USER GRAPH
*/
function getRetirementUsersGraphDataFunc(){
	$('.retirement_graph_loader').show();
	var dateRange 	= $('.retirement_graph_date_data').val();			
	$.ajax({
		url: adminApiUrl()+'getRetirementUsersGraphData',
		type: 'POST',
		dataType: 'json',
		data: {"token": secretToken(),"dateRange": dateRange},
		async: true,
		success: function(res){
			$('.retirement_users_graph .left_sec h5 span').html(res.total_users);
			$('.retirement_users_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
			Highcharts.chart('retirementGraphUsersData', {
				chart: {
					type: 'column', zoomType: 'xy',styledMode: true, panning: true, panKey: 'shift', resetZoomButton: {position: {x: 0,y: -30}}
				},
				navigation: {buttonOptions: {enabled: false}},
				xAxis: {labels: {enabled: true}, opposite: false,categories: res.labelName,
				min: 0,				
				tickLength: 0
			},
			title: {text: 'demo'},
			yAxis: {min: 0,title: {text: ''}},			
			series: [{showInLegend: false,enableMouseTracking: true},
			{ 
				showInLegend: false,name: "Users",data: res.data
			}
			],
			tooltip: {
				shared: true,
				useHTML: true,
				formatter: function() {
					var tooltip = "<span style='display: inline-block; width: 90px;'>";
					tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
					for (point of this.points) {
						tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>');
						tooltip += "<br/>";
					}
					tooltip += "</span>";
					return tooltip;

				}
			},
		});
			function leftSpan(text) {
				return "<span style='float: left;'>" + text + "</span>";
			}

			function rightSpan(text) {
				return "<span style='float: right;'>" + text + "</span>";
			}
			$('.retirement_graph_loader').hide();			
		}
	});
}

/* Date Picker For Retirement Graph */
$('.retirement_graph_date').on('apply.daterangepicker', function(ev, picker) {
	$('.retirement_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
	$('.retirement_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
	getRetirementUsersGraphDataFunc();
});


/* Student Calculators USER GRAPH */
function getStudentUsersGraphData() {
	$('.student_users_graph_section .loader').show();
	var dateRange 	= $('.student_graph_date_data').val();			
	$.ajax({
		url: adminApiUrl()+'getStudentUsersGraphData',
		type: 'POST',
		dataType: 'json',
		data: {"token": secretToken(),"dateRange": dateRange},
		async: true,
		success: function(res){
			$('.student_users_graph .left_sec h5 span').html(res.total_users);
			$('.student_users_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
			Highcharts.chart('studentLoanCalculaorUsersGraph', {
				chart: {
					type: 'column', zoomType: 'xy',styledMode: true, panning: true, panKey: 'shift', resetZoomButton: {position: {x: 0,y: -30}}
				},
				navigation: {buttonOptions: {enabled: false}},
				xAxis: {labels: {enabled: true}, opposite: false,categories: res.labelName,
				min: 0,				
				tickLength: 0
			},
			title: {text: 'demo'},
			yAxis: {min: 0,title: {text: ''}},			
			series: [{showInLegend: false,enableMouseTracking: true},
			{ 
				showInLegend: false,name: "Users",data: res.data
			}
			],
			tooltip: {
				shared: true,
				useHTML: true,
				formatter: function() {
					var tooltip = "<span style='display: inline-block; width: 90px;'>";
					tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
					for (point of this.points) {
						tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>');
						tooltip += "<br/>";
					}
					tooltip += "</span>";
					return tooltip;
				}
			},
		});
			function leftSpan(text) {
				return "<span style='float: left;'>" + text + "</span>";
			}
			function rightSpan(text) {
				return "<span style='float: right;'>" + text + "</span>";
			}
			$('.student_users_graph_section .loader').hide();			
		}
	});
}

/* Date Picker For Retirement Graph */
$('.student_graph_date').on('apply.daterangepicker', function(ev, picker) {
	$('.student_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
	$('.student_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
	getStudentUsersGraphData();
});


/* NetWOrth Calculators GRAPH */
function getNetworthUsersGraphData() {
	$('.networth_users_graph_section .loader').show();
	var dateRange 	= $('.networth_graph_date_data').val();			
	$.ajax({
		url: adminApiUrl()+'getNetworthUsersGraphData',
		type: 'POST',
		dataType: 'json',
		data: {"token": secretToken(),"dateRange": dateRange},
		async: true,
		success: function(res){
			$('.networth_users_graph .left_sec h5 span').html(res.total_users);
			$('.networth_users_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
			Highcharts.chart('netWorthCalculaorUsersGraph', {
				chart: {
					type: 'column', zoomType: 'xy',styledMode: true, panning: true, panKey: 'shift', resetZoomButton: {position: {x: 0,y: -30}}
				},
				navigation: {buttonOptions: {enabled: false}},
				xAxis: {labels: {enabled: true}, opposite: false,categories: res.labelName,
				min: 0,				
				tickLength: 0
			},
			title: {text: 'demo'},
			yAxis: {min: 0,title: {text: ''}},			
			series: [{showInLegend: false,enableMouseTracking: true},
			{ 
				showInLegend: false,name: "Users",data: res.data
			}
			],
			tooltip: {
				shared: true,
				useHTML: true,
				formatter: function() {
					var tooltip = "<span style='display: inline-block; width: 90px;'>";
					tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
					for (point of this.points) {
						tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>');
						tooltip += "<br/>";
					}
					tooltip += "</span>";
					return tooltip;

				}
			},
		});
			function leftSpan(text) {
				return "<span style='float: left;'>" + text + "</span>";
			}
			function rightSpan(text) {
				return "<span style='float: right;'>" + text + "</span>";
			}
			$('.networth_users_graph_section .loader').hide();
		}
	});
}

$('.networth_graph_date').on('apply.daterangepicker', function(ev, picker) {
	$('.networth_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
	$('.networth_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
	getNetworthUsersGraphData();
});



/* Comapre Graph for All Calculators */

function getCalculatorsComparisonGraphData_func(){
	$('.total_downloads_loader').show();
	var dateRange = $('.allCalculatorsCompare_date_data').val();
	$.ajax({
		url: adminApiUrl()+'getCalculatorsComparisonGraphData',
		type: 'POST',
		dataType: 'json',
		data: {"token": secretToken(),"dateRange": dateRange},
		async: true,
		success: function(res){
			$('.total_downloads .left_sec h5 span').html(' '+res.totalDownloads);

			$('.total_downloads .certificates .total-count').html(res.total_cert);
			$('.total_downloads .workbook .total-count').html(res.total_work);
			$('.total_downloads .spredsheet .total-count').html(res.total_spred);

			$('.total_downloads .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
			Highcharts.chart('calculatorComparisionGraph', {				
				chart: {type: 'areaspline',showInLegend: false,zoomType: 'x',
				resetZoomButton: {
					position: {
						x: 0,
						y: -30
					}
				}},
				navigation: {buttonOptions: {enabled: false}},
				title: {text: 'demo'},
				xAxis: {labels: {enabled: true},categories: res.labelName},
				yAxis: {title: {text: ''}},
				tooltip: {shared: true,valueSuffix: ' Users'},
				credits: {enabled: false},
				plotOptions: {series: {marker: {enabled: false}}},
				series: [{
					showInLegend: false,
					name: 'Financial Freedom',
					data: res.certData,
				}, {
					showInLegend: false,
					name: 'Student Loan',
					data: res.workData
				}, {
					showInLegend: false,
					name: 'NetWorth',
					data: res.spredData
				}],
				tooltip: {
					shared: true,
					useHTML: true,
					formatter: function() {
						var tooltip = "<span style='display: inline-block; width: 220px;'>";
						tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
						for (point of this.points) {
							tooltip += '<span style="color:{series.color}">'+leftSpan(point.series.name + ":")+'</span>' + rightSpan('<b>'+ point.y + '</b>' + '&nbsp;' + '<b>' + 'Downloads' + '</b>');
							tooltip += "<br/>";
						}
						tooltip += "</span>";
						return tooltip;

					}
				},
			});
			function leftSpan(text) {
				return "<span style='float: left;'>" + text + "</span>";
			}

			function rightSpan(text) {
				return "<span style='float: right;'>" + text + "</span>";
			}
			$('.total_downloads_loader').hide();
		}
	});
}

/*Date Range Picker*/
$('.allCalculatorsCompare_date').on('apply.daterangepicker', function(ev, picker) {
	$('.allCalculatorsCompare_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
	$('.allCalculatorsCompare_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
	getCalculatorsComparisonGraphData_func();
});



/* Get App Users Comparision Graph */
function getAppUsersComparisonGraphDataFunc(){
	$('.comparison_graph_loader').show();
	var dateRange 	= $('.year_over_year_compare_date_data').val();
	var search_type=$('.user_table_comparision_users').find('option:selected').val();
	var dataSelected = $('.comparison_graph_selection').find('option:selected').val();
	var classSelected = $('.comparison_graph_selection').find('option:selected').val();
	$('#ComparisonGraph').removeAttr('class').addClass(classSelected);
	$.ajax({
		url: adminApiUrl()+'getAppUsersComparisonGraphData',
		type: 'POST',
		dataType: 'json',
		data: {"token": secretToken(),"dateRange": dateRange,"search_type":search_type},
		async: true,
		success: function(res){
			$('.year_over_year_compare_graph .left_sec .total-user').html(" "+res.total_users);
			var legend = true;			
			Highcharts.chart('yearlyComparisionCalculatorsGraph', {
				chart: {zoomType: 'x',type: 'column',styledMode: true,
				resetZoomButton: {position: {x: 0,y: -30}}},
				navigation: {buttonOptions: {enabled: false}},title: false,
				xAxis: {
					categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
					min: 0,
					scrollbar: {
						enabled: false,
						barBackgroundColor: 'gray',
						barBorderRadius: 7,
						barBorderWidth: 0,
						buttonBackgroundColor: 'gray',
						buttonBorderWidth: 0,
						buttonBorderRadius: 7,
						trackBackgroundColor: 'none',
						trackBorderWidth: 1,
						trackBorderRadius: 8,
						trackBorderColor: '#CCC'
					},
					tickLength: 0
				},
				title: {text: 'demo'}, 
				yAxis: {min: 0,title: {text: ''},},
				legend: {
					enabled: legend
				},
				tooltip: {useHTML: true},
				plotOptions: {column: res.dataStackTye},				
				series: res.data,				
			});
			$('.comparison_graph_loader').hide();			
		}
	});
}

/*Date Range Picker*/
$('.year_over_year_compare_date').on('apply.daterangepicker', function(ev, picker) {
	$('.year_over_year_compare_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
	$('.year_over_year_compare_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
	getAppUsersComparisonGraphDataFunc();
});

$('.user_table_comparision_users').on('change',function(){
getAppUsersComparisonGraphDataFunc();
});


/* DataTable Pagination */
$('body').on('click', '.dataTables_paginate li a, .dataTables_paginate li',function(e){
	e.preventDefault();
	var parent_id = $(this).parents('.dataTables_wrapper');
	$('html, body').animate({
		scrollTop: parent_id.offset().top-100
	}, 500);

});	



//-> END OF READY
});