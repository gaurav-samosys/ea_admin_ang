import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Dynamic grid-list
 */
let GridListDynamicExample = class GridListDynamicExample {
    /**
     * @title Dynamic grid-list
     */
    constructor() {
        this.tiles = [
            { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
            { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
            { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
            { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
        ];
    }
};
GridListDynamicExample = tslib_1.__decorate([
    Component({
        selector: 'grid-list-dynamic-example',
        templateUrl: 'grid-list-dynamic-example.html',
        styleUrls: ['grid-list-dynamic-example.css'],
    })
], GridListDynamicExample);
export { GridListDynamicExample };
//# sourceMappingURL=grid-list-dynamic-example.js.map