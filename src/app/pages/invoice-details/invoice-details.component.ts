import { Component } from '@angular/core';
import { InvoiceDetailCardComponent } from '../../components/invoice-detail-card/invoice-detail-card.component';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [InvoiceDetailCardComponent],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css',
})
export class InvoiceDetailsComponent {}
