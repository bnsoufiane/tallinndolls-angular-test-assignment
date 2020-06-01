import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InvoiceUploadComponent } from './invoice-upload/invoice-upload.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { EffectsModule } from '@ngrx/effects';
import { InvoiceStoreEffect } from './store/effects';
import { StoreModule } from '@ngrx/store';
import { invoiceStoreReducers } from './store/reducers';
import { InvoiceService } from './services/invoice.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppMaterialModule } from './shared/app.material.module';
import { UploadResultDialogComponent } from './invoice-upload/upload-result-dialog/upload-result-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceUploadComponent,
    InvoiceListComponent,
    UploadResultDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxDatatableModule,
    AppMaterialModule,

    StoreModule.forRoot([]),
    StoreModule.forFeature('invoices', invoiceStoreReducers),
    EffectsModule.forRoot(InvoiceStoreEffect),
  ],
  providers: [
    InvoiceService
  ],
  entryComponents: [UploadResultDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
