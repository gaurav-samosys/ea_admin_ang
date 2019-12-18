jQuery(document).ready(function(){ 

	setTimeout(function(){
		getEaAllUsersList('', 'no_filter_init', '', '', '', '');		
	}, 1000);

	/* Init ToolTip */
	$('body').tooltip({selector: '[data-toggle="tooltip"]'});

	/* Reset Filter */
	$('.resetAllFilter').on("click", function(){
		$('.main_loader').show();
		
		$('.dash_main_filter select').removeClass('selected');
		$('li.tab-link.companies').removeClass("disabled");

		$('body .select2-selection__choice').remove();

		$('input.search').val('');
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
				'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
			},			
		});

		setTimeout(function(){ $('.main_loader').hide(); }, 1000);

		$('.dash_main_filter .select_companies').val(null);
		$('.dash_main_filter .select_clients').val(null);
		$('.dash_main_filter .select_verticals').val(null);
		$('.dash_main_filter .select_location').val(null);
		$('.dash_main_filter .select_industries1').val(null).trigger("change");
	});

	/**
	* Get Data Click on TABS
	*/
	$('.dash_main_tabs li').click(function(){
		var dataTab = $(this).attr('data-tab');
		if (dataTab == 'tab_industries') {
			if ( $.fn.dataTable.isDataTable( '#industries_datatable' ) ) {
				$('#industries_datatable').DataTable().draw();
			}else {
				getIndustriesWithData();						
			}
			$(this).addClass('updated');
		}
		// Companies Tabs
		if (dataTab == 'tab_companies') {
			if ( $.fn.dataTable.isDataTable( '#companies_datatable' ) ) {
				$('#companies_datatable').DataTable().draw();
			}else {
				getCompaniesWithData();						
			}
			$(this).addClass('updated');
		}
		// Clients Tabs
		if (dataTab == 'tab_clients') {
			if ( $.fn.dataTable.isDataTable( '#clients_datatable' ) ) {
				$('#clients_datatable').DataTable().draw();
			}else {
				getClientsWithData();					
			}
			$(this).addClass('updated');
		}
		// Users Tabs
		if (dataTab == 'tab_users') {
			if ( $.fn.dataTable.isDataTable( '#users_datatable' ) ) {
                    
				$('#users_datatable').DataTable().draw();

			}else {
				getUsersWithData();
			}
			$(this).addClass('updated');
		}
		// Debt Crusher Tabs
		if (dataTab == 'tab_debt_crusher') {
			if ( $.fn.dataTable.isDataTable( '#debt_crusher_datatable' ) ) {
				$('#debt_crusher_datatable').DataTable().draw();
			}else {
				getDebtCrusherUsersWithData();
			}
			$(this).addClass('updated');
		}
		// Verticals Tabs
		if (dataTab == 'tab_verticals') {
			if ( $.fn.dataTable.isDataTable( '#verticals_datatable' ) ) {
				$('#verticals_datatable').DataTable().draw();
			}else {
				getVerticalsWithData();
			}
			$(this).addClass('updated');
		}
	});


	/* Get Top Filter Data */
	function getEaAllUsersList(selected, industries, companies, clients, verticals, location) {
	 	//$('.main_loader').show();
	 	$.ajax({
	 		url: adminApiUrl()+'getEaAllUsersList',
	 		type: 'POST',
	 		dataType: 'json',
	 		data: {"token": secretToken(),"industries": industries, "companies": companies, "clients": clients, "verticals": verticals, "location": location, "selected": selected},
	 		//async: true,
	 		success: function(res){
	 			if (res.success === true) {

	 				var selected = res.selected;
	 				/* Industries */
	 				var totalIndustriesCount 	= res.data.industries.total;
	 				var allIndustriesData 		= res.data.industries.data;
	 				/* Companies */
	 				var totalCompaniesCount 	= res.data.companies.total;
	 				var allCompaniesData 		= res.data.companies.data;
	 				/* Clients */
	 				var totalClientsCount 		= res.data.clients.total;
	 				var allClientsData 			= res.data.clients.data;
	 				/* verticals */
	 				var totalVerticalsCount 	= res.data.verticals.total;
	 				var allVerticalsData 		= res.data.verticals.data;
	 				/* location */
	 				var totalLocationCount 		= res.data.location.total;
	 				var allLocationData 		= res.data.location.data;
	 				/* customers */
	 				var totalCustomersCount 	= res.data.customers.total;
	 				/* Tools */
	 				var totalDebtCrusherCount 	= res.data.tools.total;

	 				/* Updare All Industries */				
	 				if (selected == 'onload') {
	 					var allIndustryHtml = allIndustriesData.map(function(item){
	 						return "<option value="+item.id+">"+item.name+"</option>";
	 					});

	 					$('.dash_main_filter .select_industries1').html(allIndustryHtml);
	 					$('.dash_main_filter .select_industries1').select2({
	 						placeholder: "All Industries",
	 						allowClear: false,
	 						closeOnSelect:false,
	 						width: '100%'
	 					});	 					
	 				}

	 				/* Updare All Companies */	 				
	 				if (selected == 'onload' || selected == 'industries_selected') {						
	 					if (allCompaniesData.length > 0) {
	 						var allCompaniesHtml = allCompaniesData.map(function(item){	 							
	 							return "<option value="+item.id+">"+item.company_name+"</option>";
	 						});						
	 					} else {
	 						var allCompaniesHtml = "<option value='no_companies'>No Companies Found</option>";							
	 					}	 					
	 					if (selected == 'onload') {
	 						$('.dash_main_filter .select_companies').html(allCompaniesHtml);
	 						$('.dash_main_filter .select_companies').select2({placeholder: "All Companies",allowClear: false,closeOnSelect:false,width: '100%'});
	 					} else {
	 						$('.dash_main_filter .select_companies').html(allCompaniesHtml);	 						
	 					}
	 				}

	 				/* Updare All Clients */
	 				if (selected == 'onload' || selected == 'companies_selected' || selected == 'industries_selected') {
	 					var clients_selected_ids = [];
	 					if (allClientsData.length > 0) {
	 						var allClientsHtml = allClientsData.map(function(item){
	 							clients_selected_ids.push(item.id);
	 							return "<option value="+item.id+">"+item.client_name+"</option>";
	 						});
	 					}else{
	 						var allClientsHtml = "<option value='no_clients'>No Clients Found</option>";							
	 					}	 					
	 					if (selected == 'onload') {	 						
	 						$('.dash_main_filter .select_clients').html(allClientsHtml);
	 						$('.dash_main_filter .select_clients').select2({placeholder: "All Clients",allowClear: false,closeOnSelect:false,width: '100%'});
	 						// $('.dash_main_filter .select_clients1').append(allClientsHtml).multiselect({
	 						// 	includeSelectAllOption : false,enableFiltering: true,maxHeight: 200,enableCaseInsensitiveFiltering: true,
	 						// 	nonSelectedText: 'All Clients',
	 						// 	onChange: function(element, checked) {									
	 						// 		getEaAllUsersList('clients_selected', getSelectedIds('industries'), getSelectedIds('companies'), getSelectedIds('clients'), '', '');
	 						// 	},
	 						// 	onSelectAll: function() {}
	 						// });					
	 					} else {
	 						$('.dash_main_filter .select_clients').html(allClientsHtml);	 						
	 					}
	 				}

	 				/* Updare All Verticals */
	 				if (selected == 'onload' || selected == 'companies_selected' || selected == 'industries_selected' || selected == 'clients_selected') {
	 					if (allVerticalsData.length>0) {
	 						var allVerticalsHtml = allVerticalsData.map(function(item){
	 							return "<option value="+item.id+">"+item.name+"</option>";
	 						});						
	 					}else{
	 						var allVerticalsHtml = "<option value='0'>No Verticals Found</option>";							
	 					}
	 					if (selected == 'onload') {
	 						$('.dash_main_filter .select_verticals').html(allVerticalsHtml);
	 						$('.dash_main_filter .select_verticals').select2({placeholder: "All Verticals",allowClear: false,closeOnSelect:false,width: '100%'});

	 						// $('.dash_main_filter .select_verticals').append(allVerticalsHtml).multiselect({
	 						// 	includeSelectAllOption : false,enableFiltering: true,maxHeight: 200,enableCaseInsensitiveFiltering: true,
	 						// 	nonSelectedText: 'All Verticals',
	 						// 	onChange: function(element, checked) {
	 						// 		getEaAllUsersList('verticals_selected', getSelectedIds('industries'), getSelectedIds('companies'), getSelectedIds('clients'),  getSelectedIds('verticals'), '');
	 						// 	},
	 						// 	onSelectAll: function() {}
	 						// });
	 					}else{
	 						$('.dash_main_filter .select_verticals').html(allVerticalsHtml);
	 						//$('.dash_main_filter .select_verticals').multiselect('rebuild');
	 					}
	 				}

	 				/* Updare All Location */
	 				if (selected == 'onload' || selected == 'companies_selected' || selected == 'industries_selected' || selected == 'clients_selected'|| selected == 'verticals_selected') {
	 					var allLocationHtml = allLocationData.map(function(item){
	 						return "<option value="+item.id+">"+item.locationName+"</option>";
	 					});
	 					if (selected == 'onload') {
	 						$('.dash_main_filter .select_location').html(allLocationHtml);
	 						$('.dash_main_filter .select_location').select2({placeholder: "All Locations",allowClear: false,closeOnSelect:false,width: '100%'});

	 						// $('.dash_main_filter .select_location').append(allLocationHtml).multiselect({
	 						// 	includeSelectAllOption : false,enableFiltering: true,maxHeight: 200,enableCaseInsensitiveFiltering: true,
	 						// 	nonSelectedText: 'All Location',
	 						// 	onChange: function(element, checked) {
	 						// 		getEaAllUsersList('location_selected', getSelectedIds('industries'), getSelectedIds('companies'), getSelectedIds('clients'), getSelectedIds('verticals'), getSelectedIds('location'));
	 						// 	},
	 						// 	onSelectAll: function() {}
	 						// });
	 					}else{
	 						$('.dash_main_filter .select_location').html(allLocationHtml);
	 						//$('.dash_main_filter .select_location').multiselect('rebuild');	
	 					}
	 				}

	 				/* Update Tabs Count */
	 				/* Industries Count */
	 				if ( selected == 'onload' || selected == 'industries_selected') {
	 					$('li.tab-link.industries').removeClass("disabled");
	 					$('li.tab-link.companies').removeClass("disabled");
	 					$('.dash_main_tabs .industries span').html(totalIndustriesCount);
	 					$('li.tab-link.industries').trigger("click");
	 				}
	 				/* Companies Count */
	 				if ( selected == 'onload' || selected == 'industries_selected' || selected == 'companies_selected') {
	 					$('.dash_main_tabs .companies span').html(totalCompaniesCount);
	 				}
	 				/* Client Count */
	 				if ( selected == 'onload' || selected == 'clients_selected' || selected == 'industries_selected' || selected == 'companies_selected' || selected == 'location_selected' || selected == 'verticals_selected') {
	 					$('.dash_main_tabs .clients span').html(totalClientsCount);
	 				}
	 				/* Vertical Count */
	 				if ( selected == 'onload' || selected == 'verticals_selected' || selected == 'clients_selected' || selected == 'industries_selected' || selected == 'companies_selected') {
	 					$('.dash_main_tabs .verticals span').html(totalVerticalsCount);
	 				}
	 				/* Customer Count */
	 				$('.dash_main_tabs .customers span').html(totalCustomersCount);

	 				/* Debt Crusher Count */
	 				$('.dash_main_tabs .debt_crusher span').html(totalDebtCrusherCount);

	 				/* Update Tabs */
	 				if (selected == 'companies_selected') {
	 					if (companies == 'no_filter_init') {
	 						$('li.tab-link.industries').removeClass("disabled");
	 						$('li.tab-link.companies').removeClass("disabled");
	 					}else{
	 						$('li.tab-link.companies').removeClass("disabled");
	 						$('li.tab-link.industries').addClass("disabled");
	 					}
	 					$('li.tab-link.companies').trigger("click");
	 				}
	 				if (selected == 'clients_selected') {
	 					if (clients == 'no_filter_init') {
	 						$('li.tab-link.industries').removeClass("disabled");
	 						$('li.tab-link.companies').removeClass("disabled");
	 					}else{
	 						$('li.tab-link.industries').addClass("disabled");
	 						$('li.tab-link.companies').addClass("disabled");	 						
	 					}
	 					$('li.tab-link.clients').trigger("click");
	 				}
	 				if (selected == 'verticals_selected' || selected == 'location_selected') {
	 					if (verticals == 'no_filter_init' || location == 'no_filter_init') {
	 						$('li.tab-link.industries').removeClass("disabled");
	 						$('li.tab-link.companies').removeClass("disabled");
	 					}else{
	 						$('li.tab-link.industries').addClass("disabled");
	 						$('li.tab-link.companies').addClass("disabled");	 						
	 					}
	 					$('li.tab-link.customers').trigger("click");	 					
	 				}

	 				getUserGraphData();
	 				getVideoViewsGraphData();
	 				getCertificationGraphData();
	 				getDownloadsGraphData();
	 				getCompletionGraphData();
	 				getComparisonGraphData();
	 				getAccessCodeGraphData();

	 				/* Trigger on Select And Deselect */
	 				$('.dash_main_filter select').each(function(){
	 					/* Add Selected Class in dropdown */
	 					if(!$(this).next('.select2').find('.select2-selection__rendered li').hasClass('select2-selection__choice')){
	 						$(this).removeClass('selected');
	 					}
	 					/* Add multi_select class on dropdown <ul> */
	 					var selectLength = $(this).next('.select2').find('.select2-selection__rendered li').length;	 					
	 					if(selectLength > 3){	 						
	 						$(this).next('.select2').find('.select2-selection__rendered').addClass('multi_selected');
	 						$(this).next('.select2').find('.select2-selection__rendered li').hide();
	 						var select2text = [];
	 						$.each($(this).select2('data'), function(index, value){
	 							select2text.push(value.text);
	 						});
	 						$(this).next('.select2').find('.select2-selection__rendered').attr('title', select2text.join(', '));
	 					}else{
	 						$(this).next('.select2').find('.select2-selection__rendered').removeClass('multi_selected');
	 						$(this).next('.select2').find('.select2-selection__rendered li').show();
	 					}
	 				});
	 				$('.main_loader').hide();
	 			}
	 		},
	 		error: function(){},
	 		complete: function(){},
	 	});}

		/**
		* Get Selected Data
		*/
		function getSelectedIds(output) {
			var selectedIds = [];
			/* Check Selection is initialize or not */
			var initCheck = $('.dash_main_filter .select_industries1 option:selected').length;
			initCheck += $('.dash_main_filter .select_companies option:selected').length;
			initCheck += $('.dash_main_filter .select_clients option:selected').length;
			initCheck += $('.dash_main_filter .select_verticals option:selected').length;
			initCheck += $('.dash_main_filter .select_location option:selected').length;
			if (initCheck <= 0) {
				return 'no_filter_init';
			}
			
			if (output == 'industries') {
				var dt = $('.dash_main_filter .select_industries1').select2('val');
				if (dt) {
					return dt.join(',');
				}
			}

			if (output == 'clients') {
				clientsCheck = $('.dash_main_filter .select_clients option:selected').length;			
				if (clientsCheck > 0) {
					var selectedIds = $('.dash_main_filter .select_clients').select2('val');
					return selectedIds.join(',');
				}else{
					selectedIds = $('.dash_main_filter .select_clients option');
					var selection = [];
					selectedIds.each(function(index, brand){
						selection.push(brand.value);
					});					
					return selection.join(",");
				}
			}

			
			// if (output == 'industries') {
			// 	var selectedIds = $('.dash_main_filter .select_industries option:selected');
			// 	if (selectedIds.length <= 0) {
			// 		selectedIds = $('.dash_main_filter .select_industries option');
			// 	}
			// }
			if (output == 'companies') {
				var selectedIds = $('.dash_main_filter .select_companies option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_companies option');
				}		
			}
			if (output == 'clients') {
				var selectedIds = $('.dash_main_filter .select_clients option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_clients option');
				}
			}
			if (output == 'verticals') {
				var selectedIds = $('.dash_main_filter .select_verticals option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_verticals option');
				}
			}
			if (output == 'location') {
				var selectedIds = $('.dash_main_filter .select_location option:selected');		
			}
			var selection = [];
			if (selectedIds.length > 0) {
				selectedIds.each(function(index, brand){
					selection.push(brand.value);
				});				
			}
			return selection.join(",");
		}

		/* On Change TOP FILTER */
		/* Industries */
		$('.dash_main_filter .select_industries1').on("change", function(e){
			getEaAllUsersList('industries_selected', getSelectedIds('industries') , '', '', '');
		});
		/* Companies */
		$('.dash_main_filter .select_companies').on("change", function(e){
			getEaAllUsersList('companies_selected', '', getSelectedIds('companies'), '', '', '');
		});
		/* Clients */
		$('.dash_main_filter .select_clients').on("change", function(e){
			getEaAllUsersList('clients_selected', '', '', getSelectedIds('clients'), '', '');
		});
		/* Verticals */
		$('.dash_main_filter .select_verticals').on("change", function(e){
			getEaAllUsersList('verticals_selected', '', '', '', getSelectedIds('verticals'), '');
		});
		/* Verticals */
		$('.dash_main_filter .select_location').on("change", function(e){
			getEaAllUsersList('location_selected', '', '', '', getSelectedIds('verticals'), getSelectedIds('location'));
		});


		// if ($(window).width() < 992) {
		// 	$('#industries_datatable').DataTable({
		// 		responsive: true,
		// 	});
		// 	$('#users_datatable').DataTable({
		// 		responsive: true,
		// 	});
		// 	$('#companies_datatable').DataTable({
		// 		responsive: true,
		// 	});
		// 	$('#clients_datatable').DataTable({
		// 		responsive: true,
		// 	});
		// 	$('#verticals_datatable').DataTable({
		// 		responsive: true,
		// 	});
		//  }

		/* Get All Data For All Industries*/
		function getIndustriesWithData(){
			
			$('#industries_datatable').DataTable({
				"bFilter" : false,               
				"bLengthChange": false,
				"bInfo": true,
				"processing": true,
				"serverSide": true,
				responsive: false,
				ajax: {
					"type": 'POST',			
					"url": adminApiUrl()+'getIndustriesWithData', 			
					"dataSrc": function (json) {
						$('#tab_industries .show_data').html(json.recordsTotal);
						$('.industries_datatable_loader').hide();
						return json.data;
					},
					'beforeSend': function (request) {
						$('.industries_datatable_loader').show();
					},
					data : function(d){
						d['token']    		= secretToken();
						d['dateRange']    	= $('.industries_datatable_date_data').val();
						d['search']      	= $('.industries_datatable_search').val();
						d['id']      		= getSelectedIds('industries');
						return d;
					},
				},
				// 'columnDefs': [{
				// 	'targets': [1,2,3],
				// 	'orderable': false,
				// }],
			});
		}
		$('.industries_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.industries_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.industries_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			$('#industries_datatable').DataTable().draw();
		});

		$('.industries_datatable_date').on('cancel.daterangepicker', function(ev, picker) {
			$('.industries_datatable_date_data').val('');
			$('#industries_datatable').DataTable().draw();
		});
		/* Industries DataTable Search */
		$('.industries_datatable_search, .industries_datatable_search_form').on('submit blur', function(e){
			e.preventDefault();
			$('.industries_datatable_loader').show();
			$('#industries_datatable').DataTable().draw();
		});


		/* Get Data For All Companies*/
		function getCompaniesWithData(){
			
			$('#companies_datatable').DataTable({
				"bFilter" : false,               
				"bLengthChange": false,
				"bInfo": true,
				"processing": true,
				"serverSide": true,
				responsive: false,
				ajax: {
					"type": 'POST',			
					"url": adminApiUrl()+'getCompaniesWithData', 			
					"dataSrc": function (json) {
						$('#tab_companies .show_data').html(json.recordsTotal);
						$('.companies_datatable_loader').hide();
						return json.data;
					},
					'beforeSend': function (request) {
						$('.companies_datatable_loader').show();
					},
					data : function(d){
						d['token']    		= secretToken();
						d['dateRange']    	= $('.companies_datatable_date_data').val();
						d['search']      	= $('.companies_datatable_search').val();
						d['industries_ids'] = getSelectedIds('industries');
						d['id'] 			= getSelectedIds('companies');
						return d;
					},
				},
				// 'columnDefs': [{
				// 	'targets': [1,2,3],
				// 	'orderable': false,
				// }],
			});
		}

		/* Date Range Picker */
		$('.companies_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.companies_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.companies_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			if ( $.fn.dataTable.isDataTable( '#companies_datatable' ) ) {
				$('#companies_datatable').DataTable().draw();
			}else {
				getCompaniesWithData();
			}
		});

		/* Companies DataTable Search */
		$('.companies_datatable_search, .companies_datatable_search_form').on('submit blur', function(e){
			e.preventDefault();
			$('.companies_datatable_loader').show();
			$('#companies_datatable').DataTable().draw();
		});

		/* Get Data For All Clients*/
		function getClientsWithData(){
			
			$('#clients_datatable').DataTable({
				"bFilter" : false,               
				"bLengthChange": false,
				"bInfo": true,
				"processing": true,
				"serverSide": true,
				responsive: false,
				ajax: {
					"type": 'POST',			
					"url": adminApiUrl()+'getClientsWithData', 			
					"dataSrc": function (json) {
						$('#tab_clients .show_data').html(json.recordsTotal);
						$('.clients_datatable_loader').hide();				
						return json.data;
					},
					'beforeSend': function (request) {
						$('.clients_datatable_loader').show();
					},
					data : function(d){
						d['token']    		= secretToken();
						d['dateRange']    	= $('.clients_datatable_date_data').val();
						d['search']      	= $('.clients_datatable_search').val();
						d['id']      		= getSelectedIds('clients');
						d['verticals_ids'] 	= getSelectedIds('verticals');
						d['location'] 		= getSelectedIds('location');
						return d;
					},
				},
				// 'columnDefs': [{
				// 	'targets': [1,2,3,4],
				// 	'orderable': false,
				// }],
			});
		}
		/* Cliets DataTable Search */
		$('.clients_datatable_search, .clients_datatable_search_form').on('submit blur', function(e){
			e.preventDefault();
			$('.clients_datatable_loader').show();
			$('#clients_datatable').DataTable().draw();
		});
		/* Date Range Picker */
		$('.clients_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.clients_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.clients_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));			
			$('#clients_datatable').DataTable().draw();		
		});

		/* Get Data For All Users*/
		function getUsersWithData(){
			$('#users_datatable').DataTable({
				"bFilter" : false,               
				"bLengthChange": false,
				"bInfo": true,
				"processing": true,
				"serverSide": true,
				responsive: false,
				ajax: {
					"type": 'POST',
					"url": adminApiUrl()+'getUsersWithData', 			
					"dataSrc": function (json) {

						var blob = new Blob(json.ExcelData, { type: 'res.data:application/vnd.ms-excel' });
	                    var downloadUrl = URL.createObjectURL(blob);
	                    //var a = document.createElement("a");
	                    var a= document.getElementById('excel_download');
	                     a.href = downloadUrl;
	                     a.download = "Enriched-Academy-Users.xls";
	                    // document.body.appendChild(a);
	                    // a.click();

						console.log(json);
						$('#tab_users .show_data').html(json.recordsTotal.toLocaleString());
						$('.users_datatable_loader').hide();

						return json.data;
					},
					'beforeSend': function (request) {
						$('.users_datatable_loader').show();
					},
					data : function(d){
						d['token']    		= secretToken();
						d['dateRange']    	= $('.users_datatable_date_data').val();
						d['search_type']   	= $('.users_datatable_search_type').val();
						d['search']      	= $('.users_datatable_search').val();
						d['status']      	= $('.users_datatable_search_status_value').val();
						d['certificates']   = $('.users_datatable_search_certificate_value').val();
						d['course']   		= $('.users_datatable_search_course_value').val();
						d['clients_ids']  	= getSelectedIds('clients');
						d['verticals']      = getSelectedIds('verticals');
						d['location']      	= getSelectedIds('location');
						return d;
					},
				},
				'columnDefs': [{
					'targets': [6],
					'orderable': false,
				}],
			});
		}

		/* Date Range Picker */
		$('.users_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.users_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.users_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			$('#users_datatable').DataTable().draw();			
		});

		/* User Search */
		$('.users_datatable_search, .users_datatable_search_form').on('submit blur', function(e){
			e.preventDefault();
			$('.users_datatable_loader').show();
			$('#users_datatable').DataTable().draw();
		});
		/* Search Type Show/Hide */
		$('.users_datatable_search_type').on('change', function(){
			if ($(this).val() == 'certificates') {
				$('.users_datatable_search_status_value').hide();
				$('.users_datatable_search_course_value').hide();
				$('#search_con_new').hide();
				$('.users_datatable_search_certificate_value').show();				
			} else if ($(this).val() == 'status') {
				$('.users_datatable_search_certificate_value').hide();
				$('.users_datatable_search_course_value').hide();
				$('#search_con_new').hide();
				$('.users_datatable_search_status_value').show();
			} else if ($(this).val() == 'course') {
				$('.users_datatable_search_certificate_value').hide();
				$('#search_con_new').hide();
				$('.users_datatable_search_status_value').hide();
				$('.users_datatable_search_course_value').show();
			}else{
				$('.users_datatable_search_certificate_value').hide();
				$('.users_datatable_search_course_value').hide();
				$('.users_datatable_search_status_value').hide();
				$('#search_con_new').show();
			}					
			$('#users_datatable').DataTable().draw();
		});

		/* Certificate Value */
		$('.users_datatable_search_certificate_value').on('change', function(){
			$('#users_datatable').DataTable().draw();			
		});
		/* Course Value On Chnage*/
		$('.users_datatable_search_course_value').on('change', function(){
			$('#users_datatable').DataTable().draw();			
		});
		/* Status Value */
		$('.users_datatable_search_status_value').on('change', function(){
			$('#users_datatable').DataTable().draw();			
		});	
		/* Get Data For All Users*/

		/* Get Data For Debt Crusher*/
		function getDebtCrusherUsersWithData(){
			
			$('#debt_crusher_datatable').DataTable({
				"bFilter" : false,               
				"bLengthChange": false,
				"bInfo": true,
				"processing": true,
				"serverSide": true,
				responsive: false,
				ajax: {
					"type": 'POST',
					"url": adminApiUrl()+'getDebtCrusherUsersWithData', 			
					"dataSrc": function (json) {
						$('#tab_debt_crusher .show_data').html(json.recordsTotal.toLocaleString());
						$('.debt_crusher_datatable_loader').hide();
						return json.data;
					},
					'beforeSend': function (request) {
						$('.debt_crusher_datatable_loader').show();
					},
					data : function(d){
						d['token']    		= secretToken();
						d['dateRange']    	= $('.debt_crusher_datatable_date_data').val();
						d['search_type']   	= $('.debt_crusher_datatable_search_type').val();
						d['search']      	= $('.debt_crusher_datatable_search').val();
						d['status']      	= $('.debt_crusher_datatable_search_status_value').val();											
						d['clients_ids']  	= getSelectedIds('clients');
						d['verticals']      = getSelectedIds('verticals');
						d['location']      	= getSelectedIds('location');
						return d;
					},
				},
				// 'columnDefs': [{
				// 	'targets': [2,3],
				// 	'orderable': false,
				// }],
			});
		}
		/* Date Range Picker */
		$('.debt_crusher_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.debt_crusher_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.debt_crusher_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			$('#debt_crusher_datatable').DataTable().draw();			
		});
		/* User Search */
		$('.debt_crusher_datatable_search_form, .debt_crusher_datatable_search').on('submit blur', function(e){
			e.preventDefault();
			$('.debt_crusher_datatable_loader').show();
			$('#debt_crusher_datatable').DataTable().draw();
		});
		/* Status Value */
		$('.debt_crusher_datatable_search_status_value').on('change', function(){
			$('#debt_crusher_datatable').DataTable().draw();			
		});
		/* Search Type Show/Hide */
		$('.users_datatable_search_type').on('change', function(){
			if ($(this).val() == 'status') {
				$('.debt_crusher_datatable_search_certificate_value').hide();
				$('.debt_crusher_datatable_search_course_value').hide();
				$('#search_con_new2').hide();
				$('.debt_crusher_datatable_search_status_value').show();			
			}else{
				$('.debt_crusher_datatable_search_certificate_value').hide();
				$('.debt_crusher_datatable_search_course_value').hide();
				$('.debt_crusher_datatable_search_status_value').hide();
				$('#search_con_new2').show();
			}					
			$('#users_datatable').DataTable().draw();
		});

		/* Get Vertical DataTable*/
		function getVerticalsWithData(){
			$('.verticals_datatable_loader').show();
			$('#verticals_datatable').DataTable({
				"bFilter" : false,               
				"bLengthChange": false,
				"bInfo": true,
				"processing": true,
				"serverSide": true,
				responsive: false,
				ajax: {
					"type": 'POST',			
					"url": adminApiUrl()+'getVerticalsWithData', 			
					"dataSrc": function (json) {
						$('#tab_verticals .show_data').html(json.recordsTotal);
						$('.verticals_datatable_loader').hide();				
						return json.data;
					},
					data : function(d){
						d['token']    		= secretToken();
						d['dateRange']    	= $('.verticals_datatable_date_data').val();
						d['search']      	= $('.verticals_datatable_search').val();
						d['clients_ids']  	= getSelectedIds('clients');
						d['id']      		= getSelectedIds('verticals');
						//d['location']      	= getSelectedIds('location');
						return d;
					},
				},
				'columnDefs': [{
					'targets': [1,2,3,4,5],
					'orderable': false,
				}],
			});
		}

		$('.verticals_datatable_search, .verticals_datatable_search_form').on('submit blur', function(e){
			e.preventDefault();
			$('.verticals_datatable_loader').show();
			$('#verticals_datatable').DataTable().draw();
		});
		/* Date Range Picker */
		$('.verticals_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.verticals_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.verticals_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			if ( $.fn.dataTable.isDataTable( '#verticals_datatable' ) ) {
				$('#verticals_datatable').DataTable().draw();
			}else {
				getVerticalsWithData();
			}
		});
		/* Get Data For All Users*/


		/* TOTAL USER GRAPH */
		function getUserGraphData(){
			$('.total_user_graph_section .loader').show();
			var dateRange 	= $('.total_user_graph_date_data').val();			
			$.ajax({
				url: adminApiUrl()+'getUserGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_user_graph .left_sec h5 span').html(res.total_users);
					$('.total_user_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
					Highcharts.chart('totalUserGraph', {
						chart: {type: 'column', zoomType: 'xy',styledMode: true, panning: true, panKey: 'shift',
						resetZoomButton: {
							position: {
			                // align: 'right', // by default
			                // verticalAlign: 'top', // by default
			                x: 0,
			                y: -30
			            }
			        }},
			        navigation: {buttonOptions: {enabled: false}},
			        title: {text: 'demo'},
			        xAxis: {labels: {enabled: true}, opposite: false,categories: res.labelName,
			        min: 0,				
			        tickLength: 0
			    },
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
					$('.total_user_graph_section .loader').hide();			
				}
			});
		}
		/* Date Range Picker */
		$('.total_user_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_user_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_user_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			getUserGraphData();
		});
		//->TOTAL USER GRAPH END

		/* TOTAL Downloads GRAPH */
		function getDownloadsGraphData(){
			$('.total_downloads_loader').show();
			var dateRange = $('.total_downloads_date_data').val();
			$.ajax({
				url: adminApiUrl()+'getDownloadsGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_downloads .left_sec h5 span').html(' '+res.totalDownloads);

					$('.total_downloads .certificates .total-count').html(res.total_cert);
					$('.total_downloads .workbook .total-count').html(res.total_work);
					$('.total_downloads .spredsheet .total-count').html(res.total_spred);

					$('.total_downloads .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
					Highcharts.chart('totalDownloadsGraph', {				
						chart: {type: 'areaspline',showInLegend: false,zoomType: 'x',
						resetZoomButton: {
							position: {
				                // align: 'right', // by default
				                // verticalAlign: 'top', // by default
				                x: 0,
				                y: -30
				            }
				        }},
				        navigation: {buttonOptions: {enabled: false}},
				        title: {text: 'demo'},
				        xAxis: {labels: {enabled: true},categories: res.labelName},
				        yAxis: {title: {text: ''}},
				        tooltip: {shared: true,valueSuffix: ' Downloads'},
				        credits: {enabled: false},
				        plotOptions: {series: {marker: {enabled: false}}},
				        series: [{
				        	showInLegend: false,
				        	name: 'Certificates',
				        	data: res.certData,
				        }, {
				        	showInLegend: false,
				        	name: 'Workbook',
				        	data: res.workData
				        }, {
				        	showInLegend: false,
				        	name: 'Tools',
				        	data: res.spredData
				        }],
				        tooltip: {
							//pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
							shared: true,
							useHTML: true,
							formatter: function() {
								var tooltip = "<span style='display: inline-block; width: 220px;'>";
								tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
								for (point of this.points) {
						          //tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>' + '&nbsp;' + '<b>' + 'Downloads' + '</b>');
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
		$('.total_downloads_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_downloads_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_downloads_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			getDownloadsGraphData();
		});
		/*TOTAL Downloads GRAPH END*/

		/*TOTAL Video views GRAPH*/
		function getVideoViewsGraphData(){
			$('.total_video_graph_loader').show();
			var dateRange = $('.total_video_graph_date_data').val();
			$.ajax({
				url: adminApiUrl()+'getVideoViewsGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_video_graph .left_sec .main_value').html(" "+res.total_users);
					$('.total_video_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
					Highcharts.chart('totalVideoViewsGraph2', {
						chart: {type: 'column', zoomType: 'x',
						resetZoomButton: {
							position: {
				                // align: 'right', // by default
				                // verticalAlign: 'top', // by default
				                x: 0,
				                y: -30
				            }
				        }},
				        navigation: {buttonOptions: {enabled: false}},
				        title: {text: 'demo'},
				        xAxis: {
				        	labels: {enabled: true},
				        	opposite: false,
				        	categories: res.labelName
				        },
				        yAxis: {min: 0,title: {text: ''}},
						// tooltip: {
						// 	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
						// 	shared: true
						// },
						tooltip: {
							shared: true,
							useHTML: true,
							formatter: function() {
								var tooltip = "<span style='display: inline-block; width: 150px;'>";
								tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
								for (point of this.points) {
									tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>');
									tooltip += "<br/>";
								}
								tooltip += "</span>";
								return tooltip;

							}
						},
						series: [{showInLegend: false,enableMouseTracking: true},
						{ 
							showInLegend: false,name: "Video Views",data: res.data
						}],
					});
					function leftSpan(text) {
						return "<span style='float: left;'>" + text + "</span>";
					}

					function rightSpan(text) {
						return "<span style='float: right;'>" + text + "</span>";
					}
					$('.total_video_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_video_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_video_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_video_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			getVideoViewsGraphData();
		});
		/*TOTAL Video Views GRAPH END*/

		/*TOTAL Certificates GRAPH*/
		function getCertificationGraphData(){
			$('.total_certificates_graph_loader').show();
			var dateRange = $('.total_certificates_graph_date_data').val();
			$.ajax({
				url: adminApiUrl()+'getCertificationGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_certificates_graph .left_sec .main_value').html(" "+res.total_users);
					
					$('.total_certificates_graph .left_sec .completed_v').html(" "+res.total_certified_users);
					$('.total_certificates_graph .left_sec .pending_v').html(" "+res.total_pending_users);

					$('.total_certificates_graph .graph_legends .certified .total-count').html(" "+res.total_certified_users);
					$('.total_certificates_graph .graph_legends .pending .total-count').html(" "+res.total_pending_users);

					Highcharts.chart('totalCertificatesGraph', {
						chart: {type: 'column', zoomType: 'x',
						resetZoomButton: {
							position: {
					                // align: 'right', // by default
					                // verticalAlign: 'top', // by default
					                x: 0,
					                y: -30
					            }
					        }},
					        navigation: {buttonOptions: {enabled: false}},
					        legend: false,
					        title: {text: 'demo'},
					        xAxis: {
					        	labels: {enabled: true},
					        	opposite: false,
					        	categories: res.labelName
					        },
					        yAxis:{
					        	labels: {
					        		formatter: function () {
					        			return this.value + '%';
					        		}
					        	}, 
					        	min: 0,title: {text: ''}
					        },
						// tooltip: {
						// 	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
						// 	shared: true
						// },
						tooltip: {
							shared: true,
							useHTML: true,
							formatter: function() {
								var tooltip = "<span style='display: inline-block; width: 150px;'>";
								tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
								for (point of this.points) {
									tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>' +'&nbsp;'+ '('+ Math.round(point.percentage)+')'+'%');
									tooltip += "<br/>";
								}
								tooltip += "</span>";
								return tooltip;

							}
						},
						plotOptions: {
							column: {
								stacking: 'percent'
							}
						},
						series: [{
							showInLegend: false
						},{
							name: 'Pending',
							data: res.pending_users,
							stack: 'accesscode'
						}, {
							name: 'Completed',
							data: res.certified_users,
							stack: 'accesscode'
						}],

						// tooltip: {
						// 	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
						// 	shared: true
						// },
						// series: [{showInLegend: false,enableMouseTracking: true},
						// { 
						// 	showInLegend: false,name: "Users",data: res.data
						// }],
					});
					function leftSpan(text) {
						return "<span style='float: left;'>" + text + "</span>";
					}

					function rightSpan(text) {
						return "<span style='float: right;'>" + text + "</span>";
					}
					$('.total_certificates_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_certificates_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_certificates_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_certificates_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			getCertificationGraphData();
		});
		/*TOTAL Certificates GRAPH END*/

		/*TOTAL Course GRAPH*/
		function getCompletionGraphData(){
			$('.total_course_graph_loader').show();
			var dateRange = $('.total_course_graph_date_data').val();
			$.ajax({
				url: adminApiUrl()+'getCompletionGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_course_graph .left_sec .main_value').html(" "+res.total_users);

					$('.total_course_graph .left_sec .completed_v').html(" "+res.totalCompletedUsers);
					$('.total_course_graph .left_sec .completed_v1').html(" "+res.totalCompletedUsers1);
					$('.total_course_graph .left_sec .pending_v').html(" "+res.totalProgressUsers);
					$('.total_course_graph .left_sec .not_started_v').html(" "+res.totalNotStartedUsers);

					$('.total_course_graph .graph_labels .completed .total-count').html(" "+res.totalCompletedUsers);
					$('.total_course_graph .graph_labels .completed1 .total-count').html(" "+res.totalCompletedUsers1);
					$('.total_course_graph .graph_labels .pending .total-count').html(" "+res.totalProgressUsers);
					$('.total_course_graph .graph_labels .notstarted .total-count').html(" "+res.totalNotStartedUsers);
					
					Highcharts.chart('totalCompletionGraph', {
						chart: {type: 'column', zoomType: 'x',
						resetZoomButton: {
							position: {
					                // align: 'right', // by default
					                // verticalAlign: 'top', // by default
					                x: 0,
					                y: -30
					            }
					        }},
					        navigation: {buttonOptions: {enabled: false}},
					        legend: false,
					        title: {text: 'demo'},
					        xAxis: {
					        	labels: {enabled: true},
					        	opposite: false,
					        	categories: res.labelName
					        },
					        yAxis: {
					        	labels: {
					        		formatter: function () {
					        			return this.value + '%';
					        		}
					        	}, 
					        	min: 0,title: {text: ''}},
					        	tooltip: {
							//pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
							shared: true,
							useHTML: true,
							formatter: function() {
								var tooltip = "<span style='display: inline-block; width: 150px;'>";
								tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
								for (point of this.points) {
									tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>' +'&nbsp;'+ '('+ Math.round(point.percentage)+')'+'%');
									tooltip += "<br/>";
								}
								tooltip += "</span>";
								return tooltip;

							}
						},
						plotOptions: {
							column: {
								stacking: 'percent'
							}
						},
						series: [{
							showInLegend: false
						},{
							name: 'Not Started',
							data: res.notStartedUsers,
							stack: 'certificates'
						},{
							name: 'Pending',
							data: res.progressUsers,
							stack: 'certificates'
						},{
							name: 'Mandatory',
							data: res.completedUsers,
							stack: 'certificates'
						},{
							name: 'Full Course',
							data: res.completedUsers1,
							stack: 'certificates'
						}],
						// tooltip: {
						// 	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
						// 	shared: true
						// },
						// series: [{showInLegend: false,enableMouseTracking: true},
						// { 
						// 	showInLegend: false,name: "Users",data: res.data
						// }],
					});
					function leftSpan(text) {
						return "<span style='float: left;'>" + text + "</span>";
					}

					function rightSpan(text) {
						return "<span style='float: right;'>" + text + "</span>";
					}
					$('.total_course_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_course_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_course_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_course_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			getCompletionGraphData();
		});
		/*TOTAL Certificates GRAPH END*/





		/*TOTAL ACCESS CODE GRAPH*/
		function getAccessCodeGraphData(){
			$('.total_access_code_graph_loader').show();
			var dateRange = $('.total_access_code_graph_date_data').val();
			$.ajax({
				url: adminApiUrl()+'getAccessCodeGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				//async: true,
				success: function(res){
					$('.total_access_code_graph .left_sec .main_value').html(" "+res.total_users);
					
					$('.total_access_code_graph .left_sec .completed_v').html(" "+res.total_used);
					$('.total_access_code_graph .left_sec .pending_v').html(" "+res.total_unused);

					$('.total_access_code_graph .graph_labels .used .total-count').html(" "+res.total_used);
					$('.total_access_code_graph .graph_labels .unused .total-count').html(" "+res.total_unused);
					
					Highcharts.chart('totalAccessCodeGraph', {
						chart: {type: 'column', zoomType: 'x',
						resetZoomButton: {
							position: {
				                // align: 'right', // by default
				                // verticalAlign: 'top', // by default
				                x: 0,
				                y: -30
				            }
				        }},
				        navigation: {buttonOptions: {enabled: false}},
				        legend: false,
				        title: {text: 'demo'},
				        xAxis: {
				        	labels: {enabled: true},
				        	opposite: false,
				        	categories: res.labelName
				        },
				        yAxis: {
				        	labels: {
				        		formatter: function () {
				        			return this.value + '%';
				        		}
				        	}, 
				        	min: 0,title: {text: ''}},
						// tooltip: {
						// 	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
						// 	shared: true
						// },
						tooltip: {
							shared: true,
							useHTML: true,
							formatter: function() {
								var tooltip = "<span style='display: inline-block; width: 150px;'>";
								tooltip += leftSpan('<b>' + this.x + '</b>') + "<br/>";
								for (point of this.points) {
									tooltip += leftSpan(point.series.name + ":") + rightSpan('<b>'+ point.y + '</b>' +'&nbsp;'+ '('+ Math.round(point.percentage)+')'+'%');
									tooltip += "<br/>";
								}
								tooltip += "</span>";
								return tooltip;
							}
						},
						plotOptions: {
							column: {
								stacking: 'percent'
							}
						},
						series: [{
							showInLegend: false
						},{
							name: 'Unused Code',
							data: res.unused,
							stack: 'accesscode'
						}, {
							name: 'Used Code',
							data: res.used,
							stack: 'accesscode'
						}],

						// tooltip: {
						// 	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
						// 	shared: true
						// },
						// series: [{showInLegend: false,enableMouseTracking: true},
						// { 
						// 	showInLegend: false,name: "Users",data: res.data
						// }],
					});
					function leftSpan(text) {
						return "<span style='float: left;'>" + text + "</span>";
					}

					function rightSpan(text) {
						return "<span style='float: right;'>" + text + "</span>";
					}
					$('.total_access_code_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_access_code_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_access_code_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_access_code_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			getAccessCodeGraphData();
		});
		/*TOTAL Certificates GRAPH END*/


		/*TOTAL Comparison GRAPH*/
		function getComparisonGraphData(){
			$('.comparison_graph_loader').show();
			var dateRange 	= $('.comparison_graph_date_data').val();
			var dataSelected = $('.comparison_graph_selection').find('option:selected').val();
			var classSelected = $('.comparison_graph_selection').find('option:selected').val();
			$('#ComparisonGraph').removeAttr('class').addClass(classSelected);
			$.ajax({
				url: adminApiUrl()+'getComparisonGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"dateRange": dateRange, "dataSelected": dataSelected, "industries_ids":  getSelectedIds('industries'), "clients_ids":  getSelectedIds('clients'), "companies_ids":  getSelectedIds('companies'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.comparison_graph .left_sec .total-user').html(" "+res.total_users);			
					if (dataSelected == 'total_course_completions') {
						var legend = false;

						$('.comparison_graph .full_course .total-count').html(" "+res.fullCourse);
						$('.comparison_graph .mandatory_course .total-count').html(" "+res.mandatoryCourse);

					}else{
						var legend = true;
					}
					Highcharts.chart('ComparisonGraph', {
						chart: {zoomType: 'x',type: 'column',styledMode: true,
						resetZoomButton: {position: {x: 0,y: -30}}},
						navigation: {buttonOptions: {enabled: false}},title: {text: 'demo',},
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
						yAxis: {min: 0,title: {text: ''},},
						legend: {
							enabled: legend
						},
						tooltip: {useHTML: true},
				// tooltip: {
				// 	pointFormat: '<span style="display: inline-block; width: 90px;"><span style="color:{series.color};float: left;">{series.name}</span>: <span style="float: left;"><b>{point.y}</b></span><br/></span>',
				// 	shared: true
				// },
				plotOptions: {column: res.dataStackTye},				
				series: res.data,				
			});
					$('.comparison_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.comparison_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.comparison_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.comparison_graph_date_data').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
			getComparisonGraphData();
		});
		/*Selection data*/
		$('.comparison_graph_selection').change(function(){
			getComparisonGraphData();	
		});
		/*TOTAL Comparision GRAPH END*/



		
		$('body').on('click', '.get_single_users_detail', function(e){
			$('#loader').show().css('z-index','999999');	
			e.preventDefault();
			var user_id = $(this).attr('data-user_id');
			$.ajax({
				url: adminApiUrl()+'getUserDataById',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"id": user_id, 'fields': '*'},
				async: true,
				success: function(res){
					$('#loader').hide().css('z-index','');	
			        var resData = res.data;
                	var body = '<div class="row"><div class="col-lg-3 col-md-4 col-sm-12"><div class="user_modal_left"><label class="switch switch_bx">';
					if (resData.status == 'Active') 
					{
						body += '<p class="switch_texts">Active</p><input class="switch_check" id="active_check" type="checkbox" name="user_status" checked>';
					}
					else
					{
						body += '<p class="switch_texts">InActive</p> <input type="checkbox" class="switch_check" id="inactive_check"  name="user_status">';
     				}

					
				    body += '<span class="slider round"></span></label><div class="user_img_section"><img src="https://staging.enrichedacademy.com/app/webroot/img/uploads/PRIVATE_LENDING649530980788132970.jpg">';
					body += '<div class="user_progress">'+resData.overAllProgress+'%</div>'
					body += '<h2 class="user_name_head">'+resData.first_name+ ' '+resData.last_name+'</h2>';
					body += '</div>'
					body += '<div class="user_detail_left"><ul class="first_section"><li><div class="field_con"><p>Email ID</p><h4 class="border_cls_btm"><a href="mailto:'+resData.email+'" id="user_popup_email">'+resData.email+'</a></h4></div>';
					body += '<div class="field_con"><p>Phone</p><h4 id="show_phone_number" class="border_cls_btm">'+resData.phone_no+'</h4></div>';
					body += '<div class="field_con"><p>Client Name</p><h4 class="border_cls_btm">'+resData.client_name+'</h4></div></li>';
					body += '<li><div class="field_con"><p>Company Name</p><h4 class="border_cls_btm">'+resData.company_name+'</h4></div>';
					body += '<div class="field_con"><p>Location</p><h4 class="border_cls_btm">'+resData.city+'</h4></div>';
					body += '<div class="field_con"><p>Vertical Name</p><h4 class="border_cls_btm">'+resData.client_vertical+'</h4></div></li>';
					body += '<li><div class="field_con"><p>Registration Date</p><h4 class="border_cls_btm">'+resData.created_on+'</h4></div>';
                    if(resData.access_code=='')
                    {
                    body += '<div class="field_con"><p>Access Code</p><h4 class="border_cls_btm">NA</h4></div>';
                    }
                    else
                    {
                    body += '<div class="field_con"><p>Access Code</p><h4 class="border_cls_btm">'+resData.access_code+'</h4></div>';
                    }
					
					
					body += '<div class="field_con"><p>Progress Status</p><h4 class="border_cls_btm">'+resData.progress_status+'</h4>';


					body += '<ul>';

					if(resData.overAllProgress==100)
					{
                    body += '<li><img src="'+baseUrl()+'img/user_popup/right_popup.png"> <span>Course Complete</span></li>';
					}
					else
					{
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Course Complete</span></li>';	
					}
					

                    if(resData.dowload_certificate==0)
					{
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Certificate Download</span></li>';	
					}
					else
					{
                    body += '<li><img src="'+baseUrl()+'img/user_popup/right_popup.png"> <span>Certificate Download</span></li>';
					}

					body += '</ul>';

					body += '</div></li>';




					body += '<li><div class="field_con"><p>Last login</p><h4 class="border_cls_btm">'+resData.last_login+'</h4></div>';
					body += '<div style="display:none;" class="field_con"><p>Last login</p><h4 class="border_cls_btm">'+resData.client_vertical+'</h4></div></li></ul>';
					body += '<ul class="edit_profile">';
					body += '	<li>';
					body += '		<div class="form-group ">';
					body += '			<label>First Name* :</label>';
					body += '			<input type="hidden" value="'+resData.id+'"  id="edit_user_id"/>';
					body += '			<input class="form-control" id="edit_firstname" maxlength="40" value="'+resData.first_name+'" type="text">';
					body += '			<span style="color:#B03060;" id="first_name_validate" class="form_error"></span>';
					body += '		</div>';
					body += '		<div class="form-group ">';
					body += '			<label>Last Name* :</label>';
					body += '			<input class="form-control" id="edit_lastname" maxlength="40" value="'+resData.last_name+'" type="text">';
					body += '			<span style="color:#B03060;" id="last_name_validate" class="form_error"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '	<li>';
					body += '		<div class="form-group ">';
					body += '			<label>Phone* :</label>';
					body += '			<input class="form-control" id="edit_phone" maxlength="40" onkeypress="return isNumber(event)" value="'+resData.phone_no+'" type="text">';
					body += '			<span style="color:#B03060;" id="mobile_validate" class="form_error"></span>';
					body += '		</div>';
					body += '		<div class="form-group ">';
					body += '			<label>Email* :</label>';
					body += '			<input class="form-control" id="edit_email" maxlength="40" value="'+resData.email+'" type="email">';
					body += '			<span style="color:#B03060;" id="email_validate" class="form_error"></span>';
					body += '		</div>';
					// body += '		<div class="form-group ">';
					// body += '			<label>Default verticle</label>';
					// body += '			<select class="select form-control custom-select sources" placeholder="select">';
					// body += '				<option value="1">Refresh</option>';
					// body += '				<option value="6">Post Secondary</option>';
					// body += '				<option value="2">Medix</option>';
					// body += '				<option value="3">GoEasy</option>';
					// body += '				<option value="13">Wealth Mastery</option>';
					// body += '				<option value="15">Wealth Mastery Light Course</option>';
					// body += '				<option value="4">Corporation</option>';
					// body += '				<option value="14">Wealth Mastery Full Course</option>';
					// body += '				<option value="5">High School</option>';
					// body += '				<option value="16">Teens Course</option>';
					// body += '				<option value="18">Sprott Wealth Mastery Light</option>';
					// body += '				<option value="20">GreyStone Light</option>';
					// body += '				<option value="17">Sprott Wealth Mastery Full</option>';
					// body += '			</select>';
					// body += '		</div>';
					// body += '		<div class="form-group ">';
					// body += '			<label>Disable verticle</label>';
					// body += '			<select class="select form-control select2-dropdown verticals_multiple" multiple="multiple">';
					// body += '				<option value="1">Refresh</option>';
					// body += '				<option value="6">Post Secondary</option>';
					// body += '				<option value="2">Medix</option>';
					// body += '				<option value="3">GoEasy</option>';
					// body += '				<option value="13">Wealth Mastery</option>';
					// body += '				<option value="15">Wealth Mastery Light Course</option>';
					// body += '				<option value="4">Corporation</option>';
					// body += '				<option value="14">Wealth Mastery Full Course</option>';
					// body += '				<option value="5">High School</option>';
					// body += '				<option value="16">Teens Course</option>';
					// body += '				<option value="18">Sprott Wealth Mastery Light</option>';
					// body += '				<option value="20">GreyStone Light</option>';
					// body += '				<option value="17">Sprott Wealth Mastery Full</option>';
					// body += '			</select>';
					// body += '		</div>';
					body += '	</li>';
					body += '	<li>';
					body += '		<div class="form-group ">';
					body += '			<label>Change Password :</label>';
					body += '			<input class="form-control" maxlength="40" value="" type="password" id="change_password" >';
					body += '		</div>';
					body += '		<div class="form-group button_con button_con_inner">';
					body += '			<a><button id="save_edit_profile" class="save_edit">Save</button></a>';
					body += '			<a><button class="return-home-edit-profile">Cancel</button></a>';
					body += '<br>			<span style="color:green;" id="update_result"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '</ul>';


	                body += '<ul class="generate-certificate-block">';
					body += '	<li>';
					body += '		<div class="form-group">';
					body += '			<label>Email* :</label>';
					body += '			<input type="hidden" value="'+resData.id+'"  id="send_user_id"/>';
					body += '			<input class="form-control" id="gen_certificate_email" maxlength="40" value="'+resData.email+'" type="text">';
					body += '			<span style="color:#B03060;" id="generate_certificate_email_validation"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '	<li>';
					body += '		<div class="form-group button_con" style="margin-top: 22px;">';
					body += '			<a><button id="save_generate_certificate" class="save_edit">Send</button></a>';
					body += '			<a><button class="return-home">Cancel</button></a>';
					body += '<br>			<span style="color:green;" id="certificate_result"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '</ul>';


					/*body += '<p>Registered Via</p><h4 class="border_cls_btm">'+resData.registered_via+'</h4>';*/
					body += '<div class="button_con"><a><button class="btn_edit_popup">Edit Profile</button></a><a><button class="btn_generate_certificate">Generate Certificate</button></a>';
					//body += '<a><button class="btn_webinar_inv">Invite To Webinar</button></a><a><button class="btn_event_inv">Invite To Event</button></a><a><button class="btn_coaching_inv">Invite To Coaching</button></a></div>';
					body += '</div></div></div></div>';
					body += '<div class="col-lg-9 col-md-8 col-sm-12">';
					body += '<div class="right_content_popup">';
					body += '<div class="row"><div class="col-lg-6 col-md-6 col-sm-12"><div class="box_con">';
					body += '<h3>User Opportunities</h3>';
					body += '<ul class="upper_detail_ul">';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Has Kids</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Homeowner</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Mutual Funds</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Debt</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Student Loan</span></li>';
					body += '</ul></div></div>';
            		body += '<div class="col-lg-6 col-md-6 col-sm-12"><div class="box_con"><h3>Overall Progress</h3>';

					body += '<p><span>0%</span> <span class="full_progress">100%</span></p>';
					//body += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:'+resData.overAllProgress+'%">';
					body += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:'+resData.overAllProgress+'%" attr="'+resData.overAllProgress+'">';                    
                    if(resData.overAllProgress!=0 && resData.overAllProgress!=100)
                    {
                    body += '<span class="sr-only">'+resData.overAllProgress+'%</span>';
                    }
					body += '</div></div></div></div>'
              //	body += '<div class="slider_heading col-lg-12 col-md-12 col-sm-12"><div class="col-lg-6 col-md-6 col-sm-12 text-left"><h3>Course Progress (Mandatory Course)</h3></div><div class="col-lg-6 col-md-6 col-sm-12 text-right"><select class="custom-select_n"><option>Corporation</option><option>GoEasy</option><option>GreyStone Light</option><option>High School</option></select></div></div>';
            		body += '<div class="slider_heading col-lg-12 col-md-12 col-sm-12"><div class="col-lg-6 col-md-6 col-sm-12 text-left"><h3>Course Progress (Mandatory Course)</h3></div><div class="col-lg-6 col-md-6 col-sm-12 text-right"></div></div>';
                    body += '<div class="swiper-container mandatory_course_progress_slider">';
	                body += '  <div class="swiper-wrapper">';

                   
                   if(resData.verticalData) {
						var v_data = resData.verticalData;					
						for (i = 0; i < v_data.length; i++) {
						if(v_data[i].course_type==1)
						{

				
                	body +=  '	  	<div class="swiper-slide">';
					body +=  '	      <div class="card_box_main">';
					body +=  '	      	<div class="img_pro_main">';
					body +=  '	      		<div class="circle-prog-box default">';
					if (v_data[i].percentage == 0) {
								body += '<i class="fa fa-lock"></i>';
					}

                    if (v_data[i].percentage > 0) {
					body += '<div class="progress-circle" data-progress="'+v_data[i].percentage+'"></div>';	
                   
					}
					
					body +=  '	          	</div>';
					body +=  '	      		<img class="img_pro"  src="'+baseUrl()+'img/uploads/'+v_data[i].image+'">';
					body +=  '	      		<div class="icon_process_bx"></div>';
					body +=  '	      	</div>';
					body +=  '	      	<p>'+v_data[i].cat_name+'</p>';
					body +=  '	      </div>';
					body +=  '	  	</div>';


						}
					}
				    }

					body += '</div>';
					body += '    <div class="swiper-button-next"><img src="'+baseUrl()+'img/user_popup/arrow_right_white.png"></div>';
					body += '    <div class="swiper-button-prev"><img src="'+baseUrl()+'img/user_popup/arrow_left_white.png" ></div>';
					body += '    <div class="swiper-pagination"></div>';
					body += '</div>';
					body += '</div>';
 


                    if(resData.bonuscoursecount > 0)
                    {
                	//body += '<div class="slider_heading col-lg-12 col-md-12 col-sm-12"><div class="col-lg-6 col-md-6 col-sm-12 text-left"><h3>Course Progress (Bonus Course)</h3></div><div class="col-lg-6 col-md-6 col-sm-12 text-right"><select class="custom-select_n"><option>Corporation</option><option>GoEasy</option><option>GreyStone Light</option><option>High School</option></select></div></div>';
                	body += '<div class="slider_heading col-lg-12 col-md-12 col-sm-12"><div class="col-lg-6 col-md-6 col-sm-12 text-left"><h3>Course Progress (Bonus Course)</h3></div><div class="col-lg-6 col-md-6 col-sm-12 text-right"></div></div>';
                    body += '<div class="swiper-container mandatory_course_progress_slider">';
	                body += '  <div class="swiper-wrapper">';

                    if(resData.verticalData) {
						var v_data = resData.verticalData;					
						for (i = 0; i < v_data.length; i++) {
						if(v_data[i].course_type==2)
						{

				
                	body +=  '	  	<div class="swiper-slide">';
					body +=  '	      <div class="card_box_main">';
					body +=  '	      	<div class="img_pro_main">';
					body +=  '	      		<div class="circle-prog-box default">';
					if (v_data[i].percentage == 0) {
								body += '<i class="fa fa-lock"></i>';
					}

                    if (v_data[i].percentage > 0) {
                    body += '<div class="progress-circle" data-progress="'+v_data[i].percentage+'"></div>';	
					}
					
				
					body +=  '	          	</div>';
					body +=  '	      		<img class="img_pro"  src="'+baseUrl()+'img/uploads/'+v_data[i].image+'">';
					body +=  '	      		<div class="icon_process_bx"></div>';
					body +=  '	      	</div>';
					body +=  '	      	<p>'+v_data[i].cat_name+'</p>';
					body +=  '	      </div>';
					body +=  '	  	</div>';


						}
					}
				    }  
                     

					body += '</div>';
					body += '<div class="swiper-button-next"><img src="'+baseUrl()+'img/user_popup/arrow_right_white.png"></div>';
					body += '<div class="swiper-button-prev"><img src="'+baseUrl()+'img/user_popup/arrow_left_white.png"></div>';
					body += '<div class="swiper-pagination"></div>';
				    body += '</div>';
					body += '</div>';
				





                    }

                 
					
					// body += '<div class="slider_heading col-lg-12 col-md-12 col-sm-12"><div class="col-lg-6 col-md-6 col-sm-12 text-left"><h3>Course Progress (Bonus Course)</h3></div><div class="col-lg-6 col-md-6 col-sm-12 text-right"><select class="custom-select_n"><option>Corporation</option><option>GoEasy</option><option>GreyStone Light</option><option>High School</option></select></div></div>';

					// '</div>';

					// body += '<div class="swiper-container bonus_course_progress_slider">'+
					// '    <div class="swiper-wrapper">'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/understanding_credit.png">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Student Loan</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/money-myths.jpg">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Where Are You Today</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/Private_landing.jpg">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Career Mastery</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/Leverage-Equity.jpg">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Money myths</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/money-myths.jpg">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Understand Credit</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/understanding_credit.png">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Student Loan</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/money-myths.jpg">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Where Are You Today</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '	  	<div class="swiper-slide">'+
					// '	      <div class="card_box_main">'+
					// '	      	<div class="img_pro_main">'+
					// '	      		<div class="circle-prog-box default">'+
					// '	            	<i class="fa fa-lock"></i>'+
					// '	          	</div>'+
					// '	      		<img class="img_pro" src="http://localhost/enrichedacademy_live/img/user_popup/Private_landing.jpg">'+
					// '	      		<div class="icon_process_bx"></div>'+
					// '	      	</div>'+
					// '	      	<p>Career Mastery</p>'+
					// '	      </div>'+
					// '	  	</div>'+
					// '    </div>'+
					// '    <!-- Add Arrows -->'+
					// '    <div class="swiper-button-next"><img src="http://localhost/enrichedacademy_live/img/user_popup/arrow_right_white.png"></div>'+
					// '    <div class="swiper-button-prev"><img src="http://localhost/enrichedacademy_live/img/user_popup/arrow_left_white.png"></div>'+
					// '    <div class="swiper-pagination"></div>'+
					
	
					// body += '<div class="row grid_layout">';
					// if (resData.verticalData) {
					// 	var v_data = resData.verticalData;					
					// 	for (i = 0; i < v_data.length; i++) {
					// 		body += '<div class="col-md-3"><div class="card_box_main"><div class="img_pro_main">';
					// 		if (v_data[i].percentage <= 0) {
					// 			body += '<i class="fa fa-lock"></i>';
					// 		}
					// 		body += '<img src="'+baseUrl()+'img/uploads/'+v_data[i].image+'" class="img_pro">';
					// 		body += '<div class="icon_process_bx">';
					// 		if (v_data[i].percentage >= 1) {
					// 			body += '<img src="'+baseUrl()+'/img/user_popup/icon_process.png" class="icon_process_cls">';
					// 			body += '<p>'+v_data[i].percentage+'%</p>';
					// 		}
					// 		body += '</div></div>';
					// 		body += '<p>'+v_data[i].cat_name+'</p></div></div>';							
					// 	}
					// }
					// body += '</div>';
					
					body += '<div class="col-lg-6 col-md-6 col-sm-12"><h3>Total Downloads</h3>';
					body += '<div class="row tot_downloads">';
					body += '<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"><div class="card_box_main without_img_card"><p><span>'+resData.dowload_workbook+'</span> Workbook</p></div></div>';
					body += '<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"><div class="card_box_main without_img_card"><p><span>'+resData.dowload_tools+'</span> Tools</p></div></div>';
					body += '<div class="col-lg-4 col-md-4 col-sm-12 col-xs-12"><div class="card_box_main without_img_card"><p><span>'+resData.dowload_certificate+'</span> Certificates</p></div></div></div>';
					body += '</div>';
					body += '<div class="col-lg-6 col-md-6 col-sm-6"><h3>Total Views</h3><div class="row"><div class="col-lg-6 col-md-6 col-sm-12 col-xs-12"><div class="card_box_main without_img_card"><p><span>'+resData.totalVideoViews+'</span> Total number of video views</p></div></div></div></div></div></div></div></div>';

					$('.dcrf_modal .modal-body').html(body);
					$('.dcrf_modal').modal('show');

					setTimeout(function(){
						new Swiper('.mandatory_course_progress_slider', {
				            slidesPerView: 5,
				            spaceBetween: 30,
				            navigation: {
				                nextEl: '.swiper-button-next',
				                prevEl: '.swiper-button-prev',
				              },
				          pagination: {
				            el: '.swiper-pagination',
				          },
				        });

				        new Swiper('.bonus_course_progress_slider', {
				            slidesPerView: 5,
				            spaceBetween: 30,
				            navigation: {
				                nextEl: '.swiper-button-next',
				                prevEl: '.swiper-button-prev',
				              },
				          pagination: {
				            el: '.swiper-pagination',
				          },
				        });
					}, 400);

					$('.btn_edit_popup').click(function(event) {
						$('.user_detail_left').toggleClass('edit_profile_active');
						$('.user_detail_left').removeClass('gen_certificate_active');
						$("#certificate_result").html('');
						$("#update_result").html('');
						$(".btn_generate_certificate").css('display','none');
						$(".btn_edit_popup").css('display','none');
					});

					$('.btn_generate_certificate').click(function(event) {
						$('.user_detail_left').toggleClass('gen_certificate_active');
						$('.user_detail_left').removeClass('edit_profile_active');
						$("#certificate_result").html('');
						$("#update_result").html('');
						$(".btn_generate_certificate").css('display','none');
						$(".btn_edit_popup").css('display','none');
					});
					



					$('.return-home').click(function(event) {
                    $('.user_detail_left').toggleClass('gen_certificate_active');
                    $(".btn_generate_certificate").css('display','block');
					$(".btn_edit_popup").css('display','block');
					});

					$('.return-home-edit-profile').click(function(event) 
					{
                    $('.user_detail_left').toggleClass('edit_profile_active');
                    $(".btn_generate_certificate").css('display','block');
					$(".btn_edit_popup").css('display','block');
					});


					

                    
					// $('.btn_edit_popup').click(function(event) {
					// 	$('.save_edit').removeClass('edit_profile_active');
					// 	$("#certificate_result").html('');
					// 	$("#update_result").html('');
				
					// });                  


					$(".verticals_multiple").select2({
			            placeholder: "Select",
			        });

				}
			});
});

		$('body').on('click', '.get_single_users_detail', function(e){
			$('#loader').show().css('z-index','999999');	
			e.preventDefault();
			var user_id = $(this).attr('data-user_id');

			$.ajax({
				url: adminApiUrl()+'getUserDataById',
				type: 'POST',
				dataType: 'json',
				data: {"token": secretToken(),"id": user_id, 'fields': '*'},
				async: true,
				success: function(res){
					$('#loader').hide().css('z-index','');	
					var resData = res.data;

					var body = '<div class="row"><div class="col-lg-3 col-md-4 col-sm-12"><div class="user_modal_left"><label class="switch switch_bx">';
					if (resData.status == 'Active') 
					{
						body += '<p class="switch_texts">Active</p><input class="switch_check" id="active_check" type="checkbox" name="user_status" checked>';
					}
					else
					{
						body += '<p class="switch_texts">InActive</p> <input type="checkbox" class="switch_check" id="inactive_check"  name="user_status">';
					}

					
					body += '<span class="slider round"></span></label><div class="user_img_section"><img src="https://staging.enrichedacademy.com/app/webroot/img/uploads/PRIVATE_LENDING649530980788132970.jpg">';
					body += '<div class="user_progress">'+resData.overAllProgress+'%</div>'
					body += '<h2 class="user_name_head">'+resData.first_name+ ' '+resData.last_name+'</h2>';
					body += '</div>'
					body += '<div class="user_detail_left"><ul class="first_section"><li><div class="field_con"><p>Email ID</p><h4 class="border_cls_btm"><a href="mailto:'+resData.email+'" id="user_popup_email">'+resData.email+'</a></h4></div>';
					body += '<div class="field_con"><p>Contact Number</p><h4 id="show_phone_number" class="border_cls_btm">'+resData.phone_no+'</h4></div>';
					body += '<div class="field_con"><p>Client Name</p><h4 class="border_cls_btm">'+resData.client_name+'</h4></div></li>';
					body += '<li><div class="field_con"><p>Company Name</p><h4 class="border_cls_btm">'+resData.company_name+'</h4></div>';
					body += '<div class="field_con"><p>Location</p><h4 class="border_cls_btm">'+resData.city+'</h4></div>';
					body += '<div class="field_con"><p>Vertical Name</p><h4 class="border_cls_btm">'+resData.client_vertical+'</h4></div></li>';
					body += '<li><div class="field_con">Registration Date<h4 class="border_cls_btm">'+resData.created_on+'</h4></div>';
					if(resData.access_code=='')
					{
						body += '<div class="field_con"><p>Access Code</p><h4 class="border_cls_btm">NA</h4></div>';
					}
					else
					{
						body += '<div class="field_con"><p>Access Code</p><h4 class="border_cls_btm">'+resData.access_code+'</h4></div>';
					}
					
					
					body += '<div class="field_con"><p>Progress Status</p><h4 class="border_cls_btm">'+resData.progress_status+'</h4>';


					body += '<ul>';

					if(resData.overAllProgress==100)
					{
						body += '<li><img src="'+baseUrl()+'img/user_popup/right_popup.png"> <span>Course Complete</span></li>';
					}
					else
					{
						body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Course Complete</span></li>';	
					}
					

					if(resData.dowload_certificate > 0)
					{
						body += '<li><img src="'+baseUrl()+'img/user_popup/right_popup.png"> <span>Certificate Download</span></li>';
					}
					else
					{
						body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Certificate Download</span></li>';	
					}

					body += '</ul>';

					body += '</div></li>';




					body += '<li><div class="field_con"><p>Last login</p><h4 class="border_cls_btm">'+resData.last_login+'</h4></div>';
					body += '<div style="display:none;" class="field_con"><p>Last login</p><h4 class="border_cls_btm">'+resData.client_vertical+'</h4></div></li></ul>';
					body += '<ul class="edit_profile">';
					body += '	<li>';
					body += '		<div class="form-group ">';
					body += '			<label>First Name* :</label>';
					body += '			<input type="hidden" value="'+resData.id+'"  id="edit_user_id"/>';
					body += '			<input class="form-control" id="edit_firstname" maxlength="40" value="'+resData.first_name+'" type="text">';
					body += '			<span style="color:#B03060;" id="first_name_validate" class="form_error"></span>';
					body += '		</div>';
					body += '		<div class="form-group ">';
					body += '			<label>Last Name* :</label>';
					body += '			<input class="form-control" id="edit_lastname" maxlength="40" value="'+resData.last_name+'" type="text">';
					body += '			<span style="color:#B03060;" id="last_name_validate" class="form_error"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '	<li>';
					body += '		<div class="form-group ">';
					body += '			<label>Phone* :</label>';
					body += '			<input class="form-control" id="edit_phone" maxlength="40" onkeypress="return isNumber(event)" value="'+resData.phone_no+'" type="text">';
					body += '			<span style="color:#B03060;" id="mobile_validate" class="form_error"></span>';
					body += '		</div>';
					body += '		<div class="form-group ">';
					body += '			<label>Email* :</label>';
					body += '			<input class="form-control" id="edit_email" maxlength="40" value="'+resData.email+'" type="email">';
					body += '			<span style="color:#B03060;" id="email_validate" class="form_error"></span>';
					body += '		</div>';
					// body += '		<div class="form-group ">';
					// body += '			<label>Default verticle</label>';
					// body += '			<select class="select form-control custom-select sources" placeholder="select">';
					// body += '				<option value="1">Refresh</option>';
					// body += '				<option value="6">Post Secondary</option>';
					// body += '				<option value="2">Medix</option>';
					// body += '				<option value="3">GoEasy</option>';
					// body += '				<option value="13">Wealth Mastery</option>';
					// body += '				<option value="15">Wealth Mastery Light Course</option>';
					// body += '				<option value="4">Corporation</option>';
					// body += '				<option value="14">Wealth Mastery Full Course</option>';
					// body += '				<option value="5">High School</option>';
					// body += '				<option value="16">Teens Course</option>';
					// body += '				<option value="18">Sprott Wealth Mastery Light</option>';
					// body += '				<option value="20">GreyStone Light</option>';
					// body += '				<option value="17">Sprott Wealth Mastery Full</option>';
					// body += '			</select>';
					// body += '		</div>';
					// body += '		<div class="form-group ">';
					// body += '			<label>Disable verticle</label>';
					// body += '			<select class="select form-control select2-dropdown verticals_multiple" multiple="multiple">';
					// body += '				<option value="1">Refresh</option>';
					// body += '				<option value="6">Post Secondary</option>';
					// body += '				<option value="2">Medix</option>';
					// body += '				<option value="3">GoEasy</option>';
					// body += '				<option value="13">Wealth Mastery</option>';
					// body += '				<option value="15">Wealth Mastery Light Course</option>';
					// body += '				<option value="4">Corporation</option>';
					// body += '				<option value="14">Wealth Mastery Full Course</option>';
					// body += '				<option value="5">High School</option>';
					// body += '				<option value="16">Teens Course</option>';
					// body += '				<option value="18">Sprott Wealth Mastery Light</option>';
					// body += '				<option value="20">GreyStone Light</option>';
					// body += '				<option value="17">Sprott Wealth Mastery Full</option>';
					// body += '			</select>';
					// body += '		</div>';
					body += '	</li>';
					body += '	<li>';
					body += '		<div class="form-group ">';
					body += '			<label>Change Password :</label>';
					body += '			<input class="form-control" maxlength="40" value="" type="password" id="change_password" >';
					body += '		</div>';
					body += '		<div class="form-group button_con button_con_inner">';
					body += '			<a><button id="save_edit_profile" class="save_edit">Save</button></a>';
					body += '			<a><button class="return-home-edit-profile">Cancel</button></a>';
					body += '<br>			<span style="color:green;" id="update_result"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '</ul>';


					body += '<ul class="generate-certificate-block">';
					body += '	<li>';
					body += '		<div class="form-group">';
					body += '			<label>Email* :</label>';
					body += '			<input type="hidden" value="'+resData.id+'"  id="send_user_id"/>';
					body += '			<input class="form-control" id="gen_certificate_email" maxlength="40" value="'+resData.email+'" type="text">';
					body += '			<span style="color:#B03060;" id="generate_certificate_email_validation"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '	<li>';
					body += '		<div class="form-group button_con" style="margin-top: 22px;">';
					body += '			<a><button id="save_generate_certificate" class="save_edit">Send</button></a>';
					body += '			<a><button class="return-home">Cancel</button></a>';
					body += '<br>			<span style="color:green;" id="certificate_result"></span>';
					body += '		</div>';
					body += '	</li>';
					body += '</ul>';


					/*body += '<p>Registered Via</p><h4 class="border_cls_btm">'+resData.registered_via+'</h4>';*/
					body += '<div class="button_con"><a><button class="btn_edit_popup">Edit Profile</button></a><a><button class="btn_generate_certificate">Generate Certificate</button></a>';
					//body += '<a><button class="btn_webinar_inv">Invite To Webinar</button></a><a><button class="btn_event_inv">Invite To Event</button></a><a><button class="btn_coaching_inv">Invite To Coaching</button></a></div>';
					body += '</div></div></div></div>';
					body += '<div class="col-lg-9 col-md-8 col-sm-12">';
					body += '<div class="right_content_popup">';
					body += '<div class="row"><div class="col-lg-6 col-md-6 col-sm-12"><div class="box_con">';
					body += '<h3>User Opportunities</h3>';
					body += '<ul class="upper_detail_ul">';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Has Kids</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Homeowner</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Mutual Funds</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Debt</span></li>';
					body += '<li><img src="'+baseUrl()+'img/user_popup/wrong_popup.png"> <span>Student Loan</span></li>';
					body += '</ul></div></div>';
					body += '<div class="col-lg-6 col-md-6 col-sm-12"><div class="box_con"><h3>Overall Progress</h3>';

					body += '<p><span>0%</span> <span class="full_progress">100%</span></p>';
					//body += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:'+resData.overAllProgress+'%">';
					body += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:'+resData.overAllProgress+'%" attr="'+resData.overAllProgress+'">';                    
					if(resData.overAllProgress!=0 && resData.overAllProgress!=100)
					{
						body += '<span class="sr-only">'+resData.overAllProgress+'%</span>';
					}
					body += '</div></div></div></div>'
              //	body += '<div class="slider_heading col-lg-12 col-md-12 col-sm-12"><div class="col-lg-6 col-md-6 col-sm-12 text-left"><h3>Course Progress (Mandatory Course)</h3></div><div class="col-lg-6 col-md-6 col-sm-12 text-right"><select class="custom-select_n"><option>Corporation</option><option>GoEasy</option><option>GreyStone Light</option><option>High School</option></select></div></div>';
              body += '<div class="slider_heading col-lg-12 col-md-12 col-sm-12"><div class="col-lg-6 col-md-6 col-sm-12 text-left"><h3>Course Progress (Mandatory Course)</h3></div><div class="col-lg-6 col-md-6 col-sm-12 text-right"></div></div>';
              body += '<div class="swiper-container mandatory_course_progress_slider">';
              body += '  <div class="swiper-wrapper">';


              if(resData.verticalData) {
              	var v_data = resData.verticalData;					
              	for (i = 0; i < v_data.length; i++) {
              		if(v_data[i].course_type==1)
              		{


              			body +=  '	  	<div class="swiper-slide">';
              			body +=  '	      <div class="card_box_main">';
              			body +=  '	      	<div class="img_pro_main">';
              			body +=  '	      		<div class="circle-prog-box default">';
              			if (v_data[i].percentage <= 0) {
              				body += '<i class="fa fa-lock"></i>';
              			}

              			if (v_data[i].percentage >= 1) {
              				body += '<div class="progress-circle" data-progress="'+v_data[i].percentage+'"></div>';	
              			}


              			body +=  '	          	</div>';
              			body +=  '	      		<img class="img_pro"  src="'+baseUrl()+'img/uploads/'+v_data[i].image+'">';
              			body +=  '	      		<div class="icon_process_bx"></div>';
              			body +=  '	      	</div>';
              			body +=  '	      	<p>'+v_data[i].cat_name+'</p>';
              			body +=  '	      </div>';
              			body +=  '	  	</div>';


              		}
              	}
              }

              body += '</div>';
              body += '    <div class="swiper-button-next"><img src="'+baseUrl()+'img/user_popup/arrow_right_white.png"></div>';
              body += '    <div class="swiper-button-prev"><img src="'+baseUrl()+'img/user_popup/arrow_left_white.png" ></div>';
              body += '    <div class="swiper-pagination"></div>';
              body += '</div>';
              body += '</div>';



              body += '<h3>Overall Progress</h3>';
              body += '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%"><span class="sr-only">70% Complete</span></div></div>';
              body += '<p><span>0%</span> <span class="full_progress">100%</span></p>';

              body += '<h3>Course Progress</h3>';
              body += '<div class="row">';
              if (resData.verticalData) {
              	var v_data = resData.verticalData;
              	for (i = 0; i < v_data.length; i++) {
              		body += '<div class="col-md-3"><div class="card_box_main"><div class="img_pro_main">';
              		body += '<img src="'+baseUrl()+'img/uploads/'+v_data[i].image+'" class="img_pro">';
              		body += '<div class="icon_process_bx">';
              		body += '<img src="http://localhost/enrichedacademy_live/img/user_popup/icon_process.png" class="icon_process_cls">';
              		body += '<p>100%</p></div></div>';
              		body += '<p>'+v_data[i].cat_name+'</p></div></div>';							
              	};
              }					

              body += '<div class="col-md-3"><div class="card_box_main"><div class="img_pro_main"><i class="fa fa-lock"></i>';
              body += '<img src="http://localhost/enrichedacademy_live/img/user_popup/Leverage-Equity.jpg" class="img_pro"></div>';
              body += '<p>Leveraging Eqauity</p></div></div></div>';

              body += '<h3>Total Downloads</h3><div class="row"><div class="col-md-3"><div class="card_box_main without_img_card"><p><span>'+ resData.dowload_workbook +'</span> Workbook</p></div></div>';
              body += '<div class="col-md-3"><div class="card_box_main without_img_card"><p><span>'+ resData.dowload_tools +'</span> Tools</p></div></div><div class="col-md-3"><div class="card_box_main without_img_card"><p><span>'+resData.dowload_certificate+'</span> Certificates</p></div></div></div>';
              body += '<h3>Total Views</h3><div class="row"><div class="col-md-3"><div class="card_box_main without_img_card"><p><span>'+ resData.totalVideoViews +'</span> Total number of video view</p></div></div></div></div></div></div>";';

              $('.dcrf_modal .modal-body').html(body);
              $('.dcrf_modal').modal('show');

              setTimeout(function(){
              	new Swiper('.mandatory_course_progress_slider', {
              		slidesPerView: 5,
              		spaceBetween: 30,
              		navigation: {
              			nextEl: '.swiper-button-next',
              			prevEl: '.swiper-button-prev',
              		},
              		pagination: {
              			el: '.swiper-pagination',
              		},
              	});

              	new Swiper('.bonus_course_progress_slider', {
              		slidesPerView: 5,
              		spaceBetween: 30,
              		navigation: {
              			nextEl: '.swiper-button-next',
              			prevEl: '.swiper-button-prev',
              		},
              		pagination: {
              			el: '.swiper-pagination',
              		},
              	});
              }, 400);

              $('.btn_edit_popup').click(function(event) {
              	$('.user_detail_left').toggleClass('edit_profile_active');
              	$('.user_detail_left').removeClass('gen_certificate_active');
              	$("#certificate_result").html('');
              	$("#update_result").html('');
              	$(".btn_generate_certificate").css('display','none');
              	$(".btn_edit_popup").css('display','none');
              });

              $('.btn_generate_certificate').click(function(event) {
              	$('.user_detail_left').toggleClass('gen_certificate_active');
              	$('.user_detail_left').removeClass('edit_profile_active');
              	$("#certificate_result").html('');
              	$("#update_result").html('');
              	$(".btn_generate_certificate").css('display','none');
              	$(".btn_edit_popup").css('display','none');
              });




              $('.return-home').click(function(event) {
              	$('.user_detail_left').toggleClass('gen_certificate_active');
              	$(".btn_generate_certificate").css('display','block');
              	$(".btn_edit_popup").css('display','block');
              });

              $('.return-home-edit-profile').click(function(event) 
              {
              	$('.user_detail_left').toggleClass('edit_profile_active');
              	$(".btn_generate_certificate").css('display','block');
              	$(".btn_edit_popup").css('display','block');
              });





					// $('.btn_edit_popup').click(function(event) {
					// 	$('.save_edit').removeClass('edit_profile_active');
					// 	$("#certificate_result").html('');
					// 	$("#update_result").html('');

					// });                  


					$(".verticals_multiple").select2({
						placeholder: "Select",
					});
				}
			});
});
/* Date Range Picker */
		// $('body').on('click', '.daterangepicker ul li:last-child', function(){
		// 	$(this).addClass('active');
		// });

	}); /* End Document Ready */




$(document).on('click','#save_edit_profile',function (){
	$("#update_result").html('');
	var user_id=$("#edit_user_id").val();
	var lastname=$("#edit_lastname").val();
	var email=$("#edit_email").val();
	var phone=$("#edit_phone").val();
	var firstname=$("#edit_firstname").val();
	var password=$("#change_password").val();

	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;



	if(firstname=='')
	{
		$("#first_name_validate").html('First name is required!');
		$("#last_name_validate").html('');
		$("#mobile_validate").html('');
		$("#email_validate").html('');
	}
	else if(lastname=='')
	{
		$("#last_name_validate").html('Last name is required!');
		$("#mobile_validate").html('');
		$("#email_validate").html('');
		$("#first_name_validate").html('');
	}

	else if(!testEmail.test(email))
	{
		$("#email_validate").html('Email is required!');
		$("#first_name_validate").html('');
		$("#last_name_validate").html('');
		$("#mobile_validate").html('');
	}
	else if(phone=='')
	{
		$("#mobile_validate").html('Phone number is required!');
		$("#email_validate").html('');
		$("#first_name_validate").html('');
		$("#last_name_validate").html('');
	}

	else
	{
		$('#loader').show().css('z-index','999999');	
		$("#save_edit_profile").html('Saving...');	
		$.ajax({
			url: baseUrl()+'admins/UpdateUserDetails',
			type : 'POST',
			dataType : "json",
			data : {'uid' : user_id, 'lastname' : lastname, 'firstname' : firstname, 'phone' : phone, 'email' : email, 'password' : password},
			success : function(result){
				if(result.status==true)
				{
					$('#loader').hide().css('z-index','');		
					$("#save_edit_profile").html('Save');
					$("#change_password").val('');
					$("#mobile_validate").html('');
					$("#email_validate").html('');
					$("#first_name_validate").html('');
					$("#last_name_validate").html('');
					$('.user_detail_left').toggleClass('edit_profile_active');
					$(".btn_generate_certificate").css('display','block');
					$(".btn_edit_popup").css('display','block');
					$(".user_name_head").html(firstname+" "+lastname);			
					$("#user_popup_email").html(email);	
					$("#user_popup_email").attr("href", "mailto:" + email).text(email)		
					$("#show_phone_number").html(phone);
					$("#gen_certificate_email").val(email);			


					new PNotify({
						title: 'Success',
						text: 'Profile has been updated.',
						type: 'success',
						delay: 2500,
						styling: 'bootstrap3'
					});


	   //      $("#update_result").html('Information updated successfully.');
	}

}
});	
	}




});	


$(document).on('click','#save_generate_certificate',function (){
	$('#loader').show().css('z-index','999999');
	$("#save_generate_certificate").html('Sending...');
	$("#generate_certificate_email_validation").html('');
	$("#certificate_result").html('');
	var user_id=$("#send_user_id").val();
	var emailaddress=$("#gen_certificate_email").val();
	var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;

	if(testEmail.test(emailaddress)){


		$("#generate_certificate_email_validation").html('');

		$.ajax({
			type: "POST",
			url: baseUrl()+'users/generateCertificates',
			dataType : "json",
			data: {"id": user_id,"email": emailaddress},	
			success: function(result){
				if(result==true)
				{
					$('#loader').hide().css('z-index','');	
					$("#save_generate_certificate").html('Send');
					$('.user_detail_left').toggleClass('gen_certificate_active');
					$(".btn_generate_certificate").css('display','block');
					$(".btn_edit_popup").css('display','block');

					new PNotify({
						title: 'Success',
						text: 'Certificate sent successfully.',
						type: 'success',
						delay: 2500,
						styling: 'bootstrap3'
					});


		    //    $("#certificate_result").html('Certificate sent successfully.');
		}

	}
});
	}else{
		$("#generate_certificate_email_validation").html('please enter a valid email address.');
		$("#save_generate_certificate").html('Send');
		$('#loader').hide().css('z-index','');	 
		return false;

	}

});




    // $(document).on('click','#save_generate_certificate',function ()
    // {

    // });



    // $('.switch_check').change(function() {
    // if (this.checked) {
    // var value='1';	
    // } else {
    // var value='0';	
    // }

    // alert(value);
    // });






    function isNumber(evt) {
    	evt = (evt) ? evt : window.event;
    	var charCode = (evt.which) ? evt.which : evt.keyCode;
    	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    		return false;
    	}
    	return true;
    }




	// $('#user_status').on('change', function(e) 
	// {
 //    alert('working');
	// });	


	$(document).on('click','.switch_check',function() {
		$('#loader').show().css('z-index','999999');
		var ischecked= $(this).is(':checked');
		var user_id= $("#edit_user_id").val();  	

	 // $('#loader').show().css('z-index','999999');

	 if(ischecked)
	 {
	 	status='Active';	
	 }
	 else
	 {
	 	status='Inactive';	
	 }

	 $.ajax({
	 	type: "POST",
	 	url: baseUrl()+'users/UpdateUserStatus',
	 	dataType : "json",
	 	data: {"id": user_id,"status": status},	
	 	success: function(result){
	 		if(result.status=='1')
	 		{
	 			$('#loader').hide().css('z-index','');		
	 			new PNotify({
	 				title: 'Success',
	 				text: 'Status updated successfully.',
	 				type: 'success',
	 				delay: 2500,
	 				styling: 'bootstrap3'
	 			});

	 			$(".switch_texts").html(status);  

	 		}
	 		else
	 		{
	 			$('#loader').hide().css('z-index','');		
	 			new PNotify({
	 				title: 'Error',
	 				text: 'Something went wrong.',
	 				type: 'danger',
	 				delay: 2500,
	 				styling: 'bootstrap3'
	 			});	
	 		}

	 	}
	 }); 

	});




	function getSelectedIds(output) {
		var selectedIds = [];
		/* Check Selection is initialize or not */
		var initCheck = $('.dash_main_filter .select_industries1 option:selected').length;
		initCheck += $('.dash_main_filter .select_companies option:selected').length;
		initCheck += $('.dash_main_filter .select_clients option:selected').length;
		initCheck += $('.dash_main_filter .select_verticals option:selected').length;
		initCheck += $('.dash_main_filter .select_location option:selected').length;
		if (initCheck <= 0) {
			return 'no_filter_init';
		}

		if (output == 'industries') {
			var dt = $('.dash_main_filter .select_industries1').select2('val');
			if (dt) {
				return dt.join(',');
			}
		}

		if (output == 'clients') {
			clientsCheck = $('.dash_main_filter .select_clients option:selected').length;			
			if (clientsCheck > 0) {
				var selectedIds = $('.dash_main_filter .select_clients').select2('val');
				return selectedIds.join(',');
			}else{
				selectedIds = $('.dash_main_filter .select_clients option');
				var selection = [];
				selectedIds.each(function(index, brand){
					selection.push(brand.value);
				});					
				return selection.join(",");
			}
		}
		if (output == 'companies') {
			var selectedIds = $('.dash_main_filter .select_companies option:selected');
			if (selectedIds.length <= 0) {
				selectedIds = $('.dash_main_filter .select_companies option');
			}		
		}
		if (output == 'clients') {
			var selectedIds = $('.dash_main_filter .select_clients option:selected');
			if (selectedIds.length <= 0) {
				selectedIds = $('.dash_main_filter .select_clients option');
			}
		}
		if (output == 'verticals') {
			var selectedIds = $('.dash_main_filter .select_verticals option:selected');
			if (selectedIds.length <= 0) {
				selectedIds = $('.dash_main_filter .select_verticals option');
			}
		}
		if (output == 'location') {
			var selectedIds = $('.dash_main_filter .select_location option:selected');		
		}
		var selection = [];
		if (selectedIds.length > 0) {
			selectedIds.each(function(index, brand){
				selection.push(brand.value);
			});				
		}
		return selection.join(",");
	}

	$(document).on('click','.btn-export-all',function() 
	{
		$('#loader').show().css('z-index','999999');
		 var a= document.getElementById('excel_download');
	     a.click();
	     $('#loader').hide().css('z-index','');
		});	     
		// $.ajax({
		// 	url: adminApiUrl()+'ExportuserDatawithFilter',
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	data: {
		// 		"token": secretToken(),
		// 		"dateRange" :    $('.users_datatable_date_data').val(),
		// 		"search_type" :  $('.users_datatable_search_type').val(),
		// 		"search" :       $('.users_datatable_search').val(),
		// 		"status" :       $('.users_datatable_search_status_value').val(),
		// 		"certificates" : $('.users_datatable_search_certificate_value').val(),
		// 		"course" :       $('.users_datatable_search_course_value').val(),
		// 		"clients_ids" :  	 getSelectedIds('clients'),
		// 		"verticals" :      	getSelectedIds('verticals'),
		// 		"location" :      	 getSelectedIds('location')
		// 	},
		// 	async: true,
		// 	success: function(res)
		// 	{
  //           	$('#loader').hide().css('z-index','');
		// 		var blob = new Blob(res.data, { type: 'res.data:application/vnd.ms-excel' });
	 //            var downloadUrl = URL.createObjectURL(blob);
	 //            var a = document.createElement("a");
	 //            a.href = downloadUrl;
	 //            a.download = "Enriched-Academy-Users.xls";
	 //            document.body.appendChild(a);
	 //            a.click();
	 //        }, 

	 //    });



  
	

	/*USER EXPORT END*/

	/*Client Export start */
	$(document).on('click','.btn-export-clients',function() 
	{
		$('#loader').show().css('z-index','9999');
		function getSelectedIds(output) {
			var selectedIds = [];
			/* Check Selection is initialize or not */
			var initCheck = $('.dash_main_filter .select_industries1 option:selected').length;
			initCheck += $('.dash_main_filter .select_companies option:selected').length;
			initCheck += $('.dash_main_filter .select_clients option:selected').length;
			initCheck += $('.dash_main_filter .select_verticals option:selected').length;
			initCheck += $('.dash_main_filter .select_location option:selected').length;
			if (initCheck <= 0) {
				return 'no_filter_init';
			}
			
			if (output == 'industries') {
				var dt = $('.dash_main_filter .select_industries1').select2('val');
				if (dt) {
					return dt.join(',');
				}
			}

			if (output == 'clients') {
				clientsCheck = $('.dash_main_filter .select_clients option:selected').length;			
				if (clientsCheck > 0) {
					var selectedIds = $('.dash_main_filter .select_clients').select2('val');
					return selectedIds.join(',');
				}else{
					selectedIds = $('.dash_main_filter .select_clients option');
					var selection = [];
					selectedIds.each(function(index, brand){
						selection.push(brand.value);
					});					
					return selection.join(",");
				}
			}
			if (output == 'companies') {
				var selectedIds = $('.dash_main_filter .select_companies option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_companies option');
				}		
			}
			if (output == 'clients') {
				var selectedIds = $('.dash_main_filter .select_clients option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_clients option');
				}
			}
			if (output == 'verticals') {
				var selectedIds = $('.dash_main_filter .select_verticals option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_verticals option');
				}
			}
			if (output == 'location') {
				var selectedIds = $('.dash_main_filter .select_location option:selected');		
			}
			var selection = [];
			if (selectedIds.length > 0) {
				selectedIds.each(function(index, brand){
					selection.push(brand.value);
				});				
			}
			return selection.join(",");
		}
		$.ajax({
			url: adminApiUrl()+'ExportclietsDatawithFilter',
			type: 'POST',
			dataType: 'json',
			data: {
				"token": secretToken(),
				"dateRange" :    $('.clients_datatable_date_data').val(),
				"search" :       $('.clients_datatable_search').val(),
				"id" :  	 		getSelectedIds('clients'),
				"verticals_ids" :    getSelectedIds('verticals'),
				"location" :      	 getSelectedIds('location')
			},
			async: true,
			success: function(res)
			{
				console.log(res);
				$('#loader').hide().css('z-index','');
				var blob = new Blob(res.data, { type: 'res.data:application/vnd.ms-excel' });
				var downloadUrl = URL.createObjectURL(blob);
				var a = document.createElement("a");
				a.href = downloadUrl;
				a.download = "Enriched-Academy-Clients.xls";
				document.body.appendChild(a);
				a.click();
			}, 

		});
	});
	/*Client Export start */

	/*Company Export start */
	$(document).on('click','.btn-export-companies',function() 
	{
		$('#loader').show().css('z-index','9999');
		function getSelectedIds(output) {
			var selectedIds = [];
			/* Check Selection is initialize or not */
			var initCheck = $('.dash_main_filter .select_industries1 option:selected').length;
			initCheck += $('.dash_main_filter .select_companies option:selected').length;
			initCheck += $('.dash_main_filter .select_clients option:selected').length;
			initCheck += $('.dash_main_filter .select_verticals option:selected').length;
			initCheck += $('.dash_main_filter .select_location option:selected').length;
			if (initCheck <= 0) {
				return 'no_filter_init';
			}
			
			if (output == 'industries') {
				var dt = $('.dash_main_filter .select_industries1').select2('val');
				if (dt) {
					return dt.join(',');
				}
			}

			if (output == 'clients') {
				clientsCheck = $('.dash_main_filter .select_clients option:selected').length;			
				if (clientsCheck > 0) {
					var selectedIds = $('.dash_main_filter .select_clients').select2('val');
					return selectedIds.join(',');
				}else{
					selectedIds = $('.dash_main_filter .select_clients option');
					var selection = [];
					selectedIds.each(function(index, brand){
						selection.push(brand.value);
					});					
					return selection.join(",");
				}
			}
			if (output == 'companies') {
				var selectedIds = $('.dash_main_filter .select_companies option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_companies option');
				}		
			}
			if (output == 'clients') {
				var selectedIds = $('.dash_main_filter .select_clients option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_clients option');
				}
			}
			if (output == 'verticals') {
				var selectedIds = $('.dash_main_filter .select_verticals option:selected');
				if (selectedIds.length <= 0) {
					selectedIds = $('.dash_main_filter .select_verticals option');
				}
			}
			if (output == 'location') {
				var selectedIds = $('.dash_main_filter .select_location option:selected');		
			}
			var selection = [];
			if (selectedIds.length > 0) {
				selectedIds.each(function(index, brand){
					selection.push(brand.value);
				});				
			}
			return selection.join(",");
		}
		$.ajax({
			url: adminApiUrl()+'ExportcompaniesDatawithFilter',
			type: 'POST',
			dataType: 'json',
			data: {
				"token": secretToken(),
				"dateRange" :    $('.companies_datatable_date_data').val(),
				"search" :       $('.companies_datatable_search').val(),
				"industries_ids" : getSelectedIds('industries'),
				"id"     		:getSelectedIds('companies')
			},
			async: true,
			success: function(res)
			{
				console.log(res);
				$('#loader').hide().css('z-index','');
				var blob = new Blob(res.data, { type: 'res.data:application/vnd.ms-excel' });
				var downloadUrl = URL.createObjectURL(blob);
				var a = document.createElement("a");
				a.href = downloadUrl;
				a.download = "Enriched-Academy-Companies.xls";
				document.body.appendChild(a);
				a.click();
			}, 

		});
	});
	/*Company export end*/




