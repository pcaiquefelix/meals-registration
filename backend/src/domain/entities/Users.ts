import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity("users")
class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 50, default: "employee" })
  role: string;

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

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = bcrypt.hashSync(this.password);
    }
  }
}

export default Users;
