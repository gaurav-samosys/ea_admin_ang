import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
let ScrumboardBoardAddCardComponent = class ScrumboardBoardAddCardComponent {
    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(_formBuilder) {
        this._formBuilder = _formBuilder;
        // Set the defaults
        this.formActive = false;
        this.cardAdded = new EventEmitter();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the form
     */
    openForm() {
        this.form = this._formBuilder.group({
            name: ''
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
            const cardName = this.form.getRawValue().name;
            this.cardAdded.next(cardName);
            this.formActive = false;
        }
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ScrumboardBoardAddCardComponent.prototype, "cardAdded", void 0);
tslib_1.__decorate([
    ViewChild('nameInput', { static: false }),
    tslib_1.__metadata("design:type", Object)
], ScrumboardBoardAddCardComponent.prototype, "nameInputField", void 0);
ScrumboardBoardAddCardComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-add-card',
        templateUrl: './add-card.component.html',
        styleUrls: ['./add-card.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], ScrumboardBoardAddCardComponent);
export { ScrumboardBoardAddCardComponent };
//# sourceMappingURL=add-card.component.js.map