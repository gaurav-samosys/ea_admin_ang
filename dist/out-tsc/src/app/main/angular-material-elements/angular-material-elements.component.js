import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { COMPONENT_MAP } from 'app/main/angular-material-elements/example-components';
let AngularMaterialElementsComponent = class AngularMaterialElementsComponent {
    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     */
    constructor(_activatedRoute) {
        this._activatedRoute = _activatedRoute;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    /**
     * On init
     */
    ngOnInit() {
        this._activatedRoute.params
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
            this.id = params['id'];
            const _title = this.id.replace('-', ' ');
            this.title = _title.charAt(0).toUpperCase() + _title.substring(1);
            this.examples = COMPONENT_MAP[this.id];
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
AngularMaterialElementsComponent = tslib_1.__decorate([
    Component({
        selector: 'angular-material',
        templateUrl: './angular-material-elements.component.html',
        styleUrls: ['./angular-material-elements.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [ActivatedRoute])
], AngularMaterialElementsComponent);
export { AngularMaterialElementsComponent };
//# sourceMappingURL=angular-material-elements.component.js.map