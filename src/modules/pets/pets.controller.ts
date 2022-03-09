import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { PetsService } from "./pets.service";
import { CreatePetDto } from "./dto/create-pet.dto";
import { Pet } from "src/entities/pet.entity";
import { uploadService } from "src/external/uploadFile.service";
import { PetOwner } from "../../entities/pet-owner.entity";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("pets")
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePetDto,
  ): Promise<Pet> {
    try {
      const { ownerId, ...data } = body;
      const avatar = await uploadService.uploadFile(file);
      const petOwner: PetOwner = {
        id: undefined,
        accountId: ownerId,
        isCurrentOwner: true,
        petId: undefined,
        date: new Date(),
        pet: undefined,
        account: undefined,
      };
      const pet: Partial<Pet> = {
        ...data,
        avatar,
        petOwners: [petOwner],
      };
      return await this.petsService.store(pet);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: Pet,
  ): Promise<Pet> {
    try {
      let avatar = null;
      if (file) {
        avatar = await uploadService.uploadFile(file);
        await uploadService.removeImage(body.avatar);
      }
      const pet: Partial<Pet> = {
        ...body,
        avatar: file ? avatar : body.avatar,
      };
      return await this.petsService.update(pet.id, pet);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
