import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Meal, CreateMealDto } from '../models/meal.model';
import { nanoid } from 'nanoid'

@Injectable({
  providedIn: 'root'
})
export class MealService {
  constructor() {}
  
  addMeal(createMealDto: CreateMealDto): Observable<Meal> {
    const meal: Meal = {
      id: nanoid(),
      title: createMealDto.title,
      date: createMealDto.date,
      createdAt: new Date()
    };
    
    return of(meal);
  }

  deleteMeal(id: string): Observable<void> {
    return of(undefined);
  }
}