import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  // i also wnat to find out whether i'm editing the recipe or creating a new one
  // initially i could say i assume that i am creating a new recipe and i am not in editMode
  editMode = false;

  constructor(private route:ActivatedRoute) { }
// != null .... the id will only be not undefined if i am in edit mode because than an id will be present
// ckeck in which mode i am
  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
  }
}
