import { createSelector, createFeatureSelector } from '@ngrx/store';
import { invoiceAdapter } from './invoice.reducers';
import { InvoiceState } from '../models/invoice.model';

export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoices');

export const selectInvoiceEntities =
  invoiceAdapter.getSelectors(selectInvoiceState).selectEntities;

export const { selectAll: selectAllInvoices, selectTotal: selectInvoiceTotal } =
  invoiceAdapter.getSelectors(selectInvoiceState);

export const selectSelectedInvoiceId = createSelector(
  selectInvoiceState,
  (state: InvoiceState) => state.selectedInvoiceId
);

export const selectSelectedInvoice = createSelector(
  selectInvoiceEntities,
  selectSelectedInvoiceId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);
