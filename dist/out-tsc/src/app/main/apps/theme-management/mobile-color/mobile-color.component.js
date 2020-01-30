import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
// import swal from 'sweetalert';
import { MobilecolorService } from './mobilecolor.service';
import Swal from 'sweetalert2';
let MobileColorComponent = class MobileColorComponent {
    constructor(http, service, rt, _formBuilder) {
        this.http = http;
        this.service = service;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.dashboard = false;
        this.magicNumber = false;
        this.netWorth = false;
        this.loadCalculator = false;
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = false;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.select_client = new FormControl();
        this.mobileColors = [];
        this.allColors = [];
        this.selecte = 'option1';
        this.show = false;
        this.buttonName = 'More Option';
        this.mobileColorArray = [{ id: 1, name: 'Dashboard' },
            { id: 2, name: 'My Magic Number' },
            { id: 3, name: 'NetWorth Calculator' },
            { id: 4, name: 'Student Loan Calculator' }];
        this.color = '#753434';
        this.color1 = '#549cb6';
        this.color2 = '#404041';
        this.color3 = '#727375';
        this.color4 = '#a0ba3a';
        this.headColor = '#a3bb39';
        this.graph1 = '#549cb6';
        this.graph2 = '#cde0ea';
        this.idsArray = [];
        this.dataArray = [];
        this.type = "save Detail";
        this.filteredArray = this.select_client.valueChanges.pipe(startWith(null), map((mobileColor) => mobileColor ? this._filter(mobileColor) : this.allColors.slice()));
    }
    buttontoggle() {
        this.show = !this.show;
        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "Less Option";
        else
            this.buttonName = "More Option";
    }
    ngOnInit() {
        this.mobileColorForm = this._formBuilder.group({
            image_upload: ''
        });
        this.getClient();
        this.dashboardTheme();
    }
    primChange(color) {
        this.color1 = color;
        console.log('=primary=', this.color1);
    }
    secChange(color) {
        this.color2 = color;
        console.log('=secondary=', this.color2);
    }
    ternChange(color) {
        this.color3 = color;
        console.log('=ternary=', this.color3);
    }
    iconChange(color) {
        this.color4 = color;
        console.log('=icon=', this.color4);
    }
    headerChange(color) {
        this.headColor = color;
        console.log('=headColor=', this.headColor);
    }
    graphChange1(color) {
        this.graph1 = color;
        console.log('=graph1=', this.graph1);
    }
    graphChange2(color) {
        this.graph2 = color;
        console.log('=graph2=', this.graph2);
    }
    add(event) {
        debugger;
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
    remove(mobileColor, indx) {
        this.mobileColors.splice(indx, 1);
    }
    selected(event) {
        this.ids = event.option.id;
        console.log(this.ids);
        this.idsArray.push(this.ids);
        this.mobileColors.push(event.option.value);
        this.mobileInput.nativeElement.value = '';
        this.select_client.setValue(null);
    }
    _filter(value) {
        return this.allColors.filter(mobileColor => mobileColor.company_name.toLowerCase().includes(value.tostring().toLowerCase()));
    }
    dashboardTheme() {
        this.dashboard = true;
        this.magicNumber = false;
        this.netWorth = false;
        this.loadCalculator = false;
    }
    magicNumberTheme() {
        this.dashboard = false;
        this.magicNumber = true;
        this.netWorth = false;
        this.loadCalculator = false;
    }
    netWorthTheme() {
        this.dashboard = false;
        this.magicNumber = false;
        this.netWorth = true;
        this.loadCalculator = false;
    }
    studentTheme() {
        this.dashboard = false;
        this.magicNumber = false;
        this.netWorth = false;
        this.loadCalculator = true;
    }
    getClient() {
        this.http.get('http://192.168.0.40/enrichedacademy_live/api/admin/client_color2?token=LIVESITE').subscribe(res => {
            console.log(res);
            this.common = res;
            this.clientArray = this.common.data;
            this.allColors = this.clientArray;
            console.log(this.allColors);
        });
    }
    saveColor() {
        console.log(this.colorForm.value);
    }
    SaveDetail() {
        this.primary = document.getElementById('demo1').getAttribute("ng-reflect-color");
        this.secondary = document.getElementById('demo2').getAttribute("ng-reflect-color");
        this.ternary = document.getElementById('demo3').getAttribute("ng-reflect-color");
        console.log('=a=', this.primary);
        console.log('=b=', this.secondary);
        console.log('=c=', this.ternary);
        this.image_name = this.mobileColorForm.controls['image_upload'].value;
        let item = {
            type: this.type, client: this.idsArray, token: 'LIVESITE', primary_color: this.primary,
            secondary_color: this.secondary, another_color: this.ternary, image_name: this.image_name
        };
        console.log(item);
        if (this.ids == null && this.ids == undefined) {
            Swal.fire({
                title: 'Warning',
                text: 'Please select client code',
                icon: 'warning',
            });
        }
        // https://staging.enrichedacademy.com/api/admin/getCompaniesWithData http://192.168.0.40/enrichedacademy_live/api/admin/save_mobile_app_color
        else {
            this.service.Post('http://192.168.0.18/enrichedacademy_live/api/admin/save_mobile_app_color ', {
                type: this.type, client: this.idsArray, token: 'LIVESITE', primary_color: this.primary,
                secondary_color: this.secondary, another_color: this.ternary, image_name: this.image_name
            }).subscribe(res => {
                console.log(res);
            });
            Swal.fire({
                title: 'Success',
                text: 'Website theme update successfully',
                icon: 'success'
            });
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
            });
        };
    }
};
tslib_1.__decorate([
    ViewChild('mobileInput', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], MobileColorComponent.prototype, "mobileInput", void 0);
MobileColorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-mobile-color',
        templateUrl: './mobile-color.component.html',
        styleUrls: ['./mobile-color.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient,
        MobilecolorService, Router,
        FormBuilder])
], MobileColorComponent);
export { MobileColorComponent };
// mobileThemeChanged(value) {
//   console.log(value)
//   if (value == 1) { 
//     this.dashboard = !this.dashboard;
//     this.magicNumber == false
//     this.netWorth == false
//     this.loadCalculator == false
//    }
//   if (value == 2) {this.magicNumber = !this.magicNumber;
//     console.log( this.magicNumber)
//    }
//   if (value == 3) {  this.netWorth = !this.netWorth; } 
//   if (value == 4) {  this.loadCalculator = !this.loadCalculator;  }
// }
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
//# sourceMappingURL=mobile-color.component.js.map