import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../../customer/interfaces/customer.interface';
import { CustomerService } from '../../customer/customer.service';
import { WeatherForecast } from '../interfaces/weatherForecast.interface';
import { Forecast } from '../interfaces/forecast.interface';
import { OpenweatherService } from './openweather.service';

@Injectable()
export class ForecastService {

  constructor(
    private customerService: CustomerService,
    private openweatherService: OpenweatherService,
  ) {}

  async getForecast(): Promise<Forecast[]> {
    const customers = await this.customerService.getAllCustomer();
    return this.getForecastList(customers);
  }

  async getTopReport(top: number): Promise<Forecast[]> {
    const forecastList: Array<Forecast> = [];
    const customers = await this.customerService.getCustomersSortByEmployeesNumber();
    return this.getForecastList(customers);;
  }

  async getForecastList(customers: Customer[]): Promise<Forecast[]> {
    const forecastList: Array<Forecast> = [];
    for (const customer of customers) {
      const locationArray = customer.location.split(',');
      const cityName = locationArray[0];
      const countryCode = locationArray[1];
      const weatherForecast = await this.openweatherService.getWeatherForecastByCityNameAndCountryCode(cityName, countryCode);
      const rainyDays = this.getRainyDays(weatherForecast);
      const forecast = {
        name: customer.name,
        personOfContact: customer.personOfContact,
        telephoneNumber: customer.telephoneNumber,
        location: customer.location,
        numberOfEmployees: customer.numberOfEmployees,
        rainDates: rainyDays,
        rainInFiveDays: rainyDays.length > 0 ? true : false,
      };
      forecastList.push(forecast);
    }
    return forecastList;
  }

  getRainyDays(weatherForecast: WeatherForecast): string[] {
    const rainyDays: Array<string> = [];
    for (const list of weatherForecast.list) {
      for (const weather of list.weather) {
        if (weather.main === 'Rain') {
          rainyDays.push(list.dt_txt);
        }
      }
    }
    return rainyDays;
  }

}
