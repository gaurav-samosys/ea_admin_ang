import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Table with sticky columns
 */
let TableStickyColumnsExample = class TableStickyColumnsExample {
    /**
     * @title Table with sticky columns
     */
    constructor() {
        this.displayedColumns = ['name', 'position', 'weight', 'symbol', 'position', 'weight', 'symbol', 'star'];
        this.dataSource = ELEMENT_DATA;
    }
};
TableStickyColumnsExample = tslib_1.__decorate([
    Component({
        selector: 'table-sticky-columns-example',
        styleUrls: ['table-sticky-columns-example.css'],
        templateUrl: 'table-sticky-columns-example.html',
    })
], TableStickyColumnsExample);
export { TableStickyColumnsExample };
const ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
//# sourceMappingURL=table-sticky-columns-example.js.map