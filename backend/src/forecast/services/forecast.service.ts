import { Injectable } from '@nestjs/common';
import { Customer } from '../../customer/interfaces/customer.interface';
import { CustomerService } from '../../customer/customer.service';
import { WeatherForecast } from '../interfaces/weatherForecast.interface';
import { Forecast } from '../interfaces/forecast.interface';
import { OpenweatherService } from './openweather.service';
import { RedisCacheService } from '../../redis-cache/redis-cache.service'

@Injectable()
export class ForecastService {

  constructor(
    private customerService: CustomerService,
    private weatherCacheService: RedisCacheService,
    private openweatherService: OpenweatherService,
  ) {}

  async getForecast(): Promise<Forecast[]> {
    const customers = await this.customerService.getAllCustomer();
    return this.getForecastList(customers);
  }

  async getTopReport(top: number): Promise<Forecast[]> {
    const customers = await this.customerService.getCustomersSortByEmployeesNumber();
    return this.getForecastList(customers);;
  }

  async getForecastList(customers: Customer[]): Promise<Forecast[]> {
    const forecastList: Array<Forecast> = [];
    for (const customer of customers) {
      const locationArray = customer.location.split(',');
      const cityName = locationArray[0];
      const countryCode = locationArray[1];

      let weatherForecast = await this.weatherCacheService.get<WeatherForecast>(`${cityName}:${countryCode}`);
      if (!weatherForecast) {
        console.log('weather cache not found, retrieve from api');
        weatherForecast = await this.openweatherService.getWeatherForecastByCityNameAndCountryCode(cityName, countryCode);
        console.log('weather retrieved, saving to cache');
        this.weatherCacheService.set(`${cityName}:${countryCode}`, weatherForecast);
      }

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
