import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
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
    // eslint-disable-next-line no-console
    console.log("chat");
    this.wss.to(message.room).emit("chatToClient", message);
  }

  @SubscribeMessage("joinRoom")
  handleRoomJoin(client: Socket, room: string): void {
    // eslint-disable-next-line no-console
    console.log("A NEW CLIENT JUST JOINED", room);
    client.join(room);
    client.emit("joinedRoom", room);
  }

  @SubscribeMessage("leaveRoom")
  handleRoomLeave(client: Socket, room: string): void {
    // eslint-disable-next-line no-console
    console.log("A NEW CLIENT JUST LEAVE", room);
    client.leave(room);
    client.emit("leftRoom", room);
  }
}
