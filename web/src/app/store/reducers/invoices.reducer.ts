import * as fromInvoices from '../actions/invoices.action';
import { HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../../interfaces/invoice.interface';

export interface InvoicesState {
  invoices: Invoice[];
  loaded: boolean;
  loading: boolean;
  error?: HttpErrorResponse;
}

export const defaultState: InvoicesState = {
  invoices: null,
  loaded: false,
  loading: false,
  error: null
};

export function reducer(state: InvoicesState = defaultState,
                        action: fromInvoices.InvoicesAction): InvoicesState {

  switch (action.type) {

    case fromInvoices.LOAD_INVOICES: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    }

    case fromInvoices.LOAD_INVOICES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        invoices: action.payload as Invoice[]
      };
    }

    case fromInvoices.LOAD_INVOICES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    default:
      return state;
  }
}

export const getInvoices = (state: InvoicesState) => state.invoices;
