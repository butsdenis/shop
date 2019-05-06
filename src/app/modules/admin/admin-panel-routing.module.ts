import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminPanelComponent } from './admin-panel.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategoryComponent } from './category/category/category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { UserComponent } from './user/user.component';
import { OrdersComponent } from './orders/orders.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      {
        path: 'product', component: ProductComponent,
      },
      {
        path: 'product/add-product', component: AddProductComponent
      },
      {
        path: 'product/:_id', component: EditProductComponent
      },
      {
        path: 'category', component: CategoryComponent
      },
      {
        path: 'category/add-category', component: AddCategoryComponent
      },
      {
        path: 'category/:_id', component: EditCategoryComponent
      },
      {
        path: 'users', component: UserComponent
      },
      {
        path: 'order', component: OrdersComponent
      }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {
}