import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import * as myGlobals from '../../../../../global';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ShowquizService } from '../showquiz.service';
let ConfirmboxComponent = class ConfirmboxComponent {
    constructor(dialogRef, data, rt, _formBuilder, show_service) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.show_service = show_service;
        this.deleteQuiz = myGlobals.deleteQuiz;
        // Update view with given values
        console.log(data);
        this.title = data.title;
        this.message = data.message;
        this.res_data = data.id;
        console.log("check", this.res_data);
        this.topic_id = this.res_data.topic_id;
    }
    onConfirm() {
        // Close the dialog, return true
        // this.show_service.Post(this.deleteQuiz,{quiz_id:this.res_data.id,token:"LIVESITE"}).subscribe(res=>{
        //   this.common=res;
        //      this.deletequiz_status=this.common.status;
        //     console.log(this.deletequiz_status)
        //     localStorage.setItem("deletequiz_status",this.deletequiz_status);
        //     this.rt.navigateByUrl('/apps/dashboards/users', {skipLocationChange: true}).then(()=>
        //                       this.rt.navigate(["/apps/vertical-management/quizzeslist/"+this.topic_id]));
        //     this.dialogRef.close();
        // })
        this.dialogRef.close(true);
    }
    onDismiss() {
        // Close the dialog, return false
        this.dialogRef.close(false);
    }
    ngOnInit() {
    }
};
ConfirmboxComponent = tslib_1.__decorate([
    Component({
        selector: 'app-confirmbox',
        templateUrl: './confirmbox.component.html',
        styleUrls: ['./confirmbox.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, Router, FormBuilder, ShowquizService])
], ConfirmboxComponent);
export { ConfirmboxComponent };
export class ConfirmDialogModel {
    constructor(title, message, id) {
        this.title = title;
        this.message = message;
        this.id = id;
    }
}
//# sourceMappingURL=confirmbox.component.js.map