import { Controller, Res, Get, Req } from "@nestjs/common";
import { Response, Request } from "express";
import { vnpayService } from "src/external/vnpay.service";
import { PaymentService } from "./payment.service";

@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  generatePaymentUrl(@Res() res: Response, @Req() req: Request): void {
    const ipAddr: string = req.socket.remoteAddress;
    const url = vnpayService.generatePaymentUrl(
      "2342",
      "https://www.google.com.vn/",
      2000000,
      ipAddr.split(":").pop() || "127.0.0.1",
      "Thanh toán tiền chó 50K",
      "vn",
      "NCB",
      undefined,
    );
    if (url) {
      return res.redirect(url);
    }
  }
}
