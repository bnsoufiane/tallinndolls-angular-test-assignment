import { Action } from '@ngrx/store';
import { PayloadAction } from '../../shared/ngrx/payload-action';
import { Invoice } from '../../interfaces/invoice.interface';

// load invoices
export const LOAD_INVOICES = '[Invoices] LOAD_INVOICES';
export const LOAD_INVOICES_SUCCESS = '[Invoices] LOAD_INVOICES_SUCCESS';
export const LOAD_INVOICES_FAIL = '[Invoices] LOAD_INVOICES_FAIL';

// upload invoice
export const UPLOAD_INVOICE = '[Invoices] UPLOAD_INVOICE';
export const UPLOAD_INVOICE_SUCCESS = '[Invoices] UPLOAD_INVOICE_SUCCESS';
export const UPLOAD_INVOICE_FAIL = '[Invoices] UPLOAD_INVOICE_FAIL';

// load invoices
export class LoadInvoices implements Action {
  readonly type = LOAD_INVOICES;
}

export class LoadInvoicesSuccess extends PayloadAction<Invoice[]> {
  readonly type = LOAD_INVOICES_SUCCESS;
}

export class LoadInvoicesFail extends PayloadAction<any> {
  readonly type = LOAD_INVOICES_FAIL;
}

// upload invoice
export class UploadInvoice extends PayloadAction<File> {
  readonly type = UPLOAD_INVOICE;
}

export class UploadInvoiceSuccess implements Action {
  readonly type = UPLOAD_INVOICE_SUCCESS;
}

export class UploadInvoiceFail extends PayloadAction<any> {
  readonly type = UPLOAD_INVOICE_FAIL;
}

export type InvoicesAction =
  | LoadInvoices | LoadInvoicesSuccess | LoadInvoicesFail
  | UploadInvoice | UploadInvoiceSuccess | UploadInvoiceFail;
