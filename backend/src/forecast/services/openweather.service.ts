import { Injectable, HttpService } from '@nestjs/common';
import { WeatherForecast } from '../interfaces/weatherForecast.interface';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenweatherService {

  constructor(
    private configService: ConfigService,
  ) {}

  WEATHER_API_KEY = this.configService.get<string>('WEATHER_API_KEY');
  WEATHER_API_URL = this.configService.get<string>('WEATHER_API_URL');

  async getWeatherForecastByCityNameAndCountryCode(cityName: string, countryCode: string): Promise<WeatherForecast> {
    try {
      const result = axios.get(`${this.WEATHER_API_URL}/forecast?q=${cityName},${countryCode}&appid=${this.WEATHER_API_KEY}`);
      return result.then((result) => result.data);
    } catch (error) {
      console.log(error.message);
      return error.response.data;
    }
  }

  async getWeatherForecastByZipCode(zipCode: string): Promise<WeatherForecast> {
    const countryCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(zipCode) ? 'ca' : 'us';
    try {
      const result = axios.get(`${this.WEATHER_API_URL}/forecast?zip=${zipCode},${countryCode}&appid=${this.WEATHER_API_KEY}`);
      return result.then((result) => result.data);
    } catch (error) {
      console.log(error.message);
      return error.response.data;
    }
  }

  async getWeatherForecastByCityName(cityName: string): Promise<WeatherForecast> {
    try {
      const result = axios.get(`${this.WEATHER_API_URL}/forecast?q=${cityName}&appid=${this.WEATHER_API_KEY}`);
      return result.then((result) => result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

}
