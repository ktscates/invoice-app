import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmptyInvoicesComponent } from './components/empty-invoices/empty-invoices.component';
import { HeaderComponent } from './components/header/header.component';
import { InvoiceDetailCardComponent } from './components/invoice-detail-card/invoice-detail-card.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { InvoiceDetailsComponent } from './pages/invoice-details/invoice-details.component';
import { Observable } from 'rxjs';
import { Invoice } from './models/invoice.model';
import { Store } from '@ngrx/store';
import * as selectors from './store/invoice.selectors';
import * as InvoiceActions from './store/invoice.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    EmptyInvoicesComponent,
    HeaderComponent,
    DrawerComponent,
    InvoiceDetailCardComponent,
    InvoiceDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'invoice-app';
}
