import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./pet.entity";
import { Branch } from "../user_management_service/branch.entity";
import { PaymentOrderMethodEnum } from "src/enum";
import { Combo } from "src/entities/service/combo.entity";
import { PetComboService } from "./pet-combo-service.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";

@Entity("pet_combo")
export class PetCombo extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "timestamp without time zone", nullable: false })
  registerTime: Date;
  @Column({ type: "boolean", nullable: true, default: false })
  isCompleted: boolean;
  @Column({ type: "enum", enum: PaymentOrderMethodEnum, nullable: true })
  paymentMethod: PaymentOrderMethodEnum;
  @Column({ type: "integer", nullable: false })
  orderTotal: number;
  @Column({ type: "integer", nullable: true })
  point: number;

  @Column({ name: "petId" })
  petId: number;
  @ManyToOne(() => Pet, (pet) => pet.petCombos, {})
  @JoinColumn({ name: "petId", referencedColumnName: "id" })
  pet: Pet;

  @Column({ name: "branchId" })
  branchId: number;
  @ManyToOne(() => Branch, (branch) => branch.petCombos, {})
  @JoinColumn({ name: "branchId", referencedColumnName: "id" })
  branch: Branch;

  @Column({ name: "comboId" })
  comboId: number;
  @ManyToOne(() => Combo, (combo) => combo.petCombos, {})
  @JoinColumn({ name: "comboId", referencedColumnName: "id" })
  combo: Combo;

  @Column({ name: "breedingTransactionId", nullable: true })
  breedingTransactionId: number;
  @ManyToOne(
    () => BreedingTransaction,
    (breedingTransaction) => breedingTransaction.petCombos,
    {},
  )
  @JoinColumn({ name: "breedingTransactionId", referencedColumnName: "id" })
  breedingTransaction: BreedingTransaction;

  @OneToMany(
    () => PetComboService,
    (petComboService) => petComboService.service,
    {
      cascade: true,
    },
  )
  petComboServices: PetComboService[];

  constructor(partial: Partial<PetCombo>) {
    super();
    Object.assign(this, partial);
  }
}