import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { MaterialModule } from 'src/app/_sharing/modules/material.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product/product.component';
import { EditProductComponent } from './edit-product/edit-product.component';






@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    ProductComponent,
    EditProductComponent
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
