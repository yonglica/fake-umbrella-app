import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
// import { Customer } from './interfaces/customer.interface';

@Controller()
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  // Retrieve customers list
  @Get('customers')
  // @Get()
  async getAllCustomer(@Res() res) {
    const customers = await this.customerService.getAllCustomer();
    return res.status(HttpStatus.OK).json(customers);
  }

  // Fetch a particular customer using ID
  @Get('customer/:customerID')
  // @Get('/:customerID')
  async getCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.getCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist!');
    return res.status(HttpStatus.OK).json(customer);
  }

  // add a customer
  @Post('customer')
  // @Post()
  async addCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDTO) {
    const customer = await this.customerService.addCustomer(createCustomerDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been created successfully',
      customer,
    });
  }

  // Delete a customer
  // @Delete('/delete')
  @Delete('customer/:customerID')
  async deleteCustomer(@Res() res, @Param('customerID') customerID) {
    const customer = await this.customerService.deleteCustomer(customerID);
    if (!customer) throw new NotFoundException('Customer does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been deleted',
      customer,
    });
  }

  // Update a customer's details
  // @Put('/update')
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
