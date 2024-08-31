import { Component, Input } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { DrawerComponent } from '../drawer/drawer.component';
import { Observable, map } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import { Store } from '@ngrx/store';
import * as selectors from '../../store/invoice.selectors';
import { CommonModule } from '@angular/common';
import * as InvoiceActions from '../../store/invoice.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconsComponent, DrawerComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDropdownOpen = false;
  @Input() drawer!: DrawerComponent;
  totalInvoices$: Observable<number>;

  constructor(private store: Store) {
    this.totalInvoices$ = this.store.select(selectors.selectInvoiceTotal);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  openDrawer() {
    this.drawer.openDrawer();
  }

  setFilter(filter: 'all' | 'paid' | 'pending' | 'draft') {
    this.store.dispatch(InvoiceActions.setFilter({ filter }));
    this.toggleDropdown();
  }
}
