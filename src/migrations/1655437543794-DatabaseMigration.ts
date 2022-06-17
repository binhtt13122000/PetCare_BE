import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1655437543794 implements MigrationInterface {
  name = "DatabaseMigration1655437543794";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TYPE "public"."sale_transaction_status_enum" RENAME TO "sale_transaction_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"sale_transaction_status_enum\" AS ENUM('CREATED', 'CANCELED', 'REJECTED', 'SUCCESS', 'EXPIRED')",
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
      "CREATE TYPE \"public\".\"sale_transaction_status_enum_old\" AS ENUM('CREATED', 'CANCELED', 'REJECTED', 'SUCCESS')",
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
  }
}
