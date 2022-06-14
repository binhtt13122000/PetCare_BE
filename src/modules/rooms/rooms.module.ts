import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Room, RoomSchema } from "src/schemas/room.schemas";
import { RoomsService } from "./rooms.service";
import { RoomsController } from "./rooms.controller";
import { CustomerModule } from "../customer/customer.module";
import { UserModule } from "../users/user.module";
import { SharedModule } from "src/shared/shared.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    CustomerModule,
    UserModule,
    SharedModule,
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
  exports: [RoomsService],
})
export class RoomsModule {}
