import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
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
      const pet: Partial<Pet> = {
        ...data,
        avatar,
      };
      const currentPet = await this.petsService.store(pet);
      const petOwner: PetOwner = {
        id: undefined,
        accountId: ownerId,
        isCurrentOwner: true,
        petId: currentPet.id,
        date: new Date(),
        pet: undefined,
        account: undefined,
      };
      if (!currentPet.petOwners) {
        currentPet.petOwners = [];
      }
      currentPet.petOwners.push(petOwner);
      return await this.petsService.update(currentPet.id, currentPet);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
