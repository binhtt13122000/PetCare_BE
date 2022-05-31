import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653969649884 implements MigrationInterface {
  name = "DBMigrate1653969649884";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "dateOfBreeding" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "pickupMalePetTime" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "pickupFemalePetTime" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "paymentMethod" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "star" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-31T04:00:53.477Z"\'',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-30 09:07:10.2\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "star" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "paymentMethod" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "pickupFemalePetTime" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "pickupMalePetTime" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "breeding_transaction" ALTER COLUMN "dateOfBreeding" SET NOT NULL',
    );
  }
}
