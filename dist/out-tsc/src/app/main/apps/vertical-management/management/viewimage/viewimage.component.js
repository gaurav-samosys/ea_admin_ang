import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ManagementService } from '../management.service';
let ViewimageComponent = class ViewimageComponent {
    constructor(data, dialogRef, rt, _formBuilder, manage_service) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.manage_service = manage_service;
        this.res_data = this.data;
        console.log(this.res_data);
    }
    ngOnInit() {
    }
    close() {
        this.dialogRef.close();
    }
};
ViewimageComponent = tslib_1.__decorate([
    Component({
        selector: 'app-viewimage',
        templateUrl: './viewimage.component.html',
        styleUrls: ['./viewimage.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef, Router, FormBuilder, ManagementService])
], ViewimageComponent);
export { ViewimageComponent };
//# sourceMappingURL=viewimage.component.js.map