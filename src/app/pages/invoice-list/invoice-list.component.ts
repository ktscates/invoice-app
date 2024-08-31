import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InvoiceItemCardComponent } from '../../components/invoice-item-card/invoice-item-card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';
import * as InvoiceActions from '../../store/invoice.actions';
import * as selectors from '../../store/invoice.selectors';
import { CommonModule } from '@angular/common';
import { EmptyInvoicesComponent } from '../../components/empty-invoices/empty-invoices.component';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [
    InvoiceItemCardComponent,
    EmptyInvoicesComponent,
    CommonModule,
    HeaderComponent,
  ],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css',
})
export class InvoiceListComponent {
  invoices$: Observable<Invoice[]>;
  totalInvoices$: Observable<number>;

  constructor(private store: Store) {
    this.invoices$ = this.store.select(selectors.selectFilteredInvoices);
    this.totalInvoices$ = this.store.select(selectors.selectInvoiceTotal);
  }

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.loadInvoices());
  }
}
