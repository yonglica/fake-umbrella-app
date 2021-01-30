import { ValidatorFn, AbstractControl } from '@angular/forms';

const locationRegex = /^[a-zA-Z\u0080-\u024F]*,[ ]*[a-zA-Z\u0080-\u024F]*$/;

export function locationValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const location = control.value;
    return locationRegex.test(location.trim()) ? null : { invalidLocation: true };
  };
}
