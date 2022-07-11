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

  public getWebAdminRootURL(): string {
    return this.getValue("WEB_ADMIN_ROOT_URL", true);
  }

  public getBranchRootUrl(): string {
    return this.getValue("BRANCH_ROOT_URL", true);
  }

  public getBlockchainServer(): string {
    return this.getValue("BLOCKCHAIN_SERVER", true);
  }

  public getBucket(): string {
    return this.getValue("BUCKET", true);
  }

  public getRedisServer(): string {
    return this.getValue("REDIS_SERVER", true);
  }

  public getVnPayTmn(): string {
    return this.getValue("VNPAY_TMN_CODE", true);
  }

  public getVnPayHashSecret(): string {
    return this.getValue("VNPAY_HASH_SECRET", true);
  }

  public getVnPayUrl(): string {
    return this.getValue("VNPAY_URL", true);
  }

  public getVnVersion(): string {
    return this.getValue("VNPAY_VERSION", true);
  }

  public getPrefix(): string {
    return this.getValue("API_PREFIX", true);
  }

  public getMongoConnectionString(): string {
    return this.getValue("MONGO_CONNECTION_STRING");
  }
}

const configService = new ConfigService({
  ...process.env,
}).ensureValues([
  "API_PORT",
  "WEB_ADMIN_ROOT_URL",
  "POSTGRES_USER",
  "POSTGRES_PASSWORD",
  "POSTGRES_DB",
  "POSTGRES_HOST",
  "POSTGRES_PORT",
  "BUCKET",
  "REDIS_SERVER",
  "VNPAY_TMN_CODE",
  "VNPAY_HASH_SECRET",
  "VNPAY_URL",
  "VNPAY_VERSION",
  "API_PREFIX",
  "MONGO_CONNECTION_STRING",
]);

export { configService };
