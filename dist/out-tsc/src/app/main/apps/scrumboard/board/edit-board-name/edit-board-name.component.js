import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
let ScrumboardEditBoardNameComponent = class ScrumboardEditBoardNameComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        // Set the defaults
        this.formActive = false;
        this.boardNameChanged = new EventEmitter();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open form
     */
    openForm() {
        this.form = this.formBuilder.group({
            name: [this.board.name]
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
            this.board.name = this.form.getRawValue().name;
            this.board.uri = encodeURIComponent(this.board.name).replace(/%20/g, '-').toLowerCase();
            this.boardNameChanged.next(this.board.name);
            this.formActive = false;
        }
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScrumboardEditBoardNameComponent.prototype, "board", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ScrumboardEditBoardNameComponent.prototype, "boardNameChanged", void 0);
tslib_1.__decorate([
    ViewChild('nameInput', { static: false }),
    tslib_1.__metadata("design:type", Object)
], ScrumboardEditBoardNameComponent.prototype, "nameInputField", void 0);
ScrumboardEditBoardNameComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-edit-board-name',
        templateUrl: './edit-board-name.component.html',
        styleUrls: ['./edit-board-name.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder])
], ScrumboardEditBoardNameComponent);
export { ScrumboardEditBoardNameComponent };
//# sourceMappingURL=edit-board-name.component.js.map