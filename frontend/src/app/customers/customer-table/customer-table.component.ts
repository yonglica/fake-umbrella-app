import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/customer.interface';
import { ITdDataTableColumn, ITdDataTableSelectAllEvent, ITdDataTableSelectEvent } from '@covalent/core/data-table';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TdDialogService } from '@covalent/core/dialogs';
import { CustomerOperationsComponent } from '../customer-operations/customer-operations.component';
import { catchError, flatMap, toArray } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  customersList: Customer[] = [];
  selectedCustomers: Customer[] = [];

  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Name' },
    { name: 'personOfContact', label: 'Contact' },
    { name: 'telephoneNumber', label: 'Telephone' },
    { name: 'location', label: 'Location' },
    { name: 'numberOfEmployees', label: 'Employee Number' },
  ];

  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogService: TdDialogService,
  ) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  getCustomerList() {
    this.customerService.getAllCustomers().subscribe(res => {
      this.customersList = res;
      this.selectedCustomers = [];
    });
  }

  disableEditButton() {
    return !(this.selectedCustomers.length === 1);
  }

  disableDeleteButton() {
    return this.selectedCustomers.length === 0;
  }

  rowSelected(event: ITdDataTableSelectEvent) {
    if (event.selected) {
      this.addRowToSelection(event.row);
    } else {
      this.removeRowFromSelection(event.row);
    }
  }

  selectAllEvent(event: ITdDataTableSelectAllEvent) {
    _.forEach(event.rows, row => {
      if (event.selected) {
        this.addRowToSelection(row);
      } else {
        this.removeRowFromSelection(row);
      }
    });
  }

  addRowToSelection(row: any) {
    const elem = _.find(this.selectedCustomers, e => e.customerId === row.customerId);
    if (!elem) {
      this.selectedCustomers.push(_.clone(row));
    }
  }

  removeRowFromSelection(row: any) {
    const elem = _.find(this.selectedCustomers, e => e.customerId === row.customerId);
    if (elem) {
      _.pull(this.selectedCustomers, elem);
    }
  }


  addOrEditCustomer(editMode: boolean) {
    const dialogRef = this.dialog.open(CustomerOperationsComponent, {
      width: '500px',
      data: {
        customer: editMode ? this.selectedCustomers[0] : null,
      }
    });
    dialogRef.componentInstance.isUpdate = editMode;
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getCustomerList();
      }
    });
  }

  deleteCustomer() {
    this.dialogService.openConfirm({
      message: 'Please confirm that you want to delete selected customer.',
      title: 'Delete customer?',
      width: '460px',
    }).afterClosed().pipe(
      flatMap(accept => {
        if (accept) {
          return from(this.selectedCustomers);
        } else {
          return of();
        }
      }),
      flatMap(customer => {
        const id = (customer as Customer).customerId;
        if (id) {
          return this.customerService.deleteCustomer(id).pipe(
            catchError(err => {
              return of(err);
            }),
          );
        }
      }),
      toArray(),
    ).subscribe(res => {
      if (res.length > 0) {
        for (const elem of res as any[]) {
          if (elem instanceof HttpErrorResponse) {
            this.snackBar.open(elem.message, 'Dismiss', { duration: 4000 });
          }
        }
        this.getCustomerList();
      }
    });
  }

}
