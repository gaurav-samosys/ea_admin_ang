import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
let ScrumboardBoardAddListComponent = class ScrumboardBoardAddListComponent {
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
        // Set the defaults
        this.formActive = false;
        this.listAdded = new EventEmitter();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open form
     */
    openForm() {
        this.form = this._formBuilder.group({
            name: ['']
        });
        this.formActive = true;
        this.focusNameField();
    }
    /**
     * Close form
     */
    closeForm() {
        this.formActive = false;
    }
    /**
     * Focus to the name field
     */
    focusNameField() {
        setTimeout(() => {
            this.nameInputField.nativeElement.focus();
        });
    }
    /**
     * On form submit
     */
    onFormSubmit() {
        if (this.form.valid) {
            this.listAdded.next(this.form.getRawValue().name);
            this.formActive = false;
        }
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ScrumboardBoardAddListComponent.prototype, "listAdded", void 0);
tslib_1.__decorate([
    ViewChild('nameInput', { static: false }),
    tslib_1.__metadata("design:type", Object)
], ScrumboardBoardAddListComponent.prototype, "nameInputField", void 0);
ScrumboardBoardAddListComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-add-list',
        templateUrl: './add-list.component.html',
        styleUrls: ['./add-list.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], ScrumboardBoardAddListComponent);
export { ScrumboardBoardAddListComponent };
//# sourceMappingURL=add-list.component.js.map