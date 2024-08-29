import { Component, Input } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-detail-card',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './invoice-detail-card.component.html',
  styleUrl: './invoice-detail-card.component.css',
})
export class InvoiceDetailCardComponent {}
