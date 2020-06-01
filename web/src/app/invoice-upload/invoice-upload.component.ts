import { Component, ElementRef, ViewChild } from '@angular/core';
import { UnsubscriptionHandler } from '../shared/rxjs/unsubscription-handler';
import { AppState } from '../shared/appState';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';

@Component({
  selector: 'app-invoice-upload',
  templateUrl: './invoice-upload.component.html',
  styleUrls: ['./invoice-upload.component.scss']
})
export class InvoiceUploadComponent extends UnsubscriptionHandler {

  @ViewChild('CSVFileInput', {static: true}) currencyFileInput: ElementRef;
  csvFile: File;

  constructor(protected store: Store<AppState>) {
    super();
  }

  uploadCSV(): void {
    const fileBrowser = this.currencyFileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.csvFile = fileBrowser.files[0];
    }
  }

  upload(): void {
    this.store.dispatch(new fromStore.UploadInvoice(this.csvFile));
  }

}

