import { Ingredient  } from "../shared/ingredient.model";
import {Subject} from 'rxjs';
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
// static Ingredients here
export class ShoppingListService{
  ingredientsChanged = new Subject<Ingredient[]>();
 private ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10),
  ];


  //shopping-list holt sich mit der Methode die Ingredients. eine Kopie wird verschickt mittels service
  getIngredients(){
    return this.ingredients.slice();
  }
  // 1.Zeile :neue ingredients, natürlich vom Tyo Ingredient werden gepusht für shopping edit
  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
