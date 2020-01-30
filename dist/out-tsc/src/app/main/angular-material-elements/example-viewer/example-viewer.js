import * as tslib_1 from "tslib";
import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';
import { fuseAnimations } from '@fuse/animations/index';
import { FuseCopierService } from '@fuse/services/copier.service';
import { EXAMPLE_COMPONENTS } from 'app/main/angular-material-elements/example-components';
let ExampleViewerComponent = class ExampleViewerComponent {
    /**
     * Constructor
     *
     * @param {MatSnackBar} _matSnackBar
     * @param {FuseCopierService} _fuseCopierService
     * @param {ComponentFactoryResolver} _componentFactoryResolver
     */
    constructor(_matSnackBar, _fuseCopierService, _componentFactoryResolver) {
        this._matSnackBar = _matSnackBar;
        this._fuseCopierService = _fuseCopierService;
        this._componentFactoryResolver = _componentFactoryResolver;
        // Set the defaults
        this.selectedIndex = 0;
        this.showSource = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Container
     *
     * @param {ViewContainerRef} value
     */
    set container(value) {
        this._previewContainer = value;
    }
    get container() {
        return this._previewContainer;
    }
    /**
     * Example
     *
     * @param {string} example
     */
    set example(example) {
        if (example && EXAMPLE_COMPONENTS[example]) {
            this._example = example;
            this.exampleData = EXAMPLE_COMPONENTS[example];
        }
        else {
            console.log('MISSING EXAMPLE: ', example);
        }
    }
    get example() {
        return this._example;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After view init
     */
    ngAfterViewInit() {
        setTimeout(() => {
            const cmpFactory = this._componentFactoryResolver.resolveComponentFactory(this.exampleData.component);
            this.previewRef = this._previewContainer.createComponent(cmpFactory);
        }, 0);
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        if (this.previewRef) {
            this.previewRef.destroy();
        }
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle source view
     */
    toggleSourceView() {
        this.showSource = !this.showSource;
    }
    /**
     * Copy the source
     *
     * @param {string} text
     */
    copySource(text) {
        if (this._fuseCopierService.copyText(text)) {
            this._matSnackBar.open('Code copied', '', { duration: 2500 });
        }
        else {
            this._matSnackBar.open('Copy failed. Please try again!', '', { duration: 2500 });
        }
    }
};
tslib_1.__decorate([
    ViewChild('previewContainer', { read: ViewContainerRef, static: false }),
    tslib_1.__metadata("design:type", ViewContainerRef)
], ExampleViewerComponent.prototype, "_previewContainer", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String),
    tslib_1.__metadata("design:paramtypes", [String])
], ExampleViewerComponent.prototype, "example", null);
ExampleViewerComponent = tslib_1.__decorate([
    Component({
        selector: 'example-viewer',
        templateUrl: './example-viewer.html',
        styleUrls: ['./example-viewer.scss'],
        encapsulation: ViewEncapsulation.None,
        animations: fuseAnimations
    }),
    tslib_1.__metadata("design:paramtypes", [MatSnackBar,
        FuseCopierService,
        ComponentFactoryResolver])
], ExampleViewerComponent);
export { ExampleViewerComponent };
//# sourceMappingURL=example-viewer.js.map