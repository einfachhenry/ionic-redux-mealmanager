import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MealState, adapter } from './meal.reducer';

export const selectMealState = createFeatureSelector<MealState>('meals');

const { selectAll, selectEntities, selectIds, selectTotal } = adapter.getSelectors();

export const selectAllMeals = createSelector(selectMealState, selectAll);

export const selectAllMealsSorted = createSelector(
  selectAllMeals,
  (meals) => meals.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
);

export const selectMealEntities = createSelector(selectMealState, selectEntities);

export const selectMealIds = createSelector(selectMealState, selectIds);

export const selectTotalMeals = createSelector(selectMealState, selectTotal);

export const selectMealLoading = createSelector(
  selectMealState,
  (state) => state.loading
);

export const selectMealError = createSelector(
  selectMealState,
  (state) => state.error
);

export const selectMealById = (id: string) =>
  createSelector(selectMealEntities, (entities) => entities[id]);