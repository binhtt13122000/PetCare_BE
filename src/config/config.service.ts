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

  public getGoogleAuthURI(): string {
    return this.getValue("GOOGLE_AUTH_URI", true);
  }

  public getBucket(): string {
    return this.getValue("BUCKET", true);
  }
}

const configService = new ConfigService({
  ...process.env,
}).ensureValues([
  "API_PORT",
  "API_ROOT_URL",
  "WEB_ADMIN_ROOT_URL",
  "HASURA_ROOT_URL",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "BUCKET",
]);

export { configService };
