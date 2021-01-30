import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/customer.interface';
import { CustomerService } from '../../services/customer.service';
import { telephoneNumberValidator } from '../../shared/validators/telephone-number';
import { locationValidator } from '../../shared/validators/location';
import { numberValidator } from '../../shared/validators/number';

@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.scss']
})
export class CustomerOperationsComponent implements OnInit {

  isUpdate: boolean;
  customerForm: FormGroup;
  customerData: Customer;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CustomerOperationsComponent>,
    private customerService: CustomerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.customerData = data.customer;
    }
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: [this.isUpdate ? this.customerData.name : '', Validators.required],
      personOfContact: [this.isUpdate ? this.customerData.personOfContact : '', Validators.required],
      telephoneNumber: [this.isUpdate ? this.customerData.telephoneNumber : '', [Validators.required, telephoneNumberValidator()]],
      location: [this.isUpdate ? this.customerData.location : '', [Validators.required, locationValidator()]],
      numberOfEmployees: [this.isUpdate ? this.customerData.numberOfEmployees : '', [Validators.required, numberValidator()]],
    });
  }

  getTitle(): string {
    return this.isUpdate ? 'Update Customer' : 'Create customer';
  }

  save() {
    const input = this.customerForm.value;
    // @ts-ignore
    const Observable: Observable<Customer> =
      this.isUpdate ? this.customerService.updateCustomer({ customerId: this.customerData.customerId, ...input })
        : this.customerService.createCustomer(input);
    Observable.subscribe(res => {
      this.dialogRef.close(res);
    });
  }

  getLocationErrorMsg() {
    const location = this.customerForm.get('location');
    return location.hasError('invalidLocation') ? 'Please input location in city, country format.' : '';
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
