

window.addEventListener('DOMContentLoaded', function() {
});

var resizeTimer = null;
jQuery(window).resize(function (){
  clearTimeout(resizeTimer);
   resizeTimer= setTimeout(function(){
    
   }, 10);
});//END OF WINDOW RESIZE


jQuery(document).ready(function($) {

    // banner slider
    // var banner_slider = new Swiper('.banner_slider', {
    //    autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    //   },
    // 	pagination: {
	   //      el: '.swiper-pagination',
	   //      clickable: true,
	   //  },
    // });
    // banner slider
    
});

// toggle 
// $(".cat_box_main").click(function(){
//   $(".cat_box_open").toggle();
// });
/* Open the first section on l  oad */
    var openOnLoad = $(".section-title:first").parent('.category_box .collapsing-section');

  $(".section-title").on('click', function (e) {
      if ($(this).parent('.category_box').hasClass('open')) {
        //Close the current section
        $('.section-title').parent('.category_box').removeClass('open');
      } else {
        //close the prev section & open the newly click
        $('.section-title').parent('.category_box').removeClass('open');
        $(this).parent('.category_box').addClass('open');
        var sectionToOpen = $(this).parent('.category_box .collapsing-section');
      }
    });


    // Date
    $( function() {
    $( ".datepicker" ).datepicker();
  } );



function getAppUsersComparisonGraphDataFunc(){

    $('.comparison_graph_loader').show();
    var assetstype     = $('#assets_data').val();
    //var dataSelected = $('.to_date').val();
    var dataSelected = $('.total_user_graph_date1').val();
    var user_id=$('#users_id').val();
    var from_date = $('.from_date').val();
    var classSelected = $('.hasDatepicker').val();
    $('#ComparisonGraph').removeAttr('class').addClass(classSelected);
     //'from_date':from_date,
    $.ajax({
        url: adminApiUrl()+'getAppUsersAssetsGraphData',
        type: 'POST',
        dataType: 'json',
        data: {"token": secretToken(),"dateRange": dataSelected,'id':user_id,'assetstype':assetstype},
        async: true,
        success: function(res){

            //console.log(res);
            $('#assets_data_graph_total').html(" $"+res.total_users);
            var legend = true;
          
            Highcharts.chart('yearlyComparisionCalculatorsGraph', {
               
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
                title: {text: 'Assets'}, 
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


function getAppUsersLiabilitiesGraphDataFunc(){

    $('.comparison_graph_loader').show();
    var assetstype     = $('#assets_data1').val();
    
   // var from_date= $('.liabilities_from_date').val();
   
   var dataSelected = $('.total_user_graph_date2').val();
    //var dataSelected = $('.liabilities_to_date').val();
   // var dataSelected = $('.liabilitiesDate').val();
   var user_id=$('#users_id').val();
    var classSelected = $('.liabilitiesDate').val();
    $('#ComparisonGraph').removeAttr('class').addClass(classSelected);

    $.ajax({
        url: adminApiUrl()+'getAppUsersAssetsGraphData',
        type: 'POST',
        dataType: 'json',
        data: {"token": secretToken(),"dateRange": dataSelected,'id':user_id,'assetstype':assetstype},
        async: true,
        success: function(res){

            console.log(res);
            $('#liabilities_data_graph_total').html(" $"+res.total_users);
            var legend = true;            
            Highcharts.chart('yearlyComparisionLiabilitiesCalculatorsGraph', {
               
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
                title: {text: 'Liabilities'}, 
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



function getAppUsersLiabilitiesGraphNetworthDataFunc(){

    $('.comparison_graph_loader').show();
    var assetstype     = $('#assets_data1').val();
    var dataSelected = $('.total_user_graph_date3').val();
    //var dataSelected = $('.networth_to_date').val();
    //var from_date = $('.networth_from_date').val();
    var user_id=$('#users_id').val();
    //var dataSelected = $('.liabilitiesDate').val();
    var classSelected = $('.liabilitiesDate').val();
    $('#ComparisonGraph').removeAttr('class').addClass(classSelected);
  //'from_date':from_date,
    $.ajax({
        url: adminApiUrl()+'getAppUsersAssetsGraphData',
        type: 'POST',
        dataType: 'json',
        data: {"token": secretToken(),"dateRange": dataSelected,'id':user_id,'assetstype':0},
        async: true,
        success: function(res){

            console.log(res);
            $('#networth_data_graph_total').html(" $"+res.total_users);
            var legend = true;            
            Highcharts.chart('yearlyComparisionCalculatorsNetworthGraph', {
               
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
                title: {text: 'Networth'}, 
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




getAppUsersComparisonGraphDataFunc();
 getAppUsersLiabilitiesGraphDataFunc();
 getAppUsersLiabilitiesGraphNetworthDataFunc();



    
//  function getAppUsersComparisonGraphDataFunc(){

//     $('.comparison_graph_loader').show();
//     var assetstype     = $('#assets_data').val();
//     var dataSelected = $('.hasDatepicker').val();
//     var classSelected = $('.hasDatepicker').val();
//     $('#ComparisonGraph').removeAttr('class').addClass(classSelected);
//     console.log(dataSelected);
//     $.ajax({
//         url: adminApiUrl()+'getAppUsersAssetsGraphData',
//         type: 'POST',
//         dataType: 'json',
//         data: {"token": secretToken(),"dateRange": dataSelected,'assetstype':assetstype},
//         async: true,
//         success: function(res){
//             console.log(res);
//            // $('.year_over_year_compare_graph .left_sec .total-user').html(" "+res.total_users);
//             var legend = true; 

//               Highcharts.chart('yearlyComparisionCalculatorsGraph', {
//     title: {
//         text: 'Combination chart'
//     },
//     xAxis: {
//         categories: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//     },
    
  
//     series: [res.data,
//                  {
//         type: 'spline',
//         name: 'Average',
//         data: [3, 2.67, 3, 6.33, 3.33, 3, 2.67, 3, 6.33, 3.33, 3, 2.67, 6.33],
//         marker: {
//             lineWidth: 2,
//             lineColor: Highcharts.getOptions().colors[3],
//             fillColor: '#0295c9'
//         }
//     }]
// });


//             $('.comparison_graph_loader').hide();            
//         }
//     });
// }

/* Date Picker For Retirement Graph */








$('.total_course_graph_date').on('apply.daterangepicker', function(ev, picker) 
{
 $('.total_course_graph_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
//        $('.total_course_graph_date_data').val(picker.startDate.format('YYYY-MM-DD')+'_'+picker.endDate.format('YYYY-MM-DD'));
});    




// $('.to_date').on('change', function() {
  
//   //  $('.to_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
//    // $('.calender').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
//     getAppUsersComparisonGraphDataFunc();
// });


$('.total_user_graph_date1').on('change', function() {
    // alert('');
    // $('.total_user_graph_date1').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
    // $('.calender1').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
    getAppUsersComparisonGraphDataFunc();
});


// $('.liabilities_from_date').on('change', function() {
  
//   //  $('.to_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
//    // $('.calender').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
//      getAppUsersLiabilitiesGraphDataFunc();
// });


// $('.liabilities_to_date').on('change', function() {
   
//   //  $('.from_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
//   //  $('.from_date').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
//       getAppUsersLiabilitiesGraphDataFunc();
// });


// $('.networth_from_date').on('change', function() {
  
//   //  $('.to_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
//    // $('.calender').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
//    getAppUsersLiabilitiesGraphNetworthDataFunc();
// });


// $('.networth_to_date').on('change', function() {
   
//   //  $('.from_date').val(picker.startDate.format('MMM D, YYYY')+' - '+picker.endDate.format('MMM D, YYYY'));
//   //  $('.from_date').val(picker.startDate.format('YYYY-MM-DD HH:mm:ss')+'_'+picker.endDate.format('YYYY-MM-DD HH:mm:ss'));
//       getAppUsersLiabilitiesGraphNetworthDataFunc();
// });


   
$('#assets_data').on('change', function() {
 
    getAppUsersComparisonGraphDataFunc();
}); 

$('#assets_data1').on('change', function(){

    getAppUsersLiabilitiesGraphDataFunc();

});



// graph


$(document).ready(function(){
  $("#dropdown").click(function(){
    $(".open_ul").toggle();
  });
});


// pai chart
// Build the chart
function chart(assets,liabilites,netwarth){


   Highcharts.chart('netWorth', {
    chart: {
        type: 'variablepie'
    },
    title: {
        text: 'Networth $'+netwarth
    },
    series: [{
        minPointSize: 10,
        innerSize: '30%',
        zMin: 0,
        name: 'Networth',
        data: [
        {
            name: 'Assets',
            y: assets,
            z: 818
        }
        , {
            name: 'Liabilities',
            y: liabilites,
            z: 824
        }
        ]
    }]
  }); 
}

chart(0,0,0);

// ready