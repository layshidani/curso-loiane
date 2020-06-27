import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FieldControlErrorComponent } from './field-control-error/field-control-error.component';


@NgModule({
  declarations: [
    FormDebugComponent,
    FieldControlErrorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormDebugComponent,
    FieldControlErrorComponent,
  ]
})
export class SharedModule { }
