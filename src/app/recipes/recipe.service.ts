import { Injectable} from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

//maybe only  @Injectable()
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

 private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_960_720.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say',
      'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat',2)
      ])
  ];

  constructor(private slService: ShoppingListService){}
  // acces from outise. return the direct refernce to this array
  // change in this array, will change it on the array in this service
  // slice() without arguments return a new array wich is an exact copy of the one in this service file
  getRecipes(){
    return this.recipes.slice();
  }

  // loading a single recipe by id. The detail component listenig
  getRecipe(index: number ){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
