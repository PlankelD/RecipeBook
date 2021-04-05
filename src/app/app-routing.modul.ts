import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthComponent } from "./auth/auth.component";


// routes simply just an array of Javasript objects where each object represents a route
// redirect = umleiten
// patMatch: 'full' = überschreibt den default of prefix. only redirect the full path is empty = wir wollen nicht umleiten(redirect) auf
// irdeneinen andernen path
const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch:'full'},
  //{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'}
  {
    path: 'recipes',
   loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
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
