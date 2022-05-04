import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = {
      success: false,
      message: "Failed to retrieve data!",
      data: {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message: exception.message,
        response: exception.getResponse(),
      },
    };

    response.status(status).json(errorResponse);
  }
}
