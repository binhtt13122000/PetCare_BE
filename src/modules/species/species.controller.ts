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
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { IdParams } from "src/common";
import { Species } from "src/entities/pet_service/species.entity";
import { RoleEnum } from "src/enum";
import { hasRoles } from "../auth/decorator/roles.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { CreateSpeciesDTO } from "./dto/create-species.dto";
import { UpdateSpeciesDTO } from "./dto/update-species.dto";
import { SpeciesService } from "./species.service";

@Controller("species")
@ApiTags("species")
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get(":id")
  async getOne(@Param() params: IdParams): Promise<Species> {
    try {
      return await this.speciesService.findById(params.id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiQuery({
    name: "isActive",
    required: false,
    type: Boolean,
  })
  async getAll(@Query("isActive") isActive: boolean): Promise<Species[]> {
    try {
      if (isActive) {
        return await this.speciesService.getSpeciesByStatus(isActive);
      }
      return await this.speciesService.index();
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: CreateSpeciesDTO): Promise<Species> {
    try {
      return await this.speciesService.store(new Species(body));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put()
  async update(@Body() body: UpdateSpeciesDTO): Promise<Species> {
    try {
      return await this.speciesService.update(body.id, body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async delete(@Param() params: IdParams): Promise<Species> {
    try {
      const species = await this.speciesService.findById(params.id);
      if (!species.isActive) {
        throw Error("Cannot delete this breed");
      }
      return this.speciesService.update(params.id, {
        ...species,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("change-status/:id")
  async changeStatus(@Param("id") id: string): Promise<Species> {
    try {
      const species = await this.speciesService.findById(id);

      return this.speciesService.update(id, {
        ...species,
        isActive: !species.isActive,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("change-status-breeding/:id")
  async changeStatusBreeding(@Param("id") id: string): Promise<Species> {
    try {
      const species = await this.speciesService.findById(id);

      return this.speciesService.update(id, {
        ...species,
        isBreeding: !species.isBreeding,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @hasRoles(RoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch("change-status-inject/:id")
  async changeStatusInject(@Param("id") id: string): Promise<Species> {
    try {
      const species = await this.speciesService.findById(id);

      return this.speciesService.update(id, {
        ...species,
        isInject: !species.isInject,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
