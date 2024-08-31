import { EntityState } from '@ngrx/entity';

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

// Define Entity State
export interface InvoiceState extends EntityState<Invoice> {
  selectedInvoiceId: string | null;
  error: string | null;
  filter: 'all' | 'paid' | 'pending' | 'draft';
}
