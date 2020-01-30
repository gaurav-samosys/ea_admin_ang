import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Footer row table
 */
let TableFooterRowExample = class TableFooterRowExample {
    /**
     * @title Footer row table
     */
    constructor() {
        this.displayedColumns = ['item', 'cost'];
        this.transactions = [
            { item: 'Beach ball', cost: 4 },
            { item: 'Towel', cost: 5 },
            { item: 'Frisbee', cost: 2 },
            { item: 'Sunscreen', cost: 4 },
            { item: 'Cooler', cost: 25 },
            { item: 'Swim suit', cost: 15 },
        ];
    }
    /** Gets the total cost of all transactions. */
    getTotalCost() {
        return this.transactions.map(t => t.cost).reduce((acc, value) => acc + value, 0);
    }
};
TableFooterRowExample = tslib_1.__decorate([
    Component({
        selector: 'table-footer-row-example',
        styleUrls: ['table-footer-row-example.css'],
        templateUrl: 'table-footer-row-example.html',
    })
], TableFooterRowExample);
export { TableFooterRowExample };
//# sourceMappingURL=table-footer-row-example.js.map