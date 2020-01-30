import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
let FileManagerDetailsSidebarComponent = class FileManagerDetailsSidebarComponent {
    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     */
    constructor(_fileManagerService) {
        this._fileManagerService = _fileManagerService;
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
        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selected => {
            this.selected = selected;
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
};
FileManagerDetailsSidebarComponent = tslib_1.__decorate([
    Component({
        selector: 'file-manager-details-sidebar',
        templateUrl: './details.component.html',
        styleUrls: ['./details.component.scss'],
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FileManagerService])
], FileManagerDetailsSidebarComponent);
export { FileManagerDetailsSidebarComponent };
//# sourceMappingURL=details.component.js.map