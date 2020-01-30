import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder } from '@angular/forms';
let UserDetailComponent = class UserDetailComponent {
    constructor(fb, dialogRef, data) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.displayedColumns = ['id', 'IndustryName', 'company', 'status', 'univercity', 'create_by_user'];
        this.dataSource = new MatTableDataSource();
        this.color = 'accent';
        this.checked = false;
        this.disabled = false;
        console.log(data);
        this.userdetailsForm = this.fb.group({
            one: '',
            two: '',
            three: '',
        });
    }
    onNoClick() {
        this.dialogRef.close();
    }
    ngOnInit() {
    }
};
UserDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'app-user-detail',
        templateUrl: './user-detail.component.html',
        styleUrls: ['./user-detail.component.scss']
    }),
    tslib_1.__param(2, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        MatDialogRef, Object])
], UserDetailComponent);
export { UserDetailComponent };
//# sourceMappingURL=user-detail.component.js.map