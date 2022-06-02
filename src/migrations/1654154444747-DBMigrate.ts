import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654154444747 implements MigrationInterface {
  name = "DBMigrate1654154444747";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "transactionTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "transactionFee" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ADD "placeMeeting" text',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "placeMeeting"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "transactionFee"',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" DROP COLUMN "transactionTime"',
    );
  }
}
