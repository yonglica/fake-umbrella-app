import { ValidatorFn, AbstractControl } from '@angular/forms';

export function telephoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(control.value) ? null : { invalidPhoneNumber: true };
  };
}

