import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceUploadComponent } from './invoice-upload/invoice-upload.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';


const routes: Routes = [
  {
    path: 'invoice-upload',
    component: InvoiceUploadComponent
  },
  {
    path: 'invoice-list',
    component: InvoiceListComponent
  },
  {path: '**', redirectTo: 'invoice-upload'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
