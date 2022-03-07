import { getMessaging } from "firebase-admin/messaging";

interface Message {
  title: string;
  body: string;
  requireInteraction?: boolean;
  link?: string;
}
export class SendNotificationService {
  async sendNotification(fcmToken: string, msg: Message): Promise<string> {
    try {
      const res = await getMessaging().send({
        webpush: {
          notification: {
            ...msg,
            icon: "https://your-website.com/favicon.png",
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
        token: fcmToken,
      });
      return res;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("sendFCMMessage error", e);
    }
  }
}

export const sendNotificationService = new SendNotificationService();
