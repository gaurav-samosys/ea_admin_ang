import { createSelector } from '@ngrx/store';
import { getMailAppState } from 'app/main/apps/mail-ngrx/store/reducers';
export const getFiltersState = createSelector(getMailAppState, (state) => state.filters);
export const getFilters = createSelector(getFiltersState, (state) => state.entities);
export const getFiltersLoaded = createSelector(getFiltersState, (state) => state.loaded);
export const getFiltersArr = createSelector(getFilters, (entities) => Object.keys(entities).map((id) => entities[id]));
//# sourceMappingURL=filters.selectors.js.map