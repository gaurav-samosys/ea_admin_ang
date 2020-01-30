import * as FoldersActions from 'app/main/apps/mail-ngrx/store/actions/folders.actions';
export const FoldersInitialState = {
    entities: {},
    loading: false,
    loaded: false
};
export function FoldersReducer(state = FoldersInitialState, action) {
    switch (action.type) {
        case FoldersActions.GET_FOLDERS:
            return Object.assign({}, state, { loading: true, loaded: false });
        case FoldersActions.GET_FOLDERS_SUCCESS:
            const folders = action.payload;
            const entities = folders.reduce((_entities, folder) => {
                return Object.assign({}, _entities, { [folder.id]: folder });
            }, {});
            return Object.assign({}, state, { loading: false, loaded: true, entities });
        case FoldersActions.GET_FOLDERS_FAILED:
            return Object.assign({}, state, { loading: false, loaded: false });
        default:
            return state;
    }
}
//# sourceMappingURL=folders.reducer.js.map