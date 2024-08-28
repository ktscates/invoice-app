import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-invoice-detail-card',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './invoice-detail-card.component.html',
  styleUrl: './invoice-detail-card.component.css',
})
export class InvoiceDetailCardComponent {}
