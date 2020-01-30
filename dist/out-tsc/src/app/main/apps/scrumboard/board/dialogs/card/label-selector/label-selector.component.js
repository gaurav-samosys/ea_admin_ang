import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { ScrumboardService } from 'app/main/apps/scrumboard/scrumboard.service';
let ScrumboardLabelSelectorComponent = class ScrumboardLabelSelectorComponent {
    /**
     * Constructor
     *
     * @param {ScrumboardService} _scrumboardService
     */
    constructor(_scrumboardService) {
        this._scrumboardService = _scrumboardService;
        // Set the defaults
        this.cardLabelsChanged = new EventEmitter();
        this.labelsMenuView = 'labels';
        this.newLabel = {
            id: '',
            name: '',
            color: 'blue-400'
        };
        this.toggleInArray = FuseUtils.toggleInArray;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        this._scrumboardService.onBoardChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(board => {
            this.board = board;
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Card labels changed
     */
    onCardLabelsChanged() {
        this.cardLabelsChanged.next();
    }
    /**
     * On label change
     */
    onLabelChange() {
        this._scrumboardService.updateBoard();
    }
    /**
     * Add new label
     */
    addNewLabel() {
        this.newLabel.id = FuseUtils.generateGUID();
        this.board.labels.push(Object.assign({}, this.newLabel));
        this.newLabel.name = '';
        this.labelsMenuView = 'labels';
    }
};
tslib_1.__decorate([
    Input('card'),
    tslib_1.__metadata("design:type", Object)
], ScrumboardLabelSelectorComponent.prototype, "card", void 0);
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", EventEmitter)
], ScrumboardLabelSelectorComponent.prototype, "cardLabelsChanged", void 0);
ScrumboardLabelSelectorComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-label-selector',
        templateUrl: './label-selector.component.html',
        styleUrls: ['./label-selector.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [ScrumboardService])
], ScrumboardLabelSelectorComponent);
export { ScrumboardLabelSelectorComponent };
//# sourceMappingURL=label-selector.component.js.map