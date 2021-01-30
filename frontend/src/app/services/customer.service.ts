import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.interface';

export const BACKEND_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getAllCustomers() {
    return this.http.get<Customer[]>(`${BACKEND_URL}/customers`);
  }

  getCustomer(id: string) {
    return this.http.get<Customer>(`${BACKEND_URL}/customer/${id}`);
  }

  createCustomer(input: Customer) {
    return this.http.post<Customer>(`${BACKEND_URL}/customer`, input);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${BACKEND_URL}/customer/${id}`);
  }

  updateCustomer(input: Customer) {
    return this.http.put<Customer>(`${BACKEND_URL}/customer?customerID=${input.customerId}`, input);
  }
}
