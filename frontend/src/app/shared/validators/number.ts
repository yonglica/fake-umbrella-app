import { ValidatorFn, AbstractControl } from '@angular/forms';

const numberRegex = /^[1-9]\d?/;

export function numberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    return numberRegex.test(control.value) ? null : { invalidNumber: true };
  };
}

