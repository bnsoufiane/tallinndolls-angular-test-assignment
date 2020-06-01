import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInvoices from './invoices.reducer';

export interface InvoiceStoreState {
  invoices: fromInvoices.InvoicesState;
}

export const invoiceStoreReducers: ActionReducerMap<InvoiceStoreState> = {
  invoices: fromInvoices.reducer
};

export const getInvoiceStoreState = createFeatureSelector<InvoiceStoreState>('invoices');

// invoices state
export const getInvoicesState = createSelector(getInvoiceStoreState, (state: InvoiceStoreState) => state.invoices);
export const getInvoices = createSelector(getInvoicesState, fromInvoices.getInvoices);
