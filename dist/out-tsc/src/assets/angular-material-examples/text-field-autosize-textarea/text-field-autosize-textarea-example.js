import * as tslib_1 from "tslib";
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
/** @title Auto-resizing textarea */
let TextFieldAutosizeTextareaExample = class TextFieldAutosizeTextareaExample {
    constructor(_ngZone) {
        this._ngZone = _ngZone;
    }
    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }
};
tslib_1.__decorate([
    ViewChild('autosize', { static: false }),
    tslib_1.__metadata("design:type", CdkTextareaAutosize)
], TextFieldAutosizeTextareaExample.prototype, "autosize", void 0);
TextFieldAutosizeTextareaExample = tslib_1.__decorate([
    Component({
        selector: 'text-field-autosize-textarea-example',
        templateUrl: './text-field-autosize-textarea-example.html',
        styleUrls: ['./text-field-autosize-textarea-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [NgZone])
], TextFieldAutosizeTextareaExample);
export { TextFieldAutosizeTextareaExample };
//# sourceMappingURL=text-field-autosize-textarea-example.js.map