import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  HttpException,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { ComboService } from "src/entities/service/combo-service.entity";
import { Combo } from "src/entities/service/combo.entity";
import { ComboTypeEnum, RoleEnum } from "src/enum";
import { hasRoles } from "../auth/decorator/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CombosService } from "./combos.service";
import { CreateComboDTO } from "./dtos/create-combo.dto";
import { UpdateComboDTO } from "./dtos/update-combo.dto";

@Controller("combos")
@ApiTags("combos")
export class CombosController {
  constructor(private readonly combosService: CombosService) {}

  @Get()
  async getAll(): Promise<Combo[]> {
    return await this.combosService.index();
  }

  @ApiParam({
    name: "type",
    type: "enum",
    enum: ComboTypeEnum,
  })
  @Get("types/:type")
  async getByType(@Param("type") type: ComboTypeEnum): Promise<Combo[]> {
    return await this.combosService.getByType(type);
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<Combo> {
    const combosService = await this.combosService.findOne(id);
    if (
      combosService?.comboServices &&
      combosService?.comboServices.length > 0
    ) {
      combosService.comboServices = combosService.comboServices.filter(
        (item) => item.isActive === true,
      );
    }
    return combosService;
  }

  @hasRoles(RoleEnum.ADMIN, RoleEnum.BRANCH_MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateComboDTO): Promise<Combo> {
    try {
      return await this.combosService.store(body);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @hasRoles(RoleEnum.ADMIN, RoleEnum.BRANCH_MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  async update(@Body() body: UpdateComboDTO): Promise<Combo> {
    try {
      const { deletedIds, comboServices, ...rest } = body;
      const combo = await this.combosService.getOneWithComboServices(rest.id);
      if (!combo) {
        throw new NotFoundException("Not found");
      } else {
        combo.comboServices
          ? (combo.comboServices = combo.comboServices.map((item) => {
              if (deletedIds.includes(item.id)) {
                item.isActive = false;
              } else {
                const findIndex = comboServices.findIndex(
                  (itemCombo) => itemCombo?.id && item.id === itemCombo.id,
                );
                if (findIndex !== -1) {
                  item.nextEvent = comboServices[findIndex].nextEvent;
                  item.priority = comboServices[findIndex].priority;
                  comboServices.splice(findIndex, 1);
                }
              }
              return item;
            }))
          : "";
      }
      comboServices &&
        comboServices.length > 0 &&
        comboServices.forEach((item) => {
          const convertObject = new ComboService({
            isActive: true,
            comboId: Number(rest.id),
            priority: item.priority,
            nextEvent: item.nextEvent,
            serviceId: item.serviceId,
          });
          combo.comboServices.push(convertObject);
        });
      Object.assign(combo, rest);
      return await combo.save();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN, RoleEnum.BRANCH_MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<Combo> {
    try {
      const combo = await this.combosService.findById(params.id);
      if (!combo) {
        throw new HttpException("The combo is not found", HttpStatus.NOT_FOUND);
      }
      if (!combo.isActive) {
        throw new HttpException(
          "The breed is inactive",
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.combosService.update(params.id, {
        ...combo,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
