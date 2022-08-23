import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Queue } from "bull";
import { Message } from "src/common";

@Injectable()
export class NotificationProducerService {
  constructor(@InjectQueue("notification-queue") private queue: Queue) {}

  async sendMessage(message: Message, userId: number): Promise<void> {
    try {
      await this.queue.add("notification-job", {
        message: message,
        userId: userId,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
