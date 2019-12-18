// var url = window.location.protocol + "//" + window.location.host + "/pro1/enrich_tool/"; 
$(document).ready(function(){
	var debt_id = '';
	debt_id 	= $('#form_id').val(); 
	if(debt_id != ''){
		$('#loading').show();
		var url1 = getWebroot()+"Tools/show_graph_by_debt_id";
		$.post(url1,{"debt_id":debt_id,"title_val":0},function(data){
			if(data != ''){
				$('#dept_info').html('');
				$('#dept_info').html(data);
			}
			$('#loading').hide();
		});
	}
});

function show_graph_by_year(current_value){
	$('.prev-no').attr("disabled","disabled");
	$('.next-no').attr("disabled","disabled");
	var trim_val   = $.trim(current_value);
	var form_id    = $('#form_id').val();
	var title_id   = $('#title_id').val();
	var title_val  = '';
	if(title_id == ''){
		title_val = 0;
	}else{
		title_val = title_id;
	}
	$('#year_val').val('');
	$('#year_val').val(trim_val);

	var url_val = getWebroot()+"Tools/show_graph_by_year";
	$('#loading').show();
	$.post(url_val,{"year":trim_val,"id":form_id,'title_id':title_val},function(data){
		if(data != ''){
			var dataPoint  = [];
			var remains    = [];
			var title      = '';
			var xtext      = '';
			var data       = JSON.parse(data);

			for (var i = 0; i < data.length; i++) {
				title = data[i].title_id;
				remains.push([data[i].remaining]);
				dataPoint.push([data[i].month,Number(data[i].interest)]);
			}

			$('#title_id').val('');
			$('#title_id').val(title);
			$('#paid-graph').highcharts({ 
				chart: {
					spacingTop: 50,
					type: 'column',
					events:{
						drillup: function (e) {
							console.log(this);
							console.log(this.options.series[0].name);
							console.log(this.options.series[0].data[0].name);
						},
					},
					height: 250,
					backgroundColor: 'transparent',
				},
				title: {
					text: ''
				},
				credits: {
					enabled: false
				},
				xAxis: {
					type: 'category',
					gridLineColor: 'transparent',
					lineColor: 'transparent',
					tickColor: 'transparent',
					showEmpty: false,
					labels: {
						rotation: -90,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif',
							color: '#b2b2b2'
						}
					}
				},
				yAxis: {
					labels: {
						rotation: 0,
						format: '${value}',
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
					text: false,
					title: {
						text: false,
					},
				},

				tooltip: {
					shared: true,
					useHTML: true,

					formatter: function() {
						var pay 	= remains[this.x];
						var text1 	= 'Interest Paid';
						var text2 	= 'Total Interest Paid';
						title_val 	= parseInt(title_val);
						switch(title_val){
							case 1: text1 = 'Minimum This Month'; text2 = 'Total Paid to Date'; break;
							case 2: text1 = 'Interest Paid'; text2 = 'Total Interest Paid'; break;
							case 3: text1 = 'Principal Paid'; text2 = 'Principal Remaining'; break;
							case 4: text1 = 'Principal Paid to Date'; text2 = 'Principal Owing'; break;
							default:text1 = 'Interest Paid'; text2 = 'Total Interest Paid'; break;
						}
						var s = '<table><tr><td style="color: #414042;text-align:center">'+text1+'</td></tr>' +
						'<tr><td style="text-align: center;color:#6399AE"><b>$'+Highcharts.numberFormat(this.y,2,'.',',')+'</b></td></tr>'+
						'<tr><td style="color: #414042;text-align:center">'+text2+'</td></tr>'+
						'<tr><td style="text-align: center;color:#6399AE"><b>$'+Highcharts.numberFormat((pay),2,'.',',')+'</b></td></tr>'+
						'</table>';
						return s;
					},
					valueDecimals: 2
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						dataLabels: 
						{
							enabled: true,
						}
					}
				},
				legend: {
					enabled: false
				},
				series: [{
					data: dataPoint,
					name: false,
					color: '#6399AE',
					maxPointWidth: 50,
					dataLabels: {
						enabled: false,
						rotation: -90,
						y: 20,
						align: 'center',
						format: '${point.y:.2f}',
						style: {
							color: '#000000',
							fill: '#000000',
							fontSize: '11px',
							fontFamily: 'Verdana, sans-serif'
						}
					}
				}],
			});
		}
		$('.prev-no').removeAttr("disabled");
		$('.next-no').removeAttr("disabled");
		$('#loading').hide();
	});
} 


function show_percent_by_month(current_value){
	$('.prev-no-style').attr("disabled","disabled");
	$('.next-no-style').attr("disabled","disabled");
	var trim_val 	= $.trim(current_value);
	var form_id 	= $('#form_id').val();
	var title_id 	= $('#title_id').val();
	var title_val 	= '';
	if(title_id == ''){
		title_val = 0;
	}else{
		title_val = title_id;
	}
	var url_val = getWebroot()+"Tools/show_percent_by_month";
	$('#loading').show();
	$.post(url_val,{"current_value":trim_val,"form_id":form_id,'title_id':title_val},function(data){
		if(data != ''){
			var val = JSON.parse(data);
			$('#percentage').html(val.percent+"% paid");
			$('#pay').html('$'+val.monthly_pay);
			$('#loader').html('');
			$('#loader').circliful({
				animation: 1,
				animationStep: 10,
				foregroundBorderWidth: 15,
				backgroundBorderWidth: 15,
				foregroundColor : '#a0ba3b',
				backgroundColor : '#6399AE',
				percent: val.percent,
				textSize: 20,
				textStyle: 'font-size: 12px;',
				textColor: '#666',
			});
			$('.prev-no-style').removeAttr("disabled");
			$(".next-no-style").removeAttr("disabled");
		}
		$('#loading').hide();
	});
}

function display_graph(id){
	var title_id = $('#title_id').val();
	var title_val = '';
	if(title_id == ''){
		title_val = 0;
	}else{
		title_val = title_id;
	}
	var url1 = getWebroot()+"Tools/show_graph_by_debt_id";
	$('#loading').show();
	$.post(url1,{"debt_id":id,"title_val":title_val},function(data){
		if(data != ''){
			$('#slider').toggle();
			$('#dept_info').html('');
			$('#dept_info').html(data);
		}
		$('#loading').hide();
	});
}


function show_slider(){
	$('#slider').toggle();
}

function show_graph_by_title(id){
	$('.prev').attr("disabled","disabled");
	$('.next').attr("disabled","disabled");
	var title_id 	= parseInt(id);
	var debt_id 	= $('#form_id').val();
	var year_val 	= $('#year_val').val();
	var url1 		= getWebroot()+"Tools/show_graph_by_title";
	$('#loading').show();
	$.post(url1,{"debt_id":debt_id,"title_val":title_id,'year':year_val},function(data){
		if(data != ''){
			var dataPoint = [];
			var remains = [];
			var title = '';
			var xtext = '';
			var data = JSON.parse(data);
			for (var i = 0; i < data.length; i++) {
				title = data[i].title_id;
				remains.push([data[i].remaining]);
				dataPoint.push([data[i].month,Number(data[i].interest)]);
			}
			$('#title_id').val('');
			$('#title_id').val(title);
			$('#paid-graph').highcharts({ 
				chart: {
					type: 'column',
					events:{
						drillup: function (e) {
							console.log(this);
							console.log(this.options.series[0].name);
							console.log(this.options.series[0].data[0].name);
						},
					},
					height: 250,
					backgroundColor: 'transparent',
				},
				title: {
					text: ''
				},
				credits: {
					enabled: false
				},
				xAxis: {
					type: 'category',
					gridLineColor: 'transparent',
					lineColor: 'transparent',
					tickColor: 'transparent',
					showEmpty: false,
					labels: {
						rotation: -90,
						style: {
							fontSize: '13px',
							fontFamily: 'Verdana, sans-serif',
							color: '#b2b2b2'
						}
					}
				},
				yAxis: {
					labels: {
						format: '${value}',
						style: {
							color: Highcharts.getOptions().colors[1]
						}
					},
					text: false,
					title: {
						text: false,
					},
				},
				tooltip: {
					shared: true,
					useHTML: true,
					formatter: function() {
						var text1 	= 'Interest Paid';
						var text2 	= 'Total Interest Paid';
						switch(title_id){
							case 1: text1 = 'Minimum This Month'; text2 = 'Total Paid to Date'; break;
							case 2: text1 = 'Interest Paid'; text2 = 'Total Interest Paid'; break;
							case 3: text1 = 'Principal Paid'; text2 = 'Principal Remaining'; break;
							case 4: text1 = 'Principal Paid to Date'; text2 = 'Principal Owing'; break;
							default:text1 = 'Interest Paid'; text2 = 'Total Interest Paid'; break;

						}

						var pay = remains[this.x];
						var s = '<table><tr><td style="color: #414042;text-align:center">'+text1+'</td></tr>' +
						'<tr><td style="text-align: center;color:#6399AE"><b>$'+Highcharts.numberFormat(this.y,2,'.',',')+'</b></td></tr>'+
						'<tr><td style="color: #414042;text-align:center">'+text2+'</td></tr>'+
						'<tr><td style="text-align: center;color:#6399AE"><b>$'+Highcharts.numberFormat((pay),2,'.',',')+'</b></td></tr>'+
						'</table>';
						return s;
					},
					valueDecimals: 2
				},
				plotOptions: {
					series: 
					{
						borderWidth: 0,
						dataLabels: 
						{
							enabled: true,
						}
					}
				},
				legend: 
				{
					enabled: false
				},
				series: [{
					data: dataPoint,
					name: false,
					color: '#6399AE',
					maxPointWidth: 50,
					dataLabels: {
						enabled: false,
						rotation: -90,
						y: 20,
						align: 'center',
format: '${point.y:.2f}', // one decimal
//y: 30, // 10 pixels down from the top
style: {
	color: '#000000',
	fill: '#000000',
	fontSize: '11px',
	fontFamily: 'Verdana, sans-serif'
}
}
}],
});
		}
		$('.prev').removeAttr("disabled");
		$('.next').removeAttr("disabled");
		$('#loading').hide();
	});
}