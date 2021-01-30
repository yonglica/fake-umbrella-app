// https://openweathermap.org/forecast5#JSON

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: string;                     // forecast time: "2020-08-04 18:00:00"
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;                       // Group of weather parameters (Rain, Snow, Extreme etc.)
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Rain {
  "3h": number;
}

export interface Sys {
  pod: string;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}