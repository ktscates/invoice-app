import { TestBed } from '@angular/core/testing';
import { InvoiceService } from './invoice.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Invoice } from '../../models/invoice.model';

const mockInvoices: Invoice[] = [
  {
    id: 'RT3080',
    createdAt: '2021-08-18',
    paymentDue: '2021-08-19',
    description: 'Re-branding',
    paymentTerms: 1,
    clientName: 'Jensen Huang',
    clientEmail: 'jensenh@mail.com',
    status: 'paid',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: '106 Kendell Street',
      city: 'Sharrington',
      postCode: 'NR24 5WQ',
      country: 'United Kingdom',
    },
    items: [
      {
        name: 'Brand Guidelines',
        quantity: 1,
        price: 1800.9,
        total: 1800.9,
      },
    ],
    total: 1800.9,
  },
  {
    id: 'XM9141',
    createdAt: '2021-08-21',
    paymentDue: '2021-09-20',
    description: 'Graphic Design',
    paymentTerms: 30,
    clientName: 'Alex Grim',
    clientEmail: 'alexgrim@mail.com',
    status: 'pending',
    senderAddress: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },
    clientAddress: {
      street: 'C. Falsa 445',
      city: 'Ciudad de México',
      postCode: '11001',
      country: 'Mexico',
    },
    items: [
      {
        name: 'Banner Design',
        quantity: 1,
        price: 156,
        total: 156,
      },
      {
        name: 'Email Design',
        quantity: 2,
        price: 160,
        total: 320,
      },
    ],
    total: 476,
  },
];

const newInvoice: Invoice = {
  id: 'RT2080',
  createdAt: '2021-10-11',
  paymentDue: '2021-10-12',
  description: 'Logo Concept',
  paymentTerms: 1,
  clientName: 'Alysa Werner',
  clientEmail: 'alysa@email.co.uk',
  status: 'pending',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: 'Erfundene Straße 33',
    city: 'München',
    postCode: '80732',
    country: 'Germany',
  },
  items: [
    {
      name: 'Logo Sketches',
      quantity: 1,
      price: 102.04,
      total: 102.04,
    },
  ],
  total: 102.04,
};

describe('InvoiceService', () => {
  let service: InvoiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InvoiceService],
    });

    service = TestBed.inject(InvoiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all invoices', () => {
    service.getAllInvoices().subscribe((invoices) => {
      expect(invoices.length).toBe(2);
      expect(invoices).toEqual(mockInvoices);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvoices);
  });

  it('should retrieve an invoice by ID', () => {
    service.getInvoiceById('XM9141').subscribe((invoice) => {
      expect(invoice).toEqual(mockInvoices[1]);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/XM9141`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvoices[1]);
  });

  it('should create a new invoice', () => {
    service.createInvoice(newInvoice).subscribe((invoice) => {
      expect(invoice).toEqual(newInvoice);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newInvoice);
    req.flush(newInvoice);
  });

  it('should update an existing invoice', () => {
    service.updateInvoice(newInvoice).subscribe((invoice) => {
      expect(invoice).toEqual(newInvoice);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/RT2080`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(newInvoice);
    req.flush(newInvoice);
  });

  it('should delete an invoice', () => {
    service.deleteInvoice('RT3080').subscribe((res) => {
      expect(res).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/RT3080`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
