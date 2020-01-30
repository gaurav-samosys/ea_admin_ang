import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
/**
 * @title SVG icons
 */
let IconSvgExample = class IconSvgExample {
    constructor(iconRegistry, sanitizer) {
        iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
    }
};
IconSvgExample = tslib_1.__decorate([
    Component({
        selector: 'icon-svg-example',
        templateUrl: 'icon-svg-example.html',
        styleUrls: ['icon-svg-example.css'],
    }),
    tslib_1.__metadata("design:paramtypes", [MatIconRegistry, DomSanitizer])
], IconSvgExample);
export { IconSvgExample };
//# sourceMappingURL=icon-svg-example.js.map