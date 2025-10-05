import { createAction, props } from '@ngrx/store';
import { Meal, CreateMealDto } from '../../models/meal.model';

export const loadMeals = createAction('[Meal] Load Meals');

export const loadMealsSuccess = createAction(
  '[Meal] Load Meals Success',
  props<{ meals: Meal[] }>()
);

export const addMeal = createAction(
  '[Meal] Add Meal',
  props<{ meal: CreateMealDto }>()
);

export const addMealSuccess = createAction(
  '[Meal] Add Meal Success',
  props<{ meal: Meal }>()
);

export const deleteMeal = createAction(
  '[Meal] Delete Meal',
  props<{ id: string }>()
);

export const deleteMealSuccess = createAction(
  '[Meal] Delete Meal Success',
  props<{ id: string }>()
);