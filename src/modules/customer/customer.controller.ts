import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { Customer } from "src/entities/user_management_service/customer.entity";
import { uploadService } from "src/external/uploadFile.service";
import { CustomerService } from "./customer.service";

import { UpdateCustomerProfileDTO } from "./dto/update-customer.dto";

@Controller("customer-profile")
@ApiTags("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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
    @Body() body: UpdateCustomerProfileDTO,
  ): Promise<Customer> {
    try {
      let avatar = null;
      if (file) {
        avatar = await uploadService.uploadFile(file);
        await uploadService.removeImage(body.avatar);
      }
      const customerProfile: Partial<Customer> = {
        ...body,
        avatar: file ? avatar : body.avatar,
      };

      return await this.customerService.update(
        customerProfile.id,
        customerProfile,
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
