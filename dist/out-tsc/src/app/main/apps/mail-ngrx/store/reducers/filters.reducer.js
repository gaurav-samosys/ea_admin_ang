import * as FiltersActions from 'app/main/apps/mail-ngrx/store/actions/filters.actions';
export const FiltersInitialState = {
    entities: {},
    loading: false,
    loaded: false
};
export function FiltersReducer(state = FiltersInitialState, action) {
    switch (action.type) {
        case FiltersActions.GET_FILTERS:
            return Object.assign({}, state, { loading: true, loaded: false });
        case FiltersActions.GET_FILTERS_SUCCESS:
            const filters = action.payload;
            const entities = filters.reduce((_entities, filter) => {
                return Object.assign({}, _entities, { [filter.id]: filter });
            }, {});
            return Object.assign({}, state, { loading: false, loaded: true, entities });
        case FiltersActions.GET_FILTERS_FAILED:
            return Object.assign({}, state, { loading: false, loaded: false });
        default:
            return state;
    }
}
//# sourceMappingURL=filters.reducer.js.map