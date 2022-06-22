import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655872315943 implements MigrationInterface {
  name = "DBMigrate1655872315943";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "public"."breeding_transaction_status_enum" RENAME TO "breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum\" AS ENUM('CREATED', 'CANCELED', 'SUCCESS', 'PAYMENTED', 'BREEDING_FINISHED', 'BREEDING_REQUESTED', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" TYPE "public"."breeding_transaction_status_enum" USING "status"::"text"::"public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum_old"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum_old\" AS ENUM('CREATED', 'CANCELED', 'SUCCESS', 'PAYMENTED', 'BREEDING_FINISHED', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" TYPE "public"."breeding_transaction_status_enum_old" USING "status"::"text"::"public"."breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."breeding_transaction_status_enum_old" RENAME TO "breeding_transaction_status_enum"',
    );
  }
}
