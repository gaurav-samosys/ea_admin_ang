import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Table with multiple header and footer rows
 */
let TableMultipleHeaderFooterExample = class TableMultipleHeaderFooterExample {
    /**
     * @title Table with multiple header and footer rows
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
TableMultipleHeaderFooterExample = tslib_1.__decorate([
    Component({
        selector: 'table-multiple-header-footer-example',
        styleUrls: ['table-multiple-header-footer-example.css'],
        templateUrl: 'table-multiple-header-footer-example.html',
    })
], TableMultipleHeaderFooterExample);
export { TableMultipleHeaderFooterExample };
//# sourceMappingURL=table-multiple-header-footer-example.js.map