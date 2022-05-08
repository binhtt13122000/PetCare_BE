import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1651726068785 implements MigrationInterface {
  name = "DBMigrate1651726068785";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "account" ADD "password" text');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-05T04:47:52.209Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-26 04:41:01.224\'',
    );
    await queryRunner.query('ALTER TABLE "account" DROP COLUMN "password"');
  }
}
