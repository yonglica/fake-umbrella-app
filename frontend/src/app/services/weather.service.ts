import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const WEATHER_API_KEY = '4a511633e9c55ee9ed5e7bc0d598f48f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForecastByZipCode(zipCode: string) {
    const countryCode = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(zipCode) ? 'ca' : 'us';
    return this.http.get(`${WEATHER_API_URL}/forecast?zip=${zipCode},${countryCode}&appid=${WEATHER_API_KEY}`);
  }

  getWeatherForecastByCityName(cityName: string) {
    return this.http.get(`${WEATHER_API_URL}/forecast?q=${cityName}&appid=${WEATHER_API_KEY}`);
  }

  getWeatherForecastByCityNameAndCountryCode(cityName: string, countryCode: string) {
    return this.http.get(`${WEATHER_API_URL}/forecast?q=${cityName},${countryCode}&appid=${WEATHER_API_KEY}`);
  }

}
