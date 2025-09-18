import { ChangeDetectionStrategy, Component, DestroyRef, input, OnInit, signal } from '@angular/core';
import { FormService } from '../../../core/form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFirstErrorMessage } from '../../../shared/error-messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  form = input<ReturnType<FormService['getInvoiceFormGroup']>>();
  index = input<number>();
  errors = signal<Map<string, string>>(new Map());
  fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'count', label: 'Count', type: 'number' },
    { name: 'price', label: 'Price', type: 'number' }
  ];

  constructor(public formService: FormService, private destroyRef: DestroyRef) {
  }

  ngOnInit() {
    this.formService.propagateErrors
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const form = this.form();
        if (!form) return;

        const newMap = new Map<string, string>();

        Object.entries(form.controls).forEach(([key, control]) => {
          const message = getFirstErrorMessage(control);
          if (message) {
            newMap.set(key, message);
          }
        });

        this.errors.set(newMap);
      });
  }
}
