import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormDebugComponent } from './form-debug/form-debug.component';
import { FieldControlErrorComponent } from './field-control-error/field-control-error.component';

import { DropdownService } from './services/dropdown.service';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { InputFieldComponent } from './input-field/input-field.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    FieldControlErrorComponent,
    ErrorMsgComponent,
    InputFieldComponent,
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
    ErrorMsgComponent,
    InputFieldComponent,
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
