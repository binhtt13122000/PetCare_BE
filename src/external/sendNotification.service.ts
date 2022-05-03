import { Logger } from "@nestjs/common";
import { BatchResponse, getMessaging } from "firebase-admin/messaging";
import { Message } from "src/common";
export class SendNotificationService {
  async sendNotification(
    fcmTokens: string[],
    msg: Message,
  ): Promise<BatchResponse> {
    try {
      const res = await getMessaging().sendMulticast({
        webpush: {
          notification: {
            ...msg,
            icon: "https://sc04.alicdn.com/kf/Hb9c51d5d61074e2d8d0f9c4b3fe2df0bw.jpg_Q55.jpg",
            requireInteraction: msg.requireInteraction ?? false,
            actions: [
              {
                title: "Open",
                action: "open",
              },
            ],
            data: {
              link: msg.link,
            },
          },
        },
        android: {
          notification: {
            ...msg,
          },
        },
        tokens: [...fcmTokens],
      });
      return res;
    } catch (e) {
      Logger.log(`sendFCMMessage error: ${e}`);
    }
  }
}

export const sendNotificationService = new SendNotificationService();
