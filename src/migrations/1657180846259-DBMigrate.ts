import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1657180846259 implements MigrationInterface {
  name = "DBMigrate1657180846259";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "public"."order_status_enum" RENAME TO "order_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_status_enum\" AS ENUM('SUCCESS', 'WAITING', 'DRAFT', 'CANCELED', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum" USING "status"::"text"::"public"."order_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."order_status_enum_old"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"order_status_enum_old\" AS ENUM('SUCCESS', 'WAITING', 'DRAFT')",
    );
    await queryRunner.query(
      'ALTER TABLE "order" ALTER COLUMN "status" TYPE "public"."order_status_enum_old" USING "status"::"text"::"public"."order_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."order_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."order_status_enum_old" RENAME TO "order_status_enum"',
    );
  }
}
