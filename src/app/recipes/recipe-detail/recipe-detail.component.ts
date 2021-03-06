import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  id: number;

  constructor(private recipeService: RecipeService,private route: ActivatedRoute ,private router: Router) {}
  // fetching the id and store it and fetching the recipe. Whenerver the id changes, then i will call getRecipe and pass my
  // ID as an argument
  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
   this.router.navigate(['edit'], {relativeTo: this.route})
   //this.router.navigate(['../',this.id, 'edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id);
   // this.router.navigate(['../'], {relativeTo: this.route}); the same as
   this.router.navigate(['/recipes']);
  }
}
