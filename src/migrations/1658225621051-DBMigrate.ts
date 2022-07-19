import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1658225621051 implements MigrationInterface {
  name = "DBMigrate1658225621051";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "order_detail" ADD "microchip" text');
    await queryRunner.query('ALTER TABLE "order_detail" ADD "petId" integer');
    await queryRunner.query(
      'ALTER TABLE "order_detail" ADD CONSTRAINT "FK_db9660596308233a48bbf31fd53" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP CONSTRAINT "FK_db9660596308233a48bbf31fd53"',
    );
    await queryRunner.query('ALTER TABLE "order_detail" DROP COLUMN "petId"');
    await queryRunner.query(
      'ALTER TABLE "order_detail" DROP COLUMN "microchip"',
    );
  }
}
