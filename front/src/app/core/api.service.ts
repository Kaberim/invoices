import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyData } from '../shared/models/company-data';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl = 'https://my-json-server.typicode.com/Kaberim/invoices/data';

  constructor(private http: HttpClient) {}

  getCompanyData(): Observable<CompanyData> {
    return this.http.get<CompanyData>(this.apiUrl);
  }
}
