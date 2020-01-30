import * as tslib_1 from "tslib";
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatColors } from '@fuse/mat-colors';
import { CalendarEventModel } from 'app/main/apps/calendar/event.model';
let CalendarEventFormDialogComponent = class CalendarEventFormDialogComponent {
    /**
     * Constructor
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(matDialogRef, _data, _formBuilder) {
        this.matDialogRef = matDialogRef;
        this._data = _data;
        this._formBuilder = _formBuilder;
        this.presetColors = MatColors.presets;
        this.event = _data.event;
        this.action = _data.action;
        if (this.action === 'edit') {
            this.dialogTitle = this.event.title;
        }
        else {
            this.dialogTitle = 'New Event';
            this.event = new CalendarEventModel({
                start: _data.date,
                end: _data.date
            });
        }
        this.eventForm = this.createEventForm();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm() {
        return new FormGroup({
            title: new FormControl(this.event.title),
            start: new FormControl(this.event.start),
            end: new FormControl(this.event.end),
            allDay: new FormControl(this.event.allDay),
            color: this._formBuilder.group({
                primary: new FormControl(this.event.color.primary),
                secondary: new FormControl(this.event.color.secondary)
            }),
            meta: this._formBuilder.group({
                location: new FormControl(this.event.meta.location),
                notes: new FormControl(this.event.meta.notes)
            })
        });
    }
};
CalendarEventFormDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'calendar-event-form-dialog',
        templateUrl: './event-form.component.html',
        styleUrls: ['./event-form.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object, FormBuilder])
], CalendarEventFormDialogComponent);
export { CalendarEventFormDialogComponent };
//# sourceMappingURL=event-form.component.js.map