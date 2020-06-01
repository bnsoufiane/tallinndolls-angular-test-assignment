import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromInvoices from '../actions/invoices.action';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/appState';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../interfaces/invoice.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UploadResultDialogComponent } from '../../invoice-upload/upload-result-dialog/upload-result-dialog.component';

@Injectable()
export class InvoicesEffect {

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private invoiceService: InvoiceService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  @Effect()
  loadInvoices$ = this.actions$.pipe(ofType(fromInvoices.LOAD_INVOICES))
    .pipe(
      switchMap(() => {
        return this.invoiceService.loadInvoices()
          .pipe(
            map((invoices: Invoice[]) => new fromInvoices.LoadInvoicesSuccess(invoices)),
            catchError(error => of(new fromInvoices.LoadInvoicesFail(error)))
          );
      }));

  @Effect()
  uploadInvoice$ = this.actions$.pipe(ofType(fromInvoices.UPLOAD_INVOICE))
    .pipe(
      map((action: fromInvoices.UploadInvoice) => action.payload),
      switchMap((csvFile: File) => {
        return this.invoiceService.uploadInvoice(csvFile)
          .pipe(
            map((parsingErrors) => {

              if (parsingErrors.errors) {
                this.dialog.open(UploadResultDialogComponent, {
                  data: parsingErrors.errors
                });
              }

              this.snackBar.open('Invoice has been uploaded successfully', '', {
                duration: 2000,
                panelClass: 'success-snackbar'
              });
              return new fromInvoices.UploadInvoiceSuccess();
            }),
            catchError(error => {
              this.snackBar.open('An error has occurred. Please try again later', '', {
                duration: 2000,
                panelClass: 'error-snackbar'
              });

              return of(new fromInvoices.UploadInvoiceFail(error));
            })
          );
      }));
}
