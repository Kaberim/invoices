import { Injectable, signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { InvoiceForm } from '../shared/models/invoice-form';
import { createNumberControl, createTextControl } from '../shared/utility/form-fields';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  invoices = new FormArray<FormGroup<InvoiceForm>>([]);
  propagateErrors$ = new Subject<void>();
  emptyError = signal<boolean>(false);
  wasSubmitted = signal<boolean>(false);

  constructor(private router: Router) {
  }

  getInvoiceFormGroup(): FormGroup<InvoiceForm> {
    return new FormGroup<NonNullable<InvoiceForm>>({
      name: createTextControl('', 3, 30),
      count: createNumberControl(0, 1, 100),
      price: createNumberControl(0, 1, 1_000_000)
    });
  }

  addInvoice() {
    this.invoices.push(this.getInvoiceFormGroup())
  }

  removeInvoice(index: number) {
    this.invoices.removeAt(index);
  }

  submitItems() {
    if (this.invoices.length === 0) {
      this.emptyError.set(true);
      return;
    }

    if (this.invoices.controls.some(control => control.valid)) {
      this.wasSubmitted.set(true);
      this.router.navigate(['info']);
      return;
    }

    this.propagateErrors$.next();
  }
}
