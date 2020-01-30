import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as myGlobals from '../../../../global';
import { MatDialog } from '@angular/material/dialog';
import { PagerService } from 'app/main/apps/dashboards/pager.service';
import { VerticalService } from './vertical.service';
import { AddverticalComponent } from './addvertical/addvertical.component';
import { EditverticalComponent } from './editvertical/editvertical.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteverticalComponent, ConfirmDialogModel } from './deletevertical/deletevertical.component';
import { ToastrService } from 'ngx-toastr';
let VerticalComponent = class VerticalComponent {
    constructor(toastr, _snackBar, rt, http, dialog, pagerService, vertical_service) {
        this.toastr = toastr;
        this._snackBar = _snackBar;
        this.rt = rt;
        this.http = http;
        this.dialog = dialog;
        this.pagerService = pagerService;
        this.vertical_service = vertical_service;
        this.getVerticals = myGlobals.getVerticals;
        this.getVideoListbyTopic = myGlobals.getVideoListbyTopic;
        this.statusChangeVideo = myGlobals.statusChangeVideo;
        this.horizontalPosition = 'right';
        this.verticalPosition = 'top';
        if (localStorage.getItem('addvertical_status') == 'true') {
            this.openaddSnackBar();
            localStorage.removeItem('addvertical_status');
        }
        else if (localStorage.getItem('addvertical_status') == 'false') {
            this.openadderrorSnackBar();
            localStorage.removeItem('addvertical_status');
        }
        else if (localStorage.getItem('deletevertical_status') == 'true') {
            this.opendeleteSnackBar();
            localStorage.removeItem('deletevertical_status');
        }
        else if (localStorage.getItem('deletevertical_status') == 'false') {
            this.openadddeleteerrorSnackBar();
            localStorage.removeItem('deletevertical_status');
        }
        else if (localStorage.getItem('editvertical_status') == 'true') {
            this.openeditSnackBar();
            localStorage.removeItem('editvertical_status');
        }
        else if (localStorage.getItem('editvertical_status') == 'false') {
            this.openediterrorSnackBar();
            localStorage.removeItem('editvertical_status');
        }
    }
    ngOnInit() {
        this.getVertical();
    }
    getVertical() {
        this.vertical_service.Post(this.getVerticals, { token: 'LIVESITE' })
            .subscribe(res => {
            this.common = res;
            console.log(this.common);
            this.vertical_data = this.common.data;
        });
    }
    addVertical() {
        let dialog = this.dialog.open(AddverticalComponent, {
            width: '500px', height: '550px'
        });
    }
    editVertical(value) {
        let dialog = this.dialog.open(EditverticalComponent, {
            data: value,
            width: '600px', height: '500px'
        });
    }
    show_li(j) {
        document.getElementById('show_list' + j).classList.toggle('displayNone');
    }
    hide(value) {
        document.getElementById('show_list' + value).classList.add('displayNone');
    }
    name(value, id) {
        localStorage.setItem('name', value);
        this.rt.navigate(['/apps/vertical-management/management', id]);
    }
    openaddSnackBar() {
        this._snackBar.open('Vertical added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openadderrorSnackBar() {
        this._snackBar.open('Vertical not added successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    opendeleteSnackBar() {
        this._snackBar.open('Vertical deleted successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openadddeleteerrorSnackBar() {
        this._snackBar.open('Vertical not deleted successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openeditSnackBar() {
        this._snackBar.open('Vertical updated successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    openediterrorSnackBar() {
        this._snackBar.open('Vertical not updated successfully!!', 'End now', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
    deleteVertical(value) {
        const message = `Are you sure you want to delete this vertical?`;
        let id = value;
        const dialogData = new ConfirmDialogModel("Confirm Action", message, id);
        const dialogRef = this.dialog.open(DeleteverticalComponent, {
            maxWidth: "400px",
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            this.result = dialogResult;
        });
    }
};
VerticalComponent = tslib_1.__decorate([
    Component({
        selector: 'app-vertical',
        templateUrl: './vertical.component.html',
        styleUrls: ['./vertical.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ToastrService,
        MatSnackBar, Router, HttpClient, MatDialog, PagerService, VerticalService])
], VerticalComponent);
export { VerticalComponent };
//# sourceMappingURL=vertical.component.js.map