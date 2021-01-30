import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customer/customer.module';
import { ForecastModule } from './forecast/forecast.module';

// const DB_URL = 'mongodb://database:27017/customers';    // Docker
const DB_URL = 'mongodb://localhost/customers';         // local

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }),
    HttpModule,
    CustomerModule,
    ForecastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
