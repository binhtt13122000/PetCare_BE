import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1651910872530 implements MigrationInterface {
  name = "DBMigrate1651910872530";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service" ALTER COLUMN "healthCheckTemplate" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-07T08:07:56.853Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-07 08:07:12.761\'',
    );
    await queryRunner.query(
      'ALTER TABLE "service" ALTER COLUMN "healthCheckTemplate" SET NOT NULL',
    );
  }
}
