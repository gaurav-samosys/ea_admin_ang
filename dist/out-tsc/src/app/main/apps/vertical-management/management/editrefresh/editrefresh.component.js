import * as tslib_1 from "tslib";
import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ManagementService } from '../management.service';
import * as myGlobals from '../../../../../global';
import { MatSnackBar } from '@angular/material/snack-bar';
let EditrefreshComponent = class EditrefreshComponent {
    constructor(_snackBar, data, dialogRef, rt, _formBuilder, manage_service) {
        this._snackBar = _snackBar;
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.manage_service = manage_service;
        this.editTopic = myGlobals.editTopic;
        this.check = 1;
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        this.hasError = (controlName, errorName) => {
            return this.edittopicForm.controls[controlName].hasError(errorName);
        };
        this.res_data = this.data;
        console.log(this.res_data);
        this.check = this.res_data.course_type;
    }
    ngOnInit() {
        this.edittopicForm = this._formBuilder.group({
            title: [''],
            description: [''],
            order: [''],
            image: [''],
            course: [''],
        });
        this.edittopicForm.patchValue({
            title: this.res_data.cat_name,
            description: this.res_data.description,
            order: this.res_data.order,
            course: this.res_data.course_type
        });
    }
    updaterefresh() {
        if (this.edittopicForm.invalid) {
            return false;
        }
        console.log(this.edittopicForm.value);
        this.manage_service.Post(this.editTopic, { id: this.res_data.id, cat_name: this.edittopicForm.value.title, course_type: this.edittopicForm.value.course, description: this.edittopicForm.value.description, order: this.edittopicForm.value.order, token: 'LIVESITE', upload_file: this.edittopicForm.value.image }).subscribe(res => {
            this.common = res;
            this.edittopic_status = this.common.status;
            console.log(this.edittopic_status);
            localStorage.setItem("edittopic_status", this.edittopic_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/management/" + this.res_data.vertical_id]));
            this.dialogRef.close();
        });
    }
    selectFile(event) {
        //this.value=1;
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
                    this.edittopicForm.get('image').setValue({
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
        this.edittopicForm.get('image').setValue(null);
        this.fileInput.nativeElement.value = '';
    }
    onClose() {
        this.dialogRef.close();
    }
};
tslib_1.__decorate([
    ViewChild('fileInput', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], EditrefreshComponent.prototype, "fileInput", void 0);
EditrefreshComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editrefresh',
        templateUrl: './editrefresh.component.html',
        styleUrls: ['./editrefresh.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar, Object, MatDialogRef, Router, FormBuilder, ManagementService])
], EditrefreshComponent);
export { EditrefreshComponent };
//# sourceMappingURL=editrefresh.component.js.map