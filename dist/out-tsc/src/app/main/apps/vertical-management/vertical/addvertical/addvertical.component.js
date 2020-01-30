import * as tslib_1 from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { VerticalService } from '../vertical.service';
import * as myGlobals from '../../../../../global';
import { MatSnackBar } from '@angular/material/snack-bar';
let AddverticalComponent = class AddverticalComponent {
    constructor(_snackBar, dialogRef, rt, _formBuilder, vertical_service) {
        this._snackBar = _snackBar;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.vertical_service = vertical_service;
        this.value = 1;
        this.addVerticals = myGlobals.addVertical;
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        this.hasError = (controlName, errorName) => {
            return this.addverticalForm.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.addverticalForm = this._formBuilder.group({
            title: [''],
            description: [''],
            upload_file: [''],
        });
    }
    addVertical() {
        if (this.addverticalForm.invalid || this.addverticalForm.value.upload_file == null) {
            this.value = 0;
            return false;
        }
        this.vertical_service.Post(this.addVerticals, { name: this.addverticalForm.value.title, description: this.addverticalForm.value.description, company_id: 0, token: 'LIVESITE', upload_file: this.addverticalForm.value.upload_file }).subscribe(res => {
            this.common = res;
            this.addvertical_status = this.common.status;
            console.log(this.addvertical_status);
            localStorage.setItem("addvertical_status", this.addvertical_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/vertical"]));
            this.dialogRef.close();
        });
    }
    selectFile(event) {
        this.value = 1;
        /*  this.files = value
          console.log(this.files)*/
        // var array = this.files.name.split('.');
        var pattern = /image-*/;
        if (!event.target.files[0].type.match(pattern)) {
            this.openaddSnackBar();
            this.clearFile();
            return false;
        }
        else {
            let reader = new FileReader();
            if (event.target.files && event.target.files.length > 0) {
                let file = event.target.files[0];
                reader.readAsDataURL(file);
                reader.onload = () => {
                    this.addverticalForm.get('upload_file').setValue({
                        filename: file.name,
                        filetype: file.type,
                        filesize: file.size,
                        value: (reader.result).toString().split(',')[1]
                    });
                };
            }
        }
    }
    openaddSnackBar() {
        this._snackBar.open('Please select image in png,jpg or gif format !!', 'End now', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    clearFile() {
        this.addverticalForm.get('upload_file').setValue(null);
        this.fileInput.nativeElement.value = '';
    }
    onClose() {
        this.dialogRef.close();
    }
};
tslib_1.__decorate([
    ViewChild('fileInput', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], AddverticalComponent.prototype, "fileInput", void 0);
AddverticalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-addvertical',
        templateUrl: './addvertical.component.html',
        styleUrls: ['./addvertical.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar, MatDialogRef, Router, FormBuilder, VerticalService])
], AddverticalComponent);
export { AddverticalComponent };
//# sourceMappingURL=addvertical.component.js.map