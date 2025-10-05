export interface Meal {
  id: string;
  title: string;
  date: string;
  createdAt: Date;
}

export interface CreateMealDto {
  title: string;
  date: string;
}