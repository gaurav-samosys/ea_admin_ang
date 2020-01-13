import { Component, OnInit } from '@angular/core';
import * as myGlobals from '../../../../global';
import { ReportServiceService } from './report-service.service';
import { DatePipe } from '@angular/common';
// import moment from 'moment';
import * as moment from 'moment';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// declare var moment: any

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  selected = ''
  data: any
  reportForm: FormGroup
  downloadUserReport = myGlobals.downloadUserReport
  getCompanyList = myGlobals.getCompanyList
  selected1 = { startDate: moment, endDate: moment };
  constructor(
    private toastr: ToastrService,
    public fb: FormBuilder,
    public report_Service: ReportServiceService
  ) {
    this.reportForm = this.fb.group({
      client_id: '',
      dateRange: new FormControl('date')
    })
  }

  ngOnInit() {
    var date = new Date();
    console.log(date)
    this.getReportListWithClient();
  }
  companyListArray = []
  getReportListWithClient() {
    this.report_Service.POST(this.getCompanyList, { token: 'LIVESITE' }).subscribe(res => {
      this.companyListArray = res['data']
      if (res['success'] == true) {
        this.companyListArray = res['data']

      }
    })
  }
  client_id
  onSelection(value) {
    console.log(value)
    this.client_id = value
  }
  startDate1
  endDate1
  dateRange
  datesUpdated(value) {
    console.log(value['startDate']['_d'], value['endDate']['_d'])
    var startDate = value['startDate']['_d']
    var endDate = value['endDate']['_d']
    this.startDate1 = moment(startDate).format('MM/DD/YYYY');
    console.log(this.startDate1)
    this.endDate1 = moment(endDate).format('MM/DD/YYYY');
    console.log(this.endDate1)
    this.dateRange = this.startDate1 + '-' + this.endDate1

  }
  downloadReport() {
    this.report_Service.POST(this.downloadUserReport, {
      token: 'LIVESITE',
      client_report: this.client_id, date_range: this.dateRange
    }).subscribe(res => {
      console.log(res)
      this.data = res['data']
      console.log(this.data)
      if (res['success'] == true) {
        this.toastr.success('Report Download Successfully');
        this.report_Service.downloadFile(this.data, 'jsontocsv');

      } else {
        this.toastr.warning('No Data Found');
      }
    })


  }
}



    // let fileName = 'myCustomerList.csv';
    // let columnNames = ["client_id", "startDate", "endDate"];
    // let header = columnNames.join(',');

    // let csv = header;
    // csv += '\r\n';

    // this.data.map(c => {
    //   csv += [c["client_id"], c["startDate"], c["endDate"]].join(',');
    //   csv += '\r\n';
    // })

    // var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // var link = document.createElement("a");
    // if (link.download !== undefined) {
    //   var url = URL.createObjectURL(blob);
    //   link.setAttribute("href", url);
    //   link.setAttribute("download", fileName);
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }



