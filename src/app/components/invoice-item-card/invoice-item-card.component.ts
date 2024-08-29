import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { IconsComponent } from '../icons/icons.component';
import { Invoice } from '../../models/invoice.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-item-card',
  standalone: true,
  imports: [HeaderComponent, IconsComponent, CommonModule],
  templateUrl: './invoice-item-card.component.html',
  styleUrl: './invoice-item-card.component.css',
})
export class InvoiceItemCardComponent {
  @Input() invoice!: Invoice;

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/invoice-details', this.invoice.id]);
  }
}
