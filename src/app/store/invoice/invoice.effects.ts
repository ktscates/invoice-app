import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs';
import * as InvoiceActions from './invoice.actions';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { Invoice } from '../../models/invoice.model';

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

  loadInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoice),
      switchMap((action) =>
        this.invoiceService.getInvoiceById(action.invoiceId).pipe(
          map((invoice: Invoice) =>
            InvoiceActions.loadInvoiceSuccess({ invoice })
          ),
          catchError((error) =>
            of(InvoiceActions.loadInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  createInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.createInvoice),
      switchMap(({ invoice }) =>
        this.invoiceService.createInvoice(invoice).pipe(
          map((createdInvoice) =>
            InvoiceActions.loadInvoiceSuccess({ invoice: createdInvoice })
          ),
          catchError((error) =>
            of(InvoiceActions.loadInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  updateInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.updateInvoice),
      switchMap(({ invoice }) =>
        this.invoiceService.updateInvoice(invoice).pipe(
          map((updatedInvoice) =>
            InvoiceActions.loadInvoiceSuccess({ invoice: updatedInvoice })
          ),
          catchError((error) =>
            of(InvoiceActions.loadInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  deleteInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.deleteInvoice),
      switchMap(({ id }) =>
        this.invoiceService.deleteInvoice(id).pipe(
          switchMap(() => [
            InvoiceActions.deleteInvoiceSuccess({ id }),
            InvoiceActions.loadInvoices(),
          ]),
          catchError((error) =>
            of(InvoiceActions.deleteInvoiceFailure({ error }))
          )
        )
      )
    )
  );

  markInvoiceAsPaid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.markInvoiceAsPaid),
      switchMap(({ invoiceId }) =>
        this.invoiceService.getInvoiceById(invoiceId).pipe(
          switchMap((invoice: Invoice) => {
            const updatedInvoice = {
              ...invoice,
              status: 'paid',
            };
            return this.invoiceService.updateInvoice(updatedInvoice).pipe(
              map((updatedInvoice) =>
                InvoiceActions.loadInvoiceSuccess({ invoice: updatedInvoice })
              ),
              catchError((error) =>
                of(InvoiceActions.loadInvoiceFailure({ error }))
              )
            );
          }),
          catchError((error) =>
            of(InvoiceActions.loadInvoiceFailure({ error }))
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
