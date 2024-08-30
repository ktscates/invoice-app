import { createAction, props } from '@ngrx/store';
import { Invoice } from '../models/invoice.model';

const LOAD_INVOICES = '[Invoice List] Load Invoices';
const LOAD_INVOICES_SUCCESS = '[Invoice List] Load Invoices With Success';
const LOAD_INVOICES_FAILURE = '[Invoice List] Load Invoices With Failure';

const LOAD_INVOICE = '[Invoice Detail] Load Invoice';
const LOAD_INVOICE_SUCCESS = '[Invoice Detail] Load Invoice With Success';
const LOAD_INVOICE_FAILURE = '[Invoice Detail] Load Invoice With Failure';

const CREATE_INVOICE = '[Invoice Form] Create Invoice';
const UPDATE_INVOICE = '[Invoice Form] Update Invoice';
const DELETE_INVOICE = '[Invoice List] Delete Invoice';

const SELECT_INVOICE = '[Invoice List] Select Invoice';

export const loadInvoices = createAction(LOAD_INVOICES);
export const loadInvoicesSuccess = createAction(
  LOAD_INVOICES_SUCCESS,
  props<{ invoices: Invoice[] }>()
);
export const loadInvoicesFailure = createAction(
  LOAD_INVOICES_FAILURE,
  props<{ error: any }>()
);

export const loadInvoice = createAction(
  LOAD_INVOICE,
  props<{ invoiceId: string }>()
);
export const loadInvoiceSuccess = createAction(
  LOAD_INVOICE_SUCCESS,
  props<{ invoice: Invoice }>()
);
export const loadInvoiceFailure = createAction(
  LOAD_INVOICE_FAILURE,
  props<{ error: any }>()
);

export const createInvoice = createAction(
  CREATE_INVOICE,
  props<{ invoice: Invoice }>()
);
export const updateInvoice = createAction(
  UPDATE_INVOICE,
  props<{ invoice: Invoice }>()
);
export const deleteInvoice = createAction(
  DELETE_INVOICE,
  props<{ id: string }>()
);
export const selectInvoice = createAction(
  SELECT_INVOICE,
  props<{ id: string }>()
);
