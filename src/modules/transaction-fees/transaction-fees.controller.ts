import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { TransactionFee } from "src/entities/service/transaction-fee.entity";
import { ServiceEnum } from "src/enum";
import { DeleteResult } from "typeorm";
import { CreateTransactionFeeDTO } from "./dto/create-transaction-fee.dto";
import { UpdateTransactionFeeDTO } from "./dto/update-transaction-fee.dto";
import { TransactionFeesService } from "./transaction-fees.service";

@Controller("transaction-fees")
@ApiTags("transaction-fees")
export class TransactionFeesController {
  constructor(
    private readonly transactionFeesServices: TransactionFeesService,
  ) {}

  @Get()
  @ApiQuery({
    name: "type",
    required: false,
    enum: ServiceEnum,
  })
  async getAll(@Query("type") type: ServiceEnum): Promise<TransactionFee[]> {
    try {
      if (type) {
        return await this.transactionFeesServices.getTransactionFeeByType(type);
      }
      return await this.transactionFeesServices.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<TransactionFee> {
    try {
      return await this.transactionFeesServices.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() body: CreateTransactionFeeDTO): Promise<TransactionFee> {
    try {
      return await this.transactionFeesServices.store(new TransactionFee(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  async update(@Body() body: UpdateTransactionFeeDTO): Promise<TransactionFee> {
    try {
      return await this.transactionFeesServices.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<DeleteResult> {
    try {
      return await this.transactionFeesServices.delete(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
