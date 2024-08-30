import { Component, OnInit, Input } from '@angular/core';
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
import * as InvoiceActions from '../../store/invoice.actions';
import { Invoice } from '../../models/invoice.model';
import { Observable } from 'rxjs';
import { selectSelectedInvoice } from '../../store/invoice.selectors';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [IconsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css'],
})
export class DrawerComponent implements OnInit {
  @Input() invoiceId: string | null = null; // To know if we are editing
  invoiceForm!: FormGroup;
  isEditing: boolean = false;
  isOpen = false;
  selectedInvoice$!: Observable<Invoice | null | undefined>;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm();

    if (this.invoiceId) {
      this.isEditing = true;
      this.loadInvoiceData(this.invoiceId);
    }
  }

  initializeForm(): void {
    this.invoiceForm = this.formBuilder.group({
      id: [''],
      senderStreetAddress: ['', Validators.required],
      senderCity: ['', Validators.required],
      senderPostCode: ['', Validators.required],
      senderCountry: ['', Validators.required],
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientStreetAddress: ['', Validators.required],
      clientCity: ['', Validators.required],
      clientPostCode: ['', Validators.required],
      clientCountry: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      paymentTerms: ['', Validators.required],
      projectDescription: ['', Validators.required],
      items: this.formBuilder.array([]),
      createdAt: [''],
    });
  }

  loadInvoiceData(id: string): void {
    this.selectedInvoice$ = this.store.select(selectSelectedInvoice);
    this.selectedInvoice$.subscribe((invoice) => {
      if (invoice) {
        this.invoiceForm.patchValue({
          id: invoice.id,
          senderStreetAddress: invoice.senderAddress.street,
          senderCity: invoice.senderAddress.city,
          senderPostCode: invoice.senderAddress.postCode,
          senderCountry: invoice.senderAddress.country,
          clientName: invoice.clientName,
          clientEmail: invoice.clientEmail,
          clientStreetAddress: invoice.clientAddress.street,
          clientCity: invoice.clientAddress.city,
          clientPostCode: invoice.clientAddress.postCode,
          clientCountry: invoice.clientAddress.country,
          invoiceDate: invoice.createdAt,
          paymentTerms: invoice.paymentTerms,
          projectDescription: invoice.description,
          createdAt: invoice.createdAt,
        });

        this.items.clear();
        invoice.items.forEach((item) => {
          this.items.push(
            this.formBuilder.group({
              name: [item.name, Validators.required],
              quantity: [
                item.quantity,
                [Validators.required, Validators.min(0)],
              ],
              price: [item.price, [Validators.required, Validators.min(0)]],
              total: [{ value: item.total, disabled: true }],
            })
          );
        });
      }
    });
  }

  generateInvoiceId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');
    const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
    return `${randomLetters}${randomNumbers}`;
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      const formValue = this.invoiceForm.value;

      const invoice: Invoice = {
        id: this.isEditing ? formValue.id : this.generateInvoiceId(),
        createdAt: this.isEditing
          ? formValue.createdAt
          : new Date().toISOString().split('T')[0],
        paymentDue: this.calculatePaymentDue(
          formValue.invoiceDate,
          formValue.paymentTerms
        ),
        description: formValue.projectDescription,
        paymentTerms: this.parsePaymentTerms(formValue.paymentTerms),
        clientName: formValue.clientName,
        clientEmail: formValue.clientEmail,
        status: 'pending',
        senderAddress: {
          street: formValue.senderStreetAddress,
          city: formValue.senderCity,
          postCode: formValue.senderPostCode,
          country: formValue.senderCountry,
        },
        clientAddress: {
          street: formValue.clientStreetAddress,
          city: formValue.clientCity,
          postCode: formValue.clientPostCode,
          country: formValue.clientCountry,
        },
        items: formValue.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
        })),
        total: formValue.items.reduce(
          (sum: any, item: any) => sum + item.quantity * item.price,
          0
        ),
      };

      if (this.isEditing) {
        this.store.dispatch(InvoiceActions.updateInvoice({ invoice }));
        console.log('update:', invoice);
      } else {
        this.store.dispatch(InvoiceActions.createInvoice({ invoice }));
        console.log('create:', invoice);
      }

      this.closeDrawer();
    } else {
      console.error('Form is invalid');
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

  openDrawer() {
    this.isOpen = true;
  }

  closeDrawer() {
    this.isOpen = false;
  }

  parsePaymentTerms(terms: string): number {
    switch (terms) {
      case 'Net 30 Days':
        return 30;
      case 'Net 15 Days':
        return 15;
      case 'Net 7 Days':
        return 7;
      default:
        return 0;
    }
  }

  calculatePaymentDue(invoiceDate: string, paymentTerms: string): string {
    const date = new Date(invoiceDate);
    const terms = this.parsePaymentTerms(paymentTerms);
    date.setDate(date.getDate() + terms);
    return date.toISOString().split('T')[0];
  }
}
