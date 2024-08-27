import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { InvoiceItemCardComponent } from '../../components/invoice-item-card/invoice-item-card.component';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [HeaderComponent, InvoiceItemCardComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.css',
})
export class InvoiceListComponent {}
