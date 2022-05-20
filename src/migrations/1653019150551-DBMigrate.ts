import { MigrationInterface, QueryRunner } from "typeorm";

export class DBMigrate1653019150551 implements MigrationInterface {
  name = "DBMigrate1653019150551";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "service_ticket" ("id" SERIAL NOT NULL, "serviceId" integer NOT NULL, "ticketId" integer NOT NULL, CONSTRAINT "PK_ce829d561a217cafc769fcd8de6" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "meetingTime"');
    await queryRunner.query(
      'ALTER TABLE "ticket" ADD "meetingDate" TIMESTAMP NOT NULL',
    );
    await queryRunner.query('ALTER TABLE "ticket" ADD "startTime" integer');
    await queryRunner.query('ALTER TABLE "ticket" ADD "endTime" integer');
    await queryRunner.query(
      'ALTER TABLE "service" ADD "estimatedTime" integer',
    );
    await queryRunner.query(
      'ALTER TYPE "public"."ticket_status_enum" RENAME TO "ticket_status_enum_old"',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_status_enum\" AS ENUM('CREATED', 'CANCELED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "public"."ticket_status_enum" USING "status"::"text"::"public"."ticket_status_enum"',
    );
    await queryRunner.query('DROP TYPE "public"."ticket_status_enum_old"');
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'"2022-05-20T03:59:14.470Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "transactionTime" DROP NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "service_ticket" ADD CONSTRAINT "FK_226e296bcab43f0cb40bc3d92ae" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "service_ticket" ADD CONSTRAINT "FK_3233dca90962b1c246f8fbe13fd" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "service_ticket" DROP CONSTRAINT "FK_3233dca90962b1c246f8fbe13fd"',
    );
    await queryRunner.query(
      'ALTER TABLE "service_ticket" DROP CONSTRAINT "FK_226e296bcab43f0cb40bc3d92ae"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ALTER COLUMN "transactionTime" SET NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE "vaccine_pet_record" ALTER COLUMN "dateOfInjection" SET DEFAULT \'2022-05-19 04:37:35.872\'',
    );
    await queryRunner.query(
      "CREATE TYPE \"public\".\"ticket_status_enum_old\" AS ENUM('CREATED', 'CONFIRMED', 'CANCELED', 'SUCCESS', 'EXPIRED')",
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "status" TYPE "public"."ticket_status_enum_old" USING "status"::"text"::"public"."ticket_status_enum_old"',
    );
    await queryRunner.query('DROP TYPE "public"."ticket_status_enum"');
    await queryRunner.query(
      'ALTER TYPE "public"."ticket_status_enum_old" RENAME TO "ticket_status_enum"',
    );
    await queryRunner.query(
      'ALTER TABLE "service" DROP COLUMN "estimatedTime"',
    );
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "endTime"');
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "startTime"');
    await queryRunner.query('ALTER TABLE "ticket" DROP COLUMN "meetingDate"');
    await queryRunner.query(
      'ALTER TABLE "ticket" ADD "meetingTime" TIMESTAMP NOT NULL',
    );
    await queryRunner.query('DROP TABLE "service_ticket"');
  }
}
