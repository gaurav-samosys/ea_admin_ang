import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
let ScrumboardBoardCardComponent = class ScrumboardBoardCardComponent {
    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(_activatedRoute) {
        this._activatedRoute = _activatedRoute;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        this.board = this._activatedRoute.snapshot.data.board;
        this.card = this.board.cards.filter((card) => {
            return this.cardId === card.id;
        })[0];
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Is the card overdue?
     *
     * @param cardDate
     * @returns {boolean}
     */
    isOverdue(cardDate) {
        return moment() > moment(new Date(cardDate));
    }
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], ScrumboardBoardCardComponent.prototype, "cardId", void 0);
ScrumboardBoardCardComponent = tslib_1.__decorate([
    Component({
        selector: 'scrumboard-board-card',
        templateUrl: './card.component.html',
        styleUrls: ['./card.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
], ScrumboardBoardCardComponent);
export { ScrumboardBoardCardComponent };
//# sourceMappingURL=card.component.js.map