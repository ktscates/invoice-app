import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmptyInvoicesComponent } from './components/empty-invoices/empty-invoices.component';
import { HeaderComponent } from './components/header/header.component';
import { InvoiceDetailCardComponent } from './components/invoice-detail-card/invoice-detail-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    EmptyInvoicesComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'invoice-app';
}
