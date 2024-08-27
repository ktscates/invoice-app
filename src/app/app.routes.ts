import { Routes } from '@angular/router';
import { InvoiceListComponent } from './pages/invoice-list/invoice-list.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';

export const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'invoice-details/:id', component: InvoiceDetailsComponent },
];
