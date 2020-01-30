import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { FuseUtils } from '@fuse/utils';
import { FaqService } from 'app/main/pages/faq/faq.service';
let FaqComponent = class FaqComponent {
    /**
     * Constructor
     *
     * @param {FaqService} _faqService
     */
    constructor(_faqService) {
        this._faqService = _faqService;
        // Set the defaults
        this.searchInput = new FormControl('');
        this.step = 0;
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
        this._faqService.onFaqsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(response => {
            this.faqs = response;
            this.faqsFiltered = response;
        });
        this.searchInput.valueChanges
            .pipe(takeUntil(this._unsubscribeAll), debounceTime(300), distinctUntilChanged())
            .subscribe(searchText => {
            this.faqsFiltered = FuseUtils.filterArrayByString(this.faqs, searchText);
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
     * Set step
     *
     * @param {number} index
     */
    setStep(index) {
        this.step = index;
    }
    /**
     * Next step
     */
    nextStep() {
        this.step++;
    }
    /**
     * Previous step
     */
    prevStep() {
        this.step--;
    }
};
FaqComponent = tslib_1.__decorate([
    Component({
        selector: 'faq',
        templateUrl: './faq.component.html',
        styleUrls: ['./faq.component.scss'],
        encapsulation: ViewEncapsulation.None
    }),
    tslib_1.__metadata("design:paramtypes", [FaqService])
], FaqComponent);
export { FaqComponent };
//# sourceMappingURL=faq.component.js.map