import * as tslib_1 from "tslib";
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
/**
 * @title Chips Drag and Drop
 */
let ChipsDragDropExample = class ChipsDragDropExample {
    /**
     * @title Chips Drag and Drop
     */
    constructor() {
        this.vegetables = [
            { name: 'apple' },
            { name: 'banana' },
            { name: 'strawberry' },
            { name: 'orange' },
            { name: 'kiwi' },
            { name: 'cherry' },
        ];
    }
    drop(event) {
        moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
    }
};
ChipsDragDropExample = tslib_1.__decorate([
    Component({
        selector: 'chips-drag-drop-example',
        templateUrl: 'chips-drag-and-drop-example.html',
        styleUrls: ['chips-drag-and-drop-example.css']
    })
], ChipsDragDropExample);
export { ChipsDragDropExample };
//# sourceMappingURL=chips-drag-and-drop-example.js.map