import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { VideolistService } from '../videolist.service';
import { DomSanitizer } from '@angular/platform-browser';
let WatchvideoComponent = class WatchvideoComponent {
    constructor(sanitizer, data, dialogRef, rt, _formBuilder, video_service) {
        this.sanitizer = sanitizer;
        this.data = data;
        this.dialogRef = dialogRef;
        this.rt = rt;
        this._formBuilder = _formBuilder;
        this.video_service = video_service;
        this.res_data = this.data;
        this.safeSrc = this.sanitizer.bypassSecurityTrustHtml(this.res_data);
    }
    ngOnInit() {
        //this.res_data = this.data;
    }
    onClose() {
        this.dialogRef.close();
    }
};
WatchvideoComponent = tslib_1.__decorate([
    Component({
        selector: 'app-watchvideo',
        templateUrl: './watchvideo.component.html',
        styleUrls: ['./watchvideo.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [DomSanitizer, Object, MatDialogRef, Router, FormBuilder, VideolistService])
], WatchvideoComponent);
export { WatchvideoComponent };
//# sourceMappingURL=watchvideo.component.js.map