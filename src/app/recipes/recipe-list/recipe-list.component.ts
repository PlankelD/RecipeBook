import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
// wenn wir das wie eine Methode ausführen, rufen wir tatsächlich den Konstruktor auf.new Recipe()
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  // i will get this copy of recipes, this copy of that array
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

}
