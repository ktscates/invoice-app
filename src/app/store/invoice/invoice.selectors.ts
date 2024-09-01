import { createSelector, createFeatureSelector } from '@ngrx/store';
import { invoiceAdapter } from './invoice.reducers';
import { InvoiceState, Invoice } from '../../models/invoice.model';

// Create a feature selector for the invoice state
export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoices');

// Entity adapter selectors
export const {
  selectAll: selectAllInvoices,
  selectEntities: selectInvoiceEntities,
  selectTotal: selectInvoiceTotal,
} = invoiceAdapter.getSelectors(selectInvoiceState);

// Selector to get the selected invoice ID
export const selectSelectedInvoiceId = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.selectedInvoiceId
);

// Selector to get the selected invoice
export const selectSelectedInvoice = createSelector(
  selectInvoiceEntities,
  selectSelectedInvoiceId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

// Selector to get the current filter
export const selectInvoiceFilter = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.filter
);

// Selector to get filtered invoices
export const selectFilteredInvoices = createSelector(
  selectAllInvoices,
  selectInvoiceFilter,
  (invoices, filter) => {
    if (filter === 'all') {
      return invoices;
    }
    return invoices.filter((invoice) => invoice.status === filter);
  }
);
