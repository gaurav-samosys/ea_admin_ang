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
				'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
				'All Data': [moment('2010-01-01'), moment()]
			},
			// autoUpdateInput: true,
			// autoApply: true,
			// showDropdowns: true,
			// minYear: 2010,
			// maxYear: 2030,
			// startDate: moment().subtract(1, 'year'),
			// endDate: moment(),
			// locale: {
			// 	format: 'MMM D, YYYY'
			// }
		});

		setTimeout(function(){ $('.main_loader').hide(); }, 1000);

		$('.dash_main_filter .select_companies').val(null);
		$('.dash_main_filter .select_clients').val(null);
		$('.dash_main_filter .select_verticals').val(null);
		$('.dash_main_filter .select_location').val(null);
		$('.dash_main_filter .select_industries1').val(null).trigger("change");
		//$('.dash_main_filter .select_industries1').val(null);

		//getEaAllUsersList('industries_selected', getSelectedIds('industries'), getSelectedIds('companies'), getSelectedIds('clients'), getSelectedIds('verticals'), getSelectedIds('location'));

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
	 		data: {"industries": industries, "companies": companies, "clients": clients, "verticals": verticals, "location": location, "selected": selected},
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

	 					// $('.dash_main_filter .select_industries').append(allIndustryHtml).multiselect({
	 					// 	includeSelectAllOption : false,enableFiltering: true,
	 					// 	maxHeight: 200,enableCaseInsensitiveFiltering: true,
	 					// 	resetText: "Reset all",
	 					// 	nonSelectedText: 'All Industries',
	 					// 	onChange: function(element, checked) {														
	 					// 		getEaAllUsersList('industries_selected', getSelectedIds('industries'), '', '', '');
	 					// 	},
	 					// 	onSelectAll: function() { getEaAllUsersList('industries_selected', '', '', '',''); }
	 					// });						
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
	 						// $('.dash_main_filter .select_companies').append(allCompaniesHtml).multiselect({
	 						// 	includeSelectAllOption : false,enableFiltering: true,maxHeight: 200,enableCaseInsensitiveFiltering: true,
	 						// 	nonSelectedText: 'All Companies',
	 						// 	onChange: function(element, checked) {									
	 						// 		getEaAllUsersList('companies_selected', getSelectedIds('industries'), getSelectedIds('companies'), '', '' , '');
	 						// 	},
	 						// 	onSelectAll: function() {
	 						// 		getEaAllUsersList('companies_selected', getSelectedIds('industries'), getSelectedIds('companies'), '', '' , '');
	 						// 	}
	 						// });						
	 					} else {
	 						$('.dash_main_filter .select_companies').html(allCompaniesHtml);
	 						//$('.dash_main_filter .select_companies').multiselect('rebuild');
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
	 						//$('.dash_main_filter .select_clients1').multiselect('rebuild');
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
	 						$('.dash_main_filter .select_location').select2({placeholder: "All Location",allowClear: false,closeOnSelect:false,width: '100%'});

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

	 				/* Update Tabs */
	 				if (selected == 'companies_selected') {
	 					$('li.tab-link.companies').removeClass("disabled");
	 					$('li.tab-link.industries').addClass("disabled");
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


	 				$('.dash_main_filter select').each(function(){	 					
	 					if(!$(this).next('.select2').find('.select2-selection__rendered li').hasClass('select2-selection__choice')){
	 						$(this).removeClass('selected');
	 					}
	 				});


	 				$('.main_loader').hide();

	 				// $('.dash_main_filter select').each(function(index){	 				
	 				// 	if(!$(this).find('li').hasClass('select2-selection__choice')){
	 				// 		$(this).removeClass('selected');
	 				// 	}

	 				// });


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
			getEaAllUsersList('location_selected', '', '', '', '', getSelectedIds('location'));
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
			$('.industries_datatable_loader').show();
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
					data : function(d){
						d['dateRange']    	= $('.industries_datatable_date_data').val();
						d['search']      	= $('.industries_datatable_search').val();
						d['id']      		= getSelectedIds('industries');
						return d;
					},
				},
				'columnDefs': [{
					'targets': [1,2,3],
					'orderable': false,
				}],
			});
		}
		$('.industries_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.industries_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.industries_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
			$('#industries_datatable').DataTable().draw();
		});

		$('.industries_datatable_date').on('cancel.daterangepicker', function(ev, picker) {
			$('.industries_datatable_date_data').val('');
			$('#industries_datatable').DataTable().draw();
		});
		/* Industries DataTable Search */
		$('.industries_datatable_search').on('blur', function(){
			$('.industries_datatable_loader').show();
			$('#industries_datatable').DataTable().draw();
		});


		/* Get Data For All Companies*/
		function getCompaniesWithData(){
			$('.companies_datatable_loader').show();
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
					data : function(d){
						d['dateRange']    	= $('.companies_datatable_date_data').val();
						d['search']      	= $('.companies_datatable_search').val();
						d['industries_ids'] = getSelectedIds('industries');
						d['id'] 			= getSelectedIds('companies');
						return d;
					},
				},
				'columnDefs': [{
					'targets': [1,2,3],
					'orderable': false,
				}],
			});
		}

		/* Date Range Picker */
		$('.companies_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.companies_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.companies_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
			if ( $.fn.dataTable.isDataTable( '#companies_datatable' ) ) {
				$('#companies_datatable').DataTable().draw();
			}else {
				getCompaniesWithData();
			}
		});

		/* Companies DataTable Search */
		$('.companies_datatable_search').on('blur', function(){
			$('.companies_datatable_loader').show();
			$('#companies_datatable').DataTable().draw();
		});

		/* Get Data For All Clients*/
		function getClientsWithData(){
			$('.clients_datatable_loader').show();
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
					data : function(d){
						d['dateRange']    	= $('.clients_datatable_date_data').val();
						d['search']      	= $('.clients_datatable_search').val();
						d['id']      		= getSelectedIds('clients');
						d['verticals_ids'] 	= getSelectedIds('verticals');
						d['location'] 		= getSelectedIds('location');
						return d;
					},
				},
				'columnDefs': [{
					'targets': [1,2,3,4],
					'orderable': false,
				}],
			});
		}
		/* Cliets DataTable Search */
		$('.clients_datatable_search').on('blur', function(){
			$('.clients_datatable_loader').show();
			$('#clients_datatable').DataTable().draw();
		});
		/* Date Range Picker */
		$('.clients_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.clients_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.clients_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));			
			$('#clients_datatable').DataTable().draw();		
		});

		/* Get Data For All Users*/
		function getUsersWithData(){
			$('.users_datatable_loader').show();
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
						$('#tab_users .show_data').html(json.recordsTotal.toLocaleString());
						$('.users_datatable_loader').hide();

						return json.data;
					},
					data : function(d){
						d['dateRange']    	= $('.users_datatable_date_data').val();
						d['search_type']   	= $('.users_datatable_search_type').val();
						d['search']      	= $('.users_datatable_search').val();
						d['status']      	= $('.users_datatable_search_status_value').val();
						d['certificates']   = $('.users_datatable_search_certificate_value').val();
						d['clients_ids']  	= getSelectedIds('clients');
						d['verticals']      = getSelectedIds('verticals');
						d['location']      	= getSelectedIds('location');
						return d;
					},
				},
				'columnDefs': [{
					'targets': [2,3,4,5,6],
					'orderable': false,
				}],
			});
		}
		/* Date Range Picker */
		$('.users_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.users_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.users_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
			$('#users_datatable').DataTable().draw();			
		});

		/* User Search */
		$('.users_datatable_search').on('blur', function(){
			$('.users_datatable_loader').show();
			$('#users_datatable').DataTable().draw();
		});
		/* Search Type Show/Hide */
		$('.users_datatable_search_type').on('change', function(){
			if ($(this).val() == 'certificates') {
				$('.users_datatable_search_status_value').hide();
				$('#search_con_new').hide();
				$('.users_datatable_search_certificate_value').show();				
			} else if ($(this).val() == 'status') {
				$('.users_datatable_search_certificate_value').hide();
				$('#search_con_new').hide();
				$('.users_datatable_search_status_value').show();
			}else{
				$('.users_datatable_search_certificate_value').hide();
				$('.users_datatable_search_status_value').hide();
				$('#search_con_new').show();
			}					
			$('#users_datatable').DataTable().draw();
		});

		/* Certificate Value */
		$('.users_datatable_search_certificate_value').on('change', function(){
			$('#users_datatable').DataTable().draw();			
		});
		/* Status Value */
		$('.users_datatable_search_status_value').on('change', function(){
			$('#users_datatable').DataTable().draw();			
		});

		/* Get Data For All Users*/

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

		$('.verticals_datatable_search').on('blur', function(){
			$('.verticals_datatable_loader').show();
			$('#verticals_datatable').DataTable().draw();
		});
		/* Date Range Picker */
		$('.verticals_datatable_date').on('apply.daterangepicker', function(ev, picker) {
			$('.verticals_datatable_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.verticals_datatable_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
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
				data: {"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_user_graph .left_sec h5 span').html(res.total_users);
					$('.total_user_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
					Highcharts.chart('totalUserGraph', {
						chart: {type: 'column', zoomType: 'x'},
						navigation: {buttonOptions: {enabled: false}},
						title: {text: ''},
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
				});
					$('.total_user_graph_section .loader').hide();			
				}
			});
		}
		/* Date Range Picker */
		$('.total_user_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_user_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_user_graph_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
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
				data: {"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_downloads .left_sec h5 span').html(' '+res.totalDownloads);

					$('.total_downloads .certificates .total-count').html(res.total_cert);
					$('.total_downloads .workbook .total-count').html(res.total_work);
					$('.total_downloads .spredsheet .total-count').html(res.total_spred);

					$('.total_downloads .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
					Highcharts.chart('totalDownloadsGraph', {				
						chart: {type: 'areaspline',showInLegend: false,zoomType: 'x'},
						navigation: {buttonOptions: {enabled: false}},
						title: {text: ''},
						xAxis: {labels: {enabled: true},categories: res.labelName},
						yAxis: {title: {text: ''}},
						tooltip: {shared: true,valueSuffix: ' Downloads'},
						credits: {enabled: false},
						plotOptions: {series: {marker: {enabled: false}}},
						series: [{
							showInLegend: false,
							name: 'Certificates',
							data: res.certData
						}, {
							showInLegend: false,
							name: 'Workbook',
							data: res.workData
						}, {
							showInLegend: false,
							name: 'Tools',
							data: res.spredData
						}]
					});
					$('.total_downloads_loader').hide();
				}
			});
		}
		/*Date Range Picker*/
		$('.total_downloads_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_downloads_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_downloads_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
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
				data: {"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_video_graph .left_sec .main_value').html(" "+res.total_users);
					$('.total_video_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
					Highcharts.chart('totalVideoViewsGraph2', {
						chart: {type: 'column', zoomType: 'x',},
						navigation: {buttonOptions: {enabled: false}},
						title: {text: ''},
						xAxis: {
							labels: {enabled: true},
							opposite: false,
							categories: res.labelName
						},
						yAxis: {min: 0,title: {text: ''}},
						tooltip: {
							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}',
							shared: true
						},
						series: [{showInLegend: false,enableMouseTracking: true},
						{ 
							showInLegend: false,name: "Video Views",data: res.data
						}],
					});
					$('.total_video_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_video_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_video_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_video_graph_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
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
				data: {"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_certificates_graph .left_sec .main_value').html(" "+res.total_users);
					
					$('.total_certificates_graph .left_sec .completed_v').html(" "+res.total_certified_users);
					$('.total_certificates_graph .left_sec .pending_v').html(" "+res.total_pending_users);

					$('.total_certificates_graph .graph_legends .certified .total-count').html(" "+res.total_certified_users);
					$('.total_certificates_graph .graph_legends .pending .total-count').html(" "+res.total_pending_users);

					Highcharts.chart('totalCertificatesGraph', {
						chart: {type: 'column', zoomType: 'x',},
						navigation: {buttonOptions: {enabled: false}},
						legend: false,
						title: {text: ''},
						xAxis: {
							labels: {enabled: true},
							opposite: false,
							categories: res.labelName
						},
						yAxis: {min: 0,title: {text: ''}},
						tooltip: {
							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
							shared: true
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
					$('.total_certificates_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_certificates_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_certificates_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_certificates_graph_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
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
				data: {"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.total_course_graph .left_sec .main_value').html(" "+res.total_users);

					$('.total_course_graph .left_sec .completed_v').html(" "+res.totalCompletedUsers);
					$('.total_course_graph .left_sec .pending_v').html(" "+res.totalProgressUsers);
					$('.total_course_graph .left_sec .not_started_v').html(" "+res.totalNotStartedUsers);

					$('.total_course_graph .graph_labels .completed .total-count').html(" "+res.totalCompletedUsers);
					$('.total_course_graph .graph_labels .pending .total-count').html(" "+res.totalProgressUsers);
					$('.total_course_graph .graph_labels .notstarted .total-count').html(" "+res.totalNotStartedUsers);
					
					Highcharts.chart('totalCompletionGraph', {
						chart: {type: 'column', zoomType: 'x',},
						navigation: {buttonOptions: {enabled: false}},
						legend: false,
						title: {text: ''},
						xAxis: {
							labels: {enabled: true},
							opposite: false,
							categories: res.labelName
						},
						yAxis: {min: 0,title: {text: ''}},
						tooltip: {
							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
							shared: true
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
							name: 'Completed',
							data: res.completedUsers,
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
					$('.total_course_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_course_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_course_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_course_graph_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
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
				data: {"dateRange": dateRange, "clients_ids":  getSelectedIds('clients'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				//async: true,
				success: function(res){
					$('.total_access_code_graph .left_sec .main_value').html(" "+res.total_users);
					
					$('.total_access_code_graph .left_sec .completed_v').html(" "+res.total_used);
					$('.total_access_code_graph .left_sec .pending_v').html(" "+res.total_users);

					$('.total_access_code_graph .graph_labels .used .total-count').html(" "+res.total_used);
					$('.total_access_code_graph .graph_labels .unused .total-count').html(" "+res.total_unused);
					


					Highcharts.chart('totalAccessCodeGraph', {
						chart: {type: 'column', zoomType: 'x',},
						navigation: {buttonOptions: {enabled: false}},
						legend: false,
						title: {text: ''},
						xAxis: {
							labels: {enabled: true},
							opposite: false,
							categories: res.labelName
						},
						yAxis: {min: 0,title: {text: ''}},
						tooltip: {
							pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
							shared: true
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
					$('.total_access_code_graph_loader').hide();			
				}
			});
		}
		/*Date Range Picker*/
		$('.total_access_code_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.total_access_code_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.total_access_code_graph_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
			getAccessCodeGraphData();
		});
		/*TOTAL Certificates GRAPH END*/


		/*TOTAL Comparison GRAPH*/
		function getComparisonGraphData(){
			$('.comparison_graph_loader').show();
			var dateRange 	= $('.comparison_graph_date_data').val();
			var dataSelected = $('.comparison_graph_selection').find('option:selected').val();
			$.ajax({
				url: adminApiUrl()+'getComparisonGraphData',
				type: 'POST',
				dataType: 'json',
				data: {"dateRange": dateRange, "dataSelected": dataSelected, "industries_ids":  getSelectedIds('industries'), "clients_ids":  getSelectedIds('clients'), "companies_ids":  getSelectedIds('companies'), "verticals_ids": getSelectedIds('verticals'), "location": getSelectedIds('location')},
				async: true,
				success: function(res){
					$('.comparison_graph .left_sec .total-user').html(" "+res.total_users);
			//$('.total_certificates_graph .left_sec span.percentage').html(res.percentage+"% <i class='fa fa-caret-up'></i>");
			Highcharts.chart('ComparisonGraph', {
				chart: {zoomType: 'x',type: 'column',styledMode: true},
				navigation: {buttonOptions: {enabled: false}},title: {text: '',},
				xAxis: {
					categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
					min: 0,
					//max: 4,
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
				tooltip: {useHTML: true},
				plotOptions: {column: {pointPadding: 0.1,borderWidth: 0}},
				series: res.data,
				//[
				// {
				// 	name: 'Average',
				// 	type: 'spline',
				// 	data: [10, 20, 5, 30,10, 21.5, 5.2, 40.5, 60.3, 18.3, 93.9, 9.6],
				// }
				// ]
			});
			$('.comparison_graph_loader').hide();			
		}
	});
		}
		/*Date Range Picker*/
		$('.comparison_graph_date').on('apply.daterangepicker', function(ev, picker) {
			$('.comparison_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
			$('.comparison_graph_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
			getComparisonGraphData();
		});
		/*Selection data*/
		$('.comparison_graph_selection').change(function(){
			getComparisonGraphData();	
		});
		/*TOTAL Comparision GRAPH END*/



		/* DataTable Pagination */
		$('body').on('click', '.dataTables_paginate li a, .dataTables_paginate li',function(e){
			e.preventDefault();
			var parent_id = $(this).parents('.dataTables_wrapper');
			$('html, body').animate({
				scrollTop: parent_id.offset().top-100
			}, 500);

		});

		$('body').on('click', '.get_single_users_detail', function(e){
			e.preventDefault();
			var user_id = $(this).attr('data-user_id');
			$.ajax({
				url: apiUrl()+'web/getUsers',
				type: 'POST',
				dataType: 'json',
				data: {"id": user_id, 'fields': '*'},
				async: true,
				success: function(res){

					$('.dcrf_modal .modal-title').html(res.data.first_name+ ' '+res.data.last_name);

					var body = "<div class='data_table_detail_pop'>";

					body += '<div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><p><b>Full Name</b></p></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><p>'+res.data.first_name+' '+res.data.last_name+'</p></div></div>';
					body += '<div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><p><b>Email</b></p></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><p>'+res.data.email+'</p></div></div>';
					body += '<div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><p><b>Progress</b></p></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><p>'+res.data.progress_status+'</p></div></div>';
					body += '<div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><p><b>Access Code</b></p></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><p>'+res.data.access_code+'</p></div></div>';
					body += '<div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><p><b>Status</b></p></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><p>'+res.data.status+'</p></div></div>';
					body += '<div class="row"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4"><p><b>Register</b></p></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><p>'+res.data.created_on+'</p></div></div>';
					body += '</div>';

					$('.dcrf_modal .modal-body').html(body);
					$('.dcrf_modal').modal('show');
				}
			});
		});


		/* Date Range Picker */
		// $('body').on('click', '.daterangepicker ul li:last-child', function(){
		// 	$(this).addClass('active');
		// });

}); /* End Document Ready */