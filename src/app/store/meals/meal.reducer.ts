import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Meal } from '../../models/meal.model';
import * as MealActions from './meal.actions';

export interface MealState extends EntityState<Meal> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Meal> = createEntityAdapter<Meal>();

export const initialState: MealState = adapter.getInitialState({
  loading: false,
  error: null
});

export const mealReducer = createReducer(
  initialState,
  on(MealActions.loadMeals, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MealActions.loadMealsSuccess, (state, { meals }) =>
    adapter.setAll(meals, {
      ...state,
      loading: false,
      error: null
    })
  ),
  on(MealActions.addMeal, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MealActions.addMealSuccess, (state, { meal }) =>
    adapter.addOne(meal, {
      ...state,
      loading: false,
      error: null
    })
  ),
  on(MealActions.deleteMeal, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MealActions.deleteMealSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
      error: null
    })
  )
);