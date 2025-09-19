import { AbstractControl, FormGroup } from '@angular/forms';

export const ERROR_MESSAGES: Record<string, (error: any) => string> = {
  required: () => 'This field is required',
  minlength: (error) => `Minimum length is ${error.requiredLength}`,
  maxlength: (error) => `Maximum length is ${error.requiredLength}`,
  min: (error) => `Value must be at least ${error.min}`,
  max: (error) => `Value must be no more than ${error.max}`,
  pattern: () => 'This field must be an integer',
};

export function getAllErrorMessages(control: AbstractControl | null): string[] {
  if (!control || !control.errors) {
    return [];
  }
  return Object.entries(control.errors).map(([key, error]) => {
    const getMessage = ERROR_MESSAGES[key];
    return getMessage ? getMessage(error) : 'Invalid field';
  });
}

export function getMapOfErrors(form?: FormGroup) {
  const errorMap = new Map<string, string>();
  if (!form) return errorMap;

  Object.entries(form.controls).forEach(([key, control]) => {
    const messages = getAllErrorMessages(control);
    if (messages.length > 0) {
      errorMap.set(key, messages.join(', '));
    }
  });

  return errorMap;
}
