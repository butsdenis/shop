import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { MaterialModule } from 'src/app/_sharing/modules/material.module';

import { AdminPanelComponent } from './admin-panel.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategoryComponent } from './category/category/category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { UserComponent } from './user/user.component';






@NgModule({
  declarations: [
    AdminPanelComponent,
    AddProductComponent,
    ProductComponent,
    EditProductComponent,
    CategoryComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminPanelModule { }
