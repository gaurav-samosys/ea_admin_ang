import * as MailsActions from 'app/main/apps/mail-ngrx/store/actions/mails.actions';
export const MailsInitialState = {
    entities: {},
    currentMail: null,
    selectedMailIds: [],
    searchText: '',
    loading: false,
    loaded: false
};
export function MailsReducer(state = MailsInitialState, action) {
    switch (action.type) {
        case MailsActions.GET_MAILS:
            {
                return Object.assign({}, state, { loading: true });
            }
        case MailsActions.GET_MAILS_SUCCESS:
            {
                const mails = action.payload.mails;
                const loaded = action.payload.loaded;
                const entities = mails.reduce((_entities, mail) => {
                    return Object.assign({}, _entities, { [mail.id]: mail });
                }, {});
                return Object.assign({}, state, { entities, loading: false, loaded });
            }
        case MailsActions.GET_MAILS_FAILED:
            {
                return Object.assign({}, state, { loading: false, loaded: false });
            }
        case MailsActions.SET_CURRENT_MAIL_SUCCESS:
            {
                return Object.assign({}, state, { currentMail: action.payload });
            }
        case MailsActions.UPDATE_MAIL_SUCCESS:
            {
                return Object.assign({}, state, { entities: Object.assign({}, state.entities, { [action.payload.id]: action.payload }) });
            }
        case MailsActions.SET_SEARCH_TEXT:
            {
                return Object.assign({}, state, { searchText: action.payload });
            }
        case MailsActions.TOGGLE_IN_SELECTED_MAILS:
            {
                const mailId = action.payload;
                let selectedMailIds = [...state.selectedMailIds];
                if (selectedMailIds.find(id => id === mailId) !== undefined) {
                    selectedMailIds = selectedMailIds.filter(id => id !== mailId);
                }
                else {
                    selectedMailIds = [...selectedMailIds, mailId];
                }
                return Object.assign({}, state, { selectedMailIds });
            }
        case MailsActions.SELECT_ALL_MAILS:
            {
                const arr = Object.keys(state.entities).map(k => state.entities[k]);
                const selectedMailIds = arr.map(mail => mail.id);
                return Object.assign({}, state, { selectedMailIds });
            }
        case MailsActions.DESELECT_ALL_MAILS:
            {
                return Object.assign({}, state, { selectedMailIds: [] });
            }
        case MailsActions.SELECT_MAILS_BY_PARAMETER:
            {
                const filter = action.payload;
                const arr = Object.keys(state.entities).map(k => state.entities[k]);
                const selectedMailIds = arr.filter(mail => mail[filter.parameter] === filter.value)
                    .map(mail => mail.id);
                return Object.assign({}, state, { selectedMailIds });
            }
        case MailsActions.SET_FOLDER_ON_SELECTED_MAILS:
            {
                const entities = Object.assign({}, state.entities);
                state.selectedMailIds.map(id => {
                    entities[id] = Object.assign({}, entities[id], { folder: action.payload });
                });
                return Object.assign({}, state, { entities });
            }
        default:
            return state;
    }
}
//# sourceMappingURL=mails.reducer.js.map