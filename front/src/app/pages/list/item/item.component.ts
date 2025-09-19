import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, input, OnInit, signal } from '@angular/core';
import { FormService } from '../../../core/form.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getMapOfErrors } from '../../../shared/utility/error-messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InvoiceForm, invoiceFormFields } from '../../../shared/models/invoice-form';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent implements OnInit {
  @HostBinding('class')
  hostClasses = 'block default';

  form = input<FormGroup<InvoiceForm>>();
  index = input<number>();
  errors = signal<Map<string, string>>(new Map());
  fields = invoiceFormFields;

  constructor(public formService: FormService, private destroyRef: DestroyRef) {}

  ngOnInit() {
    this.formService.propagateErrors$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.errors.set(getMapOfErrors(this.form())));
  }
}
