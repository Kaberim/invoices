import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../core/form.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ItemComponent,
    ReactiveFormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  constructor(public formService: FormService) {
  }
}
