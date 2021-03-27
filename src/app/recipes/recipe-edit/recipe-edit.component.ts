import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

// IF WE ARE IN EDITMODE OR IN NEW MODE ????????

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;

  editMode = false;
  recipeForm: FormGroup
  //undefined == null but NaN != null
 // id kann string oder undefinded sein
 // the id kann nur nicht undefined sein wenn wir im editMode sind     0 != null = true.
  constructor(private route:ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        // whenever route params change i call initForm() because that indicates that we reloaded
        this.initForm();
      }
    );
  }
  // i want do save it in my array of recipes or update an existing one
  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
     if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
     } else {
       this.recipeService.addRecipe(this.recipeForm.value);
     }
     this.onCancel();
  }



  // Typscript doesn't now about this. <FormArray> i can cast it
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
         ])
      })
    );
  }

  onDeleteIngredient(index: number){
    //(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }
  // go up one level
  //If I am editing, this will take me back to the detail page
  // if i click on the new button , it will me back to the recipes page
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  // get controls() { // a getter!
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }

  get ingredients(): AbstractControl[] {
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    return ingredients.controls;
  }

   private initForm() {

     let recipeName = '';
     let recipeImagePath = '';
     let recipeDescription = '';
     let recipeIngredients = new FormArray([])
     // i have the id stored up there

     // Ingredients: First: Usually you want to get an Item from an array. In this case it`s useless, but you need
     //to loop over the FormArray to bind the formControlls to it`s propertys name, amount.
     if(this.editMode){
       const recipe = this.recipeService.getRecipe(this.id)
       recipeName = recipe.name;
       recipeImagePath = recipe.imagePath;
       recipeDescription = recipe.description;
       if(recipe['ingredients']){
         for ( let ingredient of recipe.ingredients ) {
           recipeIngredients.push(
             new FormGroup({
               'name' : new FormControl(ingredient.name,Validators.required),
               'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
               ])
             })
           );
         }
       }
     }


     // die linke Spalte ist html
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath,Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  // Using null operators to reduce complexity of the initForm method

  // private initForm = (): void => {
  //   const recipe = this.editMode ? this.recipeService.getRecipe(this.id) : null;

  //   const recipeName = recipe?.name ?? '';
  //   const recipeImagePath = recipe?.imagePath ?? '';
  //   const recipeDescription = recipe?.description ?? '';
  //   const recipeIngredients = new FormArray([ ... recipe?.ingredients.map(ingredient => new FormGroup({
  //     name: new FormControl(ingredient.name),
  //     amount: new FormControl(ingredient.amount)
  //   }))]);

  //   this.recipeForm = new FormGroup({
  //     'name' : new FormControl(recipeName),
  //     'imagePath' : new FormControl(recipeImagePath),
  //     'description' : new FormControl(recipeDescription),
  //     'ingredients' : recipeIngredients
  //   });
  // }
}
