import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { KnowledgeBaseService } from 'app/main/pages/knowledge-base/knowledge-base.service';
import { KnowledgeBaseArticleComponent } from 'app/main/pages/knowledge-base/dialogs/article/article.component';
let KnowledgeBaseComponent = class KnowledgeBaseComponent {
    /**
     * Constructor
     *
     * @param {KnowledgeBaseService} _knowledgeBaseService
     * @param {MatDialog} _matDialog
     */
    constructor(_knowledgeBaseService, _matDialog) {
        this._knowledgeBaseService = _knowledgeBaseService;
        this._matDialog = _matDialog;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        this._knowledgeBaseService.onKnowledgeBaseChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
            this.knowledgeBase = response;
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Read article
     *
     * @param article
     */
    readArticle(article) {
        this._matDialog.open(KnowledgeBaseArticleComponent, {
            panelClass: 'knowledgebase-article-dialog',
            data: { article: article }
        });
    }
};
KnowledgeBaseComponent = tslib_1.__decorate([
    Component({
        selector: 'knowledge-base',
        templateUrl: './knowledge-base.component.html',
        styleUrls: ['./knowledge-base.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [KnowledgeBaseService,
        MatDialog])
], KnowledgeBaseComponent);
export { KnowledgeBaseComponent };
//# sourceMappingURL=knowledge-base.component.js.map