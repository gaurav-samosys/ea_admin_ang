import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../clients.service';
import { EditdialogComponent } from './editdialog/editdialog.component';
let ClientEditComponent = class ClientEditComponent {
    constructor(rt, dialogRef, _formBuilder, client, data, dialog) {
        this.rt = rt;
        this.dialogRef = dialogRef;
        this._formBuilder = _formBuilder;
        this.client = client;
        this.data = data;
        this.dialog = dialog;
        this.hasError = (controlName, errorName) => {
            return this.form.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.res_data = this.data;
        // setting value
        // Reactive Form
        this.form = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            phone: ['', [Validators.required, Validators.maxLength(12)]],
            city: ['', Validators.required],
        });
        this.form.patchValue({
            firstName: this.res_data.first_name,
            lastName: this.res_data.last_name,
            username: this.res_data.user_name,
            city: this.res_data.city,
            phone: this.res_data.phone_no
        });
    }
    updateForm() {
        if (this.form.invalid) {
            this.dialog.open(EditdialogComponent);
            return false;
        }
        this.dialogRef.close();
    }
};
ClientEditComponent = tslib_1.__decorate([
    Component({
        selector: 'app-client-edit',
        templateUrl: './client-edit.component.html',
        styleUrls: ['./client-edit.component.scss']
    }),
    tslib_1.__param(4, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Router, MatDialogRef, FormBuilder, ClientsService, Object, MatDialog])
], ClientEditComponent);
export { ClientEditComponent };
//# sourceMappingURL=client-edit.component.js.map