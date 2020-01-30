import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MailsReducer } from './mails.reducer';
import { FoldersReducer } from './folders.reducer';
import { FiltersReducer } from './filters.reducer';
import { LabelsReducer } from './labels.reducer';
export const getMailAppState = createFeatureSelector('mail-app');
export const getAppState = createSelector(getMailAppState, (state) => state);
export const reducers = {
    mails: MailsReducer,
    folders: FoldersReducer,
    filters: FiltersReducer,
    labels: LabelsReducer
};
export * from './mails.reducer';
export * from './folders.reducer';
export * from './filters.reducer';
export * from './labels.reducer';
//# sourceMappingURL=index.js.map