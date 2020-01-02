import { Component, OnInit } from '@angular/core';
import * as myGlobals from '../../../../global';

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
  selected=''
  downloadUserReport=myGlobals.downloadUserReport
  constructor() { }
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  ngOnInit() {
  }
  downloadReport(){
    
  }
}
