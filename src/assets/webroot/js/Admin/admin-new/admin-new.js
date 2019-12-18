jQuery(document).ready(function() {
	// dashboar top slider
	var swiper = new Swiper('.swiper_main_nav', {
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

  // select 2 dropdown
  jQuery('.js-industries').select2();
  jQuery('.js-clients').select2();
  jQuery('.js-all-courses').select2();
  // select 2 dropdown

  // scrollt o top when all course total video
  jQuery("#tab-total-video .select_box_tab").change(function(){
  jQuery(".botom_details_section").animate({ scrollTop: 0 }, "slow");
});
  // scrollt o top when all course total video




  // dashboard top slider main tabbing
  jQuery('.swiper_main_nav .swiper-slide').click(function(){
    var tab_id = jQuery(this).attr('data-tab');

    jQuery('.swiper_main_nav .swiper-slide').removeClass('current_main_nav');
    jQuery('.tab-content-main-nav').removeClass('current_main_nav');

    jQuery(this).addClass('current_main_nav');
    jQuery("#"+tab_id).addClass('current_main_nav');
  });

  // dashboard inner tabbing on basis of id
  jQuery('.main_mav_inner_tabbing li .view_this').on("click", function(event){
    event.preventDefault();
    var tab_id = jQuery(this).parent('li').attr('data-tab');

    jQuery('.main_mav_inner_tabbing li').removeClass('current_inner_content');

    jQuery(this).parent('li').addClass('current_inner_content');
    jQuery("#"+tab_id).addClass('current_inner_content');
  });

  // dashboard hide graph button
  jQuery('.hide_graph_button').click(function(){
    jQuery('.current_main_nav').toggleClass('graph_toggle');
  });


  // comparison graph11
  Highcharts.chart('comparision_graph11', {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          max: 25000,
          title: {
              text: 'Users'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Year 1',
          data: [1000, 3000, 4000, 10000, 8000, 12000, 4000, 3000, 1000, 500, 7500, 3000]

      }, {
          name: 'Year 2',
          data: [2000, 3500, 8000, 4000, 10000, 2000, 1500, 7000, 10000, 1000, 1500, 2000]

      }, {
          name: 'Year 3',
          data: [2000, 1000, 6000, 5000, 3000, 24000, 1000, 21000, 1000, 1200, 500, 1000]

      }]
  });
  // comparison graph11 End

  // comparison graph12
  Highcharts.chart('comparision_graph12', {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          max: 25000,
          title: {
              text: 'Users'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Year 1',
          data: [1000, 3000, 4000, 10000, 8000, 12000, 4000, 3000, 1000, 500, 7500, 3000]

      }, {
          name: 'Year 2',
          data: [2000, 3500, 8000, 4000, 10000, 2000, 1500, 7000, 10000, 1000, 1500, 2000]

      }, {
          name: 'Year 3',
          data: [2000, 1000, 6000, 5000, 3000, 24000, 1000, 21000, 1000, 1200, 500, 1000]

      }]
  });
  // comparison graph12 End

  // comparison graph13
  Highcharts.chart('comparision_graph13', {
      chart: {
          type: 'column'
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          max: 25000,
          title: {
              text: 'Users'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Year 1',
          data: [1000, 3000, 4000, 10000, 8000, 12000, 4000, 3000, 1000, 500, 7500, 3000]

      }, {
          name: 'Year 2',
          data: [2000, 3500, 8000, 4000, 10000, 2000, 1500, 7000, 10000, 1000, 1500, 2000]

      }, {
          name: 'Year 3',
          data: [2000, 1000, 6000, 5000, 3000, 24000, 1000, 21000, 1000, 1200, 500, 1000]

      }]
  });
  // comparison graph13 End

  

  // // growth_graph01
  // Highcharts.chart('growth_graph01', {
  //   chart: {
  //     type: 'areaspline'
  //   },
  //   title: {
  //     text: ''
  //   },
  //   legend: {
  //     layout: 'vertical',
  //     align: 'left',
  //     verticalAlign: 'top',
  //     x: 150,
  //     y: 100,
  //     floating: true,
  //     borderWidth: 0.5,
  //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
  //   },
  //   xAxis: {
  //     categories: [
  //       'Mon',
  //       'Tue',
  //       'Wed',
  //       'Thu',
  //       'Fri',
  //       'Sat',
  //       'Sun'
  //     ],
  //   },
  //   yAxis: {
  //     title: {
  //       text: ''
  //     },
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     areaspline: {
  //       fillOpacity: 0.5
  //     }
  //   },
  //   series: [{
  //     name: 'Certificates',
  //     data: [0, 30, 20, 45, 15, 60, 20]
  //   }]
  // });
  // // // growth_graph01 END

  // // growth_graph02
  // Highcharts.chart('growth_graph02', {
  //   chart: {
  //     type: 'areaspline'
  //   },
  //   title: {
  //     text: ''
  //   },
  //   legend: {
  //     layout: 'vertical',
  //     align: 'left',
  //     verticalAlign: 'top',
  //     x: 150,
  //     y: 100,
  //     floating: true,
  //     borderWidth: 0.5,
  //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
  //   },
  //   xAxis: {
  //     categories: [
  //       'Mon',
  //       'Tue',
  //       'Wed',
  //       'Thu',
  //       'Fri',
  //       'Sat',
  //       'Sun'
  //     ],
  //   },
  //   yAxis: {
  //     title: {
  //       text: ''
  //     },
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     areaspline: {
  //       fillOpacity: 0.5
  //     }
  //   },
  //   series: [{
  //     name: 'Certificates',
  //     data: [0, 30, 20, 45, 15, 60, 20]
  //   }]
  // });
  // // // growth_graph02 END

  // // growth_graph03
  // Highcharts.chart('growth_graph03', {
  //   chart: {
  //     type: 'areaspline'
  //   },
  //   title: {
  //     text: ''
  //   },
  //   legend: {
  //     layout: 'vertical',
  //     align: 'left',
  //     verticalAlign: 'top',
  //     x: 150,
  //     y: 100,
  //     floating: true,
  //     borderWidth: 0.5,
  //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
  //   },
  //   xAxis: {
  //     categories: [
  //       'Mon',
  //       'Tue',
  //       'Wed',
  //       'Thu',
  //       'Fri',
  //       'Sat',
  //       'Sun'
  //     ],
  //   },
  //   yAxis: {
  //     title: {
  //       text: ''
  //     },
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     areaspline: {
  //       fillOpacity: 0.5
  //     }
  //   },
  //   series: [{
  //     name: 'Certificates',
  //     data: [0, 30, 20, 45, 15, 60, 20]
  //   }]
  // });
  // // growth_graph03 END

  // ALL-DOWNLOADS GRAPH
  // Highcharts.chart('all-downloads', {
  //   chart: {
  //     type: 'areaspline'
  //   },
  //   title: {
  //     text: ''
  //   },
  //   legend: {
  //     layout: 'vertical',
  //     align: 'left',
  //     verticalAlign: 'top',
  //     x: 150,
  //     y: 100,
  //     floating: true,
  //     borderWidth: 1,
  //     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
  //   },
  //   xAxis: {
  //     categories: [
  //       'Sunday',
  //       'Monday',
  //       'Tuesday',
  //       'Wednesday',
  //       'Thursday',
  //       'Friday',
  //       'Saturday'
  //     ],
  //   },
  //   yAxis: {
  //     title: {
  //       text: ''
  //     }
  //   },
  //   tooltip: {
  //     shared: true,
  //     valueSuffix: ' units'
  //   },
  //   credits: {
  //     enabled: false
  //   },
  //   plotOptions: {
  //     areaspline: {
  //       fillOpacity: 0.5
  //     }
  //   },
  //   series: [{
  //     name: 'Certificates',
  //     data: [2, 5, 3, 7, 3, 8, 10]
  //   }, {
  //     name: 'Workbooks',
  //     data: [0, 2, 1, 5, 1.5, 5, 7]
  //   }, {
  //     name: 'Spreadsheets',
  //     data: [1, 0, 5, 3, 2.5, 3, 5]
  //   }
  //   ]
  // });
  // ALL-DOWNLOADS GRAPH END

  

  $('#users_table').DataTable( {
     "dom": "rtpi"
    });

  $('.totalUserDatepicker').daterangepicker();




});
// end of ready


Highcharts.chart('UserComparisonGraph', {
    chart: {
        type: 'column'
    },
    // title: {
    //     // text: 'Monthly Average Rainfall'
    // },
    // subtitle: {
    //     text: 'Source: WorldClimate.com'
    // },
    xAxis: {
        categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
          
        ],
        enabled: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total no. of Users'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Year 2009',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    }, {
        name: 'Year 2010',
        data: [83.6, 78.8, 98.5, 93.4, 106.0]

    }, 
    
    {
        name: 'Year 2011',
        data: [83.6, 78.8, 98.5, 93.4, 106.0]

    },
    
    {
        name: 'Year 2012',
        data: [48.9, 38.8, 39.3, 41.4, 47.0]

    }, {
        name: 'Year 2013',
        data: [42.4, 33.2, 34.5, 39.7, 52.6]

    }, {
        name: 'Year 2014',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    }, {
        name: 'Year 2015',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    }, {
        name: 'Year 2016',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    }, {
        name: 'Year 2017',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    },
    {
        name: 'Year 2018',
        data: [49.9, 71.5, 106.4, 129.2, 144.0]

    },]
});

// USER PIE GRAPH
Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});

// Build the chart
Highcharts.chart('User_status_chart', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    // title: {
    //     text: 'Browser market shares in January, 2018'
    // },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        name: 'Share',
        data: [
            { name: '', y: 40.41 },
            { name: '', y: 25.84 },
            { name: '', y: 10.85 },
            { name: '', y: 4.67 },
            
            
        ]
    }]
});



// Build the chart
Highcharts.chart('UserTypeGraph', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    // title: {
    //     text: 'Browser market shares in January, 2018'
    // },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        name: 'Share',
        data: [
            { name: '', y: 40.41 },
            { name: '', y: 25.84 },
           
            
            
        ]
    }]
});


// USER DISTRIBUTION GRAPH
Highcharts.chart('UserDistribution', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    // title: {
    //     text: 'Browser market shares in January, 2018'
    // },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        name: 'Share',
        data: [
            { name: '', y: 40.41 },
            { name: '', y: 25.84 },
            { name: '', y: 10.85 },
            { name: '', y: 4.67 },
            
            
        ]
    }]
});


// USER DEBT CRUSHER GRAPH
Highcharts.chart('DebtCrusherGraph', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    // title: {
    //     text: 'Browser market shares in January, 2018'
    // },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        name: 'Share',
        data: [
            { name: '', y: 50.41 },
            { name: '', y: 25.84 },
           
        ]
    }]
});

