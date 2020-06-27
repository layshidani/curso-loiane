import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './../shared/shared.module';

import { SearchCEPService } from './../shared/services/search-cep.service';

import { TemplateFormComponent } from './template-form.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TemplateFormComponent,
  ],
  providers: [
    SearchCEPService,
  ]
})
export class TemplateFormModule { }
