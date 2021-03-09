import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();


 private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('Another Test Recipe', 'This is simply test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')
  ];

  // if i were to return it like this, i actually return the direct refernece to this array..well
  // if we now change something on this array, we will change it on the array in this service
  // slice() without value return a new arry which is an exact copy of the one in this service file
  // we get a copy!!
  getRecipes(){
    return this.recipes.slice();
  }
}
