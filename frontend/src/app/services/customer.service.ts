import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.interface';

// const BACKEND_URL = 'http://localhost:3000/fake-umbrella-api';
const BACKEND_URL = 'http://localhost:8080/fake-umbrella-api';
const CUSTOMER_PATH = 'customers';
const CUSTOMER_URL = `${BACKEND_URL}/${CUSTOMER_PATH}`;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) {}

  getAllCustomers() {
    return this.http.get<Customer[]>(`${CUSTOMER_URL}`);
  }

  getCustomer(id: string) {
    return this.http.get<Customer>(`${CUSTOMER_URL}/${id}`);
  }

  createCustomer(input: Customer) {
    return this.http.post<Customer>(`${CUSTOMER_URL}`, input);
  }

  deleteCustomer(id: string) {
    return this.http.delete(`${CUSTOMER_URL}/${id}`);
  }

  updateCustomer(input: Customer) {
    return this.http.put<Customer>(`${CUSTOMER_URL}?id=${input.id}`, input);
  }
}
