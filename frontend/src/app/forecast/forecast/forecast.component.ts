import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDataTableService } from '@covalent/core/data-table';
import { ForecastService } from '../../services/forecast.service';
import { CustomerForecast } from '../../models/customerForecast.interface';

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

  constructor(
    private dataTableService: TdDataTableService,
    private forecastService: ForecastService,
  ) { }

  ngOnInit() {
    this.forecastService.getForecast().subscribe(res => {
      this.generateForecastData(res);
    });
  }

  generateForecastData(customerForecasts: CustomerForecast[]) {
    const rainyDayForecasts = [];
    for (const customerForecast of customerForecasts) {
      if (customerForecast.rainInFiveDays) {
        const rainyDaySet = new Set();
        for (const rainDate of customerForecast.rainDates) {
          rainyDaySet.add(rainDate.split(' ')[0]);
        }
        customerForecast.rainTime = Array.from(rainyDaySet.values()).join(';');
        rainyDayForecasts.push(customerForecast);
      }
    }
    this.customerForecastList = rainyDayForecasts;
  }

}
