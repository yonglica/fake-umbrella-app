import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.interface';

export const BACKEND_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) {}

  getForecast() {
    return this.http.get<Customer[]>(`${BACKEND_URL}/forecast`);
  }

  getTopReport(topNumber: number) {
    console.log(`calling getTopReport: ${topNumber}`);
    return this.http.get<Customer[]>(`${BACKEND_URL}/report?top=${topNumber}`);
  }

}
