import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { QuizzeslistService } from '../quizzeslist.service';
import * as myGlobals from '../../../../../global';
let EditquizComponent = class EditquizComponent {
    constructor(data, dialogRef, rt, _formBuilder, quiz_service) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.quiz_service = quiz_service;
        this.editQuiz = myGlobals.editQuiz;
        this.hasError = (controlName, errorName) => {
            return this.editquizForm.controls[controlName].hasError(errorName);
        };
        this.res_data = this.data;
        this.topic_id = this.res_data.topic_id;
        console.log(this.res_data);
    }
    ngOnInit() {
        this.editquizForm = this._formBuilder.group({
            category: [''],
            quiz_description: [''],
            quiz_name: ['', Validators.required],
            passing_score: ['', Validators.required],
        });
        this.editquizForm.patchValue({
            category: localStorage.getItem('names'),
            quiz_description: this.res_data.quiz_description,
            quiz_name: this.res_data.quiz_name,
            passing_score: this.res_data.passing_score
        });
        this.editquizForm.controls['category'].disable();
    }
    UpdateQuiz() {
        if (this.editquizForm.invalid) {
            return false;
        }
        this.editquizForm.value.token = "LIVESITE";
        this.editquizForm.value.topic_id = this.topic_id;
        this.editquizForm.value.quiz_id = this.res_data.id;
        this.quiz_service.Post(this.editQuiz, this.editquizForm.value).subscribe(res => {
            this.common = res;
            this.editquiz_status = this.common.status;
            localStorage.setItem("editquiz_status", this.editquiz_status);
            this.rt.navigateByUrl('/apps/dashboards/users', { skipLocationChange: true }).then(() => this.rt.navigate(["/apps/vertical-management/quizzeslist/" + this.topic_id]));
            this.dialogRef.close();
        });
    }
    onClose() {
        this.dialogRef.close();
    }
};
EditquizComponent = tslib_1.__decorate([
    Component({
        selector: 'app-editquiz',
        templateUrl: './editquiz.component.html',
        styleUrls: ['./editquiz.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef, Router, FormBuilder, QuizzeslistService])
], EditquizComponent);
export { EditquizComponent };
//# sourceMappingURL=editquiz.component.js.map