import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import {
  Message,
  sendNotificationService,
} from "src/external/sendNotification.service";
import { getFirestore } from "firebase-admin/firestore";

@Processor("notification-queue")
export class NotificationConsumer {
  @Process("notification-job")
  async sendMessage(
    job: Job<{ message: Message; userId: number }>,
  ): Promise<void> {
    const query = getFirestore()
      .collection("fcm")
      .where("userId", "==", job.data.userId);
    const fcmTokens: string[] = await (
      await query.get()
    ).docs.map((doc) => {
      const data = doc.data();
      return data?.fcm;
    });
    sendNotificationService.sendNotification(fcmTokens, job.data.message);
  }
}
