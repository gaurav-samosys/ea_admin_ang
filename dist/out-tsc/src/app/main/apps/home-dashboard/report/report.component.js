import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as myGlobals from '../../../../global';
import { ReportServiceService } from './report-service.service';
// import moment from 'moment';
import * as moment from 'moment';
import { FormControl, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// declare var moment: any
// export interface Food {
//   value: string;
//   viewValue: string;
// }
let ReportComponent = class ReportComponent {
    constructor(toastr, fb, report_Service) {
        this.toastr = toastr;
        this.fb = fb;
        this.report_Service = report_Service;
        this.selected = '';
        this.downloadUserReport = myGlobals.downloadUserReport;
        this.getCompanyList = myGlobals.getCompanyList;
        this.selected1 = { startDate: moment, endDate: moment };
        this.companyListArray = [];
        this.reportForm = this.fb.group({
            client_id: '',
            dateRange: new FormControl('date')
        });
    }
    ngOnInit() {
        var date = new Date();
        console.log(date);
        this.getReportListWithClient();
    }
    getReportListWithClient() {
        this.report_Service.POST(this.getCompanyList, { token: 'LIVESITE' }).subscribe(res => {
            this.companyListArray = res['data'];
            if (res['success'] == true) {
                this.companyListArray = res['data'];
            }
        });
    }
    onSelection(value) {
        console.log(value);
        this.client_id = value;
    }
    datesUpdated(value) {
        console.log(value['startDate']['_d'], value['endDate']['_d']);
        var startDate = value['startDate']['_d'];
        var endDate = value['endDate']['_d'];
        this.startDate1 = moment(startDate).format('MM/DD/YYYY');
        console.log(this.startDate1);
        this.endDate1 = moment(endDate).format('MM/DD/YYYY');
        console.log(this.endDate1);
        this.dateRange = this.startDate1 + '-' + this.endDate1;
    }
    downloadReport() {
        this.report_Service.POST(this.downloadUserReport, {
            token: 'LIVESITE',
            client_report: this.client_id, date_range: this.dateRange
        }).subscribe(res => {
            console.log(res);
            this.data = res['data'];
            console.log(this.data);
            if (res['success'] == true) {
                this.toastr.success('Report Download Successfully');
                this.report_Service.downloadFile(this.data, 'jsontocsv');
            }
            else {
                this.toastr.warning('No Data Found');
            }
        });
    }
};
ReportComponent = tslib_1.__decorate([
    Component({
        selector: 'app-report',
        templateUrl: './report.component.html',
        styleUrls: ['./report.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ToastrService,
        FormBuilder,
        ReportServiceService])
], ReportComponent);
export { ReportComponent };
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
//# sourceMappingURL=report.component.js.map