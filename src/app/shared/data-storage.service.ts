
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService,private authService: AuthService){}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
    .put(
      'https://ng-course-recipe-book-db3c0-default-rtdb.firebaseio.com/recipes.json',
       recipes
    )
    .subscribe(response => {
      console.log(response);

    });
  }
  // take... 1 value from the observable and after automatically unsubscribe. this manage the subsription for me, gives
  // me the latest user and unsubscribes

  //exhaustMap waits for the first observabel, for the user observable to complete which will happen after we took the
  // latest user.

  // innen benützen wir das user observable, schneiden den user durch take nur einmal raus, unsubcriben es zu diesem
  // observable and ersetzen es automatisch mit dem neuen observable

  // wir haben den user jetzt, jetzt können wir das token herauziehen/extrahieren entnehemn,
  // bei firebase mit Params statt header. als 2 Argument.Wir benützen den query parameter in der url. also dass
  // token wird angehängt
  fetchRecipes(){

      return this.http.get<Recipe[]>(
        'https://ng-course-recipe-book-db3c0-default-rtdb.firebaseio.com/recipes.json',

      )
      .pipe(
    map(recipes =>{
      return recipes.map( recipe => {
        return {
          ... recipe,
          ingredients: recipe.ingredients ? recipe.ingredients: []
        };
      });
    }),
    tap( recipes => {
      this.recipeService.setRecipes(recipes)
    })
  );

  }
}
