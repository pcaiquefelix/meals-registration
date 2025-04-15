import { Max, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("proteins")
class Proteins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  @Min(1, { message: "The monthly incidence value must be at least 1" })
  @Max(30, { message: "The monthly incidence value must be at most 30" })
  monthly_incidence: number;

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

export default Proteins;
