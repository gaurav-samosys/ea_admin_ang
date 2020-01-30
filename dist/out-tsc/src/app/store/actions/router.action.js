export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export class Go {
    /**
     * Constructor
     *
     * @param {{path: any[]; query?: object; extras?: NavigationExtras}} payload
     */
    constructor(payload) {
        this.payload = payload;
        this.type = GO;
    }
}
export class Back {
    constructor() {
        this.type = BACK;
    }
}
export class Forward {
    constructor() {
        this.type = FORWARD;
    }
}
//# sourceMappingURL=router.action.js.map