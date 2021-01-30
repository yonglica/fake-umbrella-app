import { Module, HttpModule } from '@nestjs/common';
import { ForecastService } from './services/forecast.service';
import { ForecastController } from './forecast.controller';
import { CustomerModule } from '../customer/customer.module';
import { OpenweatherService } from './services/openweather.service';

@Module({
  imports: [HttpModule, CustomerModule],
  controllers: [ForecastController],
  providers: [ForecastService, OpenweatherService],
})
export class ForecastModule {}
