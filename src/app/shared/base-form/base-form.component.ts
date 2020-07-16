import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent implements OnInit {

  formulary: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();

  onSubmit() {
    if (this.formulary.valid) {
      this.onSubmit();
    } else {
      this.verifyFormsValidations(this.formulary);
    }
  }

  verifyFormsValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsDirty();
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verifyFormsValidations(control);
      }
    })
  }

  resetForm() {
    this.formulary.reset();
  }

  verifyValidTouched(fieldName) {
    // this.formulary.controls[fieldName] || this.formulary.get(fieldName)
    return !this.formulary.get(fieldName).valid && this.formulary.get(fieldName).touched;
  }

  applyCssError(fieldName) {
    return {
      'has-error': this.verifyValidTouched(fieldName),
      'has-feedback': this.verifyValidTouched(fieldName)
    }
  }
}
