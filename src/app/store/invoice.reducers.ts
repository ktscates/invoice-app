import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { Invoice, InvoiceState } from '../models/invoice.model';
import * as InvoiceActions from './invoice.actions';

// Create Entity Adapter
export const invoiceAdapter = createEntityAdapter<Invoice>();

// Define initial state using invoice adapter
const initialState: InvoiceState = invoiceAdapter.getInitialState({
  selectedInvoiceId: null,
  error: null,
});

const _invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) =>
    invoiceAdapter.setAll(invoices, state)
  ),
  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(InvoiceActions.createInvoice, (state, { invoice }) =>
    invoiceAdapter.addOne(invoice, state)
  ),
  on(InvoiceActions.updateInvoice, (state, { invoice }) =>
    invoiceAdapter.updateOne({ id: invoice.id, changes: invoice }, state)
  ),
  on(InvoiceActions.deleteInvoice, (state, { id }) =>
    invoiceAdapter.removeOne(id, state)
  ),
  on(InvoiceActions.selectInvoice, (state, { id }) => ({
    ...state,
    selectedInvoiceId: id,
  }))
);

export function InvoiceReducer(
  state: InvoiceState | undefined,
  action: Action
) {
  return _invoiceReducer(state, action);
}
