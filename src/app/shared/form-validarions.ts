import { FormArray } from '@angular/forms';

export class FormValidations {
  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      const validCheckboxes = formArray.controls
        .map(item => item.value)
        .reduce((total, curr) => curr ? ++total : total, 0);

      return validCheckboxes >= min ? null : { required: true };
    }

    return validator;
  }
}
