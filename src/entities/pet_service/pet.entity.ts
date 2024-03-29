import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PetOwner } from "./pet-owner.entity";
import { BaseEntity } from "typeorm";
import { Breed } from "./breed.entity";
import { HealthPetRecord } from "./health-pet-record.entity";
import { IsString, IsBoolean } from "class-validator";
import { Post } from "../transaction_service/post.entity";
import { SaleTransaction } from "../transaction_service/sale-transaction.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";
import { GenderEnum, PetEnum } from "src/enum";
import { PetCombo } from "./pet-combo.entity";
import { OrderDetail } from "../order_service/order-detail.entity";
import { ServiceTicket } from "../service/service-ticket.entity";

@Entity("pet")
export class Pet extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false })
  @IsString()
  name: string;
  @Column({ type: "timestamp without time zone", nullable: false })
  dob: Date;
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

  @OneToMany(() => PetCombo, (petCombo) => petCombo.pet, {})
  petCombos: PetCombo[];

  @OneToMany(() => HealthPetRecord, (healthPetRecord) => healthPetRecord.pet)
  healthPetRecords: HealthPetRecord[];

  @OneToMany(() => Post, (post) => post.pet)
  posts: Post[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.pet)
  orderDetails: OrderDetail[];

  @OneToMany(() => SaleTransaction, (saleTransaction) => saleTransaction.pet)
  saleTransactions: SaleTransaction[];

  @OneToMany(() => ServiceTicket, (serviceTicket) => serviceTicket.pet)
  serviceTickets: ServiceTicket[];

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
