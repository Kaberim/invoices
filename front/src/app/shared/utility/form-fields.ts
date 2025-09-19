import { FormControl, Validators } from '@angular/forms';

export const numberValidators = (min: number, max: number) => [
  Validators.required,
  Validators.min(min),
  Validators.max(max),
  Validators.pattern('^[0-9]*$')
];

export const textValidators = (minLen: number, maxLen: number) => [
  Validators.required,
  Validators.minLength(minLen),
  Validators.maxLength(maxLen)
];

export function createTextControl(defaultValue: string, minLen: number, maxLen: number) {
  return new FormControl(defaultValue, {
    nonNullable: true,
    validators: textValidators(minLen, maxLen)
  });
}

export function createNumberControl(defaultValue: number, min: number, max: number) {
  return new FormControl(defaultValue, {
    nonNullable: true,
    validators: numberValidators(min, max)
  });
}
