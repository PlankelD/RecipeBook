//1. In this case Angular itself subscribes automatically. We don't subscribe in code.

//2. You will use map() for transforming the data passed with an event.
// You will use tap() if you want to perform a side effect - e.g. a console.log, a navigation) when an event is detected.



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

// inject recipe-service into our data storage service, that we could directly get our currently loaded recipes from that
// recipe-service.
// 2) http: If we have POSTed at least once, we don't get an array back from firebase, like we get it if we have only
// used PUT. Instead we get an object where the properties are auto generated ids, and the values are the POSTed items.
//3) Url: recipes.json is onnly firebase real-time database works
// 4) angular will know what we are put: recipes
// 5) subscribe directly in the service because i have no interest in the response, in my component and i will get back a response
//    here amd we can log tho have look at
//6) that the store recipe method is getting called and that will happend inside the header component
@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService){}

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
// wenn man kein Ingredients hochladet. gibt es keine Ingredients. Ich will immer welche. Selbst wenn sie leer sind um bugs zu
// vermeiden. ich nütze die pipe-method und den map operator der es mir erlaubt diesen Daten zu transformieren
// dies erste map ist ein rxjs operator aufgerufen als Funktion und der der zweite ist ein Javascript Array-Method
// die map allows us to transform the elements in an array
  fetchRecipes(){
    return this.http
    .get<Recipe[]>(
      'https://ng-course-recipe-book-db3c0-default-rtdb.firebaseio.com/recipes.json'
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
    )

  }
}
