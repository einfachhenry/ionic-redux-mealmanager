import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Meal } from '../models/meal.model';
import { selectAllMealsSorted, selectMealLoading } from '../store/meals/meal.selectors';
import * as MealActions from '../store/meals/meal.actions';
import { AddMealModalComponent } from '../components/add-meal-modal/add-meal-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  meals$: Observable<Meal[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private modalController: ModalController,
    private alertController: AlertController
  ) {
    this.meals$ = this.store.select(selectAllMealsSorted);
    this.loading$ = this.store.select(selectMealLoading);
  }

  ngOnInit() {
    // Check what's in localStorage for debugging
    console.log('localStorage meals:', localStorage.getItem('meals'));
  }

  async openAddMealModal() {
    const modal = await this.modalController.create({
      component: AddMealModalComponent
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'save' && result.data) {
        this.store.dispatch(MealActions.addMeal({ meal: result.data }));
      }
    });

    return await modal.present();
  }

  async deleteMeal(id: string, mealTitle: string) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${mealTitle}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.store.dispatch(MealActions.deleteMeal({ id }));
          }
        }
      ]
    });

    await alert.present();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  trackByFn(index: number, item: Meal): string {
    return item.id;
  }
}
