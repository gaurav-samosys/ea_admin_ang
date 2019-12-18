import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { ManagecolorService } from './managecolor.service';
import * as myGlobals from '../../../../global';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-manage-color',
  templateUrl: './manage-color.component.html',
  styleUrls: ['./manage-color.component.scss']
})
export class ManageColorComponent implements OnInit {
  common: any;
  country: any;
  colorForm: any;
  company_name="";
  @ViewChild('manageInput', { static: true }) manageInput: ElementRef;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  select_client = new FormControl();
  filteredArray: Observable<string[]>;
  dataArray: any = [];
  clientArray;
  allData: any = []

 

  constructor(private http: HttpClient, public service: ManagecolorService, private rt: Router, public _formBuilder: FormBuilder) {
    this.filteredArray = this.select_client.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : this.allData.slice()));
  }

  ngOnInit() {
    this.getClient();
  }


  add(event: MatChipInputEvent): void {
    debugger
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.dataArray.push({
        id: Math.random(),
        company_name: value.trim()
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.select_client.setValue(null);
  }

  remove(item, indx): void {
    this.dataArray.splice(indx, 1);
  }
  ids;
  idsArray = []
  selected(event: MatAutocompleteSelectedEvent): void {
    this.ids = event.option.id
    console.log(this.ids)
    this.idsArray.push(this.ids)
    this.dataArray.push(event.option.value);
    this.manageInput.nativeElement.value = '';
    this.select_client.setValue(null);
  }

  private _filter(value: any): any[] {
    return this.allData.filter(item => item.company_name.toLowerCase().includes(value.tostring().toLowerCase()));
  }




  getClient() {
    this.http.get('http://192.168.0.40/enrichedacademy_live/api/admin/client_color2?token=LIVESITE').subscribe(res => {
      console.log(res)
      this.common = res
      this.clientArray = this.common.data;
      this.allData = this.clientArray
      console.log(this.allData)
    })
  }
  saveColor() {
    console.log(this.colorForm.value)
  }


  color = '#753434';

  prim
  color1 = '#753434';
  // primChange(color: string) {
  //   this.color1 = color;
  //   this.prim = this.color1
  //   console.log(this.prim)
  // }
  color2 = '#6e946a';
  sec
  // secChange(color: string) {
  //   this.color2 = color;
  //   this.sec = this.color2

  // }
  color3 = '#ff0000'
  ternary
  // ternChange(color: string) {
  //   this.color3 = color;
  //   this.ternary = this.color3
  //   console.log(this.ternary)
  // }

  type = "save Detail"
  SaveDetail() {
    this.prim = document.getElementById('demo1').getAttribute("ng-reflect-color");
    this.sec = document.getElementById('demo2').getAttribute("ng-reflect-color");
    this.ternary = document.getElementById('demo3').getAttribute("ng-reflect-color");
    console.log('=a=', this.prim)
    console.log('=b=', this.sec)
    console.log('=c=', this.ternary)
   

    if (this.ids == null && this.ids == undefined) {
      Swal.fire({
        title: 'Warning',
        text: 'Please select client code',
        icon: 'warning',

      })
    } else {
      this.service.Post('http://192.168.0.40/enrichedacademy_live/api/admin/save_client_color_v2', {
        type: this.type, client: this.idsArray, token: 'LIVESITE', primary_color: this.prim,
        secondary_color: this.sec, another_color: this.ternary
      }).subscribe(res => {
        console.log(res)
      })

      Swal.fire({
        title: 'Success',
        text: 'Website theme update successfully',
        icon: 'success'

      })

    }

  }

  type1="set theme for mobile App"
  setThemeSubmit() {

    this.prim = document.getElementById('demo1').getAttribute("ng-reflect-color");
    this.sec = document.getElementById('demo2').getAttribute("ng-reflect-color");
    this.ternary = document.getElementById('demo3').getAttribute("ng-reflect-color");
    console.log('=a=', this.prim)
    console.log('=b=', this.sec)
    console.log('=c=', this.ternary)
   

    if (this.ids == null && this.ids == undefined) {
      Swal.fire({
        title: 'Warning',
        text: 'Please select client code',
        icon: 'warning',

      })
    } else {
      this.service.Post('http://192.168.0.40/enrichedacademy_live/api/admin/save_client_color_v2', {
        type: this.type1, client: this.idsArray, token: 'LIVESITE', primary_color: this.prim,
        secondary_color: this.sec, another_color: this.ternary
      }).subscribe(res => {
        console.log(res)
      })
      Swal.fire({
        title: 'Success',
        text: 'Website theme update successfully',
        icon: 'success'
      })
    }
  }
}

// let item = {
  // type: this.type, client: this.idsArray, token: 'LIVESITE', primary_color: this.prim,
  // secondary_color: this.sec, another_color: this.ternary
// }
// console.log(item)