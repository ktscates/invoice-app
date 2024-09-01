import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Input() isOpen = false;
  @Input() invoiceId?: string;
  @Output() deleteConfirmed = new EventEmitter<void>();
  @Output() deleteCancelled = new EventEmitter<void>();

  constructor(private store: Store, private route: Router) {}

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    this.deleteCancelled.emit();
  }

  confirmDelete() {
    if (this.invoiceId) {
      this.store.dispatch(InvoiceActions.deleteInvoice({ id: this.invoiceId }));
      this.deleteConfirmed.emit();
    }
    this.close();
    this.route.navigate(['/']);
  }
}
