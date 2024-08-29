import { Component } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import * as selectors from '../../store/invoice.selectors';
import * as InvoiceActions from '../../store/invoice.actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-invoice-detail-card',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './invoice-detail-card.component.html',
  styleUrl: './invoice-detail-card.component.css',
})
export class InvoiceDetailCardComponent {}
