import { FuseUtils } from '@fuse/utils';
import { createSelector } from '@ngrx/store';
import { getMailAppState } from 'app/main/apps/mail-ngrx/store/reducers';
export const getMailsState = createSelector(getMailAppState, (state) => state.mails);
export const getMails = createSelector(getMailsState, (state) => state.entities);
export const getMailsLoaded = createSelector(getMailsState, (state) => state.loaded);
export const getSearchText = createSelector(getMailsState, (state) => state.searchText);
export const getMailsArr = createSelector(getMails, getSearchText, (entities, searchText) => {
    const arr = Object.keys(entities).map((id) => entities[id]);
    return FuseUtils.filterArrayByString(arr, searchText);
});
export const getCurrentMail = createSelector(getMailsState, (state) => state.currentMail);
export const getSelectedMailIds = createSelector(getMailsState, (state) => state.selectedMailIds);
//# sourceMappingURL=mails.selectors.js.map