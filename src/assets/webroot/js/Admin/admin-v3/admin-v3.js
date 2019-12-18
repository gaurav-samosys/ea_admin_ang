$(document).ready(function() {

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
// // DATA_TABLE_DETAIL_POP_OUTER
// jQuery('.data_detail_click').click(function(){
// jQuery('body').addClass('data_detail_open');
// });

// $('body').on('click', '.daterangepicker ul li', function() {
// 	$('.daterangepicker ul li').removeClass('active');
//    $(this).addClass('active');
// });

// multiselect 
	$('.dash_main_filter select').on('select2:select', function (e) {
		if($(this).next('.select2').find('.select2-selection__rendered li').hasClass('select2-selection__choice')){
			$(this).addClass('selected');	
		}
	});
	// $('.dash_main_filter select').on('select2:unselect', function (e) {
	// 	if(!$(this).next('.select2').find('.select2-selection__rendered li').find('li').hasClass('select2-selection__choice')){
	// 		$(this).removeClass('selected');
	// 	}
	// });


	// jQuery('.close_data_table_detail').click(function(){
	// 	jQuery('body').removeClass('data_detail_open');
	// });
// END DATA_TABLE_DETAIL_POP_OUTER

// DATEPICKER TABLE
$('.ea_daterangepicker_datatable').daterangepicker({
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
		'Last 3 Months': [moment().subtract(3, 'months'), moment()],
		'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
		//'All Data': [moment('2010-01-01'), moment()]
	},

	
});

// DATEPICKER TABLE
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

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date01 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}


// 	$('#table_date01').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
// 			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
// 			'This Month': [moment().startOf('month'), moment().endOf('month')],
// 			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date02 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date02').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
// 			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
// 			'This Month': [moment().startOf('month'), moment().endOf('month')],
// 			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date03 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date03').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
// 			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
// 			'This Month': [moment().startOf('month'), moment().endOf('month')],
// 			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date04 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date04').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
// 			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
// 			'This Month': [moment().startOf('month'), moment().endOf('month')],
// 			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date05 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date05').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
// 			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
// 			'This Month': [moment().startOf('month'), moment().endOf('month')],
// 			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date06 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date06').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		autoUpdateInput: false,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
// 			/*'Last 7 Days': [moment().subtract(6, 'days'), moment()],*/
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
// 			/*'This Month': [moment().startOf('month'), moment().endOf('month')],*/
// 			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
// 			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
// 			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date07 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date07').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
// 			'Last 7 Days': [moment().subtract(6, 'days'), moment()],
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],
// 			'This Month': [moment().startOf('month'), moment().endOf('month')],
// 			'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date08 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date08').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],			
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],			
// 			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
// 			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
// 			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date09 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date09').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],			
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],			
// 			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
// 			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
// 			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date10 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date10').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],			
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],			
// 			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
// 			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
// 			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });

// $(function() {
// 	var start = moment().subtract(29, 'days');
// 	var end = moment();

// 	function cb(start, end) {
// 		$('#table_date11 span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
// 	}

// 	$('#table_date11').daterangepicker({
// 		startDate: start,
// 		endDate: end,
// 		ranges: {
// 			'Today': [moment(), moment()],
// 			'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],			
// 			'Last 30 Days': [moment().subtract(29, 'days'), moment()],			
// 			'Last 3 Months': [moment().subtract(3, 'months'), moment()],
// 			'Last 6 Months': [moment().subtract(6, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')],
// 			'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
// 		}
// 	}, cb);

// 	cb(start, end);
// });
// DATEPICKER TABLE

// datatable
$('#datatable,#datatable02,#datatable03,#datatable04,#datatable05').DataTable({
	"dom": "rtpi",
	"bInfo": false,
	responsive: true,
});
// datatable



// TOTAL DOWNLOADS
// Highcharts.chart('total_downloads_graph', {
// 	chart: {
// 		type: 'areaspline',
// 		showInLegend: false,
// 	},
// 	navigation: {
// 		buttonOptions: {
// 			enabled: false
// 		}
// 	},
// 	title: {
// 		text: ''
// 	},
// 	xAxis: {
// 		labels: {
// 			enabled: false
// 		},
// 		categories: [
// 		'2012',
// 		'2013',
// 		'2014',
// 		'2015',
// 		'2016',
// 		'2017',
// 		'2018'
// 		]
// 	},
// 	yAxis: {
// 		title: {
// 			text: ''
// 		}
// 	},
// 	tooltip: {
// 		shared: true,
// 		valueSuffix: ' units'
// 	},
// 	credits: {
// 		enabled: false
// 	},
// 	plotOptions: {
// 		series: {
// 			marker: {
// 				enabled: false
// 			}
// 		}
// 	},
// 	series: [{
// 		showInLegend: false,
// 		name: 'Certificates',
// 		data: [10, 8, 12, 9, 6, 10, 5]
// 	}, {
// 		showInLegend: false,
// 		name: 'Workbook',
// 		data: [6, 3, 4, 2, 3, 5, 2]
// 	}, {
// 		showInLegend: false,
// 		name: 'Spreadsheet',
// 		data: [2, 6, 8, 3, 11, 5, 2]
// 	}]
// });
// TOTAL DOWNLOADS END


//TOTAL VIDEO GRAPH
/*Highcharts.chart('total_video_graph', {
	chart: {
		type: 'column'
	},
	navigation: {
		buttonOptions: {
			enabled: false
		}
	},
	title: {
		text: ''
	},
	xAxis: {
		labels: {
			enabled: false
		}
	},
	yAxis: {
		min: 0,
		title: {
			text: ''
		}
	},
	plotOptions: {
		column: {
			stacking: 'percent'
		}
	},
	series: [
	{
		showInLegend: false,
		data: [10, 10, 10, 10, 10,10, 10, 10, 10, 10,10, 10],
		enableMouseTracking: false
	},
	{ showInLegend: false,
		name: "Years",
		data: [
		{
			name: "Jun",
			y: 62.74, 
		},
		{
			name: "Jul",
			y: 10.57,
		},
		{
			name: "Aug",
			y: 7.23,
		},
		{
			name: "Sep",
			y: 5.58,
		},
		{
			name: "Oct",
			y: 4.02,
		},
		{
			name: "Nov",
			y: 62.74, 
		},
		{
			name: "Dec",
			y: 10.57,
		},
		{
			name: "Jan",
			y: 7.23,
		},
		{
			name: "Feb",
			y: 5.58,
		},
		{
			name: "Mar",
			y: 4.02,
		},
		{
			name: "Apr",
			y: 5.58,
		},
		{
			name: "May",
			y: 4.02,
		},
		]
	}
	],
});*/
//TOTAL VIDEO GRAPH END

//TOTAL CERTFICATES GRAPH
// Highcharts.chart('total_certificates_graph', {
// 	chart: {
// 		type: 'column'
// 	},
// 	navigation: {
// 		buttonOptions: {
// 			enabled: false
// 		}
// 	},
// 	title: {
// 		text: ''
// 	},
// 	xAxis: {
// 		labels: {
// 			enabled: false
// 		}
// 	},
// 	yAxis: {
// 		min: 0,
// 		title: {
// 			text: ''
// 		}
// 	},
// 	plotOptions: {
// 		column: {
// 			stacking: 'percent'
// 		}
// 	},
// 	series: [
// 	{
// 		showInLegend: false,
// 		data: [10, 10, 10, 10, 10,10, 10, 10, 10, 10,10, 10],
// 		enableMouseTracking: false
// 	},
// 	{ showInLegend: false,
// 		name: "Years",
// 		data: [
// 		{
// 			name: "Jun",
// 			y: 62.74, 
// 		},
// 		{
// 			name: "Jul",
// 			y: 10.57,
// 		},
// 		{
// 			name: "Aug",
// 			y: 7.23,
// 		},
// 		{
// 			name: "Sep",
// 			y: 5.58,
// 		},
// 		{
// 			name: "Oct",
// 			y: 4.02,
// 		},
// 		{
// 			name: "Nov",
// 			y: 62.74, 
// 		},
// 		{
// 			name: "Dec",
// 			y: 10.57,
// 		},
// 		{
// 			name: "Jan",
// 			y: 7.23,
// 		},
// 		{
// 			name: "Feb",
// 			y: 5.58,
// 		},
// 		{
// 			name: "Mar",
// 			y: 4.02,
// 		},
// 		{
// 			name: "Apr",
// 			y: 5.58,
// 		},
// 		{
// 			name: "May",
// 			y: 4.02,
// 		},
// 		]
// 	}
// 	],
// });
//TOTAL CERTFICATES GRAPH END

//TOTAL COURSE GRAPH
// Highcharts.chart('total_course_graph', {
// 	chart: {
// 		type: 'column'
// 	},
// 	navigation: {
// 		buttonOptions: {
// 			enabled: false
// 		}
// 	},
// 	title: {
// 		text: ''
// 	},
// 	xAxis: {
// 		labels: {
// 			enabled: false
// 		}
// 	},
// 	yAxis: {
// 		min: 0,
// 		title: {
// 			text: ''
// 		}
// 	},
// 	plotOptions: {
// 		column: {
// 			stacking: 'percent'
// 		}
// 	},
// 	series: [
// 	{
// 		showInLegend: false,
// 		data: [10, 10, 10, 10, 10,10, 10, 10, 10, 10,10, 10],
// 		enableMouseTracking: false
// 	},
// 	{ showInLegend: false,
// 		name: "Years",
// 		data: [
// 		{
// 			name: "Jun",
// 			y: 62.74, 
// 		},
// 		{
// 			name: "Jul",
// 			y: 10.57,
// 		},
// 		{
// 			name: "Aug",
// 			y: 7.23,
// 		},
// 		{
// 			name: "Sep",
// 			y: 5.58,
// 		},
// 		{
// 			name: "Oct",
// 			y: 4.02,
// 		},
// 		{
// 			name: "Nov",
// 			y: 62.74, 
// 		},
// 		{
// 			name: "Dec",
// 			y: 10.57,
// 		},
// 		{
// 			name: "Jan",
// 			y: 7.23,
// 		},
// 		{
// 			name: "Feb",
// 			y: 5.58,
// 		},
// 		{
// 			name: "Mar",
// 			y: 4.02,
// 		},
// 		{
// 			name: "Apr",
// 			y: 5.58,
// 		},
// 		{
// 			name: "May",
// 			y: 4.02,
// 		},
// 		]
// 	}
// 	],
// });
//TOTAL COURSE GRAPH END

// COMPARISONGRAPH
// Highcharts.chart('ComparisonGraph', {
// 	chart: {
// 		zoomType: 'xy',
// 		type: 'column',
// 		styledMode: true
// 	},
// 	navigation: {
// 		buttonOptions: {
// 			enabled: false
// 		}
// 	},
// 	title: {
// 		text: '',
// 	},
// 	xAxis: {
// 		categories: [
// 		'Jan',
// 		'Feb',
// 		'Mar',
// 		'Apr',
// 		'May',
// 		'Jun',
// 		'Jul',
// 		'Aug',
// 		'Sep',
// 		'Oct',
// 		'Nov',
// 		'Dec'
// 		],
// 		min: 0,
// 		max: 4,
// 		scrollbar: {
// 			enabled: true,
// 			barBackgroundColor: 'gray',
// 			barBorderRadius: 7,
// 			barBorderWidth: 0,
// 			buttonBackgroundColor: 'gray',
// 			buttonBorderWidth: 0,
// 			buttonBorderRadius: 7,
// 			trackBackgroundColor: 'none',
// 			trackBorderWidth: 1,
// 			trackBorderRadius: 8,
// 			trackBorderColor: '#CCC'
// 		},
// 		tickLength: 0
// 	}, 
// 	yAxis: {
// 		min: 0,
// 		title: {
// 			text: ''
// 		},
// 	},
// 	tooltip: {
// 		useHTML: true
// 	},
// 	plotOptions: {
// 		column: {
// 			pointPadding: 0.1,
// 			borderWidth: 0
// 		}
// 	},
// 	series: [{
// 		name: 'Year 2009',
// 		data: [10, 71.5, 30, 129.2, 15, 176.0, 20, 148.5, 216.4, 194.1, 20.6, 54.4]

// 	}, {
// 		name: 'Year 2010',
// 		data: [60.6, 25.8, 98.5, 93.4, 106.0, 84.5, 60.0, 104.3, 91.2, 83.5, 106.6, 92.3]

// 	}, {
// 		name: 'Year 2011',
// 		data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

// 	}, {
// 		name: 'Year 2012',
// 		data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

// 	}
// 	, {
// 		name: 'Year 2013',
// 		data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

// 	}
// 	, {
// 		name: 'Year 2014',
// 		data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

// 	}
// 	, {
// 		name: 'Year 2015',
// 		data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

// 	}
// 	, {
// 		name: 'Year 2016',
// 		data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

// 	}
// 	, {
// 		name: 'Year 2017',
// 		data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

// 	}
// 	, {
// 		name: 'Year 2018',
// 		data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

// 	},
// 	{
// 		name: 'Average',
// 		type: 'spline',
// 		data: [10, 20, 5, 30,10, 21.5, 5.2, 40.5, 60.3, 18.3, 93.9, 9.6],
// 	}
// 	]
// });
// COMPARISONGRAPH END

$(window).load(function(){
	$('.main_loader').fadeOut();
});

// AM CHART MAP

	// Themes begin
	am4core.useTheme(am4themes_animated);
	// Themes end

	 // Create map instance
	 var chart = am4core.create("chartdiv", am4maps.MapChart);

	// Set map definition
	chart.geodata = am4geodata_canadaHigh;

	// Set projection
	chart.projection = new am4maps.projections.Miller();

	// Create map polygon series
	var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

	//Set min/max fill color for each area
	polygonSeries.heatRules.push({
		property: "fill",
		target: polygonSeries.mapPolygons.template,
		min: chart.colors.getIndex(1).brighten(1),
		max: chart.colors.getIndex(1).brighten(-0.3)
	});

	// Make map load polygon data (state shapes and names) from GeoJSON
	polygonSeries.useGeodata = true;

	// Configure series
	var polygonTemplate = polygonSeries.mapPolygons.template;
	polygonTemplate.tooltipText = "{name}";
	polygonTemplate.fill = am4core.color("#7ecefd");

	// Create hover state and set alternative fill color
	var hs = polygonTemplate.states.create("hover");
	hs.properties.fill = am4core.color("#a0bb3a");

	polygonSeries.data = [{
		"id": "CA-AB",
		"name": "Alberta 200",
		"value": 2,
	}, {
		"id": "CA-BC",
		"name": "British Columbia 200",
		"value": 5,
	},
	{
		"id": "CA-MB",
		"name": "Manitoba 75",
		"value": 2,
	},
	{
		"id": "CA-NB",
		"name": "New Brunswick 54",
		"value": 1,
	},
	{
		"id": "CA-NL",
		"name": "Terre Neuve et Labrador 35",
		"value": 2,
	},
	{
		"id": "CA-NS",
		"name": "Nova Scotia 3,500",
		"value": 3,
	},
	{
		"id": "CA-ON",
		"name": "Ontario 45,000",
		"value": 6,
	},
	{
		"id": "CA-PE",
		"name": "Prince Edward Island 100",
		"value": 4,
	},
	{
		"id": "CA-QC",
		"name": "Quebec 120",
		"value": 6,
	},
	{
		"id": "CA-SK",
		"name": "Saskatchewan 2,005,486",
		"value": 10,
	},
	{
		"id": "CA-NT",
		"name": "Northwest Territories 1,278",
		"value": 4,
	},
	{
		"id": "CA-NU",
		"name": "Nunavut 200",
		"value": 7,
	},
	{
		"id": "CA-YT",
		"name": "Yukon 750 ",
		"value": 9,
	}
	];
	// 	ISO CA
// AM CHART MAP END

});

// END OF READY