import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
  Put,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Media } from "src/entities/media.entity";
import { Post as PostEntity } from "src/entities/post.entity";
import { uploadService } from "src/external/uploadFile.service";
import { PostsService } from "./posts.service";
import { PetsService } from "../pets/pets.service";
import { PetEnum } from "src/enum";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly petsService: PetsService,
  ) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "evidenceFiles", maxCount: 4 },
      { name: "healthCheckFiles", maxCount: 4 },
    ]),
  )
  async createPost(
    @UploadedFiles()
    files: {
      evidenceFiles?: Express.Multer.File[];
      healthCheckFiles?: Express.Multer.File[];
    },
    @Body() body: Partial<PostEntity>,
  ): Promise<PostEntity> {
    const evidences: Media[] = await Promise.all(
      files.evidenceFiles?.map(async (value) => {
        const { url, type } = await uploadService.uploadFile(value);
        return new Media({
          url: url,
          status: true,
          type: type === "image/jpeg" ? "image" : "video",
        });
      }),
    );
    body.evidences = evidences;
    const healthCheckImages: Media[] = await Promise.all(
      files.healthCheckFiles?.map(async (value) => {
        const { url, type } = await uploadService.uploadFile(value);
        return new Media({
          url: url,
          status: true,
          type: type === "image/jpeg" ? "image" : "video",
        });
      }),
    );
    body.healthCheckMedias = healthCheckImages;
    const pet = await this.petsService.findById(body.petId);
    pet.status = PetEnum.IN_POST;
    await this.petsService.update(body.petId, pet);
    return await this.postsService.store(new PostEntity(body));
  }

  @Put()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "sellerContractImageFiles", maxCount: 4 }]),
  )
  async updatePost(
    @UploadedFiles()
    files: {
      sellerContractImageFiles?: Express.Multer.File[];
    },
    @Body() body: Partial<PostEntity>,
  ): Promise<PostEntity> {
    const sellerContractImages: Media[] = await Promise.all(
      files.sellerContractImageFiles?.map(async (value) => {
        const { url } = await uploadService.uploadFile(value);
        return new Media({
          url: url,
          status: true,
          type: "image",
        });
      }),
    );
    body.sellerContractImages = sellerContractImages;
    return this.postsService.update(body.id, new PostEntity(body));
  }
}
