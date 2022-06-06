import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1654478500975 implements MigrationInterface {
  name = "DBMigrate1654478500975";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "combo" ("id" SERIAL NOT NULL, "price" integer NOT NULL, "description" text, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7f13547266097aa634ddefd34f9" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'CREATE TABLE "combo_service" ("id" SERIAL NOT NULL, "priority" integer NOT NULL, "nextEvent" integer NOT NULL, "comboId" integer NOT NULL, "serviceId" integer NOT NULL, CONSTRAINT "PK_d1e92f50f3210be4d3ddb682f58" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "combo_service" ADD CONSTRAINT "FK_79098fa858d3c9b6416935b1ed4" FOREIGN KEY ("comboId") REFERENCES "combo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "combo_service" ADD CONSTRAINT "FK_3fee8311400f6843bb4de6953b0" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "combo_service" DROP CONSTRAINT "FK_3fee8311400f6843bb4de6953b0"',
    );
    await queryRunner.query(
      'ALTER TABLE "combo_service" DROP CONSTRAINT "FK_79098fa858d3c9b6416935b1ed4"',
    );
    await queryRunner.query('DROP TABLE "combo_service"');
    await queryRunner.query('DROP TABLE "combo"');
  }
}
