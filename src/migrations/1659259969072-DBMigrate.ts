import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1659259969072 implements MigrationInterface {
  name = "DBMigrate1659259969072";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" ADD "transactionFeeId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_35d0d1c0191b591ebb125742b1e" FOREIGN KEY ("transactionFeeId") REFERENCES "transaction_fee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_35d0d1c0191b591ebb125742b1e"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP COLUMN "transactionFeeId"',
    );
  }
}
