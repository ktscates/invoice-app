import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { Invoice } from '../../models/invoice.model';
import { Observable } from 'rxjs';
import { selectSelectedInvoice } from '../../store/invoice/invoice.selectors';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [
    IconsComponent,
    CommonModule,
    ReactiveFormsModule,
    InvoiceFormComponent,
  ],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent {
  @Input() invoiceId!: string | null;
  isOpen = false;

  openDrawer() {
    this.isOpen = true;
  }

  closeDrawer() {
    this.isOpen = false;
  }
}
