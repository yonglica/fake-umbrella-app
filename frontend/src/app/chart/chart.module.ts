import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ChartComponent } from './chart/chart.component';
import { CovalentBaseEchartsModule } from '@covalent/echarts/base';
import { CovalentBarEchartsModule } from '@covalent/echarts/bar';
import { ChartsModule } from 'ng2-charts';
import { ChartRoutingModule } from './chart-routing.module';

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    ChartRoutingModule,
    ChartsModule,
    CovalentBaseEchartsModule,
    CovalentBarEchartsModule,
    SharedModule,
  ]
})
export class ChartModule { }
