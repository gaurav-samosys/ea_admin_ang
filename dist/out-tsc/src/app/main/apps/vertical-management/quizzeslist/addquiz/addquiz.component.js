import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { QuizzeslistService } from '../quizzeslist.service';
import * as myGlobals from '../../../../../global';
let AddquizComponent = class AddquizComponent {
    constructor(data, dialogRef, rt, _formBuilder, quiz_service) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.quiz_service = quiz_service;
        this.addQuize = myGlobals.addQuiz;
        this.hasError = (controlName, errorName) => {
            return this.addquizForm.controls[controlName].hasError(errorName);
        };
        this.topic_id = this.data;
        console.log(this.topic_id);
    }
    ngOnInit() {
        this.addquizForm = this._formBuilder.group({
            category: [''],
            quiz_description: [''],
            quiz_name: ['', Validators.required],
            passing_score: ['', Validators.required],
        });
        this.addquizForm.patchValue({
            category: localStorage.getItem('names')
        });
        this.addquizForm.controls['category'].disable();
    }
    addQuiz() {
        if (this.addquizForm.invalid) {
            return false;
        }
        this.addquizForm.value.token = "LIVESITE";
        this.addquizForm.value.topic_id = this.topic_id;
        console.log(this.addquizForm.value);
        this.quiz_service.Post(this.addQuize, this.addquizForm.value).subscribe(res => {
            this.common = res;
            this.addquiz_status = this.common.status;
            console.log(this.addquiz_status);
            localStorage.setItem("addquiz_status", this.addquiz_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/quizzeslist/" + this.topic_id]));
            this.dialogRef.close();
        });
    }
    onClose() {
        this.dialogRef.close();
    }
};
AddquizComponent = tslib_1.__decorate([
    Component({
        selector: 'app-addquiz',
        templateUrl: './addquiz.component.html',
        styleUrls: ['./addquiz.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef, Router, FormBuilder, QuizzeslistService])
], AddquizComponent);
export { AddquizComponent };
//# sourceMappingURL=addquiz.component.js.map