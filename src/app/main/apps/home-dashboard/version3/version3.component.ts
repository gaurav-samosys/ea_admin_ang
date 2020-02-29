import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as myGlobals from '../../../../global';
import { Version3Service } from './version3.service';
import { GraphService } from './graph.service';
import * as Highcharts from 'highcharts';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { Sort } from '@angular/material/sort';
import { MatSelect } from '@angular/material';
declare var require: any;
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';
import { LocaleConfig } from 'ngx-daterangepicker-material';
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

export interface Dessert {
  //industry/company
  // name:string,
  total_user: string,
  total_client: number,
  total_company: number

  // name:string,
  // industry: string;
  // total_client: number,
  // total_user: string,

  status: number;

  register_date: string
  //client
  name: string;
  industry: string;
  company: string;
  vertical: string;
  user: number;
  // status: number;
  register: string;

  //user
  // name: string;
  email: string,
  vedio: string,
  cloud: string,
  certificate: string,
  progress: string,
  percent: number,
  // status:string,
  // register:number,


  //vertical
  // name: string;
  total_vedio: number,
  total_quiz: number,
  total_question: number,
  create_date: number,

}


@Component({
  selector: 'app-version3',
  templateUrl: './version3.component.html',
  styleUrls: ['./version3.component.scss'],
  providers: [DatePipe]
})
export class Version3Component implements OnInit {
  sortedData: Dessert[];

  search_status_value: any = ''


  desserts = []



  full_2018: any;
  mandatory_2018: any;
  full_2019: any;
  mandatory_2019: any;
  user_status = 'true';
  dataSelect = 1;
  status = 'Active';
  certificates = 'completed';
  course = 'notstarted';
  dataselected = 'total_users';
  industrydropdownList = [];
  industryselectedItems = [];
  industrydropdownSettings = {};

  companydropdownList = [];
  companyselectedItems = [];
  companydropdownSettings = {};

  clientsdropdownList = [];
  clientsselectedItems = [];
  clientsdropdownSettings = {};

  verticalsdropdownList = [];
  verticalsselectedItems = [];
  verticalsdropdownSettings = {};


  locationdropdownList = [];
  locationselectedItems = [];
  locationdropdownSettings = {};
  comparision_data: any;
  totalpendinggraph: any;
  notstarted: any;
  fullCourse: any;
  mandatory: any;
  pending: any;
  unused: any;
  used: any;
  increment = 1;
  usergraph: any;
  downloadgraph: any;
  videograph: any;
  claimedgraph: any;
  coursegraph: any;
  accessgraph: any;
  certificate: any;
  workbook: any;
  pyear: any;
  year: any;
  tool: any;
  select_box = 1;
  check = true;
  showloader = false;
  pageNumber: number = 0;
  size: number = 10;
  rows: any;
  data: any;
  searchtype: any;
  // companymodel: any;
  // clientmodel: any;
  // usermodel: any;
  // verticalmodel: any;
  industryData: any;
  companyData: any;
  clientData: any;
  verticalData: any;
  locationData: any;
  industry: any;
  user_total: any;
  industry_total: any;
  company: any;
  company_total: any;
  client: any;
  client_total: any;
  vertical: any;
  vertical_total: any;
  location: any;
  location_total: any;
  IndustrywithData: any;
  allItems: any;
  start: any;
  end: any;
  pager: any;
  URL: any;
  table = 1;
  usergraphData: any;
  usergraph_total: any;
  totaldownloadgraph: any;
  totalvideograph: any;
  totalcertificategraph: any;
  totalcompletiongraph: any;
  totalaccessgraph: any;
  downloaded: any;
  download_pending: any;
  search_data: any;
  comparisiongraph_total: any;
  vertical_graphdata: any;
  clients_grapgdata: any;
  location_data = [];
  clients_data = [];
  clients_id = [];
  client_id = [];
  industry_id = [];
  company_id = [];
  id_vertical = [];
  location_id = [];
  selected: any;
  vertical_id = [];
  cat_name;
  color="blue"

  ClientsList = myGlobals.ClientsList
  topicsMaster = myGlobals.topicsMaster
  getVideoChart = myGlobals.getVideoChart
  getSurveyChart = myGlobals.getSurveyChart
  getEaAllUsersList = myGlobals.getEaAllUsersList;
  getIndustriesWithData = myGlobals.getIndustriesWithData;
  getCompaniesWithData = myGlobals.getCompaniesWithData;
  getClientsWithData = myGlobals.getClientsWithData;
  getUsersWithData = myGlobals.getUsersWithData;
  getVerticalsWithData = myGlobals.getVerticalsWithData;
  getUserGraphData = myGlobals.getUserGraphData;
  getDownloadsGraphData = myGlobals.getDownloadsGraphData;
  getVideoViewsGraphData = myGlobals.getVideoViewsGraphData;
  getCertificationGraphData = myGlobals.getCertificationGraphData;
  getCompletionGraphData = myGlobals.getCompletionGraphData;
  getAccessCodeGraphData = myGlobals.getAccessCodeGraphData;
  getComparisonGraphData = myGlobals.getComparisonGraphData;
  // date_range: any;
  common: any;
  name = [];
  final_name = [];
  Grades = [{ id: '80_to_100', value: '80% higher : Excellent' }, { id: '70_to_79', value: '70-79% : Good' }, { id: '60_to_69', value: '60-69% : Fair' }, { id: '10_to_50', value: 'Below 60% : Needs Work' }]
  displayedColumns: string[] = ['name', 'total_company', 'total_client', 'total_user'];
  displayedColumns1: string[] = ['name', 'industry', 'total_client', 'total_user', 'status', 'register_date'];
  displayedColumns2: string[] = ['name', 'industry', 'company', 'vertical', 'user', 'status', 'register'];
  displayedColumns3: string[] = ['name', 'email', 'vedio', 'cloud', 'certificate', 'progress', 'percent', 'status', 'register'];
  displayedColumns4: string[] = ['name', 'total_vedio', 'total_quiz', 'total_question', 'create_date', 'action'];
  displayedColumns6: string[] = ['name', 'email', 'total_dept', 'total_dept_amount', 'status', 'dept_free_date']

  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild('matSelect', { static: true }) matSelect: MatSelect;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  sort_column_active: boolean = false;
  sort_column
  sort_order = "DESC";
  ASC;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  startIndex = 1
  endIndex = 10
  value = '';
  endindex: any;
  industry_disable = 0;
  company_disable = 0;
  private _unsubscribeAll: Subject<any>;
  previousYear
  usergraph1: any;
  // locale: LocaleConfig = {
  //   applyLabel: 'Appliquer',
  //   customRangeLabel: 'fdfdf',
  //   daysOfWeek: moment.weekdaysMin(),
  //   monthNames: moment.monthsShort(),
  //   firstDay: moment.localeData().firstDayOfWeek(),
  // }
  rangesTable:any={
    'Default': [moment().subtract(1, 'year'), moment()],
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'Last 3 Month': [moment().subtract(2, 'month'), moment()],

    'Last 6 Month': [moment().subtract(5, 'month'), moment()],
    'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
  }

  ranges: any = {
    'Default': [moment().subtract(1, 'year'), moment()],
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Current Month': [moment().subtract('days').startOf('month'), moment().subtract('days').endOf('days')],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'Last 3 Month': [moment().subtract(2, 'month'), moment()],
    'Last 6 Month': [moment().subtract(5, 'month'), moment()],
    'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
  }

  ranges1: any = {
    'Default': [moment().subtract(1, 'year'), moment()],
    'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
    'Last 2 Year': [moment().subtract(2, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
    'Last 3 Year': [moment().subtract(3, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
    'Last 5 Year': [moment().subtract(5, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
    'Last 10 Year': [moment().subtract(10, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
  }

  topicList: any;
  topic_id: any;
  total_users_video: any;
  MaxVideo: any;
  minVideo: any;
  maxVideo: any;
  surwayArray: any;
  totalSurways: any;
  select_grade = ''
  select_client = ''
  date_range = ''
  Average: any;
  DefaultUser: any
  getToggle
  options: Options;

  comparisiongraph: Chart;
  surveychartGraph: Chart;
  myDate = new Date()
  currDate
  // month_names_short:string
  month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar
    , private _router: Router, private _fuseSidebarService: FuseSidebarService,
    private datePipe: DatePipe,
    public v3Service: Version3Service, public graph: GraphService, private pagerService: PagerService) {
    this._unsubscribeAll = new Subject();
    this.currDate = this.datePipe.transform(this.myDate, 'MM-dd-yyyy');
    var preyr = new Date();
    var pastYear = preyr.getFullYear() - 1;
    preyr.setFullYear(pastYear);

    this.dateFormat2()
  }
  range
  rangeSurvey
  yearRange
  rangeAccessCode
  rangeCourse
  videoRange
  claimedgraphRange
  userRange	
  downloadRange
  dateFormat2() {
    var t = new Date();
    var curr = this.month_names_short[t.getMonth()] + ' ' + t.getDate() + ',' + t.getFullYear()
    var past = this.month_names_short[t.getMonth()] + ' ' + t.getDate() + ',' + (new Date().getFullYear() - 1)
    this.previousYear = past + '-' + curr
    //  console.log( this. previousYear)
    //    this.range = {
    //     start:      past,
    //     end:        curr

    // };
    // console.log( this.range)

  }
  ngOnInit() {


    var newDateTest = {}
    newDateTest['startDate'] = [moment().subtract(1, 'year'), moment()][1]
    newDateTest['endDate'] = [moment().subtract(1, 'year'), moment()][0]
    this.usergraph1 = newDateTest
    var defoult = this.usergraph1['startDate']['_d']
    var defoult1 = this.usergraph1['endDate']['_d']
    console.log(defoult, defoult1)
    this.range = {
      start: defoult1,
      end: defoult
    };

    this.rangeSurvey={
      start: defoult1,
      end: defoult
    }
    this.yearRange={
      start: defoult1,
      end: defoult
    }
    this.rangeAccessCode={
      start: defoult1,
      end: defoult
    }
    this.rangeCourse={
      start: defoult1,
      end: defoult
    }
    this.videoRange={
      start: defoult1,
      end: defoult
    }
    this.claimedgraphRange={
      start: defoult1,
      end: defoult
    }
    this. userRange	={
      start: defoult1,
      end: defoult
    }
    this.downloadRange={
      start: defoult1,
      end: defoult
    }
    console.log(this.range)
    this.tab = 'tab1';

    this.comparisionChart();
    this.surweyChart();

    // this.getClientwithData(this.date_range, this.search_data, this.client_id);
    this.industrydropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.companydropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'company_name',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.clientsdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'client_name',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.verticalsdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.locationdropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'locationName',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: false
    };

    this.data = '';
    this.table = 1;
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data)
    this.getIndustrywithData(this.search_data, this.industry_id);
    this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data);
    this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data);
    this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data);
    this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data);
    this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data);
    this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data);
    this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data, this.company_id, this.dataselected);

    this.getVideoListDropdown();
    this.getSurveyListDropdown();

    this.getSurveyChartGraph(this.select_client, this.select_grade, this.date_range)

  }



  catName = []
  getVideoListDropdown() {
    this.v3Service.POST(this.topicsMaster, { token: 'LIVESITE' }).subscribe(res => {
      this.topicList = res['data']
      var value_id = res['data'][0]// get data for 0 index object
      this.changeTopicMaster(value_id)
    })
  }


  changeTopicMaster(value_id) {
    // console.log(value_id);
    this.topic_id = value_id
    // console.log( this.topic_id )
    this.cat_name = value_id.cat_name
    // console.log( this.cat_name)
    this.getVideoChartGraph(this.clients_id, this.vertical_id, this.location_data)
  }



  getVideoChartGraph(client_id, vertical_id, location_data, ) {
    this.showloader = true

    // console.log("client id================", client_id, "ver id============", vertical_id, "location id===============", location_data)
    this.v3Service.POST(this.getVideoChart, {
      topic_id: this.topic_id, clients_ids: client_id,
      verticals_ids: vertical_id, location: location_data, dateRange: '', token: 'LIVESITE'
    }).subscribe(res => {
      // console.log(res)
      this.getVideoGraphSuccessHandler(res)
    })
  }




  getVideoGraphSuccessHandler(res) {
    this.showloader = false
    this.minVideo = res.minVideo
    this.maxVideo = res.maxVideo

    // console.log(res, this.maxVideo, this.minVideo)
    this.vertical_id = [];
    this.clients_id = [];
    var data = res.data
    for (let index = 0; index < data.length; index++) {
      var element = data[index].data;
      // console.log("data inside data=====", element)
    }
    var categary = res.category
    this.total_users_video = res.total_users

    // console.log('vedio ===========', res, res['data'], " this.total_users_video=======", this.total_users_video)
    this.graph.videochartGraph.xAxis.categories = categary
    // this.graph.video.yAxis.categories =  element
    // this.graph.video.series[0].data = categary
    this.graph.videochartGraph.series[0].data = element
    // console.log(this.graph.video.xAxis.categories, this.graph.video.yAxis.categories, this.graph.video.series[0].data, this.graph.video.series[1].data)
    Highcharts.chart('videochartGraph', this.graph.videochartGraph);
  }


  /**
   * get surway list dropdown
   */

  getSurveyListDropdown() {
    this.v3Service.POST(this.ClientsList, { token: 'LIVESITE' }).subscribe(res => {
      this.surwayArray = res['data']
      // console.log("surwey=====", this.surwayArray)
    })
  }

  changeGrades(value) {
    // console.log(value)
    this.select_grade = value
    this.getSurveyChartGraph(this.select_grade, this.select_client, this.date_range)
  }

  changeClient(value) {
    // console.log(value)
    this.select_client = value
    this.getSurveyChartGraph(this.select_grade, this.select_client, this.date_range)

  }
  // getSurveyChart
  columns
  element
  getSurveyChartGraph(select_grade, select_client, date_range) {
    this.showloader = true
    this.v3Service.POST(this.getSurveyChart, {
      token: 'LIVESITE',

      select_grade: select_grade,
      select_client: select_client,
      dateRange: date_range,
    }).subscribe(res => {
      this.showloader = false
      this.totalSurways = res['totals']
      this.columns = res['columns']

      // console.log(this.columns)

      var data = res['data']
      for (let index = 0; index < data.length; index++) {
        this.element = data[index].data;
        // console.log("data inside data=====", this.element)
      }

      // this.graph.survey.xAxis.categories = this.columns
      // this.graph.survey.series[0].data = this.element

      // Highcharts.chart('surveychartGraph', this.graph.survey);
      this.surweyChart();
    })
  }



  surweyChart() {
    // console.log("gfdsgdfgdfg===========")
    // if (this.chart) {
    //   this.chart.destroy()
    // }
    this.options = ({

      chart: {
        height: 300, zoomType: 'x', type: 'column',
        // resetZoomButton: { position: { x: 0, y: -30 } } 
        resetZoomButton: {
          position: {
            // align: 'right', // by default
            // verticalAlign: 'top', // by default
            x: -10,
            y: 10
          },
          // relativeTo: 'chart'
        }
      },

      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },


      // series: [
      //   {
      //     name: 'Surveys',
      //     color: "rgb(124,181,236)",
      //     enableMouseTracking: false,
      //     type: undefined,
      //     data: this.element
      //   },
      // ]
      tooltip: {
        pointFormat: 'Serveys: <b>{point.y:.1f}</b>'
      },
      series: [{
        name: 'Surveys',
        color: "rgb(124,181,236)",
        enableMouseTracking: true,
        type: undefined,
        data: this.element

      },

      ]

    });
    let surveychartGraph = new Chart(this.options);
    this.surveychartGraph = surveychartGraph;
  }




















  resetLocation() {
    this.locationselectedItems = [];
  }
  resetVertical() {
    this.verticalsselectedItems = [];
  }

  resetClient() {
    this.clientsselectedItems = [];
  }

  resetCompany() {
    this.companyselectedItems = [];
  }

  resetIndustry() {
    this.industryselectedItems = [];
  }


  refreshFilter() {
    this.resetLocation();
    this.resetVertical();
    this.resetClient();
    this.resetCompany();
    this.resetIndustry();
    this.industry_id = []
    this.company_id = [];
    this.client_id = [];
    this.clients_data = [];
    this.clients_id = [];
    this.vertical_id = [];
    this.id_vertical = [];
    this.location_data = [];
    this.selected = ''
    this.data = '';
    this.table = 1;
    this.company_disable = 0;
    this.industry_disable = 0;
    this.ngOnInit();
  }

  show_li(value) {
    document.getElementById('show_' + value).classList.toggle('displayNone')
  }
  hide(value) {
    document.getElementById('show_' + value).classList.add('displayNone')
  }

  show_list(value) {
    document.getElementById('search_' + value).classList.toggle('displayNone')
  }

  hides(value) {
    document.getElementById('show_' + value).classList.add('displayNone')
  }


  /** Builds and returns a new User. */


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * get All USER
   * @param industry_id 
   * @param company_id 
   * @param client_id 
   * @param id_vertical 
   * @param location_data 
   */
  getAllUser(industry_id, company_id, client_id, id_vertical, location_data) {
    let industries_id, companies_id, vid = [];
    industries_id = industry_id;
    companies_id = company_id
    if (location_data.length > 0) {
      industries_id = '';
      companies_id = '';
      client_id = '';

    }
    else if (location_data == '' && this.selected == 'verticals_selected') {
      industries_id = '';
      companies_id = '';
      client_id = '';
    }

    else if (id_vertical.length > 0) {
      industries_id = '';
      companies_id = '';
      client_id = '';
    }
    else if (id_vertical == '' && this.selected == 'verticals_selected') {
      industries_id = '';
      companies_id = '';
      client_id = '';
      for (var i = 0; i < this.vertical.length; i++) {
        id_vertical.push(this.vertical[i].id)
      }
    }
    else if (client_id.length > 0 && company_id.length > 0) {
      industries_id = '';
      companies_id = '';
    }
    else if (client_id == '' && this.selected == 'clients_selected') {
      industries_id = '';
      companies_id = '';
      if (this.client != undefined) {

        for (var i = 0; i < this.client.length; i++) {
          client_id.push(this.client[i].id)
        }
      }
      else if (company_id.length > 0) {
        industries_id = '';
      }

    }


    /* if(location_data.length > 0)
     {
       for (var i = this.vertical.length - 1; i >= 0; i--) {
         this.location_id.push(this.vertical[i].id)
       }

     }

     if(id_vertical.length == 0)
     {
       vid=this.location_id
     }
     else
     {
       vid=id_vertical;
     }*/

// loccccccal
    //  industriesIds
    //  companiesIds
    //  clientsIds
    //  verticalsIds
    //  location
    //  selected

//staging
    // industries: 
    // companies: 
    // clients: 327,547,661,333,118,321,284
    // verticals: 
    // location: 
    // selected: clients_selected
    this.v3Service.POST(this.getEaAllUsersList,
      {
        industries: industries_id.toString(),
        companies: companies_id.toString(),
        clients: client_id.toString(), 
        verticals: id_vertical.toString(),
        // industriesIds: industries_id.toString(),
        // companiesIds: companies_id.toString(),
        // clientsIds: client_id.toString(), 
        // verticalsIds: id_vertical.toString(),
        location: location_data.toString(),
        selected: this.selected, 
        token: 'LIVESITE'
      }).subscribe(res => {
        this.common = res

        if (industry_id.length == 0 && companies_id.length == 0 && client_id.length == 0 && id_vertical.length == 0 && location_data.length == 0) {

          this.industryData = this.common.data.industries;
          this.industry = this.industryData.data;
          this.industry_total = this.industryData.total;

          this.companyData = this.common.data.companies;
          this.company = this.companyData.data;
          this.company_total = this.companyData.total;

          this.clientData = this.common.data.clients;
          this.client = this.clientData.data;
          this.client_total = this.clientData.total;

          this.verticalData = this.common.data.verticals;
          this.vertical = this.verticalData.data;
          this.vertical_total = this.verticalData.total


          this.locationData = this.common.data.location;
          this.location = this.locationData.data;
          this.location_total = this.locationData.total;


          this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, location_data,
            this.company_id, this.dataselected);


        }

        else if (companies_id.length == 0 && client_id.length == 0 && id_vertical.length == 0 && location_data.length == 0) {
          this.companyData = this.common.data.companies;
          this.company = this.companyData.data;
          this.company_total = this.companyData.total;



          this.clientData = this.common.data.clients;
          this.client = this.clientData.data;
          this.client_total = this.clientData.total;


          this.verticalData = this.common.data.verticals;
          this.vertical = this.verticalData.data;
          this.vertical_total = this.verticalData.total

          this.locationData = this.common.data.location;
          this.location = this.locationData.data;
          this.location_total = this.locationData.total;


          this.clients_grapgdata = this.common.data.clients;
          this.vertical_graphdata = this.common.data.verticals

          for (var i = this.clients_grapgdata.data.length - 1; i >= 0; i--) {
            this.clients_id.push(this.clients_grapgdata.data[i].id)
          }
          for (var i = this.vertical_graphdata.data.length - 1; i >= 0; i--) {

            this.vertical_id.push(this.vertical_graphdata.data[i].id)
          }

          // console.log("client", this.clients_id)
          // console.log("vertical", this.vertical_id)


          this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, location_data,
            this.company_id, this.dataselected);
        }


        else if (client_id.length == 0 && id_vertical.length == 0 && location_data.length == 0) {


          this.clientData = this.common.data.clients;
          this.client = this.clientData.data;
          this.client_total = this.clientData.total;


          this.verticalData = this.common.data.verticals;
          this.vertical = this.verticalData.data;
          this.vertical_total = this.verticalData.total

          this.locationData = this.common.data.location;
          this.location = this.locationData.data;
          this.location_total = this.locationData.total;


          this.clients_grapgdata = this.common.data.clients;
          this.vertical_graphdata = this.common.data.verticals

          for (var i = this.clients_grapgdata.data.length - 1; i >= 0; i--) {
            this.clients_id.push(this.clients_grapgdata.data[i].id)
          }
          for (var i = this.vertical_graphdata.data.length - 1; i >= 0; i--) {
            this.vertical_id.push(this.vertical_graphdata.data[i].id)
          }


          this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, location_data,
            this.company_id, this.dataselected);
        }


        else if (id_vertical.length == 0 && location_data.length == 0) {




          this.verticalData = this.common.data.verticals;
          this.vertical = this.verticalData.data;
          this.vertical_total = this.verticalData.total

          this.locationData = this.common.data.location;
          this.location = this.locationData.data;
          this.location_total = this.locationData.total;


          this.clients_grapgdata = this.common.data.clients;
          this.vertical_graphdata = this.common.data.verticals

          for (var i = this.clients_grapgdata.data.length - 1; i >= 0; i--) {
            this.clients_id.push(this.clients_grapgdata.data[i].id)
          }
          for (var i = this.vertical_graphdata.data.length - 1; i >= 0; i--) {
            this.vertical_id.push(this.vertical_graphdata.data[i].id)
          }


          this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, location_data,
            this.company_id, this.dataselected);
        }

        else if (location_data.length == 0) {



          this.locationData = this.common.data.location;
          this.location = this.locationData.data;
          this.location_total = this.locationData.total;


          this.vertical_graphdata = this.common.data.verticals

          for (var i = this.client.length - 1; i >= 0; i--) {
            this.clients_id.push(this.client[i].id)
          }
          for (var i = this.vertical_graphdata.data.length - 1; i >= 0; i--) {
            this.vertical_id.push(this.vertical_graphdata.data[i].id)
          }


          this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, location_data,
            this.company_id, this.dataselected);
        }


        else {
          this.industry_total = this.common.data.industries.total;
          this.company_total = this.common.data.companies.total;
          this.client_total = this.common.data.clients.total;
          this.vertical_total = this.common.data.verticals.total;
          this.location_total = this.locationData.total;


          for (var i = this.client.length - 1; i >= 0; i--) {
            this.clients_id.push(this.client[i].id)
          }
          for (var i = this.vertical.length - 1; i >= 0; i--) {
            this.vertical_id.push(this.vertical[i].id)
          }


          this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, location_data);
          this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, location_data,
            this.company_id, this.dataselected);
        }



        /*  this.verticalData=this.common.data.verticals;
           this.vertical=this.verticalData.data;
          this.vertical_total=this.verticalData.total;*/
        /* this.locationData=this.common.data.location;
          this.location=this.locationData.data;*/

        this.user_total = this.common.data.customers.total
        this.industrydropdownList = this.industry
        this.companydropdownList = this.company
        this.clientsdropdownList = this.client
        this.verticalsdropdownList = this.vertical
        this.locationdropdownList = this.location

      })
  }

  // hideIndustryList:number=0

  onIndustryclick(event) {
    // this.showloader = true;
    this.industry_disable = 0;
    this.table = 1;
    this.company_id = [];
    this.clients_id = [];
    this.id_vertical = [];
    this.clients_data = [];
    this.location_data = [];
    this.resetCompany();
    this.industry_id.push(parseInt(event.id))

    // if(this.industry_id.length>=10){
    //  this.hideIndustryList=1
    // }
    // console.log("this.industry_id=============", this.industry_id)
    /*    if(event.checked == true){
        }
        else{
           for(var obj in this.industry_id){
             if(this.industry_id[obj] == event.source.value ){
                this.industry_id.splice(parseInt(obj),1)
             }
           }
        }*/
    this.selected = 'industries_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getIndustrywithData(this.search_data, this.industry_id);

  }


  onIndustrydelselect(event) {
    // this.showloader = true;
    this.table = 1;
    // this.company_id = [];
    for (var obj in this.industry_id) {
      if (this.industry_id[obj] == event.id) {
        this.industry_id.splice(parseInt(obj), 1)
      }
    }
    this.selected = 'industries_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getIndustrywithData(this.search_data, this.industry_id);
  }



  onCompanyclick(event) {

    this.clients_id = [];
    this.resetClient();
    this.table = 2
    this.company_disable = 0;
    this.industry_disable = 1;

    this.company_id.push(parseInt(event.id))

    // console.log("company_id=============", this.company_id)
    /*          if(event.checked == true && this.industry_id.length == 0){

    }
    else if(event.checked == false && this.industry_id.length == 0){
       for(var obj in this.company_id){
         if(this.company_id[obj] == event.source.value ){
            this.company_id.splice(parseInt(obj),1)
         }
       }
    
    }
    else if(event.checked == true && this.industry_id.length != 0)
    {
       this.company_id.push(parseInt(event.source.value))
    }*/

    this.selected = 'companies_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getCompanywithData(this.date_range, this.search_data, this.industry_id, this.company_id);
  }

  onCompanydeselect(event) {
    this.clients_id = [];

    this.table = 2
    for (var obj in this.company_id) {
      if (this.company_id[obj] == event.id) {
        this.company_id.splice(parseInt(obj), 1)
      }
    }
    if (this.company_id.length == 0) {
      this.industry_disable = 0;
    }
    this.selected = 'companies_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getCompanywithData(this.date_range, this.search_data, this.industry_id, this.company_id);
  }

  onClientclick(event) {
    this.id_vertical = [];
    this.clients_data = [];
    // this.location_data = [];
    this.resetVertical();
    this.table = 3;
    this.industry_disable = 1;
    this.company_disable = 1;
    this.client_id.push(parseInt(event.id))
    // console.log('this.client_id===============', this.client_id)

    /*    if(event.checked == true){
    
        }
        else{
           for(var obj in this.client_id){
             if(this.client_id[obj] == event.source.value ){
                this.client_id.splice(parseInt(obj),1)
             }
           }
        
        }*/
    this.selected = 'clients_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getClientwithData(this.date_range, this.search_data, this.company_id, this.client_id);

  }

  onClientdeselect(event) {
    this.id_vertical = [];

    this.table = 3;
    for (var obj in this.client_id) {
      if (this.client_id[obj] == event.id) {
        this.client_id.splice(parseInt(obj), 1)
      }
    }

    // console.log("client_id deselect========",this.client_id)
    if (this.client_id.length == 0) {
      this.industry_disable = 0;
      this.company_disable = 0;
    }
    this.selected = 'clients_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getClientwithData(this.date_range, this.search_data, this.company_id, this.client_id);
  }

  onVerticalclick(event) {
    
    this.table = 4;
    this.location_data = [];
    this.resetLocation();

    this.industry_disable = 1;
    this.company_disable = 1;
    this.id_vertical.push(parseInt(event.id))
    console.log("id_vertical select=============##########", this.id_vertical)

   /* if(event.checked == true){
    }
    else{
       for(var obj in this.id_vertical){
         if(this.id_vertical[obj] == event.source.value ){
            this.id_vertical.splice(parseInt(obj),1)
         }
       }
    
    }
      */ this.selected = 'verticals_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getVerticalwithData(this.date_range, this.search_data, this.client_id, this.id_vertical)

    // this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype);
  }

  onVerticaldeselect(event) {
    this.table = 4;
    this.location_data = [];
console.log( this.id_vertical)

    for (var obj in this.id_vertical) {
      if (this.id_vertical[obj] == event.id) {
        this.id_vertical.splice(parseInt(obj), 1)
        console.log("id_vertical deselect=============##########", this.id_vertical)
      }
    }


    if (this.id_vertical.length == 0) {
      this.industry_disable = 0;
      this.company_disable = 0;
    }
    this.selected = 'verticals_selected';
    this.getAllUser(this.industry_id, this.company_id, this.client_id, this.id_vertical, this.location_data);
    this.getVerticalwithData(this.date_range, this.search_data, this.client_id, this.id_vertical)

    // this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype);
  }

  onLocationclick(event) {
    this.industry_disable = 1;
    this.company_disable = 1;
    // this.clients_data = [];

    this.table = 4;
    this.location_data.push(parseInt(event.id))
    // console.log("this.location_data=============================", this.location_data)
    /*  if(event.checked == true){
  
  
      }
      else{
         for(var obj in this.location_data){
           if(this.location_data[obj] == event.source.value ){
              this.location_data.splice(parseInt(obj),1)
           }
         }
      
      }*/
    this.selected = 'location_selected';
    this.getAllUser(this.industry_id, this.company_id, this.clients_id, this.id_vertical, this.location_data);
    this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype);
  }

  onLocationdeselect(event) {
    this.table = 4;
    this.clients_data = [];

    for (var obj in this.location_data) {
      if (this.location_data[obj] == event.id) {
        this.location_data.splice(parseInt(obj), 1)
      }
    }
    if (this.id_vertical.length == 0) {
      this.industry_disable = 0;
      this.company_disable = 0;
    }
    this.selected = 'location_selected';
    this.getAllUser(this.industry_id, this.company_id, this.clients_id, this.id_vertical, this.location_data);
    this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype);
  }

  // ===========================================================
  // 
  // Industry
  // 
  // ==========================================================

  getIndustrywithData(search_data, industry_id) {
    this.showloader = true;
    this.v3Service.POST(this.getIndustriesWithData, { id: industry_id.toString(), 
      start: this.pageNumber, length: this.pageSize, token: 'LIVESITE',
      search: search_data }).subscribe(res => {
      this.check = false;
      this.showloader = false;
      this.search_data = '';
      this.common = res
      this.data = this.common.data
      

      
      this.allItems = this.common.recordsTotal;
      // if(this.allItems = 10){
      //   document.getElementById('industryPaginate').classList.add('none')
      // }else{
      //   document.getElementById('industryPaginate').classList.remove('none')
      // }

      console.log('industry', this.allItems)
      this.industry_total = this.allItems
      this.dataSource = this.data;
      this.URL = this.getIndustriesWithData;
      //this.setPage(1,this.date_range,search_data,industry_id,this.company_id,this.client_id,this.id_vertical,this.location_data);
    })
  }



  public handlePage(e: any) {
    // console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.endindex = (this.currentPage + 1) * e.pageSize
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    if (e.length == 0 || e.pageSize == 0) {
      this.endIndex = e.length
    }
    else {
      length = Math.max(e.length, 0);
      this.endIndex = this.startIndex < length ? Math.min(this.startIndex + e.pageSize, length) : this.startIndex + e.pageSize;
    }

    if (this.value != '') {
      // console.log(this.value, this.name)
    }
    else {
      this.iterator();

    }
  }

  private iterator() {
    let part;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true;
    this.v3Service.POST(this.getIndustriesWithData, { id: this.industry_id.toString(),
       start: this.pageNumber, length: this.pageSize, token: 'LIVESITE',
        search: this.search_data }).subscribe(res => {
      this.common = res
      this.allItems = this.common.recordsTotal;
      this.industry_total = this.allItems
      this.showloader = false;
      this.data = this.common.data;
      this.dataSource = this.data;

    })
    this.getIndustrywithData(this.search_data, this.industry_id);

  }


  updateSortingOrderIndustry(sort_column, sort_order) {
    this.showloader = true;
    this.sort_column = sort_column
    this.ASC = sort_order
    // setTimeout (() => {

    this.v3Service.POST(this.getIndustriesWithData, { column: this.sort_column, dir: this.ASC, id: this.industry_id.toString(), start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', search: this.search_data }).subscribe(res => {
      this.showloader = false
      this.common = res
      this.dataSource = this.common.data
    });
    // }, 2000)
  }



  // ===========================================================
  // 
  // End Industry
  // 
  // ==========================================================











  // ===========================================================
                              // COmpany
  // ==========================================================



  getCompanywithData(date_range, search_data, industry_id, company_ids) {
    this.showloader = true

    if (company_ids == '' && industry_id != '') {
      for (var i = 0; i < this.company.length; i++) {
        company_ids.push(this.company[i].id)
      }
    }
    //this.company_id=company_id
    this.v3Service.POST(this.getCompaniesWithData, {
      industries_ids: industry_id.toString(),
      id: company_ids.toString(), 
      start: this.pageNumber, 
      length: this.size, token: 'LIVESITE',
      dateRange: date_range, search: search_data
    }).subscribe(res => {
      this.showloader = false

      this.common = res
      this.date_range = '';
      this.data = this.common.data
    
      this.allItems = this.common.recordsTotal;
      // console.log('company', this.allItems)

      // if(this.allItems < 10){
      //   document.getElementById('companyPaginate').classList.add('none')
      // }else{
      //   document.getElementById('companyPaginate').classList.remove('none')
      // }
      this.dataSource = this.data;
      this.URL = this.getCompaniesWithData;
      this.company_total = this.allItems;
      //this.setPage(1,date_range,search_data,industry_id,company_id,this.client_id,this.id_vertical,this.location_data);
    })
  }

  public handlePage1(e: any) {
    // console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.endindex = (this.currentPage + 1) * e.pageSize
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    if (e.length == 0 || e.pageSize == 0) {
      this.endIndex = e.length
    }
    else {
      length = Math.max(e.length, 0);
      this.endIndex = this.startIndex < length ? Math.min(this.startIndex + e.pageSize, length) : this.startIndex + e.pageSize;
    }

    if (this.value != '') {
      // console.log(this.value, this.name)
    }
    else {
      this.iterator1();

    }
  }

  private iterator1() {
    let part;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true;
    this.v3Service.POST(this.getCompaniesWithData, { industries_ids: this.industry_id.toString(), id: this.company_id.toString(), start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: this.date_range, search: this.search_data }).subscribe(res => {
      this.common = res
      this.allItems = this.common.recordsTotal;
      this.company_total = this.allItems;
      this.showloader = false;
      this.data = this.common.data;
      this.dataSource = this.data;

    })
  }




  updateSortingOrderCompany(sort_column, sort_order) {
    this.showloader = true

    this.sort_column = sort_column
    this.ASC = sort_order
    this.v3Service.POST(this.getCompaniesWithData,
      { column: this.sort_column, dir: this.ASC, industries_ids: this.industry_id.toString(), id: this.company_id.toString(), start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: this.date_range, search: this.search_data }).subscribe(res => {
        this.showloader = false

        this.common = res
        this.dataSource = this.common.data
      });
  }



  // ===========================================================
                        // CLIENT START
  // ==========================================================


  // industry_id;
  getClientwithData(date_range, search_data, client_id, company_ids) {
    // console.log(client_id, company_ids)
    // console.log(client_id, company_ids, this.client)

    var a = []
    this.showloader = true

    // if (client_id == '' && company_ids != '') {
    //   for (var i = 0; i < this.client.length; i++) {
    //     client_id.push(this.client[i].id)
    //   }
    // }

    
    this.v3Service.POST(this.getClientsWithData, {
      id: company_ids.toString(),
      // companies_id: company_ids.toString(),
      // industries_ids: this.industry_id.toString(),
      verticalsIds: this.id_vertical.toString(),
      location: this.location_data.toString(),
      start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: date_range, search: search_data,
    }).subscribe(res => {
      // alert("main api");
      this.showloader = false
      this.common = res;
      // console.log("client data================", this.common)
      this.date_range = '';
      this.data = this.common.data
      this.dataSource = this.data;

      // this.dataSource = new MatTableDataSource(this.data);

      this.allItems = this.common.recordsTotal;
      console.log('client', this.allItems)

      // if(this.allItems < 10){
      //   document.getElementById('clientPaginate').classList.add('none')
      // }else{
      //   document.getElementById('clientPaginate').classList.remove('none')
      // }
      this.client_total = this.allItems;
      // console.log(this.client_total)
      this.URL = this.getClientsWithData;
      //this.setPage(1,date_range,search_data,this.company_id,this.industry_id,client_id,this.id_vertical,this.location_data);
    })
  }

  public handlePage2(e: any) {
    // console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.endindex = (this.currentPage + 1) * e.pageSize
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    if (e.length == 0 || e.pageSize == 0) {
      this.endIndex = e.length
    }
    else {
      length = Math.max(e.length, 0);
      this.endIndex = this.startIndex < length ? Math.min(this.startIndex + e.pageSize, length) : this.startIndex + e.pageSize;
    }

    if (this.value != '') {
      // console.log(this.value, this.name)
    }
    else {
      this.iterator2();

    }
  }

  private iterator2() {
    let part;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true;
    this.v3Service.POST(this.getClientsWithData,
      {
        id: this.client_id.toString(),
        companies_id: this.company_id.toString(),
        verticals_ids: this.client_id.toString(),
        start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: this.date_range, search: this.search_data, location: this.location_id
      }).subscribe(res => {
        this.common = res
        this.allItems = this.common.recordsTotal;
        this.client_total = this.allItems;
        this.showloader = false;
        this.data = this.common.data;
        this.dataSource = this.data;

      })
  }



  updateSortingOrderClient(sort_column, sort_order) {
    this.showloader = true
    this.sort_column = sort_column
    this.ASC = sort_order
    this.v3Service.POST(this.getClientsWithData, { column: this.sort_column, dir: this.ASC,
       id: this.client_id.toString(), verticals_ids: this.client_id.toString(), start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: this.date_range, search: this.search_data, location: this.location_id }).subscribe(res => {
      this.showloader = false
      this.common = res
      // alert("sorting")
      this.dataSource = this.common.data
    });
  }


  // ===========================================================
  //       END OF CLIENT
  // ==========================================================









  // ===========================================================
  //      START OF USER
  // ==========================================================

  getUserwithData(date_range, search_data, id_vertical, location_data, searchtype) {
    this.showloader = true;

    let vid;
    if (id_vertical.length > 0 || location_data.length > 0) {
      //this.clients_data=
      for (var i = this.client.length - 1; i >= 0; i--) {
        this.clients_data.push(this.client[i].id)
      }
    }

    /* if(location_data.length > 0 && this.selected == 'location_selected')
     {
        vid=this.location_id
     }
     else{
       vid=id_vertical
     }
        */
    //  id
    //  clients_ids
    //  verticals
    //  location


    this.v3Service.POST(this.getUsersWithData, {
      // clients_ids: this.clients_data.toString(),
      // verticals: id_vertical.toString(),
      // id: id_vertical.toString(),
      // location: location_data.toString(),
      // start: this.pageNumber, 
      // length: this.pageSize, 

      // id: id_vertical.toString(),
      clients_ids: this.clients_data.toString(),
      verticals: id_vertical.toString(),
      location: location_data.toString(),
      start: this.pageNumber, 
      length: this.pageSize, 
      token: 'LIVESITE',
      dateRange: date_range,
       search_type: searchtype,
        search: search_data,
         status: this.status,
      certificates: this.certificates, 
      course: this.course
    }).subscribe(res => {
      this.showloader = false;

      this.common = res
      // console.log("user data=================", this.common)
      this.date_range = '';
      this.data = this.common.data
    
      this.name = this.data[0]
      this.allItems = this.common.recordsTotal;
      console.log('user', this.allItems)

      // if(this.allItems < 10){
      //   document.getElementById('userPaginate').classList.add('none')
      // }else{
      //   document.getElementById('userPaginate').classList.remove('none')
      // }
      this.user_total = this.allItems;
      // console.log("userTotal==============", this.allItems)
      this.dataSource = this.data;
      this.URL = this.getUsersWithData;
      this.clients_data = []
      //this.setPage(1,date_range,search_data,this.company_id,this.industry_id,this.client_id,id_vertical,location_data);
    })
  }


  public handlePage3(e: any) {
    console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.endindex = (this.currentPage + 1) * e.pageSize
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    if (e.length == 0 || e.pageSize == 0) {
      this.endIndex = e.length
    }
    else {
      length = Math.max(e.length, 0);
      this.endIndex = this.startIndex < length ? Math.min(this.startIndex + e.pageSize, length) : this.startIndex + e.pageSize;
    }

    if (this.value != '') {
      // console.log(this.value, this.name)
    }
    else {
      this.iterator3();

    }
  }

  vid
  private iterator3() {
    let part;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true;

    if (this.id_vertical.length > 0 || this.location_data.length > 0) {
      //this.clients_data=
      for (var i = this.client.length - 1; i >= 0; i--) {
        this.clients_data.push(this.client[i].id)
      }
    }
    if (this.id_vertical.length == 0) {
      this.vid = this.location_id
    }
    else {
      this.vid = this.id_vertical
    }
    this.v3Service.POST(this.getUsersWithData,
      { clients_ids: this.clients_data.toString(), verticals: this.vid.toString(), location: this.location_data.toString(), start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: this.date_range, search: this.search_data, search_type: this.searchtype, status: this.status, certificates: this.certificates, course: this.course }).subscribe(res => {
        this.common = res
        // alert('dev')
        // const matTable= document.getElementById('matTable');
        // console.log('mat-----------------',matTable)
        // matTable.scrollTop = 0;
        this.allItems = this.common.recordsTotal;
        this.user_total = this.allItems;

        this.showloader = false;
        this.data = this.common.data;
        this.dataSource = this.data;
        this.clients_data = []
        
      })
      // this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype);

  }

aa(){
  window.scroll(0,0)
}

  updateSortingOrderUser(sort_column, sort_order) {
    this.showloader = true;
    this.sort_column = sort_column
    this.ASC = sort_order
    this.v3Service.POST(this.getUsersWithData, { column: this.sort_column,
       dir: this.ASC, clients_ids: this.clients_data, 
       verticals: this.vid, location: this.location_data,
        start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: this.date_range, search: this.search_data, search_type: this.searchtype, status: this.status, certificates: this.certificates, course: this.course }).subscribe(res => {
      this.showloader = false;

      this.common = res
      this.dataSource = this.common.data
    });
  }


// ===========================================================
  //      END OF USER
  // ==========================================================

// ===========================================================
  //      STARt OF VERTICAL
  // ==========================================================
  getVerticalwithData(date_range, search_data, client_id, id_vertical) {
    // client_ids
    console.log("vertical data==================", client_id, id_vertical)
    this.showloader = true
    this.v3Service.POST(this.getVerticalsWithData, {
      clients_ids: client_id.toString(),
      id: id_vertical.toString(),
      start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: date_range, search: search_data
    }).subscribe(res => {
      this.showloader = false
      this.common = res
 
      this.data = this.common.data


      this.allItems = this.common.recordsTotal;
      console.log('vertical total records', this.allItems)

      // if(this.allItems < 10){
      //   document.getElementById('verticalPaginate').classList.add('none')
      // }else{
      //   document.getElementById('verticalPaginate').classList.remove('none')
      // }
      this.vertical_total = this.allItems;

      this.dataSource = this.data;
      this.URL = this.getVerticalsWithData;
      //this.setPage(1,date_range,search_data);
    })
  }

  public handlePage4(e: any) {
    // console.log(e)
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.endindex = (this.currentPage + 1) * e.pageSize
    this.startIndex = (this.currentPage * e.pageSize) + 1;
    if (e.length == 0 || e.pageSize == 0) {
      this.endIndex = e.length
    }
    else {
      length = Math.max(e.length, 0);
      this.endIndex = this.startIndex < length ? Math.min(this.startIndex + e.pageSize, length) : this.startIndex + e.pageSize;
    }

    if (this.value != '') {
      // console.log(this.value, this.name)
    }
    else {
      this.iterator4();

    }
  }

  private iterator4() {
    let part, vid;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.pageNumber = start
    this.showloader = true;

    this.v3Service.POST(this.getVerticalsWithData,
      {
        start: this.pageNumber, length: this.pageSize, token: 'LIVESITE',
        dateRange: this.date_range, search: this.search_data
      }).subscribe(res => {
        this.common = res
        // console.log("vertical ######################", this.common)

        this.allItems = this.common.recordsTotal;
        this.vertical_total = this.allItems;

        this.showloader = false;
        this.data = this.common.data;
        this.dataSource = this.data;

      })
  }



  updateSortingOrderVertical(sort_column, sort_order) {
    this.showloader = true
    this.sort_column = sort_column
    this.ASC = sort_order
    this.v3Service.POST(this.getVerticalsWithData, { column: this.sort_column, dir: this.ASC, start: this.pageNumber, length: this.pageSize, token: 'LIVESITE', dateRange: this.date_range, search: this.search_data }).subscribe(res => {
      this.showloader = false

      this.common = res
      this.dataSource = this.common.data
    });
  }


  // ===========================================================
  //      END OF VERTICAL
  // ==========================================================











  getUserGraph(date_range, client_id, vertical_id, location_data) {
    this.showloader = true
    this.v3Service.POST(this.getUserGraphData, { clients_ids: client_id.toString(), verticals_ids: vertical_id.toString(), location: location_data.toString(), token: 'LIVESITE', dateRange: date_range }).subscribe(res => {
      this.common = res
      // console.log(  this.common)
      this.showloader = false

    
        this.date_range = '';
        this.vertical_id = [];
        this.clients_id = [];
        // console.log("this.common.labelName=======>", this.common.labelName)
  
  
        this.graph.users.xAxis.categories = this.common.labelName;
        this.usergraph_total = this.common.total_users;
        //this.graph.users.title.text= this.graph.users.title.text + " " +  this.common.total_users
        this.graph.users.series[0].data = this.common.data
        // console.log("user graph==========", this.common.data)
        Highcharts.chart('users', this.graph.users);
     
  



    })
  }

  getDownloadGraph(date_range, client_id, vertical_id, location_data) {
    this.showloader = true
    this.v3Service.POST(this.getDownloadsGraphData, { clients_ids: client_id.toString(),
       verticals_ids: vertical_id.toString(),
        location: location_data.toString(), 
        token: 'LIVESITE', dateRange: date_range }).subscribe(res => {
      this.common = res;
      console.log( this.common,"========================================")
      this.showloader = false

      // if(this.common){
      //   setTimeout(function(){
      //     this.showloader = false

      //   },13000);
    
      // }
        this.vertical_id = [];
        this.clients_id = [];
        this.graph.downloads.xAxis.categories = this.common.labelName;
        this.totaldownloadgraph = this.common.totalDownloads;
        //this.graph.downloads.title.text= this.graph.downloads.title.text + " " +  this.common.totalDownloads;
        this.graph.downloads.plotOptions.series.label = this.common.labelName;
        this.graph.downloads.series[0].data = this.common.certData;
        this.graph.downloads.series[1].data = this.common.workData;
        this.graph.downloads.series[2].data = this.common.spredData;
        
        this.certificate = this.common.total_cert;
        this.workbook = this.common.total_work;
        this.tool = this.common.total_spred;
        Highcharts.chart('download', this.graph.downloads);
        
      })
  }


  getVideoGraph(date_range, client_id, vertical_id, location_data) {
    //   if ((document.getElementById('vedio').innerHTML == 'Highcharts.com') ) {
    // }
    // document.getElementById('vedio').style.display = "none";
    this.v3Service.POST(this.getVideoViewsGraphData, { clients_ids: client_id.toString(), verticals_ids: vertical_id.toString(), location: location_data.toString(), token: 'LIVESITE', dateRange: date_range }).subscribe(res => {
      // console.log(res)
      this.common = res
      this.vertical_id = [];
      this.clients_id = [];
      this.graph.video.xAxis.categories = this.common.labelName;
      this.totalvideograph = this.common.total_users;
      //this.graph.video.title.text= this.graph.video.title.text + " " +  this.common.total_users
      this.graph.video.series[0].data = this.common.data
      this.graph.video.series[0].data = this.common.data
      Highcharts.chart('video', this.graph.video);


    })

  }



  getCertificateGraph(date_range, client_id, vertical_id, location_data) {
    this.showloader = true
    this.v3Service.POST(this.getCertificationGraphData, { clients_ids: client_id.toString(), verticals_ids: vertical_id.toString(), location: location_data.toString(), token: 'LIVESITE', dateRange: date_range }).subscribe(res => {
      this.common = res
      this.showloader = false

      // console.log(this.common)
      this.vertical_id = [];
      this.clients_id = [];
      this.graph.certificate.xAxis.categories = this.common.labelName;

      this.totalcertificategraph = this.common.total_certified_users;
      this.totalpendinggraph = this.common.total_pending_users;
      //this.graph.certificate.title.text= this.graph.certificate.title.text + " " +  this.common.total_certified_users+"/"+this.common.total_pending_users
      this.graph.certificate.series[0].data = this.common.pending_users;
      this.graph.certificate.series[1].data = this.common.certified_users;

      this.downloaded = this.common.total_certified_users;
      this.download_pending = this.common.total_pending_users;
      Highcharts.chart('certificate', this.graph.certificate), {






      };

    })
  }

  getCompletionGraph(date_range, client_id, vertical_id, location_data) {
    this.showloader = true
    this.v3Service.POST(this.getCompletionGraphData, { clients_ids: client_id.toString(), verticals_ids: vertical_id.toString(), location: location_data.toString(), token: 'LIVESITE', dateRange: date_range }).subscribe(res => {
      this.common = res
      this.showloader = false

      this.vertical_id = [];
      this.clients_id = [];
      this.graph.completion.xAxis.categories = this.common.labelName;
      //this.totalcompletiongraph=this.common.totalCompletedUsers1+"/"+this.common.totalCompletedUsers+"/"+this.common.totalProgressUsers+"/"+this.common.totalNotStartedUsers
      //this.graph.completion.title.text= this.graph.completion.title.text + " " +  this.common.totalCompletedUsers1+"/"+this.common.totalCompletedUsers+"/"+this.common.totalProgressUsers+"/"+this.common.totalNotStartedUsers







      this.graph.completion.series[0].data = this.common.notStartedUsers;
      this.graph.completion.series[1].data = this.common.progressUsers;
      this.graph.completion.series[2].data = this.common.completedUsers;
      this.graph.completion.series[3].data = this.common.completedUsers1;


      this.notstarted = this.common.totalNotStartedUsers;
      this.fullCourse = this.common.totalCompletedUsers1;
      this.mandatory = this.common.totalCompletedUsers;
      this.pending = this.common.totalProgressUsers;

      Highcharts.chart('completion', this.graph.completion);
    })
  }

  getAccessGraph(date_range, client_id, vertical_id, location_data) {
    this.showloader = true
    this.v3Service.POST(this.getAccessCodeGraphData, { clients_ids: client_id.toString(), verticals_ids: vertical_id.toString(), location: location_data.toString(), token: 'LIVESITE', dateRange: date_range }).subscribe(res => {
      this.common = res
      this.showloader = false
      this.vertical_id = [];
      this.clients_id = [];
      this.graph.access_code.xAxis.categories = this.common.labelName;
      this.totalaccessgraph = this.common.total_used + "/" + this.common.total_unused
      //this.graph.access_code.title.text= this.graph.access_code.title.text + " " +  this.common.total_used+"/"+this.common.total_unused
      this.graph.access_code.series[0].data = this.common.unused;
      this.graph.access_code.series[1].data = this.common.used;

      this.unused = this.common.total_unused;
      this.used = this.common.total_used;
      Highcharts.chart('access', this.graph.access_code);

    })
  }



  dataGraph;
  name0: string; name1: string; name2: string
  names: any = []
  data0; data1; data2;
  names0 = []
  names1 = []
  names2 = []

  getComparisionGraph(date_range, client_id, vertical_id, location_data, company_id, data_selected) {
    this.showloader = true

    // console.log("date range======", date_range, "data_selected=======", data_selected)
    var company_ids = [];
    if (this.industry_id.length == 0 && this.selected == 'industries_selected') {
      company_ids = [];
      client_id = '',
        vertical_id = ''
    }
    else if (company_id == '' && this.selected == 'industries_selected') {
      if (this.company_id.length == 0 && this.selected == 'industries_selected') {
        for (var i = 0; i < this.company.length; i++) {
          company_ids.push(this.company[i].id)
        }
      }
    }
    else if (this.company_id.length == 0 && this.selected == 'companies_selected') {
      company_ids = [];
      client_id = '',
        vertical_id = ''
    }

    else if (this.clients_id.length != 0 && this.selected == 'clients_selected') {
      for (var i = 0; i < this.company.length; i++) {
        company_ids.push(this.company[i].id)
      }
    }

    else if (this.id_vertical.length != 0 && this.selected == 'verticals_selected') {
      for (var i = 0; i < this.company.length; i++) {
        company_ids.push(this.company[i].id)
      }
    }

    else if (this.location_data.length != 0 && this.selected == 'location_selected') {
      for (var i = 0; i < this.company.length; i++) {
        company_ids.push(this.company[i].id)
      }
    }


    else {
      company_ids = company_id
    }
    this.showloader = true
    this.v3Service.POST(this.getComparisonGraphData,
      {
        industries_ids: this.industry_id.toString(), companies_ids: company_ids.toString(),
        dataSelected: data_selected, clients_ids: client_id.toString(),
        verticals_ids: vertical_id.toString(),
        location: location_data.toString(), token: 'LIVESITE', dateRange: date_range
      }).subscribe(res => {
        this.common = res
        this.showloader = false

        // console.log("gfdgdfgdfgdfgdfgdfgdfgdfgdfgdfgdf", this.common)




        this.name1 = this.common.data[1].name
        this.name0 = this.common.data[0].name

        this.data1 = this.common.data[1].data
        this.data0 = this.common.data[0].data
        // console.log(this.name1, this.name0, this.data1,
        // this.data0)
        if (data_selected == 'total_course_completions') {
          // this.user_status = 'false';

          this.fullCourseChart()
          this.mandatory_2018 = this.common.data[0].name
          this.full_2018 = this.common.data[1].name
          this.mandatory_2019 = this.common.data[2].name
          this.full_2019 = this.common.data[3].name


        }
        else {
          this.user_status = 'true';

          // console.log("comparision", this.common)
          this.comparision_data = this.common.data
          // console.log(this.comparision_data)
          // this.pyear = this.comparision_data[0].name;
          // this.year = this.comparision_data[1].name;
          // this.Average = this.comparision_data[2].name;
          this.vertical_id = [];
          this.clients_id = [];

          // this.pyear = this.comparision_data.name;
          // this.year =  this.comparision_data.name;
          //this.graph.comparision.title.text= this.graph.access_code.comparision.text + " " +  this.common.total_used+"/"+this.common.total_unused

          /*  this.dataSelect =2;
                this.graph.comparision_course.plotOptions.column=this.common.dataStackTye
                this.comparisiongraph_total=this.common.total_users;
               this.graph.comparision_course.series=this.common.data;
               Highcharts.chart('comparison_course',this.graph.comparision_course);*/

          this.dataSelect = 1;
          this.graph.comparision.plotOptions.column = this.common.dataStackTye
          this.comparisiongraph_total = this.common.total_users;
          // this.graph.comparision.series = this.common.data;
          // console.log(this.common.data, this.common.dataStackTye)

          this.name0 = this.common.data[0].name ? this.common.data[0].name : '';
          this.name1 = this.common.data[1].name ? this.common.data[1].name : '';
          this.name2 = this.common.data[2].name ? this.common.data[2].name : '';
          // console.log(this.name0, this.name1, this.name2),


          this.data0 = this.common.data[0].data;
          this.data1 = this.common.data[1].data;
          this.data2 = this.common.data[2].data;
          // console.log("2019=================", this.data0, "2020==========", this.data1, "Avrage=================", this.data2)

          // this.graph.comparision = this.common.data;
          // this.graph.myMethod( this.common.data);
          // Highcharts.chart('comparision', this.graph.comparision);
          this.comparisionChart()
        }
      })
  }


  comparisionChart() {
    this.showloader = false
    // console.log("gfdsgdfgdfg===========")
    // if (this.chart) {
    //   this.chart.destroy()
    // }
    this.options = ({

      chart: {
        height: 300, zoomType: 'x', type: 'column',
        //   resetZoomButton: { position: { x: 0, y: -30 }
        resetZoomButton: {
          position: {
            // align: 'right', // by default
            // verticalAlign: 'top', // by default
            x: -10,
            y: 10
          },
          // relativeTo: 'chart'
        }
        //  } 
      },

      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: true
      },

      plotOptions: {
        series: {
          stacking: 'normal'
        },
        // column:this.common.dataStackTye
      },

      //   tooltip: {
      //     pointFormat: 'name: <b>{point.y:.1f}</b>'
      // },
      tooltip: {
        pointFormat: '<span style="display: inline-block; width: 90px;"><span style="color:{series.color};float: left;">{series.name}</span>: <span style="float: left;"><b>{point.y}</b></span><br/></span>',
        shared: true
      },
      series: [
        {
          //avrage
          name: this.name2,
          color: "rgb(124,181,236)",
          enableMouseTracking: true,
          type: "spline",
          data: this.data2

        },
        {
          //2020
          name: this.name1,
          color: "black",
          enableMouseTracking: true,
          type: 'column',
          // data: [this.data1]
          data: this.data1


        },
        {
          // 2019
          name: this.name0,
          color: "#90ed7d",
          enableMouseTracking: true,
          type: 'column',
          data: this.data0

        },
      ]
    });
    let comparisiongraph = new Chart(this.options);
    this.comparisiongraph = comparisiongraph;
  }


  fullCourseChart() {
    this.options = ({

      chart: {
        height: 300, zoomType: 'x', type: 'column',
        // resetZoomButton: { position: { x: 0, y: -30 } } },
        resetZoomButton: {
          position: {
            // align: 'right', // by default
            // verticalAlign: 'top', // by default
            x: -10,
            y: 10
          },
          // relativeTo: 'chart'
        },
      },
      credits: {
        enabled: false
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        enabled: true
      },

      plotOptions: {
        series: {
          stacking: 'normal'
        },
      },


      tooltip: {
        pointFormat: '<span style="display: inline-block; width: 90px;"><span style="color:{series.color};float: left;">{series.name}</span>: <span style="float: left;"><b>{point.y}</b></span><br/></span>',
        shared: true
      },
      series: [

        {
          //2020
          name: this.name1,
          color: "black",
          enableMouseTracking: true,
          type: 'column',
          // data: [this.data1]
          data: this.data1


        },
        {
          // 2019
          name: this.name0,
          color: "#90ed7d",
          enableMouseTracking: true,
          type: 'column',
          data: this.data0

        },
      ]
    });
    let comparisiongraph = new Chart(this.options);
    this.comparisiongraph = comparisiongraph;
  }

















  tab
  getData(value) {
    // console.log("get id user==========", value)
    this.table = value;

    if (this.table == 1) {
      this.tab = 'tab1';

      this.getIndustrywithData(this.search_data, this.industry_id);
    }
    else if (this.table == 2) {
      this.tab = 'tab2';

      this.getCompanywithData(this.date_range, this.search_data, this.industry_id, this.company_id);
    }
    else if (this.table == 3) {
      this.tab = 'tab3';

      this.getClientwithData(this.date_range, this.search_data, this.company_id, this.client_id);
    }
    else if (this.table == 4) {
      this.tab = 'tab4';

      this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype);
    }
    else if (this.table == 5) {
      this.tab = 'tab5';

      this.getVerticalwithData(this.date_range, this.search_data, this.client_id, this.id_vertical);
    }
    else if (this.table == 6) {
      this.tab = 'tab6';

    }
  }


  datesUpdated(value, type) {
    // console.log(value, type)
    if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'company') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" +
        this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getCompanywithData(this.date_range, this.search_data, this.industry_id, this.company_id)
    }
    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'client') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" +
        this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getClientwithData(this.date_range, this.search_data, this.company_id, this.client_id)
    }
    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'user') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype)
    }
    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'vertical') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" +
        this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getVerticalwithData(this.date_range, this.search_data, this.clients_id, this.id_vertical)
      // this.location_data
    }

    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'usergraph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data)
    }

    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'comparisiongraph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data, this.company_id, this.dataselected)
    }
    // else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'usergraph') {
    //   this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
    //   this.getUserGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data)
    // }

    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'downloadgraph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getDownloadGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data)
    }

    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'videograph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getVideoGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data)
    }

    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'claimedgraph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getCertificateGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data)
    }

    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'coursegraph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getCompletionGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data)
    }
    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'accessgraph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getAccessGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data)
    }
    else if (this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") != null && type == 'surveychartGraph') {

      this.date_range = this.datePipe.transform(value.startDate, "yyyy-MM-dd 00-00-00") + "_" + this.datePipe.transform(value.endDate, "yyyy-MM-dd HH-mm-ss")
      this.getSurveyChartGraph(this.select_grade, this.select_client, this.date_range)
    }
  }

  Search(value, type) {
    if (this.search_data != value) {
      this.currentPage = 0;
    }
    if (type == 'industry') {
      this.search_data = value;
      this.getIndustrywithData(this.search_data, this.industry_id)
    }
    else if (type == 'company') {
      this.search_data = value;
      this.getCompanywithData(this.date_range, this.search_data, this.industry_id, this.company_id)
    }

    else if (type == 'client') {
      this.search_data = value;
      this.getClientwithData(this.date_range, this.search_data, this.company_id, this.client_id)
    }

    else if (type == 'user') {
      this.search_data = value;
      this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype)
    }

    else if (type == 'vertical') {
      this.search_data = value;
      this.getVerticalwithData(this.date_range, this.search_data, this.client_id, this.id_vertical)
    }
  }

  searchType(value) {
    if (value == 'status') {
      this.select_box = 2;
    }
    else if (value == 'course') {
      this.select_box = 3;
    }
    else if (value == 'certificates') {
      this.select_box = 4;
    }
    else if (value == 'name') {
      this.select_box = 1;
    }
    else if (value == 'email') {
      this.select_box = 1;
    }
    else if (value == 'access_code') {
      this.select_box = 1;
    }
    this.searchtype = value
    this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype)
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.check = true;
  }

  comparision_type(value) {

    for (var i = this.client.length - 1; i >= 0; i--) {
      this.clients_id.push(this.client[i].id)
    }
    for (var i = this.vertical.length - 1; i >= 0; i--) {
      this.vertical_id.push(this.vertical[i].id)
    }
    this.dataselected = value;
    this.getComparisionGraph(this.date_range, this.clients_id, this.vertical_id, this.location_data, this.company_id, this.dataselected)
  }

  Status(value) {
    this.status = value;
    this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype)
  }
  Course(value) {
    this.course = value;
    this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype)
  }
  Certificate(value) {
    this.certificates = value;
    this.getUserwithData(this.date_range, this.search_data, this.id_vertical, this.location_data, this.searchtype)
  }


  openDialog(): void {
  //   const dialogRef = this.dialog.open(UserDetailComponent, {
  //     width: '99%',
  //     height: '99%',
  //     // data: id,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
    
  //   });
  }

}

//////////////////////////////////////////////////////////////////////////////




// setPage(page: number, date_range, search_data, industry_id, company_id, client_id, id_vertical, location_data) {
//   let id, cid, vid;
//   if (company_id.length != 0) {
//     id = company_id;
//   }
//   else if (company_id.length == 0) {
//     id = industry_id
//   }
//   else if (company_id.length == 0 && industry_id.length == 0) {
//     id = client_id;
//   }

//   if (client_id.length == 0 && id_vertical.length != 0) {
//     cid = this.clients_data.toString();
//   }
//   else if (client_id.length != 0) {
//     cid = client_id.toString();
//   }


//   if (id_vertical.length == 0) {
//     vid = this.location_id
//   }
//   else {
//     vid = id_vertical
//   }
//   this.showloader = true;
//   this.pager = this.pagerService.getPager(this.allItems, page, this.size);
//   this.start = this.pager.startIndex + 1;
//   this.end = this.pager.endIndex + 1;
//   this.pageNumber = this.pager.startIndex;

//   this.v3Service.POST(this.URL, { id: id.toString(), industries_ids: industry_id.toString(), verticals_ids: cid, clients_ids: cid, verticals: vid.toString(), location: location_data.toString(), start: this.pageNumber, length: this.size, token: 'LIVESITE', dateRange: date_range, search: search_data, dataSelected: '' })
//     .subscribe(res => {
//       this.showloader = false;
//       this.common = res
//       this.search_data = ''
//       //this.allItems = this.common.recordsTotal;
//       this.rows = this.common.data
//       this.data = this.rows.slice(0, this.size);
//       this.dataSource.data = this.data;

//     });

// }













///////////////////////////////////////////////////////////////////////////




/*    toggleSidebarFolded()
  {
     alert("hi")
      console.log(this._fuseSidebarService.getSidebar('navbar'))
      this._fuseSidebarService.getSidebar('navbar').close();
        this._router.events
          .pipe(
              filter((event) => event instanceof NavigationEnd),
              takeUntil(this._unsubscribeAll)
          )
          .subscribe(() => {
            alert("hi")
                  if ( this._fuseSidebarService.getSidebar('navbar') )
                  {
                      this._fuseSidebarService.getSidebar('navbar').close();
                  }
              }
          );
  }
*/











// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }

  // ===========================================================================================================

  //  client with data

  // ===========================================================================================================

  // sortData(sort: Sort) {
  //   console.log(sort)
  //   const data = this.sortedData.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'total_user': return compare(a.total_user, b.total_user, isAsc);
  //       case 'total_client': return compare(a.total_client, b.total_client, isAsc);
  //       case 'total_company': return compare(a.total_company, b.total_company, isAsc);

  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'industry': return compare(a.industry, b.industry, isAsc);
  //       case 'company': return compare(a.company, b.company, isAsc);
  //       case 'vertical': return compare(a.vertical, b.vertical, isAsc);
  //       case 'user': return compare(a.user, b.user, isAsc);
  //       case 'status': return compare(a.status, b.status, isAsc);
  //       case 'register': return compare(a.register, b.register, isAsc);



  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'email': return compare(a.email, b.email, isAsc);
  //       case 'vedio': return compare(a.vedio, b.vedio, isAsc);
  //       case 'cloud': return compare(a.cloud, b.cloud, isAsc);
  //       case 'certificate': return compare(a.certificate, b.certificate, isAsc);
  //       case 'progress': return compare(a.progress, b.progress, isAsc);
  //       case 'percent': return compare(a.percent, b.percent, isAsc);
  //       case 'status': return compare(a.status, b.status, isAsc);
  //       case 'register': return compare(a.register, b.register, isAsc);



  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'total_vedio': return compare(a.total_vedio, b.total_vedio, isAsc);
  //       case 'total_quiz': return compare(a.total_quiz, b.total_quiz, isAsc);
  //       case 'total_question': return compare(a.total_question, b.total_question, isAsc);
  //       case 'create_date': return compare(a.create_date, b.create_date, isAsc);





  //       default: return 0;
  //     }
  //   });
  // }

 // chartOptions = {
  //   credits: {
  //     enabled: false
  //   },
  // };

    // this._router.events
    // .pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     takeUntil(this._unsubscribeAll)
    // )
    // .subscribe(() => {
    //     if (this._fuseSidebarService.getSidebar('navbar')) {
    //         this._fuseSidebarService.getSidebar('navbar').close();
    //     }
    // }
    // );


    // this.getToggle = this._fuseSidebarService.getSidebar('navbar');
    // console.log("getToggle===============#############",this.getToggle)
    //   this.matSelect.valueChange.subscribe(value => {
    //     console.log(value);
    // });
    // this.dataSource.sort = this.sort;
    // document.getElementById('vedio').style.display = "none";






  // var d = new Date(2012, 7, 25);
  // d.setFullYear(d.getFullYear() - 1);
  // records: Array<any>;
  // isDesc: boolean = false;
  // column: string = 'CategoryName';
  // sort(property) {
    //   this.isDesc = !this.isDesc; //change the direction    
    //   this.column = property;
    //   let direction = this.isDesc ? 1 : -1;

    //   this.records.sort(function (a, b) {
      //     if (a[property] < b[property]) {
        //       return -1 * direction;
        //     }
        //     else if (a[property] > b[property]) {
          //       return 1 * direction;
          //     }
          //     else {
            //       return 0;
            //     }
            //   });
            // };
            // public today: Date = new Date(new Date().toDateString());
            // public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
            // public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
            //     - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString())
            //     ;
            // public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
            // public monthEnd: Date = this.today;
            // public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
            // public lastEnd: Date = this.today;
            // public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
            // public yearEnd: Date = this.today;


            // ranges: any = {
              // //  this.today= new Date(new Date().toDateString());

              // }

              // openSnackBar(message: string, action: string) {
                // if (this.search_status_value == '' ) {
                //   this._snackBar.open('Nothing to clear.', 'Warning', {
                //     duration: 2000,
                //   });
                // } else {
                //   this._snackBar.open(message, action, {
                //     duration: 2000,
                //   });
                // }
              // }