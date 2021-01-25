import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import {from, of, onErrorResumeNext, Subscription} from 'rxjs';
import { catchError, flatMap, map, toArray } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import { CustomerService } from '../../services/customer.service';
import { WeatherForecast } from '../../models/weatherForecast.interface';
import { Customer } from '../../models/customer.interface';
import * as _ from 'lodash';

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

  subscriptions$: Subscription = new Subscription();

  constructor(
    private weatherService: WeatherService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.subscriptions$.add(this.customerService.getAllCustomers().pipe(
      map(customerList => {
        const result = _.chain(customerList)
          .orderBy(['numberOfEmployees'], ['desc'])
          .slice(0, 4)
          .value();
        return result;
      }),
      flatMap((customers: Customer[]) => {
        return from(customers);
      }),
      flatMap((customer: Customer) => {
        const cityName = customer.location;
        return this.weatherService.getWeatherForecastByCityName(cityName).pipe(
          catchError(err => of(err)),
          map(res => {
            customer.weatherForecast = JSON.parse(JSON.stringify(res));
            return customer;
          })
        );
      }),
      toArray(),
    ).subscribe(
      res => {
        this.generateBarChartData(res);
      },
      err => {
      }
    ));
  }

  generateBarChartData(customers: Customer[]) {
    const emplyeeNumbers = [];
    const backgroundColors = [];
    for (const customer of customers) {
      this.barChartLabels.push(customer.name);
      emplyeeNumbers.push(customer.numberOfEmployees);
      const rainInFiveDay = this.rainInFiveDays(customer.weatherForecast);
      backgroundColors.push(rainInFiveDay ? '#008000' : '#FF0000');
    }
    this.populateBarChartData(emplyeeNumbers, backgroundColors);
  }

  rainInFiveDays(weatherForecast: WeatherForecast): boolean {
    for (const list of weatherForecast.list) {
      for (const weather of list.weather) {
        if (weather.main === 'Rain') {
          return true;
        }
      }
    }
    return false;
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
