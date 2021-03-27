import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

// Resolver runs before a route is loaded to ensure that certain data the route depends on is there
// Der Resolver wird ausgeführt, bevor eine Route geladen wird, um sicherzustellen, dass bestimmte Daten,
// von denen die Route abhängt, vorhanden sind
 // Resolve  is a generic interface which means we need to define which type of data it will resolve in the end and

 // dataStorageService make the http request und deswegen brauchen wir es

 // the resolver subscribe for me to basically find out once the data is there
 @Injectable({providedIn: 'root'})
 export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // ich kann im edit mode nichts ändern weil der resolver sofort alles von der Dankbank holt deswegen muss ich noch was einbauen
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }else{
      return recipes;
    }

  }
 }
