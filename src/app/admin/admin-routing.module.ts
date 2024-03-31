import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',component:AdminComponent,
    children:[
      {path:'', component:HomeComponent},
      {path:'products/:id', component:ProductsComponent},
      {path:'categories', component:CategoriesComponent},
      {path:'users', component:UsersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
