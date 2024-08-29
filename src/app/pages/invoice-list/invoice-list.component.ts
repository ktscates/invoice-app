import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InvoiceItemCardComponent } from '../../components/invoice-item-card/invoice-item-card.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Invoice } from '../../models/invoice.model';
import * as InvoiceActions from '../../store/invoice.actions';
import * as selector from '../../store/invoice.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [InvoiceItemCardComponent, CommonModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css',
})
export class InvoiceListComponent {
  invoices$: Observable<Invoice[]>;

  constructor(private store: Store) {
    this.invoices$ = this.store.select(selector.selectAllInvoices);
  }

  ngOnInit(): void {
    this.store.dispatch(InvoiceActions.loadInvoices());
  }
}
