import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigrate1650521692042 implements MigrationInterface {
  name = "DatabaseMigrate1650521692042";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet" DROP CONSTRAINT "FK_9bcbad056bb61c2d5e3fbf5cef6"',
    );
    await queryRunner.query(
      'CREATE TABLE "breed" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, "isActive" boolean NOT NULL, "speciesId" integer NOT NULL, CONSTRAINT "PK_d1c857f060076296ce8a87b9043" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "account" DROP COLUMN "currentHashedRefreshToken"',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD "currentHashedRefreshToken" text',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-04-21T06:14:55.635Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "breed" ADD CONSTRAINT "FK_e0b8d5f06e5174dfa885e45b9e7" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD CONSTRAINT "FK_9bcbad056bb61c2d5e3fbf5cef6" FOREIGN KEY ("breedId") REFERENCES "breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "pet" DROP CONSTRAINT "FK_9bcbad056bb61c2d5e3fbf5cef6"',
    );
    await queryRunner.query(
      'ALTER TABLE "breed" DROP CONSTRAINT "FK_e0b8d5f06e5174dfa885e45b9e7"',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-04-20 16:51:55.005\'',
    );
    await queryRunner.query(
      'ALTER TABLE "account" DROP COLUMN "currentHashedRefreshToken"',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ADD "currentHashedRefreshToken" character varying',
    );
    await queryRunner.query('DROP TABLE "breed"');
    await queryRunner.query(
      'ALTER TABLE "pet" ADD CONSTRAINT "FK_9bcbad056bb61c2d5e3fbf5cef6" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
