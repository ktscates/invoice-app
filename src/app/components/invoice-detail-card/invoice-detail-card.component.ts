import { Component, Input } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { Invoice } from '../../models/invoice.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as selectors from '../../store/invoice.selectors';
import * as InvoiceActions from '../../store/invoice.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-detail-card',
  standalone: true,
  imports: [IconsComponent, CommonModule],
  templateUrl: './invoice-detail-card.component.html',
  styleUrl: './invoice-detail-card.component.css',
})
export class InvoiceDetailCardComponent {
  invoice$: Observable<Invoice | null | undefined>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.invoice$ = this.store.select(selectors.selectSelectedInvoice);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(InvoiceActions.loadInvoice({ invoiceId: id }));
    }
  }

  goBack() {
    window.history.back();
  }
}
