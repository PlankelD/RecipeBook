import { Injectable, EventEmitter } from "@angular/core";
import { Ingredient  } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
// static Ingredients here
export class ShoppingListService{
  ingredientsChanged = new EventEmitter<Ingredient[]>();
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
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]){
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients.slice())
  }
}
