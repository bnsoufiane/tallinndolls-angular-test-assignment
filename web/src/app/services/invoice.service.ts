import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TallinndollsService } from '../shared/services/tallinndolls.service';
import { environment } from '../../environments/environment';
import { Invoice } from '../interfaces/invoice.interface';

@Injectable()
export class InvoiceService extends TallinndollsService {

  constructor(protected http: HttpClient) {
    super(http);
  }

  loadInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(
      this.getUrl(
        environment.INVOICES.LOAD_PATH
      )
    );
  }

  uploadInvoice(csvFile: File): Observable<any> {
    console.log('uploadInvoice: ', csvFile);
    const formData = new FormData();
    formData.append(
      'csv',
      csvFile
    );

    return this.http.post<any>(
      this.getUrl(
        environment.INVOICES.UPLOAD_PATH
      ),
      formData
    );
  }
}
