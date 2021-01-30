import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';

@Controller()
export class CustomerController {

  constructor(private customerService: CustomerService) {}

  @Get('customers')
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    return res.status(HttpStatus.OK).json(customers);
  }

  @Get('customer/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.getCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  @Post('customer')
  async addCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
    const customer = await this.customerService.addCustomer(createCustomerDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been created successfully',
      customer,
    });
  }

  @Delete('customer/:customerID')
  async deleteCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.deleteCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      customer,
    });
  }

  @Put('customer')
  async updateCustomer(
    @Res() res,
    @Query('customerID') customerID,
    @Body() createCustomerDTO: CreateCustomerDTO,
  ) {
    const modifiedCustomer = await this.customerService.updateCustomer(
      customerID,
      createCustomerDTO,
    );
    if (!modifiedCustomer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been successfully updated',
      customer: modifiedCustomer,
    });
  }

}
