import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    if (
      response.req.url !== "/v1/api/payment" &&
      response.req.url !==
        "/v1/api/orders/payment/1?promotionId=1&locale=vi&paymentMethod=vnpay&total=135000&message=CC" &&
      !String(response.req.url).startsWith("/v1/api/orders/payment")
    ) {
      return next.handle().pipe(
        map((data) => {
          if (data != 0 && !data) {
            throw new HttpException(
              "The data you requested is not found",
              HttpStatus.NOT_FOUND,
            );
          }
          // Logger.debug(
          //   `Response: \n ${JSON.stringify(data)}`,
          //   "ResponseDataInterceptor",
          // );
          return {
            success: true,
            message: "Retrieved data successfully",
            data: data,
          };
        }),
      );
    }
    return next.handle();
  }
}
