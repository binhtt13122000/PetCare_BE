import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1650948057243 implements MigrationInterface {
  name = "DBMigrate1650948057243";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-26T04:41:01.224Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-25 15:26:02.157\'',
    );
  }
}
