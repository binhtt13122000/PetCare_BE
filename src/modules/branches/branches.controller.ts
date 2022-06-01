import {
  Body,
  Controller,
  HttpStatus,
  Post,
  HttpException,
  Put,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Get,
  Query,
} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Branch } from "src/entities/user_management_service/branch.entity";
import { CreateBranchDTO } from "./dtos/create-branch.dto";
import { BranchesService } from "./branches.service";
import { UserService } from "../users/user.service";
import { Account } from "src/entities/authenticate_service/account.entity";
import { DEFAULT_PASSWORD } from "../../common/index";
import { RoleIndexEnum } from "src/enum";
import * as bcrypt from "bcrypt";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateBranchDTO } from "./dtos/update-branch.dto";
import { uploadService } from "src/external/uploadFile.service";
import { FileProducerService } from "src/shared/file/file.producer.service";
import { IdParams } from "src/common";
import { getLatitude, getLongitude, orderByDistance } from "geolib";

@ApiTags("branches")
@Controller("branches")
export class BranchesController {
  constructor(
    private readonly branchService: BranchesService,
    private readonly userService: UserService,
    private readonly fileProducerService: FileProducerService,
  ) {}

  @Get("location")
  async getListByLatLng(
    @Query("lat") lat: string,
    @Query("lng") lng: string,
  ): Promise<Branch[]> {
    const branches = await this.branchService.index();
    const orderedLocations = orderByDistance(
      { latitude: Number(lat), longitude: Number(lng) },
      [
        ...branches.map((branch) => {
          return {
            latitude: branch.lat,
            longitude: branch.lng,
          };
        }),
      ],
    );
    return orderedLocations.map((x) => {
      return branches.find(
        (branch) =>
          branch.lat === getLatitude(x) && branch.lng === getLongitude(x),
      );
    });
  }

  @Get()
  async getList(): Promise<Branch[]> {
    return this.branchService.index();
  }

  @Get(":id")
  async getOne(@Param("id") id: number): Promise<Branch> {
    return this.branchService.getOne(id);
  }

  @Post()
  async createBranch(
    @Body() body: CreateBranchDTO,
  ): Promise<{ branch: Branch; account: Account }> {
    try {
      const password = await bcrypt.hash(DEFAULT_PASSWORD, 12);
      const createdAccount = await this.userService.store(
        new Account({
          phoneNumber: body.phoneNumber,
          isActive: true,
          password: password,
          registerTime: body.registerTime,
          currentHashedRefreshToken: null,
          roleId: RoleIndexEnum.BRANCH_MANAGER,
        }),
      );
      const createdBranch = await this.branchService.store(
        new Branch({ ...body, isActive: true, image: null }),
      );
      return {
        account: createdAccount,
        branch: createdBranch,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiConsumes("multipart/form-data")
  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async updateBranch(
    @UploadedFile() file: Express.Multer.File,

    @Body() body: UpdateBranchDTO,
  ): Promise<Branch> {
    try {
      const currentBranch = await this.branchService.findById(body.id);
      if (!currentBranch) {
        throw new HttpException("NOT FOUND", HttpStatus.NOT_FOUND);
      }
      let image = null;
      if (file) {
        const { url } = await uploadService.uploadFile(file);
        image = url;
        if (body.image) {
          await this.fileProducerService.deleteFile(body.image);
        }
      }
      const branch = {
        ...body,
        image: file ? image : body.image,
      };
      return await this.branchService.update(branch.id, {
        ...currentBranch,
        ...branch,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async deleteBranch(@Param() param: IdParams): Promise<Branch> {
    try {
      const branch = await this.branchService.findById(param.id);
      if (!branch) {
        throw new HttpException("Nothing", HttpStatus.NOT_FOUND);
      }
      if (!branch.isActive) {
        throw new HttpException("Inactive", HttpStatus.BAD_REQUEST);
      }
      const user = await this.userService.findByPhoneNumber(branch.phoneNumber);
      if (!user) {
        throw new HttpException("Nothing", HttpStatus.NOT_FOUND);
      }
      if (!user.isActive) {
        throw new HttpException("Inactive", HttpStatus.BAD_REQUEST);
      }
      await this.userService.update(user.id, { ...user, isActive: false });
      return await this.branchService.update(branch.id, {
        ...branch,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
