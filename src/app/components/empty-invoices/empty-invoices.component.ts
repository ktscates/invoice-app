import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';

@Component({
  selector: 'app-empty-invoices',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './empty-invoices.component.html',
  styleUrl: './empty-invoices.component.css',
})
export class EmptyInvoicesComponent {}
