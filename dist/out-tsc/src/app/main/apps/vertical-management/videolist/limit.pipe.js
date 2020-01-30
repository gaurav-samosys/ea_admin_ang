import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
let LimitPipe = class LimitPipe {
    transform(value, args) {
        // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
        // let trail = args.length > 1 ? args[1] : '...';
        let limit = args ? parseInt(args, 10) : 10;
        let trail = '...';
        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
};
LimitPipe = tslib_1.__decorate([
    Pipe({
        name: 'limit'
    })
], LimitPipe);
export { LimitPipe };
//# sourceMappingURL=limit.pipe.js.map