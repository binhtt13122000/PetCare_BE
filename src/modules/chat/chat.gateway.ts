import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway({
  namespace: "/chat",
  cors: {
    origin: "*",
  },
})
export class ChatGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger("ChatGateway");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.logger.log("Initialized!");
  }

  @SubscribeMessage("chatToServer")
  handleMessage(
    @MessageBody() message: { sender: string; room: string; message: string },
  ): void {
    this.wss.to(message.room).emit("chatToClient", message);
  }
}
