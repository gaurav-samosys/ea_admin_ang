import * as tslib_1 from "tslib";
import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ManagementService } from '../management.service';
import * as myGlobals from '../../../../../global';
import { MatSnackBar } from '@angular/material/snack-bar';
let AddtopicComponent = class AddtopicComponent {
    constructor(data, _snackBar, dialogRef, rt, _formBuilder, manage_service) {
        this.data = data;
        this._snackBar = _snackBar;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.manage_service = manage_service;
        this.check = 1;
        this.value = 1;
        this.addTopics = myGlobals.addTopic;
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        this.hasError = (controlName, errorName) => {
            return this.addtopicForm.controls[controlName].hasError(errorName);
        };
        this.res_data = this.data;
        console.log(this.res_data);
    }
    ngOnInit() {
        this.addtopicForm = this._formBuilder.group({
            title: ['', Validators.required],
            description: [''],
            order: ['', Validators.required],
            image: [''],
            course: [''],
        });
    }
    addTopic() {
        if (this.addtopicForm.invalid || this.addtopicForm.value.image == null) {
            this.value = 0;
            return false;
        }
        console.log(this.addtopicForm.value);
        this.manage_service.Post(this.addTopics, { vertical_id: this.res_data, cat_name: this.addtopicForm.value.title, course_type: this.addtopicForm.value.course, description: this.addtopicForm.value.description, order: this.addtopicForm.value.order, token: 'LIVESITE', upload_file: this.addtopicForm.value.image }).subscribe(res => {
            this.common = res;
            this.addtopic_status = this.common.status;
            console.log(this.addtopic_status);
            localStorage.setItem("addtopic_status", this.addtopic_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/management/" + this.res_data]));
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
                    this.addtopicForm.get('image').setValue({
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
        this.addtopicForm.get('image').setValue(null);
        this.fileInput.nativeElement.value = '';
    }
    onClose() {
        this.dialogRef.close();
    }
};
tslib_1.__decorate([
    ViewChild('fileInput', { static: false }),
    tslib_1.__metadata("design:type", ElementRef)
], AddtopicComponent.prototype, "fileInput", void 0);
AddtopicComponent = tslib_1.__decorate([
    Component({
        selector: 'app-addtopic',
        templateUrl: './addtopic.component.html',
        styleUrls: ['./addtopic.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatSnackBar, MatDialogRef, Router, FormBuilder, ManagementService])
], AddtopicComponent);
export { AddtopicComponent };
//# sourceMappingURL=addtopic.component.js.map