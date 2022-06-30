import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1656562912026 implements MigrationInterface {
  name = "DBMigrate1656562912026";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "petComboId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD "breedTransactionId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_4ea0245ad807c0126fa04f81184"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ALTER COLUMN "serviceId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_4ea0245ad807c0126fa04f81184" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_8e22ccbd850bf937bd8d6b9a085" FOREIGN KEY ("petComboId") REFERENCES "pet_combo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_e27366c0ed312d29d7d0b9b61fd" FOREIGN KEY ("breedTransactionId") REFERENCES "breeding_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_e27366c0ed312d29d7d0b9b61fd"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_8e22ccbd850bf937bd8d6b9a085"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_4ea0245ad807c0126fa04f81184"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ALTER COLUMN "serviceId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_4ea0245ad807c0126fa04f81184" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP COLUMN "breedTransactionId"',
    );
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP COLUMN "petComboId"',
    );
  }
}
