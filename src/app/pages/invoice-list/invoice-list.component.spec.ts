import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvoiceListComponent } from './invoice-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as selectors from '../../store/invoice/invoice.selectors';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { HeaderComponent } from '../../components/header/header.component';
import { InvoiceItemCardComponent } from '../../components/invoice-item-card/invoice-item-card.component';
import { EmptyInvoicesComponent } from '../../components/empty-invoices/empty-invoices.component';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../models/invoice.model';

const invoices = [
  {
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
  },
];

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InvoiceListComponent,
        HeaderComponent,
        InvoiceItemCardComponent,
        EmptyInvoicesComponent,
        CommonModule,
      ],
      providers: [provideMockStore({ initialState: invoices })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadInvoices', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(InvoiceActions.loadInvoices());
  });

  it('should display invoice items ', () => {
    expect(invoices.length).toBe(1);
  });

  it('should display EmptyInvoicesComponent when there are no invoices', () => {
    store.overrideSelector(selectors.selectFilteredInvoices, []);
    store.overrideSelector(selectors.selectInvoiceTotal, 0);
    fixture.detectChanges();
    const emptyInvoices =
      fixture.nativeElement.querySelector('app-empty-invoices');
    expect(emptyInvoices).toBeTruthy();
  });
});
