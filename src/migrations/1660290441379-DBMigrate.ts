import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1660290441379 implements MigrationInterface {
  name = "DBMigrate1660290441379";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "service_ticket" ADD "petId" integer');
    await queryRunner.query(
      'ALTER TABLE "service_ticket" ADD CONSTRAINT "FK_3d01097179af704c3e9e3a403ab" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service_ticket" DROP CONSTRAINT "FK_3d01097179af704c3e9e3a403ab"',
    );
    await queryRunner.query('ALTER TABLE "service_ticket" DROP COLUMN "petId"');
  }
}
