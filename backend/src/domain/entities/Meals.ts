import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Protein from "./Proteins";

@Entity("meals")
class Meals {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Protein, { nullable: true })
  @JoinColumn({ name: "protein1_id" })
  protein1: Protein;

  @ManyToOne(() => Protein, { nullable: true })
  @JoinColumn({ name: "protein2_id" })
  protein2: Protein;

  @Column({ type: "timestamp" })
  day_of_week: Date;

  @Column({ length: 50 })
  meal_type: string;

  @Column({ length: 70, nullable: true })
  description: string;

  @Column({ length: 70, nullable: true })
  sides: string;

  @Column({ length: 70, nullable: true })
  salads: string;

  @Column({ length: 70, nullable: true })
  desserts: string;

  @Column({
    select: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column({
    select: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}

export default Meals;
