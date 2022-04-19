import { Controller, Req } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PetsService } from "../pets/pets.service";
import { Request } from "express";
import { vnpayService } from "src/external/vnpay.service";
import { Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly petsService: PetsService,
  ) {}

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

  @Get("vnpay_return")
  vnPayReturn(@Req() req: Request): void {
    vnpayService.vnpayReturn(
      req,
      () => {
        // console.log("abc");
      },
      () => {
        // console.log("bcs");
      },
    );
  }

  // @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: "evidenceFiles", maxCount: 4 },
  //     { name: "healthCheckFiles", maxCount: 4 },
  //   ]),
  // )
  // async createPost(
  //   @UploadedFiles()
  //   files: {
  //     evidenceFiles?: Express.Multer.File[];
  //     healthCheckFiles?: Express.Multer.File[];
  //   },
  //   @Body() body: CreatePostDTO,
  // ): Promise<PostEntity> {
  //   const evidences: Media[] = await Promise.all(
  //     files.evidenceFiles?.map(async (value) => {
  //       const { url, type } = await uploadService.uploadFile(value);
  //       return new Media({
  //         url: url,
  //         type: type === "image/jpeg" ? "image" : "video",
  //       });
  //     }),
  //   );
  //   body.evidences = evidences;
  //   const healthCheckImages: Media[] = await Promise.all(
  //     files.healthCheckFiles?.map(async (value) => {
  //       const { url, type } = await uploadService.uploadFile(value);
  //       return new Media({
  //         url: url,
  //         type: type === "image/jpeg" ? "image" : "video",
  //       });
  //     }),
  //   );
  //   body.healthCheckMedias = healthCheckImages;
  //   const pet = await this.petsService.findById(body.petId);
  //   pet.status = PetEnum.IN_POST;
  //   await this.petsService.update(body.petId, pet);
  //   return await this.postsService.store(new PostEntity(body));
  // }

  // @Put()
  // @UseInterceptors(
  //   FileFieldsInterceptor([{ name: "sellerContractImageFiles", maxCount: 4 }]),
  // )
  // async updatePost(
  //   @UploadedFiles()
  //   files: {
  //     sellerContractImageFiles?: Express.Multer.File[];
  //   },
  //   @Body() body: Partial<PostEntity>,
  // ): Promise<PostEntity> {
  //   const sellerContractImages: Media[] = await Promise.all(
  //     files.sellerContractImageFiles?.map(async (value) => {
  //       const { url } = await uploadService.uploadFile(value);
  //       return new Media({
  //         url: url,
  //         status: true,
  //         type: "image",
  //       });
  //     }),
  //   );
  //   body.sellerContractImages = sellerContractImages;
  //   return this.postsService.update(body.id, new PostEntity(body));
  // }
}
