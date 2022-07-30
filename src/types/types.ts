export interface IMeals {
  id: string;
  name: string;
  description: string;
  price: number;
}
export interface ICart {
  id: string;
  name: string;
  amount: number;
  price: number;
}

export interface IUserData {
  name: string;
  street: string;
  city: string;
  postalCode: number;
}
