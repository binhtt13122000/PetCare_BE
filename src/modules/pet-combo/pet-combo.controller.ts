import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { format } from "date-fns";
import { Request } from "express";
import { PaymentQuery } from "src/common";
import { PetCombo } from "src/entities/pet_service/pet-combo.entity";
import { ComboService } from "src/entities/service/combo-service.entity";
import { Combo } from "src/entities/service/combo.entity";
import { PaymentOrderMethodEnum } from "src/enum";
import { vnpayService } from "src/external/vnpay.service";
import { ComboServicesService } from "../combo-services/combo-services.service";
import { CombosService } from "../combos/combos.service";
import { ResponsePayment } from "../orders/dto/response-payment.dto";
import { PetComboServicesService } from "../pet-combo-services/pet-combo-services.service";
import { PetComboDTO } from "./dto/create-pet-combo.dto";
import { PetCombosService } from "./pet-combo.service";
import { NotFoundException } from "@nestjs/common";
import { CustomerService } from "../customer/customer.service";
import { PetOwnerService } from "../pet-owner/pet-owner.service";

@Controller("pet-combos")
@ApiTags("pet-combos")
export class PetComboController {
  constructor(
    private readonly petCombosService: PetCombosService,
    private readonly combos: CombosService,
    private readonly comboService: ComboServicesService,
    private readonly petComboServicesService: PetComboServicesService,
    private readonly customerService: CustomerService,
    private readonly petOwnerService: PetOwnerService,
  ) {}

  @Get()
  async getAll(): Promise<PetCombo[]> {
    return await this.petCombosService.index();
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<PetCombo> {
    return await this.petCombosService.getOne(id);
  }

  @Get("pet/:id")
  async getByPet(@Param("id") id: number): Promise<PetCombo[]> {
    return await this.petCombosService.getPetComboByPetId(id);
  }

  @Get("vnpay/vnpay_return")
  vnPayReturn(@Req() req: Request): void {
    vnpayService.vnpayReturn(
      req,
      async () => {
        const vnp_Params = req.query;
        const vnp_TxnRef = String(vnp_Params["vnp_TxnRef"]);
        const id = vnp_TxnRef.slice(14);
        try {
          const petCombo: PetCombo = await this.petCombosService.findById(id);
          if (!petCombo) {
            throw new NotFoundException("not found petCombo");
          }
          if (!petCombo.isDraft) {
            throw new BadRequestException("not draft");
          }
          await this.petCombosService.update(petCombo.id, {
            ...petCombo,
            isDraft: false,
          });
          const petOwner = await this.petOwnerService.getCurrentOwner(
            petCombo.petId,
          );
          if (!petOwner) {
            throw new NotFoundException("not found pet owner");
          }
          const customer = await this.customerService.findById(
            petOwner.customerId,
          );
          if (!petOwner) {
            throw new NotFoundException("not found customer");
          }
          await this.customerService.update(customer.id, {
            ...customer,
            point: customer.point + petCombo.point,
          });
        } catch (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      },
      () => {
        // eslint-disable-next-line no-console
        console.log("Payment Failed");
        // this.cacheManager.del("order_id_" + id);
      },
    );
  }

  @Post()
  async create(
    @Req() req: Request,
    @Query() query: PaymentQuery,
    @Body() body: PetComboDTO,
  ): Promise<ResponsePayment> {
    try {
      let next = 0;
      const combo: Partial<Combo> = await this.combos.findById(body.comboId);
      const comboService: Partial<ComboService[]> =
        await this.comboService.findComboServiceByComboId(body.comboId);
      const petCombo: Partial<PetCombo> = {
        registerTime: body.registerTime,
        isCompleted: false,
        paymentMethod: body.paymentMethod,
        orderTotal: combo.price,
        point: body.point,
        petId: body.petId,
        branchId: body.branchId,
        comboId: body.comboId,
        breedingTransactionId: body.breedingTransactionId,
      };

      const createPetCombo = await this.petCombosService.store({
        ...petCombo,
        isDraft: true,
      });

      comboService.forEach(async (item, index) => {
        next += item.nextEvent;
        const ts = new Date(body.registerTime);
        ts.setDate(ts.getDate() + next);

        if (index == 0) {
          await this.petComboServicesService.store({
            workingTime: body.registerTime,
            isCompleted: false,
            serviceId: item.serviceId,
            petComboId: createPetCombo.id,
            priority: item.priority,
            realTime: undefined,
          });
        } else {
          await this.petComboServicesService.store({
            workingTime: ts,
            isCompleted: false,
            serviceId: item.serviceId,
            petComboId: createPetCombo.id,
            priority: item.priority,
            realTime: undefined,
          });
        }
      });
      if (createPetCombo) {
        switch (body.paymentMethod) {
          case PaymentOrderMethodEnum.VNPAY:
            const ipAddr: string = req.socket.remoteAddress;
            const url = vnpayService.generatePaymentUrl(
              format(new Date(), "yyyyMMddHHmmss") + createPetCombo.id,
              query.returnUrl,
              body.orderTotal,
              ipAddr.split(":").pop() || "127.0.0.1",
              query.message,
              query.locale,
              "NCB",
              undefined,
            );
            if (url) {
              return { url };
            }
            break;
          default:
            break;
        }
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
