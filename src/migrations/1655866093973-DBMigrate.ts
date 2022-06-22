import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1655866093973 implements MigrationInterface {
  name = "DBMigrate1655866093973";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "public"."breeding_transaction_status_enum" RENAME TO "breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum\" AS ENUM('CREATED', 'CANCELED', 'SUCCESS', 'PAYMENTED', 'BREEDING_FINISHED', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "status" TYPE "public"."breeding_transaction_status_enum" USING "status"::"text"::"public"."breeding_transaction_status_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."breeding_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."sale_transaction_status_enum" RENAME TO "sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum\" AS ENUM('CREATED', 'CANCELED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "status" TYPE "public"."sale_transaction_status_enum" USING "status"::"text"::"public"."sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."sale_transaction_status_enum_old"',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum_old\" AS ENUM('CREATED', 'CANCELED', 'REJECTED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "status" TYPE "public"."sale_transaction_status_enum_old" USING "status"::"text"::"public"."sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      'DROP TYPE "public"."sale_transaction_status_enum"',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."sale_transaction_status_enum_old" RENAME TO "sale_transaction_status_enum"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"breeding_transaction_status_enum_old\" AS ENUM('CREATED', 'REQUESTED', 'CANCELED', 'REJECTED', 'PAYMENTED', 'BREEDING_FINISHED', 'SUCCESS', 'EXPIRED')",
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
