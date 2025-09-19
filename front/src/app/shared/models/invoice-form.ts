import { FormControl } from '@angular/forms';

export interface InvoiceForm {
  name: FormControl<string>;
  count: FormControl<number>;
  price: FormControl<number>;
}

export const invoiceFormFields = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'count', label: 'Count', type: 'number' },
  { name: 'price', label: 'Price', type: 'number' }
];
