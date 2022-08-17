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
  UseGuards,
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
import { FileProducerService } from "src/shared/file/file.producer.service";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("customers")
@ApiTags("customers")
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private userService: UserService,
    private fileProducerService: FileProducerService,
  ) {}

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<Customer> {
    try {
      return await this.customerService.findOne(params.id);
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

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateCustomerDTO,
  ): Promise<Customer> {
    try {
      const updatedCustomer = await this.customerService.findById(body.id);
      if (!updatedCustomer) {
        throw new HttpException("not found", HttpStatus.BAD_REQUEST);
      }
      let avatar: string = null;
      if (file) {
        const { url } = await uploadService.uploadFile(file);
        avatar = url;
        await this.fileProducerService.deleteFile(updatedCustomer.avatar);
      }
      const customer: Partial<Customer> = {
        ...body,
        avatar: file ? avatar : updatedCustomer.avatar,
      };
      return await this.customerService.update(customer.id, {
        ...updatedCustomer,
        ...customer,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("change-status/:id")
  async changeStatus(@Param("id") id: string): Promise<Customer> {
    try {
      const customer = await this.customerService.findById(id);
      if (!customer) {
        throw new HttpException("Not found!", HttpStatus.NOT_FOUND);
      }
      const user = await this.userService.findByPhoneNumber(
        customer.phoneNumber,
      );
      if (!user) {
        throw new HttpException("Not found!", HttpStatus.NOT_FOUND);
      }
      await this.userService.update(user.id, {
        ...user,
        isActive: !user.isActive,
      });
      return this.customerService.update(id, {
        ...customer,
        isActive: !customer.isActive,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async delete(@Param("id") id: string): Promise<Customer> {
    try {
      const customer = await this.customerService.findById(id);
      if (!customer) {
        throw new HttpException("Not found!", HttpStatus.NOT_FOUND);
      }
      if (!customer.isActive) {
        throw new HttpException("Inactive!", HttpStatus.BAD_REQUEST);
      }
      const user = await this.userService.findByPhoneNumber(
        customer.phoneNumber,
      );
      if (!user) {
        throw new HttpException("Not found!", HttpStatus.NOT_FOUND);
      }
      if (!user.isActive) {
        throw new HttpException("Inactive!", HttpStatus.BAD_REQUEST);
      }
      await this.userService.update(user.id, {
        ...user,
        isActive: false,
      });
      return this.customerService.update(id, {
        ...customer,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateCustomerDTO): Promise<Customer> {
    try {
      const customer: Partial<Customer> = {
        ...body,
      };

      const password = await bcrypt.hash(DEFAULT_PASSWORD, 12);

      const account: Partial<Account> = {
        password: password,
        phoneNumber: body.phoneNumber,
        isActive: true,
        roleId: RoleIndexEnum.CUSTOMER,
        registerTime: body.registerTime,
      };

      await this.userService.store(new Account(account));
      return this.customerService.store(customer);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
