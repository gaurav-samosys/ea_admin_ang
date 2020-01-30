export const GET_FILTERS = '[FILTERS] GET FILTERS';
export const GET_FILTERS_SUCCESS = '[FILTERS] GET FILTERS SUCCESS';
export const GET_FILTERS_FAILED = '[FILTERS] GET FILTERS FAILED';
/**
 * Get Filters
 */
export class GetFilters {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_FILTERS;
    }
}
/**
 * Get Filters Success
 */
export class GetFiltersSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_FILTERS_SUCCESS;
    }
}
/**
 * Get Filters Failed
 */
export class GetFiltersFailed {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_FILTERS_FAILED;
    }
}
//# sourceMappingURL=filters.actions.js.map