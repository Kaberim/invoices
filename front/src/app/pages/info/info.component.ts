import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { CompanyData } from '../../shared/models/companyData';
import { APIService } from '../../core/api.service';
import { AsyncPipe } from '@angular/common';
import { FormService } from '../../core/form.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent implements OnInit {

  companyInfo$!: Observable<CompanyData | undefined>;
  total = signal(0);
  validItems = signal<ReturnType<FormService['getInvoiceFormGroup']>[]>([]);

  constructor(private apiService: APIService, public formService: FormService) {
  }

  ngOnInit() {
    this.companyInfo$ = this.apiService.getCompanyData()
      .pipe(catchError(error => {
        console.log(error);
        return of(undefined);
      }));
    if (this.formService.wasSubmitted()) this.configureItems();
  }

  configureItems() {
    this.validItems.set(this.formService.data.controls.filter(c => c.valid));
    const sum = this.validItems().reduce((acc, fg) => {
      const count = fg.get('count')?.value ?? 0;
      const price = fg.get('price')?.value ?? 0;
      return acc + count * price;
    }, 0);
    this.total.set(sum);
  }
}
