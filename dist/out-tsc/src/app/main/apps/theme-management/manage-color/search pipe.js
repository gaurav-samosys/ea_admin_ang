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
// (val.id.toLocaleLowerCase().includes(args)) ||   
//# sourceMappingURL=search pipe.js.map