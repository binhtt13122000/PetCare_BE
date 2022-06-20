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
  NotFoundException,
  BadRequestException,
  Inject,
  CACHE_MANAGER,
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
import { map, Observable } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { CreateChainDTO } from "./dto/create-chain.dto";
import { Cache } from "cache-manager";

@Controller("pets")
@ApiTags("pets")
export class PetsController {
  constructor(
    private readonly petsService: PetsService,
    private readonly fileProducerService: FileProducerService,
    private readonly httpService: HttpService,
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
  ): Promise<Observable<Array<ChainData>>> {
    const pet = await this.petsService.findById(id);
    if (!pet) {
      throw new NotFoundException("not found");
    }
    if (!pet.specialMarkings) {
      throw new NotFoundException("not found microchip");
    }
    return this.httpService
      .get("/api/getHistory/" + pet.specialMarkings)
      .pipe(map((response) => response.data));
  }

  @Get("chain/hash/:uuid")
  async getChainByUUID(
    @Param("uuid") uuid: string,
  ): Promise<Observable<Array<ChainData>>> {
    const data: number = await this.cacheManager.get(uuid);
    const id = data ? Number(data) : 0;
    const pet = await this.petsService.findById(id);
    if (!pet) {
      throw new NotFoundException("not found");
    }
    if (!pet.specialMarkings) {
      throw new NotFoundException("not found microchip");
    }
    return this.httpService
      .get("/api/getHistory/" + pet.specialMarkings)
      .pipe(map((response) => response.data));
  }

  @Put("create-chain")
  async createChain(@Body() body: CreateChainDTO): Promise<unknown> {
    const pet = await this.petsService.findById(body.id);
    if (!pet) {
      throw new NotFoundException("not found");
    }
    if (pet.specialMarkings) {
      throw new BadRequestException("had microchip");
    }
    await this.petsService.update(body.id, {
      ...pet,
      specialMarkings: body.specialMarkings,
    });
    const fullDataPet = await this.petsService.getOne(body.id, true);
    return this.httpService
      .post("/api/setData", {
        no: fullDataPet.specialMarkings,
        content: {
          current: fullDataPet,
          write:
            "The data of pet is init with adding microchip:" +
            fullDataPet.specialMarkings,
        },
        type: "CREATE",
        date: body.initDate,
      })
      .pipe(map((response) => response.data));
  }

  @Get("fetch-pet")
  @ApiQuery({
    name: "speciesId",
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
    @Query("type") type: "BREED" | "SALE",
    @Query("gender") gender?: "MALE" | "FEMALE",
  ): Promise<Pet[]> {
    return await this.petsService.getPetListWithoutBreedToCreatePostByCustomerIdAndSpeciesId(
      customerId,
      type,
      gender,
      speciesId,
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

  @ApiConsumes("multipart/form-data")
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePetDTO,
  ): Promise<Pet> {
    try {
      const { ownerId, ...data } = body;
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

  @ApiConsumes("multipart/form-data")
  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdatePetDTO,
  ): Promise<unknown> {
    try {
      let avatar = null;
      if (file) {
        const { url } = await uploadService.uploadFile(file);
        avatar = url;
        await this.fileProducerService.deleteFile(body.avatar);
      }
      const pet: Partial<Pet> = {
        ...body,
        avatar: file ? avatar : body.avatar,
      };
      const updatePet = await this.petsService.update(pet.id, pet);
      if (updatePet.specialMarkings) {
        const fullDataPet = await this.petsService.getOne(body.id, true);
        return this.httpService
          .post("/api/setData", {
            no: fullDataPet.specialMarkings,
            content: {
              current: fullDataPet,
              write: "Customer updated data of pet",
            },
            type: "UPDATE",
            date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
          })
          .pipe(map((response) => response.data));
      } else {
        return updatePet;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<unknown> {
    try {
      const pet = await this.petsService.findById(id);
      if (!pet) {
        throw new NotFoundException("not found");
      }
      if (pet.status === PetEnum.IN_POST || pet.status === PetEnum.DELETED) {
        throw Error("Cannot delete this pet");
      }
      const deletedPet = await this.petsService.update(id, {
        ...pet,
        status: PetEnum.DELETED,
      });
      if (deletedPet.specialMarkings) {
        const fullDataPet = await this.petsService.getOne(id, true);
        return this.httpService
          .post("/api/setData", {
            no: fullDataPet.specialMarkings,
            content: {
              current: fullDataPet,
              write: "Customer deleted the pet.",
            },
            type: "DELETE_PET",
            date: new Date(new Date().getTime() + 7 * 60 * 60 * 1000),
          })
          .pipe(map((response) => response.data));
      } else {
        return deletedPet;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
