import { Injectable} from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

//maybe only  @Injectable()
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

//  private recipes: Recipe[] = [
//     new Recipe(
//       'Tasty Schnitzel',
//       'A super-tasty Schnitzel - just awesome!',
//       'https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_960_720.jpg',
//       [
//         new Ingredient('Meat', 1),
//         new Ingredient('French Fries', 20)
//       ]),
//     new Recipe(
//       'Big Fat Burger',
//       'What else you need to say',
//       'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
//       [
//         new Ingredient('Buns', 2),
//         new Ingredient('Meat',2)
//       ])
//   ];

private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService){}

  // overwrite. This recipe should be set equal to the recipes we're getting as an argument here and this will overwrite our recipes
  // OBEN with these recipes in the argument
  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  // acces from outise. return the direct refernce to this array
  // change in this array, will change it on the array in this service
  // slice() without arguments return a new array wich is an exact copy of the one in this service file
  getRecipes(){
    return this.recipes.slice();
  }

  // loading a single recipe by id. The detail component listenig, also in the edit component
  getRecipe(index: number ){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe (recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
