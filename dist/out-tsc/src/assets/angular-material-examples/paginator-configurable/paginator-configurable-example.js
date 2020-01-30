import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title Configurable paginator
 */
let PaginatorConfigurableExample = class PaginatorConfigurableExample {
    /**
     * @title Configurable paginator
     */
    constructor() {
        // MatPaginator Inputs
        this.length = 100;
        this.pageSize = 10;
        this.pageSizeOptions = [5, 10, 25, 100];
    }
    setPageSizeOptions(setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
};
PaginatorConfigurableExample = tslib_1.__decorate([
    Component({
        selector: 'paginator-configurable-example',
        templateUrl: 'paginator-configurable-example.html',
        styleUrls: ['paginator-configurable-example.css'],
    })
], PaginatorConfigurableExample);
export { PaginatorConfigurableExample };
//# sourceMappingURL=paginator-configurable-example.js.map