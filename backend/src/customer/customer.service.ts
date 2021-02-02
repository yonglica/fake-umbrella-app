import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {

  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) {}

  async getAllCustomer(): Promise<Customer[]> {
    const customers = await this.customerModel.find().exec();
    Logger.log('retrieved all customers: ' + customers.length);
    return customers;
  }

  async getCustomer(customerID): Promise<Customer> {
    const customer = await this.customerModel.findById(customerID).exec();
    Logger.log('retrieved customer: ' + customerID);
    return customer;
  }

  async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDTO);
    Logger.log('added customer: ' + newCustomer.name);
    return newCustomer.save();
  }

  async updateCustomer(
    customerID,
    createCustomerDTO: CreateCustomerDTO,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel.findByIdAndUpdate(
      customerID,
      createCustomerDTO,
      { new: true },
    );
    Logger.log('updated customer: ' + updatedCustomer.name);
    return updatedCustomer;
  }

  async deleteCustomer(customerID): Promise<any> {
    const deletedCustomer = await this.customerModel.findByIdAndRemove(
      customerID,
    );
    Logger.log('deleted customer: ' + deletedCustomer.name);
    return deletedCustomer;
  }

  // TODO: refactor later, should be generic
  async getCustomersSortByEmployeesNumber(): Promise<Customer[]> {
//     const customers = await this.customerModel.find().sort({numberOfEmployees: 'desc'}).exec();
    const customers = await this.customerModel.find().sort({'numberOfEmployees': 'desc'}).limit(4).exec();
//     const customers = await this.customerModel.find().sort({fieldName: 'desc'}).limit(top).exec();
    return customers;
  }

}
