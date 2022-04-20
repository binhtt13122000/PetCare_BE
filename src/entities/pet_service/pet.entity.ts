import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Paper } from "./paper.entity";
import { PetOwner } from "./pet-owner.entity";
import { BaseEntity } from "typeorm";
import { GenderEnum, PetEnum } from "../../enum/index";
import { Breed } from "./breed.entity";
import { VaccinePetRecord } from "./vaccine-pet-record.entity";
import { IsDate, IsString, Length, IsInt, IsBoolean } from "class-validator";
import { HealthRecord } from "../health_service/health-record.entity";
import { Post } from "../transaction_service/post.entity";
import { SaleTransaction } from "../transaction_service/sale-transaction.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";

@Entity("pet")
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  @Length(0, 32)
  name: string;
  @Column({ type: "timestamp without time zone", nullable: false })
  @IsDate()
  dob: Date;
  @Column({ type: "integer", nullable: true })
  @IsInt()
  ageRange: number;
  @Column({ type: "enum", enum: GenderEnum })
  gender: GenderEnum;
  @Column({ type: "text", nullable: true })
  @IsString()
  description: string;
  @Column({ type: "text", nullable: false })
  avatar: string;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  isSeed: boolean;
  @Column({ type: "enum", enum: PetEnum })
  status: PetEnum;
  @Column({ type: "text", nullable: true })
  @IsString()
  color: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  specialMarkings: string;
  @Column({ type: "text", nullable: true })
  @IsString()
  vaccineDescription: string;

  @Column({ name: "breedId" })
  breedId: number;
  @ManyToOne(() => Breed, (breed) => breed.pets, {})
  @JoinColumn({ name: "breedId", referencedColumnName: "id" })
  breed: Breed;

  //reference
  @OneToMany(() => PetOwner, (petOwner) => petOwner.pet, {
    cascade: true,
  })
  petOwners: PetOwner[];

  @OneToMany(() => Paper, (paper) => paper.pet)
  papers: Paper[];

  @OneToMany(
    () => VaccinePetRecord,
    (vaccinePetRecord) => vaccinePetRecord.vaccine,
  )
  vaccinePetRecords: VaccinePetRecord[];

  @OneToMany(() => HealthRecord, (healthRecord) => healthRecord.pet)
  healthRecords: HealthRecord[];

  @OneToMany(() => Post, (post) => post.pet)
  posts: Post[];

  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.pet)
  saleTransactions: SaleTransaction[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.petFemale,
  )
  femaleBreedingTransactions: BreedingTransaction[];

  @OneToMany(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.petMale,
  )
  maleBreedingTransactions: BreedingTransaction[];

  constructor(partial: Partial<Pet>) {
    super();
    Object.assign(this, partial);
  }
}
