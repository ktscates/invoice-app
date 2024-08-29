import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs';
import * as InvoiceActions from './invoice.actions';
import { InvoiceService } from '../services/invoice/invoice.service';

@Injectable()
export class InvoiceEffects {
  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      switchMap(() =>
        this.invoiceService.getAllInvoices().pipe(
          map((invoices) => InvoiceActions.loadInvoicesSuccess({ invoices })),
          catchError((error) =>
            of(InvoiceActions.loadInvoicesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}
}
