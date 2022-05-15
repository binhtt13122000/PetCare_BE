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
} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Branch } from "src/entities/user_management_service/branch.entity";
import { CreateBranchDTO } from "./dtos/create-branch.dto";
import { BranchService } from "./branch.service";
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

@ApiTags("branch")
@Controller("branch")
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly userService: UserService,
    private readonly fileProducerService: FileProducerService,
  ) {}

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
          registerTime: new Date(),
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
        image = await uploadService.uploadFile(file);
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
