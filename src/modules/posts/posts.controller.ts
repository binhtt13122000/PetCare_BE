import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFiles,
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
      { name: "sellerContractImageFiles", maxCount: 4 },
    ]),
  )
  async createPost(
    @UploadedFiles()
    files: {
      evidenceFiles?: Express.Multer.File[];
      sellerContractImageFiles?: Express.Multer.File[];
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
    const pet = await this.petsService.findById(body.petId);
    pet.status = PetEnum.IN_POST;
    await this.petsService.update(body.petId, pet);
    return await this.postsService.store(new PostEntity(body));
  }

  async updatePost(@Body() body: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsService.update(body.id, new PostEntity(body));
  }
}
