import { createSelector } from '@ngrx/store';
import { getMailAppState } from 'app/main/apps/mail-ngrx/store/reducers';
export const getFoldersState = createSelector(getMailAppState, (state) => state.folders);
export const getFolders = createSelector(getFoldersState, (state) => state.entities);
export const getFoldersLoaded = createSelector(getFoldersState, (state) => state.loaded);
export const getFoldersArr = createSelector(getFolders, (entities) => Object.keys(entities).map((id) => entities[id]));
//# sourceMappingURL=folders.selectors.js.map