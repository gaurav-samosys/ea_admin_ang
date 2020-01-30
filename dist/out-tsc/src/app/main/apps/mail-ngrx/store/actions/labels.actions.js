export const GET_LABELS = '[LABELS] GET LABELS';
export const GET_LABELS_SUCCESS = '[LABELS] GET LABELS SUCCESS';
export const GET_LABELS_FAILED = '[LABELS] GET LABELS FAILED';
/**
 * Get Labels
 */
export class GetLabels {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_LABELS;
    }
}
/**
 * Get Labels Success
 */
export class GetLabelsSuccess {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_LABELS_SUCCESS;
    }
}
/**
 * Get Labels Failed
 */
export class GetLabelsFailed {
    constructor(payload) {
        this.payload = payload;
        this.type = GET_LABELS_FAILED;
    }
}
//# sourceMappingURL=labels.actions.js.map