import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653279592593 implements MigrationInterface {
  name = "DBMigrate1653279592593";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-23T04:19:56.652Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ALTER COLUMN "startTime" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ALTER COLUMN "expireTime" DROP NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "promotion" ALTER COLUMN "expireTime" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "promotion" ALTER COLUMN "startTime" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-20 03:59:14.47\'',
    );
  }
}
