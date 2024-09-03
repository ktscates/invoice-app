import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { InvoiceFormService } from './invoice-form.service';
import { Invoice } from '../../models/invoice.model';

describe('InvoiceFormService', () => {
  let service: InvoiceFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [InvoiceFormService],
    });
    service = TestBed.inject(InvoiceFormService);
  });

  it('should initialize the form', () => {
    const form = service.initializeForm();
    expect(form.controls).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        senderStreetAddress: expect.anything(),
        senderCity: expect.anything(),
        senderPostCode: expect.anything(),
        senderCountry: expect.anything(),
        clientName: expect.anything(),
        clientEmail: expect.anything(),
        clientStreetAddress: expect.anything(),
        clientCity: expect.anything(),
        clientPostCode: expect.anything(),
        clientCountry: expect.anything(),
        invoiceDate: expect.anything(),
        paymentTerms: expect.anything(),
        projectDescription: expect.anything(),
        items: expect.anything(),
        createdAt: expect.anything(),
        status: expect.anything(),
      })
    );
  });

  it('should patch form values with invoice data', () => {
    const form = service.initializeForm();
    const mockInvoice: Invoice = {
      id: 'FV2353',
      createdAt: '2023-09-01',
      paymentDue: '2023-09-15',
      description: 'Project ABC',
      paymentTerms: 14,
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      status: 'pending',
      senderAddress: {
        street: '123 Sender St',
        city: 'Sender City',
        postCode: '12345',
        country: 'Sender Country',
      },
      clientAddress: {
        street: '456 Client St',
        city: 'Client City',
        postCode: '67890',
        country: 'Client Country',
      },
      items: [
        { name: 'Item 1', quantity: 2, price: 100, total: 200 },
        { name: 'Item 2', quantity: 1, price: 150, total: 150 },
      ],
      total: 350,
    };

    service.patchFormValues(form, mockInvoice);

    const itemsFormArray = form.get('items') as FormArray;
    expect(itemsFormArray.length).toBe(2);

    const item1 = itemsFormArray.at(0);
    expect(item1.get('name')?.value).toBe('Item 1');
    expect(item1.get('quantity')?.value).toBe(2);
    expect(item1.get('price')?.value).toBe(100);
    expect(item1.get('total')?.value).toBe(200);

    const item2 = itemsFormArray.at(1);
    expect(item2.get('name')?.value).toBe('Item 2');
    expect(item2.get('quantity')?.value).toBe(1);
    expect(item2.get('price')?.value).toBe(150);
    expect(item2.get('total')?.value).toBe(150);
  });

  it('should not patch form values if the invoice is null or undefined', () => {
    const form = service.initializeForm();
    const initialFormValue = form.value;
    service.patchFormValues(form, null);
    expect(form.value).toEqual(initialFormValue);
    service.patchFormValues(form, undefined);
    expect(form.value).toEqual(initialFormValue);
  });

  it('should map form to invoice model', () => {
    const form = service.initializeForm();
    form.patchValue({
      senderStreetAddress: '123 Sender St',
      senderCity: 'Sender City',
      senderPostCode: '12345',
      senderCountry: 'Sender Country',
      clientName: 'John Doe',
      clientEmail: 'john@example.com',
      clientStreetAddress: '456 Client St',
      clientCity: 'Client City',
      clientPostCode: '67890',
      clientCountry: 'Client Country',
      invoiceDate: '2023-09-01',
      paymentTerms: 14,
      projectDescription: 'Project ABC',
    });

    service.patchItems(form, [
      { name: 'Item 1', quantity: 2, price: 100, total: 200 },
      { name: 'Item 2', quantity: 1, price: 150, total: 150 },
    ]);

    const invoice = service.mapFormToInvoice(form, false);

    expect(invoice).toEqual(
      expect.objectContaining({
        senderAddress: {
          street: '123 Sender St',
          city: 'Sender City',
          postCode: '12345',
          country: 'Sender Country',
        },
        clientAddress: {
          street: '456 Client St',
          city: 'Client City',
          postCode: '67890',
          country: 'Client Country',
        },
        items: [
          { name: 'Item 1', quantity: 2, price: 100, total: 200 },
          { name: 'Item 2', quantity: 1, price: 150, total: 150 },
        ],
        total: 350,
      })
    );
  });

  it('should generate an invoice ID', () => {
    const id = service.generateInvoiceId();
    expect(id).toMatch(/^[A-Z]{2}\d{4}$/);
  });

  it('should calculate payment due date', () => {
    const paymentDue = service.calculatePaymentDue('2023-09-01', '14');
    expect(paymentDue).toBe('2023-09-15');
  });

  it('should parse payment terms', () => {
    const terms = service.parsePaymentTerms('30');
    expect(terms).toBe(30);
  });
});
