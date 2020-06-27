import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SearchCEPService } from './../shared/services/search-cep.service';

import { FormDebugComponent } from '../form-debug/form-debug.component';
import { TemplateFormComponent } from './template-form.component';
import { FieldControlErrorComponent } from './../field-control-error/field-control-error.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormDebugComponent,
    TemplateFormComponent,
    FieldControlErrorComponent,
  ],
  providers: [
    SearchCEPService,
  ]
})
export class TemplateFormModule { }
