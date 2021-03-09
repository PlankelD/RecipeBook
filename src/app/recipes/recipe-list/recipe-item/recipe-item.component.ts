import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  // we can use this recipe selected event emitter and call emit and emit the recipe of this recipe item component because
  // thath is the one we selected and that's the data we want to pass
  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe)
  }
}
