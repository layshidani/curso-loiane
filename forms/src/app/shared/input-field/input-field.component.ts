import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_FIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true
}

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [INPUT_FIELD_VALUE_ACCESSOR],
})

export class InputFieldComponent implements ControlValueAccessor {
  @Input() id: string;
  @Input() label: string;
  @Input() type = 'text';
  @Input() isReadOnly = false;
  @Input() cssClass;
  @Input() control;

  private innerValue: any;

  get value() {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangedCallBack(v);
    }
  }

  constructor() { }

  onChangedCallBack: (_: any) => void = () => {};
  onTouchedCallBack: (_: any) => void = () => {};


  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangedCallBack = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallBack = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.isReadOnly = isDisabled;
  }

}
