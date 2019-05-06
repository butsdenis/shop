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
import { StarRatingModule } from 'angular-star-rating';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot()
  ]
})
export class HomeModule { }