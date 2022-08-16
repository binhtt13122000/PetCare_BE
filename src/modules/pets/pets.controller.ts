import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Put,
  UploadedFile,
  UseInterceptors,
  Param,
  Query,
  Inject,
  CACHE_MANAGER,
  UseGuards,
} from "@nestjs/common";
import { PetsService } from "./pets.service";
import { CreatePetDTO } from "./dto/create-pet.dto";
import { Pet } from "src/entities/pet_service/pet.entity";
import { uploadService } from "src/external/uploadFile.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UpdatePetDTO } from "./dto/update-pet.dto";
import { PetEnum } from "src/enum";
import { PetOwner } from "src/entities/pet_service/pet-owner.entity";
import { FileProducerService } from "src/shared/file/file.producer.service";
import { ChainData } from "src/common";
import { CreateChainDTO } from "./dto/create-chain.dto";
import { Cache } from "cache-manager";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("pets")
@ApiTags("pets")
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly fileProducerService: FileProducerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @ApiQuery({
    name: "type",
    enum: PetEnum,
    required: false,
  })
  @ApiQuery({
    name: "name",
    type: String,
    required: false,
  })
  async getAll(
    @Query("customerId") customerId: number,
    @Query("type") type?: PetEnum,
    @Query("name") name?: string,
  ): Promise<Pet[]> {
    return await this.petsService.getPetListByCustomerId(
      customerId,
      type,
      name,
    );
  }

  @Get("chain/:id")
  async getChain(
    @Param("id") id: number,
  ): Promise<{ key: string; value: ChainData[] }> {
    return this.petsService.getChain(id);
  }

  @Get("chain/hash/:uuid")
  async getChainByUUID(
    @Param("uuid") uuid: string,
  ): Promise<{ key: string; value: ChainData[] }> {
    return this.petsService.getChainByUUID(uuid);
  }

  @Put("create-chain")
  async createChain(@Body() body: CreateChainDTO): Promise<string> {
    return this.petsService.createChain(body);
  }

  @Get("fetch-pet")
  @ApiQuery({
    name: "speciesId",
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: "breedId",
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: "type",
    enum: ["BREED", "SALE"],
  })
  async getToCreatePost(
    @Query("customerId") customerId: number,
    @Query("speciesId") speciesId: number,
    @Query("breedId") breedId: number,
    @Query("type") type: "BREED" | "SALE",
    @Query("gender") gender?: "MALE" | "FEMALE",
  ): Promise<Pet[]> {
    return await this.petsService.getPetListWithoutBreedToCreatePostByCustomerIdAndSpeciesIdAndBreedId(
      customerId,
      type,
      gender,
      speciesId,
      breedId,
    );
  }

  @Get(":id")
  @ApiQuery({
    name: "currentOwner",
    type: Boolean,
    required: false,
  })
  async getOne(
    @Param("id") id: number,
    @Query("currentOwner") currentOwner: boolean,
  ): Promise<Pet> {
    return await this.petsService.getOne(id, currentOwner);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes("multipart/form-data")
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePetDTO,
  ): Promise<Pet> {
    try {
      const { ownerId, ...data } = body;
      const checkExistedPetName =
        await this.petsService.checkIsExistPetNameWithCustomerId(
          body.name,
          body.ownerId,
        );
      if (checkExistedPetName) {
        throw new HttpException(
          "Pet Name already exist!",
          HttpStatus.BAD_REQUEST,
        );
      }
      const { url: avatar } = await uploadService.uploadFile(file);
      const petOwner: Partial<PetOwner> = {
        id: undefined,
        customerId: ownerId,
        isCurrentOwner: true,
        petId: undefined,
        date: new Date(),
        pet: undefined,
        customer: undefined,
      };
      const pet: Partial<Pet> = {
        ...data,
        avatar,
        petOwners: [new PetOwner(petOwner)],
      };
      return await this.petsService.store(new Pet(pet));
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiConsumes("multipart/form-data")
  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdatePetDTO,
  ): Promise<string | Pet> {
    try {
      let avatar = null;
      const existedPet = await this.petsService.getOne(body.id, true);
      if (!existedPet) {
        throw new HttpException("Not found pet by id", HttpStatus.NOT_FOUND);
      }
      if (
        existedPet.name.trim().toLowerCase() !== body.name.trim().toLowerCase()
      ) {
        const ownerId = existedPet.petOwners.find(
          (item) => item.isCurrentOwner == true,
        ).customerId;
        const checkExistedPetName =
          await this.petsService.checkIsExistPetNameWithCustomerId(
            body.name,
            ownerId,
          );
        if (checkExistedPetName) {
          throw new HttpException(
            "Pet Name already exist!",
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      if (file) {
        const { url } = await uploadService.uploadFile(file);
        avatar = url;
        await this.fileProducerService.deleteFile(existedPet.avatar);
      }
      const pet: Partial<Pet> = {
        ...body,
        isSeed: String(body.isSeed) === "true",
        avatar: file ? avatar : existedPet.avatar,
      };
      return this.petsService.updatePet(pet);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async delete(@Param("id") id: number): Promise<unknown> {
    return this.petsService.deletePet(id);
  }
}
