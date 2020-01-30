import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let SearchPipe = class SearchPipe {
    transform(value, args) {
        if (!args) {
            return value;
        }
        return value.filter((val) => {
            let rVal = (val.company_name.toLocaleLowerCase().includes(args));
            return rVal;
        });
    }
};
SearchPipe = tslib_1.__decorate([
    Pipe({
        name: 'customerEmailFilter'
    })
], SearchPipe);
export { SearchPipe };
//# sourceMappingURL=mobile-search pipe.js.map