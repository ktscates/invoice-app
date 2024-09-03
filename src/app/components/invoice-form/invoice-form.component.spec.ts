import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceFormComponent } from './invoice-form.component';
import { provideStore, Store } from '@ngrx/store';
import { InvoiceReducer } from '../../store/invoice/invoice.reducers';
import { InvoiceFormService } from '../../services/invoice-form/invoice-form.service';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { Invoice } from '../../models/invoice.model';
import { of } from 'rxjs';

const mockInvoice: Invoice = {
  id: '123',
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

describe('InvoiceFormComponent', () => {
  let component: InvoiceFormComponent;
  let fixture: ComponentFixture<InvoiceFormComponent>;
  let store: Store;
  let invoiceFormService: InvoiceFormService;

  beforeEach(async () => {
    const storeMock = {
      select: jest.fn(),
      dispatch: jest.fn(),
    };

    const invoiceFormServiceMock = {
      initializeForm: jest.fn().mockReturnValue(
        new FormBuilder().group({
          senderStreetAddress: [''],
          senderCity: [''],
          senderPostCode: [''],
          senderCountry: [''],
          clientName: [''],
          clientEmail: [''],
          clientStreetAddress: [''],
          clientCity: [''],
          clientPostCode: [''],
          clientCountry: [''],
          invoiceDate: [''],
          paymentTerms: [''],
          projectDescription: [''],
          items: new FormBuilder().array([]),
        })
      ),
      patchFormValues: jest.fn(),
      mapFormToInvoice: jest.fn().mockReturnValue({}),
    };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        provideStore({ invoices: InvoiceReducer }),
        { provide: Store, useValue: storeMock },
        { provide: InvoiceFormService, useValue: invoiceFormServiceMock },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    invoiceFormService = TestBed.inject(InvoiceFormService);
    fixture = TestBed.createComponent(InvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();
    expect(invoiceFormService.initializeForm).toHaveBeenCalled();
    expect(component.invoiceForm).toBeTruthy();
  });

  it('should set isEditing to true and load invoice data when invoiceId changes', () => {
    const invoiceId = '123';
    component.invoiceId = invoiceId;
    jest.spyOn(store, 'select').mockReturnValue(of(mockInvoice));

    component.ngOnChanges({
      invoiceId: {
        currentValue: invoiceId,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.isEditing).toBe(true);
    expect(store.dispatch).toHaveBeenCalledWith(
      InvoiceActions.loadInvoice({ invoiceId })
    );
  });

  it('should not save as draft if the form is invalid', () => {
    jest.spyOn(component.invoiceForm, 'valid', 'get').mockReturnValue(false);
    component.saveAsDraft();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should save as draft if the form is valid', () => {
    component.closeDrawer = jest.fn();
    component.invoiceForm = new FormGroup({});
    jest.spyOn(component.invoiceForm, 'valid', 'get').mockReturnValue(true);
    component.isEditing = true;
    const invoiceMock = { id: '123', status: 'draft' } as any;
    jest
      .spyOn(invoiceFormService, 'mapFormToInvoice')
      .mockReturnValue(invoiceMock);
    jest.spyOn(store, 'dispatch');
    component.saveAsDraft();
    expect(invoiceFormService.mapFormToInvoice).toHaveBeenCalledWith(
      component.invoiceForm,
      component.isEditing,
      'draft'
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      InvoiceActions.createInvoice({ invoice: invoiceMock })
    );
    expect(component.closeDrawer).toHaveBeenCalled();
  });

  it('should save and send the invoice if the form is valid', () => {
    const testCases = [
      {
        isEditing: true,
        expectedAction: InvoiceActions.updateInvoice,
      },
      {
        isEditing: false,
        expectedAction: InvoiceActions.createInvoice,
      },
    ];

    for (const testCase of testCases) {
      component.closeDrawer = jest.fn();
      component.invoiceForm = new FormGroup({});
      jest.spyOn(component.invoiceForm, 'valid', 'get').mockReturnValue(true);
      component.isEditing = testCase.isEditing;
      const invoiceMock = { id: '123', status: 'pending' } as any;
      jest
        .spyOn(invoiceFormService, 'mapFormToInvoice')
        .mockReturnValue(invoiceMock);
      jest.spyOn(store, 'dispatch');

      component.saveAndSend();

      expect(invoiceFormService.mapFormToInvoice).toHaveBeenCalledWith(
        component.invoiceForm,
        component.isEditing,
        'pending'
      );
      expect(store.dispatch).toHaveBeenCalledWith(
        testCase.expectedAction({ invoice: invoiceMock })
      );
      expect(component.closeDrawer).toHaveBeenCalled();
    }
  });

  it('should add a new item to the form', () => {
    const initialItemCount = component.items.length;
    component.addItem();
    expect(component.items.length).toBe(initialItemCount + 1);
  });

  it('should remove an item from the form', () => {
    component.addItem();
    const initialItemCount = component.items.length;
    component.removeItem(0);
    expect(component.items.length).toBe(initialItemCount - 1);
  });

  it('should update the total when quantity or price changes', () => {
    const itemForm = component.createItem();
    itemForm.get('quantity')?.setValue(2);
    itemForm.get('price')?.setValue(5);
    expect(itemForm.get('total')?.value).toBe(10);
  });
});
