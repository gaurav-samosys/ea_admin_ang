import * as tslib_1 from "tslib";
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
const TREE_DATA = [
    {
        name: 'Fruit',
        children: [
            { name: 'Apple' },
            { name: 'Banana' },
            { name: 'Fruit loops' },
        ]
    }, {
        name: 'Vegetables',
        children: [
            {
                name: 'Green',
                children: [
                    { name: 'Broccoli' },
                    { name: 'Brussel sprouts' },
                ]
            }, {
                name: 'Orange',
                children: [
                    { name: 'Pumpkins' },
                    { name: 'Carrots' },
                ]
            },
        ]
    },
];
/**
 * @title Tree with nested nodes
 */
let TreeNestedOverviewExample = class TreeNestedOverviewExample {
    constructor() {
        this.treeControl = new NestedTreeControl(node => node.children);
        this.dataSource = new MatTreeNestedDataSource();
        this.hasChild = (_, node) => !!node.children && node.children.length > 0;
        this.dataSource.data = TREE_DATA;
    }
};
TreeNestedOverviewExample = tslib_1.__decorate([
    Component({
        selector: 'tree-nested-overview-example',
        templateUrl: 'tree-nested-overview-example.html',
        styleUrls: ['tree-nested-overview-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [])
], TreeNestedOverviewExample);
export { TreeNestedOverviewExample };
//# sourceMappingURL=tree-nested-overview-example.js.map