import { Component, ViewChild } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { Invoice } from '../../models/invoice.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as selectors from '../../store/invoice/invoice.selectors';
import * as InvoiceActions from '../../store/invoice/invoice.actions';
import { CommonModule } from '@angular/common';
import { DrawerComponent } from '../drawer/drawer.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';

@Component({
  selector: 'app-invoice-detail-card',
  standalone: true,
  imports: [
    IconsComponent,
    CommonModule,
    DrawerComponent,
    DeleteModalComponent,
  ],
  templateUrl: './invoice-detail-card.component.html',
  styleUrl: './invoice-detail-card.component.css',
})
export class InvoiceDetailCardComponent {
  invoice$: Observable<Invoice | null | undefined>;
  @ViewChild(InvoiceFormComponent) invoiceForm!: InvoiceFormComponent;
  @ViewChild(DrawerComponent) drawer!: DrawerComponent;
  invoiceId!: string;
  selectedInvoice$!: Observable<Invoice | null | undefined>;
  isDeleteModalOpen = false;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.invoice$ = this.store.select(selectors.selectSelectedInvoice);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.invoiceId = params.get('id')!;
      if (this.invoiceId) {
        this.loadInvoiceData(this.invoiceId);
      }
    });
  }

  loadInvoiceData(id: string): void {
    this.store.dispatch(InvoiceActions.loadInvoice({ invoiceId: id }));
    this.selectedInvoice$ = this.store.select(selectors.selectSelectedInvoice);
  }

  goBack() {
    window.history.back();
  }

  // OPEN DRAWER TO EDIT
  openEditDrawer(): void {
    if (this.invoiceId && this.drawer) {
      this.drawer.invoiceId = this.invoiceId;
      this.drawer.openDrawer();
    }
  }

  // MARK AS PAID
  markAsPaid(invoiceId: string): void {
    this.store.dispatch(InvoiceActions.markInvoiceAsPaid({ invoiceId }));
  }

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }
}
