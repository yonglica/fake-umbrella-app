import { Module, HttpModule } from '@nestjs/common';
import { CustomerModule } from '../customer/customer.module';
import { RedisCacheModule } from '../redis-cache/redis-cache.module'
import { ForecastService } from './services/forecast.service';
import { ForecastController } from './forecast.controller';
import { OpenweatherService } from './services/openweather.service';

@Module({
  imports: [HttpModule, CustomerModule, RedisCacheModule],
  controllers: [ForecastController],
  providers: [ForecastService, OpenweatherService],
})
export class ForecastModule {}
