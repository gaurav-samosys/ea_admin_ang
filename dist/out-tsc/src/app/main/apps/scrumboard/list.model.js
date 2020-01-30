import { FuseUtils } from '@fuse/utils';
export class List {
    /**
     * Constructor
     *
     * @param list
     */
    constructor(list) {
        this.id = list.id || FuseUtils.generateGUID();
        this.name = list.name || '';
        this.idCards = [];
    }
}
//# sourceMappingURL=list.model.js.map