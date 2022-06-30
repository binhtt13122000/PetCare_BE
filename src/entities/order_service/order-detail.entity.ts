import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Service } from "../service/service.entity";
import { PetCombo } from "../pet_service/pet-combo.entity";
import { BreedingTransaction } from "../transaction_service/breeding-transaction.entity";

@Entity("order_detail")
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "integer", nullable: false })
  price: number;
  @Column({ type: "integer", nullable: true })
  quantity: number;
  @Column({ type: "integer", nullable: true })
  totalPrice: number;
  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ name: "orderId" })
  orderId: number;
  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: "orderId", referencedColumnName: "id" })
  order: Order;
  @Column({ name: "serviceId", nullable: true })
  serviceId: number;
  @ManyToOne(() => Service, (service) => service.orderDetails, {})
  @JoinColumn({ name: "serviceId", referencedColumnName: "id" })
  service: Service;

  @Column({ name: "petComboId", nullable: true })
  petComboId: number;
  @ManyToOne(() => PetCombo, (petCombo) => petCombo.orderDetails, {})
  @JoinColumn({ name: "petComboId", referencedColumnName: "id" })
  petCombo: PetCombo;

  @Column({ name: "breedTransactionId", nullable: true })
  breedTransactionId: number;
  @ManyToOne(
    () => BreedingTransaction,
    (breedTransaction) => breedTransaction.orderDetails,
    {},
  )
  @JoinColumn({ name: "breedTransactionId", referencedColumnName: "id" })
  breedTransaction: BreedingTransaction;

  constructor(partial: Partial<OrderDetail>) {
    super();
    Object.assign(this, partial);
  }
}
