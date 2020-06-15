import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TemplateFormComponent } from './template-form.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TemplateFormComponent
  ]
})
export class TemplateFormModule { }
