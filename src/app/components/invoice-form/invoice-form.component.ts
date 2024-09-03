import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';
import { InvoiceFormService } from '../../services/invoice-form/invoice-form.service';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { selectSelectedInvoice } from '../../store/invoice/invoice.selectors';
import { Observable } from 'rxjs';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [IconsComponent, ReactiveFormsModule],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css'],
})
export class InvoiceFormComponent implements OnInit, OnChanges {
  @Input() invoiceId!: string | null;
  @Input() closeDrawer!: () => void;
  invoiceForm!: FormGroup;
  isEditing: boolean = false;
  selectedInvoice$!: Observable<Invoice | null | undefined>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private invoiceFormService: InvoiceFormService
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.invoiceFormService.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['invoiceId']) {
      this.isEditing = this.invoiceId !== null;
      if (this.isEditing && this.invoiceId) {
        this.loadInvoiceData(this.invoiceId);
      }
    }
  }

  loadInvoiceData(invoiceId: string): void {
    this.store.dispatch(InvoiceActions.loadInvoice({ invoiceId }));
    this.selectedInvoice$ = this.store.select(selectSelectedInvoice);
    this.selectedInvoice$.subscribe((invoice) => {
      if (invoice) {
        this.invoiceFormService.patchFormValues(this.invoiceForm, invoice);
      }
    });
  }

  saveAsDraft(): void {
    if (this.invoiceForm.valid) {
      const invoice = this.invoiceFormService.mapFormToInvoice(
        this.invoiceForm,
        this.isEditing,
        'draft'
      );
      if (this.isEditing) {
        this.store.dispatch(InvoiceActions.createInvoice({ invoice }));
      }
      this.closeDrawer();
    }
  }

  saveAndSend(): void {
    if (this.invoiceForm.valid) {
      const invoice = this.invoiceFormService.mapFormToInvoice(
        this.invoiceForm,
        this.isEditing,
        'pending'
      );
      if (this.isEditing) {
        this.store.dispatch(InvoiceActions.updateInvoice({ invoice }));
      } else {
        this.store.dispatch(InvoiceActions.createInvoice({ invoice }));
      }
      this.closeDrawer();
    }
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    const itemForm: any = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });
    itemForm
      .get('quantity')
      ?.valueChanges.subscribe(() => this.updateTotal(itemForm));
    itemForm
      .get('price')
      ?.valueChanges.subscribe(() => this.updateTotal(itemForm));

    return itemForm;
  }

  updateTotal(itemForm: FormGroup) {
    const quantity = itemForm.get('quantity')?.value || 0;
    const price = itemForm.get('price')?.value || 0;
    const total = quantity * price;

    itemForm.get('total')?.setValue(total, { emitEvent: false });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }
}
