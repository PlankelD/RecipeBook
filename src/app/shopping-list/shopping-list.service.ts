import { Ingredient  } from "../shared/ingredient.model";
import {Subject} from 'rxjs';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();

  startedEditing = new Subject<number>()


 private ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
  ];


  // it is a copy but if we receive a new Ingredinet only a copy is there. so we have to inform my component that new data
  // are available: ==> ingredientsChanged = new Subject<Ingredient[]>(); *
  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    //*
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  // the spread operator which alows us to basically turn an array of elements into alis of elements because
  addIngredients(ingredients: Ingredient[]){
    //spread operator: umwandlung von einem Array of elements into a list of elements push can handle multiple objects but not an array
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
