import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import path = require("path");

import dotenv = require("dotenv");

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): ConfigService {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort(): string {
    return this.getValue("API_PORT", true);
  }

  public getApiRootURL(): string {
    return this.getValue("API_ROOT_URL", true);
  }

  public getWebAdminRootURL(): string {
    return this.getValue("WEB_ADMIN_ROOT_URL", true);
  }

  public getHasuraUrl(): string {
    return this.getValue("HASURA_ROOT_URL", true);
  }

  public getGoogleClientID(): string {
    return this.getValue("GOOGLE_CLIENT_ID", true);
  }

  public getGoogleAuthURI(): string {
    return this.getValue("GOOGLE_AUTH_URI", true);
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: this.getValue("POSTGRES_HOST"),
      port: parseInt(this.getValue("POSTGRES_PORT")),
      username: this.getValue("POSTGRES_USER"),
      password: this.getValue("POSTGRES_PASSWORD"),
      database: this.getValue("POSTGRES_DB"),
      logging: true,
      synchronize: true,

      entities: ["dist/entities/*.entity{.ts,.js}"],
      migrations: [path.join(__dirname, "../migrations/*{.ts}")],
      cli: {
        migrationsDir: "src/migrations",
      },
      ssl: false,
    };
  }
}

const configService = new ConfigService({
  ...process.env,
}).ensureValues([
  "API_PORT",
  "API_ROOT_URL",
  "WEB_ADMIN_ROOT_URL",
  "HASURA_ROOT_URL",
  "GOOGLE_CLIENT_ID",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
  "POSTGRES_HOST",
  "POSTGRES_PORT",
]);

export { configService };
