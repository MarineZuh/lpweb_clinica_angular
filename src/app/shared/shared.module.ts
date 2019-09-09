import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { COMPONENTS } from './components/index';


@NgModule({
  declarations: [
    // Components
    COMPONENTS
  ],
  imports: [
    // Angular:
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    //NgPrime:

  ],
  exports: [
    // Angular:
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Components:
    COMPONENTS,
    // NGPRIME:
    ButtonModule,
    ToastModule,
  ],
  providers: [

  ]
})
export class SharedModule { }
