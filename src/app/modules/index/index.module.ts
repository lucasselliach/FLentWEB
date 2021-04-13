import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../app.module';

import { IndexRoutes } from './index.routing';

import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RegisterComponent } from './register/register.component';
import { RegisterUserService } from './register/register.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IndexRoutes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ], 
  providers: [
    LoginService,
    RegisterUserService
  ]
})

export class IndexModule {}
