import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { configService } from "./config/config.service";
import { ServiceAccount } from "firebase-admin";
import firebase_admin_config from "src/keys/firebase_admin_sdk.json";
import * as firebase from "firebase-admin";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
  //get config value
  const API_PORT = configService.getPort();
  const API_ROOT_URL = configService.getApiRootURL();
  const WEB_ADMIN_ROOT_URL = configService.getWebAdminRootURL();
  const HASURA_ROOT_URL = configService.getHasuraUrl();
  const BUCKET = configService.getBucket();
  const API_PREFIX = configService.getPrefix();

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [`${WEB_ADMIN_ROOT_URL}`],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (
        validationErrors: ValidationError[] = [],
      ): BadRequestException => {
        return new BadRequestException(
          validationErrors.map((validationError: ValidationError) => {
            return {
              property: validationError.property,
              constraints: validationError.constraints,
              value: validationError.value,
            };
          }),
        );
      },
    }),
  );

  //implement Swagger
  const openApiConfig = new DocumentBuilder()
    .setTitle("Pet App Capstone")
    .setDescription("API for Capstone")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      tagsSorter: "alpha",
      operationsSorter: "method",
    },
  });

  //implement firebase
  if (!firebase.apps.length) {
    firebase.initializeApp({
      credential: firebase.credential.cert(
        <ServiceAccount>firebase_admin_config,
      ),
      storageBucket: BUCKET,
    });
  }

  //first log
  Logger.log(`Server running on ${API_ROOT_URL}, port: ${API_PORT}`, "Main");
  Logger.log(
    `Accepting requests from web admin: ${WEB_ADMIN_ROOT_URL}`,
    "Main",
  );
  Logger.log(`Hasura API: ${HASURA_ROOT_URL}`, "Main");
  await app.listen(API_PORT);
}
bootstrap();
