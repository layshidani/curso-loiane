import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';
import { DataFormComponent } from './data-form.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DataFormComponent
  ]
})
export class DataFormModule { }
