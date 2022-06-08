import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654660192490 implements MigrationInterface {
  name = "DBMigrate1654660192490";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "combo_service" DROP CONSTRAINT "FK_79098fa858d3c9b6416935b1ed4"',
    );
    await queryRunner.query(
      'ALTER TABLE "combo_service" ALTER COLUMN "comboId" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "combo_service" ADD CONSTRAINT "FK_79098fa858d3c9b6416935b1ed4" FOREIGN KEY ("comboId") REFERENCES "combo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "combo_service" DROP CONSTRAINT "FK_79098fa858d3c9b6416935b1ed4"',
    );
    await queryRunner.query(
      'ALTER TABLE "combo_service" ALTER COLUMN "comboId" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "combo_service" ADD CONSTRAINT "FK_79098fa858d3c9b6416935b1ed4" FOREIGN KEY ("comboId") REFERENCES "combo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
