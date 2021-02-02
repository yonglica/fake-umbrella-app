import { Injectable, Logger } from '@nestjs/common';
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
    Logger.log(`retrieve weather forecast`);
    const customers = await this.customerService.getAllCustomer();
    return this.getForecastList(customers);
  }

  async getTopReport(top: number): Promise<Forecast[]> {
    Logger.log(`retrieve Top ${top} customers weather report`);
    const customers = await this.customerService.getCustomersSortByEmployeesNumber();
    return this.getForecastList(customers);
  }

  async getForecastList(customers: Customer[]): Promise<Forecast[]> {
    const forecastList: Array<Forecast> = [];
    for (const customer of customers) {
      const locationArray = customer.location.split(',');
      const cityName = locationArray[0];
      const countryCode = locationArray[1];

      Logger.log(`try to retrieve weather cache for ${cityName}:${countryCode}`);
      let weatherForecast = await this.weatherCacheService.get<WeatherForecast>(`${cityName}:${countryCode}`);
      if (!weatherForecast) {
        Logger.log('weather cache not found, retrieve from external api');
        weatherForecast = await this.openweatherService.getWeatherForecastByCityNameAndCountryCode(cityName, countryCode);
        Logger.log('weather retrieved from external api, saving to cache');
        this.weatherCacheService.set(`${cityName}:${countryCode}`, weatherForecast);
      } else {
        Logger.log(`weather cache found ${cityName}:${countryCode}`);
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
