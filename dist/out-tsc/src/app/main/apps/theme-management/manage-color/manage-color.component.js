import * as tslib_1 from "tslib";
import { Component, ViewChild, ElementRef, } from '@angular/core';
import { ManagecolorService } from './managecolor.service';
import * as myGlobals from '../../../../global';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';
let ManageColorComponent = class ManageColorComponent {
    constructor(http, service, rt, _formBuilder) {
        this.http = http;
        this.service = service;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.company_name = "";
        this.visible = true;
        this.selectable = true;
        this.removable = true;
        this.addOnBlur = false;
        this.separatorKeysCodes = [ENTER, COMMA];
        this.select_client = new FormControl();
        this.dataArray = [];
        this.allData = [];
        this.client_color2 = myGlobals.client_color2;
        this.save_client_color_v2 = myGlobals.save_client_color_v2;
        this.idsArray = [];
        this.color = '#753434';
        this.color1 = '#f5961e';
        this.color2 = '#ffffff';
        this.color3 = '#4c4c4c';
        this.type = "save Detail";
        this.type1 = "set theme for mobile App";
        this.filteredArray = this.select_client.valueChanges.pipe(startWith(null), map((item) => item ? this._filter(item) : this.allData.slice()));
    }
    ngOnInit() {
        this.getClient();
    }
    add(event) {
        // debugger
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
    remove(item, indx) {
        this.dataArray.splice(indx, 1);
    }
    selected(event) {
        this.ids = event.option.id;
        console.log(this.ids);
        this.idsArray.push(this.ids);
        this.dataArray.push(event.option.value);
        this.manageInput.nativeElement.value = '';
        this.select_client.setValue(null);
    }
    _filter(value) {
        return this.allData.filter(item => item.company_name.toLowerCase().includes(value.tostring().toLowerCase()));
    }
    getClient() {
        this.http.get('http://192.168.0.18/enrichedacademy_live/api/admin/client_color2?token=LIVESITE').subscribe(res => {
            console.log(res);
            this.common = res;
            this.clientArray = this.common.data;
            this.allData = this.clientArray;
            console.log(this.allData);
        });
    }
    saveColor() {
        console.log(this.colorForm.value);
    }
    primChange(color) {
        this.color1 = color;
        console.log('=primary=', this.color1);
    }
    // color2
    secChange(color) {
        this.color2 = color;
        console.log('=secondary=', this.color2);
    }
    // color3
    ternChange(color) {
        this.color3 = color;
        console.log('=ternary=', this.color3);
    }
    SaveDetail() {
        this.primary = document.getElementById('demo1').getAttribute("ng-reflect-color");
        this.secondary = document.getElementById('demo2').getAttribute("ng-reflect-color");
        this.ternary = document.getElementById('demo3').getAttribute("ng-reflect-color");
        console.log('=a=', this.primary);
        console.log('=b=', this.secondary);
        console.log('=c=', this.ternary);
        if (this.ids == null && this.ids == undefined) {
            Swal.fire({
                title: 'Warning',
                text: 'Please select client code',
                icon: 'warning',
            });
        }
        else {
            this.service.Post('http://192.168.0.18/enrichedacademy_live/api/admin/save_client_color_v2', {
                type: this.type, client: this.idsArray, token: 'LIVESITE', primary_color: this.primary,
                secondary_color: this.secondary, another_color: this.ternary
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
    setThemeSubmit() {
        this.primary = document.getElementById('demo1').getAttribute("ng-reflect-color");
        this.secondary = document.getElementById('demo2').getAttribute("ng-reflect-color");
        this.ternary = document.getElementById('demo3').getAttribute("ng-reflect-color");
        console.log('=a=', this.primary);
        console.log('=b=', this.secondary);
        console.log('=c=', this.ternary);
        if (this.ids == null && this.ids == undefined) {
            Swal.fire({
                title: 'Warning',
                text: 'Please select client code',
                icon: 'warning',
            });
        }
        else {
            this.service.Post('http://192.168.0.40/enrichedacademy_live/api/admin/save_client_color_v2', {
                type: this.type1, client: this.idsArray, token: 'LIVESITE', primary_color: this.primary,
                secondary_color: this.secondary, another_color: this.ternary
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
};
tslib_1.__decorate([
    ViewChild('manageInput', { static: true }),
    tslib_1.__metadata("design:type", ElementRef)
], ManageColorComponent.prototype, "manageInput", void 0);
ManageColorComponent = tslib_1.__decorate([
    Component({
        selector: 'app-manage-color',
        templateUrl: './manage-color.component.html',
        styleUrls: ['./manage-color.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient, ManagecolorService, Router, FormBuilder])
], ManageColorComponent);
export { ManageColorComponent };
//# sourceMappingURL=manage-color.component.js.map