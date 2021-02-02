import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ForecastService } from './forecast.service';
import { getModelToken } from '@nestjs/mongoose';
import { CustomerService } from '../../customer/customer.service';
import { OpenweatherService } from './openweather.service';
import { RedisCacheService } from '../../redis-cache/redis-cache.service'
import { ConfigService } from '@nestjs/config';

class MockCustomerModel {
  find() {
    return new MockCustomerModel();
  }

  exec() {
    return Promise.resolve({
      customers: [
        {
          name: "ACompany",
          personOfContact: "John",
          telephoneNumber: "(123)4567891",
          location: "Toronto,CA",
          numberOfEmployees: "101"
        },
        {
          name: "BCompany",
          personOfContact: "John",
          telephoneNumber: "(123)4567892",
          location: "Toronto,CA",
          numberOfEmployees: "102"
        }
      ]
    })
  }
};

class MockCache {};

describe('ForecastService', () => {
  let service: ForecastService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForecastService,
        CustomerService,
        {
          provide: getModelToken('Customer'),
          useClass: MockCustomerModel
        },
        RedisCacheService,
        {
          provide: CACHE_MANAGER,
          useClass: MockCache
        },
        OpenweatherService,
        ConfigService,
      ],
    }).compile();

    service = module.get<ForecastService>(ForecastService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});