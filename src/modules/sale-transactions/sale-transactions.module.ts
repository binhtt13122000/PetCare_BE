import { forwardRef, Module } from "@nestjs/common";
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
import { UserModule } from "../users/user.module";
import { SharedModule } from "src/shared/shared.module";
import { BranchesModule } from "../branches/branches.module";
import { HttpModule } from "@nestjs/axios";
import { configService } from "src/config/config.service";
import { AuthModule } from "../auth/auth.module";
import { TicketsModule } from "../tickets/tickets.module";

const blockchainServer = configService.getBlockchainServer();
@Module({
  imports: [
    forwardRef(() => BranchesModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([SaleTransactionsRepository]),
    CustomerModule,
    PostsModule,
    ChatModule,
    RoomsModule,
    MessagesModule,
    PetOwnerModule,
    PetsModule,
    UserModule,
    SharedModule,
    TicketsModule,
    HttpModule.register({
      baseURL: blockchainServer,
    }),
  ],
  providers: [SaleTransactionsService],
  controllers: [SaleTransactionsController],
  exports: [SaleTransactionsService],
})
export class SaleTransactionsModule {}
