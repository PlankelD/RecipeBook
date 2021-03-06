import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
// @Input because i will get a recipe from outside or any data from outside
// Ich möchte das Rezept von außen erhalten
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onSelected(){
    this.recipeSelected.emit();
  }
}
