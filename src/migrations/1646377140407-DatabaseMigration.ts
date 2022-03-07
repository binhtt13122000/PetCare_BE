import { MigrationInterface, QueryRunner } from "typeorm";

export class DatabaseMigration1646377140407 implements MigrationInterface {
  name = "DatabaseMigration1646377140407";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_6400e332beaf67a74ce38d4c3e4"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "sellerContract"',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" DROP COLUMN "buyerContract"',
    );
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "evidence"');
    await queryRunner.query('ALTER TABLE "post" DROP COLUMN "sellerContract"');
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "roleId"');
    await queryRunner.query('ALTER TABLE "media" ADD "ticketId" integer');
    await queryRunner.query(
      'ALTER TABLE "media" ADD "saleTransactionSellerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "saleTransactionBuyerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "postSellerContractId" integer',
    );
    await queryRunner.query('ALTER TABLE "media" ADD "postEvidenceId" integer');
    await queryRunner.query('ALTER TABLE "media" ADD "petId" integer');
    await queryRunner.query(
      'ALTER TABLE "media" ADD "breedingTransactionSellerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD "breedingTransactionBuyerContractId" integer',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'"2022-03-04T06:59:03.537Z"\'',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_792a1158283757c3ad63cde3ee9" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_f868c1f023ebf1310864b7ab99f" FOREIGN KEY ("saleTransactionSellerContractId") REFERENCES "sale_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_27b0c7c0547302a8cdab8c99a5c" FOREIGN KEY ("saleTransactionBuyerContractId") REFERENCES "sale_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_7fff5d77eb920541f2f64759769" FOREIGN KEY ("postSellerContractId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_5b40ace269197ed372578de58ea" FOREIGN KEY ("postEvidenceId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_8c9880aec82e6465142f31de240" FOREIGN KEY ("petId") REFERENCES "pet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_02b49d9dbed7ff94ecfea3ca4cc" FOREIGN KEY ("breedingTransactionSellerContractId") REFERENCES "breeding_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_572612609a0047593d3e2e454ad" FOREIGN KEY ("breedingTransactionBuyerContractId") REFERENCES "breeding_transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_572612609a0047593d3e2e454ad"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_02b49d9dbed7ff94ecfea3ca4cc"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_8c9880aec82e6465142f31de240"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_5b40ace269197ed372578de58ea"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_7fff5d77eb920541f2f64759769"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_27b0c7c0547302a8cdab8c99a5c"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_f868c1f023ebf1310864b7ab99f"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP CONSTRAINT "FK_792a1158283757c3ad63cde3ee9"',
    );
    await queryRunner.query(
      'ALTER TABLE "ticket" ALTER COLUMN "date" SET DEFAULT \'2022-03-04\'',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "breedingTransactionBuyerContractId"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "breedingTransactionSellerContractId"',
    );
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "petId"');
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "postEvidenceId"');
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "postSellerContractId"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "saleTransactionBuyerContractId"',
    );
    await queryRunner.query(
      'ALTER TABLE "media" DROP COLUMN "saleTransactionSellerContractId"',
    );
    await queryRunner.query('ALTER TABLE "media" DROP COLUMN "ticketId"');
    await queryRunner.query('ALTER TABLE "media" ADD "roleId" integer');
    await queryRunner.query('ALTER TABLE "post" ADD "sellerContract" text');
    await queryRunner.query('ALTER TABLE "post" ADD "evidence" text NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "buyerContract" text',
    );
    await queryRunner.query(
      'ALTER TABLE "sale_transaction" ADD "sellerContract" text',
    );
    await queryRunner.query(
      'ALTER TABLE "media" ADD CONSTRAINT "FK_6400e332beaf67a74ce38d4c3e4" FOREIGN KEY ("roleId") REFERENCES "ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }
}
