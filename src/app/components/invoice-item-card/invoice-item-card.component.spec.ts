import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { InvoiceItemCardComponent } from './invoice-item-card.component';
import { Invoice } from '../../models/invoice.model';
import { HeaderComponent } from '../header/header.component';
import { IconsComponent } from '../icons/icons.component';
import { CommonModule } from '@angular/common';

const invoice: Invoice = {
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

describe('InvoiceItemCardComponent', () => {
  let component: InvoiceItemCardComponent;
  let fixture: ComponentFixture<InvoiceItemCardComponent>;
  let router: Router;
  let routerNavigateSpy: jest.SpyInstance;

  beforeEach(async () => {
    // Create a mock router
    router = {
      navigate: jest.fn(),
    } as unknown as Router;

    await TestBed.configureTestingModule({
      imports: [
        InvoiceItemCardComponent,
        HeaderComponent,
        IconsComponent,
        CommonModule,
      ],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceItemCardComponent);
    component = fixture.componentInstance;
    routerNavigateSpy = jest.spyOn(router, 'navigate');
    component.invoice = {
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
    } as Invoice;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call router.navigate with correct id', () => {
    component.viewDetails();
    expect(router.navigate).toHaveBeenCalledWith([
      '/invoice-details',
      component.invoice.id,
    ]);
  });
});
