import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { HomeRoutingModule } from './home-routing.module'

import { MaterialModule } from 'src/app/_sharing/modules/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'

import { HomeComponent } from './home.component'
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component'
import { TextMaskModule } from 'angular2-text-mask';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }