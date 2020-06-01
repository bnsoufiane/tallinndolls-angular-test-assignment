import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class TallinndollsService {

  constructor(protected http: HttpClient) {
  }

  protected getUrl(...args): string {
    return environment.REST_URL + '/' + args.join('/');
  }
}
