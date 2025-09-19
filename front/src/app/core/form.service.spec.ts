import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { FormService } from './form.service';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormService]
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a valid invoice form group', () => {
    const formGroup = service.getInvoiceFormGroup();
    expect(formGroup instanceof FormGroup).toBeTrue();
    expect(formGroup.controls['name']).toBeDefined();
    expect(formGroup.controls['count']).toBeDefined();
    expect(formGroup.controls['price']).toBeDefined();
  });

  it('should initialize data as empty FormArray', () => {
    expect(service.invoices.length).toBe(0);
  });

  it('should add an invoice form to data', () => {
    service.addInvoice();
    expect(service.invoices.length).toBe(1);
    expect(service.invoices.at(0) instanceof FormGroup).toBeTrue();
  });

  it('should remove invoice form at given index', () => {
    service.addInvoice();
    service.addInvoice();
    expect(service.invoices.length).toBe(2);

    service.removeInvoice(0);
    expect(service.invoices.length).toBe(1);
  });

  it('should validate invoice form correctly', () => {
    const form = service.getInvoiceFormGroup();

    expect(form.valid).toBeFalse();

    form.patchValue({
      name: 'Test Product',
      count: 5,
      price: 100
    });

    expect(form.valid).toBeTrue();
  });
});
