import { WeatherForecast } from './weatherForecast.interface';

export interface Customer {
  customerId?: string;
  name: string;
  personOfContact: string;
  telephoneNumber: string;
  location: string;
  numberOfEmployees: number;
  weatherForecast?: WeatherForecast;
  rainTime?: string;
}
