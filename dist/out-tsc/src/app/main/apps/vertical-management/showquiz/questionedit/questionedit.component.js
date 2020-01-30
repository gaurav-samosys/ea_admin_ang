import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ShowquizService } from '../showquiz.service';
import * as myGlobals from '../../../../../global';
let QuestioneditComponent = class QuestioneditComponent {
    constructor(data, dialogRef, rt, _formBuilder, show_service) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.show_service = show_service;
        this.addQuestionAnswers = myGlobals.addQuestionAnswers;
        this.hide = 0;
        this.hasError = (controlName, errorName) => {
            return this.addQuestionform.controls[controlName].hasError(errorName);
        };
        this.value = this.data;
        console.log(this.value);
    }
    ngOnInit() {
        this.addQuestionform = this._formBuilder.group({
            question_type: [''],
            points: [''],
            order: [''],
            question: [''],
            option: [''],
            selling_points: this._formBuilder.array([this._formBuilder.group({ point: '' })])
            // options: this._formBuilder.array('')
        });
    }
    get sellingPoints() {
        return this.addQuestionform.get('selling_points');
    }
    /////// This is new /////////////////
    addSellingPoint() {
        this.sellingPoints.push(this._formBuilder.group({ point: '' }));
    }
    deleteSellingPoint(index) {
        this.sellingPoints.removeAt(index);
    }
    addQuestion() {
        this.formData =
            {
                quiz_id: '',
                topic_id: '',
                question_type: '',
                question: '',
                order: '',
                points: '',
                created: '',
                solution: '',
            };
    }
    Type(value) {
        if (value == "") {
            this.hide = 0;
        }
        else if (value == 0) {
            this.hide = 1;
        }
        else if (value == 1) {
            this.hide = 2;
        }
        else if (value == 2) {
            this.hide = 3;
        }
    }
    onClose() {
        this.dialogRef.close();
    }
};
QuestioneditComponent = tslib_1.__decorate([
    Component({
        selector: 'app-questionedit',
        templateUrl: './questionedit.component.html',
        styleUrls: ['./questionedit.component.scss']
    }),
    tslib_1.__param(0, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [Object, MatDialogRef, Router, FormBuilder, ShowquizService])
], QuestioneditComponent);
export { QuestioneditComponent };
//# sourceMappingURL=questionedit.component.js.map