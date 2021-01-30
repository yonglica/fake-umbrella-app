import { ValidatorFn, AbstractControl } from '@angular/forms';

const telephoneNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export function telephoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    return telephoneNumberRegex.test(control.value) ? null : { invalidPhoneNumber: true };
  };
}

