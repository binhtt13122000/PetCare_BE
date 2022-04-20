import {
  Body,
  Controller,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PetsService } from "../pets/pets.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreatePostDTO } from "./dto/create-post.dto";
import { Post as PostEntity } from "src/entities/transaction_service/post.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Media } from "src/entities/transaction_service/media.entity";
import { uploadService } from "src/external/uploadFile.service";
import { PetEnum } from "src/enum";
import { UpdatePostDTO } from "./dto/update-post.dto";
@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly petsService: PetsService,
  ) {}

  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("files"))
  async createPost(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() body: CreatePostDTO,
  ): Promise<PostEntity> {
    const medias: Media[] = await Promise.all(
      files?.map(async (value) => {
        const { url, type } = await uploadService.uploadFile(value);
        return new Media({
          url: url,
          type: type === "image/jpeg" ? "image" : "video",
        });
      }),
    );

    const pet = await this.petsService.findById(body.petId);
    pet.status = PetEnum.IN_POST;
    await this.petsService.update(body.petId, pet);
    return await this.postsService.store(new PostEntity({ ...body, medias }));
  }

  @Put()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("files"))
  async updatePost(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() body: UpdatePostDTO,
  ): Promise<PostEntity> {
    const medias: Media[] = await Promise.all(
      files?.map(async (value) => {
        const { url, type } = await uploadService.uploadFile(value);
        return new Media({
          url: url,
          type: type === "image/jpeg" ? "image" : "video",
        });
      }),
    );
    body.medias = [...body.medias, ...medias];
    return this.postsService.update(body.id, new PostEntity(body));
  }
}

// @Post("deposit/:id")
// deposit(
//   @Res() res: Response,
//   @Req() req: Request,
//   @Body() body: Partial<PostEntity>,
//   @Query() query: { locale?: "vn" | "en"; paymentMethod?: "vnpay" | "momo" },
// ): void {
//   if (!query.paymentMethod) {
//     query.paymentMethod = "vnpay";
//   }
//   switch (query.paymentMethod) {
//     case "vnpay":
//       const ipAddr: string = req.socket.remoteAddress;
//       const returnUrl = configService.getApiRootURL() + "/posts/vnpay_return";
//       const url = vnpayService.generatePaymentUrl(
//         "9999",
//         returnUrl,
//         body.refund || 0,
//         ipAddr.split(":").pop() || "127.0.0.1",
//         JSON.stringify(body),
//         query.locale,
//         undefined,
//         undefined,
//       );
//       if (url) {
//         return res.redirect(url);
//       }
//       break;
//     case "momo":
//       break;
//     default:
//       break;
//   }
// }
