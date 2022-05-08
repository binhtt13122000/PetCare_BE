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
import { Staff } from "src/entities/user_management_service/staff.entity";
import { CreateStaffDTO } from "./dtos/create-staff.dto";
import { StaffService } from "./staff.service";
import { UserService } from "../users/user.service";
import { Account } from "src/entities/authenticate_service/account.entity";
import { DEFAULT_PASSWORD } from "../../common/index";
import { RoleIndexEnum } from "src/enum";
import * as bcrypt from "bcrypt";
import { FileInterceptor } from "@nestjs/platform-express";
import { UpdateStaffDTO } from "./dtos/update-staff.dto";
import { uploadService } from "src/external/uploadFile.service";
import { FileProducerService } from "src/shared/file/file.producer.service";
import { IdParams } from "src/common";

@ApiTags("staffs")
@Controller("staffs")
export class StaffsController {
  constructor(
    private readonly staffService: StaffService,
    private readonly userService: UserService,
    private readonly fileProducerService: FileProducerService,
  ) {}

  @Post()
  async createStaff(
    @Body() body: CreateStaffDTO,
  ): Promise<{ staff: Staff; account: Account }> {
    try {
      const password = await bcrypt.hash(DEFAULT_PASSWORD, 12);
      const createdAccount = await this.userService.store(
        new Account({
          phoneNumber: body.phoneNumber,
          isActive: true,
          password: password,
          registerTime: new Date(),
          currentHashedRefreshToken: null,
          roleId: RoleIndexEnum.STAFF,
        }),
      );
      const createdStaff = await this.staffService.store(
        new Staff({ ...body, isActive: true, avatar: null }),
      );
      return {
        account: createdAccount,
        staff: createdStaff,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiConsumes("multipart/form-data")
  @Put()
  @UseInterceptors(FileInterceptor("file"))
  async updateStaff(
    @UploadedFile() file: Express.Multer.File,

    @Body() body: UpdateStaffDTO,
  ): Promise<Staff> {
    try {
      let avatar = null;
      if (file) {
        avatar = await uploadService.uploadFile(file);
        await this.fileProducerService.deleteFile(body.avatar);
      }
      const staff = {
        ...body,
        evidence: file ? avatar.url : body.avatar,
      };
      return await this.staffService.update(staff.id, staff);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":id")
  async deleteStaff(@Param() param: IdParams): Promise<Staff> {
    try {
      const staff = await this.staffService.findById(param.id);
      if (!staff) {
        throw new HttpException("Nothing", HttpStatus.NOT_FOUND);
      }
      const user = await this.userService.findByPhoneNumber(staff.phoneNumber);
      if (!user) {
        throw new HttpException("Nothing", HttpStatus.NOT_FOUND);
      }
      await this.userService.update(user.id, { ...user, isActive: false });
      return await this.staffService.update(staff.id, {
        ...staff,
        isActive: false,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
