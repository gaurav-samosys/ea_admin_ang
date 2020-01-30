import * as tslib_1 from "tslib";
import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { VerticalService } from '../vertical.service';
import * as myGlobals from '../../../../../global';
import { MatSnackBar } from '@angular/material/snack-bar';
let EditverticalComponent = class EditverticalComponent {
    constructor(_snackBar, data, dialogRef, rt, _formBuilder, vertical_service) {
        this._snackBar = _snackBar;
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.vertical_service = vertical_service;
        this.editVertical = myGlobals.editVertical;
        this.value = 1;
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        this.hasError = (controlName, errorName) => {
            return this.editverticalForm.controls[controlName].hasError(errorName);
        };
    }
    ngOnInit() {
        this.res_data = this.data;
        console.log(this.res_data);
        this.editverticalForm = this._formBuilder.group({
            name: [''],
            description: [''],
            upload_file: ['']
        });
        this.editverticalForm.patchValue({
            name: this.res_data.name,
            description: this.res_data.description,
        });
    }
    updateVertical() {
        if (this.editverticalForm.invalid) {
            return false;
        }
        this.editverticalForm.value.company_id = 0;
        this.editverticalForm.value.id = this.res_data.id;
        this.editverticalForm.value.token = "LIVESITE";
        console.log(this.editverticalForm.value);
        this.vertical_service.Post(this.editVertical, this.editverticalForm.value).subscribe(res => {
            this.common = res;
            this.editvertical_status = this.common.status;
            console.log(this.editvertical_status);
            localStorage.setItem("editvertical_status", this.editvertical_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/vertical"]));
            this.dialogRef.close();
        });
    }
    selectFile(event) {
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
                    this.editverticalForm.get('upload_file').setValue({
                        filename: file.name,
                        filetype: file.type,
                        filesize: file.size,
                        value: (reader.result).toString().split(',')[1]
                    });
                };
            }
        }
    }
    onClose() {
        this.dialogRef.close();
    }
    openaddSnackBar() {
        this._snackBar.open('Please select image in png,jpg or gif format !!', 'End now', {
            duration: 6000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    clearFile() {
        this.editverticalForm.get('upload_file').setValue(null);
        this.fileInput.nativeElement.value = '';
    }
};
tslib_1.__decorate([
    ViewChild('fileInput', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], EditverticalComponent.prototype, "fileInput", void 0);
EditverticalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editvertical',
        templateUrl: './editvertical.component.html',
        styleUrls: ['./editvertical.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar, Object, MatDialogRef, Router, FormBuilder, VerticalService])
], EditverticalComponent);
export { EditverticalComponent };
//# sourceMappingURL=editvertical.component.js.map