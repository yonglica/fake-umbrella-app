import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisCacheModule } from './redis-cache/redis-cache.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ForecastModule } from './forecast/forecast.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('DB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
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
