import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { DEFAULT_PASSWORD, IdParams } from "src/common";
import { Account } from "src/entities/authenticate_service/account.entity";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { RoleIndexEnum } from "src/enum";
import { uploadService } from "src/external/uploadFile.service";
import { UserService } from "../users/user.service";
import { CustomerService } from "./customer.service";
import { CreateCustomerDTO } from "./dto/create-customer.dto";
import { UpdateCustomerDTO } from "./dto/update-customer.dto";
import * as bcrypt from "bcrypt";

@Controller("customer")
@ApiTags("customer")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private userService: UserService,
  ) {}

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<Customer> {
    try {
      return await this.customerService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAll(): Promise<Customer[]> {
    try {
      return await this.customerService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiConsumes("multipart/form-data")
  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateCustomerDTO,
  ): Promise<Customer> {
    try {
      let avatar = null;
      if (file) {
        avatar = await uploadService.uploadFile(file);
        await uploadService.removeImage(body.avatar);
      }
      const customer: Partial<Customer> = {
        ...body,
        avatar: file ? avatar : body.avatar,
      };

      return await this.customerService.update(customer.id, customer);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch("change-status/:id")
  async changeStatus(@Param("id") id: string): Promise<Customer> {
    try {
      const customer = await this.customerService.findById(id);

      return this.customerService.update(id, {
        ...customer,
        isActive: !customer.isActive,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Customer> {
    try {
      const customer = await this.customerService.findById(id);

      return this.customerService.update(id, {
        ...customer,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @Post()
  async create(
    @Body() body: CreateCustomerDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Customer> {
    try {
      let avatar = null;
      if (file) {
        avatar = await uploadService.uploadFile(file);
      }
      const customer: Partial<Customer> = {
        ...body,
        avatar: avatar,
      };

      body.password = await bcrypt.hash(DEFAULT_PASSWORD, 12);

      const account: Partial<Account> = {
        password: body.password,
        phoneNumber: body.phoneNumber,
        isActive: true,
        roleId: RoleIndexEnum.CUSTOMER,
      };

      await this.userService.store(new Account(account));
      return this.customerService.store(customer);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
