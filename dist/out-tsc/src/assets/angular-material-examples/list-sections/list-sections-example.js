import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
/**
 * @title List with sections
 */
let ListSectionsExample = class ListSectionsExample {
    /**
     * @title List with sections
     */
    constructor() {
        this.folders = [
            {
                name: 'Photos',
                updated: new Date('1/1/16'),
            },
            {
                name: 'Recipes',
                updated: new Date('1/17/16'),
            },
            {
                name: 'Work',
                updated: new Date('1/28/16'),
            }
        ];
        this.notes = [
            {
                name: 'Vacation Itinerary',
                updated: new Date('2/20/16'),
            },
            {
                name: 'Kitchen Remodel',
                updated: new Date('1/18/16'),
            }
        ];
    }
};
ListSectionsExample = tslib_1.__decorate([
    Component({
        selector: 'list-sections-example',
        styleUrls: ['list-sections-example.css'],
        templateUrl: 'list-sections-example.html',
    })
], ListSectionsExample);
export { ListSectionsExample };
//# sourceMappingURL=list-sections-example.js.map