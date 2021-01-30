import { Injectable, HttpService } from '@nestjs/common';
import { from, of, Subscription } from 'rxjs';
import { WeatherForecast } from '../interfaces/weatherForecast.interface';
import axios from 'axios';

// TODO: find a secure/dynamic way to manage and import api key
const WEATHER_API_KEY = '4a511633e9c55ee9ed5e7bc0d598f48f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

@Injectable()
export class OpenweatherService {

  constructor(private http: HttpService) {}

  async getWeatherForecastByCityNameAndCountryCode(cityName: string, countryCode: string): Promise<WeatherForecast> {
    try {
      const result = axios.get(`${WEATHER_API_URL}/forecast?q=${cityName},${countryCode}&appid=${WEATHER_API_KEY}`);
      return result.then((result) => result.data);
    } catch (error) {
      console.log(error.message);
      return error.response.data;
    }
  }

  async getWeatherForecastByZipCode(zipCode: string): Promise<WeatherForecast> {
    const countryCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(zipCode) ? 'ca' : 'us';
    try {
      const result = axios.get(`${WEATHER_API_URL}/forecast?zip=${zipCode},${countryCode}&appid=${WEATHER_API_KEY}`);
      return result.then((result) => result.data);
    } catch (error) {
      console.log(error.message);
      return error.response.data;
    }
  }

  async getWeatherForecastByCityName(cityName: string): Promise<WeatherForecast> {
    try {
      const result = axios.get(`${WEATHER_API_URL}/forecast?q=${cityName}&appid=${WEATHER_API_KEY}`);
      return result.then((result) => result.data);
    } catch (error) {
      console.log(error.message);
    }
  }

}
