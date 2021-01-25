import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDataTableService } from '@covalent/core/data-table';
import {from, of, Subscription} from 'rxjs';
import { catchError, flatMap, map, toArray} from 'rxjs/operators';
import * as _ from 'lodash';
import { CustomerService } from '../../services/customer.service';
import { WeatherService } from '../../services/weather.service';
import { WeatherForecast } from '../../models/weatherForecast.interface';
import { CustomerForecast } from '../../models/customerForecast.interface';
import { Customer} from '../../models/customer.interface';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: 'name', label: 'Name' },
    { name: 'personOfContact', label: 'Contact' },
    { name: 'telephoneNumber', label: 'Telephone' },
    { name: 'location', label: 'Location' },
    { name: 'numberOfEmployees', label: 'Employee Number' },
    { name: 'rainTime', label: 'When' },
  ];

  customerForecastList: CustomerForecast[] = [];
  subscriptions$: Subscription = new Subscription();

  constructor(
    private dataTableService: TdDataTableService,
    private customerService: CustomerService,
    private weatherService: WeatherService,
  ) { }

  ngOnInit() {
    this.subscriptions$.add(this.customerService.getAllCustomers().pipe(
      map(customerList => {
        const result = _.chain(customerList)
          .orderBy(['numberOfEmployees'], ['desc'])
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
        this.generateForecastData(res);
      },
      err => {
        console.log(err);
      }
    ));
  }

  generateRainTime(weatherForecast: WeatherForecast) {
    let rainTime = '';
    for (const list of weatherForecast.list) {
      for (const weather of list.weather) {
        if (weather.main === 'Rain') {
          rainTime += list.dt_txt + '; ';
        }
      }
    }
    return rainTime;
  }

  generateForecastData(customers: Customer[]) {
    const customerForecastList = [];
    for (const customer of customers) {
      const foreCastRainTime = this.generateRainTime(customer.weatherForecast);
      if (foreCastRainTime !== '') {
        customer.rainTime = foreCastRainTime;
        const customerForecast = {
          name: customer.name,
          personOfContact: customer.personOfContact,
          telephoneNumber: customer.telephoneNumber,
          location: customer.location,
          numberOfEmployees: customer.numberOfEmployees,
          rainTime: foreCastRainTime,
        };
        customerForecastList.push(customerForecast);
      }
    }
    this.customerForecastList = customerForecastList;
  }

}
