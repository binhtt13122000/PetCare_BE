import { Module } from "@nestjs/common";
import { SaleTransactionsService } from "./sale-transactions.service";
import { SaleTransactionsController } from "./sale-transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleTransactionsRepository } from "./sale-transaction.repository";
import { CustomerModule } from "../customer/customer.module";
import { PostsModule } from "../posts/posts.module";
import { RoomsModule } from "../rooms/rooms.module";
import { ChatModule } from "../chat/chat.module";
import { MessagesModule } from "../messages/messages.module";
import { PetOwnerModule } from "../pet-owner/pet-owner.module";
import { PetsModule } from "../pets/pets.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleTransactionsRepository]),
    CustomerModule,
    PostsModule,
    ChatModule,
    RoomsModule,
    MessagesModule,
    PetOwnerModule,
    PetsModule,
  ],
  providers: [SaleTransactionsService],
  controllers: [SaleTransactionsController],
  exports: [SaleTransactionsService],
})
export class SaleTransactionsModule {}
