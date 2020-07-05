import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FieldControlErrorComponent } from './field-control-error/field-control-error.component';

import { DropdownService } from './services/dropdown.service';

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
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
