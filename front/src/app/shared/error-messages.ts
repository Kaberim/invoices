import { AbstractControl } from '@angular/forms';

export const ERROR_MESSAGES: Record<string, (error: any) => string> = {
  required: () => 'This field is required',
  minlength: (error) => `Minimum length is ${error.requiredLength}`,
  maxlength: (error) => `Maximum length is ${error.requiredLength}`,
  min: (error) => `Value must be at least ${error.min}`,
  max: (error) => `Value must be no more than ${error.max}`,
  pattern: () => 'This field must be an integer',
};

export function getFirstErrorMessage(control: AbstractControl | null) {
  if (!control || !control.errors) return null;
  const key = Object.keys(control.errors)[0];
  const error = control.errors[key];
  return ERROR_MESSAGES[key] ? ERROR_MESSAGES[key](error) : 'Invalid field';
}
