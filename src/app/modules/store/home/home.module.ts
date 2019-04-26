import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { HomeRoutingModule } from './home-routing.module'

import { MaterialModule } from 'src/app/_sharing/modules/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'

import { HomeComponent } from './home.component'
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component'




@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule
  ]
})
export class HomeModule { }