import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

// routes simply just an array of Javasript objects where each object represents a route
// redirect = umleiten
// patMatch: 'full' = überschreibt den default of prefix. only redirect the full path is empty = wir wollen nicht umleiten(redirect) auf
// irdeneinen andernen path
const appRoutes: Routes = [
  {
    path: '', redirectTo: '/recipes', pathMatch:'full'
  },
  {
    path: 'recipes', component: RecipesComponent, children: [
      {
        path: '', component: RecipeStartComponent
      },
      {
        path: 'new', component:RecipeEditComponent
      },
      {
        path: ':id', component:RecipeDetailComponent
      },
      {
        path: ':id/edit', component:RecipeEditComponent
      }
    ]
  },
  {
    path: 'shopping-list', component: ShoppingListComponent
  }
];

// need to transform it from a normal TypeScript class into a Angular Module
// NgModuel takes a Javasript object in which we can configure it in greater detail
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]

})
export class AppRoutingModule{

}
