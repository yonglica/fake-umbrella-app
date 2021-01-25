import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { SharedModule } from '../shared/shared.module';
import { ForecastComponent } from './forecast/forecast.component';
import { ForecastRoutingModule } from './forecast-routing.module';

@NgModule({
  declarations: [ForecastComponent],
  imports: [
    ForecastRoutingModule,
    CommonModule,
    CovalentDataTableModule,
    SharedModule,
  ],
  entryComponents: [
    ForecastComponent,
  ]
})
export class ForecastModule { }
