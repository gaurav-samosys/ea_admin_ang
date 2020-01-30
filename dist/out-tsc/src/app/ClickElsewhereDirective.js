import * as tslib_1 from "tslib";
import { Directive, EventEmitter, ElementRef, HostListener, Output } from '@angular/core';
let ClickElsewhereDirective = class ClickElsewhereDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.clickElsewhere = new EventEmitter();
    }
    onDocumentClick(event) {
        const targetElement = event.target;
        // Check if the click was outside the element
        if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
            this.clickElsewhere.emit(event);
            //console.log( this.clickElsewhere.emit(event))
        }
    }
};
tslib_1.__decorate([
    Output(),
    tslib_1.__metadata("design:type", Object)
], ClickElsewhereDirective.prototype, "clickElsewhere", void 0);
tslib_1.__decorate([
    HostListener('document:click', ['$event']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [MouseEvent]),
    tslib_1.__metadata("design:returntype", void 0)
], ClickElsewhereDirective.prototype, "onDocumentClick", null);
ClickElsewhereDirective = tslib_1.__decorate([
    Directive({ selector: '[clickElsewhere]' }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], ClickElsewhereDirective);
export { ClickElsewhereDirective };
//# sourceMappingURL=ClickElsewhereDirective.js.map