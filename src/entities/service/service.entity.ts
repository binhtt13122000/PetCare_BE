import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsBoolean, IsString } from "class-validator";
import { OrderDetail } from "../order_service/order-detail.entity";
import { ServiceFee } from "./service-fee.entity";
import { ServiceTicket } from "./service-ticket.entity";
import { ComboService } from "./combo-service.entity";
import { PetComboService } from "../pet_service/pet-combo-service.entity";

@Entity("service")
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;
  @Column({ type: "text", nullable: false, unique: true })
  @IsString()
  name: string;
  @Column({ type: "text", nullable: true })
  description: string;
  @Column({ type: "bool", default: true })
  @IsBoolean()
  status: boolean;
  @Column({ type: "text", nullable: false })
  unit: string;
  @Column({ type: "integer", nullable: true })
  estimatedTime: number;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.service)
  orderDetails: OrderDetail[];

  @OneToMany(() => ComboService, (comboService) => comboService.service)
  comboServices: ComboService[];

  @OneToMany(() => ServiceFee, (serviceFee) => serviceFee.service, {
    cascade: true,
  })
  serviceFees: ServiceFee[];

  @OneToMany(() => ServiceTicket, (serviceTicket) => serviceTicket.service)
  serviceTickets: ServiceTicket[];

  @OneToMany(
    () => PetComboService,
    (petComboService) => petComboService.service,
  )
  petComboServices: PetComboService[];
  constructor(partial: Partial<Service>) {
    super();
    Object.assign(this, partial);
  }
}
