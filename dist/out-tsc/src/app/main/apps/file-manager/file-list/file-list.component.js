import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FileManagerService } from 'app/main/apps/file-manager/file-manager.service';
let FileManagerFileListComponent = class FileManagerFileListComponent {
    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(_fileManagerService, _fuseSidebarService) {
        this._fileManagerService = _fileManagerService;
        this._fuseSidebarService = _fuseSidebarService;
        this.displayedColumns = ['icon', 'name', 'type', 'owner', 'size', 'modified', 'detail-button'];
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
        this.dataSource = new FilesDataSource(this._fileManagerService);
        this._fileManagerService.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(files => {
            this.files = files;
        });
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * On select
     *
     * @param selected
     */
    onSelect(selected) {
        this._fileManagerService.onFileSelected.next(selected);
    }
    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name) {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
};
FileManagerFileListComponent = tslib_1.__decorate([
    Component({
        selector: 'file-list',
        templateUrl: './file-list.component.html',
        styleUrls: ['./file-list.component.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [FileManagerService,
        FuseSidebarService])
], FileManagerFileListComponent);
export { FileManagerFileListComponent };
export class FilesDataSource extends DataSource {
    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     */
    constructor(_fileManagerService) {
        super();
        this._fileManagerService = _fileManagerService;
    }
    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect() {
        return this._fileManagerService.onFilesChanged;
    }
    /**
     * Disconnect
     */
    disconnect() {
    }
}
//# sourceMappingURL=file-list.component.js.map