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
import { ComboTypeEnum, PaymentOrderMethodEnum, PetEnum } from "src/enum";
import { vnpayService } from "src/external/vnpay.service";
import { ComboServicesService } from "../combo-services/combo-services.service";
import { CombosService } from "../combos/combos.service";
import { ResponsePayment } from "../orders/dto/response-payment.dto";
import { PetComboServicesService } from "../pet-combo-services/pet-combo-services.service";
import { PetComboDTO, PetComboPaymentDTO } from "./dto/create-pet-combo.dto";
import { PetCombosService } from "./pet-combo.service";
import { NotFoundException } from "@nestjs/common";
import { CustomerService } from "../customer/customer.service";
import { PetOwnerService } from "../pet-owner/pet-owner.service";
import { BreedTransactionService } from "../breed-transaction/breed-transaction.service";
import { BreedingTransactionEnum } from "../../enum/index";
import { BreedingTransaction } from "src/entities/transaction_service/breeding-transaction.entity";
import { PetsService } from "../pets/pets.service";

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
    private readonly breedTransactionService: BreedTransactionService,
    private readonly petsService: PetsService,
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
          const combo = await this.combos.findById(petCombo.comboId);
          if (!combo) {
            throw new NotFoundException("not found combo");
          }
          if (combo.type === ComboTypeEnum.BREED) {
            const createdBreedingTransaction =
              await this.breedTransactionService.store({
                branchId: petCombo.branchId,
                breedingBranchId: petCombo.branchId,
                createdTime: new Date(
                  new Date().getTime() + 7 * 60 * 60 * 1000,
                ),
                self: true,
                dateOfBreeding: petCombo.registerTime,
                ownerPetFemaleId: petOwner.customerId,
                ownerPetMaleId: petOwner.customerId,
                paymentMethod: "VNPAY",
                paymentForBranchTime: new Date(
                  new Date().getTime() + 7 * 60 * 60 * 1000,
                ),
                paymentForMalePetOwnerTime: new Date(
                  new Date().getTime() + 7 * 60 * 60 * 1000,
                ),
                meetingTime: new Date(
                  new Date().getTime() + 7 * 60 * 60 * 1000,
                ),
                petFemaleId: petCombo.petId,
                petMaleId: petCombo.petId,
                point: 0,
                placeMeeting: "",
                description: "",
                postId: null,
                sellerReceive: 0,
                transactionTotal: petCombo.orderTotal,
                transactionFee: 0,
                serviceFee: petCombo.orderTotal,
                status: BreedingTransactionEnum.SUCCESS,
              });
            await this.petCombosService.update(petCombo.id, {
              ...petCombo,
              isDraft: false,
              breedingTransactionId: createdBreedingTransaction.id,
            });
          } else {
            await this.petCombosService.update(petCombo.id, {
              ...petCombo,
              isDraft: false,
            });
          }
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

  @Post("payment")
  async createPayment(
    @Body() body: PetComboPaymentDTO,
  ): Promise<BreedingTransaction> {
    try {
      const breedingTransaction = await this.breedTransactionService.findById(
        body.breedingTransactionId,
      );
      if (!breedingTransaction) {
        throw new NotFoundException("not found breed transaction");
      }
      const petMale = await this.petsService.findById(
        breedingTransaction.petMaleId,
      );
      if (!petMale) {
        throw new NotFoundException("not found pet male");
      }
      const petFemale = await this.petsService.findById(
        breedingTransaction.petFemaleId,
      );
      if (!petFemale) {
        throw new NotFoundException("not found pet female");
      }
      const buyer = await this.customerService.findById(
        breedingTransaction.ownerPetFemaleId,
      );
      if (!buyer) {
        throw new NotFoundException("not found buyer");
      }
      const seller = await this.customerService.findById(
        breedingTransaction.ownerPetMaleId,
      );
      if (!seller) {
        throw new NotFoundException("not found seller");
      }
      await this.petsService.update(petMale.id, {
        ...petMale,
        status: PetEnum.IN_BREED,
      });
      await this.petsService.update(petFemale.id, {
        ...petFemale,
        status: PetEnum.IN_BREED,
      });
      await this.customerService.update(buyer.id, {
        ...buyer,
        point: buyer.point + body.point,
      });
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
            const updatedBreedingTransaction: Partial<BreedingTransaction> = {
              ...breedingTransaction,
              breedingBranchId: body.branchId,
              transactionTotal: 0,
              serviceFee: body.orderTotal,
              paymentForBranchTime: new Date(
                new Date().getTime() + 7 * 60 * 60 * 1000,
              ),
              dateOfBreeding: body.dateOfBreeding,
            };
            await this.breedTransactionService.update(
              body.breedingTransactionId,
              updatedBreedingTransaction,
            );
            break;
          default:
            break;
        }
      }
      return null;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
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
