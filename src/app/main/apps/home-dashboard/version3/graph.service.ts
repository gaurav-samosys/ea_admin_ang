 import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import * as Highcharts from 'highcharts';

// scatter,column,line
@Injectable()
export class GraphService 
{
// total users
myMethod$: Observable<any>;
private myMethodSubject = new Subject<any>();

constructor() {
    this.myMethod$ = this.myMethodSubject.asObservable();
}
dataGraph0;dataGraph1;dataGraph2;pyear;year;Average;name0;name1;name2;
myMethod(data) {
    console.log(data); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.myMethodSubject.next(data);

for (let index = 0; index < data.length; index++) {
    const element = data[index];
    console.log(element)
}





    this.name0 =data[0].name;
    this.name1 = data[1].name;
    this.name2 =data[2].name;
    console.log(this.name0,this.name1,this.name2,
      )
    console.log(data[0]['data'])
    console.log(data[1]['data'])
    console.log(data[2]['data']),
  this.dataGraph0=data[0]['data']
  this.dataGraph1=data[1]['data']
  this.dataGraph2=data[2]['data']
}




comparision:any={
    chart: {height:300, zoomType: 'x',type: 'column',resetZoomButton: {position: {x: 0,y: -30}}},

    credits: {
        enabled: false
      },
                        navigation: {buttonOptions: {enabled: false}},

                        title: {text: ''},
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
                            enabled: false
                        },
                        tooltip: {useHTML: true, shared: true},
                // tooltip: {
                //     pointFormat: '<span style="display: inline-block; width: 90px;"><span style="color:{series.color};float: left;">{series.name}</span>: <span style="float: left;"><b>{point.y}</b></span><br/></span>',
                //     shared: true
                // },
              plotOptions: {column: ''},              
                series:[
                    {
                        name:''
                    //     data: [
                    //       [1373228000, 40],
                    //       [1373928000, 32],
                    //       [1374228000, 30]
                    //     ],
                    //     color: 'black',
                    //     tooltip: {valueSuffix: '°C'}
                      },
                ]   
                // series: [{
                //       name: this.name0 ,
                //       data:[this.dataGraph0],
                //       color: 'black',
                //     },{
                //       name: this.name1,
                //       data:[this.dataGraph1], color: 'black',
                        
                //     },{
                //         name:this.name2,
                //         data:[this.dataGraph2], color: 'black',

                //     }]
}







 public users: any =  {
    chart: {
       height:300,
    //    width:470,
        type: 'column',zoomType: 'xy', panning: true, panKey: 'shift',
                        resetZoomButton: {
                            position: {
                            // align: 'right', // by default
                            // verticalAlign: 'top', // by default
                            x: 0,
                            y: -30
                        }
                    }
    },
    credits: {
        enabled: false
      },
    navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
            categories: [],
            labels: {enabled: true},
            opposite: false,

       /* labels: {enabled: true}, opposite: false,
         categories: [],
        type: 'category', min: 0,                
                    tickLength: 0*/
    },
    yAxis: {
        min: 0,title: {text: ''}
    },
    legend: {
        enabled: false
    },
    tooltip: {
                    shared: true,
                    useHTML: true,
        pointFormat: 'Users: <b>{point.y:.1f}</b>'
    },
    series: [{showInLegend: false,enableMouseTracking: true},
                { 
                    showInLegend: false,
                    name: "Users",
                    data: []
                }
            ]
}






// total downloads
 public downloads: any = {
    chart: {showInLegend: false,zoomType: 'x',height:300,
    // width:460,
                        resetZoomButton: {
                            position: {
                                // align: 'right', // by default
                                // verticalAlign: 'top', // by default
                                x: 0,
                                y: -30
                            }
                        }},
    navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
tooltip: {shared: true,valueSuffix: ' Downloads'},
credits: {enabled: false},
 xAxis: {
      categories: [],
        labels: {enabled: true},
    },

    yAxis: {
        title: {text: ''}
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

   plotOptions: {series: {marker: {enabled: false}}},

    series: [{
        showInLegend: false,
        name: 'Certificates',
        data: []
    }, {
        showInLegend: false,
        name: 'Workbook',
        data: []
    }, {
        showInLegend: false,
        name: 'Tools',
        data: []
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

}




// total video

 public video: any =  {
    chart: {
        type: 'column',zoomType: 'x',height:300,
        // width:470,
                        resetZoomButton: {
                            position: {
                                // align: 'right', // by default
                                // verticalAlign: 'top', // by default
                                x: 0,
                                y: -30
                            }
                        }
    },  credits: {
        enabled: false
      },
    navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
        categories: [],
    labels: {enabled: true},
    opposite: false,
    },
    yAxis: {
       min: 0,title: {text: ''}
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Users: <b>{point.y:.1f}</b>'
    },
    series: [{showInLegend: false,enableMouseTracking: true},{
        name: 'Video Views',
        data: [
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
}



public videochartGraph: any =  {
    chart: {
        type: 'column',zoomType: 'x',height:300,
                        resetZoomButton: {
                            position: {
                                // align: 'right', // by default
                                // verticalAlign: 'top', // by default
                                x: 0,
                                y: -30
                            }
                        }
    },  credits: {
        enabled: false
      },
    navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
        categories: [],
    labels: {enabled: true},
    opposite: false,
    },
    yAxis: {
       min: 0,title: {text: ''}
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Users: <b>{point.y:.1f}</b>'
    },
    series: [{showInLegend: false,enableMouseTracking: true},{
        name: 'Video Views',
        data: [
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
}






certificate:any={
    chart: {
        type: 'column',zoomType: 'x',height:300,
        // width:470,
                        resetZoomButton: {
                            position: {
                                    // align: 'right', // by default
                                    // verticalAlign: 'top', // by default
                                    x: 0,
                                    y: -30
                                }
                            }
    },  credits: {
        enabled: false
      },
     navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
        labels: {enabled: true},
         opposite: false,
        categories: []
    },
    yAxis: {
       min: 0,title: {text: ''}
    },
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
        showInLegend: false,
        name: 'Pending',
        data: [],
        stack: 'accesscode'
    }, {
        showInLegend: false,
        name: 'Completed',
        data: [],
        stack: 'accesscode'
    }
    ]
}













completion:any={
    chart: {
        type: 'column',height:300,
        // width:470,
        zoomType: 'x',

                        resetZoomButton: {
                            position: {
                                    // align: 'right', // by default
                                    // verticalAlign: 'top', // by default
                                    x: 0,
                                    y: -30
                                }
                            }
    },  credits: {
        enabled: false
      },
    navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
        labels: {enabled: true},
         opposite: false,
        categories: []
    },
    yAxis: {
        min: 0,title: {text: ''}
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [
   
    {
      showInLegend: false,
     name: 'Not Started',
        data: [],
        stack: 'certificates'
         },
    {
        showInLegend: false,
        name: 'Pending',
        data: [],
        stack: 'certificates'
    }, {
        showInLegend: false,
        name: 'Mandatory',
        data: [],
        stack: 'certificates'
    }, {
        showInLegend: false,
        name: 'Full Course',
        data: [],
        stack: 'certificates'
    }
    ]
}













access_code:any={
    chart: {
        type: 'column',height:300,
        // width:460,
        zoomType: 'x',
                        resetZoomButton: {
                            position: {
                                // align: 'right', // by default
                                // verticalAlign: 'top', // by default
                                x: 0,
                                y: -30
                            }
                        }
    },  credits: {
        enabled: false
      },
     navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
        labels: {enabled: true},
         opposite: false,
        categories: []
    },
    yAxis: {
        min: 0,title: {text: ''}
    },
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
        showInLegend: false,
        name: 'Unused Code',
        data: [],
        stack: 'accesscode'
    }, {
        showInLegend: false,
        name: 'Used Code',
        data: [],
        stack: 'accesscode'
    }
    ]
}














createChart(el, cfg) {
    Highcharts.chart(el, cfg);
  }



















public survey: any =  {
    chart: { height:300,
        type: 'column',zoomType: 'x',
                        resetZoomButton: {
                            position: {
                                // align: 'right', // by default
                                // verticalAlign: 'top', // by default
                                x: 0,
                                y: -30
                            }
                        }
    },  credits: {
        enabled: false
      },
    navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
        categories: [],
    labels: {enabled: true},
    opposite: false,
    },
    yAxis: {
       min: 0,title: {text: ''}
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Serveys: <b>{point.y:.1f}</b>'
    },
    series: [{showInLegend: false,enableMouseTracking: true},{
        name: 'Survey Views',
        data: [
        ],
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
}

/*
comparision_course:any={
    chart: {
        type: 'column',
        zoomType: 'x',
                        resetZoomButton: {
                            position: {
                                // align: 'right', // by default
                                // verticalAlign: 'top', // by default
                                x: 0,
                                y: -30
                            }
                        }
    },
     navigation: {buttonOptions: {enabled: false}},
    title: {
        text: ''
    },
    xAxis: {
        labels: {enabled: true},
         opposite: false,
        categories: []
    },
    yAxis: {
        min: 0,title: {text: ''}
    },
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
     
    }]
}*/

}