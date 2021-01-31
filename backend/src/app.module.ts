import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ForecastModule } from './forecast/forecast.module';

// const DB_URL = 'mongodb://database:27017/customers';    // Docker
const DB_URL = 'mongodb://localhost/customers';         // local

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    HttpModule,
    CustomerModule,
    ForecastModule,
    RedisCacheModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
