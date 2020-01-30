import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
let KnowledgeBaseArticleComponent = class KnowledgeBaseArticleComponent {
    /**
     * Constructor
     *
     * @param {MatDialogRef<KnowledgeBaseArticleComponent>} matDialogRef
     * @param _data
     */
    constructor(matDialogRef, _data) {
        this.matDialogRef = matDialogRef;
        this._data = _data;
    }
};
KnowledgeBaseArticleComponent = tslib_1.__decorate([
    Component({
        selector: 'knowledge-base-article',
        templateUrl: './article.component.html',
        styleUrls: ['./article.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
    tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
], KnowledgeBaseArticleComponent);
export { KnowledgeBaseArticleComponent };
//# sourceMappingURL=article.component.js.map