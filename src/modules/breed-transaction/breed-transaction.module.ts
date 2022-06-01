import { Module } from "@nestjs/common";
import { BreedTransactionService } from "./breed-transaction.service";
import { BreedTransactionController } from "./breed-transaction.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedTransactionRepository } from "./breed-transaction.repository";
import { CustomerModule } from "../customer/customer.module";
import { PostsModule } from "../posts/posts.module";
import { ChatModule } from "../chat/chat.module";
import { RoomsModule } from "../rooms/rooms.module";
import { MessagesModule } from "../messages/messages.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([BreedTransactionRepository]),
    CustomerModule,
    PostsModule,
    ChatModule,
    RoomsModule,
    MessagesModule,
  ],
  providers: [BreedTransactionService],
  controllers: [BreedTransactionController],
  exports: [BreedTransactionService],
})
export class BreedTransactionModule {}
