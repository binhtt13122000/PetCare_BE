import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1648008052969 implements MigrationInterface {
  name = "DatabaseMigration1648008052969";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_792a1158283757c3ad63cde3ee9"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" RENAME COLUMN "isMale" TO "gender"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" RENAME COLUMN "ticketId" TO "postHeathCheckId"',
    );
    await queryRunner.query(
      'CREATE TABLE "price_rule" ("id" SERIAL NOT NULL, "min" integer, "max" integer NOT NULL, "percent" integer NOT NULL, "depositPercent" integer NOT NULL, CONSTRAINT "PK_90db7c1255d7388d329842ab10b" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "post" ADD "meetingTime" TIMESTAMP');
    await queryRunner.query(
      'ALTER TABLE "post" ADD "healthCheckTime" TIMESTAMP',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "refund" SET NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "type"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_type_enum\" AS ENUM('PURCHASE', 'BREED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD "type" "public"."post_type_enum" NOT NULL',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."post_status_enum" RENAME TO "post_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_status_enum\" AS ENUM('REQUESTED', 'CANCELED', 'PUBLISHED', 'EXPIRED', 'DEPOSITED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "status" TYPE "public"."post_status_enum" USING "status"::"text"::"public"."post_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."post_status_enum_old"');
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "staffId" DROP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "gender"');
    await queryRunner.query(
      "CREATE TYPE \"public\".\"pet_gender_enum\" AS ENUM('MALE', 'FEMALE', 'UNKNOWN')",
    );
    await queryRunner.query(
      'ALTER TABLE "pet" ADD "gender" "public"."pet_gender_enum" NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "email" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "address" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32" FOREIGN KEY ("staffId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_44fa08145cedc1513f33ddc29f9" FOREIGN KEY ("postHeathCheckId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_44fa08145cedc1513f33ddc29f9"',
    );
    await queryRunner.query(
      'ALTER TABLE "post" DROP CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32"',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "address" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "account" ALTER COLUMN "email" SET NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "pet" DROP COLUMN "gender"');
    await queryRunner.query('DROP TYPE "public"."pet_gender_enum"');
    await queryRunner.query(
      'ALTER TABLE "pet" ADD "gender" boolean NOT NULL DEFAULT true',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "staffId" SET NOT NULL',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"post_status_enum_old\" AS ENUM('CANCELED', 'PUBLISHED', 'EXPIRED', 'DEPOSITED')",
    );
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "status" TYPE "public"."post_status_enum_old" USING "status"::"text"::"public"."post_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."post_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."post_status_enum_old" RENAME TO "post_status_enum"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "type"');
    await queryRunner.query('DROP TYPE "public"."post_type_enum"');
    await queryRunner.query('ALTER TABLE "post" ADD "type" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "post" ALTER COLUMN "refund" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "post" ADD CONSTRAINT "FK_f74f8ba2c2206bf27f1d103fe32" FOREIGN KEY ("staffId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "healthCheckTime"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "meetingTime"');
    await queryRunner.query('DROP TABLE "price_rule"');
    await queryRunner.query(
      'ALTER TABLE "media" RENAME COLUMN "postHeathCheckId" TO "ticketId"',
    );
    await queryRunner.query(
      'ALTER TABLE "pet" RENAME COLUMN "gender" TO "isMale"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_792a1158283757c3ad63cde3ee9" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
