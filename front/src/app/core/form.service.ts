import { Injectable, signal } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  data = new FormArray<ReturnType<FormService['getInvoiceFormGroup']>>([]);
  propagateErrors = new Subject<void>();
  emptyError = signal<boolean>(false);
  wasSubmitted = signal(false);

  constructor(private router: Router) {
  }

  getInvoiceFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      count: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(100), Validators.pattern("^[0-9]*$")]),
      price: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(1000000), Validators.pattern("^[0-9]*$")])
    });
  }

  addInvoice() {
    this.data.push(this.getInvoiceFormGroup())
  }

  removeInvoice(index: number) {
    this.data.removeAt(index);
  }

  submitItems() {
    if (this.data.controls.length === 0) {
      this.emptyError.set(true);
    } else if (this.data.controls.some(control => control.valid)) {
      this.router.navigate(['info']);
      this.wasSubmitted.set(true);
    } else {
      this.propagateErrors.next();
    }
  }
}
