/**
 * Developer Js
 * Version 0.0.1
 */

 $(document).ready(function(){

	// Get data on page load
	$('.swiper-slide').on('click', function(){

		this_var = $(this);
		var curr_tab = this_var.attr('data-tab');

		if (curr_tab == 'tab-all-user') {
			$('#loader').show();
			getDashboardSecondSectionData( curr_tab );
		}

		// Total View Video
		if (curr_tab == 'tab-total-video') {
			updateTotalVideoViewSection( curr_tab );
		}

		// Total Downloads section
		if (curr_tab == 'tab-total-downloads') {
			updateTotalDownloadsSecondSection();
		}

		// Update Total Client
		if (curr_tab == 'tab-total-clients') {
			updateTotalClientsSecondSection();
		}

	});
	// Main slider click data End
});
// END Document ready function