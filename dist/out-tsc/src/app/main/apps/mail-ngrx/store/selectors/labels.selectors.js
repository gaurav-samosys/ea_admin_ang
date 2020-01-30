import { createSelector } from '@ngrx/store';
import { getMailAppState } from 'app/main/apps/mail-ngrx/store/reducers';
export const getLabelsState = createSelector(getMailAppState, (state) => state.labels);
export const getLabels = createSelector(getLabelsState, (state) => state.entities);
export const getLabelsLoaded = createSelector(getLabelsState, (state) => state.loaded);
export const getLabelsArr = createSelector(getLabels, (entities) => Object.keys(entities).map((id) => entities[id]));
//# sourceMappingURL=labels.selectors.js.map