import * as LabelsActions from 'app/main/apps/mail-ngrx/store/actions/labels.actions';
export const LabelsInitialState = {
    entities: {},
    loading: false,
    loaded: false
};
export function LabelsReducer(state = LabelsInitialState, action) {
    switch (action.type) {
        case LabelsActions.GET_LABELS:
            return Object.assign({}, state, { loading: true, loaded: false });
        case LabelsActions.GET_LABELS_SUCCESS:
            const labels = action.payload;
            const entities = labels.reduce((_entities, label) => {
                return Object.assign({}, _entities, { [label.id]: label });
            }, {});
            return Object.assign({}, state, { loading: false, loaded: true, entities });
        case LabelsActions.GET_LABELS_FAILED:
            return Object.assign({}, state, { loading: false, loaded: false });
        default:
            return state;
    }
}
//# sourceMappingURL=labels.reducer.js.map