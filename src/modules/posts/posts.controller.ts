import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Query,
  Param,
  UploadedFiles,
  UseInterceptors,
  NotFoundException,
  Patch,
  UseGuards,
  BadRequestException,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PetsService } from "../pets/pets.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { CreatePostDTO } from "./dto/create-post.dto";
import { Post as PostEntity } from "src/entities/transaction_service/post.entity";
import { FilesInterceptor } from "@nestjs/platform-express";
import { Media } from "src/entities/transaction_service/media.entity";
import { uploadService } from "src/external/uploadFile.service";
import { NotificationEnum, PetEnum, PostEnum } from "src/enum";
import { UpdatePostDTO } from "./dto/update-post.dto";
import { PageDto } from "src/common/page.dto";
import { PostsOptionDto } from "./dto/post-option.dto";
import { MediasService } from "../medias/medias.service";
import { FileProducerService } from "src/shared/file/file.producer.service";
import { EntityId } from "typeorm/repository/EntityId";
import { ChangeStatusPostDTO } from "./dto/change-status-post.dto";
import { UserService } from "../users/user.service";
import { NotificationProducerService } from "src/shared/notification/notification.producer.service";
import { BranchesService } from "../branches/branches.service";
import { RolesGuard } from "../auth/guards/roles.guard";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
@ApiTags("posts")
@Controller("posts")
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly petsService: PetsService,
    private readonly mediasService: MediasService,
    private readonly userService: UserService,
    private readonly branchService: BranchesService,
    private fileProducerService: FileProducerService,
    private notificationProducerService: NotificationProducerService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FilesInterceptor("files"))
  async createPost(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body() body: CreatePostDTO,
  ): Promise<PostEntity> {
    const branchInstance = await this.branchService.findById(body.branchId);
    if (!branchInstance) {
      throw new NotFoundException("Can not found branch!");
    }
    const accountBranchInstance = await this.userService.findByPhoneNumber(
      branchInstance.phoneNumber || "",
    );
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
    const postCreated = await this.postsService.store(
      new PostEntity({ ...body, medias }),
    );
    await this.notificationProducerService.sendMessage(
      {
        body: "Your branch has a new post registered.",
        title: "New Post",
        type: NotificationEnum.NEW_POST,
        metadata: String(postCreated.id),
      },
      accountBranchInstance.id,
    );
    return postCreated;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
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
          postId: Number(body.id),
        });
      }),
    );

    if (body.deletedIds) {
      const deletedMedias = await this.mediasService.findByIds(
        body.deletedIds as [EntityId],
      );
      await this.mediasService.deleteItems(body.deletedIds);
      await this.fileProducerService.deleteFiles(
        deletedMedias.map((media) => media.url),
      );
    }

    const instance = await this.postsService.getOneWithMedias(body.id);
    Object.assign(instance, body);
    instance.id = Number(body.id);
    instance.medias = [...instance.medias, ...medias];
    return instance.save();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async changeStatusPost(
    @Body() body: ChangeStatusPostDTO,
  ): Promise<PostEntity> {
    const instance = await this.postsService.getOneWithMedias(body.id);
    if (!instance) {
      throw new NotFoundException("Can not found post!");
    }
    const accountByPhoneNumber = await this.userService.findByPhoneNumber(
      instance.customer.phoneNumber || "",
    );
    if (!accountByPhoneNumber) {
      throw new NotFoundException("Can not found user!");
    }
    const petInstance = await this.petsService.findById(instance.petId);
    if (!petInstance) {
      throw new NotFoundException("Can not found pet!");
    }
    let bodyNotification = "",
      titleNotification = "",
      typeNotification = "";
    if (instance.status === PostEnum.REQUESTED) {
      instance.status = body.status;
      if (body.status === PostEnum.PUBLISHED) {
        bodyNotification =
          "Your post have been verified. See information details now.>>>>";
        titleNotification = "Verified your post";
        typeNotification = NotificationEnum.CONFIRM_POST;
      } else if (body.status === PostEnum.REJECTED) {
        bodyNotification =
          "Your post have been rejected. See information details now.>>>>";
        titleNotification = "Rejected your post!";
        instance.reasonReject = body.reasonReject;
        typeNotification = NotificationEnum.REJECT_POST;
      } else if (body.status === PostEnum.CANCELED) {
        petInstance.status = PetEnum.NORMAL;
        await petInstance.save();
      }
      const postChanged = await instance.save();
      await this.notificationProducerService.sendMessage(
        {
          body: bodyNotification,
          title: titleNotification,
          type: typeNotification,
          metadata: String(postChanged.id),
        },
        accountByPhoneNumber.id,
      );
      return postChanged;
    } else if (
      instance.status === PostEnum.CANCELED &&
      body.status === PostEnum.REQUESTED
    ) {
      instance.status = body.status;
      return await instance.save();
    } else if (
      instance.status === PostEnum.PUBLISHED &&
      body.status === PostEnum.CLOSED
    ) {
      instance.status = body.status;
      const postChanged = await instance.save();
      petInstance.status = PetEnum.NORMAL;
      await petInstance.save();
      await this.notificationProducerService.sendMessage(
        {
          body: "Your post have been closed. See information details now.>>>>",
          title: "Closed your post",
          type: NotificationEnum.CLOSED_POST,
          metadata: String(postChanged.id),
        },
        accountByPhoneNumber.id,
      );
      return postChanged;
    } else {
      throw new BadRequestException(
        "The current status of the post cannot be changed!",
      );
    }
  }

  @Get("/fetch-post")
  @HttpCode(HttpStatus.OK)
  async fethchAllPostList(
    @Query()
    pageOptionsDto: PostsOptionDto,
  ): Promise<PageDto<PostEntity>> {
    try {
      return await this.postsService.fetchPost(pageOptionsDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<PostEntity> {
    try {
      return await this.postsService.getOne(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
