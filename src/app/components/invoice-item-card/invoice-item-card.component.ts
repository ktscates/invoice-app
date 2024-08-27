import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-invoice-item-card',
  standalone: true,
  imports: [HeaderComponent, IconsComponent],
  templateUrl: './invoice-item-card.component.html',
  styleUrl: './invoice-item-card.component.css',
})
export class InvoiceItemCardComponent {}
