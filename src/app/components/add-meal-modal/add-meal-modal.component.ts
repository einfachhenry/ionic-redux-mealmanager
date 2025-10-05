import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateMealDto } from '../../models/meal.model';

@Component({
  selector: 'app-add-meal-modal',
  templateUrl: './add-meal-modal.component.html',
  styleUrls: ['./add-meal-modal.component.scss'],
  standalone: false
})
export class AddMealModalComponent {
  mealForm: FormGroup;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    this.mealForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: [new Date().toISOString(), Validators.required]
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  saveMeal() {
    if (this.mealForm.valid) {
      const mealData: CreateMealDto = {
        title: this.mealForm.get('title')?.value,
        date: this.mealForm.get('date')?.value
      };
      this.modalController.dismiss(mealData, 'save');
    }
  }
}