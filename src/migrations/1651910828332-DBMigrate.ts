import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1651910828332 implements MigrationInterface {
  name = "DBMigrate1651910828332";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service" ADD "healthCheckTemplate" text NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-07T08:07:12.761Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-07 08:02:26.042\'',
    );
    await queryRunner.query(
      'ALTER TABLE "service" DROP COLUMN "healthCheckTemplate"',
    );
  }
}
