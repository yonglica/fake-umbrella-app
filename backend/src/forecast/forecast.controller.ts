import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { ForecastService } from './services/forecast.service';

@Controller()
export class ForecastController {

  constructor(private forecastService: ForecastService) {}

  @Get('forecast')
  async getForecast(@Res() res) {
    const forecast = await this.forecastService.getForecast();
    return res.status(HttpStatus.OK).json(forecast);
  }

  @Get('report')
  async getTopReport(@Res() res, @Query('top') top) {
    const topReport = await this.forecastService.getTopReport(top);
    return res.status(HttpStatus.OK).json(topReport);
  }

}
