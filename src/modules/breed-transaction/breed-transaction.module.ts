import { forwardRef, Module } from "@nestjs/common";
import { BreedTransactionService } from "./breed-transaction.service";
import { BreedTransactionController } from "./breed-transaction.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedTransactionRepository } from "./breed-transaction.repository";
import { CustomerModule } from "../customer/customer.module";
import { PostsModule } from "../posts/posts.module";
import { ChatModule } from "../chat/chat.module";
import { RoomsModule } from "../rooms/rooms.module";
import { MessagesModule } from "../messages/messages.module";
import { PetsModule } from "../pets/pets.module";
import { UserModule } from "../users/user.module";
import { SharedModule } from "src/shared/shared.module";
import { BranchesModule } from "../branches/branches.module";
import { AuthModule } from "../auth/auth.module";
import { TicketsModule } from "../tickets/tickets.module";

@Module({
  imports: [
    forwardRef(() => BranchesModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([BreedTransactionRepository]),
    CustomerModule,
    PostsModule,
    ChatModule,
    RoomsModule,
    MessagesModule,
    PetsModule,
    UserModule,
    SharedModule,
    TicketsModule,
  ],
  providers: [BreedTransactionService],
  controllers: [BreedTransactionController],
  exports: [BreedTransactionService],
})
export class BreedTransactionModule {}
