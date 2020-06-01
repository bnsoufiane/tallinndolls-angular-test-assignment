import { Component } from '@angular/core';
import { UnsubscriptionHandler } from '../shared/rxjs/unsubscription-handler';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../store';
import { AppState } from '../shared/appState';
import { takeUntil } from 'rxjs/operators';
import { Invoice } from '../interfaces/invoice.interface';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends UnsubscriptionHandler {

  invoices: Invoice[];

  constructor(protected store: Store<AppState>) {
    super();

    this.store.dispatch(new fromStore.LoadInvoices());

    this.store.pipe(select(fromStore.getInvoices), takeUntil(this.unsubscribe$))
      .subscribe((invoices: Invoice[]) => {

        this.invoices = invoices;
      });
  }
}
