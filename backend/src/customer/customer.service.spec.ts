import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { getModelToken } from '@nestjs/mongoose';


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
}

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        CustomerService,
        {
          provide: getModelToken('Customer'),
          useClass: MockCustomerModel
        }
      ],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user', async () => {
    const expected = {
      customers:[
        {
          name:"ACompany",
          personOfContact:"John",
          telephoneNumber:"(123)4567891",
          location:"Toronto,CA",
          numberOfEmployees:"101"
        },
        {
          name:"BCompany",
          personOfContact:"John",
          telephoneNumber:"(123)4567892",
          location:"Toronto,CA",
          numberOfEmployees:"102"
        }
      ]
    }

    const result = await service.getAllCustomer();
    expect(result).toEqual(expected);
  });
});
