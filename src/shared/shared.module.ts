import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { configService } from "src/config/config.service";
import { FileProducerService } from "./file/file.producer.service";
import { NotificationProducerService } from "./notification/notification.producer.service";
import { NotificationConsumer } from "./notification/notification.consumer";
import { FileConsumer } from "./file/file.consumer";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: configService.getRedisServer(),
        port: 6379,
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
  ],
  exports: [
    FileProducerService,
    FileConsumer,
    NotificationProducerService,
    NotificationConsumer,
  ],
})
export class SharedModule {}
