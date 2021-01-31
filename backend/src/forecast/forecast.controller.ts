import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ForecastService } from './services/forecast.service';

@ApiTags('forecast')
@Controller()
export class ForecastController {

  constructor(private forecastService: ForecastService) {}

  @ApiOperation({summary: 'Retrieve a list of customers that will have rain for the next 5 days with the name, contact and phone number and for when the rain is expected.'})
  @ApiOkResponse({description: 'Retrieved forecast data successfully'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @Get('forecast')
  async getForecast(@Res() res) {
    try {
      const forecast = await this.forecastService.getForecast();
      return res.status(HttpStatus.OK).json(forecast);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

  @ApiOperation({summary: 'Retrieve rain forecast report for the next 5 days for given top customers.'})
  @ApiParam({name: 'topCustomerNumber', required: true, description: 'The top number of companies with most employees'})
  @ApiOkResponse({description: 'Retrieved forecast data successfully'})
  @ApiInternalServerErrorResponse({description: 'Internal server error'})
  @Get('report')
  async getTopReport(@Res() res, @Query('top') topCustomerNumber) {
    try {
      const topReport = await this.forecastService.getTopReport(topCustomerNumber);
      return res.status(HttpStatus.OK).json(topReport);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }

}
