import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { AuthRoutingModule } from './auth-routing.module'
import { FormsModule, ReactiveFormsModule }   from '@angular/forms'

import { MaterialModule } from 'src/app/_sharing/modules/material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { LoginComponent } from './login/login.component'




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }