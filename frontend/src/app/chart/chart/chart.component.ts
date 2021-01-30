import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ForecastService } from '../../services/forecast.service';
import { CustomerForecast } from '../../models/customerForecast.interface';

const TOP_NUMBER = 4;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero : true,
        }
      }]
    }
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [{ data: [] }];
  barChartLabels: string[] = [];

  constructor(private forecastService: ForecastService) { }

  ngOnInit() {
    this.forecastService.getTopReport(TOP_NUMBER).subscribe(res => {
      this.generateBarChartData(res);
    });
  }

  generateBarChartData(customerForecasts: CustomerForecast[]) {
    const emplyeeNumbers = [];
    const backgroundColors = [];
    for (const forecast of customerForecasts) {
      this.barChartLabels.push(forecast.name);
      emplyeeNumbers.push(forecast.numberOfEmployees);
      backgroundColors.push(forecast.rainInFiveDays ? '#008000' : '#FF0000');
    }
    this.populateBarChartData(emplyeeNumbers, backgroundColors);
  }

  populateBarChartData(emplyeeNumbers: any[], backgroundColors: any[]) {
    this.barChartData = [{
      data: emplyeeNumbers,
      backgroundColor: backgroundColors,
      label: 'Employee Number',
      hoverBackgroundColor: backgroundColors,
    }];
  }

}
