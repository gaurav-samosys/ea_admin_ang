import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import * as myGlobals from '../../../../global';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { map, startWith } from 'rxjs/operators';
// import swal from 'sweetalert';
import { MobilecolorService } from './mobilecolor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mobile-color',
  templateUrl: './mobile-color.component.html',
  styleUrls: ['./mobile-color.component.scss']
})
export class MobileColorComponent implements OnInit {
  common: any;
  country: any;
  colorForm: any;
  @ViewChild('mobileInput', { static: true }) mobileInput: ElementRef;
  mobileColorForm: FormGroup
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  select_client = new FormControl();
  filteredArray: Observable<string[]>;
  mobileColors: any = [];
  clientArray;
  allColors: any = []
  company_name: "";

  prim
  color1 = '#753434';
  
  color2 = '#6e946a';
  sec
 
  color3 = '#ff0000'
  ternary
  
  constructor(private http: HttpClient, public service: MobilecolorService, private rt: Router, public _formBuilder: FormBuilder) {
    this.filteredArray = this.select_client.valueChanges.pipe(
      startWith(null),
      map((mobileColor: string | null) => mobileColor ? this._filter(mobileColor) : this.allColors.slice()));
  }

  ngOnInit() {
    this.mobileColorForm = this._formBuilder.group({
      image_upload: ''
    })
    this.getClient();
  }
  add(event: MatChipInputEvent): void {
    debugger
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.mobileColors.push({
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

  remove(mobileColor, indx): void {
    this.mobileColors.splice(indx, 1);
  }
  ids;
  idsArray = []
  selected(event: MatAutocompleteSelectedEvent): void {
    this.ids = event.option.id
    console.log(this.ids)
    this.idsArray.push(this.ids)
    this.mobileColors.push(event.option.value);
    this.mobileInput.nativeElement.value = '';
    this.select_client.setValue(null);
  }

  private _filter(value: any): any[] {
    return this.allColors.filter(mobileColor => mobileColor.company_name.toLowerCase().includes(value.tostring().toLowerCase()));
  }




  getClient() {
    this.http.get('http://192.168.0.40/enrichedacademy_live/api/admin/client_color2?token=LIVESITE').subscribe(res => {
      console.log(res)
      this.common = res
      this.clientArray = this.common.data;
      this.allColors = this.clientArray
      console.log(this.allColors)
    })
  }
  saveColor() {
    console.log(this.colorForm.value)
  }


  dataArray = []



  type = "save Detail"
  image_name;
  SaveDetail() {

    this.prim = document.getElementById('demo1').getAttribute("ng-reflect-color");
    this.sec = document.getElementById('demo2').getAttribute("ng-reflect-color");
    this.ternary = document.getElementById('demo3').getAttribute("ng-reflect-color");
    console.log('=a=', this.prim)
    console.log('=b=', this.sec)
    console.log('=c=', this.ternary)

    this.image_name= this.mobileColorForm.controls['image_upload'].value
    let item = {
      type: this.type, client: this.idsArray, token: 'LIVESITE', primary_color: this.prim,
      secondary_color: this.sec, another_color: this.ternary, image_name: this.image_name
    }
    console.log(item)

    if (this.ids == null && this.ids == undefined) {
      Swal.fire({
        title: 'Warning',
        text: 'Please select client code',
        icon: 'warning',

      })
    } 
    // https://staging.enrichedacademy.com/api/admin/getCompaniesWithData http://192.168.0.40/enrichedacademy_live/api/admin/save_mobile_app_color
    else {
      this.service.Post('http://192.168.0.40/enrichedacademy_live/api/admin/save_mobile_app_color ', {
        type: this.type, client: this.idsArray, token: 'LIVESITE', primary_color: this.prim,
        secondary_color: this.sec, another_color: this.ternary,image_name: this.image_name  
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
  //image upload
  image_upload(event) {
    let reader = new FileReader();
    let file = event.target.files[0];
    console.log(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.mobileColorForm.get('image_upload').setValue({
        filename: file.name,
        filetype: file.type,
        filesize: file.size,
        value: (reader.result).toString().split(',')[1],
      })
    };
  }
  // type1="set theme for mobile App"
  // setThemeSubmit() {

  //   this.prim = document.getElementById('demo1').getAttribute("ng-reflect-color");
  //   this.sec = document.getElementById('demo2').getAttribute("ng-reflect-color");
  //   this.ternary = document.getElementById('demo3').getAttribute("ng-reflect-color");
  //   console.log('=a=', this.prim)
  //   console.log('=b=', this.sec)
  //   console.log('=c=', this.ternary)
  //   let item = {
  //     type: this.type1, client: this.idsArray, token: 'LIVESITE', primary_color: this.prim,
  //     secondary_color: this.sec, another_color: this.ternary
  //   }
  //   console.log(item)

  //   // var idsArray = [1, 2]
  //   if (this.ids == null && this.ids == undefined) {
  //     Swal.fire({
  //       title: 'Warning',
  //       text: 'Please select client code',
  //       icon: 'warning',

  //     })
  //   } else {
  //     this.service.Post('http://192.168.0.40/enrichedacademy_live/api/admin/save_client_color_v2', {
  //       type: this.type1, client: this.idsArray, token: 'LIVESITE', primary_color: this.prim,
  //       secondary_color: this.sec, another_color: this.ternary
  //     }).subscribe(res => {
  //       console.log(res)
  //     })
  //     Swal.fire({
  //       title: 'Success',
  //       text: 'Website theme update successfully',
  //       icon: 'success'
  //     })
  //   }
  // }
}
