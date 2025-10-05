import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as MealActions from './meal.actions';
import { MealService } from '../../services/meal.service';
import { Meal } from '../../models/meal.model';

@Injectable()
export class MealEffects {
  // No loadMeals$ effect since ngrx-store-localstorage handles rehydration

  addMeal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.addMeal),
      mergeMap(action =>
        this.mealService.addMeal(action.meal).pipe(
          map((meal: Meal) => MealActions.addMealSuccess({ meal }))
        )
      )
    )
  );

  deleteMeal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MealActions.deleteMeal),
      mergeMap(action =>
        this.mealService.deleteMeal(action.id).pipe(
          map(() => MealActions.deleteMealSuccess({ id: action.id }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private mealService: MealService
  ) {}
}