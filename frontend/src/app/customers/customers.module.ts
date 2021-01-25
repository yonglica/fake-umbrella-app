import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CustomerTableComponent } from '../customers/customer-table/customer-table.component';
import { CustomerOperationsComponent } from './customer-operations/customer-operations.component';
import { SharedModule } from '../shared/shared.module';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [CustomerTableComponent, CustomerOperationsComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    CovalentDataTableModule,
    SharedModule,
  ],
  entryComponents: [
    CustomerOperationsComponent,
  ]
})
export class CustomersModule { }
