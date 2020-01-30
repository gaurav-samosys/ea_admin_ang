import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
let ScrumboardBoardEditListNameComponent = class ScrumboardBoardEditListNameComponent {
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
        // Set the defaults
        this.formActive = false;
        this.listNameChanged = new EventEmitter();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the form
     */
    openForm() {
        this.form = this._formBuilder.group({
            name: [this.list.name]
        });
        this.formActive = true;
        this.focusNameField();
    }
    /**
     * Close the form
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
            this.list.name = this.form.getRawValue().name;
            this.listNameChanged.next(this.list.name);
            this.formActive = false;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScrumboardBoardEditListNameComponent.prototype, "list", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ScrumboardBoardEditListNameComponent.prototype, "listNameChanged", void 0);
tslib_1.__decorate([
    ViewChild('nameInput', { static: false }),
    tslib_1.__metadata("design:type", Object)
], ScrumboardBoardEditListNameComponent.prototype, "nameInputField", void 0);
ScrumboardBoardEditListNameComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-edit-list-name',
        templateUrl: './edit-list-name.component.html',
        styleUrls: ['./edit-list-name.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], ScrumboardBoardEditListNameComponent);
export { ScrumboardBoardEditListNameComponent };
//# sourceMappingURL=edit-list-name.component.js.map