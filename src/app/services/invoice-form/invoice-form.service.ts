import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Invoice } from '../../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceFormService {
  constructor(private formBuilder: FormBuilder) {}

  initializeForm(): FormGroup {
    return this.formBuilder.group({
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
      status: ['pending'],
    });
  }

  patchFormValues(form: FormGroup, invoice: Invoice | null | undefined): void {
    if (!invoice) {
      return;
    }

    try {
      form.patchValue({
        id: invoice.id,
        senderStreetAddress: invoice.senderAddress?.street || '',
        senderCity: invoice.senderAddress?.city || '',
        senderPostCode: invoice.senderAddress?.postCode || '',
        senderCountry: invoice.senderAddress?.country || '',
        clientName: invoice.clientName || '',
        clientEmail: invoice.clientEmail || '',
        clientStreetAddress: invoice.clientAddress?.street || '',
        clientCity: invoice.clientAddress?.city || '',
        clientPostCode: invoice.clientAddress?.postCode || '',
        clientCountry: invoice.clientAddress?.country || '',
        invoiceDate: invoice.createdAt || '',
        paymentTerms: invoice.paymentTerms || '',
        projectDescription: invoice.description || '',
        createdAt: invoice.createdAt || '',
        status: invoice.status || 'pending',
      });

      this.patchItems(form, invoice.items || []);
    } catch (error) {}
  }

  patchItems(form: FormGroup, items: any[]): void {
    const itemsFormArray = form.get('items') as FormArray;
    itemsFormArray.clear();
    items.forEach((item) => {
      itemsFormArray.push(
        this.formBuilder.group({
          name: [item.name, Validators.required],
          quantity: [item.quantity, [Validators.required, Validators.min(0)]],
          price: [item.price, [Validators.required, Validators.min(0)]],
          total: [{ value: item.total, disabled: true }],
        })
      );
    });
  }

  mapFormToInvoice(
    form: FormGroup,
    isEditing: boolean,
    status: string = 'draft'
  ): Invoice {
    const formValue = form.value;

    return {
      id: isEditing ? formValue.id : this.generateInvoiceId(),
      createdAt: isEditing
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
      status: status,
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
  }

  generateInvoiceId(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 2 }, () =>
      letters.charAt(Math.floor(Math.random() * letters.length))
    ).join('');
    const randomNumbers = Math.floor(1000 + Math.random() * 9000).toString();
    return `${randomLetters}${randomNumbers}`;
  }

  calculatePaymentDue(invoiceDate: string, paymentTerms: string): string {
    const date = new Date(invoiceDate);
    const terms = this.parsePaymentTerms(paymentTerms);
    date.setDate(date.getDate() + terms);
    return date.toISOString().split('T')[0];
  }

  parsePaymentTerms(terms: string): number {
    return parseInt(terms, 10) || 0;
  }
}
