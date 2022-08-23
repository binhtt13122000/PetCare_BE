import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { configService } from "src/config/config.service";
import { FileProducerService } from "./file/file.producer.service";
import { NotificationProducerService } from "./notification/notification.producer.service";
import { NotificationConsumer } from "./notification/notification.consumer";
import { FileConsumer } from "./file/file.consumer";
import { HttpModule } from "@nestjs/axios";
import { AxiosService } from "./axios/axios.service";

const blockchainServer = configService.getBlockchainServer();
@Module({
  imports: [
    HttpModule.register({
      baseURL: blockchainServer,
    }),
    BullModule.forRoot({
      redis: {
        host: configService.getRedisServer(),
        port: 6379,
        password: configService.getRedisPassword(),
      },
    }),
    BullModule.registerQueue(
      {
        name: "file-operation-queue",
      },
      {
        name: "notification-queue",
      },
    ),
  ],
  providers: [
    FileProducerService,
    FileConsumer,
    NotificationProducerService,
    NotificationConsumer,
    AxiosService,
  ],
  exports: [
    FileProducerService,
    FileConsumer,
    NotificationProducerService,
    NotificationConsumer,
    AxiosService,
  ],
})
export class SharedModule {}
