import { ActionReducerMap } from '@ngrx/store';
import { InvoiceReducer } from './invoice/invoice.reducers';
import { ThemeReducer } from './theme/theme.reducer';
import { AppState } from '../models/invoice.model';

export const reducers: ActionReducerMap<AppState> = {
  theme: ThemeReducer,
  invoice: InvoiceReducer,
};
