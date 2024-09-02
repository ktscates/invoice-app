import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InvoiceDetailCardComponent } from './invoice-detail-card.component';
import { Invoice } from '../../models/invoice.model';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import * as selectors from '../../store/invoice/invoice.selectors';
import { DrawerComponent } from '../drawer/drawer.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('InvoiceDetailCardComponent', () => {
  let component: InvoiceDetailCardComponent;
  let fixture: ComponentFixture<InvoiceDetailCardComponent>;
  let store: MockStore;
  let route: ActivatedRoute;

  const initialState = {
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InvoiceDetailCardComponent,
        DrawerComponent,
        DeleteModalComponent,
        InvoiceFormComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => 'FV2353' }) },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    route = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(InvoiceDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load invoice data on initialization', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(
      InvoiceActions.loadInvoice({ invoiceId: 'FV2353' })
    );
  });

  it('should open the drawer to edit the invoice', () => {
    component.invoiceId = 'FV2353';
    component.drawer = {
      invoiceId: 'FV2353',
      openDrawer: jest.fn(),
    } as unknown as DrawerComponent;
    component.openEditDrawer();
    expect(component.drawer.invoiceId).toBe('FV2353');
  });

  it('should dispatch markInvoiceAsPaid action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.markAsPaid('FV2353');
    expect(dispatchSpy).toHaveBeenCalledWith(
      InvoiceActions.markInvoiceAsPaid({ invoiceId: 'FV2353' })
    );
  });

  it('should open the delete modal', () => {
    component.openDeleteModal();
    expect(component.isDeleteModalOpen).toBe(true);
  });

  it('should close the delete modal', () => {
    component.openDeleteModal();
    component.closeDeleteModal();
    expect(component.isDeleteModalOpen).toBe(false);
  });
});
